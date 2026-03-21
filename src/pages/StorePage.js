import React, { useState, useMemo } from "react";
import { Search, ShoppingCart, Tag } from "lucide-react";
import { PRODUCTS, COUPONS, AISLE_DIRECTORY, getCouponsForProduct } from "../data/ziggysDatabase";
import { useCart } from "../context/CartContext";

export default function StorePage() {
  const [query, setQuery] = useState("");
  const [selectedAisle, setSelectedAisle] = useState("all");
  const [added, setAdded] = useState({});
  const { addToCart } = useCart();

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchQ = !query || p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase());
      const matchA = selectedAisle === "all" || String(p.aisle) === String(selectedAisle);
      return matchQ && matchA;
    });
  }, [query, selectedAisle]);

  const handleAdd = (product) => {
    addToCart(product);
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 1000);
  };

  const aisleKeys = Object.keys(AISLE_DIRECTORY);

  return (
    <div className="page animate-fadeup">
      <div className="page-hero">
        <h1 className="page-title">Browse Store</h1>
        <p className="page-subtitle">All products at Ziggy's Grocery — {PRODUCTS.length} items across {aisleKeys.length} sections</p>
      </div>

      {/* Search */}
      <div className="search-bar mb-6">
        <Search size={18} color="var(--gray-400)" />
        <input
          type="text"
          placeholder="Search products, categories..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          autoFocus
        />
        {query && (
          <button className="btn btn-ghost btn-sm" onClick={() => setQuery("")}>✕</button>
        )}
      </div>

      {/* Aisle Filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        <button
          className={`btn btn-sm ${selectedAisle === "all" ? "btn-primary" : "btn-outline"}`}
          onClick={() => setSelectedAisle("all")}
        >
          All
        </button>
        {aisleKeys.map(key => {
          const aisle = AISLE_DIRECTORY[key];
          const active = String(selectedAisle) === String(key);
          return (
            <button
              key={key}
              className={`btn btn-sm ${active ? "btn-primary" : "btn-ghost"}`}
              style={active ? {} : { border: "1.5px solid var(--gray-200)" }}
              onClick={() => setSelectedAisle(active ? "all" : key)}
            >
              {aisle.emoji} {aisle.name}
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p style={{ color: "var(--gray-500)", fontSize: "0.85rem", marginBottom: 16 }}>
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        {selectedAisle !== "all" && ` in ${AISLE_DIRECTORY[selectedAisle]?.name}`}
      </p>

      {/* Product Grid */}
      <div className="product-grid">
        {filtered.map(product => {
          const coupons = getCouponsForProduct(product.id);
          const bestCoupon = coupons[0];
          const isAdded = added[product.id];
          return (
            <div key={product.id} className="product-card">
              <div className="product-emoji">{product.emoji}</div>
              <div className="product-name">{product.name}</div>
              <div className="product-meta">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <span className="product-unit">{product.unit}</span>
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                <span className="product-aisle-tag">
                  Aisle {product.aisle}
                </span>
                {bestCoupon && (
                  <span className="product-coupon-tag">
                    <Tag size={9} />
                    {bestCoupon.discountType === "dollar"
                      ? `$${bestCoupon.discount.toFixed(2)} off`
                      : `${bestCoupon.discount}% off`}
                  </span>
                )}
              </div>
              <button
                className="product-add-btn"
                onClick={() => handleAdd(product)}
                style={isAdded ? { background: "var(--green-500)" } : {}}
              >
                {isAdded ? "✓ Added!" : <><ShoppingCart size={14} /> Add to Cart</>}
              </button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray-400)" }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>🔍</div>
          <p style={{ fontWeight: 600 }}>No products found for "{query}"</p>
          <button className="btn btn-outline" style={{ marginTop: 16 }} onClick={() => { setQuery(""); setSelectedAisle("all"); }}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
