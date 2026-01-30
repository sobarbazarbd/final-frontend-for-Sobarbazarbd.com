"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

const Checkout = () => {
  const router = useRouter();
  const { cartItems, cartId, checkout, loading } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  // Simplified form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [selectedPayment, setSelectedPayment] = useState("COD");
  const [selectedArea, setSelectedArea] = useState("IN");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      // Fetch user data if needed
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.hetdcl.com";
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${API_BASE_URL}/auth/users/me/`, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        // Pre-fill form if user has data
        if (data.customer) {
          setFormData({
            name: data.customer.name || "",
            email: data.customer.email || "",
            phone: data.customer.phone || "",
            address: data.customer.shipping_address || "",
            notes: "",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.discounted_price || 0);
  }, 0);

  const totalDiscount = cartItems.reduce((sum, item) => {
    const originalPrice = (item.variant?.price || 0) * item.quantity;
    const discountedPrice = item.discounted_price || 0;
    return sum + (originalPrice - discountedPrice);
  }, 0);

  const shippingCharge = selectedArea === "IN" ? 60 : 120;
  const total = subtotal + shippingCharge;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.id);
  };

  const handleAreaChange = (e) => {
    setSelectedArea(e.target.value);
  };

  const validateForm = () => {
    // For authenticated users, only validate shipping address
    if (isAuthenticated) {
      if (!formData.address || !formData.address.trim()) {
        toast.error("Please provide a shipping address");
        return false;
      }
      return true;
    }

    // For guest checkout, validate all fields
    const required = ["name", "email", "phone", "address"];

    for (const field of required) {
      if (!formData[field]) {
        toast.error(
          `Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`,
        );
        return false;
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Phone validation (Bangladesh format)
    const phoneRegex = /^01[3-9]\d{8}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Please enter a valid Bangladesh phone number");
      return false;
    }

    return true;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!cartId || cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const paymentMethodMap = {
        COD: "COD",
        payment2: "OP",
        payment3: "OP",
      };

      const paymentMethod = paymentMethodMap[selectedPayment] || "COD";

      // Only pass guest data for unauthenticated users
      let customerData = null;
      if (!isAuthenticated) {
        customerData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        };
      }

      const result = await checkout(
        cartId,
        paymentMethod,
        selectedArea,
        formData.address, // shipping address
        customerData, // null for authenticated, guest data for unauthenticated
      );

      if (result.success) {
        if (result?.order?.data?.GatewayPageURL) {
          toast.success("Redirecting to payment gateway...");
          window.location.href = result?.order?.data?.GatewayPageURL;
        } else {
          toast.success("Order placed successfully!");
          router.push("/order-success");
        }
      } else {
        toast.error(result.error || "Checkout failed. Please try again.");
        setTimeout(() => {
          router.push("/order-failed");
        }, 1500);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("An error occurred during checkout");
    } finally {
      setIsSubmitting(false);
    }
  };

  // useEffect(() => {
  //   if (!loading && cartItems.length === 0) {
  //     router.push("/cart");
  //   }
  // }, [cartItems, loading, router]);

  if (loading || cartItems.length === 0) {
    return (
      <section className="checkout py-80">
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

  return (
    <section className="checkout py-80">
      <div className="container container-lg">
        {/* Auth Status Banner */}
        {!isAuthenticated && (
          <div className="alert alert-info mb-32">
            <i className="ph ph-info me-2"></i>
            You are checking out as a guest.
            <Link
              href="/login"
              className="fw-semibold ms-2 text-decoration-underline"
            >
              Login
            </Link>
            to save your details for faster checkout next time.
          </div>
        )}

        <form onSubmit={handleCheckout}>
          <div className="row">
            {/* Left Side - Billing Details */}
            <div className="col-xl-9 col-lg-8">
              <div className="pe-xl-5">
                <h5 className="mb-32">
                  {isAuthenticated ? "Shipping Information" : "Your Details"}
                </h5>

                {/* Show user info banner for authenticated users */}
                {isAuthenticated && userData?.customer && (
                  <div className="alert alert-success mb-24">
                    <div className="d-flex align-items-start gap-12">
                      <i className="ph ph-check-circle text-success-600 text-xl mt-4"></i>
                      <div>
                        <div className="fw-semibold mb-8">Ordering as:</div>
                        <div className="text-sm">
                          <div>
                            <span className="fw-medium">Name:</span>{" "}
                            {userData.customer.name}
                          </div>
                          <div>
                            <span className="fw-medium">Phone:</span>{" "}
                            {userData.customer.phone}
                          </div>
                          {userData.customer.email && (
                            <div>
                              <span className="fw-medium">Email:</span>{" "}
                              {userData.customer.email}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="row gy-3">
                  {/* Guest checkout fields */}
                  {!isAuthenticated && (
                    <>
                      <div className="col-12">
                        <label className="text-gray-900 fw-medium mb-8">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          className="common-input border-gray-100"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="text-gray-900 fw-medium mb-8">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="common-input border-gray-100"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="col-12">
                        <label className="text-gray-900 fw-medium mb-8">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="common-input border-gray-100"
                          placeholder="01XXXXXXXXX"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                        <small className="text-gray-500">
                          Format: 01XXXXXXXXX
                        </small>
                      </div>
                    </>
                  )}

                  <div className="col-12">
                    <label className="text-gray-900 fw-medium mb-8">
                      Shipping Address *
                    </label>
                    <textarea
                      name="address"
                      className="common-input border-gray-100"
                      placeholder="House/Flat no, Street, Area, City, Post Code"
                      rows={3}
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  <div className="col-12">
                    <label className="text-gray-900 fw-semibold mb-8">
                      Delivery Area *
                    </label>
                    <select
                      value={selectedArea}
                      onChange={handleAreaChange}
                      className="common-input border-gray-100"
                      required
                    >
                      <option value="IN">Inside Dhaka (৳60)</option>
                      <option value="OUT">Outside Dhaka (৳120)</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="text-gray-900 fw-medium mb-8">
                      Order Notes (Optional)
                    </label>
                    <textarea
                      name="notes"
                      className="common-input border-gray-100"
                      placeholder="Special instructions for delivery..."
                      rows={2}
                      value={formData.notes}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="col-xl-3 col-lg-4">
              <div className="checkout-sidebar">
                <div className="bg-color-three rounded-8 p-24 text-center">
                  <span className="text-gray-900 text-xl fw-semibold">
                    Your Order
                  </span>
                </div>

                <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
                  <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
                    <span className="text-gray-900 fw-medium text-xl font-heading-two">
                      Product
                    </span>
                    <span className="text-gray-900 fw-medium text-xl font-heading-two">
                      Subtotal
                    </span>
                  </div>

                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex-between gap-24 mb-32 border-bottom border-gray-100 pb-16"
                    >
                      <div className="flex-align gap-12">
                        <span className="text-gray-900 fw-normal text-sm font-heading-two w-120">
                          {item.variant?.name || "Product"}
                        </span>
                        <span className="text-gray-900 fw-normal text-md font-heading-two">
                          <i className="ph-bold ph-x" />
                        </span>
                        <span className="text-gray-900 fw-semibold text-md font-heading-two">
                          {item.quantity}
                        </span>
                      </div>
                      <span className="text-gray-900 fw-bold text-md font-heading-two">
                        ৳{item.discounted_price?.toFixed(2)}
                      </span>
                    </div>
                  ))}

                  <div className="border-top border-gray-100 pt-30 mt-30">
                    <div className="mb-32 flex-between gap-8">
                      <span className="text-gray-900 font-heading-two text-xl fw-semibold">
                        Subtotal
                      </span>
                      <span className="text-gray-900 font-heading-two text-md fw-bold">
                        ৳{subtotal.toFixed(2)}
                      </span>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="mb-32 flex-between gap-8">
                        <span className="text-success-600 font-heading-two text-xl fw-semibold">
                          Discount
                        </span>
                        <span className="text-success-600 font-heading-two text-md fw-bold">
                          -৳{totalDiscount.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="mb-32 flex-between gap-8">
                      <span className="text-gray-900 font-heading-two text-xl fw-semibold">
                        Shipping
                      </span>
                      <span className="text-gray-900 font-heading-two text-md fw-bold">
                        ৳{shippingCharge.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex-between gap-8">
                      <span className="text-gray-900 font-heading-two text-xl fw-semibold">
                        Total
                      </span>
                      <span className="text-gray-900 font-heading-two text-md fw-bold">
                        ৳{total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="mt-32">
                  <h6 className="mb-16">Payment Method</h6>

                  <div className="payment-item mb-12">
                    <div className="form-check common-check common-radio py-16 mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="COD"
                        checked={selectedPayment === "COD"}
                        onChange={handlePaymentChange}
                      />
                      <label
                        className="form-check-label fw-semibold text-neutral-600 flex-align gap-8"
                        htmlFor="COD"
                      >
                        Cash on Delivery
                      </label>
                    </div>
                    {selectedPayment === "COD" && (
                      <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block mt-12">
                        <p className="text-gray-800 text-sm">
                          Pay with cash upon delivery.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="payment-item mb-12">
                    <div className="form-check common-check common-radio py-16 mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id="payment2"
                        checked={selectedPayment === "payment2"}
                        onChange={handlePaymentChange}
                      />
                      <label
                        className="form-check-label fw-semibold text-neutral-600 flex-align gap-8"
                        htmlFor="payment2"
                      >
                        Online Payment (Bkash/Nagad/Card)
                      </label>
                    </div>
                    {selectedPayment === "payment2" && (
                      <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block mt-12">
                        <p className="text-gray-800 text-sm">
                          Secure payment via SSLCommerz gateway.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="btn btn-main mt-40 py-18 w-100 rounded-8"
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Processing...
                    </>
                  ) : (
                    <>Place Order</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Checkout;
