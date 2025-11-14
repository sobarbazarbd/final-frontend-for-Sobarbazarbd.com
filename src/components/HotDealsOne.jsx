"use client";
import React, { memo, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const SampleNextArrow = memo((props) => {
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

const SamplePrevArrow = memo((props) => {
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

// Helper function for countdown
const getCountdownTo = (endDate) => {
  if (!endDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  
  const end = new Date(endDate);
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
};

const HotDealsOne = ({ section }) => {
  const [countdowns, setCountdowns] = useState({});
  const sampleProducts = [
    {
      id: 1,
      name: "Marcel's Modern Pantry Almond Unsweetened",
      image: '/assets/images/thumbs/product-img8.png',
      price: 14.99,
      originalPrice: 28.99,
      discount: 50,
      badge: 'Sale 50%',
      badgeColor: 'bg-danger-600',
      rating: 4.8,
      reviews: 17000,
      vendor: 'Lucky Supermarket'
    },
    {
      id: 2,
      name: "O Organics Milk, Whole, Vitamin D",
      image: '/assets/images/thumbs/product-img9.png',
      price: 14.99,
      originalPrice: 28.99,
      discount: 50,
      badge: 'Sale 50%',
      badgeColor: 'bg-danger-600',
      rating: 4.8,
      reviews: 17000,
      vendor: 'Lucky Supermarket'
    },
    {
      id: 3,
      name: "Whole Grains and Seeds Organic Bread",
      image: '/assets/images/thumbs/product-img10.png',
      price: 14.99,
      originalPrice: 28.99,
      discount: 30,
      badge: 'Best Sale',
      badgeColor: 'bg-info-600',
      rating: 4.8,
      reviews: 17000,
      vendor: 'Lucky Supermarket'
    },
    {
      id: 4,
      name: "Tropicana 100% Juice, Orange, No Pulp",
      image: '/assets/images/thumbs/product-img18.png',
      price: 14.99,
      originalPrice: 28.99,
      discount: 0,
      badge: 'New',
      badgeColor: 'bg-warning-600',
      rating: 4.8,
      reviews: 17000,
      vendor: 'Lucky Supermarket'
    }
  ];

  // Update countdowns for all hot deals
  useEffect(() => {
    const updateCountdowns = () => {
      if (!section?.banner_items) return;
      
      const newCountdowns = {};
      section.banner_items.forEach(item => {
        newCountdowns[item.id] = getCountdownTo(item.end_date);
      });
      setCountdowns(newCountdowns);
    };

    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [section]);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
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
    <section className='hot-deals pt-80'>
      <div className='container container-lg'>
        <div className='section-heading'>
          <div className='flex-between flex-wrap gap-8'>
            <h5 className='mb-0'>{section?.title || 'Hot Deals Today'}</h5>
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
        
        <div className='row g-12'>
          {/* Hot Deal Banner - Dynamic */}
          {section?.banner_items?.map((hotDeal, index) => {
            const countdown = countdowns[hotDeal.id] || { days: 0, hours: 0, minutes: 0, seconds: 0 };
            
            return (
              <div key={hotDeal.id || index} className='col-md-4'>
                <div className='hot-deals position-relative rounded-16 bg-main-600 overflow-hidden p-28 z-1 text-center'>
                  <img
                    src='/assets/images/shape/offer-shape.png'
                    alt='marketpro'
                    className='position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 opacity-6'
                  />
                  <div className='hot-deals__thumb'>
                    <img
                      src={hotDeal.image || '/assets/images/thumbs/hot-deals-img.png'}
                      alt={hotDeal.title}
                      className="object-fit-cover"
                      style={{ maxHeight: '200px', width: 'auto' }}
                    />
                  </div>
                  <div className='py-xl-4'>
                    <h4 className='text-white mb-8'>{hotDeal.title}</h4>
                    <p className="text-white text-sm mb-16">{hotDeal.description}</p>
                    
                    {/* Countdown Timer */}
                    {hotDeal.end_date && (
                      <div className='countdown my-32' id={`countdown-${hotDeal.id}`}>
                        <ul className='countdown-list flex-center flex-wrap'>
                          <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white'>
                            <span className='days' />
                            {countdown.days} Days
                          </li>
                          <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white'>
                            <span className='hours' />
                            {countdown.hours} Hours
                          </li>
                          <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white'>
                            <span className='minutes' />
                            {countdown.minutes} Min
                          </li>
                          <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white'>
                            <span className='seconds' />
                            {countdown.seconds} Sec
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    <Link
                      href={hotDeal.link_url || '/shop'}
                      target={hotDeal.link_target || '_self'}
                      className='mt-16 btn btn-main-two fw-medium d-inline-flex align-items-center rounded-pill gap-8'
                    >
                      {hotDeal.button_text || 'Shop Now'}
                      <span className='icon text-xl d-flex'>
                        <i className='ph ph-arrow-right' />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Products Slider */}
          <div className='col-md-8'>
            <div className='hot-deals-slider arrow-style-two'>
              <Slider {...settings}>
                {sampleProducts.map((product) => (
                  <div key={product.id}>
                    <div className='product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2'>
                      {/* Product Badge */}
                      {product.badge && (
                        <span className={`product-card__badge ${product.badgeColor} px-8 py-4 text-sm text-white`}>
                          {product.badge}
                        </span>
                      )}
                      
                      {/* Product Image */}
                      <Link
                        href='/product-details'
                        className='product-card__thumb flex-center'
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                        />
                      </Link>
                      
                      {/* Product Content */}
                      <div className='product-card__content p-sm-2'>
                        <h6 className='title text-lg fw-semibold mt-12 mb-8'>
                          <Link
                            href='/product-details'
                            className='link text-line-2'
                          >
                            {product.name}
                          </Link>
                        </h6>
                        
                        {/* Vendor */}
                        <div className='flex-align gap-4'>
                          <span className='text-main-600 text-md d-flex'>
                            <i className='ph-fill ph-storefront' />
                          </span>
                          <span className='text-gray-500 text-xs'>
                            By {product.vendor}
                          </span>
                        </div>
                        
                        <div className='product-card__content mt-12'>
                          {/* Price */}
                          <div className='product-card__price mb-8'>
                            <span className='text-heading text-md fw-semibold '>
                              ${product.price}{" "}
                              <span className='text-gray-500 fw-normal'>
                                /Qty
                              </span>{" "}
                            </span>
                            {product.originalPrice > product.price && (
                              <span className='text-gray-400 text-md fw-semibold text-decoration-line-through'>
                                ${product.originalPrice}
                              </span>
                            )}
                          </div>
                          
                          {/* Rating */}
                          <div className='flex-align gap-6'>
                            <span className='text-xs fw-bold text-gray-600'>
                              {product.rating}
                            </span>
                            <span className='text-15 fw-bold text-warning-600 d-flex'>
                              <i className='ph-fill ph-star' />
                            </span>
                            <span className='text-xs fw-bold text-gray-600'>
                              ({product.reviews > 1000 ? `${(product.reviews / 1000).toFixed(0)}k` : product.reviews})
                            </span>
                          </div>
                          
                          {/* Add to Cart Button */}
                          <Link
                            href='/cart'
                            className='product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center'
                          >
                            Add To Cart <i className='ph ph-shopping-cart' />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        
        {/* Empty State */}
        {(!section?.banner_items || section.banner_items.length === 0) && (
          <div className="text-center py-40">
            <div className="bg-gray-100 rounded-16 p-40">
              <h4 className="text-gray-600 mb-16">No Hot Deals Available</h4>
              <p className="text-gray-500 mb-24">Check back later for exciting deals!</p>
              <Link
                href='/shop'
                className='btn bg-main-600 text-white hover-bg-main-800 fw-medium d-inline-flex align-items-center rounded-pill gap-8'
              >
                Browse Products
                <span className='icon text-xl d-flex'>
                  <i className='ph ph-arrow-right' />
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default HotDealsOne;