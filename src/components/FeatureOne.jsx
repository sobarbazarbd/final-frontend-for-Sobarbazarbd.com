"use client";
import React from "react";
import Link from "next/link";
import Slider from "react-slick";

const FeatureOne = ({
  data = [],
  sectionId = "featureSection",
  showArrows = true,
  sliderConfig = {},
}) => {
  // Only use incoming data, fallback to empty array
  const categories = Array.isArray(data) ? data : [];

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
                const slug = item.name
                  ? item.name
                      .toLowerCase()
                      .replace(/&/g, "and")
                      .replace(/\s+/g, "-")
                  : "";
                return (
                  <div key={item.id} className="feature-item text-center">
                    <div className="feature-item__thumb rounded-circle">
                      <Link
                        href={`/shop/?subcategories=${item.id}`}
                        className="w-100 h-100 flex-center"
                      >
                        <img
                          src={
                            item.image ||
                            "/assets/images/thumbs/feature-img1.png"
                          }
                          alt={item.name}
                          loading="lazy"
                          className="rounded-circle object-cover"
                        />
                      </Link>
                    </div>
                    <div className="feature-item__content mt-16">
                      <h6 className="text-lg mb-8">
                        <Link
                          href={`/shop/?subcategories=${item.id}`}
                          className="text-inherit hover-text-main-600"
                        >
                          {item.name}
                        </Link>
                      </h6>
                      <span className="text-sm text-gray-400">
                        {item.customer_products_count ||
                          item.supplier_products_count}{" "}
                        Products
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
