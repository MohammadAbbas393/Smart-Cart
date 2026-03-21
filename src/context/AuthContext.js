import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sc_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [selectedStore, setSelectedStore] = useState(() => {
    const saved = localStorage.getItem("sc_selected_store");
    return saved ? JSON.parse(saved) : null;
  });

  const signIn = (userData) => {
    localStorage.setItem("sc_user", JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = () => {
    localStorage.removeItem("sc_user");
    localStorage.removeItem("sc_selected_store");
    setUser(null);
    setSelectedStore(null);
  };

  const selectStore = (store) => {
    localStorage.setItem("sc_selected_store", JSON.stringify(store));
    setSelectedStore(store);
  };

  return (
    <AuthContext.Provider value={{ user, selectedStore, signIn, signOut, selectStore }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
