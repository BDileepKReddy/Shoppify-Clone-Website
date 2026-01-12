import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Session } from "@shopify/shopify-api";
import fetch from "node-fetch";

const app = express();

// Configure CORS
app.use(
  cors({
    origin: [
      "https://aniyor-project.web.app",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Shopify-Access-Token"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.json());

const shop = "new-trial-store-services.myshopify.com";
const accessToken = "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";

const shopify = shopifyApi({
  apiKey: "cdf87a3ffcdba61997ad6ae74865e2ea",
  apiSecretKey: "2767bf69d963000b4a4fcc90e603710f",
  scopes: [
    "read_products",
    "write_products",
    "read_orders",
    "write_publications",
    "read_publications",
  ],
  hostName: "1d6e-110-224-122-189.ngrok-free.app",
  adminApiAccessToken: accessToken,
  isCustomStoreApp: true,
});

const session = new Session({
  id: `${shop}_private_app`,
  shop,
  state: "",
  isOnline: false,
  accessToken,
  scope:
    "read_products,write_products,read_orders,write_publications,read_publications",
});

const client = new shopify.clients.Graphql({ session });

app.get("/publications", async (req, res) => {
  try {
    const restResponse = await fetch(
      `https://${shop}/admin/api/2024-04/publications.json`,
      {
        method: "GET",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (!restResponse.ok) {
      const errorBody = await restResponse.text();
      console.error("❌ REST API error body:", errorBody);
      return res
        .status(restResponse.status)
        .json({ error: "Failed to fetch publications from REST API" });
    }

    const json = await restResponse.json();
    const publications = json.publications.map((pub) => ({
      id: `gid://shopify/Publication/${pub.id}`,
      name: pub.name,
    }));

    res.json({ publications });
  } catch (error) {
    console.error("❌ REST fallback failed:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const categoriesQuery = `
      {
        productCategories(first: 100) {
          edges {
            node {
              id
              name
              productTaxonomyNode {
                id
                name
                children(first: 100) {
                  edges {
                    node {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await client.request(categoriesQuery);
    const categories = response.data.productCategories.edges.map((edge) => ({
      id: edge.node.id,
      name: edge.node.name,
      subcategories:
        edge.node.productTaxonomyNode?.children?.edges.map((child) => ({
          id: child.node.id,
          name: child.node.name,
        })) || [],
    }));

    res.json({ categories });
  } catch (error) {
    console.error("❌ Failed to fetch categories:", error);
    res.status(500).json({
      error: "Failed to fetch categories",
      details: error.message,
    });
  }
});

app.post("/products", async (req, res) => {
  try {
    const {
      title,
      body_html,
      vendor,
      vendorUid,
      productType = "Product",
      status = "active",
      categoryId,
      price = "0.00",
      compareAtPrice,
      costPerItem,
      publicationIds = [],
    } = req.body.product;

    // Validate required fields
    if (!title || !vendor) {
      return res.status(400).json({
        error: "Missing required fields: title and vendor are required.",
      });
    }

    // Create product using REST API
    const variant = {
      price: price.toString(),
      inventory_management: "shopify",
      inventory_policy: "deny",
      requires_shipping: true,
      taxable: true,
    };
    if (
      compareAtPrice !== undefined &&
      compareAtPrice !== null &&
      compareAtPrice !== ""
    ) {
      variant.compare_at_price = compareAtPrice.toString();
    }
    if (
      costPerItem !== undefined &&
      costPerItem !== null &&
      costPerItem !== ""
    ) {
      variant.cost = costPerItem.toString();
    }

    const productData = {
      product: {
        title,
        body_html: body_html || "",
        vendor,
        product_type: productType,
        status: status.toLowerCase(),
        variants: [variant],
      },
    };

    // Add category if provided
    if (categoryId) {
      productData.product.product_category = {
        product_taxonomy_node_id: categoryId,
      };
    }

    const createResponse = await fetch(
      `https://${shop}/admin/api/2024-01/products.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error("❌ Product creation failed:", errorData);
      return res.status(createResponse.status).json({
        error: "Failed to create product",
        details: errorData,
      });
    }

    const product = await createResponse.json();
    const productId = product.product.id;

    // Publish to selected channels if any
    if (publicationIds.length > 0) {
      for (const pubId of publicationIds) {
        // Extract the numeric ID from the GID if it's in that format
        const numericId = pubId.includes("gid://")
          ? pubId.split("/").pop()
          : pubId;

        try {
          const publishResponse = await fetch(
            `https://${shop}/admin/api/2024-01/publications/${numericId}/publish.json`,
            {
              method: "POST",
              headers: {
                "X-Shopify-Access-Token": accessToken,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                resource_id: productId,
                resource_type: "product",
              }),
            }
          );

          if (!publishResponse.ok) {
            const errorData = await publishResponse.text();
            console.error(
              `❌ Failed to publish to channel ${numericId}:`,
              errorData
            );
          }
        } catch (publishError) {
          console.error(
            `❌ Error publishing to channel ${numericId}:`,
            publishError
          );
        }
      }
    }

    // Save vendor UID if provided
    if (vendorUid) {
      try {
        const metafieldData = {
          metafield: {
            namespace: "custom",
            key: "vendor_uid",
            value: vendorUid,
            type: "single_line_text_field",
          },
        };

        const metafieldResponse = await fetch(
          `https://${shop}/admin/api/2024-01/products/${productId}/metafields.json`,
          {
            method: "POST",
            headers: {
              "X-Shopify-Access-Token": accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(metafieldData),
          }
        );

        if (!metafieldResponse.ok) {
          const errorData = await metafieldResponse.text();
          console.error("❌ Failed to set metafield:", errorData);
        }
      } catch (metafieldError) {
        console.error("❌ Error setting metafield:", metafieldError);
      }
    }

    res.json({
      message: "✅ Product created successfully",
      product: product.product,
    });
  } catch (error) {
    console.error("❌ Product creation failed:", error);
    res.status(500).json({
      error: error.message || "Unknown error occurred",
      details: error,
    });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const ordersQuery = `
      {
        orders(first: 50) {
          edges {
            node {
              id
              name
              createdAt
              totalPriceSet { shopMoney { amount currencyCode } }
              displayFinancialStatus
              displayFulfillmentStatus
              customer { displayName }
              lineItems(first: 10) { edges { node { quantity } } }
              fulfillments(first: 1) {
                trackingInfo {
                  number
                  url
                }
                status
              }
            }
          }
        }
      }
    `;
    const response = await client.query({ data: ordersQuery });
    const rawOrders = response.body.data.orders.edges.map((edge) => edge.node);
    const orders = rawOrders.map((order) => {
      const total = order.totalPriceSet?.shopMoney?.amount
        ? `${order.totalPriceSet.shopMoney.amount} ${order.totalPriceSet.shopMoney.currencyCode}`
        : "—";
      const itemsCount =
        order.lineItems?.edges.reduce(
          (sum, edge) => sum + (edge.node.quantity || 0),
          0
        ) || 0;
      return {
        id: order.id,
        name: order.name,
        date: order.createdAt,
        customer: order.customer?.displayName || "—",
        channel: "Online Store",
        total,
        paymentStatus: order.displayFinancialStatus,
        fulfillmentStatus: order.displayFulfillmentStatus,
        items: itemsCount,
        deliveryStatus: order.fulfillments?.[0]?.status || "—",
        tracking: order.fulfillments?.[0]?.trackingInfo?.[0]?.number || "",
        deliveryMethod: "—",
      };
    });
    res.json({ orders });
  } catch (err) {
    console.error("❌ Error fetching orders:", JSON.stringify(err, null, 2));
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const vendorUid = req.query.vendorUid;

    // Return error if vendorUid is not provided
    if (!vendorUid) {
      return res.status(400).json({
        error: "Missing required query parameter: vendorUid",
      });
    }

    const productsQuery = `
      {
        products(first: 100, query:"product_type:'product'") {
          edges {
            node {
              id
              title
              vendor
              status
              totalInventory
              productType
              productCategory {
                productTaxonomyNode {
                  name
                }
              }
              metafields(first: 10) {
                edges {
                  node {
                    key
                    value
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await client.request(productsQuery);
    const rawProducts = response.data.products.edges.map((edge) => edge.node);

    // Filter products by vendorUid
    const filteredProducts = rawProducts.filter((product) => {
      const metafields =
        product.metafields?.edges.map((edge) => edge.node) || [];
      const vendorUidMetafield = metafields.find((m) => m.key === "vendor_uid");
      return vendorUidMetafield?.value === vendorUid;
    });

    // Map filtered products to the expected format
    const products = filteredProducts.map((product) => {
      const metafields =
        product.metafields?.edges.map((edge) => edge.node) || [];
      const vendorUidMetafield = metafields.find((m) => m.key === "vendor_uid");
      const vendorUidValue = vendorUidMetafield?.value ?? null;

      return {
        id: product.id,
        title: product.title,
        vendor: product.vendor ?? "—",
        status: product.status ?? "—",
        totalInventory: product.totalInventory ?? "—",
        productType: product.productType ?? "—",
        productCategory:
          product.productCategory?.productTaxonomyNode?.name ?? "—",
        vendorUid: vendorUidValue,
      };
    });

    return res.json({ products });
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    return res.status(500).json({ error: "Could not fetch products" });
  }
});

app.get("/services", async (req, res) => {
  try {
    const vendorUid = req.query.vendorUid;

    // Return error if vendorUid is not provided
    if (!vendorUid) {
      return res.status(400).json({
        error: "Missing required query parameter: vendorUid",
      });
    }

    const servicesQuery = `
      {
        products(first: 100, query: "product_type:'Service'") {
          edges {
            node {
              id
              title
              vendor
              status
              totalInventory
              productType
              productCategory {
                productTaxonomyNode {
                  name
                }
              }
              metafields(first: 10) {
                edges {
                  node {
                    key
                    value
                  }
                }
              }
            }
          }
        }
      }
    `;

    const response = await client.request(servicesQuery);
    const rawServices = response.data.products.edges.map((edge) => edge.node);

    // Filter services by vendorUid
    const filteredServices = rawServices.filter((service) => {
      const metafields =
        service.metafields?.edges.map((edge) => edge.node) || [];
      const vendorUidMetafield = metafields.find((m) => m.key === "vendor_uid");
      return vendorUidMetafield?.value === vendorUid;
    });

    // Map filtered services to the expected format
    const services = filteredServices.map((service) => {
      const metafields =
        service.metafields?.edges.map((edge) => edge.node) || [];
      const vendorUidMetafield = metafields.find((m) => m.key === "vendor_uid");
      const vendorUidValue = vendorUidMetafield?.value ?? null;

      return {
        id: service.id,
        title: service.title,
        vendor: service.vendor ?? "—",
        status: service.status ?? "—",
        totalInventory: service.totalInventory ?? "—",
        productType: service.productType ?? "—",
        productCategory:
          service.productCategory?.productTaxonomyNode?.name ?? "—",
        vendorUid: vendorUidValue,
      };
    });

    return res.json({ services });
  } catch (err) {
    console.error("❌ Error fetching services:", err);
    return res.status(500).json({ error: "Could not fetch services" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});