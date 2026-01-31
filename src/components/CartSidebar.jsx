"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const CartSidebar = () => {
  const {
    cartItems,
    cartCount,
    loading,
    updateQuantity,
    removeFromCart,
    refreshCart,
    isSidebarOpen,
    closeSidebar,
  } = useCart();

  useEffect(() => {
    if (isSidebarOpen) {
      refreshCart();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateQuantity(itemId, newQuantity);
  };

  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
  };

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.discounted_price || 0);
  }, 0);

  const totalDiscount = cartItems.reduce((sum, item) => {
    const originalPrice = (item.variant?.price || 0) * item.quantity;
    const discountedPrice = item.discounted_price || 0;
    return sum + (originalPrice - discountedPrice);
  }, 0);

  const shipping = 60;
  const total = subtotal + shipping;

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-sidebar-overlay ${isSidebarOpen ? "active" : ""}`}
        onClick={closeSidebar}
      />

      {/* Sidebar */}
      <div className={`cart-sidebar ${isSidebarOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-sidebar__header">
          <div className="cart-sidebar__header-top">
            <div className="cart-sidebar__title">
              <i className="ph ph-shopping-cart-simple" />
              <span>Shopping Cart</span>
              <span className="cart-sidebar__badge">{cartCount}</span>
            </div>
            <button
              type="button"
              className="cart-sidebar__close"
              onClick={closeSidebar}
              aria-label="Close cart"
            >
              <i className="ph ph-x" />
            </button>
          </div>
          {totalDiscount > 0 && (
            <div className="cart-sidebar__notice">
              <i className="ph ph-truck" />
              <span>You have reduced delivery charge by saving ৳{totalDiscount.toFixed(0)}!</span>
            </div>
          )}
          {totalDiscount === 0 && cartItems.length > 0 && (
            <div className="cart-sidebar__notice">
              <i className="ph ph-package" />
              <span>Free delivery on orders above ৳500!</span>
            </div>
          )}
        </div>

        {/* Items */}
        <div className="cart-sidebar__items">
          {loading && cartItems.length === 0 ? (
            <div className="cart-sidebar__empty">
              <div className="spinner-border" style={{ color: "var(--main-600)" }} role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="cart-sidebar__empty">
              <i className="ph ph-shopping-cart-simple cart-sidebar__empty-icon" />
              <p className="cart-sidebar__empty-text">Your cart is empty</p>
              <Link
                href="/shop"
                className="cart-sidebar__btn-shop"
                onClick={closeSidebar}
              >
                Browse Products
              </Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-sidebar__item">
                <Link
                  href={`/product/${item.product?.slug || ""}`}
                  className="cart-sidebar__item-img"
                  onClick={closeSidebar}
                >
                  <img
                    src={
                      item.variant?.image ||
                      "/assets/images/thumbs/product-img1.png"
                    }
                    alt={item.product?.name || "Product"}
                  />
                </Link>
                <div className="cart-sidebar__item-details">
                  <div className="cart-sidebar__item-top">
                    <Link
                      href={`/product/${item.product?.slug || ""}`}
                      className="cart-sidebar__item-name"
                      onClick={closeSidebar}
                    >
                      {item.product?.name}
                    </Link>
                    <button
                      type="button"
                      className="cart-sidebar__item-remove"
                      onClick={() => handleRemove(item.id)}
                      disabled={loading}
                      aria-label="Remove item"
                    >
                      <i className="ph ph-trash" />
                    </button>
                  </div>
                  <span className="cart-sidebar__item-variant">
                    {item.variant?.name}
                  </span>
                  <div className="cart-sidebar__item-bottom">
                    <div className="cart-sidebar__qty">
                      <button
                        type="button"
                        className="cart-sidebar__qty-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={loading || item.quantity <= 1}
                      >
                        <i className="ph ph-minus" />
                      </button>
                      <span className="cart-sidebar__qty-value">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="cart-sidebar__qty-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        disabled={
                          loading ||
                          item.quantity >= (item.variant?.available_stock || 99)
                        }
                      >
                        <i className="ph ph-plus" />
                      </button>
                    </div>
                    <div className="cart-sidebar__item-price">
                      <span className="cart-sidebar__price-current">
                        ৳{item.discounted_price?.toFixed(0) || 0}
                      </span>
                      {item.total_price !== item.discounted_price && (
                        <span className="cart-sidebar__price-original">
                          ৳{item.total_price?.toFixed(0) || 0}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="cart-sidebar__footer">
            {/* Promo Code */}
            <div className="cart-sidebar__promo">
              <input
                type="text"
                className="cart-sidebar__promo-input"
                placeholder="Enter promo code"
              />
              <button type="button" className="cart-sidebar__promo-btn">
                Apply
              </button>
            </div>

            {/* Summary */}
            <div className="cart-sidebar__summary">
              <div className="cart-sidebar__summary-row">
                <span>Subtotal</span>
                <span>৳{subtotal.toFixed(0)}</span>
              </div>
              {totalDiscount > 0 && (
                <div className="cart-sidebar__summary-row cart-sidebar__summary-row--discount">
                  <span>Discount</span>
                  <span>-৳{totalDiscount.toFixed(0)}</span>
                </div>
              )}
              <div className="cart-sidebar__summary-row">
                <span>Delivery</span>
                <span>৳{shipping}</span>
              </div>
              <div className="cart-sidebar__summary-row cart-sidebar__summary-row--total">
                <span>Total</span>
                <span>৳{total.toFixed(0)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              className="cart-sidebar__checkout"
              onClick={closeSidebar}
            >
              Proceed to Checkout &mdash; ৳{total.toFixed(0)}
            </Link>
            <Link
              href="/cart"
              className="cart-sidebar__view-cart"
              onClick={closeSidebar}
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
