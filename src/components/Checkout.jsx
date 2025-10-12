"use client";

import React, { useState } from "react";
import Link from "next/link";

const Checkout = () => {
  const [selectedPayment, setSelectedPayment] = useState("payment1");

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.id);
  };

  return (
    <section className="checkout py-80">
      <div className="container container-lg">
        {/* Coupon Section */}
        <div className="border border-gray-100 rounded-8 px-30 py-20 mb-40">
          <span>
            Have a coupon?{" "}
            <Link
              href="/cart"
              className="fw-semibold text-gray-900 hover-text-decoration-underline hover-text-main-600"
            >
              Click here to enter your code
            </Link>
          </span>
        </div>

        <div className="row">
          {/* Left Side - Billing Details */}
          <div className="col-xl-9 col-lg-8">
            <form action="#" className="pe-xl-5">
              <div className="row gy-3">
                {[
                  "First Name",
                  "Last Name",
                  "Business Name",
                  "Country",
                  "House number and street name",
                  "Apartment, suite, unit, etc. (Optional)",
                  "City",
                  "State/Province",
                  "Post Code",
                  "Phone",
                  "Email Address",
                ].map((placeholder, index) => (
                  <div
                    key={index}
                    className={`${
                      index < 2 ? "col-sm-6 col-xs-6" : "col-12"
                    }`}
                  >
                    <input
                      type={
                        placeholder === "Email Address"
                          ? "email"
                          : placeholder === "Phone"
                          ? "number"
                          : "text"
                      }
                      className="common-input border-gray-100"
                      placeholder={placeholder}
                    />
                  </div>
                ))}

                <div className="col-12">
                  <div className="my-40">
                    <h6 className="text-lg mb-24">Additional Information</h6>
                    <textarea
                      className="common-input border-gray-100"
                      placeholder="Notes about your order, e.g. special notes for delivery."
                      rows={3}
                    ></textarea>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side - Order Summary */}
          <div className="col-xl-3 col-lg-4">
            <div className="checkout-sidebar">
              {/* Order Header */}
              <div className="bg-color-three rounded-8 p-24 text-center">
                <span className="text-gray-900 text-xl fw-semibold">
                  Your Orders
                </span>
              </div>

              {/* Product Summary */}
              <div className="border border-gray-100 rounded-8 px-24 py-40 mt-24">
                <div className="mb-32 pb-32 border-bottom border-gray-100 flex-between gap-8">
                  <span className="text-gray-900 fw-medium text-xl font-heading-two">
                    Product
                  </span>
                  <span className="text-gray-900 fw-medium text-xl font-heading-two">
                    Subtotal
                  </span>
                </div>

                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex-between gap-24 mb-32 border-bottom border-gray-100 pb-16"
                  >
                    <div className="flex-align gap-12">
                      <span className="text-gray-900 fw-normal text-md font-heading-two w-144">
                        HP Chromebook With Intel Celeron
                      </span>
                      <span className="text-gray-900 fw-normal text-md font-heading-two">
                        <i className="ph-bold ph-x" />
                      </span>
                      <span className="text-gray-900 fw-semibold text-md font-heading-two">
                        1
                      </span>
                    </div>
                    <span className="text-gray-900 fw-bold text-md font-heading-two">
                      Tk 250.00
                    </span>
                  </div>
                ))}

                <div className="border-top border-gray-100 pt-30 mt-30">
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">
                      Subtotal
                    </span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">
                      Tk 750.00
                    </span>
                  </div>
                  <div className="flex-between gap-8">
                    <span className="text-gray-900 font-heading-two text-xl fw-semibold">
                      Total
                    </span>
                    <span className="text-gray-900 font-heading-two text-md fw-bold">
                      Tk 750.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Options */}
              <div className="mt-32">
                {[
                  
                  { id: "payment1", name: "Cash on Delivery" },
                  { id: "payment2", name: "Bkash" },
                  { id: "payment3", name: "Nagad" },
                ].map((method) => (
                  <div key={method.id} className="payment-item mb-12">
                    <div className="form-check common-check common-radio py-16 mb-0">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="payment"
                        id={method.id}
                        checked={selectedPayment === method.id}
                        onChange={handlePaymentChange}
                      />
                      <label
                        className="form-check-label fw-semibold text-neutral-600 flex-align gap-8"
                        htmlFor={method.id}
                      >
                        {/* এখানে তুমি পরে logo বসাতে পারো */}
                        {method.name}
                      </label>
                    </div>

                    {selectedPayment === method.id && (
                      <div className="payment-item__content px-16 py-24 rounded-8 bg-main-50 position-relative d-block">
                        <p className="text-gray-800">
                          {method.id === "payment4" || method.id === "payment5"
                            ? "You can pay easily using your preferred mobile wallet."
                            : "Make your payment directly into our bank account. Please use your Order ID as the payment reference."}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Privacy Policy */}
              <div className="mt-32 pt-32 border-top border-gray-100">
                <p className="text-gray-500">
                  Your personal data will be used to process your order, support
                  your experience throughout this website, and for other
                  purposes described in our{" "}
                  <Link
                    href="#"
                    className="text-main-600 text-decoration-underline"
                  >
                    privacy policy
                  </Link>
                  .
                </p>
              </div>

              {/* Place Order Button */}
              <Link
                href="/checkout"
                className="btn btn-main mt-40 py-18 w-100 rounded-8"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
