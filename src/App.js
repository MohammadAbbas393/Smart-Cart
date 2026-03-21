import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import StorePage from "./pages/StorePage";
import MapPage from "./pages/MapPage";
import CouponsPage from "./pages/CouponsPage";
import CartPage from "./pages/CartPage";
import IntegrationsPage from "./pages/IntegrationsPage";
import CSVUploadPage from "./pages/CSVUploadPage";
import ForBusinessPage from "./pages/ForBusinessPage";
import LoginPage from "./pages/LoginPage";
import StoreSelectPage from "./pages/StoreSelectPage";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function AppRoutes() {
  const { user, selectedStore } = useAuth();

  // Not logged in → always go to login
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Logged in but no store selected → go to store picker
  if (!selectedStore) {
    return (
      <Routes>
        <Route path="/stores" element={<StoreSelectPage />} />
        <Route path="*" element={<Navigate to="/stores" replace />} />
      </Routes>
    );
  }

  // Logged in + store selected → full app
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<StorePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/coupons" element={<CouponsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/for-business" element={<ForBusinessPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/admin/upload" element={<CSVUploadPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
