"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const defaultSlides = [
  {
    id: 1,
    image: "/assets/images/thumbs/banner-img1.png",
    link: "/shop",
    alt: "Daily Grocery Order and Get Express Delivery",
  },
  {
    id: 2,
    image: "/assets/images/thumbs/banner-img3.png",
    link: "/shop",
    alt: "Fresh Products Delivered to Your Doorstep",
  },
  {
    id: 3,
    image: "/assets/images/thumbs/banner-img2.png",
    link: "/shop",
    alt: "Best Deals on Fresh Produce",
  },
];

const defaultPromos = [
  {
    id: 1,
    image: "/assets/images/thumbs/banner-three-img1.png",
    link: "/shop",
    alt: "Promo Banner 1",
  },
  {
    id: 2,
    image: "/assets/images/thumbs/banner-three-img2.png",
    link: "/shop",
    alt: "Promo Banner 2",
  },
  {
    id: 3,
    image: "/assets/images/thumbs/banner-three-img3.png",
    link: "/shop",
    alt: "Promo Banner 3",
  },
  {
    id: 4,
    image: "/assets/images/thumbs/banner-two-img.png",
    link: "/shop",
    alt: "Promo Banner 4",
  },
];

const HeroSection2 = ({
  section,
  slideDuration = 5000,
  transitionSpeed = 800,
}) => {
  // Map API data to slider slides
  const slides =
    section?.banner_items?.length > 0
      ? section.banner_items.map((item) => ({
          id: item.id,
          image: item.image,
          link: item.link_url || "/shop",
          alt: item.title || "Banner",
        }))
      : defaultSlides;

  // Use API promo items or fallback
  const promos =
    section?.promo_items?.length > 0
      ? section.promo_items.slice(0, 4).map((item) => ({
          id: `promo-${item.id}`,
          image: item.image,
          link: item.link_url || "/shop",
          alt: item.title || "Promo",
        }))
      : defaultPromos;

  const NextArrow = ({ className = "", onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-next slick-arrow hero2__arrow hero2__arrow--next`}
      aria-label="Next slide"
    >
      <i className="ph ph-caret-right" />
    </button>
  );

  const PrevArrow = ({ className = "", onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`${className} slick-prev slick-arrow hero2__arrow hero2__arrow--prev`}
      aria-label="Previous slide"
    >
      <i className="ph ph-caret-left" />
    </button>
  );

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: transitionSpeed,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: slideDuration,
    pauseOnHover: true,
    pauseOnFocus: true,
    fade: true,
    cssEase: "ease-in-out",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dotsClass: "slick-dots hero2__dots",
  };

  return (
    <section className="hero2">
      <div className="container container-lg">
        <div className="hero2__wrapper">
          {/* Left — Main Carousel */}
          <div className="hero2__slider">
            <div className="hero2__slider-inner">
              <Slider {...settings}>
                {slides.map((slide) => (
                  <div key={slide.id} className="hero2__slide">
                    <Link href={slide.link} className="hero2__slide-link">
                      <img
                        src={slide.image}
                        alt={slide.alt}
                        className="hero2__slide-img"
                      />
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Right — 2×2 Promo Grid */}
          <div className="hero2__promos">
            {promos.slice(0, 4).map((promo) => (
              <Link
                key={promo.id}
                href={promo.link}
                className="hero2__promo-card"
              >
                <img
                  src={promo.image}
                  alt={promo.alt}
                  className="hero2__promo-img"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection2;
