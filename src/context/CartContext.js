import React, { createContext, useContext, useState } from "react";
import { getCouponsForProduct } from "../data/ziggysDatabase";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);
  const [activeRoute, setActiveRoute] = useState([]);
  const [clippedDeals, setClippedDeals] = useState([]);
  const [navStepIndex, setNavStepIndex] = useState(0);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      const coupons = getCouponsForProduct(product.id);
      return [...prev, { product, quantity: 1, appliedCoupons: coupons }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty < 1) { removeFromCart(productId); return; }
    setCartItems(prev =>
      prev.map(i => i.product.id === productId ? { ...i, quantity: qty } : i)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setClippedDeals([]);
    setActiveRoute([]);
    setNavStepIndex(0);
  };

  const cartTotal = cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const cartSavings = cartItems.reduce((sum, i) => {
    return sum + (i.appliedCoupons || []).reduce((s, c) => {
      if (c.discountType === "dollar") return s + c.discount;
      if (c.discountType === "percent") return s + i.product.price * i.quantity * (c.discount / 100);
      return s;
    }, 0);
  }, 0);
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const generateRoute = () => {
    const aisles = [...new Set(cartItems.map(i => i.product.aisle))];
    const order = ["P", "B", 1, 2, 3, 4, 5, 6, 7, 8, "D", "F"];
    const sorted = aisles.sort((a, b) => order.indexOf(a) - order.indexOf(b));
    setActiveRoute(sorted);
    setNavStepIndex(0);
    return sorted;
  };

  const clipDeal = (deal) => {
    setClippedDeals(prev => {
      if (prev.find(d => d.id === deal.id)) return prev;
      return [...prev, deal];
    });
  };

  const unclipDeal = (dealId) => {
    setClippedDeals(prev => prev.filter(d => d.id !== dealId));
  };

  const isDealClipped = (dealId) => clippedDeals.some(d => d.id === dealId);

  const nextAisle = () => setNavStepIndex(prev => prev + 1);

  const totalDealSavings = clippedDeals.reduce((sum, d) => sum + (d.savings || 0), 0);

  return (
    <CartContext.Provider value={{
      cartItems, addToCart, removeFromCart, updateQuantity, clearCart,
      cartTotal, cartSavings, cartCount,
      shoppingList, setShoppingList,
      activeRoute, generateRoute,
      clippedDeals, clipDeal, unclipDeal, isDealClipped, totalDealSavings,
      navStepIndex, nextAisle,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
