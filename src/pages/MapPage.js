import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { AISLE_DIRECTORY, AISLE_DEALS, PRODUCT_LOCATIONS } from "../data/ziggysDatabase";

const AISLE_EMOJIS = {
  P:"🥦", B:"🍞", 1:"🥣", 2:"🍿", 3:"🥫", 4:"🍝",
  5:"🥤", 6:"🥛", 7:"🍗", 8:"🧹", D:"🥩", F:"🧊",
};

function aisleName(key) {
  const dir = AISLE_DIRECTORY[key];
  if (!dir) return `Aisle ${key}`;
  if (typeof key === "number") return `Aisle ${key} — ${dir.name}`;
  return dir.name;
}

function aisleShortName(key) {
  const dir = AISLE_DIRECTORY[key];
  if (!dir) return `Aisle ${key}`;
  if (typeof key === "number") return `Aisle ${key}`;
  return dir.name;
}

function DealCard({ deal, type, clipped, onClip, onUnclip }) {
  const isStore = type === "store";
  const savings = deal.isPercent ? `${deal.percentOff}% off` : deal.savings ? `$${deal.savings.toFixed(2)}` : "";
  return (
    <div style={{
      background: isStore ? "#fffbeb" : "#fff1f2",
      border: `1.5px solid ${isStore ? "#fbbf24" : "#fda4af"}`,
      borderRadius: 12, padding: "12px 14px", marginBottom: 10,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: isStore ? "#fbbf24" : "#fb7185",
            color: "white", borderRadius: 6, padding: "2px 8px",
            fontSize: 11, fontWeight: 700, marginBottom: 5,
          }}>
            {isStore ? "🏪 Store deal" : "💰 Ibotta coupon"}
          </div>
          <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", marginBottom: 2 }}>{deal.product}</div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>{deal.detail}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
          {savings && (
            <div style={{ fontSize: 15, fontWeight: 800, color: isStore ? "#92400e" : "#be123c" }}>{savings}</div>
          )}
          {clipped ? (
            <button
              onClick={() => onUnclip(deal.id)}
              style={{ padding: "5px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: "#dcfce7", color: "#15803d", whiteSpace: "nowrap" }}
            >
              ✓ Clipped
            </button>
          ) : (
            <div style={{ display: "flex", gap: 5 }}>
              <button
                onClick={() => onClip(deal)}
                style={{ padding: "5px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: "#15803d", color: "white", whiteSpace: "nowrap" }}
              >
                Clip
              </button>
              <button
                onClick={() => {}}
                style={{ padding: "5px 10px", borderRadius: 8, border: "1px solid #d1d5db", cursor: "pointer", fontSize: 12, fontWeight: 600, background: "white", color: "#9ca3af", whiteSpace: "nowrap" }}
              >
                Skip
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MapPage() {
  const { selectedStore } = useAuth();
  const navigate = useNavigate();
  const {
    cartItems, activeRoute, generateRoute,
    navStepIndex, nextAisle,
    clipDeal, unclipDeal, isDealClipped, totalDealSavings,
  } = useCart();

  // ── State 1: empty cart ──────────────────────────────────────
  if (cartItems.length === 0) {
    return (
      <div className="page animate-fadeup" style={{ textAlign: "center", paddingTop: 80 }}>
        <div style={{ fontSize: "5rem", marginBottom: 16 }}>🗺️</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, marginBottom: 8 }}>Your cart is empty</h2>
        <p style={{ color: "var(--gray-500)", marginBottom: 28 }}>Add items to your cart, then come back to navigate the store aisle by aisle.</p>
        <Link to="/store" className="btn btn-primary btn-lg">
          <ShoppingCart size={18} /> Browse Store
        </Link>
      </div>
    );
  }

  // ── State 2: has items, no route yet ─────────────────────────
  if (activeRoute.length === 0) {
    const aisles = [...new Set(cartItems.map(i => i.product.aisle))];
    return (
      <div className="page animate-fadeup" style={{ maxWidth: 560, margin: "0 auto", paddingTop: 48, textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: 16 }}>🛒</div>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, marginBottom: 8 }}>Ready to shop?</h2>
        <p style={{ color: "var(--gray-500)", marginBottom: 8 }}>
          You have <strong>{cartItems.reduce((s, i) => s + i.quantity, 0)} items</strong> across <strong>{aisles.length} aisles</strong>.
          Generate your route and we'll guide you through the store aisle by aisle — and show you deals along the way.
        </p>
        <p style={{ color: "var(--gray-400)", fontSize: "0.85rem", marginBottom: 28 }}>
          Deals from Ziggy's + Ibotta are shown at each aisle so you can clip them before checkout.
        </p>
        <button
          className="btn btn-primary btn-lg"
          style={{ width: "100%", justifyContent: "center" }}
          onClick={() => generateRoute()}
        >
          Generate My Route →
        </button>
        <Link to="/cart" className="btn btn-ghost btn-sm" style={{ marginTop: 12, display: "inline-flex" }}>
          ← Back to cart
        </Link>
      </div>
    );
  }

  // ── State 3: route active — aisle navigator ──────────────────
  const isDone = navStepIndex >= activeRoute.length;

  if (isDone) {
    navigate("/cart");
    return null;
  }

  const currentAisle = activeRoute[navStepIndex];
  const nextAisleKey = activeRoute[navStepIndex + 1];
  const isLastAisle = navStepIndex >= activeRoute.length - 1;
  const aisleItems = cartItems.filter(i => i.product.aisle === currentAisle);
  const aisleSubtotal = aisleItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const deals = AISLE_DEALS[currentAisle] || { storeDeals: [], ibottaCoupons: [] };
  const allDeals = [...(deals.storeDeals || []), ...(deals.ibottaCoupons || [])];
  const dealSavingsPotential = allDeals.reduce((s, d) => s + (d.savings || 0), 0);

  return (
    <div className="page animate-fadeup" style={{ paddingBottom: 40 }}>

      {/* Store header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", marginBottom: 2 }}>
            {selectedStore?.name || "Ziggy's Grocery"}
          </h1>
          <p style={{ color: "var(--gray-500)", fontSize: "0.85rem" }}>
            Stop {navStepIndex + 1} of {activeRoute.length}
            {totalDealSavings > 0 && (
              <span style={{ marginLeft: 10, color: "#15803d", fontWeight: 700 }}>
                💰 ${totalDealSavings.toFixed(2)} clipped
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        background: "white", border: "1px solid #e5e7eb", borderRadius: 14,
        padding: "14px 16px", marginBottom: 20, overflowX: "auto",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0, minWidth: "max-content" }}>
          {activeRoute.map((aisle, idx) => {
            const isPast = idx < navStepIndex;
            const isCurrent = idx === navStepIndex;
            return (
              <React.Fragment key={aisle}>
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "6px 12px",
                  background: isCurrent ? "#15803d" : isPast ? "#dcfce7" : "#f9fafb",
                  borderRadius: 10,
                  border: isCurrent ? "2px solid #15803d" : isPast ? "2px solid #86efac" : "2px solid #e5e7eb",
                  minWidth: 68,
                }}>
                  <div style={{ fontSize: 18, marginBottom: 1 }}>{AISLE_EMOJIS[aisle]}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: isCurrent ? "white" : isPast ? "#15803d" : "#9ca3af", textAlign: "center", lineHeight: 1.2 }}>
                    {aisleShortName(aisle)}
                  </div>
                  <div style={{ fontSize: 10, color: isCurrent ? "#bbf7d0" : isPast ? "#22c55e" : "#d1d5db", marginTop: 1, fontWeight: 600 }}>
                    {isPast ? "Done ✓" : isCurrent ? "Here" : ""}
                  </div>
                </div>
                {idx < activeRoute.length - 1 && (
                  <div style={{ width: 16, height: 2, background: isPast ? "#86efac" : "#e5e7eb", flexShrink: 0 }} />
                )}
              </React.Fragment>
            );
          })}
          <div style={{ width: 16, height: 2, background: "#e5e7eb", flexShrink: 0 }} />
          <div style={{
            padding: "6px 12px", background: "#f9fafb", borderRadius: 10,
            border: "2px solid #e5e7eb", minWidth: 68,
            display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            <div style={{ fontSize: 18, marginBottom: 1 }}>🧾</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>Checkout</div>
          </div>
        </div>
      </div>

      {/* Aisle header */}
      <div style={{
        background: "#15803d", borderRadius: 14, padding: "16px 20px",
        marginBottom: 18, display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{ fontSize: 36 }}>{AISLE_EMOJIS[currentAisle]}</div>
        <div>
          <div style={{ color: "#bbf7d0", fontSize: 11, fontWeight: 600, marginBottom: 2 }}>CURRENT STOP</div>
          <div style={{ color: "white", fontSize: 20, fontWeight: 800 }}>{aisleName(currentAisle)}</div>
        </div>
      </div>

      {/* Two columns */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 }}
        className="nav-grid"
      >
        {/* Items */}
        <div style={{ background: "white", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>Your items here</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>{aisleItems.length} item{aisleItems.length !== 1 ? "s" : ""} to grab</div>
          </div>
          <div style={{ padding: "10px 16px" }}>
            {aisleItems.map(({ product, quantity }) => (
              <div key={product.id} style={{ padding: "8px 0", borderBottom: "1px solid #f3f4f6", display: "flex", alignItems: "flex-start", gap: 10 }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{product.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 13, color: "#111827" }}>
                    {product.name}
                    {quantity > 1 && <span style={{ marginLeft: 5, background: "#f3f4f6", borderRadius: 5, padding: "1px 6px", fontSize: 11, color: "#6b7280" }}>×{quantity}</span>}
                  </div>
                  <div style={{ fontSize: 11, color: "#22c55e", fontWeight: 600, marginTop: 2 }}>
                    📍 {PRODUCT_LOCATIONS[product.id] || "Check aisle signage"}
                  </div>
                  <div style={{ fontSize: 12, color: "#6b7280" }}>${product.price.toFixed(2)} {product.unit}</div>
                </div>
              </div>
            ))}
            {aisleItems.length > 0 && (
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid #e5e7eb", fontSize: 12, color: "#6b7280", fontWeight: 600 }}>
                {aisleItems.reduce((s, i) => s + i.quantity, 0)} items &middot; ${aisleSubtotal.toFixed(2)} subtotal
              </div>
            )}
          </div>
        </div>

        {/* Deals */}
        <div style={{ background: "white", borderRadius: 14, border: "1px solid #e5e7eb", overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111827" }}>Deals in this aisle</div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              {allDeals.length > 0 ? `${allDeals.length} deals · up to $${dealSavingsPotential.toFixed(2)} savings` : "No deals right now"}
            </div>
          </div>
          <div style={{ padding: "10px 16px" }}>
            {allDeals.length === 0 ? (
              <div style={{ color: "#9ca3af", fontSize: 13, textAlign: "center", padding: "20px 0" }}>No deals in this aisle today</div>
            ) : (
              <>
                {deals.storeDeals?.map(deal => (
                  <DealCard key={deal.id} deal={deal} type="store" clipped={isDealClipped(deal.id)} onClip={clipDeal} onUnclip={unclipDeal} />
                ))}
                {deals.ibottaCoupons?.map(deal => (
                  <DealCard key={deal.id} deal={deal} type="ibotta" clipped={isDealClipped(deal.id)} onClip={clipDeal} onUnclip={unclipDeal} />
                ))}
                {allDeals.length > 1 && (
                  <button
                    onClick={() => allDeals.filter(d => !isDealClipped(d.id)).forEach(d => clipDeal(d))}
                    style={{
                      width: "100%", marginTop: 4, padding: "8px",
                      background: "#f0fdf4", border: "1.5px solid #86efac",
                      borderRadius: 10, color: "#15803d", fontWeight: 700,
                      fontSize: 13, cursor: "pointer",
                    }}
                  >
                    {allDeals.every(d => isDealClipped(d.id)) ? "✓ All deals clipped" : `Clip all ${allDeals.length} deals`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={() => { if (isLastAisle) navigate("/cart"); else nextAisle(); }}
        style={{
          width: "100%", padding: "16px",
          background: "#15803d", color: "white",
          border: "none", borderRadius: 14,
          fontSize: 16, fontWeight: 800, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          boxShadow: "0 4px 16px rgba(21,128,61,.25)",
        }}
      >
        {isLastAisle
          ? <>Head to Checkout <span style={{ fontSize: 20 }}>🧾</span></>
          : <>Next: {aisleShortName(nextAisleKey)} {AISLE_EMOJIS[nextAisleKey]} <span style={{ fontSize: 18 }}>→</span></>
        }
      </button>

      <style>{`.nav-grid { } @media(max-width:600px){.nav-grid{grid-template-columns:1fr!important}}`}</style>
    </div>
  );
}
