"use client";
import React, { memo, useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const SampleNextArrow = memo(function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <button
      type='button'
      onClick={onClick}
      className={` ${className} slick-next slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
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
      className={`${className} slick-prev slick-arrow flex-center rounded-circle border border-gray-100 hover-border-main-600 text-xl hover-bg-main-600 hover-text-white transition-1`}
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

const FlashSalesOne = ({ section }) => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 2,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Store countdowns for each item by id
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    function updateCountdowns() {
      if (!section?.banner_items) return;
      const newCountdowns = {};
      section.banner_items.forEach(item => {
        newCountdowns[item.id] = getCountdownTo(item.start_date, item.end_date);
      });
      setCountdowns(newCountdowns);
    }
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [section]);

  return (
    <section className='flash-sales py-80'>
      <div className='container container-lg'>
        <div className='section-heading'>
          <div className='flex-between flex-wrap gap-8'>
            <h5 className='mb-0'>Flash Sales Today</h5>
            <div className='flex-align gap-16 mr-point'>
              <Link
                href='/shop'
                className='text-sm fw-medium text-gray-700 hover-text-main-600 hover-text-decoration-underline'
              >
                View All Deals
              </Link>
            </div>
          </div>
        </div>
        <div className='flash-sales__slider arrow-style-two'>
          <Slider {...settings}>
            {section?.banner_items?.map((item, idx) => {
              const countdown = countdowns[item.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
              return (
                <div key={item.id || idx}>
                  <div className='flash-sales-item rounded-16 overflow-hidden z-1 position-relative flex-align flex-0 justify-content-between gap-8'>
                    <img
                      src={item.image}
                      alt={item.title}
                      className='position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 object-fit-cover z-n1 flash-sales-item__bg'
                    />
                    <div className='flash-sales-item__thumb d-sm-block d-none'>
                      {/* Optionally render a thumb if available */}
                    </div>
                    <div className='flash-sales-item__content ms-sm-auto'>
                      <h6 className='text-32 mb-20'>{item.title}</h6>
                      {item.end_date && (
                        <div className='countdown' id={`countdown${item.id || idx}`}>
                          <ul className='countdown-list flex-align flex-wrap'>
                            <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium'>
                              <span className='days' />
                              {countdown.days} Days
                            </li>
                            <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium'>
                              <span className='hours' />
                              {countdown.hours} Hours
                            </li>
                            <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium'>
                              <span className='minutes' />
                              {countdown.minutes} Min
                            </li>
                            <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium'>
                              <span className='seconds' />
                              {countdown.seconds} Sec
                            </li>
                          </ul>
                        </div>
                      )}
                      <Link
                        href={item.link_url}
                        target={item.link_target}
                        className='btn btn-main d-inline-flex align-items-center rounded-pill gap-8 mt-24'
                      >
                        {item.button_text}
                        <span className='icon text-xl d-flex'>
                          <i className='ph ph-arrow-right' />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default FlashSalesOne;
