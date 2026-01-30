"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.hetdcl.com";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize cart ID from localStorage
  useEffect(() => {
    const savedCartId = localStorage.getItem("cart_id");
    if (savedCartId) {
      setCartId(savedCartId);
    }
  }, []);

  // Create a new cart
  const createCart = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1.0/customers/carts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success && result.data) {
        const newCartId = result.data.id;
        setCartId(newCartId);
        localStorage.setItem("cart_id", newCartId);
        return newCartId;
      }
      throw new Error("Failed to create cart");
    } catch (err) {
      console.error("Error creating cart:", err);
      setError(err.message);
      return null;
    }
  };

  // Fetch cart items
  const fetchCartItems = async (currentCartId = cartId) => {
    if (!currentCartId) {
      setCartItems([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1.0/customers/carts/${currentCartId}/items/`
      );

      const result = await response.json();

      if (!response.ok) {
        // Check for invalid cart ID errors
        const action = result.details?.action;

        if (response.status === 404 || response.status === 400 || action === 'create_new_cart') {
          // Cart not found, invalid, or malformed UUID - clear it
          console.log("Cart not found/invalid/malformed, clearing cart ID");
          localStorage.removeItem("cart_id");
          setCartId(null);
          setCartItems([]);
          return;
        }
        throw new Error(result.message || "Failed to fetch cart items");
      }

      if (result.success && Array.isArray(result.data)) {
        setCartItems(result.data);
      } else if (Array.isArray(result.data)) {
        setCartItems(result.data);
      } else if (Array.isArray(result)) {
        setCartItems(result);
      } else {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err.message);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart (or update quantity)
  const addToCart = async (variantId, quantity = 1, retryCount = 0) => {
    setLoading(true);
    setError(null);

    try {
      let currentCartId = cartId;

      // Create cart if doesn't exist
      if (!currentCartId) {
        currentCartId = await createCart();
        if (!currentCartId) {
          throw new Error("Failed to create cart");
        }
      }

      const response = await fetch(
        `${API_BASE_URL}/api/v1.0/customers/carts/${currentCartId}/items/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            variant_id: variantId,
            quantity: quantity,
          }),
        }
      );

      const result = await response.json();

      // Handle invalid cart ID error
      if (!response.ok) {
        // Check if it's an invalid cart ID error
        const errorMessage = result.message || result.details?.[0] || result.details?.error || result.error || "";
        const action = result.details?.action;

        // Check for invalid cart ID (malformed UUID or non-existent cart)
        if ((errorMessage.includes("Invalid cart ID") ||
             errorMessage.includes("Invalid cart") ||
             action === 'create_new_cart') && retryCount < 1) {
          console.log("Invalid cart ID detected (malformed or non-existent), creating new cart and retrying...");

          // Clear old cart ID
          localStorage.removeItem("cart_id");
          setCartId(null);

          // Create new cart and retry once
          const newCartId = await createCart();
          if (newCartId) {
            setLoading(false);
            return addToCart(variantId, quantity, retryCount + 1);
          }
        }

        throw new Error(errorMessage || "Failed to add item to cart");
      }

      // Check if backend created a new cart (auto-recovery)
      if (result.new_cart_id) {
        console.log("Backend created new cart:", result.new_cart_id);
        setCartId(result.new_cart_id);
        localStorage.setItem("cart_id", result.new_cart_id);
      }

      if (result.success && Array.isArray(result.data)) {
        setCartItems(result.data);
        return { success: true, data: result.data };
      } else if (Array.isArray(result)) {
        setCartItems(result);
        return { success: true, data: result };
      }

      return { success: true };
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, newQuantity) => {
    if (!cartId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1.0/customers/carts/${cartId}/items/${itemId}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: newQuantity }),
        }
      );

      if (!response.ok) {
        // Handle invalid cart
        if (response.status === 404 || response.status === 400) {
          console.log("Cart invalid during update, clearing cart");
          localStorage.removeItem("cart_id");
          setCartId(null);
          setCartItems([]);
          return;
        }
        throw new Error("Failed to update quantity");
      }

      await fetchCartItems();
    } catch (err) {
      console.error("Error updating quantity:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (!cartId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1.0/customers/carts/${cartId}/items/${itemId}/`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        // Handle invalid cart
        if (response.status === 404 || response.status === 400) {
          console.log("Cart invalid during remove, clearing cart");
          localStorage.removeItem("cart_id");
          setCartId(null);
          setCartItems([]);
          return;
        }
        throw new Error("Failed to remove item");
      }

      await fetchCartItems();
    } catch (err) {
      console.error("Error removing item:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    setCartId(null);
    localStorage.removeItem("cart_id");
  };

  // Refresh cart
  const refreshCart = () => {
    if (cartId) {
      fetchCartItems();
    }
  };

  // Load cart on mount
  useEffect(() => {
    if (cartId) {
      fetchCartItems();
    }
  }, [cartId]);

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  // Checkout function with guest support
  const checkout = async (cartId, paymentMethod, area, shippingAddress, guestData = null) => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("access_token");
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `JWT ${token}`;
      }

      const requestBody = {
        cart_id: cartId,
        payment_method: paymentMethod,
        area: area,
      };

      // For authenticated users, only send shipping address
      if (token) {
        requestBody.shipping_address = shippingAddress;
      } else if (guestData) {
        // For guest checkout, send all required fields
        requestBody.name = guestData.name;
        requestBody.email = guestData.email;
        requestBody.phone = guestData.phone;
        requestBody.shipping_address = shippingAddress;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/v1.0/customers/orders/`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || result.error || "Checkout failed");
      }

      // Clear cart on success
      clearCart();

      // If online payment, return gateway URL
      if (paymentMethod === "OP" && result.GatewayPageURL) {
        return {
          success: true,
          paymentGatewayUrl: result.GatewayPageURL,
        };
      }

      // For COD, return success
      return {
        success: true,
        order: result,
      };
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err.message);
      return {
        success: false,
        error: err.message,
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartId,
        cartCount,
        loading,
        error,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        refreshCart,
        fetchCartItems,
        checkout, // Add checkout function
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
