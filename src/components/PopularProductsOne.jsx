"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const PopularProductsOne = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Load product data from JSON
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/data/products.json");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Countdown
  useEffect(() => {
    const loadCountdown = async () => {
      const { getCountdown } = await import("../helper/Countdown");
      setTimeLeft(getCountdown());
    };
    loadCountdown();
    const interval = setInterval(() => loadCountdown(), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="popular-products pt-80">
      <div className="container container-lg">
        <div className="border border-gray-100 p-24 rounded-16">
          {/* Section Heading */}
          <div className="section-heading mb-24">
            <div className="flex-between flex-wrap gap-8">
              <h5 className="mb-0">Popular Products</h5>
              <div className="flex-align gap-16">
                <Link
                  href="/shop"
                  className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                >
                  View All Products
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Offer */}
          <div className="popular-products-box rounded-16 overflow-hidden flex-between position-relative z-1 mb-24">
            <img
              src="assets/images/bg/expensive-offer-bg.png"
              alt=""
              className="position-absolute inset-block-start-0 w-100 h-100 z-n1"
            />
            <div className="d-lg-block d-none ps-32">
              <img src="assets/images/thumbs/expensive-offer1.png" alt="" />
            </div>
            <div className="popular-products-box__content px-sm-4 d-block w-100 text-center py-20">
              <div className="flex-align gap-16 justify-content-center">
                <h6 className="mb-0">Exclusive Offer</h6>
                <h4 className="mb-0">45% OFF</h4>
              </div>
              <div className="countdown mt-4" id="countdown10">
                <ul className="countdown-list style-four flex-center flex-wrap">
                  {["days", "hours", "minutes", "seconds"].map((unit) => (
                    <li
                      key={unit}
                      className="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-neutral-600 w-56 h-56"
                    >
                      <span className={unit} />
                      {timeLeft[unit]} <br />
                      {unit.charAt(0).toUpperCase() + unit.slice(1, -1)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="d-lg-block d-none">
              <img src="assets/images/thumbs/expensive-offer2.png" alt="" />
            </div>
          </div>

          {/* Products Grid */}
          <div className="row gy-4">
            {products.length > 0 &&
              products.map((product) => (
                <div key={product.id} className="col-xxl-3 col-xl-4 col-sm-6 col-xs-6">
                  <div className="product-card h-100 d-flex gap-16 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                    <Link
                      href="/product-details"
                      className="product-card__thumb flex-center h-unset rounded-8 bg-gray-50 position-relative w-unset flex-shrink-0 p-24"
                      tabIndex={0}
                    >
                      <img src={product.img} alt={product.name} className="w-auto max-w-unset" />
                    </Link>
                    <div className="product-card__content flex-grow-1">
                      <h6 className="title text-lg fw-semibold mb-12">
                        <Link href="/product-details" className="link text-line-2" tabIndex={0}>
                          {product.name}
                        </Link>
                      </h6>
                      {product.categories.map((cat, idx) => (
                        <span key={idx} className="text-gray-600 text-sm mb-4">
                          {cat}
                        </span>
                      ))}
                      <Link href="/shop" className="text-tertiary-600 flex-align gap-8 mt-24">
                        All Categories <i className="ph ph-arrow-right d-flex" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularProductsOne;
