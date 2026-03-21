import React, { useState, useRef, useEffect, useCallback } from "react";
import { Navigation, ShoppingCart, Map, CheckCircle, ChevronRight, X } from "lucide-react";
import { STORE_MAP, AISLE_DIRECTORY, getProductsInAisle } from "../data/ziggysDatabase";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function MapPage() {
  const [selectedAisle, setSelectedAisle] = useState(null);
  const { cartItems, generateRoute, activeRoute } = useCart();
  const [navMode, setNavMode] = useState(false);
  const [navStep, setNavStep] = useState(0);

  // SVG path state
  const mapWrapRef = useRef(null);
  const [entranceCoord, setEntranceCoord] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]); // one coord per activeRoute stop

  const computeCoords = useCallback(() => {
    if (!mapWrapRef.current) return;
    const wrapper = mapWrapRef.current;
    const wRect = wrapper.getBoundingClientRect();

    const avgCoord = (cells) => {
      if (!cells.length) return null;
      let sx = 0, sy = 0;
      cells.forEach(c => {
        const r = c.getBoundingClientRect();
        sx += (r.left + r.right) / 2 - wRect.left;
        sy += (r.top + r.bottom) / 2 - wRect.top;
      });
      return { x: sx / cells.length, y: sy / cells.length };
    };

    const entCells = wrapper.querySelectorAll('[data-celltype="entrance"]');
    setEntranceCoord(avgCoord([...entCells]));

    const coords = activeRoute.map(stop => {
      const cells = wrapper.querySelectorAll(`[data-aisle="${stop}"]`);
      return avgCoord([...cells]);
    });
    setRouteCoords(coords);
  }, [activeRoute]);

  useEffect(() => {
    // Small delay to ensure grid has rendered
    const t = setTimeout(computeCoords, 50);
    return () => clearTimeout(t);
  }, [computeCoords, navMode, navStep]);

  const handleCellClick = (cell) => {
    if (!navMode && cell.aisle !== undefined) setSelectedAisle(cell.aisle);
  };

  const handleGenerateRoute = () => {
    if (cartItems.length === 0) return;
    generateRoute();
    setNavMode(false);
    setNavStep(0);
  };

  const startNavigation = () => {
    setNavMode(true);
    setNavStep(0);
    setSelectedAisle(null);
  };

  const advanceStep = () => {
    if (navStep < activeRoute.length - 1) {
      setNavStep(s => s + 1);
    } else {
      setNavMode(false);
      setNavStep(0);
    }
  };

  // Turtle is at entrance before start, at route[navStep-1] after first step
  const turtleCoord = navMode && navStep > 0
    ? routeCoords[navStep - 1]
    : entranceCoord;

  // Target = current stop we're heading to
  const targetCoord = navMode && routeCoords[navStep] ? routeCoords[navStep] : null;

  // Solid path: entrance → stops visited so far
  const solidPoints = navMode && entranceCoord
    ? [entranceCoord, ...routeCoords.slice(0, navStep)].filter(Boolean)
    : [];

  // Full preview path (all stops, shown when route exists but not in nav mode)
  const previewPoints = !navMode && entranceCoord && activeRoute.length > 0
    ? [entranceCoord, ...routeCoords].filter(Boolean)
    : [];

  const pointsToStr = (pts) => pts.map(p => `${p.x},${p.y}`).join(" ");

  const currentStop = navMode ? activeRoute[navStep] : null;
  const nextStop = navMode && navStep < activeRoute.length - 1 ? activeRoute[navStep + 1] : null;

  const cellClass = (cell) => {
    let base = `map-cell map-cell-${cell.type}`;
    if (cell.aisle !== undefined) {
      if (navMode) {
        if (String(cell.aisle) === String(currentStop)) base += " map-cell-current-stop";
        else if (String(cell.aisle) === String(nextStop)) base += " map-cell-next-stop";
        else if (activeRoute.includes(cell.aisle)) base += " route-stop";
      } else {
        if (String(cell.aisle) === String(selectedAisle)) base += " highlighted";
        if (activeRoute.includes(cell.aisle)) base += " route-stop";
      }
    }
    return base;
  };

  const selectedProducts = selectedAisle !== null ? getProductsInAisle(selectedAisle) : [];
  const aisleInfo = selectedAisle !== null ? AISLE_DIRECTORY[selectedAisle] : null;
  const currentStopInfo = currentStop !== null ? AISLE_DIRECTORY[currentStop] : null;
  const cartItemsAtCurrentStop = cartItems.filter(i => String(i.product.aisle) === String(currentStop));

  return (
    <div className="page animate-fadeup">
      <div className="page-hero">
        <h1 className="page-title">Store Map</h1>
        <p className="page-subtitle">Tap any aisle to see what's there. Generate your optimized shopping route below.</p>
      </div>

      {/* Navigation Mode Panel */}
      {navMode ? (
        <div className="nav-panel">
          <div className="nav-panel-top">
            <div className="nav-progress-row">
              <span className="nav-step-label">Stop {navStep + 1} of {activeRoute.length}</span>
              <div className="nav-progress-bar">
                <div className="nav-progress-fill" style={{ width: `${((navStep + 1) / activeRoute.length) * 100}%` }} />
              </div>
            </div>
            <button className="btn btn-ghost btn-sm nav-cancel" onClick={() => setNavMode(false)}>
              <X size={14} /> Cancel
            </button>
          </div>

          <div className="nav-panel-body">
            <div className="nav-current-stop">
              <div className="nav-stop-icon">{currentStopInfo?.emoji || "📍"}</div>
              <div className="nav-stop-info">
                <div className="nav-stop-name">{currentStopInfo?.name || `Aisle ${currentStop}`}</div>
                <div className="nav-stop-sub">
                  {cartItemsAtCurrentStop.length > 0
                    ? `Pick up ${cartItemsAtCurrentStop.length} item${cartItemsAtCurrentStop.length !== 1 ? "s" : ""} here`
                    : "Head to this section"}
                </div>
                {cartItemsAtCurrentStop.length > 0 && (
                  <div className="nav-item-chips">
                    {cartItemsAtCurrentStop.map(i => (
                      <span key={i.product.id} className="nav-item-chip">
                        {i.product.emoji} {i.product.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="nav-actions">
              {nextStop && (
                <div className="nav-next-preview">
                  <span>Next up</span>
                  <span className="nav-next-name">
                    {AISLE_DIRECTORY[nextStop]?.emoji} {AISLE_DIRECTORY[nextStop]?.name || `Aisle ${nextStop}`}
                  </span>
                  <ChevronRight size={14} />
                </div>
              )}
              <button className="btn btn-primary nav-confirm-btn" onClick={advanceStep}>
                <CheckCircle size={16} />
                {navStep < activeRoute.length - 1 ? "Item Added — Next Stop" : "Finish Route ✓"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Route Generator Banner */
        <div style={{
          background: activeRoute.length > 0 ? "linear-gradient(135deg, #14532d, #15803d)" : "var(--white)",
          border: activeRoute.length > 0 ? "none" : "2px solid var(--gray-200)",
          borderRadius: "var(--radius-lg)",
          padding: "20px 24px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          color: activeRoute.length > 0 ? "white" : "var(--gray-800)",
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", marginBottom: 4 }}>
              {activeRoute.length > 0 ? "🗺️ Your Optimized Route" : "🗺️ Generate Shopping Route"}
            </div>
            {activeRoute.length > 0 ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {activeRoute.map((stop, i) => (
                  <React.Fragment key={stop}>
                    <span style={{ background: "rgba(255,255,255,0.2)", borderRadius: 8, padding: "3px 10px", fontSize: "0.8rem", fontWeight: 600 }}>
                      {AISLE_DIRECTORY[stop]?.emoji} {AISLE_DIRECTORY[stop]?.name || `Aisle ${stop}`}
                    </span>
                    {i < activeRoute.length - 1 && <span style={{ opacity: 0.6, fontSize: "0.75rem" }}>→</span>}
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: "0.85rem", color: "var(--gray-500)" }}>
                {cartItems.length === 0
                  ? "Add items to your cart first, then generate your route."
                  : `${cartItems.length} cart item${cartItems.length !== 1 ? "s" : ""} ready — generate your path!`}
              </p>
            )}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {cartItems.length === 0 ? (
              <Link to="/store" className="btn btn-orange btn-sm">
                <ShoppingCart size={14} /> Add Items
              </Link>
            ) : (
              <>
                <button className="btn btn-orange btn-sm" onClick={handleGenerateRoute}>
                  <Navigation size={14} /> {activeRoute.length > 0 ? "Recalculate" : "Generate Route"}
                </button>
                {activeRoute.length > 0 && (
                  <button
                    className="btn btn-sm"
                    style={{ background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}
                    onClick={startNavigation}
                  >
                    ▶ Start Route
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Map Legend */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16, fontSize: "0.72rem" }}>
        {[
          { cls: "map-cell-produce",  label: "Produce" },
          { cls: "map-cell-aisle",    label: "Aisle" },
          { cls: "map-cell-endcap",   label: "End Cap" },
          { cls: "map-cell-bakery",   label: "Bakery" },
          { cls: "map-cell-deli",     label: "Deli" },
          { cls: "map-cell-frozen",   label: "Frozen" },
          { cls: "map-cell-entrance", label: "Entrance" },
          { cls: "map-cell-checkout", label: "Checkout" },
        ].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div className={`map-cell ${l.cls}`} style={{ width: 20, height: 20, minHeight: "unset", borderRadius: 4, padding: 0, fontSize: "0" }} />
            <span style={{ color: "var(--gray-600)" }}>{l.label}</span>
          </div>
        ))}
        {activeRoute.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 20, height: 4, borderRadius: 2, background: "var(--orange-500)" }} />
            <span style={{ color: "var(--gray-600)" }}>Route Path</span>
          </div>
        )}
      </div>

      {/* Grid Map */}
      <div className="card" style={{ padding: "16px", marginBottom: 24, overflowX: "auto" }}>
        {/* Wrapper holds the grid + SVG overlay + turtle */}
        <div style={{ position: "relative" }} ref={mapWrapRef}>
          <div
            className="store-map-grid"
            style={{ gridTemplateColumns: `repeat(${STORE_MAP.cols}, minmax(60px, 1fr))` }}
          >
            {STORE_MAP.grid.flat().map((cell, i) => {
              const routeStep = cell.aisle !== undefined ? activeRoute.indexOf(cell.aisle) : -1;
              const isCurrentStop = navMode && cell.aisle !== undefined && String(cell.aisle) === String(currentStop);

              return (
                <div
                  key={i}
                  className={cellClass(cell)}
                  onClick={() => handleCellClick(cell)}
                  title={cell.label || cell.type}
                  style={{ position: "relative" }}
                  data-aisle={cell.aisle !== undefined ? String(cell.aisle) : undefined}
                  data-celltype={cell.type}
                >
                  {/* Step badge */}
                  {!isCurrentStop && routeStep >= 0 && (
                    <div className="route-step-badge">{routeStep + 1}</div>
                  )}

                  {cell.type === "aisle" || cell.type === "produce" || cell.type === "bakery" || cell.type === "deli" || cell.type === "frozen"
                    ? (
                      <div>
                        <div style={{ fontSize: "1rem" }}>{AISLE_DIRECTORY[cell.aisle]?.emoji || ""}</div>
                        <div>{cell.label}</div>
                      </div>
                    )
                    : cell.label ? <div>{cell.label}</div> : null}
                </div>
              );
            })}
          </div>

          {/* SVG path overlay */}
          {(previewPoints.length > 1 || solidPoints.length > 1 || targetCoord) && (
            <svg
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", overflow: "visible" }}
            >
              {/* Full route preview — light dashed when not navigating */}
              {previewPoints.length > 1 && (
                <polyline
                  points={pointsToStr(previewPoints)}
                  fill="none"
                  stroke="var(--orange-400)"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.5"
                />
              )}

              {/* Solid traveled path */}
              {solidPoints.length > 1 && (
                <polyline
                  points={pointsToStr(solidPoints)}
                  fill="none"
                  stroke="var(--green-700)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}

              {/* Current leg: turtle → target (animated orange) */}
              {turtleCoord && targetCoord && (
                <line
                  x1={turtleCoord.x} y1={turtleCoord.y}
                  x2={targetCoord.x} y2={targetCoord.y}
                  stroke="var(--orange-500)"
                  strokeWidth="3"
                  strokeDasharray="8 5"
                  strokeLinecap="round"
                >
                  <animate attributeName="stroke-dashoffset" from="26" to="0" dur="0.8s" repeatCount="indefinite" />
                </line>
              )}

              {/* Target pulsing circle */}
              {targetCoord && (
                <circle cx={targetCoord.x} cy={targetCoord.y} r="10" fill="var(--orange-500)" opacity="0.25">
                  <animate attributeName="r" values="8;14;8" dur="1.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
                </circle>
              )}
            </svg>
          )}

          {/* Turtle 🐢 — positioned absolutely, transitions smoothly */}
          {turtleCoord && (
            <div
              style={{
                position: "absolute",
                left: turtleCoord.x,
                top: turtleCoord.y,
                transform: "translate(-50%, -50%)",
                fontSize: "1.6rem",
                zIndex: 10,
                pointerEvents: "none",
                transition: "left 0.5s ease, top 0.5s ease",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
              }}
            >
              🐢
            </div>
          )}
        </div>
      </div>

      {/* Aisle Detail Panel (browse mode only) */}
      {!navMode && selectedAisle !== null && (
        <div className="card animate-fadeup" style={{ padding: "24px" }}>
          <h2 className="section-title">
            {aisleInfo?.emoji} {aisleInfo?.name || `Aisle ${selectedAisle}`}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--gray-500)", marginBottom: 16 }}>
            {selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""} in this section
          </p>
          <div className="product-grid">
            {selectedProducts.map(p => (
              <div key={p.id} className="product-card" style={{ pointerEvents: "none" }}>
                <div className="product-emoji">{p.emoji}</div>
                <div className="product-name">{p.name}</div>
                <div className="product-meta">
                  <span className="product-price">${p.price.toFixed(2)}</span>
                  <span className="product-unit">{p.unit}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: 16 }} onClick={() => setSelectedAisle(null)}>
            ✕ Close
          </button>
        </div>
      )}

      {/* Aisle Directory (browse mode only) */}
      {!navMode && (
        <>
          <h2 className="section-title" style={{ marginTop: 32 }}><Map size={18} /> Aisle Directory</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
            {Object.entries(AISLE_DIRECTORY).map(([key, info]) => (
              <button
                key={key}
                onClick={() => setSelectedAisle(key === selectedAisle ? null : key)}
                style={{
                  background: String(selectedAisle) === String(key) ? "var(--green-50)" : "var(--white)",
                  border: String(selectedAisle) === String(key) ? "2px solid var(--green-500)" : "1.5px solid var(--gray-200)",
                  borderRadius: "var(--radius-md)",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "1.4rem" }}>{info.emoji}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--gray-800)" }}>{info.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--gray-400)" }}>
                    Aisle {key} · {getProductsInAisle(key === parseInt(key) ? parseInt(key) : key).length} items
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
