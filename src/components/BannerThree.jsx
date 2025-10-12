"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

const BannerThree = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    fetch("/data/banner3.json")
      .then((res) => res.json())
      .then((data) => setBanners(data))
      .catch((err) => console.error("Error loading banners:", err));
  }, []);

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      type='button'
      id='banner-three-next'
      className='slick-next slick-arrow flex-center rounded-circle border border-white hover-border-main-600 text-white text-2xl hover-bg-main-600 hover-text-white transition-1 position-absolute top-50 translate-middle-y inset-inline-end-0 me-lg-5 me-32'
    >
      <i className='ph ph-caret-right' />
    </button>
  );

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      type='button'
      id='banner-three-prev'
      className='slick-prev slick-arrow flex-center rounded-circle border border-white hover-border-main-600 text-white text-2xl hover-bg-main-600 hover-text-white transition-1 position-absolute top-50 translate-middle-y inset-inline-start-0 ms-lg-5 ms-32'
    >
      <i className='ph ph-caret-left' />
    </button>
  );

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    speed: 1500,
    dots: false,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
  };

  return (
    <section
      className='banner-three bg-img position-relative'
      data-background-image='/assets/images/shape/line-pattern.png'
    >
      <img
        src='/assets/images/shape/star-shape.png'
        alt=''
        className='animation star-shape animation-rotate'
      />
      <img
        src='/assets/images/shape/star-shape.png'
        alt=''
        className='animation star-shape style-two animation-rotate'
      />
      <img
        src='/assets/images/shape/line-shape.png'
        alt=''
        className='animation line-shape opacity-75 animation-rotate'
      />

      <h1 className='display-200 text-white opacity-25 position-absolute inset-inline-end-0 inset-block-end-0 mb-0 line-height-73'>
        Fashion
      </h1>

      <div className='container container-lg'>
        <Slider {...settings} className='banner-three-slider'>
          {banners.map((banner) => (
            <div key={banner.id}>
              <div className='row align-items-center gy-4'>
                <div className='col-lg-6'>
                  <div>
                    <span className='text-white mb-8 h6 wow bounceIn'>
                      {banner.tagline}
                    </span>
                    <h1 className='text-white display-one wow'>
                      {banner.title}{" "}
                      <span
                        className='fw-normal text-main-two-600 font-heading-four wow bounceIn'
                        data-wow-duration='2s'
                        data-wow-delay='.5s'
                      >
                        {banner.highlight}
                      </span>{" "}
                      Just For You.
                    </h1>
                    <p className='text-white max-w-472 text-2xl mb-24 wow bounceInUp'>
                      {banner.description}
                    </p>
                    <Link
                      href={banner.shopLink}
                      className='btn btn-outline-white d-inline-flex align-items-center rounded-pill gap-8 mt-lg-4 mt-sm-1 wow bounceIn'
                    >
                      Shop Now
                      <span className='icon text-xl d-flex'>
                        <i className='ph ph-shopping-cart-simple' />
                      </span>
                    </Link>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div
                    className='d-flex thumbs__img justify-content-center wow bounceIn'
                    data-wow-duration='3s'
                    data-wow-delay='.5s'
                    data-tilt=''
                    data-tilt-max={16}
                    data-tilt-speed={500}
                    data-tilt-perspective={5000}
                    data-tilt-scale='1.06'
                  >
                    <img src={banner.image} alt='' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default BannerThree;
