import React, { useState } from "react";
import { Code, Database, Upload, CheckCircle, ExternalLink } from "lucide-react";

// ============================================================
//  INTEGRATIONS PAGE
//  This page lives in your app as documentation for potential
//  store partners. When you're in a sales meeting, pull this up
//  to show them exactly how their data connects to SmartCart.
// ============================================================

const OPTIONS = [
  {
    id: "A",
    color: "var(--green-700)",
    bg: "var(--green-50)",
    border: "var(--green-200)",
    icon: <Upload size={24} color="var(--green-700)" />,
    title: "CSV Upload",
    subtitle: "Easiest — no IT team needed",
    timeline: "Live in 1 day",
    bestFor: "Local stores, pilots, first deal",
    howItWorks: [
      "We give you a formatted CSV template",
      "Your store manager fills in product names, aisles, and prices",
      "Upload it to the SmartCart portal",
      "App updates instantly — no code changes needed",
    ],
    whatYouProvide: ["Product list (name, price, category)", "Aisle numbers per product", "Active coupons/deals (optional)"],
    whatWeHandle: ["Parsing and formatting", "Map generation", "Coupon matching", "Route optimization"],
    technicalAsk: "One spreadsheet from your store manager.",
    code: `// Your store manager uploads this CSV:
id,name,category,aisle,price,unit
p001,Bananas,Produce,P,0.59,per lb
a1001,Cheerios,Cereal,1,4.79,12oz
a5003,Coca-Cola,Soda,5,6.99,12pk

// SmartCart parses it and your store is live.
// No IT team, no API keys, no integration work.`,
  },
  {
    id: "B",
    color: "var(--orange-600)",
    bg: "var(--orange-50)",
    border: "var(--orange-200)",
    icon: <Database size={24} color="var(--orange-600)" />,
    title: "Admin Dashboard",
    subtitle: "Best for ongoing management",
    timeline: "Live in 1 week",
    bestFor: "Regional chains (10–50 stores)",
    howItWorks: [
      "Your team gets login access to the SmartCart portal",
      "Add, edit, and remove products through a clean web UI",
      "Manage promotions and coupons in real time",
      "Changes appear in the app within minutes",
    ],
    whatYouProvide: ["Staff login credentials", "Initial product list", "Store layout (aisles + sections)"],
    whatWeHandle: ["Secure cloud storage", "Real-time sync", "Multi-location management", "Analytics dashboard"],
    technicalAsk: "A 30-minute onboarding call with your store manager.",
    code: `// SmartCart Admin API — your team manages data via portal
// or directly via our REST API:

GET  /v1/stores/:id/products
POST /v1/stores/:id/products
PUT  /v1/stores/:id/products/:pid
GET  /v1/stores/:id/coupons
POST /v1/stores/:id/coupons

// Authentication: API key issued per store location
// Headers: { "X-API-Key": "sc_live_xxxxxxxxxxxx" }`,
  },
  {
    id: "C",
    color: "#7c3aed",
    bg: "#f5f3ff",
    border: "#ddd6fe",
    icon: <Code size={24} color="#7c3aed" />,
    title: "Direct System Integration",
    subtitle: "Enterprise — fully automated",
    timeline: "Live in 2–4 weeks",
    bestFor: "Walmart, Kroger, large chains",
    howItWorks: [
      "We connect directly to your existing inventory system",
      "Products, prices, and promotions sync automatically",
      "Nightly batch or real-time webhook — your choice",
      "Zero manual work after initial setup",
    ],
    whatYouProvide: ["API credentials or data feed access", "IT contact for integration setup", "Store location IDs"],
    whatWeHandle: ["Full system connector build", "Data normalization", "Automatic sync schedule", "Error monitoring"],
    technicalAsk: "API docs + credentials from your IT team. We handle the rest.",
    systems: [
      { name: "Kroger", note: "Kroger Partner API — apply at developer.kroger.com" },
      { name: "NCR Voyix", note: "REST API — most mid-size chains" },
      { name: "SAP Retail", note: "OData/REST — enterprise standard" },
      { name: "Epicor", note: "REST API — regional chains" },
      { name: "Walmart", note: "Supplier Portal + EDI — via vendor relationship" },
      { name: "Custom ERP", note: "We build a connector for your system" },
    ],
    code: `// Example: Kroger Partner API integration
// 1. Authenticate with OAuth 2.0
const token = await kroger.getToken(clientId, clientSecret);

// 2. Pull products by location
const products = await kroger.getProducts(token, locationId);

// 3. SmartCart normalizes + stores in your cloud DB
// 4. App serves real-time data to shoppers
// Sync runs nightly (or real-time via webhook)`,
  },
];

export default function IntegrationsPage() {
  const [active, setActive] = useState("A");
  const opt = OPTIONS.find(o => o.id === active);

  return (
    <div className="page animate-fadeup">
      <div className="page-hero">
        <h1 className="page-title">Store Integrations</h1>
        <p className="page-subtitle">Three ways to connect your store's data to SmartCart — from zero-code pilots to full enterprise sync</p>
      </div>

      {/* Option Selector */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 32 }}>
        {OPTIONS.map(o => (
          <button
            key={o.id}
            onClick={() => setActive(o.id)}
            style={{
              background: active === o.id ? o.bg : "var(--white)",
              border: `2px solid ${active === o.id ? o.color : "var(--gray-200)"}`,
              borderRadius: "var(--radius-lg)",
              padding: "20px 16px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s",
            }}
          >
            <div style={{ marginBottom: 8 }}>{o.icon}</div>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: "0.95rem", color: active === o.id ? o.color : "var(--gray-800)", marginBottom: 2
            }}>
              Option {o.id}: {o.title}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--gray-500)" }}>{o.subtitle}</div>
            <div style={{
              marginTop: 10, fontSize: "0.7rem", fontWeight: 700,
              color: o.color, background: o.bg,
              padding: "3px 8px", borderRadius: 99, display: "inline-block",
            }}>
              {o.timeline}
            </div>
          </button>
        ))}
      </div>

      {/* Detail Panel */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

        {/* Left */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* How it works */}
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 16, color: opt.color }}>
              How It Works
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {opt.howItWorks.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: opt.bg, border: `2px solid ${opt.color}`,
                    color: opt.color, fontSize: "0.7rem", fontWeight: 800,
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  }}>{i + 1}</div>
                  <div style={{ fontSize: "0.875rem", color: "var(--gray-700)", paddingTop: 2 }}>{step}</div>
                </div>
              ))}
            </div>
          </div>

          {/* You provide / We handle */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: 10, color: "var(--gray-700)" }}>
                📋 You Provide
              </div>
              {opt.whatYouProvide.map((item, i) => (
                <div key={i} style={{ fontSize: "0.78rem", color: "var(--gray-600)", marginBottom: 6, display: "flex", gap: 6 }}>
                  <span>•</span>{item}
                </div>
              ))}
            </div>
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: 10, color: "var(--gray-700)" }}>
                ⚡ We Handle
              </div>
              {opt.whatWeHandle.map((item, i) => (
                <div key={i} style={{ fontSize: "0.78rem", color: "var(--gray-600)", marginBottom: 6, display: "flex", gap: 6 }}>
                  <CheckCircle size={11} color="var(--green-500)" style={{ flexShrink: 0, marginTop: 2 }} />{item}
                </div>
              ))}
            </div>
          </div>

          {/* Technical ask */}
          <div style={{
            background: opt.bg, border: `1.5px solid ${opt.border}`,
            borderRadius: "var(--radius-md)", padding: "14px 18px",
            fontSize: "0.85rem", color: opt.color,
          }}>
            <strong>What we need from you:</strong> {opt.technicalAsk}
          </div>

          {/* Compatible systems for Option C */}
          {opt.systems && (
            <div className="card" style={{ padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: "0.82rem", marginBottom: 12 }}>Compatible Systems</div>
              {opt.systems.map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: "0.8rem", gap: 8 }}>
                  <span style={{ fontWeight: 600, color: "var(--gray-800)", flexShrink: 0 }}>{s.name}</span>
                  <span style={{ color: "var(--gray-500)", textAlign: "right" }}>{s.note}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Code preview */}
        <div>
          <div style={{
            background: "#0f172a",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
          }}>
            <div style={{
              padding: "12px 20px",
              background: "#1e293b",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f87171" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fbbf24" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#4ade80" }} />
              <span style={{ marginLeft: 8, fontSize: "0.75rem", color: "#94a3b8", fontFamily: "monospace" }}>
                integration-option-{opt.id.toLowerCase()}.js
              </span>
            </div>
            <pre style={{
              padding: "24px 20px",
              color: "#e2e8f0",
              fontSize: "0.78rem",
              lineHeight: 1.7,
              fontFamily: "'Fira Code', 'Courier New', monospace",
              overflowX: "auto",
              margin: 0,
              whiteSpace: "pre-wrap",
            }}>
              {opt.code}
            </pre>
          </div>

          {/* Best for */}
          <div style={{ marginTop: 16, padding: "14px 18px", background: "var(--white)", border: "1.5px solid var(--gray-200)", borderRadius: "var(--radius-md)" }}>
            <div style={{ fontSize: "0.75rem", color: "var(--gray-400)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
              Best For
            </div>
            <div style={{ fontWeight: 700, color: "var(--gray-800)" }}>{opt.bestFor}</div>
          </div>

          {/* CTA */}
          {opt.id === "A" && (
            <a href="/admin/upload" className="btn btn-primary" style={{ marginTop: 12, width: "100%", justifyContent: "center" }}>
              <Upload size={15} /> Try CSV Upload Now
            </a>
          )}
          {opt.id === "C" && (
            <a
              href="https://developer.kroger.com"
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              style={{ marginTop: 12, width: "100%", justifyContent: "center" }}
            >
              <ExternalLink size={14} /> Kroger Developer Portal
            </a>
          )}
        </div>
      </div>

      {/* Comparison table */}
      <div style={{ marginTop: 40 }}>
        <h2 className="section-title">Side-by-Side Comparison</h2>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
            <thead>
              <tr style={{ background: "var(--gray-100)" }}>
                {["Feature", "Option A — CSV", "Option B — Dashboard", "Option C — ERP"].map(h => (
                  <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "var(--gray-600)", borderBottom: "2px solid var(--gray-200)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Setup time",       "1 day",           "1 week",          "2–4 weeks"],
                ["IT required",      "❌ None",          "⚠️ Minimal",       "✅ Yes"],
                ["Data freshness",   "Manual upload",   "Real-time",       "Automated sync"],
                ["Best store size",  "1–5 locations",   "5–50 locations",  "50+ locations"],
                ["Monthly cost",     "Starter tier",    "Growth tier",     "Enterprise tier"],
                ["Coupon support",   "✅ CSV upload",    "✅ Portal UI",     "✅ Auto-synced"],
                ["Analytics",        "Basic",           "Full dashboard",  "Full + ERP data"],
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--gray-100)", background: i % 2 === 0 ? "var(--white)" : "var(--gray-50)" }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{ padding: "12px 16px", color: j === 0 ? "var(--gray-700)" : "var(--gray-600)", fontWeight: j === 0 ? 600 : 400 }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
