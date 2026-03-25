# SmartCart

A smart grocery shopping app that helps customers navigate a store, find products, clip coupons, and get an optimized route through the aisles. Built as a white-label SaaS concept. The demo runs on Ziggy's Grocery, a fully fleshed-out fake store.

## Features

- **Product browsing** - search and filter 60+ products by aisle with inline coupon highlights
- **Visual store map** - a 10x8 grid of the store showing all aisles, endcaps, entrance, and checkout. Click any aisle to browse its products
- **Route generator** - once items are in the cart, the app calculates the most efficient path through the store so you don't backtrack
- **Coupon page** - browse all store and manufacturer coupons with filters by type
- **Cart page** - full cart with quantity controls, auto-applied coupons, and total savings breakdown
- **Zero backend needed** - the entire store is defined in one local JS file, so the demo runs with no API or database

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + React Router v6 |
| State | React Context API |
| Styling | CSS custom properties |
| Icons | Lucide React |
| Fonts | Syne + DM Sans (Google Fonts) |
| Data | Local JS module |

## Getting Started

### Prerequisites

- Node.js 18 or higher

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

## Project Structure

```
smartcart/
├── public/
│   └── index.html              # HTML entry point
└── src/
    ├── data/
    │   └── ziggysDatabase.js   # The entire fake store lives here
    ├── context/
    │   └── CartContext.js      # Global cart state and route generator
    ├── components/
    │   └── Navbar.js           # Top nav with cart badge
    ├── pages/
    │   ├── Home.js             # Landing page with stats and featured deals
    │   ├── StorePage.js        # Browse all products with search and filter
    │   ├── MapPage.js          # Visual store map with aisle click-through
    │   ├── CouponsPage.js      # All coupons (store and manufacturer)
    │   └── CartPage.js         # Cart items, totals, savings, and route
    ├── App.js                  # Router and layout
    └── App.css                 # Design system (green, orange, white)
```

## Ziggy's Grocery Store Data

The fake store is defined entirely in `src/data/ziggysDatabase.js`.

| Section | Details |
|---|---|
| Products | 60+ items across 10 sections |
| Aisles | P (Produce), B (Bakery), 1 to 8, D (Deli), F (Frozen) |
| Coupons | 10 coupons, mix of store and manufacturer |
| Store Map | 10x8 grid with entrance, aisles, endcaps, and checkout |

### Adding a new product

```js
// In src/data/ziggysDatabase.js, add to the PRODUCTS array
{ id: "a2007", name: "Pringles", aisle: 2, price: 2.99, unit: "5.5oz", emoji: "🥔", category: "Snacks" },
```

### Adding a new coupon

```js
// In src/data/ziggysDatabase.js, add to the COUPONS array
{
  id: "c011", type: "store", brand: "Ziggy's",
  productId: "a2007", productName: "Pringles",
  discount: 0.50, discountType: "dollar",
  description: "$0.50 off Pringles",
  expires: "2025-09-01", emoji: "🥔",
  featured: false,
},
```

## Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Landing page with stats and featured deals |
| Store | `/store` | Search and filter all products |
| Map | `/map` | Visual store map and aisle browser |
| Coupons | `/coupons` | All available coupons |
| Cart | `/cart` | Cart summary, savings, and shopping route |

## Business Model (Pitch)

This is a SaaS concept. The way it would make money:

1. **Monthly license fee** - charge grocery stores per location
2. **Sponsored placement** - brands pay to appear at the top of their aisle section
3. **Coupon analytics** - sell engagement data back to brands
4. **Manufacturer coupon handling fee** - earn from the standard reimbursement process

The pitch: a store gives us their product and aisle data, we handle everything else. Customers get in-store navigation and coupons. Stores get a new engagement channel and data.

## Scaling Up

When ready to move beyond the demo:

| Feature | What to add |
|---|---|
| Real store data | Replace `ziggysDatabase.js` with a REST API or Firebase |
| Auth | Firebase Auth or Supabase |
| QR code scanning | `react-qr-reader` for scanning barcodes in-store |
| Admin panel | Separate React app for managers to update products and coupons |
| Analytics | Posthog or Mixpanel for tracking aisle engagement |
