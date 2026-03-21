import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Map, Tag, Store, Home, Briefcase, Plug, ChevronDown, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, selectedStore, signOut, selectStore } = useAuth();
  const navigate = useNavigate();
  const [showBiz, setShowBiz] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const handleSwitchStore = () => {
    selectStore(null);
    navigate("/stores");
  };

  return (
    <nav className="navbar">
      <button className="navbar-brand" style={{ background: "none", border: "none", cursor: "pointer" }} onClick={handleSwitchStore}>
        <div className="navbar-logo">🛒</div>
        <span className="navbar-name">Smart<span>Cart</span></span>
        {selectedStore && (
          <span className="navbar-store-badge">{selectedStore.emoji} {selectedStore.name}</span>
        )}
      </button>

      <ul className="navbar-nav">
        <li><NavLink to="/" end><Home size={15} /><span className="nav-label">Home</span></NavLink></li>
        <li><NavLink to="/store"><Store size={15} /><span className="nav-label">Browse</span></NavLink></li>
        <li><NavLink to="/map"><Map size={15} /><span className="nav-label">Map</span></NavLink></li>
        <li><NavLink to="/coupons"><Tag size={15} /><span className="nav-label">Coupons</span></NavLink></li>

        {/* Business dropdown */}
        <li style={{ position: "relative" }}
          onMouseEnter={() => setShowBiz(true)}
          onMouseLeave={() => setShowBiz(false)}
        >
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "none", border: "none", cursor: "pointer",
            color: "var(--gray-600)", fontSize: "0.875rem", fontWeight: 500,
            padding: "8px 14px", borderRadius: "var(--radius-md)", fontFamily: "var(--font-body)",
          }}>
            <Briefcase size={15} />
            <span className="nav-label">For Business</span>
            <span style={{ fontSize: "0.6rem", opacity: 0.6 }}>▼</span>
          </button>
          {showBiz && (
            <div style={{
              position: "absolute", top: "100%", right: 0,
              background: "var(--white)", border: "1.5px solid var(--gray-200)",
              borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-lg)",
              padding: "8px", minWidth: 200, zIndex: 200,
            }}>
              <NavLink to="/for-business" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, textDecoration: "none", color: "var(--gray-700)", fontSize: "0.85rem" }}>
                <Briefcase size={14} /> Partner With Us
              </NavLink>
              <NavLink to="/integrations" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, textDecoration: "none", color: "var(--gray-700)", fontSize: "0.85rem" }}>
                <Plug size={14} /> Integration Options
              </NavLink>
              <NavLink to="/admin/upload" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, textDecoration: "none", color: "var(--gray-700)", fontSize: "0.85rem" }}>
                📂 CSV Upload (Admin)
              </NavLink>
            </div>
          )}
        </li>

        <li>
          <NavLink to="/cart" className="navbar-cart-btn">
            <ShoppingCart size={15} />
            <span className="nav-label">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </NavLink>
        </li>

        {/* User avatar dropdown */}
        {user && (
          <li style={{ position: "relative" }}
            onMouseEnter={() => setShowUser(true)}
            onMouseLeave={() => setShowUser(false)}
          >
            <button className="navbar-user-btn">
              <div className="navbar-avatar">{user.avatar || user.name?.[0] || "U"}</div>
              <ChevronDown size={12} style={{ opacity: 0.5 }} />
            </button>
            {showUser && (
              <div className="navbar-user-dropdown">
                <div className="navbar-user-info">
                  <div className="navbar-user-name">{user.name}</div>
                  <div className="navbar-user-email">{user.email}</div>
                </div>
                <div className="navbar-dropdown-divider" />
                <Link to="/profile" className="navbar-dropdown-item" style={{ textDecoration: "none", display: "block" }}>
                  <User size={13} style={{ marginRight: 6, verticalAlign: "middle" }} /> My Profile
                </Link>
                <button className="navbar-dropdown-item" onClick={handleSwitchStore}>
                  🏪 Switch Store
                </button>
                <button className="navbar-dropdown-item navbar-dropdown-item-danger" onClick={signOut}>
                  Sign Out
                </button>
              </div>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
}
