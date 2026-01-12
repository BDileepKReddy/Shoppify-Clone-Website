import "@shopify/shopify-api/adapters/node";
import { shopifyApi, LATEST_API_VERSION } from "@shopify/shopify-api";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Session } from "@shopify/shopify-api";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import backendRoutes from "./backend_routes.js";

const app = express();
dotenv.config();

// Configure CORS
app.use(
  cors({
    origin: [
      "https://aniyor-project.web.app",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:3000",
      "https://aniyor-firstpage.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Shopify-Access-Token"],
    credentials: true,
  })
);

app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use("/", backendRoutes);

const shop = process.env.SHOPIFY_SHOP;
const accessToken = process.env.SHOPIFY_ACCESS_TOKEN;
const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecretKey = process.env.SHOPIFY_API_SECRET;
const scopes = (process.env.SHOPIFY_SCOPES || "")
  .split(",")
  .map((s) => s.trim());
const hostName = process.env.SHOPIFY_HOST_NAME;

const shopify = shopifyApi({
  apiVersion: "2024-07",
  apiKey,
  apiSecretKey,
  scopes,
  hostName,
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
      options,
      variants,
      images,
    } = req.body.product;

    // Basic validation
    if (!title || !vendor) {
      return res.status(400).json({
        error: "Missing required fields: title and vendor are required.",
      });
    }

    // Prepare options (must have non-empty name)
    let formattedOptions = undefined;
    if (Array.isArray(options)) {
      const mapped = options
        .map((opt) => (typeof opt === "string" ? { name: opt } : opt))
        .filter((opt) => opt?.name?.trim());
      if (mapped.length > 0) {
        formattedOptions = mapped;
      }
    }

    // Prepare variant
    const baseVariant = {
      price: Number(price).toFixed(2),
      inventory_management: "shopify",
      inventory_policy: "deny",
      requires_shipping: true,
      taxable: true,
    };

    if (Array.isArray(variants) && variants.length > 0) {
      const v = variants[0];

      const safe = (val) =>
        val !== undefined && val !== null && val !== "" ? val : undefined;

      baseVariant.price = Number(safe(v.price) ?? price).toFixed(2);
      if (safe(v.compareAtPrice))
        baseVariant.compare_at_price = Number(v.compareAtPrice).toFixed(2);
      if (safe(v.costPerItem))
        baseVariant.cost = Number(v.costPerItem).toFixed(2);

      if (v.inventoryManagement)
        baseVariant.inventory_management = v.inventoryManagement.toLowerCase();
      if (v.inventoryPolicy)
        baseVariant.inventory_policy = v.inventoryPolicy.toLowerCase();
      if (typeof v.requiresShipping === "boolean")
        baseVariant.requires_shipping = v.requiresShipping;
      if (typeof v.taxable === "boolean") baseVariant.taxable = v.taxable;
      if (v.weight !== undefined) baseVariant.weight = parseFloat(v.weight);
      if (v.weightUnit) baseVariant.weight_unit = v.weightUnit;
      if (v.originCountry) baseVariant.origin_country_code = v.originCountry;
      if (v.inventoryQuantity !== undefined) {
        baseVariant.inventory_quantity = parseInt(v.inventoryQuantity, 10);
      }
    }

    // Construct Shopify product payload
    const productData = {
      product: {
        title,
        body_html: body_html || "",
        vendor,
        product_type: productType,
        status: status.toLowerCase(),
        variants: [baseVariant],
      },
    };

    if (formattedOptions) {
      productData.product.options = formattedOptions;
    }

    if (categoryId) {
      productData.product.product_category = {
        product_taxonomy_node_id: categoryId,
      };
    }
    if (images && Array.isArray(images) && images.length > 0) {
      productData.product.images = images;
    }
    console.log(
      "📦 Creating product with payload:",
      JSON.stringify(productData, null, 2)
    );

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
      return res.status(400).json({
        error: "Failed to create product",
        details: errorData,
      });
    }

    const product = await createResponse.json();
    const productId = product.product.id;

    // 🔄 Publish to selected channels
    for (const pubId of publicationIds) {
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
          const errorText = await publishResponse.text();
          console.error(
            `❌ Failed to publish to channel ${numericId}:`,
            errorText
          );
        }
      } catch (err) {
        console.error(`❌ Publish error for channel ${numericId}:`, err);
      }
    }

    // 📝 Save vendorUid as metafield
    if (vendorUid) {
      const metafieldPayload = {
        metafield: {
          namespace: "custom",
          key: "vendor_uid",
          value: vendorUid,
          type: "single_line_text_field",
        },
      };

      try {
        const metafieldResponse = await fetch(
          `https://${shop}/admin/api/2024-01/products/${productId}/metafields.json`,
          {
            method: "POST",
            headers: {
              "X-Shopify-Access-Token": accessToken,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(metafieldPayload),
          }
        );

        if (!metafieldResponse.ok) {
          const errText = await metafieldResponse.text();
          console.error("❌ Failed to create metafield:", errText);
        }
      } catch (err) {
        console.error("❌ Error in metafield creation:", err);
      }
    }

    return res.json({
      message: "✅ Product created successfully",
      product: product.product,
    });
  } catch (err) {
    console.error("❌ Exception in /products:", err);
    return res.status(500).json({
      error: "Server error",
      details: err.message || err,
    });
  }
});

app.get("/products", async (req, res) => {
  try {
    const vendorUid = req.query.vendorUid;
    const email = req.query.email;

    // If email matches the special admin email, return all products (no vendorUid filtering)
    if (email && email.toLowerCase() === "harshitagarwal1441@gmail.com") {
      const productsQuery = `
        {
          products(first: 100) {
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
                images(first: 1) {
                  edges {
                    node {
                      src
                    }
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
      console.log(
        "Admin fetch: total products from Shopify:",
        rawProducts.length
      );

      // No vendorUid filtering for admin
      const products = rawProducts.map((product) => {
        const metafields =
          product.metafields?.edges.map((edge) => edge.node) || [];
        const vendorUidMetafield = metafields.find(
          (m) => m.key === "vendor_uid"
        );
        const vendorUidValue = vendorUidMetafield?.value ?? null;
        // Get the first image URL if available
        const image = product.images?.edges?.[0]?.node?.src || null;

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
          image, // <-- add this
        };
      });
      console.log(
        "Admin fetch: total products sent to frontend:",
        products.length
      );

      return res.json({ products });
    }

    // For all other emails, require vendorUid and filter
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
              images(first: 1) {
                edges {
                  node {
                    src
                  }
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
      // Get the first image URL if available
      const image = product.images?.edges?.[0]?.node?.src || null;

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
        image, // <-- add this
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
    const email = req.query.email;

    // If email matches the special admin email, return all services (no vendorUid filtering)
    if (email && email.toLowerCase() === "harshitagarwal1441@gmail.com") {
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
      console.log(
        "Admin fetch: total services from Shopify:",
        rawServices.length
      );
      // No vendorUid filtering for admin
      const services = rawServices.map((service) => {
        const metafields =
          service.metafields?.edges.map((edge) => edge.node) || [];
        const vendorUidMetafield = metafields.find(
          (m) => m.key === "vendor_uid"
        );
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
      console.log(
        "Admin fetch: total services sent to frontend:",
        services.length
      );
      return res.json({ services });
    }

    // For all other emails, require vendorUid and filter
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
    res.status(500).json({ error: "Could not fetch services" });
  }
});

app.get("/inventory", async (req, res) => {
  try {
    const { vendorUid, email } = req.query;
    if (email && email.toLowerCase() === "harshitagarwal1441@gmail.com") {
      const inventoryQuery = `
        {
          products(first: 100, query:"product_type:'product'") {
            edges {
              node {
                id
                title
                vendor
                images(first: 1) {
                  edges { node { src } }
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      sku
                      inventoryQuantity
                    }
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
      const response = await client.request(inventoryQuery);
      const rawProducts = response.data.products.edges.map((e) => e.node);
      const inventory = [];
      rawProducts.forEach((product) => {
        const imageUrl = product.images?.edges[0]?.node?.src || "";
        product.variants.edges.forEach((variant) => {
          const v = variant.node;
          let available = v.inventoryQuantity || 0;
          let onHand = v.inventoryQuantity || 0;
          let committed = 0; // Placeholder
          let unavailable = 0; // Placeholder
          inventory.push({
            id: product.id,
            name: product.title,
            sku: v.sku || "—",
            imageUrl,
            unavailable,
            committed,
            available,
            onHand,
          });
        });
      });
      console.log(
        "Admin fetch: total inventory items sent to frontend:",
        inventory.length
      );
      return res.json({ inventory });
    }
    if (!vendorUid) {
      return res
        .status(400)
        .json({ error: "Missing required query parameter: vendorUid" });
    }
    const inventoryQuery = `
      {
        products(first: 100, query:"product_type:'product'") {
          edges {
            node {
              id
              title
              vendor
              images(first: 1) {
                edges { node { src } }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    sku
                    inventoryQuantity
                  }
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
    const response = await client.request(inventoryQuery);
    const rawProducts = response.data.products.edges.map((e) => e.node);
    // Filter products by vendorUid
    const filteredProducts = rawProducts.filter((product) => {
      const metafields =
        product.metafields?.edges.map((edge) => edge.node) || [];
      const vendorUidMetafield = metafields.find((m) => m.key === "vendor_uid");
      return vendorUidMetafield?.value === vendorUid;
    });
    const inventory = [];
    filteredProducts.forEach((product) => {
      const imageUrl = product.images?.edges[0]?.node?.src || "";
      product.variants.edges.forEach((variant) => {
        const v = variant.node;
        let available = v.inventoryQuantity || 0;
        let onHand = v.inventoryQuantity || 0;
        let committed = 0; // Placeholder
        let unavailable = 0; // Placeholder
        inventory.push({
          id: product.id,
          name: product.title,
          sku: v.sku || "—",
          imageUrl,
          unavailable,
          committed,
          available,
          onHand,
        });
      });
    });
    return res.json({ inventory });
  } catch (err) {
    console.error("❌ Error fetching inventory", err);
    res
      .status(500)
      .json({ error: "Could not fetch inventory", details: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const otpStore = new Map(); // Store OTPs temporarily

// Email sending setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send-email-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  console.log(`Generated OTP for ${email}: ${otp}`);

  otpStore.set(email, otp); // ✅ inside the handler!

  try {
    await transporter.sendMail({
      from: `"Aniyor" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Aniyor OTP Verification",
      html: `<p>Your OTP is <b>${otp}</b>. It is valid for 5 minutes.</p>`,
    });

    res.json({ message: "OTP sent to email." });
  } catch (err) {
    res.status(500).json({ error: "Failed to send OTP", details: err.message });
  }
});

app.post("/verify-email-otp", (req, res) => {
  const { email, otp } = req.body;
  const validOtp = otpStore.get(email);

  if (otp === validOtp) {
    otpStore.delete(email);
    return res.status(200).json({ verified: true });
  } else {
    return res.status(400).json({ verified: false, message: "Invalid OTP" });
  }
});

app.get("/verify-gst/:gstno", async (req, res) => {
  const gstno = req.params.gstno;
  try {
    const response = await fetch(
      `http://sheet.gstincheck.co.in/check/3cf8a0448b11b4bf50f09ff1deaf6ee4/${gstno}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ error: "GST verification failed", details: error.message });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const { vendorUid, email } = req.query;

    // If email matches the special admin email, return all orders (no vendorUid filtering)
    if (email && email.toLowerCase() === "harshitagarwal1441@gmail.com") {
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
                lineItems(first: 20) {
                  edges {
                    node {
                      quantity
                      product {
                        id
                        title
                        productType
                        vendorUidMetafield: metafield(namespace: "custom", key: "vendor_uid") {
                          value
                        }
                      }
                    }
                  }
                }
                fulfillments(first: 1) {
                  trackingInfo { number url }
                  status
                }
              }
            }
          }
        }
      `;
      const response = await client.query({ data: ordersQuery });
      const rawOrders = response.body.data.orders.edges.map((e) => e.node);
      console.log("Admin fetch: total orders from Shopify:", rawOrders.length);
      // No vendorUid filtering for admin
      const orders = rawOrders.map((order) => {
        const total = order.totalPriceSet.shopMoney
          ? `${order.totalPriceSet.shopMoney.amount} ${order.totalPriceSet.shopMoney.currencyCode}`
          : "—";
        const productItems = order.lineItems.edges.filter(
          ({ node }) => node.product && node.product.productType === "product"
        );
        const itemsCount = productItems.reduce(
          (sum, { node }) => sum + (node.quantity || 0),
          0
        );
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
          productItems: productItems.map(({ node }) => ({
            id: node.product.id,
            title: node.product.title,
            vendor: node.product.vendor,
            quantity: node.quantity,
            vendorUid: node.product.vendorUidMetafield?.value,
          })),
        };
      });
      console.log("Admin fetch: total orders sent to frontend:", orders.length);
      return res.json({ orders });
    }

    // For all other emails, require vendorUid and filter
    if (!vendorUid) {
      return res.status(400).json({
        error: "Missing required query parameter: vendorUid",
      });
    }

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
              lineItems(first: 20) {
                edges {
                  node {
                    quantity
                    product {
                      id
                      title
                      productType
                      vendorUidMetafield: metafield(namespace: "custom", key: "vendor_uid") {
                        value
                      }
                    }
                  }
                }
              }
              fulfillments(first: 1) {
                trackingInfo { number url }
                status
              }
            }
          }
        }
      }
    `;
    const response = await client.query({ data: ordersQuery });
    const rawOrders = response.body.data.orders.edges.map((e) => e.node);
    // Filter for productType "product" (and optional vendorUid)
    const filtered = rawOrders.filter((order) =>
      order.lineItems.edges.some(({ node }) => {
        const p = node.product;
        const isProduct = p.productType === "product";
        const matchesVendor = vendorUid
          ? p.vendorUidMetafield?.value === vendorUid
          : true;
        return isProduct && matchesVendor;
      })
    );
    // Transform output
    const orders = filtered.map((order) => {
      const total = order.totalPriceSet.shopMoney
        ? `${order.totalPriceSet.shopMoney.amount} ${order.totalPriceSet.shopMoney.currencyCode}`
        : "—";
      // Count only "product" items matching vendorUid
      const productItems = order.lineItems.edges.filter(({ node }) => {
        const p = node.product;
        return (
          p.productType === "product" &&
          (!vendorUid || p.vendorUidMetafield?.value === vendorUid)
        );
      });
      const itemsCount = productItems.reduce(
        (sum, { node }) => sum + (node.quantity || 0),
        0
      );
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
        productItems: productItems.map(({ node }) => ({
          id: node.product.id,
          title: node.product.title,
          vendor: node.product.vendor,
          quantity: node.quantity,
          vendorUid: node.product.vendorUidMetafield?.value,
        })),
      };
    });
    return res.json({ orders });
  } catch (err) {
    console.error("❌ Error fetching orders:", err);
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

app.post("/services", async (req, res) => {
  try {
    const {
      title,
      description,
      productType,
      vendor,
      vendorUid,
      availability,
      status,
      images,
      // title,
      // description,
      // productType,
      // availability,
      // vendorUid
      // status = "active",
      // category = "",
      // price = "0.00",
      // comparePrice,
      // cost,
      // publicationIds = [],
    } = req.body.service;

    // Validate required fields
    if (!title) {
      return res.status(400).json({
        error: "Missing required field: title",
      });
    }

    // Prepare Shopify product data for a service
    const serviceData = {
      product: {
        title,
        body_html: description || "",
        product_type: productType,
        status: status.toLowerCase(),
        vendor,
        vendorUid,
        availability: availability || [],
        // tags: ["service"],
        // variants: [
        //   {
        //     price: price.toString(),
        //     inventory_management: "shopify",
        //     inventory_policy: "deny",
        //     requires_shipping: false,
        //     taxable: false,
        //   },
        // ],
      },
    };

    // Add category if provided
    // if (category) {
    //   serviceData.product.product_category = {
    //     product_taxonomy_node_id: category,
    //   };
    // }

    // Create the product in Shopify
    const createResponse = await fetch(
      `https://${shop}/admin/api/2024-01/products.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(serviceData),
      }
    );

    if (!createResponse.ok) {
      const errorData = await createResponse.json();
      console.error("❌ Service creation failed:", errorData);
      return res.status(createResponse.status).json({
        error: "Failed to create service",
        details: errorData,
      });
    }

    const product = await createResponse.json();
    const productId = product.product.id;

    // if (availability && availability.length > 0) {
    //   const metafieldData = {
    //     metafield: {
    //       namespace: "service_booking",
    //       key: "time_slots",
    //       value: JSON.stringify(time_slots),
    //       type: "json",
    //     },
    //   };

    //   await fetch(
    //     `https://${shop}/admin/api/2024-01/products/${productId}/metafields.json`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "X-Shopify-Access-Token": accessToken,
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(metafieldData),
    //     }
    //   );
    // }

    async function createMetafield(namespace, key, value, type) {
      const mf = { metafield: { namespace, key, value, type } };
      const resp = await fetch(
        `https://${shop}/admin/api/2024-01/products/${productId}/metafields.json`,
        {
          method: "POST",
          headers: {
            "X-Shopify-Access-Token": accessToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mf),
        }
      );
      if (!resp.ok) {
        const err = await resp.text();
        console.error(`❌ Failed to set metafield ${namespace}.${key}:`, err);
      }
    }

    // 1. vendor_uid
    if (vendorUid) {
      await createMetafield(
        "custom",
        "vendor_uid",
        vendorUid,
        "single_line_text_field"
      );
    }

    // 2. time_slots (availability)
    if (availability && availability.length > 0) {
      await createMetafield(
        "service_booking",
        "time_slots",
        JSON.stringify(availability),
        "json"
      );
    }

    // 3. holiday_dates (individual dates array)
    if (holiday_dates && holiday_dates.length > 0) {
      await createMetafield(
        "service_booking",
        "holiday_dates",
        JSON.stringify(holiday_dates),
        "json"
      );
    }

    // 4. holiday_date_ranges (array of {start,end})
    if (holiday_date_ranges && holiday_date_ranges.length > 0) {
      await createMetafield(
        "service_booking",
        "holiday_date_ranges",
        JSON.stringify(holiday_date_ranges),
        "json"
      );
    }

    // Respond with success

    res.json({
      message: "✅ Service created successfully",
      service: product.product,
    });
  } catch (error) {
    console.error("❌ Service creation failed:", error);
    res.status(500).json({
      error: error.message || "Unknown error occurred",
      details: error,
    });
  }
});

app.get("/services/bookings", async (req, res) => {
  try {
    const { vendorUid, email } = req.query;

    // If email matches the special admin email, return all service bookings (no vendorUid filtering)
    if (email && email.toLowerCase() === "harshitagarwal1441@gmail.com") {
      const ordersQuery = `
        {
          orders(first: 50) {
            edges {
              node {
                id
                name
                createdAt
                totalPriceSet { 
                  shopMoney { 
                    amount 
                    currencyCode 
                  } 
                }
                displayFinancialStatus
                displayFulfillmentStatus
                customer { displayName }
                lineItems(first: 20) {
                  edges {
                    node {
                      id
                      quantity
                      product {
                        id
                        title
                        productType
                        vendor
                        metafield(namespace: "custom", key: "vendor_uid") {
                          id
                          key
                          value
                        }
                      }
                    }
                  }
                }
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
      const rawOrders = response.body.data.orders.edges.map(
        (edge) => edge.node
      );
      // Filter orders for service products only
      const filteredOrders = rawOrders.filter((order) => {
        return order.lineItems.edges.some((lineItemEdge) => {
          const product = lineItemEdge.node.product;
          return product && product.productType === "service";
        });
      });
      // Transform filtered orders
      const orders = filteredOrders.map((order) => {
        const total = order.totalPriceSet?.shopMoney?.amount
          ? `${order.totalPriceSet.shopMoney.amount} ${order.totalPriceSet.shopMoney.currencyCode}`
          : "—";
        const serviceItems = order.lineItems.edges.filter((lineItemEdge) => {
          const product = lineItemEdge.node.product;
          return product?.productType === "service";
        });
        const itemsCount = serviceItems.reduce(
          (sum, edge) => sum + (edge.node.quantity || 0),
          0
        );
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
          serviceProducts: serviceItems.map((edge) => ({
            id: edge.node.product.id,
            title: edge.node.product.title,
            vendor: edge.node.product.vendor,
            productType: edge.node.product.productType,
            quantity: edge.node.quantity,
            vendorUid: edge.node.product.metafield?.value,
          })),
        };
      });
      console.log(
        "Admin fetch: total service bookings sent to frontend:",
        orders.length
      );
      return res.json({ orders });
    }

    // For all other emails, require vendorUid and filter
    if (!vendorUid) {
      return res
        .status(400)
        .json({ error: "Missing required query parameter: vendorUid" });
    }

    const ordersQuery = `
      {
        orders(first: 50) {
          edges {
            node {
              id
              name
              createdAt
              totalPriceSet { 
                shopMoney { 
                  amount 
                  currencyCode 
                } 
              }
              displayFinancialStatus
              displayFulfillmentStatus
              customer { displayName }
              lineItems(first: 20) {
                edges {
                  node {
                    id
                    quantity
                    product {
                      id
                      title
                      productType
                      vendor
                      metafield(namespace: "custom", key: "vendor_uid") {
                        id
                        key
                        value
                      }
                    }
                  }
                }
              }
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
    // Filter orders client-side
    const filteredOrders = rawOrders.filter((order) => {
      return order.lineItems.edges.some((lineItemEdge) => {
        const product = lineItemEdge.node.product;
        const isServiceProduct = product?.productType === "service";
        const hasMatchingVendorUid = vendorUid
          ? product?.metafield?.value === vendorUid
          : true;
        return isServiceProduct && hasMatchingVendorUid;
      });
    });
    // Transform filtered orders
    const orders = filteredOrders.map((order) => {
      const total = order.totalPriceSet?.shopMoney?.amount
        ? `${order.totalPriceSet.shopMoney.amount} ${order.totalPriceSet.shopMoney.currencyCode}`
        : "—";
      const serviceItems = order.lineItems.edges.filter((lineItemEdge) => {
        const product = lineItemEdge.node.product;
        const isServiceProduct = product?.productType === "service";
        const hasMatchingVendorUid = vendorUid
          ? product?.metafield?.value === vendorUid
          : true;
        return isServiceProduct && hasMatchingVendorUid;
      });
      const itemsCount = serviceItems.reduce(
        (sum, edge) => sum + (edge.node.quantity || 0),
        0
      );
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
        serviceProducts: serviceItems.map((edge) => ({
          id: edge.node.product.id,
          title: edge.node.product.title,
          vendor: edge.node.product.vendor,
          productType: edge.node.product.productType,
          quantity: edge.node.quantity,
          vendorUid: edge.node.product.metafield?.value,
        })),
      };
    });
    return res.json({ orders });
  } catch (err) {
    console.error("❌ Error fetching orders:", JSON.stringify(err, null, 2));
    res.status(500).json({ error: "Could not fetch orders" });
  }
});

app.get("/customers", async (req, res) => {
  try {
    const { vendorUid, email } = req.query;

    // If email matches the special admin email, return all customers (no vendorUid filtering)
    if (email && email.toLowerCase() === "harshitagarwal1441@gmail.com") {
      const ordersQuery = `
        {
          orders(first: 100) {
            edges {
              node {
                id
                customer {
                  id
                  firstName
                  lastName
                  displayName
                  email
                  numberOfOrders
                  amountSpent {
                    amount
                    currencyCode
                  }
                  defaultAddress {
                    address1
                    address2
                    city
                    province
                    country
                    zip
                    phone
                  }
                }
                lineItems(first: 25) {
                  edges {
                    node {
                      id
                      product {
                        id
                        title
                        metafield(namespace: "custom", key: "vendor_uid") {
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;
      const response = await client.query({ data: ordersQuery });
      const rawOrders = response.body.data.orders.edges.map(
        (edge) => edge.node
      );
      // Extract unique customers from all orders
      const customerMap = new Map();
      rawOrders.forEach((order) => {
        if (order.customer) {
          const customer = order.customer;
          if (!customerMap.has(customer.id)) {
            customerMap.set(customer.id, {
              id: customer.id,
              firstName: customer.firstName || "",
              lastName: customer.lastName || "",
              displayName: customer.displayName || "",
              email: customer.email || "",
              numberOfOrders: parseInt(customer.numberOfOrders || "0"),
              amountSpent: customer.amountSpent
                ? `${customer.amountSpent.amount} ${customer.amountSpent.currencyCode}`
                : "0.0",
              defaultAddress: customer.defaultAddress
                ? {
                    address1: customer.defaultAddress.address1 || "",
                    address2: customer.defaultAddress.address2 || "",
                    city: customer.defaultAddress.city || "",
                    province: customer.defaultAddress.province || "",
                    country: customer.defaultAddress.country || "",
                    zip: customer.defaultAddress.zip || "",
                    phone: customer.defaultAddress.phone || "",
                  }
                : null,
            });
          }
        }
      });
      const customers = Array.from(customerMap.values());
      console.log(
        "Admin fetch: total customers sent to frontend:",
        customers.length
      );
      return res.json({ customers });
    }

    // For all other emails, require vendorUid and filter
    if (!vendorUid) {
      return res.status(400).json({ error: "vendorUid is required" });
    }

    const ordersQuery = `
      {
        orders(first: 100) {
          edges {
            node {
              id
              customer {
                id
                firstName
                lastName
                displayName
                email
                numberOfOrders
                amountSpent {
                  amount
                  currencyCode
                }
                defaultAddress {
                  address1
                  address2
                  city
                  province
                  country
                  zip
                  phone
                }
              }
              lineItems(first: 25) {
                edges {
                  node {
                    id
                    product {
                      id
                      title
                      metafield(namespace: "custom", key: "vendor_uid") {
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `;
    const response = await client.query({ data: ordersQuery });
    const rawOrders = response.body.data.orders.edges.map((edge) => edge.node);
    // Filter orders that have products with matching vendorUid
    const filteredOrders = rawOrders.filter((order) => {
      if (!order.customer) return false;
      return order.lineItems.edges.some((lineItemEdge) => {
        const product = lineItemEdge.node.product;
        return product?.metafield?.value === vendorUid;
      });
    });
    // Extract unique customers from filtered orders
    const customerMap = new Map();
    filteredOrders.forEach((order) => {
      if (order.customer) {
        const customer = order.customer;
        if (!customerMap.has(customer.id)) {
          customerMap.set(customer.id, {
            id: customer.id,
            firstName: customer.firstName || "",
            lastName: customer.lastName || "",
            displayName: customer.displayName || "",
            email: customer.email || "",
            numberOfOrders: parseInt(customer.numberOfOrders || "0"),
            amountSpent: customer.amountSpent
              ? `${customer.amountSpent.amount} ${customer.amountSpent.currencyCode}`
              : "0.0",
            defaultAddress: customer.defaultAddress
              ? {
                  address1: customer.defaultAddress.address1 || "",
                  address2: customer.defaultAddress.address2 || "",
                  city: customer.defaultAddress.city || "",
                  province: customer.defaultAddress.province || "",
                  country: customer.defaultAddress.country || "",
                  zip: customer.defaultAddress.zip || "",
                  phone: customer.defaultAddress.phone || "",
                }
              : null,
          });
        }
      }
    });
    const customers = Array.from(customerMap.values());
    return res.json({ customers });
  } catch (err) {
    console.error("❌ Error fetching customers:", JSON.stringify(err, null, 2));
    res.status(500).json({ error: "Could not fetch customers" });
  }
});
export { client };
