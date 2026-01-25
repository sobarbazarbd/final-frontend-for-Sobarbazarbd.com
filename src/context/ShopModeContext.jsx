"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const ShopModeContext = createContext({
  shopMode: "retail",
  setShopMode: () => {},
  isWholesale: false,
  isRetail: true,
});

export const ShopModeProvider = ({ children }) => {
  const [shopMode, setShopModeState] = useState("retail");

  useEffect(() => {
    // Get shop mode from localStorage on mount
    const savedMode = localStorage.getItem("sobarbazar_shop_type");
    if (savedMode) {
      setShopModeState(savedMode);
    }

    // Also check URL params
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get("mode");
    if (modeParam === "wholesale" || modeParam === "retail") {
      setShopModeState(modeParam);
      localStorage.setItem("sobarbazar_shop_type", modeParam);
    }
  }, []);

  const setShopMode = (mode) => {
    setShopModeState(mode);
    localStorage.setItem("sobarbazar_shop_type", mode);
    sessionStorage.setItem("sobarbazar_shop_type", mode);
  };

  const value = {
    shopMode,
    setShopMode,
    isWholesale: shopMode === "wholesale",
    isRetail: shopMode === "retail",
  };

  return (
    <ShopModeContext.Provider value={value}>
      {children}
    </ShopModeContext.Provider>
  );
};

export const useShopMode = () => {
  const context = useContext(ShopModeContext);
  if (!context) {
    throw new Error("useShopMode must be used within a ShopModeProvider");
  }
  return context;
};

export default ShopModeContext;
