import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation, ShoppingCart, Trash2, Tag, X, ChevronRight, Check } from "lucide-react";
import { AISLE_DIRECTORY } from "../data/ziggysDatabase";
import { useCart } from "../context/CartContext";

/* ── Fake QR / barcode SVG ── */
function FakeQR({ size = 120 }) {
  const blocks = [];
  const seed = [1,0,1,1,0,1,0,1,0,1,1,0,1,0,0,1,1,1,0,1,0,0,1,1,0,1,1,0,1,0,1,0,1,1,0,1,0,0,1,1,1,0,1,0,0,1];
  const cols = 6;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < cols; c++) {
      if (seed[(r * cols + c) % seed.length]) {
        blocks.push(<rect key={`${r}-${c}`} x={c * (size/cols)} y={r * (size/8)} width={size/cols - 2} height={size/8 - 2} rx="2" fill="#111" />);
      }
    }
  }
  return <svg width={size} height={size} style={{ display: "block" }}><rect width={size} height={size} fill="white" rx="8" />{blocks}</svg>;
}

/* ── Checkout Modal ── */
function CheckoutModal({ finalTotal, cartSavings, onClose, onComplete }) {
  const [screen, setScreen] = useState("options"); // options | apple | instore | card | scan | done
  const [cardForm, setCardForm] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [processing, setProcessing] = useState(false);

  const processPayment = (_method) => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setScreen("done");
      onComplete?.();
    }, 1800);
  };

  if (screen === "done") {
    return (
      <div className="checkout-modal-inner">
        <div className="checkout-success">
          <div className="checkout-success-icon">
            <Check size={36} color="white" />
          </div>
          <h2 className="checkout-success-title">Payment Complete!</h2>
          <p className="checkout-success-sub">Your total of <strong>${finalTotal.toFixed(2)}</strong> was processed.</p>
          {cartSavings > 0 && (
            <div className="checkout-savings-badge">🎉 You saved ${cartSavings.toFixed(2)} with SmartCart!</div>
          )}
          <button className="btn btn-primary" style={{ marginTop: 24, width: "100%", justifyContent: "center" }} onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    );
  }

  if (screen === "apple") {
    return (
      <div className="checkout-modal-inner">
        <button className="checkout-back" onClick={() => setScreen("options")}><X size={18} /></button>
        <div className="checkout-screen-title">
          <div style={{ fontSize: "2rem" }}>🍎</div>
          <h3>Apple Pay</h3>
        </div>
        <div className="checkout-apple-total">
          <div className="checkout-apple-store">Ziggy's Grocery</div>
          <div className="checkout-apple-amount">${finalTotal.toFixed(2)}</div>
          {cartSavings > 0 && <div className="checkout-apple-saved">Includes ${cartSavings.toFixed(2)} in coupon savings</div>}
        </div>
        <button
          className="btn checkout-apple-btn"
          onClick={() => processPayment("apple")}
          disabled={processing}
        >
          {processing ? <span className="auth-spinner auth-spinner-white" /> : null}
          {processing ? "Processing…" : " Pay with Apple Pay"}
        </button>
      </div>
    );
  }

  if (screen === "instore") {
    return (
      <div className="checkout-modal-inner">
        <button className="checkout-back" onClick={() => setScreen("options")}><X size={18} /></button>
        <div className="checkout-screen-title">
          <div style={{ fontSize: "2rem" }}>🏪</div>
          <h3>Pay In Store</h3>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--gray-500)", textAlign: "center", marginBottom: 20 }}>
          Show this screen at the register. Your cart & coupons will be applied automatically.
        </p>
        <div className="checkout-instore-card">
          <FakeQR size={140} />
          <div className="checkout-instore-amount">${finalTotal.toFixed(2)}</div>
          {cartSavings > 0 && (
            <div className="checkout-instore-savings">🏷️ ${cartSavings.toFixed(2)} in coupons applied</div>
          )}
          <div className="checkout-instore-id">Cart #SC-{Math.floor(Math.random() * 90000) + 10000}</div>
        </div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }} onClick={() => processPayment("instore")}>
          Mark as Paid ✓
        </button>
      </div>
    );
  }

  if (screen === "card") {
    const fmt = (field, val) => {
      if (field === "number") return val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
      if (field === "expiry") return val.replace(/\D/g, "").slice(0, 4).replace(/(.{2})/, "$1/");
      if (field === "cvv") return val.replace(/\D/g, "").slice(0, 3);
      return val;
    };
    return (
      <div className="checkout-modal-inner">
        <button className="checkout-back" onClick={() => setScreen("options")}><X size={18} /></button>
        <div className="checkout-screen-title">
          <div style={{ fontSize: "2rem" }}>💳</div>
          <h3>Add Card</h3>
        </div>

        {/* Card preview */}
        <div className="checkout-card-preview">
          <div className="checkout-card-chip">▉▉</div>
          <div className="checkout-card-number">
            {cardForm.number || "•••• •••• •••• ••••"}
          </div>
          <div className="checkout-card-footer">
            <span>{cardForm.name || "CARDHOLDER NAME"}</span>
            <span>{cardForm.expiry || "MM/YY"}</span>
          </div>
        </div>

        <div className="auth-form" style={{ marginTop: 16 }}>
          <div className="auth-field">
            <label className="auth-label">Card Number</label>
            <input className="auth-input" placeholder="1234 5678 9012 3456" value={cardForm.number}
              onChange={e => setCardForm(f => ({ ...f, number: fmt("number", e.target.value) }))} />
          </div>
          <div className="auth-field">
            <label className="auth-label">Cardholder Name</label>
            <input className="auth-input" placeholder="Alex Johnson" value={cardForm.name}
              onChange={e => setCardForm(f => ({ ...f, name: e.target.value.toUpperCase() }))} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="auth-field">
              <label className="auth-label">Expiry</label>
              <input className="auth-input" placeholder="MM/YY" value={cardForm.expiry}
                onChange={e => setCardForm(f => ({ ...f, expiry: fmt("expiry", e.target.value) }))} />
            </div>
            <div className="auth-field">
              <label className="auth-label">CVV</label>
              <input className="auth-input" placeholder="123" value={cardForm.cvv}
                onChange={e => setCardForm(f => ({ ...f, cvv: fmt("cvv", e.target.value) }))} />
            </div>
          </div>
          <button
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: 4, padding: 13 }}
            onClick={() => processPayment("card")}
            disabled={processing}
          >
            {processing ? <><span className="auth-spinner auth-spinner-white" /> Processing…</> : `Pay $${finalTotal.toFixed(2)}`}
          </button>
        </div>
      </div>
    );
  }

  if (screen === "scan") {
    return (
      <div className="checkout-modal-inner">
        <button className="checkout-back" onClick={() => setScreen("options")}><X size={18} /></button>
        <div className="checkout-screen-title">
          <div style={{ fontSize: "2rem" }}>📱</div>
          <h3>Scan Coupon Code</h3>
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--gray-500)", textAlign: "center", marginBottom: 20 }}>
          Scan this code at the self-checkout scanner to redeem all your SmartCart coupons.
        </p>
        <div className="checkout-scan-card">
          <FakeQR size={160} />
          <div className="checkout-scan-label">SmartCart Coupon Bundle</div>
          <div className="checkout-scan-savings">
            {cartSavings > 0 ? `$${cartSavings.toFixed(2)} in savings` : "No coupons this trip"}
          </div>
          <div className="checkout-scan-code">SC-{Date.now().toString(36).toUpperCase()}</div>
        </div>
        <button className="btn btn-outline" style={{ width: "100%", justifyContent: "center", marginTop: 12 }} onClick={() => setScreen("options")}>
          Back to Payment
        </button>
      </div>
    );
  }

  // Default: options screen
  const options = [
    {
      id: "apple",
      icon: "🍎",
      label: "Apple Pay",
      sub: "Pay instantly with Face ID",
      color: "#000",
      textColor: "white",
    },
    {
      id: "card",
      icon: "💳",
      label: "Add Card",
      sub: "Debit or credit card",
      color: "var(--green-700)",
      textColor: "white",
    },
    {
      id: "instore",
      icon: "🏪",
      label: "Pay In Store",
      sub: "Show barcode at register",
      color: "var(--white)",
      textColor: "var(--gray-800)",
      border: true,
    },
    {
      id: "scan",
      icon: "📱",
      label: "Scan Coupon Code",
      sub: "Redeem coupons at self-checkout",
      color: "var(--orange-50)",
      textColor: "var(--orange-700)",
      border: true,
    },
  ];

  return (
    <div className="checkout-modal-inner">
      <button className="checkout-back" onClick={onClose}><X size={18} /></button>
      <div className="checkout-total-header">
        <div className="checkout-total-label">Total Due</div>
        <div className="checkout-total-amount">${finalTotal.toFixed(2)}</div>
        {cartSavings > 0 && (
          <div className="checkout-total-savings">🏷️ ${cartSavings.toFixed(2)} saved with coupons</div>
        )}
      </div>

      <div className="checkout-options">
        {options.map(opt => (
          <button
            key={opt.id}
            className="checkout-option-btn"
            style={{
              background: opt.color,
              color: opt.textColor,
              border: opt.border ? "1.5px solid var(--gray-200)" : "none",
            }}
            onClick={() => setScreen(opt.id)}
          >
            <span className="checkout-opt-icon">{opt.icon}</span>
            <div className="checkout-opt-text">
              <span className="checkout-opt-label">{opt.label}</span>
              <span className="checkout-opt-sub" style={{ color: opt.border ? "var(--gray-400)" : "rgba(255,255,255,0.7)" }}>
                {opt.sub}
              </span>
            </div>
            <ChevronRight size={16} style={{ opacity: 0.5, flexShrink: 0 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Main CartPage ── */
export default function CartPage() {
  const {
    cartItems, updateQuantity, removeFromCart, clearCart,
    cartTotal, cartSavings, cartCount,
    activeRoute, generateRoute,
    totalDealSavings, clippedDeals,
  } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  const handleStartShopping = () => {
    generateRoute();
    navigate("/navigate");
  };

  if (cartItems.length === 0) {
    return (
      <div className="page animate-fadeup" style={{ textAlign: "center", paddingTop: 80 }}>
        <div style={{ fontSize: "5rem", marginBottom: 16 }}>🛒</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ color: "var(--gray-500)", marginBottom: 28 }}>Browse the store and add items to get started.</p>
        <Link to="/store" className="btn btn-primary btn-lg">
          <ShoppingCart size={18} /> Browse Store
        </Link>
      </div>
    );
  }

  const finalTotal = Math.max(0, cartTotal - cartSavings - totalDealSavings);

  return (
    <div className="page animate-fadeup">
      {/* Checkout modal overlay */}
      {showCheckout && (
        <div className="checkout-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowCheckout(false); }}>
          <div className="checkout-modal animate-fadeup">
            <CheckoutModal
              finalTotal={finalTotal}
              cartSavings={cartSavings}
              onClose={() => setShowCheckout(false)}
              onComplete={() => {}}
            />
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div className="page-hero" style={{ marginBottom: 0 }}>
          <h1 className="page-title">Your Cart</h1>
          <p className="page-subtitle">{cartCount} item{cartCount !== 1 ? "s" : ""} — ready to shop</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={clearCart} style={{ color: "var(--gray-400)" }}>
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 24, alignItems: "start" }}>

        {/* Left — Cart Items */}
        <div className="card" style={{ padding: "8px 24px 24px" }}>
          <h2 className="section-title" style={{ marginTop: 20 }}>
            <ShoppingCart size={18} /> Items
          </h2>
          {cartItems.map(({ product, quantity, appliedCoupons }) => {
            const itemTotal = product.price * quantity;
            const itemSavings = (appliedCoupons || []).reduce((s, c) => {
              if (c.discountType === "dollar") return s + c.discount;
              if (c.discountType === "percent") return s + itemTotal * (c.discount / 100);
              return s;
            }, 0);
            return (
              <div key={product.id} className="cart-item">
                <div className="cart-item-emoji">{product.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{product.name}</div>
                  <div className="cart-item-aisle">
                    {AISLE_DIRECTORY[product.aisle]?.emoji} Aisle {product.aisle} — {AISLE_DIRECTORY[product.aisle]?.name}
                  </div>
                  {appliedCoupons && appliedCoupons.length > 0 && (
                    <div className="cart-item-coupon">
                      🏷️ {appliedCoupons.map(c =>
                        c.discountType === "dollar" ? `$${c.discount.toFixed(2)} off` : `${c.discount}% off`
                      ).join(" + ")} applied
                    </div>
                  )}
                </div>
                <div className="cart-qty-ctrl">
                  <button className="qty-btn" onClick={() => updateQuantity(product.id, quantity - 1)}>−</button>
                  <span style={{ fontWeight: 600, minWidth: 20, textAlign: "center" }}>{quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                </div>
                <div className="cart-item-price">
                  <div>${itemTotal.toFixed(2)}</div>
                  {itemSavings > 0 && (
                    <div style={{ fontSize: "0.72rem", color: "var(--orange-500)", fontWeight: 600 }}>
                      −${itemSavings.toFixed(2)}
                    </div>
                  )}
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => removeFromCart(product.id)} style={{ color: "var(--gray-300)", padding: "6px" }}>
                  <Trash2 size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Right — Summary + Route */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Order Summary */}
          <div className="card" style={{ padding: "24px" }}>
            <h2 className="section-title">Order Summary</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                <span style={{ color: "var(--gray-600)" }}>Subtotal ({cartCount} items)</span>
                <span style={{ fontWeight: 600 }}>${cartTotal.toFixed(2)}</span>
              </div>
              {cartSavings > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "var(--orange-600)", display: "flex", alignItems: "center", gap: 4 }}>
                    <Tag size={13} /> Coupon Savings
                  </span>
                  <span style={{ color: "var(--orange-600)", fontWeight: 700 }}>−${cartSavings.toFixed(2)}</span>
                </div>
              )}
              {totalDealSavings > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "#15803d", display: "flex", alignItems: "center", gap: 4 }}>
                    💰 Clipped Deals ({clippedDeals.length})
                  </span>
                  <span style={{ color: "#15803d", fontWeight: 700 }}>−${totalDealSavings.toFixed(2)}</span>
                </div>
              )}
              <div style={{ height: 1, background: "var(--gray-100)", margin: "4px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem" }}>Total</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem", color: "var(--green-700)" }}>
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
              {(cartSavings + totalDealSavings) > 0 && (
                <div style={{ background: "var(--orange-50)", borderRadius: "var(--radius-md)", padding: "10px 14px", fontSize: "0.82rem", color: "var(--orange-600)", fontWeight: 600, textAlign: "center" }}>
                  🎉 You're saving ${(cartSavings + totalDealSavings).toFixed(2)} total!
                </div>
              )}
            </div>
            <button
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: 16, padding: 16, fontSize: "1rem", fontWeight: 800 }}
              onClick={handleStartShopping}
            >
              🛒 Start Shopping →
            </button>
            <button
              className="btn btn-ghost btn-sm"
              style={{ width: "100%", justifyContent: "center", marginTop: 8 }}
              onClick={() => setShowCheckout(true)}
            >
              Skip navigation — Checkout now
            </button>
          </div>

          {/* Route Card */}
          <div className="card" style={{ padding: "24px" }}>
            <h2 className="section-title"><Navigation size={18} /> Shopping Route</h2>
            {activeRoute.length === 0 ? (
              <div>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-500)", marginBottom: 16 }}>
                  Generate your optimized path — shortest route, no backtracking.
                </p>
                <button className="btn btn-orange" style={{ width: "100%", justifyContent: "center" }} onClick={generateRoute}>
                  <Navigation size={16} /> Generate My Route
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {activeRoute.map((stop, i) => (
                    <div key={stop} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 24, height: 24, background: "var(--green-700)", borderRadius: "50%", color: "white", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {i + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                          {AISLE_DIRECTORY[stop]?.emoji} {AISLE_DIRECTORY[stop]?.name || `Aisle ${stop}`}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--gray-400)" }}>
                          {cartItems.filter(i => String(i.product.aisle) === String(stop)).map(i => i.product.name).join(", ")}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/map" className="btn btn-primary btn-sm" style={{ width: "100%", justifyContent: "center" }}>
                  Go to Map →
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
