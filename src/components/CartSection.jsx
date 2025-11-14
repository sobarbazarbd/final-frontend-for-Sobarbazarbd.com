"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Toaster, toast } from "react-hot-toast";

// QuantityControl component
const QuantityControl = ({ initialQuantity = 1, onChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const decrement = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };

  const handleInputChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
    onChange(value);
  };

  return (
    <div className="quantity-control flex-align gap-8">
      <button type="button" onClick={decrement} className="btn btn-sm bg-gray-200 rounded">
        -
      </button>
      <input
        type="number"
        value={quantity}
        min="1"
        className="text-center w-16 border rounded"
        onChange={handleInputChange}
      />
      <button type="button" onClick={increment} className="btn btn-sm bg-gray-200 rounded">
        +
      </button>
    </div>
  );
};

// CartSection component
const CartSection = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Taylor Farms Broccoli Florets Vegetables",
      price: 125,
      img: "/assets/images/thumbs/product-two-img1.png",
      rating: 4.8,
      reviews: 128,
      tags: ["Camera", "Videos"],
      quantity: 1,
    },
    {
      id: 2,
      name: "Fresh Organic Lettuce Greens",
      price: 200,
      img: "/assets/images/thumbs/product-two-img2.png",
      rating: 4.5,
      reviews: 90,
      tags: ["Camera", "Videos"],
      quantity: 1,
    },
    {
      id: 3,
      name: "Green Bell Pepper Pack",
      price: 150,
      img: "/assets/images/thumbs/product-two-img3.png",
      rating: 4.7,
      reviews: 75,
      tags: ["Camera", "Videos"],
      quantity: 1,
    },
  ]);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Item removed from cart ✅");
  };

  const handleQuantityChange = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );
  const tax = useMemo(() => subtotal * 0.05, [subtotal]); // 5% tax
  const total = useMemo(() => subtotal + tax - discount, [subtotal, tax, discount]);

  const handleApplyCoupon = () => {
    if (coupon.trim().toLowerCase() === "moon10") {
      const discountValue = subtotal * 0.1;
      setDiscount(discountValue);
      toast.success(`Coupon applied! You got 10% off (-Tk ${discountValue.toFixed(2)}) 🎉`);
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code!");
    }
  };

  const handleUpdateCart = () => {
    toast.success("Cart updated ✅");
  };

  return (
    <section className="cart py-80">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="container container-lg">
        <div className="row gy-4">
          {/* Cart Items */}
          <div className="col-xl-9 col-lg-8">
            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
              <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                <table className="table style-three">
                  <thead>
                    <tr>
                      <th>Delete</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <button
                              type="button"
                              onClick={() => handleRemove(item.id)}
                              className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                            >
                              <i className="ph ph-x-circle text-2xl d-flex" />
                              Remove
                            </button>
                          </td>
                          <td>
                            <div className="table-product d-flex align-items-center gap-24">
                              <Link
                                href={`/product-details/${item.id}`}
                                className="table-product__thumb border border-gray-100 rounded-8 flex-center"
                              >
                                <img src={item.img} alt={item.name} />
                              </Link>
                              <div className="table-product__content text-start">
                                <h6 className="title text-lg fw-semibold mb-8">
                                  <Link
                                    href={`/product-details/${item.id}`}
                                    className="link text-line-2"
                                  >
                                    {item.name}
                                  </Link>
                                </h6>
                                <div className="flex-align gap-16 mb-16">
                                  <div className="flex-align gap-6">
                                    <span className="text-md fw-medium text-warning-600 d-flex">
                                      <i className="ph-fill ph-star" />
                                    </span>
                                    <span className="text-md fw-semibold text-gray-900">{item.rating}</span>
                                  </div>
                                  <span className="text-sm fw-medium text-gray-200">|</span>
                                  <span className="text-neutral-600 text-sm">{item.reviews} Reviews</span>
                                </div>
                                <div className="flex-align gap-16">
                                  {item.tags.map((tag, i) => (
                                    <span
                                      key={i}
                                      className="product-card__cart btn bg-gray-50 text-heading text-sm hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center gap-8 fw-medium"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="text-lg fw-semibold">Tk {item.price.toFixed(2)}</span>
                          </td>
                          <td>
                            <QuantityControl
                              initialQuantity={item.quantity}
                              onChange={(newQuantity) => handleQuantityChange(item.id, newQuantity)}
                            />
                          </td>
                          <td>
                            <span className="text-lg fw-semibold">
                              Tk {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center py-5">
                          🛒 Your cart is empty.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex-between flex-wrap gap-16 mt-16">
                <div className="flex-align gap-16">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="common-input"
                    placeholder="Coupon Code"
                  />
                  <button type="button" onClick={handleApplyCoupon} className="btn btn-main py-18 w-100 rounded-8">
                    Apply Coupon
                  </button>
                </div>
                <button type="button" onClick={handleUpdateCart} className="text-lg text-gray-500 hover-text-main-600">
                  Update Cart
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="col-xl-3 col-lg-4">
            <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
              <h6 className="text-xl mb-32">Cart Totals</h6>
              <div className="bg-color-three rounded-8 p-24">
                <div className="mb-32 flex-between gap-8">
                  <span className="text-gray-900">Subtotal</span>
                  <span className="text-gray-900 fw-semibold">Tk {subtotal.toFixed(2)}</span>
                </div>
                <div className="mb-32 flex-between gap-8">
                  <span className="text-gray-900">Estimated Delivery</span>
                  <span className="text-gray-900 fw-semibold">Free</span>
                </div>
                <div className="mb-0 flex-between gap-8">
                  <span className="text-gray-900">Tax (5%)</span>
                  <span className="text-gray-900 fw-semibold">Tk {tax.toFixed(2)}</span>
                </div>
              </div>

              {discount > 0 && (
                <div className="bg-color-three rounded-8 p-24 mt-24">
                  <div className="flex-between gap-8 text-green-600">
                    <span>Discount (10%)</span>
                    <span>- Tk {discount.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div className="bg-color-three rounded-8 p-24 mt-24">
                <div className="flex-between gap-8">
                  <span className="text-gray-900 text-xl fw-semibold">Total</span>
                  <span className="text-gray-900 text-xl fw-semibold">Tk {total.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn btn-main mt-40 py-18 w-100 rounded-8">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
