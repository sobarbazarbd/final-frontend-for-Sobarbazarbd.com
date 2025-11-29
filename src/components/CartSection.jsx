"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";

const CartSection = () => {
  const { cartItems, loading, updateQuantity, removeFromCart, refreshCart } = useCart();

  useEffect(() => {
    refreshCart();
  }, []);

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

  const shipping = 60; // Fixed shipping cost
  const total = subtotal + shipping;

  if (loading && cartItems.length === 0) {
    return (
      <section className="cart py-80">
        <div className="container container-lg">
          <div className="text-center">
            <div className="spinner-border text-main-600" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (cartItems.length === 0) {
    return (
      <section className="cart py-80">
        <div className="container container-lg">
          <div className="text-center">
            <i className="ph ph-shopping-cart text-64 text-gray-400 mb-16"></i>
            <h4 className="mb-16">Your cart is empty</h4>
            <Link href="/shop" className="btn btn-main rounded-pill py-16 px-32">
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="cart py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9 col-lg-8">
            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
              {/* Show discount savings if any */}
              {totalDiscount > 0 && (
                <div className="alert alert-success mb-24" role="alert">
                  <i className="ph ph-seal-check me-2"></i>
                  You are saving ৳{totalDiscount.toFixed(2)} on this order!
                </div>
              )}
              
              <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                <table className="table style-three">
                  <thead>
                    <tr>
                      <th className="h6 mb-0 text-lg fw-bold">Delete</th>
                      <th className="h6 mb-0 text-lg fw-bold">Product Name</th>
                      <th className="h6 mb-0 text-lg fw-bold">Price</th>
                      <th className="h6 mb-0 text-lg fw-bold">Quantity</th>
                      <th className="h6 mb-0 text-lg fw-bold">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <button
                            onClick={() => handleRemove(item.id)}
                            type="button"
                            className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                            disabled={loading}
                          >
                            <i className="ph ph-x-circle text-2xl d-flex" />
                            Remove
                          </button>
                        </td>
                        <td>
                          <div className="table-product d-flex align-items-center gap-24">
                            <Link
                              href={`/product/${item.product?.slug || ""}`}
                              className="table-product__thumb border border-gray-100 rounded-8 flex-center "
                            >
                              <img
                                src={item.variant?.images?.[0]?.image || "/assets/images/thumbs/product-img1.png"}
                                alt={item.product?.name || "Product"}
                              />
                            </Link>
                            <div className="table-product__content text-start">
                              <h6 className="title text-lg fw-semibold mb-8">
                                <Link
                                  href={`/product/${item.product?.slug || ""}`}
                                  className="link text-line-2"
                                  tabIndex={0}
                                >
                                  {item.product?.name}
                                </Link>
                              </h6>
                              <div className="flex-align gap-16 mb-16">
                                <span className="text-gray-900">
                                  Variant: {item.variant?.name}
                                </span>
                              </div>
                              <div className="flex-align gap-16">
                                <Link
                                  href="#"
                                  className="product-card__wishlist py-6 px-16 bg-main-50 text-main-600 hover-bg-main-600 hover-text-white rounded-8 flex-center gap-8 fw-medium text-sm"
                                  tabIndex={0}
                                >
                                  Save For Later
                                  <i className="ph ph-bookmark-simple" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="text-lg h6 mb-0 fw-semibold">
                              ৳{item.variant?.final_price || 0}
                            </span>
                            {item.variant?.discount && (
                              <>
                                <span className="text-sm text-gray-400 text-decoration-line-through">
                                  ৳{item.variant.price}
                                </span>
                                <span className="text-xs text-success-600">
                                  {item.variant.discount.is_percentage 
                                    ? `${item.variant.discount.value}% OFF`
                                    : `৳${item.variant.discount.value} OFF`
                                  }
                                </span>
                              </>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex rounded-4 overflow-hidden">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              type="button"
                              className="quantity__minus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white"
                              disabled={loading || item.quantity <= 1}
                            >
                              <i className="ph ph-minus" />
                            </button>
                            <input
                              type="number"
                              className="quantity__input flex-grow-1 border border-gray-100 border-start-0 border-end-0 text-center w-32 px-16"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              type="button"
                              className="quantity__plus border border-end border-gray-100 flex-shrink-0 h-48 w-48 text-neutral-600 flex-center hover-bg-main-600 hover-text-white"
                              disabled={loading || item.quantity >= (item.variant?.available_stock || 0)}
                            >
                              <i className="ph ph-plus" />
                            </button>
                          </div>
                        </td>
                        <td>
                          <div className="d-flex flex-column">
                            <span className="text-lg h6 mb-0 fw-semibold">
                              ৳{item.discounted_price?.toFixed(2) || 0}
                            </span>
                            {item.total_price !== item.discounted_price && (
                              <span className="text-sm text-gray-400 text-decoration-line-through">
                                ৳{item.total_price?.toFixed(2) || 0}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex-between flex-wrap gap-16 mt-16">
                <div className="flex-align gap-16">
                  <input
                    type="text"
                    className="common-input"
                    placeholder="Coupon Code"
                  />
                  <button type="submit" className="btn btn-main py-18 w-100 rounded-8">
                    Apply Coupon
                  </button>
                </div>
                <Link
                  href="/shop"
                  className="btn btn-outline-main rounded-8 py-16 px-32"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4">
            <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
              <h6 className="text-xl mb-32">Cart Totals</h6>
              <div className="bg-color-three rounded-8 p-24">
                <div className="mb-32 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">Subtotal</span>
                  <span className="text-gray-900 fw-semibold">৳{subtotal.toFixed(2)}</span>
                </div>
                {totalDiscount > 0 && (
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-success-600 font-heading-two">Discount</span>
                    <span className="text-success-600 fw-semibold">-৳{totalDiscount.toFixed(2)}</span>
                  </div>
                )}
                <div className="mb-32 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">Shipping</span>
                  <span className="text-gray-900 fw-semibold">৳{shipping.toFixed(2)}</span>
                </div>
                <div className="mb-0 flex-between gap-8">
                  <span className="text-gray-900 font-heading-two">Total</span>
                  <span className="text-gray-900 fw-semibold">৳{total.toFixed(2)}</span>
                </div>
              </div>
              <Link
                href="/checkout"
                className="btn btn-main mt-40 py-18 w-100 rounded-8"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
