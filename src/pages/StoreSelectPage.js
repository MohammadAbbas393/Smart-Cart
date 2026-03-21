import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MapPin, Clock, ShoppingCart, Star } from "lucide-react";

const STORES = [
  {
    id: "ziggys",
    name: "Ziggy's Grocery",
    tagline: "Fresh. Fast. Friendly.",
    address: "42 Market Street, Burlington, VT",
    hours: "Mon–Sun: 7am – 10pm",
    distance: "0.3 mi",
    emoji: "🛒",
    rating: 4.8,
    reviews: 312,
    aisles: 8,
    color: "#15803d",
    tag: "Your Usual",
  },
  {
    id: "freshfields",
    name: "Fresh Fields Market",
    tagline: "Local. Organic. Affordable.",
    address: "118 Elm Avenue, Burlington, VT",
    hours: "Mon–Sat: 8am – 9pm",
    distance: "1.1 mi",
    emoji: "🌿",
    rating: 4.6,
    reviews: 198,
    aisles: 6,
    color: "#0f766e",
    tag: "Organic",
  },
  {
    id: "cornermart",
    name: "Corner Mart Express",
    tagline: "Quick. Convenient. Close.",
    address: "7 Pine Street, Burlington, VT",
    hours: "Daily: 6am – 11pm",
    distance: "0.7 mi",
    emoji: "⚡",
    rating: 4.3,
    reviews: 87,
    aisles: 4,
    color: "#b45309",
    tag: "Express",
  },
  {
    id: "harvestco",
    name: "Harvest Co.",
    tagline: "Farm to Table, Every Day.",
    address: "230 Lakeside Drive, Burlington, VT",
    hours: "Mon–Sun: 7am – 8pm",
    distance: "2.4 mi",
    emoji: "🌾",
    rating: 4.7,
    reviews: 241,
    aisles: 10,
    color: "#7c3aed",
    tag: "Large Format",
  },
];

export default function StoreSelectPage() {
  const { user, selectedStore, selectStore, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSelectStore = (store) => {
    selectStore(store);
    navigate("/");
  };

  return (
    <div className="store-select-page">
      {/* Top bar */}
      <div className="store-select-topbar">
        <div className="auth-logo-sm">🛒 <span className="store-select-brand">Smart<span>Cart</span></span></div>
        <div className="store-select-user">
          <div className="user-avatar">{user?.avatar || user?.name?.[0] || "U"}</div>
          <span className="user-name">{user?.name}</span>
          <button className="btn btn-ghost btn-sm" onClick={signOut}>Sign Out</button>
        </div>
      </div>

      <div className="store-select-content">
        <div className="store-select-hero">
          <h1 className="store-select-title">
            Hi {user?.name?.split(" ")[0]} 👋<br />
            <span>Which store are you at?</span>
          </h1>
          <p className="store-select-subtitle">
            Select a store to see its live layout, coupons, and generate your shopping route.
          </p>
        </div>

        <div className="stores-grid">
          {STORES.map(store => (
            <button
              key={store.id}
              className={`store-card ${selectedStore?.id === store.id ? "store-card-selected" : ""}`}
              onClick={() => handleSelectStore(store)}
            >
              <div className="store-card-header" style={{ background: store.color }}>
                <span className="store-card-emoji">{store.emoji}</span>
                <span className="store-card-tag">{store.tag}</span>
              </div>
              <div className="store-card-body">
                <h3 className="store-card-name">{store.name}</h3>
                <p className="store-card-tagline">{store.tagline}</p>

                <div className="store-card-meta">
                  <div className="store-meta-item">
                    <Star size={12} />
                    <span>{store.rating} <span style={{ color: "var(--gray-400)" }}>({store.reviews})</span></span>
                  </div>
                  <div className="store-meta-item">
                    <MapPin size={12} />
                    <span>{store.distance}</span>
                  </div>
                  <div className="store-meta-item">
                    <ShoppingCart size={12} />
                    <span>{store.aisles} aisles</span>
                  </div>
                </div>

                <div className="store-card-details">
                  <div className="store-detail"><MapPin size={11} /> {store.address}</div>
                  <div className="store-detail"><Clock size={11} /> {store.hours}</div>
                </div>

                <div className="store-card-cta">
                  Enter Store →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
