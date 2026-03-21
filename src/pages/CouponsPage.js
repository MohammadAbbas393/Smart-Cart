import React, { useState } from "react";
import { Tag, Filter } from "lucide-react";
import { COUPONS, getProductById } from "../data/ziggysDatabase";
import { useCart } from "../context/CartContext";

export default function CouponsPage() {
  const [filter, setFilter] = useState("all");
  const { addToCart, cartItems } = useCart();

  const filtered = COUPONS.filter(c => {
    if (filter === "store") return c.type === "store";
    if (filter === "manufacturer") return c.type === "manufacturer";
    if (filter === "stackable") return c.stackable;
    return true;
  });

  const isInCart = (productId) => cartItems.some(i => i.product.id === productId);

  const handleAddProduct = (coupon) => {
    const product = getProductById(coupon.productId);
    if (product) addToCart(product);
  };

  const totalSavings = filtered.reduce((sum, c) => {
    if (c.discountType === "dollar") return sum + c.discount;
    return sum;
  }, 0);

  return (
    <div className="page animate-fadeup">
      <div className="page-hero">
        <h1 className="page-title">Coupons & Deals</h1>
        <p className="page-subtitle">Save more with {COUPONS.length} available coupons — auto-applied when you add items to cart</p>
      </div>

      {/* Summary Banner */}
      <div style={{
        background: "linear-gradient(135deg, var(--orange-500), var(--orange-600))",
        borderRadius: "var(--radius-lg)",
        padding: "20px 24px",
        marginBottom: 24,
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 12,
      }}>
        <div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem" }}>
            Up to ${(totalSavings).toFixed(2)} in savings available
          </div>
          <div style={{ opacity: 0.9, fontSize: "0.85rem", marginTop: 4 }}>
            {COUPONS.filter(c => c.type === "store").length} store coupons · {COUPONS.filter(c => c.type === "manufacturer").length} manufacturer coupons
          </div>
        </div>
        <div style={{ fontSize: "2.5rem" }}>🏷️</div>
      </div>

      {/* How coupons work */}
      <div style={{
        background: "var(--green-50)",
        border: "1.5px solid var(--green-200)",
        borderRadius: "var(--radius-md)",
        padding: "14px 18px",
        marginBottom: 24,
        fontSize: "0.85rem",
        color: "var(--green-700)",
        lineHeight: 1.6,
      }}>
        💡 <strong>How it works:</strong> Coupons are automatically clipped when you add an item with a deal. 
        Manufacturer coupons can stack with store coupons for extra savings.
      </div>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <Filter size={16} style={{ color: "var(--gray-400)", marginRight: 4, alignSelf: "center" }} />
        {[
          { value: "all",          label: "All Coupons" },
          { value: "store",        label: "🏪 Store" },
          { value: "manufacturer", label: "🏭 Manufacturer" },
          { value: "stackable",    label: "⚡ Stackable" },
        ].map(f => (
          <button
            key={f.value}
            className={`btn btn-sm ${filter === f.value ? "btn-primary" : "btn-outline"}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Coupon List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(coupon => {
          const inCart = isInCart(coupon.productId);
          return (
            <div key={coupon.id} className="coupon-card" style={{ position: "relative" }}>
              {coupon.featured && (
                <div style={{
                  position: "absolute",
                  top: 12, right: 12,
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  background: "var(--orange-500)",
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: 99,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  Featured
                </div>
              )}
              <div className="coupon-emoji">{coupon.emoji}</div>
              <div className="coupon-info">
                <div className="coupon-name">{coupon.productName}</div>
                <div className="coupon-desc">{coupon.description}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                  <span className={`badge ${coupon.type === "store" ? "badge-green" : "badge-orange"}`}>
                    {coupon.type === "store" ? "🏪 Store" : "🏭 Manufacturer"}
                  </span>
                  {coupon.stackable && (
                    <span className="badge" style={{ background: "#ede9fe", color: "#7c3aed" }}>
                      ⚡ Stackable
                    </span>
                  )}
                </div>
                <div className="coupon-expires">Expires {coupon.expires}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                <div className="coupon-discount">
                  {coupon.discountType === "dollar" ? `$${coupon.discount.toFixed(2)}` : `${coupon.discount}%`}
                  <div style={{ fontSize: "0.65rem", fontWeight: 400, color: "var(--gray-400)", textAlign: "right" }}>off</div>
                </div>
                <button
                  className={`btn btn-sm ${inCart ? "btn-ghost" : "btn-primary"}`}
                  style={inCart ? { color: "var(--green-700)", border: "1.5px solid var(--green-200)" } : {}}
                  onClick={() => !inCart && handleAddProduct(coupon)}
                >
                  {inCart ? "✓ In Cart" : "+ Add Item"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--gray-400)" }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>🏷️</div>
          <p>No coupons in this category right now.</p>
        </div>
      )}
    </div>
  );
}
