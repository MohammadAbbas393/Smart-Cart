import React from "react";
import { Link } from "react-router-dom";
import { Map, Tag, ShoppingCart, TrendingDown, Navigation, Zap } from "lucide-react";
import { STORE_INFO, COUPONS, PRODUCTS } from "../data/ziggysDatabase";
import { useCart } from "../context/CartContext";

export default function Home() {
  const { cartCount, cartTotal, cartSavings } = useCart();
  const featuredCoupons = COUPONS.filter(c => c.featured).slice(0, 3);

  return (
    <div className="page animate-fadeup">

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #14532d 0%, #15803d 50%, #16a34a 100%)",
        borderRadius: "var(--radius-xl)",
        padding: "40px 36px",
        marginBottom: "32px",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -40,
          width: 200, height: 200,
          background: "rgba(255,255,255,0.05)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -60, right: 60,
          width: 160, height: 160,
          background: "rgba(249,115,22,0.15)",
          borderRadius: "50%",
        }} />
        <div style={{ fontSize: "3rem", marginBottom: "12px" }}>🛒</div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.8rem, 5vw, 3rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          letterSpacing: "-0.03em",
          marginBottom: "12px",
        }}>
          Welcome to<br />
          <span style={{ color: "#4ade80" }}>{STORE_INFO.name}</span>
        </h1>
        <p style={{ opacity: 0.85, fontSize: "1rem", maxWidth: 420, marginBottom: "24px" }}>
          Find what you need, clip coupons, and navigate the store — all in one place.
        </p>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Link to="/store" className="btn btn-orange btn-lg">
            <ShoppingCart size={18} /> Start Shopping
          </Link>
          <Link to="/map" className="btn" style={{ background: "rgba(255,255,255,0.15)", color: "white", backdropFilter: "blur(8px)" }}>
            <Map size={18} /> View Store Map
          </Link>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { emoji: "🛍️", label: "Total Products", value: PRODUCTS.length },
          { emoji: "🏷️", label: "Active Coupons", value: COUPONS.length },
          { emoji: "🛒", label: "Items in Cart", value: cartCount },
          { emoji: "💰", label: "Savings So Far", value: `$${cartSavings.toFixed(2)}` },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: "20px", textAlign: "center" }}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{s.emoji}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.5rem", color: "var(--green-700)" }}>
              {s.value}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--gray-500)", marginTop: "2px" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── Features ── */}
      <h2 className="section-title"><Zap size={18} style={{ color: "var(--orange-500)" }} /> What SmartCart Does</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          {
            icon: <Navigation size={22} color="var(--green-700)" />,
            title: "Smart Routing",
            desc: "Add items to your cart — we'll generate the most efficient path through the store.",
            link: "/map", cta: "View Map",
          },
          {
            icon: <Tag size={22} color="var(--orange-500)" />,
            title: "Auto Coupons",
            desc: "See all available store & manufacturer coupons. They're applied automatically to your cart.",
            link: "/coupons", cta: "See Coupons",
          },
          {
            icon: <TrendingDown size={22} color="var(--green-700)" />,
            title: "Save More",
            desc: "Stack store and manufacturer coupons together for maximum savings at checkout.",
            link: "/cart", cta: "View Cart",
          },
        ].map((f, i) => (
          <div key={i} className="card" style={{ padding: "24px" }}>
            <div style={{
              width: 44, height: 44,
              background: i === 1 ? "var(--orange-50)" : "var(--green-50)",
              borderRadius: "var(--radius-md)",
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 14,
            }}>
              {f.icon}
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 6 }}>{f.title}</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", marginBottom: 16, lineHeight: 1.5 }}>{f.desc}</p>
            <Link to={f.link} className="btn btn-outline btn-sm">{f.cta} →</Link>
          </div>
        ))}
      </div>

      {/* ── Featured Coupons ── */}
      <h2 className="section-title"><Tag size={18} style={{ color: "var(--orange-500)" }} /> Featured Deals</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {featuredCoupons.map(coupon => (
          <div key={coupon.id} className="coupon-card">
            <div className="coupon-emoji">{coupon.emoji}</div>
            <div className="coupon-info">
              <div className="coupon-name">{coupon.productName}</div>
              <div className="coupon-desc">{coupon.description}</div>
              <div className="coupon-expires">Expires {coupon.expires}</div>
              <div style={{ marginTop: 6 }}>
                <span className={`badge ${coupon.type === "store" ? "badge-green" : "badge-orange"}`}>
                  {coupon.type === "store" ? "Store Coupon" : "Manufacturer"}
                </span>
              </div>
            </div>
            <div className="coupon-discount">
              {coupon.discountType === "dollar" ? `$${coupon.discount.toFixed(2)} OFF` : `${coupon.discount}% OFF`}
            </div>
          </div>
        ))}
      </div>
      <Link to="/coupons" className="btn btn-outline">View All {COUPONS.length} Coupons →</Link>

      {/* ── Store Info ── */}
      <div className="divider" />
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", color: "var(--gray-500)", fontSize: "0.85rem" }}>
        <span>📍 {STORE_INFO.address}</span>
        <span>🕐 {STORE_INFO.hours}</span>
        <span>🛒 {STORE_INFO.totalAisles} Aisles</span>
      </div>
    </div>
  );
}
