"use client";

import React from "react";
import Link from "next/link";
import Slider from "react-slick";

// Reusable Arrow Components
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-right" />
    </button>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-left" />
    </button>
  );
}

// Dummy product data (You can fetch from API instead)
const products = [
  {
    id: 1,
    image: "/assets/images/thumbs/product-img11.png",
    title: "C-500 Antioxidant Protect Dietary Supplement",
    rating: 4.8,
    reviews: "17k",
    store: "Lucky Supermarkets",
    oldPrice: 28.99,
    newPrice: 14.99,
  },
  {
    id: 2,
    image: "/assets/images/thumbs/product-img9.png",
    title: "Omega 3 Fish Oil Supplement 1000mg",
    rating: 4.9,
    reviews: "12k",
    store: "Wellness Shop",
    oldPrice: 30.5,
    newPrice: 18.75,
  },
  {
    id: 3,
    image: "/assets/images/thumbs/product-img10.png",
    title: "Vitamin D3 + K2 Bone Health Supplement",
    rating: 4.7,
    reviews: "9k",
    store: "Green Pharmacy",
    oldPrice: 24.0,
    newPrice: 12.5,
  },
  {
    id: 4,
    image: "/assets/images/thumbs/product-img11.png",
    title: "Probiotic 50 Billion CFU Daily Care",
    rating: 4.6,
    reviews: "21k",
    store: "BioHealth",
    oldPrice: 40.0,
    newPrice: 22.0,
  },
  {
    id: 5,
    image: "/assets/images/thumbs/product-img12.png",
    title: "Organic Multivitamin for Men & Women",
    rating: 4.8,
    reviews: "15k",
    store: "Nature’s Best",
    oldPrice: 35.0,
    newPrice: 20.0,
  },
  {
    id: 6,
    image: "/assets/images/thumbs/product-img11.png",
    title: "Zinc + Magnesium Energy Support",
    rating: 4.5,
    reviews: "8k",
    store: "HealthMart",
    oldPrice: 22.0,
    newPrice: 10.99,
  },
];

const NewArrivalOne = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1599, settings: { slidesToShow: 6 } },
      { breakpoint: 1399, settings: { slidesToShow: 4 } },
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 575, settings: { slidesToShow: 2 } },
      { breakpoint: 424, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="new-arrival pb-80">
      <div className="container container-lg">
        {/* Heading */}
        <div className="section-heading">
          <div className="flex-between flex-wrap gap-8">
            <h5 className="mb-0">New Arrivals</h5>
            <div className="flex-align mr-point gap-16">
              <Link
                href="/shop"
                className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >
                View All Deals
              </Link>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="new-arrival__slider arrow-style-two">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id}>
                <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                  {/* Product Image */}
                  <Link
                    href={`/product-details/${product.id}`}
                    className="product-card__thumb flex-center"
                  >
                    <img src={product.image} alt={product.title} />
                  </Link>

                  {/* Product Content */}
                  <div className="product-card__content mt-12">
                    {/* Rating */}
                    <div className="flex-align gap-6">
                      <span className="text-xs fw-bold text-gray-500">
                        {product.rating}
                      </span>
                      <span className="text-15 fw-bold text-warning-600 d-flex">
                        <i className="ph-fill ph-star" />
                      </span>
                      <span className="text-xs fw-bold text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Title */}
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      <Link
                        href={`/product-details/${product.id}`}
                        className="link text-line-2"
                      >
                        {product.title}
                      </Link>
                    </h6>

                    {/* Store */}
                    <div className="flex-align gap-4">
                      <span className="text-main-600 text-md d-flex">
                        <i className="ph-fill ph-storefront" />
                      </span>
                      <span className="text-gray-500 text-xs">
                        By {product.store}
                      </span>
                    </div>

                    {/* Price & Cart */}
                    <div className="flex-between gap-8 mt-24 flex-wrap">
                      <div className="product-card__price">
                        <span className="text-gray-400 text-md fw-semibold text-decoration-line-through d-block">
                          ${product.oldPrice}
                        </span>
                        <span className="text-heading text-md fw-semibold">
                          ${product.newPrice}{" "}
                          <span className="text-gray-500 fw-normal">/Qty</span>
                        </span>
                      </div>
                      <Link
                        href="/cart"
                        className="product-card__cart btn btn-main py-11 px-24 rounded-pill flex-align gap-8"
                      >
                        Add <i className="ph ph-shopping-cart" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewArrivalOne;
