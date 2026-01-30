"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🔹 Default categories as fallback
const defaultCategories = [
  { id: 1, title: "Vegetables", image: "/assets/images/thumbs/feature-img1.png", productCount: "125+ Products" },
  { id: 2, title: "Fish & Meats", image: "/assets/images/thumbs/feature-img2.png", productCount: "125+ Products" },
  { id: 3, title: "Desserts", image: "/assets/images/thumbs/feature-img3.png", productCount: "125+ Products" },
  { id: 4, title: "Drinks & Juice", image: "/assets/images/thumbs/feature-img4.png", productCount: "125+ Products" },
  { id: 5, title: "Animals Food", image: "/assets/images/thumbs/feature-img5.png", productCount: "125+ Products" },
  { id: 6, title: "Fresh Fruits", image: "/assets/images/thumbs/feature-img6.png", productCount: "125+ Products" },
  { id: 7, title: "Yummy Candy", image: "/assets/images/thumbs/feature-img7.png", productCount: "125+ Products" },
  { id: 8, title: "Dairy & Eggs", image: "/assets/images/thumbs/feature-img8.png", productCount: "125+ Products" },
  { id: 9, title: "Snacks", image: "/assets/images/thumbs/feature-img9.png", productCount: "125+ Products" },
  { id: 10, title: "Frozen Foods", image: "/assets/images/thumbs/feature-img10.png", productCount: "125+ Products" },
];

// 🔹 Function to convert title → slug
const toSlug = (title) => 
  title ? title.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-") : "";

const FeatureOne = ({
  apiEndpoint = "",
  data = [],
  sectionId = "featureSection",
  showArrows = true,
  sliderConfig = {},
}) => {
  const [categories, setCategories] = useState(defaultCategories);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch dynamic categories if apiEndpoint is provided
  useEffect(() => {
    if (data && data.length > 0) {
      // Use provided data prop if available
      const formattedData = data.map(item => ({
        id: item.id,
        title: item.name || item.title || "Category",
        image: item.image || "/assets/images/thumbs/feature-img1.png",
        productCount: `${item.customer_products_count || item.supplier_products_count || 0}+ Products`
      }));
      setCategories(formattedData);
    } else if (apiEndpoint) {
      // Fetch from API endpoint
      const fetchCategories = async () => {
        setLoading(true);
        try {
          const res = await fetch(apiEndpoint);
          const apiData = await res.json();
          if (Array.isArray(apiData) && apiData.length > 0) {
            const formattedData = apiData.map(item => ({
              id: item.id,
              title: item.name || item.title || "Category",
              image: item.image || "/assets/images/thumbs/feature-img1.png",
              productCount: `${item.customer_products_count || item.supplier_products_count || 0}+ Products`
            }));
            setCategories(formattedData);
          }
        } catch (err) {
          console.error("Error fetching categories:", err);
          setCategories(defaultCategories); // Fallback to default
        } finally {
          setLoading(false);
        }
      };
      fetchCategories();
    }
  }, [apiEndpoint, data]);

  // 🔹 Slider settings - Fixed for your template
  const defaultSliderSettings = {
    dots: false,
    infinite: categories.length > 10,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: showArrows,
    cssEase: "linear",
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1699, settings: { slidesToShow: 9, arrows: showArrows } },
      { breakpoint: 1599, settings: { slidesToShow: 8, arrows: showArrows } },
      { breakpoint: 1399, settings: { slidesToShow: 6, arrows: showArrows } },
      { breakpoint: 1199, settings: { slidesToShow: 5, arrows: showArrows } },
      { breakpoint: 992, settings: { slidesToShow: 4, arrows: false } },
      { breakpoint: 768, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 576, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 424, settings: { slidesToShow: 2, arrows: false } },
      { breakpoint: 359, settings: { slidesToShow: 1, arrows: false } },
    ],
  };

  const settings = { ...defaultSliderSettings, ...sliderConfig };

  // 🔹 Custom Arrow Component for your template
  const SamplePrevArrow = (props) => {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover:bg-main-600 hover:text-white transition-all duration-300 shadow-md`}
        aria-label="Previous"
        style={{ 
          width: '40px', 
          height: '40px', 
          zIndex: 10,
          left: '-20px'
        }}
      >
        <i className="ph ph-caret-left" />
      </button>
    );
  };

  const SampleNextArrow = (props) => {
    const { className, onClick } = props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover:bg-main-600 hover:text-white transition-all duration-300 shadow-md`}
        aria-label="Next"
        style={{ 
          width: '40px', 
          height: '40px', 
          zIndex: 10,
          right: '-20px'
        }}
      >
        <i className="ph ph-caret-right" />
      </button>
    );
  };

  // Update settings with custom arrows
  if (showArrows) {
    settings.nextArrow = <SampleNextArrow />;
    settings.prevArrow = <SamplePrevArrow />;
  }

  if (loading) {
    return (
      <div className="feature" id={sectionId}>
        <div className="container container-lg">
          <div className="position-relative arrow-center">
            <div className="text-center py-10">
              <div className="spinner-border text-main-600" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="feature" id={sectionId}>
      <div className="container container-lg">
        <div className="position-relative arrow-center">
          <div className="feature-item-wrapper">
            {categories.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500">No categories found</p>
              </div>
            ) : (
              <Slider {...settings}>
                {categories.map((item) => {
                  const slug = toSlug(item.title);
                  return (
                    <div key={item.id} className="feature-item text-center px-2">
                      <div className="feature-item__thumb rounded-circle mx-auto">
                        <Link
                          href={`/shop/?supplier_product__subcategories=${item.id}`}
                          className="w-100 h-100 flex-center"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className="rounded-circle object-cover w-full h-full"
                            style={{ width: '100px', height: '100px' }}
                            onError={(e) => {
                              e.target.src = "/assets/images/thumbs/feature-img1.png";
                            }}
                          />
                        </Link>
                      </div>
                      <div className="feature-item__content mt-3">
                        <h6 className="text-base md:text-lg font-medium mb-2 line-clamp-1">
                          <Link
                            href={`/shop/?subcategories=${item.id}`}
                            className="text-inherit text-xl hover:text-main-600 transition-colors"
                          >
                            {item.title}
                          </Link>
                        </h6>
                        <span className="text-xs md:text-sm text-gray-500">
                          {item.productCount}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureOne;