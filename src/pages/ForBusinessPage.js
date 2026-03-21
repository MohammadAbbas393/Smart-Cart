import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Users, DollarSign, Zap, Shield, BarChart } from "lucide-react";

// ============================================================
//  FOR BUSINESS PAGE
//  This is your sales pitch page. When you're talking to a
//  store's VP of Marketing or Director of Digital:
//  1. Pull this up on your laptop
//  2. Walk them through the value props
//  3. Show them the integration options
//  4. Close with the pricing tiers
// ============================================================

const PRICING = [
  {
    tier: "Starter",
    price: "$299",
    per: "/mo per location",
    color: "var(--green-700)",
    bg: "var(--green-50)",
    border: "var(--green-200)",
    ideal: "Independent grocers, pilots",
    features: [
      "Up to 500 products",
      "CSV upload integration",
      "Store map + routing",
      "Basic coupon display",
      "Email support",
    ],
    cta: "Start Pilot",
  },
  {
    tier: "Growth",
    price: "$799",
    per: "/mo per location",
    color: "var(--orange-600)",
    bg: "var(--orange-50)",
    border: "var(--orange-400)",
    ideal: "Regional chains (10–50 stores)",
    featured: true,
    features: [
      "Unlimited products",
      "Admin dashboard access",
      "White-label branding",
      "Coupon analytics",
      "Shopper behavior data",
      "Priority support",
    ],
    cta: "Most Popular",
  },
  {
    tier: "Enterprise",
    price: "Custom",
    per: "per contract",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#a78bfa",
    ideal: "Walmart, Kroger, large chains",
    features: [
      "Direct ERP integration",
      "Real-time inventory sync",
      "Multi-location dashboard",
      "Custom analytics reports",
      "Dedicated account manager",
      "SLA + compliance docs",
    ],
    cta: "Contact Us",
  },
];

const STATS = [
  { value: "23%", label: "avg. increase in basket size", icon: <TrendingUp size={20} /> },
  { value: "8min", label: "saved per shopping trip",      icon: <Zap size={20} /> },
  { value: "4.8★", label: "avg. customer satisfaction",  icon: <Users size={20} /> },
  { value: "3x",   label: "coupon redemption rate",       icon: <DollarSign size={20} /> },
];

export default function ForBusinessPage() {
  return (
    <div style={{ background: "var(--white)" }}>

      {/* ── Hero ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #14532d 100%)",
        padding: "80px 24px",
        textAlign: "center",
        color: "white",
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(74,222,128,0.15)",
          border: "1px solid rgba(74,222,128,0.3)",
          borderRadius: 99,
          padding: "6px 16px",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#4ade80",
          marginBottom: 20,
        }}>
          For Retail Partners
        </div>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 5vw, 3.5rem)",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          marginBottom: 20,
          maxWidth: 700,
          margin: "0 auto 20px",
        }}>
          Give your customers a<br />
          <span style={{ color: "#4ade80" }}>smarter way to shop.</span>
        </h1>
        <p style={{ opacity: 0.8, fontSize: "1.1rem", maxWidth: 500, margin: "0 auto 32px", lineHeight: 1.6 }}>
          SmartCart plugs into your store in days — no IT overhaul needed. 
          Customers find products faster, clip more coupons, and spend more.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <a href="mailto:hello@smartcart.io" className="btn btn-orange btn-lg">
            Book a Demo
          </a>
          <Link to="/integrations" className="btn btn-lg" style={{ background: "rgba(255,255,255,0.1)", color: "white", backdropFilter: "blur(8px)" }}>
            See How It Works
          </Link>
        </div>
      </div>

      <div className="page" style={{ maxWidth: 1100 }}>

        {/* ── Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, margin: "48px 0" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "28px 20px",
              background: "var(--white)", border: "1.5px solid var(--gray-200)",
              borderRadius: "var(--radius-lg)",
            }}>
              <div style={{ color: "var(--green-500)", marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "var(--green-700)" }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.8rem", color: "var(--gray-500)", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Value Props ── */}
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, textAlign: "center", marginBottom: 32, letterSpacing: "-0.02em" }}>
          What SmartCart does for your store
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 64 }}>
          {[
            {
              icon: <BarChart size={22} color="var(--green-700)" />,
              bg: "var(--green-50)",
              title: "Shopper Behavior Data",
              desc: "See which aisles get skipped, which promotions get clicks, and which products are searched most. Real insight from real trips.",
            },
            {
              icon: <DollarSign size={22} color="var(--orange-600)" />,
              bg: "var(--orange-50)",
              title: "New Revenue Channel",
              desc: "Brands pay for sponsored placement in the app. You set the rules — we handle the display. End-cap budgets go digital.",
            },
            {
              icon: <Zap size={22} color="var(--green-700)" />,
              bg: "var(--green-50)",
              title: "Faster Checkout",
              desc: "Optimized routing means less wandering and shorter trips. Customers leave happier, come back more often.",
            },
            {
              icon: <Shield size={22} color="#7c3aed" />,
              bg: "#f5f3ff",
              title: "White-Label Ready",
              desc: "The app shows your logo, your colors, your name. Customers think it's your app. We stay invisible.",
            },
            {
              icon: <Users size={22} color="var(--orange-600)" />,
              bg: "var(--orange-50)",
              title: "Coupon Engagement",
              desc: "Store and manufacturer coupons shown in-context — right when the customer is in the aisle. 3x the redemption rate vs printed flyers.",
            },
            {
              icon: <TrendingUp size={22} color="var(--green-700)" />,
              bg: "var(--green-50)",
              title: "No Heavy Lifting",
              desc: "Just give us your product-aisle data. We do the rest. CSV, dashboard, or direct API — whatever's easiest for you.",
            },
          ].map((v, i) => (
            <div key={i} className="card" style={{ padding: "24px" }}>
              <div style={{
                width: 44, height: 44, background: v.bg,
                borderRadius: "var(--radius-md)", display: "flex",
                alignItems: "center", justifyContent: "center", marginBottom: 14,
              }}>{v.icon}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 8 }}>{v.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--gray-600)", lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>

        {/* ── How we get their data ── */}
        <div style={{
          background: "var(--gray-50)", border: "1.5px solid var(--gray-200)",
          borderRadius: "var(--radius-xl)", padding: "40px",
          marginBottom: 64, textAlign: "center",
        }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, marginBottom: 8 }}>
            "What do you need from us?"
          </h2>
          <p style={{ color: "var(--gray-500)", marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
            That's the first question every store asks. Here's the honest answer:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, maxWidth: 800, margin: "0 auto" }}>
            {[
              { emoji: "📋", title: "A product list", desc: "Name, price, and what aisle it's in. A spreadsheet works fine." },
              { emoji: "🗺️", title: "Your store layout", desc: "Just the aisle numbers and section names. Takes 20 minutes." },
              { emoji: "🤝", title: "A pilot agreement", desc: "One location, 30 days. No long-term commitment to start." },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>{item.emoji}</div>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: "0.82rem", color: "var(--gray-500)" }}>{item.desc}</div>
              </div>
            ))}
          </div>
          <Link to="/integrations" className="btn btn-outline" style={{ marginTop: 32 }}>
            See all 3 integration options →
          </Link>
        </div>

        {/* ── Pricing ── */}
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 800, textAlign: "center", marginBottom: 8, letterSpacing: "-0.02em" }}>
          Simple, transparent pricing
        </h2>
        <p style={{ textAlign: "center", color: "var(--gray-500)", marginBottom: 36 }}>
          Per location, billed monthly. Cancel any time.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 64 }}>
          {PRICING.map((plan) => (
            <div key={plan.tier} style={{
              background: "var(--white)",
              border: `2px solid ${plan.featured ? plan.color : "var(--gray-200)"}`,
              borderRadius: "var(--radius-xl)",
              padding: "28px 24px",
              position: "relative",
              boxShadow: plan.featured ? "0 8px 40px rgba(249,115,22,.15)" : "none",
              transform: plan.featured ? "translateY(-4px)" : "none",
            }}>
              {plan.featured && (
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  background: plan.color, color: "white",
                  fontSize: "0.7rem", fontWeight: 700, padding: "4px 14px",
                  borderRadius: 99, whiteSpace: "nowrap",
                }}>
                  ⭐ Most Popular
                </div>
              )}
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem", color: plan.color, marginBottom: 4 }}>
                {plan.tier}
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "2rem", color: "var(--gray-900)" }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--gray-400)" }}>{plan.per}</span>
              </div>
              <div style={{ fontSize: "0.78rem", color: "var(--gray-400)", marginBottom: 20 }}>
                Ideal for: {plan.ideal}
              </div>
              <div style={{ height: 1, background: "var(--gray-100)", marginBottom: 20 }} />
              {plan.features.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, fontSize: "0.85rem", color: "var(--gray-600)" }}>
                  <span style={{ color: plan.color, fontWeight: 700 }}>✓</span> {f}
                </div>
              ))}
              <button
                className="btn"
                style={{
                  width: "100%", justifyContent: "center", marginTop: 16,
                  background: plan.featured ? plan.color : "transparent",
                  color: plan.featured ? "white" : plan.color,
                  border: `2px solid ${plan.color}`,
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* ── Contact CTA ── */}
        <div style={{
          background: "linear-gradient(135deg, #14532d, #15803d)",
          borderRadius: "var(--radius-xl)", padding: "48px 40px",
          textAlign: "center", color: "white", marginBottom: 40,
        }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.75rem", marginBottom: 12 }}>
            Ready to run a pilot?
          </h2>
          <p style={{ opacity: 0.85, marginBottom: 28, maxWidth: 400, margin: "0 auto 28px" }}>
            We'll get your store live in under a week. No commitment, no IT headache.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="mailto:hello@smartcart.io" className="btn btn-orange btn-lg">
              📧 Email Us
            </a>
            <a href="https://calendly.com" target="_blank" rel="noreferrer" className="btn btn-lg"
              style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>
              📅 Book a 20-min Call
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
