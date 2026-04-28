import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function CheckoutSummaryPage() {
  const navigate = useNavigate();
  const { selectedStore } = useAuth();
  const {
    cartItems, cartTotal, cartSavings,
    clippedDeals, totalDealSavings, clearCart,
  } = useCart();

  const itemCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const totalSaved = cartSavings + totalDealSavings;
  const finalTotal = Math.max(0, cartTotal - totalSaved);

  const handleDone = () => {
    clearCart();
    navigate("/");
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f0fdf4",
      fontFamily: "var(--font-body, 'DM Sans', sans-serif)",
      display: "flex", flexDirection: "column", alignItems: "center",
      padding: "40px 16px",
    }}>

      {/* Success banner */}
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{
          width: 80, height: 80, background: "#15803d",
          borderRadius: "50%", margin: "0 auto 16px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 38, boxShadow: "0 8px 32px rgba(21,128,61,.3)",
        }}>
          🛒
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#111827", marginBottom: 6 }}>
          Trip Complete!
        </h1>
        <p style={{ fontSize: 16, color: "#6b7280" }}>
          {selectedStore?.name || "Ziggy's Grocery"} &middot; {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
        </p>
      </div>

      {/* Summary card */}
      <div style={{
        background: "white", borderRadius: 20, padding: "28px",
        width: "100%", maxWidth: 480,
        boxShadow: "0 4px 24px rgba(0,0,0,.08)",
        marginBottom: 20,
      }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 20 }}>
          Your Summary
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Row label="Items in cart" value={`${itemCount} item${itemCount !== 1 ? "s" : ""}`} />
          <Row label="Cart subtotal" value={`$${cartTotal.toFixed(2)}`} />
          {cartSavings > 0 && (
            <Row label="Auto-applied coupons" value={`-$${cartSavings.toFixed(2)}`} green />
          )}
          {totalDealSavings > 0 && (
            <Row label={`Deals clipped (${clippedDeals.length})`} value={`-$${totalDealSavings.toFixed(2)}`} green />
          )}
          <div style={{ borderTop: "2px solid #e5e7eb", paddingTop: 14, marginTop: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontWeight: 800, fontSize: 18, color: "#111827" }}>Estimated total</span>
              <span style={{ fontWeight: 800, fontSize: 22, color: "#111827" }}>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {totalSaved > 0 && (
          <div style={{
            background: "#f0fdf4", border: "2px solid #86efac",
            borderRadius: 12, padding: "14px 18px", marginTop: 20,
            textAlign: "center",
          }}>
            <div style={{ fontSize: 28, marginBottom: 4 }}>🎉</div>
            <div style={{ fontWeight: 800, fontSize: 20, color: "#15803d" }}>
              You saved ${totalSaved.toFixed(2)} today!
            </div>
            <div style={{ fontSize: 13, color: "#4ade80", marginTop: 2 }}>
              vs. paying full price at checkout
            </div>
          </div>
        )}
      </div>

      {/* Clipped deals breakdown */}
      {clippedDeals.length > 0 && (
        <div style={{
          background: "white", borderRadius: 20, padding: "22px 28px",
          width: "100%", maxWidth: 480,
          boxShadow: "0 4px 24px rgba(0,0,0,.08)",
          marginBottom: 20,
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 14 }}>
            Deals you clipped ({clippedDeals.length})
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {clippedDeals.map(deal => (
              <div key={deal.id} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "8px 12px", background: "#f9fafb", borderRadius: 10,
                border: "1px solid #e5e7eb",
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>{deal.product}</div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>{deal.detail}</div>
                </div>
                {deal.savings && (
                  <div style={{ fontWeight: 700, color: "#15803d", fontSize: 15 }}>
                    -${deal.savings.toFixed(2)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Items bought */}
      <div style={{
        background: "white", borderRadius: 20, padding: "22px 28px",
        width: "100%", maxWidth: 480,
        boxShadow: "0 4px 24px rgba(0,0,0,.08)",
        marginBottom: 28,
      }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 14 }}>
          Items bought ({itemCount})
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {cartItems.map(({ product, quantity }) => (
            <div key={product.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "6px 0", borderBottom: "1px solid #f3f4f6",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 20 }}>{product.emoji}</span>
                <span style={{ fontSize: 14, color: "#374151" }}>
                  {product.name}
                  {quantity > 1 && <span style={{ color: "#9ca3af" }}> ×{quantity}</span>}
                </span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleDone}
        style={{
          width: "100%", maxWidth: 480, padding: "18px",
          background: "#15803d", color: "white",
          border: "none", borderRadius: 14,
          fontSize: 17, fontWeight: 800,
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(21,128,61,.3)",
        }}
      >
        Done — Back to Home
      </button>

      <div style={{
        maxWidth: 480, width: "100%", marginTop: 20,
        padding: "14px 18px", borderRadius: 12,
        background: "#f0fdf4", border: "1px solid #86efac",
        display: "flex", alignItems: "flex-start", gap: 10,
      }}>
        <span style={{ fontSize: 18, flexShrink: 0 }}>📊</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#15803d", marginBottom: 2 }}>
            Your trip data helps the store
          </div>
          <div style={{ fontSize: 12, color: "#4ade80" }}>
            {selectedStore?.name || "This store"} receives anonymized analytics from your visit — which deals were clipped, which aisles were visited, and what was purchased. This helps them stock better and offer more relevant deals.
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, green }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontSize: 14, color: "#6b7280" }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 600, color: green ? "#15803d" : "#111827" }}>{value}</span>
    </div>
  );
}
