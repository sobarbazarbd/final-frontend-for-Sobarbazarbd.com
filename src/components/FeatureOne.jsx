"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";

// 🔹 Default categories
const defaultCategories = [
  { id: 1, title: "Vegetables", image: "assets/images/thumbs/feature-img1.png", productCount: "125+ Products" },
  { id: 2, title: "Fish & Meats", image: "assets/images/thumbs/feature-img2.png", productCount: "125+ Products" },
  { id: 3, title: "Desserts", image: "assets/images/thumbs/feature-img3.png", productCount: "125+ Products" },
  { id: 4, title: "Drinks & Juice", image: "assets/images/thumbs/feature-img4.png", productCount: "125+ Products" },
  { id: 5, title: "Animals Food", image: "assets/images/thumbs/feature-img5.png", productCount: "125+ Products" },
  { id: 6, title: "Fresh Fruits", image: "assets/images/thumbs/feature-img6.png", productCount: "125+ Products" },
  { id: 7, title: "Yummy Candy", image: "assets/images/thumbs/feature-img7.png", productCount: "125+ Products" },
  { id: 8, title: "Dairy & Eggs", image: "assets/images/thumbs/feature-img8.png", productCount: "125+ Products" },
  { id: 9, title: "Snacks", image: "assets/images/thumbs/feature-img9.png", productCount: "125+ Products" },
  { id: 10, title: "Frozen Foods", image: "assets/images/thumbs/feature-img10.png", productCount: "125+ Products" },
];

// 🔹 Function to convert title → slug
const toSlug = (title) => title.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

const FeatureOne = ({
  apiEndpoint = "",
  sectionId = "featureSection",
  showArrows = true,
  sliderConfig = {},
}) => {
  const [categories, setCategories] = useState(defaultCategories);

  // 🔹 Fetch dynamic categories (optional)
  useEffect(() => {
    if (!apiEndpoint) return;
    const fetchCategories = async () => {
      try {
        const res = await fetch(apiEndpoint);
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, [apiEndpoint]);

  // 🔹 Slider settings
  const defaultSliderSettings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1699, settings: { slidesToShow: 9 } },
      { breakpoint: 1599, settings: { slidesToShow: 8 } },
      { breakpoint: 1399, settings: { slidesToShow: 6 } },
      { breakpoint: 992, settings: { slidesToShow: 5 } },
      { breakpoint: 768, settings: { slidesToShow: 4 } },
      { breakpoint: 575, settings: { slidesToShow: 3 } },
      { breakpoint: 424, settings: { slidesToShow: 2 } },
      { breakpoint: 359, settings: { slidesToShow: 1 } },
    ],
  };

  const settings = { ...defaultSliderSettings, ...sliderConfig };

  // 🔹 Custom Arrow Component
  const Arrow = ({ className, onClick, dir }) => (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
      aria-label={`${dir} slide`}
    >
      <i className={`ph ph-caret-${dir}`} />
    </button>
  );

  return (
    <div className="feature" id={sectionId}>
      <div className="container container-lg">
        <div className="position-relative arrow-center">
          <div className="feature-item-wrapper">
            <Slider
              {...settings}
              nextArrow={showArrows ? <Arrow dir="right" /> : null}
              prevArrow={showArrows ? <Arrow dir="left" /> : null}
            >
              {categories.map((item) => {
                const slug = toSlug(item.title);
                return (
                  <div key={item.id} className="feature-item text-center">
                    <div className="feature-item__thumb rounded-circle">
                      <Link
                        href={`/category/${slug}`}
                        className="w-100 h-100 flex-center"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="rounded-circle object-cover"
                        />
                      </Link>
                    </div>
                    <div className="feature-item__content mt-16">
                      <h6 className="text-lg mb-8">
                        <Link
                          href={`/category/${slug}`}
                          className="text-inherit hover-text-main-600"
                        >
                          {item.title}
                        </Link>
                      </h6>
                      <span className="text-sm text-gray-400">
                        {item.productCount}
                      </span>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureOne;
