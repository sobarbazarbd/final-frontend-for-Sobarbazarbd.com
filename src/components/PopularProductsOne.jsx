"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// Helper to get countdown for a given end date or fallback to start_date + 24h
function getCountdownTo(startDate, endDate) {
  let end;
  if (endDate) {
    end = new Date(endDate);
  } else if (startDate) {
    end = new Date(new Date(startDate).getTime() + 24 * 60 * 60 * 1000);
  } else {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  const now = new Date();
  let diff = Math.max(0, end - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);
  return { days, hours, minutes, seconds };
}

const PopularProductsOne = ({ section, categories = [] }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const featuredOffer = section?.banner_items?.[0];

  // Countdown logic
  useEffect(() => {
    if (!featuredOffer) return;

    function updateCountdown() {
      setTimeLeft(getCountdownTo(featuredOffer.start_date, featuredOffer.end_date));
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [featuredOffer]);

  // Limit categories & subcategories
  const limitedCategories = categories.slice(0, 8).map((cat) => ({
    ...cat,
    subcategories: (cat.subcategories || []).slice(0, 4),
  }));

  return (
    <section className="popular-products pt-80">
      <div className="container container-lg">
        <div className="border border-gray-100 p-24 rounded-16">
          {/* Section Heading */}
          <div className="section-heading mb-24">
            <div className="flex-between flex-wrap gap-8">
              <h5 className="mb-0">Popular Categories</h5>
              <div className="flex-align gap-16">
                <Link
                  href="/shop"
                  className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>

          {/* Featured Offer */}
          <div className="popular-products-box rounded-16 overflow-hidden flex-between position-relative z-1 mb-24">
            <img
              src={featuredOffer?.image || "/assets/images/bg/expensive-offer-bg.png"}
              alt={featuredOffer?.title || ""}
              className="position-absolute inset-block-start-0 w-100 h-100 z-n1"
            />
            <div className="d-lg-block d-none ps-32">
              <img src="/assets/images/thumbs/expensive-offer1.png" alt="" />
            </div>
            <div className="popular-products-box__content px-sm-4 d-block w-100 text-center py-20">
              <div className="flex-align gap-16 justify-content-center">
                <h6 className="mb-0">{featuredOffer?.title || "Exclusive Offer"}</h6>
              </div>
              {featuredOffer?.end_date && (
                <div className="countdown mt-4">
                  <ul className="countdown-list style-four flex-center flex-wrap">
                    {["days", "hours", "minutes", "seconds"].map((unit) => (
                      <li
                        key={unit}
                        className="countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-neutral-600 w-56 h-56"
                      >
                        {timeLeft[unit]} <br />
                        {unit.charAt(0).toUpperCase() + unit.slice(1, -1)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <Link
                href={featuredOffer?.link_url || "/shop"}
                target={featuredOffer?.link_target || "_self"}
                className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24"
              >
                {featuredOffer?.button_text || "Shop Now"}
                <span className="icon text-xl d-flex">
                  <i className="ph ph-arrow-right" />
                </span>
              </Link>
            </div>
            <div className="d-lg-block d-none">
              <img src="/assets/images/thumbs/expensive-offer2.png" alt="" />
            </div>
          </div>

          {/* Dynamic Category Grid */}
          <div className="row gy-4">
            {limitedCategories.map((category) => (
              <div key={category.id} className="col-xxl-3 col-xl-4 col-sm-6 col-xs-6">
                <div className="product-card h-100 d-flex gap-16 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                  <div className="product-card__thumb flex-center h-unset rounded-8 bg-gray-50 position-relative w-unset flex-shrink-0 p-24">
                    <img
                      src={category.image || "/assets/images/thumbs/brand-three-img9.png"}
                      alt={category.name}
                      className="w-auto max-w-unset h-64 object-contain"
                    />
                  </div>
                  <div className="product-card__content flex-grow-1">
                    <h6 className="title text-lg fw-semibold mb-12">
                      <Link href={`/shop?category=${category.id}`} className="link text-line-2">
                        {category.name}
                      </Link>
                    </h6>

                    {/* Subcategories */}
                    <ul className="text-gray-600 text-sm mb-4">
                      {category.subcategories.map((sub) => (
                        <li key={sub.id} className="mb-3">
                          <Link href={`/shop?supplier_product__subcategories=${sub.id}`} className="hover-text-main-600">
                     <span className=" text-gray-600">  {sub.name}</span>     
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Link href={`/shop?category=${category.id}`} className="text-tertiary-600 flex-align gap-8 mt-24">
                      View All <i className="ph ph-arrow-right d-flex" />
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