# 🛒 SmartCart — Ziggy's Grocery Demo

> A plug-and-play smart shopping app for grocery stores. This demo runs on **Ziggy's Grocery**, a fake test store.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A code editor (VS Code recommended)

### Installation

```bash
# 1. Navigate into the project
cd smartcart

# 2. Install dependencies
npm install

# 3. Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
smartcart/
├── public/
│   └── index.html              # HTML entry point
├── src/
│   ├── data/
│   │   └── ziggysDatabase.js   ← 🏪 THE WHOLE FAKE STORE LIVES HERE
│   │                             Products, aisles, coupons, store map grid
│   ├── context/
│   │   └── CartContext.js      ← Global cart state, route generator
│   ├── components/
│   │   └── Navbar.js           ← Top nav with cart badge
│   ├── pages/
│   │   ├── Home.js             ← Landing page with stats + featured deals
│   │   ├── StorePage.js        ← Browse all products with search + filter
│   │   ├── MapPage.js          ← Visual store map + aisle click-through
│   │   ├── CouponsPage.js      ← All coupons (store + manufacturer)
│   │   └── CartPage.js         ← Cart items, totals, savings, route
│   ├── App.js                  ← Router + layout
│   └── App.css                 ← Full design system (green/orange/white)
└── package.json
```

---

## 🏪 Ziggy's Grocery — Test Data

The fake store is fully defined in `src/data/ziggysDatabase.js`:

| Section | Details |
|---|---|
| **Products** | 60+ items across 10 sections |
| **Aisles** | P (Produce), B (Bakery), 1–8, D (Deli), F (Frozen) |
| **Coupons** | 10 coupons — mix of store and manufacturer |
| **Store Map** | 10×8 grid — entrance, aisles, endcaps, checkout |

### To add a new product:
```js
// In src/data/ziggysDatabase.js → PRODUCTS array
{ id: "a2007", name: "Pringles", aisle: 2, price: 2.99, unit: "5.5oz", emoji: "🥔", category: "Snacks" },
```

### To add a new coupon:
```js
// In src/data/ziggysDatabase.js → COUPONS array
{
  id: "c011", type: "store", brand: "Ziggy's",
  productId: "a2007", productName: "Pringles",
  discount: 0.50, discountType: "dollar",
  description: "$0.50 off Pringles",
  expires: "2025-09-01", emoji: "🥔",
  featured: false,
},
```

---

## 🎯 Features

| Feature | Page | Description |
|---|---|---|
| **Product Browse** | /store | Search + filter by aisle, see coupons inline |
| **Store Map** | /map | Visual 10×8 grid map, click aisles to see products |
| **Route Generator** | /map + /cart | Generates optimal shopping path from cart items |
| **Coupons** | /coupons | All store + manufacturer coupons, filter by type |
| **Cart** | /cart | Items, quantity controls, auto-applied coupons, savings |

---

## 💰 Monetization Model (Pitch)

1. **Monthly SaaS fee** — charge stores per location to license SmartCart
2. **Sponsored placement** — brands pay to appear at top of their aisle section
3. **Coupon data revenue** — sell engagement analytics back to brands
4. **Manufacturer coupon handling fee** — clip from standard $0.08/coupon reimbursement

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Frontend | React 18 + React Router v6 |
| State | React Context API |
| Styling | CSS custom properties (zero Tailwind needed) |
| Data | Local JS module (no backend, no DB needed for demo) |
| Icons | Lucide React |
| Fonts | Syne (display) + DM Sans (body) — Google Fonts |

> **No paid APIs or databases needed.** Everything runs locally.

---

## 🔜 When you're ready to scale

| Feature | What to add |
|---|---|
| Real store data | Replace `ziggysDatabase.js` with a REST API or Firebase |
| Auth | Add Firebase Auth or Supabase |
| QR code cart | Add `react-qr-reader` for scanning |
| Admin panel | Separate React app for store managers to update products/coupons |
| Analytics | Add Posthog or Mixpanel for tracking aisle engagement |

---

## 📞 Sales Pitch Summary

> *"SmartCart is a plug-and-play SaaS app that any grocery store can white-label. Stores give us their product-aisle data — we handle the rest. Customers get real-time navigation and coupons; stores get engagement data and a new revenue channel. Starting at $X/month per location."*
