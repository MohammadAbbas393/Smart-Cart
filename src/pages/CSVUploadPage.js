import React, { useState, useRef } from "react";
import { Upload, Download, CheckCircle, AlertCircle, FileText } from "lucide-react";
import { OptionA } from "../data/dataAdapter";

// ============================================================
//  CSV UPLOAD PAGE — Option A Integration
//  
//  How to use:
//  1. Give store manager login to this page
//  2. They download the template
//  3. They fill it out with their product/aisle data
//  4. They upload it — app immediately uses their data
//  
//  No backend needed. Data is stored in localStorage.
//  Perfect for pilots and small store deals.
// ============================================================

const SAMPLE_ROWS = [
  { id: "p001", name: "Bananas",        category: "Produce",  aisle: "P", price: "0.59", unit: "per lb",  emoji: "🍌" },
  { id: "a1001",name: "Cheerios",       category: "Cereal",   aisle: "1", price: "4.79", unit: "12oz",    emoji: "⭕" },
  { id: "a5003",name: "Coca-Cola 12pk", category: "Soda",     aisle: "5", price: "6.99", unit: "12pk",    emoji: "🥤" },
  { id: "a6001",name: "Whole Milk",     category: "Dairy",    aisle: "6", price: "3.99", unit: "1gal",    emoji: "🥛" },
  { id: "a7002",name: "Chicken Breast", category: "Meat",     aisle: "7", price: "5.99", unit: "per lb",  emoji: "🍗" },
];

export default function CSVUploadPage() {
  const [status, setStatus]       = useState("idle"); // idle | parsing | success | error
  const [message, setMessage]     = useState("");
  const [preview, setPreview]     = useState([]);
  const [fileName, setFileName]   = useState("");
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setStatus("parsing");
    try {
      const products = await OptionA.parseCSV(file);
      setPreview(products.slice(0, 6));
      OptionA.saveToLocal(products);
      setStatus("success");
      setMessage(`✓ ${products.length} products loaded successfully. Reload the app to see your store data.`);
    } catch (err) {
      setStatus("error");
      setMessage("Error parsing CSV: " + err.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) { fileRef.current.files = e.dataTransfer.files; handleFile({ target: { files: [file] } }); }
  };

  return (
    <div className="page animate-fadeup">
      <div className="page-hero">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
          <span style={{
            background: "var(--green-100)", color: "var(--green-700)",
            fontSize: "0.7rem", fontWeight: 700, padding: "4px 10px",
            borderRadius: 99, textTransform: "uppercase", letterSpacing: "0.05em"
          }}>Integration Option A</span>
        </div>
        <h1 className="page-title">CSV Upload</h1>
        <p className="page-subtitle">Upload your store's product list as a spreadsheet — no IT team required</p>
      </div>

      {/* How it works */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 32 }}>
        {[
          { step: "1", icon: "📥", title: "Download Template", desc: "Get our pre-formatted CSV template" },
          { step: "2", icon: "✏️", title: "Fill It Out", desc: "Add your products, aisles, and prices" },
          { step: "3", icon: "📤", title: "Upload", desc: "Drop it here — app updates instantly" },
        ].map(s => (
          <div key={s.step} style={{
            background: "var(--white)", border: "1.5px solid var(--gray-200)",
            borderRadius: "var(--radius-lg)", padding: "20px", textAlign: "center"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 4 }}>{s.step}. {s.title}</div>
            <div style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>{s.desc}</div>
          </div>
        ))}
      </div>

      {/* Download Template */}
      <div style={{
        background: "var(--green-50)", border: "1.5px solid var(--green-200)",
        borderRadius: "var(--radius-lg)", padding: "20px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 16, marginBottom: 24,
      }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: 4 }}>📄 Product Upload Template</div>
          <div style={{ fontSize: "0.82rem", color: "var(--gray-600)" }}>
            CSV with columns: id, name, category, aisle, price, unit, emoji
          </div>
        </div>
        <button className="btn btn-primary" onClick={OptionA.downloadTemplate}>
          <Download size={15} /> Download Template
        </button>
      </div>

      {/* Template Preview */}
      <h2 className="section-title"><FileText size={16} /> Template Format</h2>
      <div style={{ overflowX: "auto", marginBottom: 32 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.82rem" }}>
          <thead>
            <tr style={{ background: "var(--gray-100)" }}>
              {["id","name","category","aisle","price","unit","emoji"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: "var(--gray-600)", borderBottom: "1.5px solid var(--gray-200)" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SAMPLE_ROWS.map((row, i) => (
              <tr key={i} style={{ borderBottom: "1px solid var(--gray-100)" }}>
                {Object.values(row).map((v, j) => (
                  <td key={j} style={{ padding: "10px 14px", color: "var(--gray-700)" }}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Upload Zone */}
      <h2 className="section-title"><Upload size={16} /> Upload Your File</h2>
      <div
        onDrop={handleDrop}
        onDragOver={e => e.preventDefault()}
        onClick={() => fileRef.current.click()}
        style={{
          border: `2px dashed ${status === "success" ? "var(--green-400)" : status === "error" ? "#f87171" : "var(--gray-300)"}`,
          borderRadius: "var(--radius-lg)",
          padding: "48px 24px",
          textAlign: "center",
          cursor: "pointer",
          background: status === "success" ? "var(--green-50)" : "var(--white)",
          transition: "all 0.2s",
          marginBottom: 24,
        }}
      >
        <input ref={fileRef} type="file" accept=".csv" style={{ display: "none" }} onChange={handleFile} />
        {status === "idle" && (
          <>
            <div style={{ fontSize: "3rem", marginBottom: 12 }}>📂</div>
            <div style={{ fontWeight: 600, marginBottom: 6 }}>Drop your CSV here or click to browse</div>
            <div style={{ fontSize: "0.82rem", color: "var(--gray-400)" }}>Accepts .csv files only</div>
          </>
        )}
        {status === "parsing" && (
          <div style={{ color: "var(--gray-500)" }}>⏳ Parsing {fileName}...</div>
        )}
        {status === "success" && (
          <div style={{ color: "var(--green-700)" }}>
            <CheckCircle size={32} style={{ margin: "0 auto 12px" }} />
            <div style={{ fontWeight: 700 }}>{message}</div>
          </div>
        )}
        {status === "error" && (
          <div style={{ color: "#dc2626" }}>
            <AlertCircle size={32} style={{ margin: "0 auto 12px" }} />
            <div style={{ fontWeight: 700 }}>{message}</div>
          </div>
        )}
      </div>

      {/* Preview of uploaded data */}
      {preview.length > 0 && (
        <>
          <h2 className="section-title">Preview (first {preview.length} products)</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
            {preview.map(p => (
              <div key={p.id} className="card" style={{ padding: 16 }}>
                <div style={{ fontSize: "2rem", textAlign: "center", marginBottom: 8 }}>{p.emoji}</div>
                <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{p.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>Aisle {p.aisle} · ${p.price}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Aisle Guide */}
      <div style={{ marginTop: 32, background: "var(--orange-50)", borderRadius: "var(--radius-lg)", padding: "20px 24px" }}>
        <div style={{ fontWeight: 700, marginBottom: 8, color: "var(--orange-700)" }}>📋 Aisle Codes Reference</div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: "0.82rem", color: "var(--gray-600)" }}>
          <span><strong>P</strong> = Produce</span>
          <span><strong>B</strong> = Bakery</span>
          <span><strong>D</strong> = Deli</span>
          <span><strong>F</strong> = Frozen</span>
          <span><strong>1–8</strong> = Numbered aisles</span>
        </div>
      </div>
    </div>
  );
}
