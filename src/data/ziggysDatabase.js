// ============================================================
//  ZIGGY'S GROCERY — FAKE STORE DATABASE (for testing)
// ============================================================

export const STORE_INFO = {
  name: "Ziggy's Grocery",
  tagline: "Fresh. Fast. Friendly.",
  address: "42 Market Street, Burlington, VT",
  hours: "Mon–Sun: 7am – 10pm",
  totalAisles: 8,
};

// ------------------------------------------------------------
//  STORE MAP
//  Grid is 10 cols x 8 rows. Each cell: { type, label, aisle }
//  types: "aisle", "endcap", "entrance", "checkout", "empty", "deli", "produce"
// ------------------------------------------------------------
export const STORE_MAP = {
  cols: 10,
  rows: 8,
  grid: [
    // Row 0 (top) — wall / entrance
    [
      { type: "wall" }, { type: "wall" }, { type: "wall" }, { type: "wall" },
      { type: "entrance", label: "🚪 Entrance" },
      { type: "entrance", label: "🚪 Entrance" },
      { type: "wall" }, { type: "wall" }, { type: "wall" }, { type: "wall" },
    ],
    // Row 1 — Produce + Bakery
    [
      { type: "produce", label: "Produce", aisle: "P" },
      { type: "produce", label: "Produce", aisle: "P" },
      { type: "produce", label: "Produce", aisle: "P" },
      { type: "empty" },
      { type: "walkway" },
      { type: "walkway" },
      { type: "empty" },
      { type: "bakery", label: "Bakery", aisle: "B" },
      { type: "bakery", label: "Bakery", aisle: "B" },
      { type: "bakery", label: "Bakery", aisle: "B" },
    ],
    // Row 2 — Aisle 1 + 2
    [
      { type: "aisle", label: "Aisle 1", aisle: 1 },
      { type: "aisle", label: "Aisle 1", aisle: 1 },
      { type: "aisle", label: "Aisle 1", aisle: 1 },
      { type: "endcap", label: "End Cap", aisle: 1 },
      { type: "walkway" },
      { type: "walkway" },
      { type: "endcap", label: "End Cap", aisle: 2 },
      { type: "aisle", label: "Aisle 2", aisle: 2 },
      { type: "aisle", label: "Aisle 2", aisle: 2 },
      { type: "aisle", label: "Aisle 2", aisle: 2 },
    ],
    // Row 3 — Aisle 3 + 4
    [
      { type: "aisle", label: "Aisle 3", aisle: 3 },
      { type: "aisle", label: "Aisle 3", aisle: 3 },
      { type: "aisle", label: "Aisle 3", aisle: 3 },
      { type: "endcap", label: "End Cap", aisle: 3 },
      { type: "walkway" },
      { type: "walkway" },
      { type: "endcap", label: "End Cap", aisle: 4 },
      { type: "aisle", label: "Aisle 4", aisle: 4 },
      { type: "aisle", label: "Aisle 4", aisle: 4 },
      { type: "aisle", label: "Aisle 4", aisle: 4 },
    ],
    // Row 4 — Aisle 5 + 6
    [
      { type: "aisle", label: "Aisle 5", aisle: 5 },
      { type: "aisle", label: "Aisle 5", aisle: 5 },
      { type: "aisle", label: "Aisle 5", aisle: 5 },
      { type: "endcap", label: "End Cap", aisle: 5 },
      { type: "walkway" },
      { type: "walkway" },
      { type: "endcap", label: "End Cap", aisle: 6 },
      { type: "aisle", label: "Aisle 6", aisle: 6 },
      { type: "aisle", label: "Aisle 6", aisle: 6 },
      { type: "aisle", label: "Aisle 6", aisle: 6 },
    ],
    // Row 5 — Aisle 7 + 8
    [
      { type: "aisle", label: "Aisle 7", aisle: 7 },
      { type: "aisle", label: "Aisle 7", aisle: 7 },
      { type: "aisle", label: "Aisle 7", aisle: 7 },
      { type: "endcap", label: "End Cap", aisle: 7 },
      { type: "walkway" },
      { type: "walkway" },
      { type: "endcap", label: "End Cap", aisle: 8 },
      { type: "aisle", label: "Aisle 8", aisle: 8 },
      { type: "aisle", label: "Aisle 8", aisle: 8 },
      { type: "aisle", label: "Aisle 8", aisle: 8 },
    ],
    // Row 6 — Deli + Frozen
    [
      { type: "deli", label: "Deli", aisle: "D" },
      { type: "deli", label: "Deli", aisle: "D" },
      { type: "deli", label: "Deli", aisle: "D" },
      { type: "empty" },
      { type: "walkway" },
      { type: "walkway" },
      { type: "empty" },
      { type: "frozen", label: "Frozen", aisle: "F" },
      { type: "frozen", label: "Frozen", aisle: "F" },
      { type: "frozen", label: "Frozen", aisle: "F" },
    ],
    // Row 7 — Checkout
    [
      { type: "checkout", label: "Checkout 1" },
      { type: "checkout", label: "Checkout 2" },
      { type: "checkout", label: "Checkout 3" },
      { type: "checkout", label: "Self Check" },
      { type: "checkout", label: "Self Check" },
      { type: "checkout", label: "Self Check" },
      { type: "checkout", label: "Self Check" },
      { type: "checkout", label: "Checkout 4" },
      { type: "checkout", label: "Checkout 5" },
      { type: "checkout", label: "Checkout 6" },
    ],
  ],
};

// ------------------------------------------------------------
//  AISLE DIRECTORY
// ------------------------------------------------------------
export const AISLE_DIRECTORY = {
  P:  { name: "Produce",         color: "#22c55e", emoji: "🥦" },
  B:  { name: "Bakery",          color: "#f59e0b", emoji: "🍞" },
  D:  { name: "Deli",            color: "#f97316", emoji: "🥩" },
  F:  { name: "Frozen Foods",    color: "#60a5fa", emoji: "🧊" },
  1:  { name: "Cereal & Breakfast", color: "#a3e635", emoji: "🥣" },
  2:  { name: "Snacks & Chips",  color: "#fb923c", emoji: "🍿" },
  3:  { name: "Canned Goods",    color: "#fbbf24", emoji: "🥫" },
  4:  { name: "Pasta, Rice & Grains", color: "#c084fc", emoji: "🍝" },
  5:  { name: "Beverages",       color: "#38bdf8", emoji: "🥤" },
  6:  { name: "Dairy & Eggs",    color: "#f0fdf4", emoji: "🥛" },
  7:  { name: "Meat & Seafood",  color: "#f87171", emoji: "🍗" },
  8:  { name: "Household & Cleaning", color: "#e2e8f0", emoji: "🧹" },
};

// ------------------------------------------------------------
//  PRODUCTS (id, name, category, aisle, row, price, image emoji)
// ------------------------------------------------------------
export const PRODUCTS = [
  // Produce
  { id: "p001", name: "Bananas",          aisle: "P", price: 0.59,  unit: "per lb",  emoji: "🍌", category: "Produce" },
  { id: "p002", name: "Roma Tomatoes",    aisle: "P", price: 1.29,  unit: "per lb",  emoji: "🍅", category: "Produce" },
  { id: "p003", name: "Broccoli Crown",   aisle: "P", price: 1.49,  unit: "each",    emoji: "🥦", category: "Produce" },
  { id: "p004", name: "Baby Spinach",     aisle: "P", price: 3.49,  unit: "5oz bag", emoji: "🥬", category: "Produce" },
  { id: "p005", name: "Strawberries",     aisle: "P", price: 4.99,  unit: "1lb",     emoji: "🍓", category: "Produce" },
  { id: "p006", name: "Avocados",         aisle: "P", price: 1.29,  unit: "each",    emoji: "🥑", category: "Produce" },
  { id: "p007", name: "Yellow Onions",    aisle: "P", price: 0.79,  unit: "per lb",  emoji: "🧅", category: "Produce" },
  { id: "p008", name: "Garlic Bulb",      aisle: "P", price: 0.99,  unit: "each",    emoji: "🧄", category: "Produce" },

  // Bakery
  { id: "b001", name: "Sourdough Loaf",   aisle: "B", price: 5.49,  unit: "each",    emoji: "🍞", category: "Bakery" },
  { id: "b002", name: "Blueberry Muffins",aisle: "B", price: 4.99,  unit: "4pk",     emoji: "🧁", category: "Bakery" },
  { id: "b003", name: "Croissants",       aisle: "B", price: 5.99,  unit: "6pk",     emoji: "🥐", category: "Bakery" },

  // Cereal & Breakfast (Aisle 1)
  { id: "a1001", name: "Cheerios",        aisle: 1,   price: 4.79,  unit: "12oz",    emoji: "⭕", category: "Cereal" },
  { id: "a1002", name: "Honey Bunches of Oats", aisle: 1, price: 3.99, unit: "14.5oz", emoji: "🌾", category: "Cereal" },
  { id: "a1003", name: "Quaker Oats",     aisle: 1,   price: 3.49,  unit: "42oz",    emoji: "🥣", category: "Cereal" },
  { id: "a1004", name: "Frosted Flakes",  aisle: 1,   price: 4.29,  unit: "13.5oz",  emoji: "🐯", category: "Cereal" },
  { id: "a1005", name: "Granola Bars",    aisle: 1,   price: 5.49,  unit: "6pk",     emoji: "🍫", category: "Snacks" },
  { id: "a1006", name: "Pop-Tarts",       aisle: 1,   price: 3.99,  unit: "8ct",     emoji: "🍬", category: "Breakfast" },

  // Snacks & Chips (Aisle 2)
  { id: "a2001", name: "Lay's Classic Chips", aisle: 2, price: 4.49, unit: "8oz",   emoji: "🥔", category: "Snacks" },
  { id: "a2002", name: "Doritos Nacho",   aisle: 2,   price: 4.49,  unit: "9.25oz", emoji: "🔶", category: "Snacks" },
  { id: "a2003", name: "Oreo Cookies",    aisle: 2,   price: 5.29,  unit: "14.3oz", emoji: "🍪", category: "Snacks" },
  { id: "a2004", name: "Ritz Crackers",   aisle: 2,   price: 3.99,  unit: "13.7oz", emoji: "🟡", category: "Snacks" },
  { id: "a2005", name: "Popcorn",         aisle: 2,   price: 3.49,  unit: "3pk",    emoji: "🍿", category: "Snacks" },
  { id: "a2006", name: "Mixed Nuts",      aisle: 2,   price: 7.99,  unit: "16oz",   emoji: "🥜", category: "Snacks" },

  // Canned Goods (Aisle 3)
  { id: "a3001", name: "Campbell's Tomato Soup", aisle: 3, price: 1.49, unit: "10.75oz", emoji: "🍲", category: "Canned" },
  { id: "a3002", name: "Black Beans",     aisle: 3,   price: 1.19,  unit: "15oz",   emoji: "🫘", category: "Canned" },
  { id: "a3003", name: "Diced Tomatoes",  aisle: 3,   price: 1.29,  unit: "14.5oz", emoji: "🍅", category: "Canned" },
  { id: "a3004", name: "Tuna Fish",       aisle: 3,   price: 1.69,  unit: "5oz",    emoji: "🐟", category: "Canned" },
  { id: "a3005", name: "Coconut Milk",    aisle: 3,   price: 2.49,  unit: "13.5oz", emoji: "🥥", category: "Canned" },
  { id: "a3006", name: "Corn Kernels",    aisle: 3,   price: 0.99,  unit: "15.25oz",emoji: "🌽", category: "Canned" },

  // Pasta, Rice & Grains (Aisle 4)
  { id: "a4001", name: "Barilla Spaghetti", aisle: 4, price: 1.89, unit: "16oz",   emoji: "🍝", category: "Pasta" },
  { id: "a4002", name: "Penne Pasta",     aisle: 4,   price: 1.89,  unit: "16oz",   emoji: "🍝", category: "Pasta" },
  { id: "a4003", name: "Jasmine Rice",    aisle: 4,   price: 3.99,  unit: "2lb",    emoji: "🍚", category: "Grains" },
  { id: "a4004", name: "Quinoa",          aisle: 4,   price: 5.49,  unit: "16oz",   emoji: "🌾", category: "Grains" },
  { id: "a4005", name: "Mac & Cheese",    aisle: 4,   price: 1.29,  unit: "7.25oz", emoji: "🧀", category: "Pasta" },

  // Beverages (Aisle 5)
  { id: "a5001", name: "Tropicana OJ",    aisle: 5,   price: 4.99,  unit: "52oz",   emoji: "🍊", category: "Juice" },
  { id: "a5002", name: "Poland Spring Water", aisle: 5, price: 5.99, unit: "24pk",  emoji: "💧", category: "Water" },
  { id: "a5003", name: "Coca-Cola 12pk",  aisle: 5,   price: 6.99,  unit: "12pk",   emoji: "🥤", category: "Soda" },
  { id: "a5004", name: "Sprite 12pk",     aisle: 5,   price: 6.99,  unit: "12pk",   emoji: "🟢", category: "Soda" },
  { id: "a5005", name: "Gatorade Blue",   aisle: 5,   price: 1.89,  unit: "32oz",   emoji: "💙", category: "Sports" },
  { id: "a5006", name: "Green Tea",       aisle: 5,   price: 4.49,  unit: "16ct",   emoji: "🍵", category: "Tea" },

  // Dairy & Eggs (Aisle 6)
  { id: "a6001", name: "Whole Milk",      aisle: 6,   price: 3.99,  unit: "1gal",   emoji: "🥛", category: "Dairy" },
  { id: "a6002", name: "2% Milk",         aisle: 6,   price: 3.79,  unit: "1gal",   emoji: "🥛", category: "Dairy" },
  { id: "a6003", name: "Large Eggs",      aisle: 6,   price: 4.29,  unit: "1doz",   emoji: "🥚", category: "Dairy" },
  { id: "a6004", name: "Cheddar Cheese",  aisle: 6,   price: 4.99,  unit: "8oz",    emoji: "🧀", category: "Dairy" },
  { id: "a6005", name: "Greek Yogurt",    aisle: 6,   price: 5.99,  unit: "32oz",   emoji: "🍶", category: "Dairy" },
  { id: "a6006", name: "Butter",          aisle: 6,   price: 4.49,  unit: "1lb",    emoji: "🧈", category: "Dairy" },
  { id: "a6007", name: "Cream Cheese",    aisle: 6,   price: 3.29,  unit: "8oz",    emoji: "🧀", category: "Dairy" },

  // Meat & Seafood (Aisle 7)
  { id: "a7001", name: "Ground Beef 80/20", aisle: 7, price: 6.99, unit: "per lb",  emoji: "🥩", category: "Meat" },
  { id: "a7002", name: "Chicken Breast",  aisle: 7,   price: 5.99,  unit: "per lb", emoji: "🍗", category: "Meat" },
  { id: "a7003", name: "Salmon Fillet",   aisle: 7,   price: 9.99,  unit: "per lb", emoji: "🐟", category: "Seafood" },
  { id: "a7004", name: "Pork Chops",      aisle: 7,   price: 5.49,  unit: "per lb", emoji: "🥩", category: "Meat" },
  { id: "a7005", name: "Turkey Slices",   aisle: 7,   price: 4.99,  unit: "8oz",    emoji: "🦃", category: "Deli Meat" },

  // Household & Cleaning (Aisle 8)
  { id: "a8001", name: "Tide Pods",       aisle: 8,   price: 12.99, unit: "32ct",   emoji: "🫧", category: "Laundry" },
  { id: "a8002", name: "Bounty Paper Towels", aisle: 8, price: 8.99, unit: "6pk",  emoji: "🧻", category: "Paper" },
  { id: "a8003", name: "Glad Trash Bags", aisle: 8,   price: 7.99,  unit: "30ct",   emoji: "🗑️", category: "Bags" },
  { id: "a8004", name: "Windex Spray",    aisle: 8,   price: 4.29,  unit: "23oz",   emoji: "🪟", category: "Cleaning" },
  { id: "a8005", name: "Dawn Dish Soap",  aisle: 8,   price: 2.99,  unit: "19.4oz", emoji: "🫧", category: "Cleaning" },

  // Deli
  { id: "d001", name: "Boar's Head Ham", aisle: "D",  price: 8.99,  unit: "per lb", emoji: "🥩", category: "Deli" },
  { id: "d002", name: "Provolone Cheese", aisle: "D", price: 7.99,  unit: "per lb", emoji: "🧀", category: "Deli" },
  { id: "d003", name: "Roasted Turkey",  aisle: "D",  price: 9.49,  unit: "per lb", emoji: "🦃", category: "Deli" },

  // Frozen
  { id: "f001", name: "DiGiorno Pizza",  aisle: "F",  price: 7.99,  unit: "each",   emoji: "🍕", category: "Frozen" },
  { id: "f002", name: "Ben & Jerry's",   aisle: "F",  price: 5.49,  unit: "pint",   emoji: "🍦", category: "Frozen" },
  { id: "f003", name: "Frozen Broccoli", aisle: "F",  price: 2.49,  unit: "12oz",   emoji: "🥦", category: "Frozen" },
  { id: "f004", name: "Eggo Waffles",    aisle: "F",  price: 3.99,  unit: "10ct",   emoji: "🧇", category: "Frozen" },
  { id: "f005", name: "Frozen Shrimp",   aisle: "F",  price: 10.99, unit: "12oz",   emoji: "🍤", category: "Frozen" },
];

// ------------------------------------------------------------
//  COUPONS
// ------------------------------------------------------------
export const COUPONS = [
  // Store coupons (Ziggy's)
  {
    id: "c001", type: "store", brand: "Ziggy's",
    productId: "a1001", productName: "Cheerios",
    discount: 1.00, discountType: "dollar",
    description: "$1.00 off Cheerios 12oz",
    expires: "2025-08-31", emoji: "⭕",
    featured: true,
  },
  {
    id: "c002", type: "store", brand: "Ziggy's",
    productId: "p005", productName: "Strawberries",
    discount: 1.50, discountType: "dollar",
    description: "$1.50 off Strawberries 1lb",
    expires: "2025-07-15", emoji: "🍓",
    featured: false,
  },
  {
    id: "c003", type: "store", brand: "Ziggy's",
    productId: "a6003", productName: "Large Eggs",
    discount: 0.75, discountType: "dollar",
    description: "$0.75 off Large Eggs 1doz",
    expires: "2025-07-20", emoji: "🥚",
    featured: true,
  },
  {
    id: "c004", type: "store", brand: "Ziggy's",
    productId: "a5003", productName: "Coca-Cola 12pk",
    discount: 2.00, discountType: "dollar",
    description: "$2.00 off Coca-Cola 12pk",
    expires: "2025-08-01", emoji: "🥤",
    featured: true,
  },
  // Manufacturer coupons
  {
    id: "c005", type: "manufacturer", brand: "General Mills",
    productId: "a1001", productName: "Cheerios",
    discount: 0.50, discountType: "dollar",
    description: "$0.50 off any Cheerios (manufacturer)",
    expires: "2025-09-30", emoji: "⭕",
    featured: false,
    stackable: true,
  },
  {
    id: "c006", type: "manufacturer", brand: "Barilla",
    productId: "a4001", productName: "Barilla Spaghetti",
    discount: 0.50, discountType: "dollar",
    description: "$0.50 off Barilla Pasta",
    expires: "2025-08-15", emoji: "🍝",
    featured: false,
    stackable: true,
  },
  {
    id: "c007", type: "manufacturer", brand: "Tropicana",
    productId: "a5001", productName: "Tropicana OJ",
    discount: 1.00, discountType: "dollar",
    description: "$1.00 off Tropicana OJ 52oz",
    expires: "2025-07-31", emoji: "🍊",
    featured: true,
    stackable: true,
  },
  {
    id: "c008", type: "store", brand: "Ziggy's",
    productId: "a7002", productName: "Chicken Breast",
    discount: 10, discountType: "percent",
    description: "10% off Chicken Breast",
    expires: "2025-07-18", emoji: "🍗",
    featured: false,
  },
  {
    id: "c009", type: "store", brand: "Ziggy's",
    productId: "a8001", productName: "Tide Pods",
    discount: 3.00, discountType: "dollar",
    description: "$3.00 off Tide Pods 32ct",
    expires: "2025-08-10", emoji: "🫧",
    featured: true,
  },
  {
    id: "c010", type: "manufacturer", brand: "Coca-Cola",
    productId: "a5003", productName: "Coca-Cola 12pk",
    discount: 1.00, discountType: "dollar",
    description: "$1.00 off Coca-Cola 12pk (manufacturer)",
    expires: "2025-09-01", emoji: "🥤",
    featured: false,
    stackable: true,
  },
];

// Helper functions
export function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

export function getCouponsForProduct(productId) {
  return COUPONS.filter(c => c.productId === productId);
}

export function getProductsInAisle(aisle) {
  return PRODUCTS.filter(p => p.aisle === aisle);
}

export function searchProducts(query) {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q)
  );
}

export function calculateSavings(cartItems) {
  let total = 0;
  let savings = 0;
  cartItems.forEach(({ product, quantity, appliedCoupons }) => {
    const base = product.price * quantity;
    total += base;
    (appliedCoupons || []).forEach(coupon => {
      if (coupon.discountType === "dollar") savings += coupon.discount;
      if (coupon.discountType === "percent") savings += base * (coupon.discount / 100);
    });
  });
  return { total, savings, finalTotal: total - savings };
}

// ------------------------------------------------------------
//  PRODUCT SHELF LOCATIONS  (shown in aisle navigator)
// ------------------------------------------------------------
export const PRODUCT_LOCATIONS = {
  p001: "Entrance bin display",      p002: "Right side · eye level",
  p003: "Center table display",      p004: "End of aisle · refrigerated",
  p005: "Left side · middle shelf",  p006: "Center bin",
  p007: "Left side · lower shelf",
  b001: "Front shelf",               b002: "Center display",
  b003: "Right side · eye level",    b004: "Left side",
  a1001: "Left side · eye level",    a1002: "Left side · lower shelf",
  a1003: "Right side · eye level",   a1004: "Right side · top shelf",
  a1005: "Left side · top shelf",
  a2001: "Left side · eye level",    a2002: "Right side · eye level",
  a2003: "Right side · lower shelf", a2004: "Left side · top shelf",
  a2005: "End cap",
  a3001: "Left side · eye level",    a3002: "Center display",
  a3003: "Right side · lower shelf", a3004: "Right side · eye level",
  a3005: "Left side · lower shelf",
  a4001: "Left side · eye level",    a4002: "Left side · lower shelf",
  a4003: "Right side · eye level",   a4004: "Right side · top shelf",
  a4005: "End cap",
  a5001: "Left side · top shelf",    a5002: "Left side · eye level",
  a5003: "Floor display",            a5004: "Right side · lower shelf",
  a5005: "Right side · eye level",
  a6001: "Refrigerated · left door", a6002: "Refrigerated · center door",
  a6003: "Refrigerated · right door",a6004: "Refrigerated · left door",
  a6005: "Refrigerated · center door",
  a7001: "Butcher counter",          a7002: "Refrigerated · left case",
  a7003: "Refrigerated · center case",a7004: "Refrigerated · right case",
  a7005: "Refrigerated · end case",
  a8001: "Right side · eye level",   a8002: "Left side · top shelf",
  a8003: "Left side · lower shelf",  a8004: "Right side · lower shelf",
  a8005: "Right side · top shelf",
  d001: "Deli counter · ask staff",  d002: "Deli counter · ask staff",
  d003: "Deli counter · ask staff",
  f001: "Frozen · aisle A · door 3", f002: "Frozen · aisle B · door 5",
  f003: "Frozen · aisle C · door 8", f004: "Frozen · aisle A · door 2",
  f005: "Frozen · aisle B · door 4",
};

// ------------------------------------------------------------
//  AISLE DEALS  (store promos + Ibotta-style coupons per aisle)
//  savings: dollar amount; percent: true/false for % discounts
// ------------------------------------------------------------
export const AISLE_DEALS = {
  P: {
    storeDeals: [
      { id: "sd-p1", product: "Strawberries", detail: "Buy 1 lb, get 1 free", savings: 1.99, productId: "p005" },
      { id: "sd-p2", product: "Organic Apples", detail: "$0.50 off per lb this week", savings: 0.50, productId: "p003" },
    ],
    ibottaCoupons: [
      { id: "ib-p1", product: "Bananas", detail: "$0.25 cash back on any purchase", savings: 0.25, productId: "p001" },
    ],
  },
  B: {
    storeDeals: [
      { id: "sd-b1", product: "Sourdough Bread", detail: "2 loaves for $5.00", savings: 1.00, productId: "b001" },
    ],
    ibottaCoupons: [
      { id: "ib-b1", product: "Bagels", detail: "$0.50 cash back any bagels", savings: 0.50, productId: "b003" },
    ],
  },
  1: {
    storeDeals: [
      { id: "sd-1a", product: "Cheerios (18oz)", detail: "Buy 2 save $1.50", savings: 1.50, productId: "a1001" },
      { id: "sd-1b", product: "Nature Valley Bars", detail: "$1.00 off any variety", savings: 1.00, productId: "a1003" },
    ],
    ibottaCoupons: [
      { id: "ib-1a", product: "Quaker Oats (42oz)", detail: "$1.00 cash back", savings: 1.00, productId: "a1002" },
      { id: "ib-1b", product: "Cheerios", detail: "$0.50 manufacturer cash back", savings: 0.50, productId: "a1001" },
    ],
  },
  2: {
    storeDeals: [
      { id: "sd-2a", product: "Lay's Chips", detail: "2 bags for $6.00", savings: 1.00, productId: "a2001" },
    ],
    ibottaCoupons: [
      { id: "ib-2a", product: "Doritos", detail: "$0.75 cash back on any bag", savings: 0.75, productId: "a2002" },
      { id: "ib-2b", product: "CLIF Bar 5-pack", detail: "$1.00 cash back", savings: 1.00, productId: "a2004" },
    ],
  },
  3: {
    storeDeals: [
      { id: "sd-3a", product: "Heinz Ketchup", detail: "Buy 2, get $1.00 off", savings: 1.00, productId: "a3002" },
    ],
    ibottaCoupons: [
      { id: "ib-3a", product: "Campbell's Soup", detail: "$0.50 cash back on any variety", savings: 0.50, productId: "a3001" },
      { id: "ib-3b", product: "Del Monte Corn", detail: "$0.25 cash back per can", savings: 0.25, productId: "a3003" },
    ],
  },
  4: {
    storeDeals: [
      { id: "sd-4a", product: "Barilla Pasta", detail: "3 boxes for $4.00", savings: 1.50, productId: "a4001" },
    ],
    ibottaCoupons: [
      { id: "ib-4a", product: "Barilla Spaghetti", detail: "$0.50 cash back", savings: 0.50, productId: "a4001" },
      { id: "ib-4b", product: "Uncle Ben's Rice", detail: "$1.00 cash back", savings: 1.00, productId: "a4003" },
    ],
  },
  5: {
    storeDeals: [
      { id: "sd-5a", product: "Coca-Cola 12pk", detail: "$2.00 off this week only", savings: 2.00, productId: "a5003" },
    ],
    ibottaCoupons: [
      { id: "ib-5a", product: "Tropicana OJ (52oz)", detail: "$1.00 cash back", savings: 1.00, productId: "a5001" },
      { id: "ib-5b", product: "Coca-Cola 12pk", detail: "$1.00 manufacturer cash back", savings: 1.00, productId: "a5003" },
    ],
  },
  6: {
    storeDeals: [
      { id: "sd-6a", product: "Large Eggs", detail: "$0.75 off 1 dozen", savings: 0.75, productId: "a6003" },
      { id: "sd-6b", product: "Shredded Cheddar", detail: "Buy 2 bags, save $1.50", savings: 1.50, productId: "a6004" },
    ],
    ibottaCoupons: [
      { id: "ib-6a", product: "Yoplait Yogurt 4-pack", detail: "$0.50 cash back", savings: 0.50, productId: "a6002" },
    ],
  },
  7: {
    storeDeals: [
      { id: "sd-7a", product: "Chicken Breast", detail: "10% off all chicken this week", savings: null, isPercent: true, percentOff: 10, productId: "a7002" },
    ],
    ibottaCoupons: [
      { id: "ib-7a", product: "Salmon Fillet", detail: "$1.50 cash back per lb", savings: 1.50, productId: "a7003" },
      { id: "ib-7b", product: "Pork Chops", detail: "$0.75 cash back", savings: 0.75, productId: "a7004" },
    ],
  },
  8: {
    storeDeals: [
      { id: "sd-8a", product: "Tide Pods (32ct)", detail: "$3.00 off this week only", savings: 3.00, productId: "a8001" },
    ],
    ibottaCoupons: [
      { id: "ib-8a", product: "Bounty Paper Towels", detail: "$1.00 cash back on 6-pack", savings: 1.00, productId: "a8002" },
      { id: "ib-8b", product: "Dawn Dish Soap", detail: "$0.50 cash back", savings: 0.50, productId: "a8005" },
    ],
  },
  D: {
    storeDeals: [
      { id: "sd-d1", product: "Boar's Head Ham", detail: "$1.00 off per lb today", savings: 1.00, productId: "d001" },
    ],
    ibottaCoupons: [],
  },
  F: {
    storeDeals: [
      { id: "sd-f1", product: "Ben & Jerry's", detail: "2 pints for $9.00", savings: 1.98, productId: "f002" },
    ],
    ibottaCoupons: [
      { id: "ib-f1", product: "DiGiorno Pizza", detail: "$1.50 cash back", savings: 1.50, productId: "f001" },
    ],
  },
};
