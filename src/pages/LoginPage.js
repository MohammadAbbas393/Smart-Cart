import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(null); // "google" | "apple" | "email"
  const [error, setError] = useState("");

  const handleSocialSignIn = (provider) => {
    setLoading(provider);
    setError("");
    // Simulate OAuth flow
    setTimeout(() => {
      const names = { google: "Alex Johnson", apple: "Alex Johnson" };
      const emails = { google: "alex@gmail.com", apple: "alex@icloud.com" };
      signIn({
        id: `${provider}_${Date.now()}`,
        name: names[provider],
        email: emails[provider],
        avatar: names[provider].split(" ").map(n => n[0]).join(""),
        provider,
      });
      setLoading(null);
    }, 1200);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    if (mode === "signup" && !form.name) { setError("Please enter your name."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading("email");
    setTimeout(() => {
      const name = mode === "signup" ? form.name : form.email.split("@")[0];
      signIn({
        id: `email_${Date.now()}`,
        name,
        email: form.email,
        avatar: name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2),
        provider: "email",
      });
      setLoading(null);
    }, 800);
  };

  return (
    <div className="auth-page">
      <div className="auth-split">
        {/* Left branding panel */}
        <div className="auth-brand-panel">
          <div className="auth-brand-inner">
            <div className="auth-logo">🛒</div>
            <h1 className="auth-brand-title">Smart<span>Cart</span></h1>
            <p className="auth-brand-tagline">
              Your intelligent grocery companion. Shop smarter, save more, navigate with ease.
            </p>
            <div className="auth-features">
              {[
                { emoji: "🗺️", text: "Turn-by-turn store navigation" },
                { emoji: "🏷️", text: "Auto-applied coupons & deals" },
                { emoji: "⚡", text: "Optimized shopping routes" },
              ].map((f, i) => (
                <div key={i} className="auth-feature-item">
                  <span className="auth-feature-emoji">{f.emoji}</span>
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="auth-form-panel">
          <div className="auth-card">
            <h2 className="auth-title">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="auth-subtitle">
              {mode === "signin"
                ? "Sign in to access your shopping lists and saved stores."
                : "Join SmartCart and start shopping smarter today."}
            </p>

            {/* Social sign-in buttons */}
            <div className="auth-socials">
              <button
                className="social-btn social-btn-google"
                onClick={() => handleSocialSignIn("google")}
                disabled={!!loading}
              >
                {loading === "google" ? (
                  <span className="auth-spinner" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                )}
                {loading === "google" ? "Signing in…" : "Continue with Google"}
              </button>

              <button
                className="social-btn social-btn-apple"
                onClick={() => handleSocialSignIn("apple")}
                disabled={!!loading}
              >
                {loading === "apple" ? (
                  <span className="auth-spinner auth-spinner-white" />
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.43c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.56-1.32 3.1-2.53 3.96zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                )}
                {loading === "apple" ? "Signing in…" : "Continue with Apple"}
              </button>
            </div>

            <div className="auth-divider">
              <span>or {mode === "signin" ? "sign in" : "sign up"} with email</span>
            </div>

            {/* Email form */}
            <form onSubmit={handleEmailSubmit} className="auth-form">
              {mode === "signup" && (
                <div className="auth-field">
                  <label className="auth-label">Full Name</label>
                  <input
                    className="auth-input"
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
              )}
              <div className="auth-field">
                <label className="auth-label">Email</label>
                <input
                  className="auth-input"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                />
              </div>
              <div className="auth-field">
                <label className="auth-label">Password</label>
                <input
                  className="auth-input"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                />
              </div>

              {error && <p className="auth-error">{error}</p>}

              <button
                type="submit"
                className="btn btn-primary auth-submit-btn"
                disabled={!!loading}
              >
                {loading === "email" ? (
                  <><span className="auth-spinner auth-spinner-white" /> {mode === "signup" ? "Creating account…" : "Signing in…"}</>
                ) : (
                  mode === "signup" ? "Create Account" : "Sign In"
                )}
              </button>
            </form>

            <p className="auth-switch">
              {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
              <button
                className="auth-switch-btn"
                onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(""); }}
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
