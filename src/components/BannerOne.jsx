"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Import Slider dynamically, disable SSR to avoid hydration errors
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const BannerOne = ({
  banners = [],
  scrollTarget = "#featureSection",
  exploreButtonText = "Explore Shop",
  slideDuration = 6500,
  transitionSpeed = 1500,
  dataSource = "/data/banner.json",
}) => {
  const [bannerData, setBannerData] = useState(null); // Start with null

  const defaultBanners = [
    {
      id: 1,
      title: "Daily Grocery Order and Get Express Delivery",
      image: "/assets/images/thumbs/banner-img1.png",
      link: "/shop",
      hasAnimation: true,
    },
    {
      id: 2,
      title: "Fresh Products Delivered to Your Doorstep",
      image: "/assets/images/thumbs/banner-img3.png",
      link: "/shop",
      hasAnimation: false,
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(dataSource);
        if (!res.ok) throw new Error("Failed to fetch banner data");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setBannerData(data);
        } else if (banners.length > 0) {
          setBannerData(banners);
        } else {
          setBannerData(defaultBanners);
        }
      } catch (err) {
        console.warn("⚠️ Using default banners", err);
        setBannerData(banners.length > 0 ? banners : defaultBanners);
      }
    };
    fetchData();
  }, [banners, dataSource]);

  // Return null on server (prevents hydration mismatch)
  if (!bannerData) return null;

  const SampleNextArrow = ({ className, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-right" />
    </button>
  );

  const SamplePrevArrow = ({ className, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
    >
      <i className="ph ph-caret-left" />
    </button>
  );

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: transitionSpeed,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: slideDuration,
    pauseOnHover: true,
    pauseOnFocus: true,
    fade: false,
    cssEase: "ease-in-out",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="banner">
      <div className="container container-lg">
        <div className="banner-item rounded-24 overflow-hidden position-relative arrow-center">
          <a
            href={scrollTarget}
            className="scroll-down w-84 h-84 text-center flex-center bg-main-600 rounded-circle border border-5 text-white border-white position-absolute start-50 translate-middle-x bottom-0 hover-bg-main-800"
          >
            <span className="icon line-height-0">
              <i className="ph ph-caret-double-down" />
            </span>
          </a>

          <img
            src="/assets/images/bg/banner-bg.png"
            alt="Banner Background"
            className="banner-img position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1 object-fit-cover rounded-24"
          />

          <div className="banner-slider">
            <Slider {...settings}>
              {bannerData.map((banner) => (
                <div key={banner.id} className="banner-slider__item">
                  <div className="banner-slider__inner flex-between position-relative">
                    <div className="banner-item__content">
                      <h1
                        className={`banner-item__title ${
                          banner.hasAnimation ? "bounce" : ""
                        }`}
                      >
                        {banner.title}
                      </h1>
                      <Link
                        href={banner.link}
                        className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8"
                      >
                        {exploreButtonText}{" "}
                        <span className="icon text-xl d-flex">
                          <i className="ph ph-shopping-cart-simple" />
                        </span>
                      </Link>
                    </div>
                    <div className="banner-item__thumb">
                      <img
                        src={banner.image}
                        alt={banner.alt || banner.title}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerOne;
