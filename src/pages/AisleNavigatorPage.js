import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import {
  AISLE_DIRECTORY,
  AISLE_DEALS,
  PRODUCT_LOCATIONS,
} from "../data/ziggysDatabase";

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
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 10,
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
          <div style={{ fontWeight: 600, fontSize: 14, color: "#111827", marginBottom: 2 }}>
            {deal.product}
          </div>
          <div style={{ fontSize: 13, color: "#6b7280" }}>{deal.detail}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
          {savings && (
            <div style={{ fontSize: 15, fontWeight: 800, color: isStore ? "#92400e" : "#be123c" }}>
              {savings}
            </div>
          )}
          <button
            onClick={() => clipped ? onUnclip(deal.id) : onClip(deal)}
            style={{
              padding: "5px 12px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontSize: 12,
              fontWeight: 700,
              background: clipped ? "#dcfce7" : "#15803d",
              color: clipped ? "#15803d" : "white",
              transition: "all .15s",
              whiteSpace: "nowrap",
            }}
          >
            {clipped ? "✓ Clipped" : "Clip deal"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AisleNavigatorPage() {
  const navigate = useNavigate();
  const { selectedStore } = useAuth();
  const {
    cartItems, activeRoute, navStepIndex, nextAisle,
    clipDeal, unclipDeal, isDealClipped, clippedDeals, totalDealSavings, clearCart,
  } = useCart();

  // Guard: if no route, send back to cart
  if (!activeRoute || activeRoute.length === 0) {
    navigate("/cart");
    return null;
  }

  const isLastAisle = navStepIndex >= activeRoute.length - 1;
  const isDone = navStepIndex >= activeRoute.length;

  if (isDone) {
    navigate("/summary");
    return null;
  }

  const currentAisle = activeRoute[navStepIndex];
  const nextAisleKey = activeRoute[navStepIndex + 1];
  const aisleItems = cartItems.filter(i => i.product.aisle === currentAisle);
  const aisleSubtotal = aisleItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const deals = AISLE_DEALS[currentAisle] || { storeDeals: [], ibottaCoupons: [] };
  const allDeals = [...(deals.storeDeals || []), ...(deals.ibottaCoupons || [])];
  const dealSavingsPotential = allDeals.reduce((s, d) => s + (d.savings || 0), 0);

  const handleNext = () => {
    if (isLastAisle) {
      navigate("/summary");
    } else {
      nextAisle();
    }
  };

  const handleExit = () => {
    if (window.confirm("Exit navigation? Your clipped deals will be saved.")) {
      navigate("/cart");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f9fafb", fontFamily: "var(--font-body, 'DM Sans', sans-serif)" }}>

      {/* Top bar */}
      <div style={{
        background: "white", borderBottom: "1px solid #e5e7eb",
        padding: "12px 20px", display: "flex", alignItems: "center",
        justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50,
        boxShadow: "0 1px 4px rgba(0,0,0,.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, background: "#15803d", borderRadius: 8,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", fontWeight: 800, fontSize: 14,
          }}>SC</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
              {selectedStore?.name || "Ziggy's Grocery"}
            </div>
            <div style={{ fontSize: 12, color: "#6b7280" }}>
              {navStepIndex + 1} of {activeRoute.length} stops
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {totalDealSavings > 0 && (
            <div style={{
              background: "#dcfce7", color: "#15803d", borderRadius: 20,
              padding: "4px 12px", fontSize: 13, fontWeight: 700,
            }}>
              💰 ${totalDealSavings.toFixed(2)} clipped
            </div>
          )}
          <button onClick={handleExit} style={{
            background: "#f3f4f6", border: "none", borderRadius: 8,
            padding: "6px 12px", fontSize: 13, color: "#6b7280",
            cursor: "pointer", fontWeight: 600,
          }}>
            Exit
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        background: "white", borderBottom: "1px solid #e5e7eb",
        padding: "12px 20px", overflowX: "auto",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: 0,
          minWidth: "max-content",
        }}>
          {activeRoute.map((aisle, idx) => {
            const isPast = idx < navStepIndex;
            const isCurrent = idx === navStepIndex;
            return (
              <React.Fragment key={aisle}>
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  padding: "6px 14px",
                  background: isCurrent ? "#15803d" : isPast ? "#dcfce7" : "#f3f4f6",
                  borderRadius: 10,
                  border: isCurrent ? "2px solid #15803d" : isPast ? "2px solid #86efac" : "2px solid #e5e7eb",
                  minWidth: 72, cursor: "default",
                }}>
                  <div style={{ fontSize: 18, marginBottom: 1 }}>{AISLE_EMOJIS[aisle]}</div>
                  <div style={{
                    fontSize: 11, fontWeight: 700,
                    color: isCurrent ? "white" : isPast ? "#15803d" : "#9ca3af",
                    textAlign: "center", lineHeight: 1.2,
                  }}>
                    {aisleShortName(aisle)}
                  </div>
                  <div style={{
                    fontSize: 10,
                    color: isCurrent ? "#bbf7d0" : isPast ? "#22c55e" : "#d1d5db",
                    marginTop: 1, fontWeight: 600,
                  }}>
                    {isPast ? "Done ✓" : isCurrent ? "You are here" : ""}
                  </div>
                </div>
                {idx < activeRoute.length - 1 && (
                  <div style={{ width: 18, height: 2, background: isPast ? "#86efac" : "#e5e7eb", flexShrink: 0 }} />
                )}
              </React.Fragment>
            );
          })}
          {/* Checkout pill */}
          <div style={{ width: 18, height: 2, background: "#e5e7eb", flexShrink: 0 }} />
          <div style={{
            padding: "6px 14px", background: "#f3f4f6",
            borderRadius: 10, border: "2px solid #e5e7eb",
            minWidth: 72, display: "flex", flexDirection: "column", alignItems: "center",
          }}>
            <div style={{ fontSize: 18, marginBottom: 1 }}>🧾</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af" }}>Checkout</div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "24px 16px 100px" }}>

        {/* Aisle header */}
        <div style={{
          background: "#15803d", borderRadius: 16, padding: "18px 24px",
          marginBottom: 20, display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{ fontSize: 40 }}>{AISLE_EMOJIS[currentAisle]}</div>
          <div>
            <div style={{ color: "#bbf7d0", fontSize: 12, fontWeight: 600, marginBottom: 3 }}>
              CURRENT STOP
            </div>
            <div style={{ color: "white", fontSize: 22, fontWeight: 800 }}>
              {aisleName(currentAisle)}
            </div>
          </div>
        </div>

        {/* Two columns */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginBottom: 20,
        }}
          className="nav-grid"
        >
          {/* Items column */}
          <div style={{
            background: "white", borderRadius: 16,
            border: "1px solid #e5e7eb", overflow: "hidden",
          }}>
            <div style={{
              padding: "14px 18px", borderBottom: "1px solid #e5e7eb",
              background: "#f9fafb",
            }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
                Your items here
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {aisleItems.length} {aisleItems.length === 1 ? "item" : "items"} to grab
              </div>
            </div>
            <div style={{ padding: "12px 18px" }}>
              {aisleItems.length === 0 ? (
                <div style={{ color: "#9ca3af", fontSize: 14, textAlign: "center", padding: "20px 0" }}>
                  No items in this aisle
                </div>
              ) : (
                aisleItems.map(({ product, quantity }) => (
                  <div key={product.id} style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #f3f4f6",
                    display: "flex", alignItems: "flex-start", gap: 10,
                  }}>
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{product.emoji}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "#111827" }}>
                        {product.name}
                        {quantity > 1 && (
                          <span style={{
                            marginLeft: 6, background: "#f3f4f6", borderRadius: 6,
                            padding: "1px 7px", fontSize: 12, color: "#6b7280",
                          }}>×{quantity}</span>
                        )}
                      </div>
                      <div style={{
                        display: "flex", alignItems: "center", gap: 6, marginTop: 3,
                      }}>
                        <span style={{
                          fontSize: 12, color: "#22c55e", fontWeight: 600,
                        }}>
                          📍 {PRODUCT_LOCATIONS[product.id] || "Check aisle signage"}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: "#6b7280", marginTop: 1 }}>
                        ${product.price.toFixed(2)} {product.unit}
                      </div>
                    </div>
                  </div>
                ))
              )}
              {aisleItems.length > 0 && (
                <div style={{
                  marginTop: 12, paddingTop: 10, borderTop: "1px solid #e5e7eb",
                  fontSize: 13, color: "#6b7280", fontWeight: 600,
                }}>
                  {aisleItems.reduce((s, i) => s + i.quantity, 0)} items &middot; ${aisleSubtotal.toFixed(2)} subtotal
                </div>
              )}
            </div>
          </div>

          {/* Deals column */}
          <div style={{
            background: "white", borderRadius: 16,
            border: "1px solid #e5e7eb", overflow: "hidden",
          }}>
            <div style={{
              padding: "14px 18px", borderBottom: "1px solid #e5e7eb",
              background: "#f9fafb",
            }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
                Deals in this aisle
              </div>
              <div style={{ fontSize: 13, color: "#6b7280" }}>
                {allDeals.length > 0
                  ? `${allDeals.length} deals · up to $${dealSavingsPotential.toFixed(2)} savings`
                  : "No deals right now"}
              </div>
            </div>
            <div style={{ padding: "12px 18px" }}>
              {allDeals.length === 0 ? (
                <div style={{ color: "#9ca3af", fontSize: 14, textAlign: "center", padding: "20px 0" }}>
                  No deals in this aisle today
                </div>
              ) : (
                <>
                  {deals.storeDeals?.map(deal => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      type="store"
                      clipped={isDealClipped(deal.id)}
                      onClip={clipDeal}
                      onUnclip={unclipDeal}
                    />
                  ))}
                  {deals.ibottaCoupons?.map(deal => (
                    <DealCard
                      key={deal.id}
                      deal={deal}
                      type="ibotta"
                      clipped={isDealClipped(deal.id)}
                      onClip={clipDeal}
                      onUnclip={unclipDeal}
                    />
                  ))}
                  {allDeals.length > 1 && (
                    <button
                      onClick={() => {
                        const unclipped = allDeals.filter(d => !isDealClipped(d.id));
                        unclipped.forEach(d => clipDeal(d));
                      }}
                      style={{
                        width: "100%", marginTop: 4, padding: "9px",
                        background: "#f0fdf4", border: "1.5px solid #86efac",
                        borderRadius: 10, color: "#15803d", fontWeight: 700,
                        fontSize: 13, cursor: "pointer",
                      }}
                    >
                      {allDeals.every(d => isDealClipped(d.id))
                        ? "✓ All deals clipped"
                        : `Clip all ${allDeals.length} deals`}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Next button */}
        <button
          onClick={handleNext}
          style={{
            width: "100%", padding: "18px",
            background: "#15803d", color: "white",
            border: "none", borderRadius: 14,
            fontSize: 17, fontWeight: 800,
            cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center", gap: 10,
            boxShadow: "0 4px 20px rgba(21,128,61,.3)",
            letterSpacing: 0.2,
          }}
        >
          {isLastAisle ? (
            <>Head to Checkout <span style={{ fontSize: 20 }}>🧾</span></>
          ) : (
            <>
              Next: {aisleShortName(nextAisleKey)} {AISLE_EMOJIS[nextAisleKey]}
              <span style={{ fontSize: 20, marginLeft: 4 }}>→</span>
            </>
          )}
        </button>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .nav-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
