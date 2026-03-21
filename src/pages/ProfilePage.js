import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Edit2, Check, X, TrendingDown, DollarSign, ShoppingBag, Store } from "lucide-react";

export default function ProfilePage() {
  const { user, signIn, selectedStore } = useAuth();
  const { cartItems, cartTotal, cartSavings } = useCart();

  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || "");

  // Accumulate lifetime savings in localStorage
  const [lifetimeSavings, setLifetimeSavings] = useState(() => {
    return parseFloat(localStorage.getItem("sc_lifetime_savings") || "0");
  });
  const [lifetimeSpent, setLifetimeSpent] = useState(() => {
    return parseFloat(localStorage.getItem("sc_lifetime_spent") || "0");
  });
  const [tripCount, setTripCount] = useState(() => {
    return parseInt(localStorage.getItem("sc_trip_count") || "0");
  });

  // Save current cart snapshot to lifetime stats when cart has savings
  useEffect(() => {
    if (cartSavings > 0 || cartTotal > 0) {
      const prev = parseFloat(localStorage.getItem("sc_lifetime_savings") || "0");
      const prevSpent = parseFloat(localStorage.getItem("sc_lifetime_spent") || "0");
      const prevTrips = parseInt(localStorage.getItem("sc_trip_count") || "0");

      const newSavings = prev + cartSavings;
      const newSpent = prevSpent + cartTotal;
      const newTrips = prevTrips + (cartItems.length > 0 ? 1 : 0);

      localStorage.setItem("sc_lifetime_savings", newSavings.toFixed(2));
      localStorage.setItem("sc_lifetime_spent", newSpent.toFixed(2));
      localStorage.setItem("sc_trip_count", newTrips);

      setLifetimeSavings(newSavings);
      setLifetimeSpent(newSpent);
      setTripCount(newTrips);
    }
  }, []); // eslint-disable-line

  const saveName = () => {
    if (!nameInput.trim()) return;
    const updated = {
      ...user,
      name: nameInput.trim(),
      avatar: nameInput.trim().split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
    };
    signIn(updated);
    setEditingName(false);
  };

  const cancelEdit = () => {
    setNameInput(user?.name || "");
    setEditingName(false);
  };

  const wouldHavePaid = cartTotal + cartSavings;
  const lifetimeWouldHavePaid = lifetimeSpent + lifetimeSavings;

  const providerLabel = {
    google: "Google",
    apple: "Apple",
    email: "Email",
  }[user?.provider] || "Email";

  const providerIcon = {
    google: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    apple: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.43c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.56-1.32 3.1-2.53 3.96zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
    email: "✉️",
  }[user?.provider];

  return (
    <div className="page animate-fadeup">
      <div className="page-hero">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Manage your account and see your SmartCart savings.</p>
      </div>

      <div className="profile-layout">
        {/* Left: Account card */}
        <div className="profile-account-card card">
          {/* Big avatar */}
          <div className="profile-avatar-wrap">
            <div className="profile-avatar">{user?.avatar || user?.name?.[0] || "U"}</div>
            <div className="profile-provider-badge">
              {providerIcon}
            </div>
          </div>

          {/* Name (editable) */}
          <div className="profile-name-row">
            {editingName ? (
              <div className="profile-name-edit">
                <input
                  className="auth-input profile-name-input"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") saveName(); if (e.key === "Escape") cancelEdit(); }}
                  autoFocus
                />
                <button className="profile-icon-btn profile-icon-btn-green" onClick={saveName}><Check size={15} /></button>
                <button className="profile-icon-btn" onClick={cancelEdit}><X size={15} /></button>
              </div>
            ) : (
              <div className="profile-name-display">
                <span className="profile-name">{user?.name}</span>
                <button className="profile-icon-btn" onClick={() => setEditingName(true)}>
                  <Edit2 size={14} />
                </button>
              </div>
            )}
          </div>

          <div className="profile-email">{user?.email}</div>

          <div className="profile-meta-row">
            <span className="profile-meta-chip">
              {providerIcon} Signed in via {providerLabel}
            </span>
          </div>

          {selectedStore && (
            <div className="profile-store-row">
              <Store size={14} />
              <span>{selectedStore.emoji} {selectedStore.name}</span>
            </div>
          )}
        </div>

        {/* Right: Stats */}
        <div className="profile-stats-col">
          {/* Current cart savings */}
          <div className="profile-savings-hero card">
            <div className="profile-savings-label">
              <TrendingDown size={18} color="var(--green-700)" />
              This Trip — You're Saving
            </div>
            <div className="profile-savings-amount">${cartSavings.toFixed(2)}</div>
            <div className="profile-savings-breakdown">
              <div className="profile-savings-row">
                <span>Would've paid</span>
                <span className="profile-savings-strikethrough">${wouldHavePaid.toFixed(2)}</span>
              </div>
              <div className="profile-savings-row">
                <span>You pay</span>
                <span className="profile-savings-pay">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            {cartItems.length === 0 && (
              <p style={{ fontSize: "0.8rem", color: "var(--gray-400)", marginTop: 8 }}>
                Add items to your cart to see savings.
              </p>
            )}
          </div>

          {/* Lifetime stats */}
          <div className="profile-stats-grid">
            <div className="profile-stat-card card">
              <div className="profile-stat-icon" style={{ background: "var(--green-50)" }}>
                <DollarSign size={20} color="var(--green-700)" />
              </div>
              <div className="profile-stat-value">${lifetimeSavings.toFixed(2)}</div>
              <div className="profile-stat-label">Total Saved with SmartCart</div>
            </div>

            <div className="profile-stat-card card">
              <div className="profile-stat-icon" style={{ background: "var(--orange-50)" }}>
                <ShoppingBag size={20} color="var(--orange-500)" />
              </div>
              <div className="profile-stat-value">${lifetimeWouldHavePaid.toFixed(2)}</div>
              <div className="profile-stat-label">Would've Paid Without SmartCart</div>
            </div>

            <div className="profile-stat-card card">
              <div className="profile-stat-icon" style={{ background: "var(--green-50)" }}>
                <ShoppingBag size={20} color="var(--green-700)" />
              </div>
              <div className="profile-stat-value">${lifetimeSpent.toFixed(2)}</div>
              <div className="profile-stat-label">Actually Paid</div>
            </div>

            <div className="profile-stat-card card">
              <div className="profile-stat-icon" style={{ background: "var(--orange-50)" }}>
                <Store size={20} color="var(--orange-500)" />
              </div>
              <div className="profile-stat-value">{tripCount}</div>
              <div className="profile-stat-label">Shopping Trips</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
