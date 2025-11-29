"use client";

import React, { memo, useEffect, useState } from "react";
import Link from "next/link";
import Slider from "react-slick";
import { ProductCard } from "./ProductTabSection";

const SampleNextArrow = memo(function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      type='button'
      onClick={onClick}
      className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
    >
      <i className='ph ph-caret-right' />
    </button>
  );
});

const SamplePrevArrow = memo(function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      type='button'
      onClick={onClick}
      className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-neutral-600 text-xl hover-bg-neutral-600 hover-text-white transition-1`}
    >
      <i className='ph ph-caret-left' />
    </button>
  );
});

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

const HotDealsOne = ({ section, data = [] }) => {
  const featuredDeal = section?.banner_items?.[0];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!featuredDeal) return;
    function updateCountdown() {
      setTimeLeft(getCountdownTo(featuredDeal.start_date, featuredDeal.end_date));
    }
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [featuredDeal]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
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
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className='deals-weeek pt-80'>
      <div className='container container-lg'>
        <div className='border border-gray-100 p-24 rounded-16'>
          <div className='section-heading mb-24'>
            <div className='flex-between flex-wrap gap-8'>
              <h5 className='mb-0'>Hot Deals</h5>
              <div className='flex-align mr-point gap-16'>
                <Link
                  href='/shop'
                  className='text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline'
                >
                  View All Deals
                </Link>
              </div>
            </div>
          </div>
          {/* Dynamic featured deal box */}
          <div className='deal-week-box rounded-16 overflow-hidden flex-between position-relative z-1 mb-24'>
            <img
              src={featuredDeal?.image || '/assets/images/bg/week-deal-bg.png'}
              alt={featuredDeal?.title || ''}
              className='position-absolute inset-block-start-0 inset-block-start-0 w-100 h-100 z-n1 object-fit-cover'
            />
            <div className='d-lg-block d-none ps-32 flex-shrink-0'>
              <img src='/assets/images/thumbs/week-deal-img1.png' alt='' />
            </div>
            <div className='deal-week-box__content px-sm-4 d-block w-100 text-center'>
              <h6 className='mb-20'>{featuredDeal?.title || "Apple AirPods Max, Over Ear Headphones"}</h6>
              {featuredDeal?.end_date && (
                <div className='countdown mt-20' id={`countdown${featuredDeal.id}`}>
                  <ul className='countdown-list style-four flex-center flex-wrap'>
                    <li className='countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-neutral-600'>
                      <span className='days' />
                      {timeLeft.days} <br /> Days
                    </li>
                    <li className='countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-neutral-600'>
                      <span className='hours' />
                      {timeLeft.hours} <br /> Hour
                    </li>
                    <li className='countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-neutral-600'>
                      <span className='minutes' />
                      {timeLeft.minutes} <br /> Min
                    </li>
                    <li className='countdown-list__item flex-align flex-column text-sm fw-medium text-white rounded-circle bg-neutral-600'>
                      <span className='seconds' />
                      {timeLeft.seconds} <br /> Sec
                    </li>
                  </ul>
                </div>
              )}
              <Link
                href={featuredDeal?.link_url || "/shop"}
                target={featuredDeal?.link_target || "_self"}
                className='mt-16 btn btn-main-two fw-medium d-inline-flex align-items-center rounded-pill gap-8'
              >
                {featuredDeal?.button_text || "Shop Now"}
                <span className='icon text-xl d-flex'>
                  <i className='ph ph-arrow-right' />
                </span>
              </Link>
            </div>
            <div className='d-lg-block d-none flex-shrink-0 pe-xl-5'>
              <div className='me-xxl-5'>
                <img src='/assets/images/thumbs/week-deal-img2.png' alt='' />
              </div>
            </div>
          </div>
          <div className='deals-week-slider arrow-style-two'>
            <Slider {...settings}>
              {data && data.length > 0 ? (
                data.map((product) => (
                  <div key={product.id}>
                    <ProductCard product={product} color="main-600" />
                  </div>
                ))
              ) : (
                <div>
                  <div className="text-center w-100 py-5 text-gray-500">
                    No deals available.
                  </div>
                </div>
              )}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotDealsOne;
