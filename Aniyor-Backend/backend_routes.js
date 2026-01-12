import express from 'express';
import { client } from './index.js';

const router = express.Router();

// Helper to normalize Shopify GIDs
const normalizeShopifyId = (id) => {
  const strId = String(id);
  if (!strId) return null;
  return strId.startsWith('gid://') ? strId : `gid://shopify/Product/${strId}`;
};

// Helper function to consistently format the product object for the frontend
const transformProductForFrontend = (product) => {
  if (!product) return null;

  const variant = product.variants?.edges?.[0]?.node || {};
  const metafields = product.metafields?.edges?.map(e => e.node) || [];

  return {
    id: product.id,
    variantId: variant.id || null,
    title: product.title,
    handle: product.handle,
    descriptionHtml: product.descriptionHtml,
    productType: product.productType,
    vendor: product.vendor,
    tags: product.tags || [],
    status: product.status,
    price: variant.price || '',
    compareAtPrice: variant.compareAtPrice || '',
    sku: variant.sku || '',
    barcode: variant.barcode || '',
    chargeTax: variant.taxable !== false,
    quantity: variant.inventoryQuantity || 0,
    vendorUid: metafields.find(m => m.key === 'vendor_uid')?.value || '',
    category: metafields.find(m => m.key === 'category')?.value || '',
    costPerItem: metafields.find(m => m.key === 'cost_per_item')?.value || '',
    profit: metafields.find(m => m.key === 'profit')?.value || '',
    margin: metafields.find(m => m.key === 'margin')?.value || '',
    isService: metafields.find(m => m.key === 'is_service')?.value || '',
    seoTitle: product.seo?.title || '',
    seoDescription: product.seo?.description || '',
  };
};

// GET /products/:id - Fetches a single product
router.get('/products/:id', async (req, res) => {
  const gid = normalizeShopifyId(req.params.id);
  if (!gid) {
    return res.status(400).json({ message: 'Invalid Product ID' });
  }

  const query = `
    query productById($id: ID!) {
      product(id: $id) {
        id
        title
        handle
        descriptionHtml
        productType
        vendor
        tags
        status
        seo { title description }
        variants(first: 1) {
          edges {
            node {
              id
              price
              compareAtPrice
              inventoryQuantity
              sku
              barcode
              taxable
            }
          }
        }
        metafields(first: 100) {
          edges {
            node { id namespace key value type }
          }
        }
      }
    }
  `;

  try {
    const response = await client.request(query, { variables: { id: gid } });

    if (response.errors) {
      return res.status(500).json({ errors: response.errors });
    }

    const product = response.data.product;
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const transformedProduct = transformProductForFrontend(product);
    return res.json({ product: transformedProduct });

  } catch (err) {
    console.error('GET /products/:id Error:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

// PUT /products/:id - Updates a product
router.put('/products/:id', async (req, res) => {
  const gid = normalizeShopifyId(req.params.id);
  const data = req.body;

  if (!gid) {
    return res.status(400).json({ message: 'Invalid Product ID' });
  }

  // This helper checks if a property exists on the object sent from the frontend.
  const hasProperty = (prop) => Object.prototype.hasOwnProperty.call(data, prop);

  const input = { id: gid };

  // --- THIS IS THE FIX ---
  // The logic now checks if a property exists in the request body,
  // which allows sending an empty string ("") to clear a field in Shopify.
  if (hasProperty('title')) input.title = data.title;
  if (hasProperty('handle')) input.handle = data.handle;
  if (hasProperty('description')) input.descriptionHtml = data.description;
  if (hasProperty('vendor')) input.vendor = data.vendor;
  if (hasProperty('productType')) input.productType = data.productType;
  if (hasProperty('status')) input.status = data.status;
  if (hasProperty('tags')) input.tags = data.tags;

  // Handle variant updates
  if (data.variantId) {
    const variantInput = { id: data.variantId };
    if (hasProperty('price')) variantInput.price = data.price;
    if (hasProperty('compareAtPrice')) variantInput.compareAtPrice = data.compareAtPrice;
    if (hasProperty('sku')) variantInput.sku = data.sku;
    if (hasProperty('barcode')) variantInput.barcode = data.barcode;
    if (hasProperty('chargeTax')) variantInput.taxable = data.chargeTax;
    input.variants = [variantInput];
  }

  // Handle metafield updates
  const metafields = [];
  if (hasProperty('vendorUid')) {
    metafields.push({ namespace: 'custom', key: 'vendor_uid', value: String(data.vendorUid), type: 'single_line_text_field' });
  }
  if (hasProperty('category')) {
    metafields.push({ namespace: 'custom', key: 'category', value: String(data.category), type: 'single_line_text_field' });
  }
  if (hasProperty('costPerItem')) {
    metafields.push({ namespace: 'custom', key: 'cost_per_item', value: String(data.costPerItem), type: 'number_decimal' });
  }
  if (hasProperty('profit')) {
    metafields.push({ namespace: 'custom', key: 'profit', value: String(data.profit), type: 'number_decimal' });
  }
  if (hasProperty('margin')) {
    metafields.push({ namespace: 'custom', key: 'margin', value: String(data.margin), type: 'number_decimal' });
  }
  if (metafields.length > 0) {
    input.metafields = metafields;
  }

  const mutation = `
    mutation productUpdate($input: ProductInput!) {
      productUpdate(input: $input) {
        product {
          id
          title
          handle
          descriptionHtml
          productType
          vendor
          tags
          status
          seo { title description }
          variants(first: 1) {
            edges {
              node {
                id
                price
                compareAtPrice
                inventoryQuantity
                sku
                barcode
                taxable
              }
            }
          }
          metafields(first: 100) {
            edges {
              node { id namespace key value type }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    console.log('--- Sending to Shopify ---');
    console.log(JSON.stringify(input, null, 2));

    const response = await client.request(mutation, { variables: { input } });

    console.log('--- Shopify Response ---');
    console.log(JSON.stringify(response, null, 2));

    if (response.errors) {
      console.error('GraphQL API Errors:', response.errors);
      return res.status(500).json({ errors: response.errors });
    }

    const result = response.data.productUpdate;
    if (result.userErrors && result.userErrors.length > 0) {
      console.error('Shopify User Errors:', result.userErrors);
      return res.status(400).json({ userErrors: result.userErrors });
    }

    const transformedProduct = transformProductForFrontend(result.product);
    return res.json({ product: transformedProduct });

  } catch (err) {
    console.error('PUT /products/:id Error:', err);
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
});

export default router;
