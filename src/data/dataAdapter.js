// ============================================================
//  SMARTCART — DATA ADAPTER LAYER
//  
//  This file is the single source of truth for WHERE data comes from.
//  Right now it runs on the Ziggy's fake database.
//  When you sign a real store, you swap the adapter — nothing else changes.
//
//  THREE INTEGRATION OPTIONS:
//    Option A — CSV Upload      (small stores, pilots)
//    Option B — Admin Dashboard (mid-size chains)
//    Option C — Direct API/ERP  (Walmart, Kroger, enterprise)
//
//  To switch modes: change DATA_SOURCE below.
// ============================================================

import * as ZiggysDB from "./ziggysDatabase";

// ── CONFIG ──────────────────────────────────────────────────
// Change this to switch data source:
//   "fake"       → Ziggy's local database (current)
//   "csv"        → Option A: uploaded CSV file
//   "dashboard"  → Option B: SmartCart admin API
//   "erp"        → Option C: direct ERP/inventory system
export const DATA_SOURCE = "fake";

// When using "dashboard" or "erp", set your store ID + API base here:
export const STORE_CONFIG = {
  storeId:  "ziggys_001",
  apiBase:  "https://api.smartcart.io/v1",   // your backend URL (future)
  apiKey:   null,                             // injected at runtime
};
// ────────────────────────────────────────────────────────────


// ============================================================
//  UNIFIED API  (same calls regardless of source)
// ============================================================

export async function getProducts() {
  switch (DATA_SOURCE) {
    case "fake":      return ZiggysDB.PRODUCTS;
    case "csv":       return OptionA.getProducts();
    case "dashboard": return OptionB.getProducts();
    case "erp":       return OptionC.getProducts();
    default:          return ZiggysDB.PRODUCTS;
  }
}

export async function getCoupons() {
  switch (DATA_SOURCE) {
    case "fake":      return ZiggysDB.COUPONS;
    case "csv":       return OptionA.getCoupons();
    case "dashboard": return OptionB.getCoupons();
    case "erp":       return OptionC.getCoupons();
    default:          return ZiggysDB.COUPONS;
  }
}

export async function getStoreMap() {
  switch (DATA_SOURCE) {
    case "fake":      return ZiggysDB.STORE_MAP;
    case "csv":       return OptionA.getStoreMap();
    case "dashboard": return OptionB.getStoreMap();
    case "erp":       return OptionC.getStoreMap();
    default:          return ZiggysDB.STORE_MAP;
  }
}

export async function getStoreInfo() {
  switch (DATA_SOURCE) {
    case "fake":      return ZiggysDB.STORE_INFO;
    case "dashboard": return OptionB.getStoreInfo();
    case "erp":       return OptionC.getStoreInfo();
    default:          return ZiggysDB.STORE_INFO;
  }
}

// Re-export helpers that don't need async (always from local data)
export const { searchProducts, getCouponsForProduct, getProductsInAisle, AISLE_DIRECTORY } = ZiggysDB;


// ============================================================
//  OPTION A — CSV UPLOAD
//  
//  How it works:
//    Store manager logs into SmartCart portal → uploads a spreadsheet.
//    We parse it in the browser and store it in localStorage.
//    No backend needed for a pilot.
//
//  CSV format expected:
//    id, name, category, aisle, price, unit, emoji
//
//  When to use:
//    • First pilot with a local store
//    • Store has no IT department
//    • You want to close a deal in a week
// ============================================================
const OptionA = {

  // Parse a CSV file object → array of product objects
  parseCSV(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const lines = e.target.result.split("\n").filter(Boolean);
          const headers = lines[0].split(",").map(h => h.trim().toLowerCase());
          const products = lines.slice(1).map((line, i) => {
            const vals = line.split(",").map(v => v.trim().replace(/"/g, ""));
            const obj = {};
            headers.forEach((h, idx) => { obj[h] = vals[idx] || ""; });
            return {
              id:       obj.id       || `csv_${i}`,
              name:     obj.name     || "Unknown",
              category: obj.category || "General",
              aisle:    isNaN(obj.aisle) ? obj.aisle : Number(obj.aisle),
              price:    parseFloat(obj.price) || 0,
              unit:     obj.unit     || "each",
              emoji:    obj.emoji    || "🛒",
            };
          });
          resolve(products);
        } catch (err) {
          reject(new Error("CSV parse error: " + err.message));
        }
      };
      reader.onerror = () => reject(new Error("File read failed"));
      reader.readAsText(file);
    });
  },

  // Save parsed products to localStorage (browser cache)
  saveToLocal(products, coupons = []) {
    localStorage.setItem("sc_products", JSON.stringify(products));
    localStorage.setItem("sc_coupons",  JSON.stringify(coupons));
    localStorage.setItem("sc_source",   "csv");
    localStorage.setItem("sc_updated",  new Date().toISOString());
  },

  getProducts() {
    const raw = localStorage.getItem("sc_products");
    return raw ? JSON.parse(raw) : ZiggysDB.PRODUCTS;
  },

  getCoupons() {
    const raw = localStorage.getItem("sc_coupons");
    return raw ? JSON.parse(raw) : ZiggysDB.COUPONS;
  },

  getStoreMap() {
    // For CSV pilots, map is manually configured or defaults to Ziggy's
    const raw = localStorage.getItem("sc_map");
    return raw ? JSON.parse(raw) : ZiggysDB.STORE_MAP;
  },

  // Generate a template CSV for stores to fill out
  downloadTemplate() {
    const headers = "id,name,category,aisle,price,unit,emoji";
    const example = [
      "p001,Bananas,Produce,P,0.59,per lb,🍌",
      "a1001,Cheerios,Cereal,1,4.79,12oz,⭕",
      "a5003,Coca-Cola 12pk,Soda,5,6.99,12pk,🥤",
    ].join("\n");
    const csv = `${headers}\n${example}`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "smartcart_products_template.csv";
    a.click(); URL.revokeObjectURL(url);
  },
};

export { OptionA };


// ============================================================
//  OPTION B — SMARTCART ADMIN DASHBOARD API
//
//  How it works:
//    Store manager has a login to your SmartCart web portal.
//    They manage products, aisles, coupons through a UI.
//    Your backend (FastAPI + Supabase) stores and serves the data.
//    The app fetches from YOUR API using the store's ID + API key.
//
//  Backend endpoints you'd build (FastAPI):
//    GET  /v1/stores/:id/products
//    GET  /v1/stores/:id/coupons
//    GET  /v1/stores/:id/map
//    POST /v1/stores/:id/products     (admin only)
//    PUT  /v1/stores/:id/products/:pid
//    DELETE /v1/stores/:id/products/:pid
//
//  When to use:
//    • Signed a regional chain (10–50 stores)
//    • Store wants ongoing control over their data
//    • You want recurring SaaS revenue
// ============================================================
const OptionB = {

  _headers() {
    return {
      "Content-Type": "application/json",
      "X-API-Key": STORE_CONFIG.apiKey || "",
      "X-Store-ID": STORE_CONFIG.storeId,
    };
  },

  async _get(path) {
    const res = await fetch(`${STORE_CONFIG.apiBase}${path}`, {
      headers: this._headers(),
    });
    if (!res.ok) throw new Error(`SmartCart API error: ${res.status}`);
    return res.json();
  },

  async getProducts() {
    // GET /v1/stores/:id/products
    const data = await this._get(`/stores/${STORE_CONFIG.storeId}/products`);
    return data.products || [];
  },

  async getCoupons() {
    // GET /v1/stores/:id/coupons
    const data = await this._get(`/stores/${STORE_CONFIG.storeId}/coupons`);
    return data.coupons || [];
  },

  async getStoreMap() {
    // GET /v1/stores/:id/map
    const data = await this._get(`/stores/${STORE_CONFIG.storeId}/map`);
    return data.map || ZiggysDB.STORE_MAP;
  },

  async getStoreInfo() {
    const data = await this._get(`/stores/${STORE_CONFIG.storeId}/info`);
    return data.store || ZiggysDB.STORE_INFO;
  },

  // Admin: push product update (called from your admin portal)
  async updateProduct(productId, updates) {
    const res = await fetch(
      `${STORE_CONFIG.apiBase}/stores/${STORE_CONFIG.storeId}/products/${productId}`,
      { method: "PUT", headers: this._headers(), body: JSON.stringify(updates) }
    );
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },

  // Admin: bulk upload (replaces Option A CSV with a server-side version)
  async bulkUpload(products) {
    const res = await fetch(
      `${STORE_CONFIG.apiBase}/stores/${STORE_CONFIG.storeId}/products/bulk`,
      { method: "POST", headers: this._headers(), body: JSON.stringify({ products }) }
    );
    if (!res.ok) throw new Error("Bulk upload failed");
    return res.json();
  },
};

export { OptionB };


// ============================================================
//  OPTION C — DIRECT ERP / INVENTORY SYSTEM INTEGRATION
//
//  How it works:
//    You build a connector to the store's existing system.
//    Data syncs automatically — no manual uploads needed.
//    This is what enterprise deals (Walmart, Kroger) require.
//
//  Common systems and how to connect:
//
//  ┌─────────────────┬──────────────────────────────────────┐
//  │ Walmart          │ Supplier Portal (EDI/API via partner) │
//  │ Kroger           │ Kroger Partner API (apply at         │
//  │                  │ developer.kroger.com)                │
//  │ ShopRite         │ Wakefern cooperative — contact VP    │
//  │                  │ of Digital directly                  │
//  │ Mid-size chains  │ Usually on NCR Voyix, Epicor, or SAP │
//  │                  │ Retail — build one connector, works  │
//  │                  │ for all stores on that platform      │
//  └─────────────────┴──────────────────────────────────────┘
//
//  Sync strategy:
//    • Nightly batch: store pushes full inventory at 2am
//    • Real-time webhook: store pushes changes as they happen
//    • Poll: you pull from their API every X minutes
//
//  When to use:
//    • Enterprise contract signed ($10k+/month)
//    • Store has IT team willing to do integration work
//    • You need real-time price/availability data
// ============================================================
const OptionC = {

  // ── Kroger Partner API ─────────────────────────────────
  // Apply at: https://developer.kroger.com
  // Uses OAuth 2.0. Once approved, you get client credentials.
  kroger: {
    baseUrl: "https://api.kroger.com/v1",
    tokenUrl: "https://api.kroger.com/v1/connect/oauth2/token",

    async getToken(clientId, clientSecret) {
      const res = await fetch(this.tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          scope: "product.compact",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });
      const data = await res.json();
      return data.access_token;
    },

    async searchProducts(token, query, locationId) {
      const res = await fetch(
        `${this.baseUrl}/products?filter.term=${encodeURIComponent(query)}&filter.locationId=${locationId}`,
        { headers: { Authorization: `Bearer ${token}`, Accept: "application/json" } }
      );
      const data = await res.json();
      // Normalize Kroger format → SmartCart format
      return (data.data || []).map(item => ({
        id:       item.productId,
        name:     item.description,
        category: item.categories?.[0] || "General",
        aisle:    item.aisleLocations?.[0]?.number || "?",
        price:    item.items?.[0]?.price?.regular || 0,
        unit:     item.items?.[0]?.size || "each",
        emoji:    "🛒",
      }));
    },
  },

  // ── Generic REST connector (NCR, SAP, custom ERP) ──────
  // Most enterprise systems expose a REST or SOAP API.
  // You'd get docs + credentials from the store's IT team.
  generic: {

    async getProducts(baseUrl, apiKey, storeId) {
      // Example: NCR Voyix product endpoint
      const res = await fetch(`${baseUrl}/catalog/items?siteId=${storeId}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "nep-application-key": apiKey,
        },
      });
      const data = await res.json();
      // Normalize to SmartCart format
      return (data.items || []).map(item => ({
        id:       item.itemCode,
        name:     item.longDescription?.values?.[0]?.value || item.itemCode,
        category: item.departmentId || "General",
        aisle:    item.locationCode || "?",
        price:    item.prices?.[0]?.value || 0,
        unit:     item.unitOfMeasure || "each",
        emoji:    "🛒",
      }));
    },

    async getCoupons(baseUrl, apiKey, storeId) {
      // Most chains have a promotions endpoint
      const res = await fetch(`${baseUrl}/promotions?siteId=${storeId}&active=true`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      const data = await res.json();
      return (data.promotions || []).map(promo => ({
        id:           promo.promotionId,
        type:         promo.source === "manufacturer" ? "manufacturer" : "store",
        productId:    promo.qualifyingItems?.[0]?.itemCode,
        productName:  promo.name,
        discount:     promo.discountAmount || promo.discountPercent,
        discountType: promo.discountAmount ? "dollar" : "percent",
        description:  promo.description,
        expires:      promo.endDate,
        emoji:        "🏷️",
      }));
    },
  },

  // ── Nightly sync runner ────────────────────────────────
  // Call this from a scheduled job (cron) on your backend.
  // Pulls from ERP, normalizes, stores in your Supabase DB.
  async runNightlySync(connector, credentials) {
    console.log(`[SmartCart Sync] Starting nightly sync for store ${credentials.storeId}`);
    try {
      const products = await connector.getProducts(
        credentials.baseUrl, credentials.apiKey, credentials.storeId
      );
      const coupons  = await connector.getCoupons(
        credentials.baseUrl, credentials.apiKey, credentials.storeId
      );
      console.log(`[SmartCart Sync] Pulled ${products.length} products, ${coupons.length} coupons`);
      // TODO: upsert into Supabase
      //   await supabase.from("products").upsert(products);
      //   await supabase.from("coupons").upsert(coupons);
      return { success: true, products: products.length, coupons: coupons.length };
    } catch (err) {
      console.error("[SmartCart Sync] Failed:", err);
      return { success: false, error: err.message };
    }
  },

  // Proxy wrappers so adapter interface matches
  async getProducts() {
    console.warn("OptionC.getProducts: configure credentials in STORE_CONFIG");
    return ZiggysDB.PRODUCTS; // fallback until configured
  },
  async getCoupons() {
    console.warn("OptionC.getCoupons: configure credentials in STORE_CONFIG");
    return ZiggysDB.COUPONS;
  },
  async getStoreMap() { return ZiggysDB.STORE_MAP; },
  async getStoreInfo() { return ZiggysDB.STORE_INFO; },
};

export { OptionC };
