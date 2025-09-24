"use client";

import React from "react";
import Link from "next/link";
import Slider from "react-slick";

const OrganicOne = () => {
  // Dynamic product data
  const products = [
    {
      id: 1,
      title: "Taylor Farms Broccoli Florets Vegetables",
      image: "assets/images/thumbs/product-img10.png",
      rating: 4.8,
      reviews: "17k",
      store: "Lucky Supermarket",
      oldPrice: 28.99,
      price: 14.99,
    },
    {
      id: 2,
      title: "Fresh Organic Baby Spinach Leaves",
      image: "assets/images/thumbs/product-img11.png",
      rating: 4.7,
      reviews: "8.2k",
      store: "Green Leaf Market",
      oldPrice: 19.99,
      price: 11.49,
    },
    {
      id: 3,
      title: "Organic Red Apples Premium Quality",
      image: "assets/images/thumbs/product-img12.png",
      rating: 4.9,
      reviews: "22k",
      store: "Fruit World",
      oldPrice: 15.99,
      price: 9.99,
    },
    {
      id: 4,
      title: "Organic Sweet Bananas Fresh Harvest",
      image: "assets/images/thumbs/product-img13.png",
      rating: 4.8,
      reviews: "10k",
      store: "Daily Fresh Mart",
      oldPrice: 12.99,
      price: 6.99,
    },
    {
      id: 5,
      title: "Organic Strawberries Premium Pack",
      image: "assets/images/thumbs/product-img14.png",
      rating: 4.6,
      reviews: "5.6k",
      store: "Berry Market",
      oldPrice: 18.99,
      price: 12.49,
    },
    {
      id: 6,
      title: "Organic Carrots Farm Fresh",
      image: "assets/images/thumbs/product-img15.png",
      rating: 4.5,
      reviews: "9.1k",
      store: "Healthy Veggie",
      oldPrice: 9.99,
      price: 5.49,
    },
  ];

  function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
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

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1599,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 424,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="organic-food py-80">
      <div className="container container-lg">
        <div className="section-heading">
          <div className="flex-between flex-wrap gap-8">
            <h5 className="mb-0">Organic Food</h5>
            <div className="flex-align mr-point gap-16">
              <Link
                href="/shop"
                className="text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline"
              >
                All Categories
              </Link>
            </div>
          </div>
        </div>
        <div className="organic-food__slider arrow-style-two">
          <Slider {...settings}>
            {products.map((product) => (
              <div key={product.id}>
                <div className="product-card px-8 py-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                  <Link
                    href="/product-details"
                    className="product-card__thumb flex-center"
                  >
                    <img src={product.image} alt={product.title} />
                  </Link>
                  <div className="product-card__content mt-12">
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
                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                      <Link
                        href="/product-details"
                        className="link text-line-2"
                      >
                        {product.title}
                      </Link>
                    </h6>
                    <div className="flex-align gap-4">
                      <span className="text-main-600 text-md d-flex">
                        <i className="ph-fill ph-storefront" />
                      </span>
                      <span className="text-gray-500 text-xs">
                        By {product.store}
                      </span>
                    </div>
                    <div className="flex-between gap-8 mt-24 flex-wrap">
                      <div className="product-card__price">
                        <span className="text-gray-400 text-md fw-semibold text-decoration-line-through d-block">
                          ${product.oldPrice}
                        </span>
                        <span className="text-heading text-md fw-semibold ">
                          ${product.price}{" "}
                          <span className="text-gray-500 fw-normal">/Qty</span>{" "}
                        </span>
                      </div>
                      <Link
                        href="/cart"
                        className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8"
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

export default OrganicOne;
