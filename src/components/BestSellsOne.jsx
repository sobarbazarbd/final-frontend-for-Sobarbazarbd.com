"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Helper for countdown
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

const BestSellsOne = ({ section, data = [] }) => {
  // Maintain countdowns for each product
  const [countdowns, setCountdowns] = useState({});

  useEffect(() => {
    function updateCountdowns() {
      const newCountdowns = {};
      data.forEach((product) => {
        newCountdowns[product.id] = getCountdownTo(
          product.start_date,
          product.end_date
        );
      });
      setCountdowns(newCountdowns);
    }
    updateCountdowns();
    const interval = setInterval(updateCountdowns, 1000);
    return () => clearInterval(interval);
  }, [data]);

  return (
    <section className='best sells pb-80'>
      <div className='container container-lg'>
        <div className='section-heading'>
          <div className='flex-between flex-wrap gap-8'>
            <h5 className='mb-0'>Daily Best Sells</h5>
          </div>
        </div>
        <div className='row g-12'>
          <div className='col-xxl-8'>
            <div className='row gy-4'>
              {data && data.length > 0 ? (
                data.slice(0, 4).map((product, idx) => {
                  const countdown = countdowns[product.id] || {
                    hours: 0,
                    minutes: 0,
                    seconds: 0,
                  };
                  const imageUrl =
                    product.images?.[0]?.image ||
                    "/assets/images/thumbs/best-sell" + (idx + 1) + ".png";
                  const price =
                    product.default_variant?.final_price ??
                    product.default_variant?.price ??
                    product.price ??
                    0;
                  const originalPrice =
                    product.default_variant?.price ??
                    product.price ??
                    price + 10;
                  const rating = product.rating ?? 4.8;
                  const reviews = product.reviews ?? "17k";
                  const storeName = product.store?.name || "Lucky Supermarket";
                  const badgeText = product.badge || "Sale 50%";
                  const badgeClass = "bg-danger-600";
                  const sold = product.sold ?? "18/35";
                  const progress = product.progress ?? 35;

                  return (
                    <div className='col-md-6' key={product.id}>
                      <div className='product-card style-two h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 flex-align gap-16'>
                        <div>
                          <span
                            className={`product-card__badge ${badgeClass} px-8 py-4 text-sm text-white`}
                          >
                            {badgeText}
                          </span>
                          <Link
                            href={`/product-details/${product.id}`}
                            className='product-card__thumb flex-center'
                          >
                            <img src={imageUrl} alt={product.name} />
                          </Link>
                          <div className='countdown' id={`countdown${product.id}`}>
                            <ul className='countdown-list style-three flex-align flex-wrap'>
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
                        </div>
                        <div className='product-card__content'>
                          <div className='product-card__price mb-16'>
                            <span className='text-gray-400 text-md fw-semibold text-decoration-line-through'>
                              ${originalPrice}
                            </span>
                            <span className='text-heading text-md fw-semibold '>
                              ${price}{" "}
                              <span className='text-gray-500 fw-normal'>/Qty</span>{" "}
                            </span>
                          </div>
                          <div className='flex-align gap-6'>
                            <span className='text-xs fw-bold text-gray-600'>
                              {rating}
                            </span>
                            <span className='text-15 fw-bold text-warning-600 d-flex'>
                              <i className='ph-fill ph-star' />
                            </span>
                            <span className='text-xs fw-bold text-gray-600'>
                              ({reviews})
                            </span>
                          </div>
                          <h6 className='title text-lg fw-semibold mt-12 mb-8'>
                            <Link
                              href={`/product-details/${product.id}`}
                              className='link text-line-2'
                            >
                              {product.name}
                            </Link>
                          </h6>
                          <div className='flex-align gap-4'>
                            <span className='text-main-600 text-md d-flex'>
                              <i className='ph-fill ph-storefront' />
                            </span>
                            <span className='text-gray-500 text-xs'>
                              By {storeName}
                            </span>
                          </div>
                          <div className='mt-12'>
                            <div
                              className='progress w-100  bg-color-three rounded-pill h-4'
                              role='progressbar'
                              aria-label='Basic example'
                              aria-valuenow={progress}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            >
                              <div
                                className='progress-bar bg-main-600 rounded-pill'
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <span className='text-gray-900 text-xs fw-medium mt-8'>
                              Sold: {sold}
                            </span>
                          </div>
                          <Link
                            href='/cart'
                            className='product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center'
                          >
                            Add To Cart <i className='ph ph-shopping-cart' />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className='text-center w-100 py-5 text-gray-500'>
                  No best selling products available.
                </div>
              )}
            </div>
          </div>
          <div className='col-xxl-4'>
            <div className='position-relative rounded-16 bg-light-purple overflow-hidden p-28 z-1 text-center'>
              <div>
                <img
                  src='/assets/images/bg/special-snacks.png'
                  alt='marketpro'
                  className='position-absolute inset-block-start-0 inset-inline-start-0 z-n1 w-100 h-100 cover-img'
                />
                <div className='d-xxl-block d-none'>
                  <img
                    src='/assets/images/thumbs/special-snacks-img.png'
                    alt='marketpro'
                  />
                </div>
              </div>
              <div className='py-xl-4'>
                <h4 className='mb-8'>Special Snacks</h4>
                {/* Static countdown for special snacks */}
                <div className='countdown my-32' id='countdown5'>
                  <ul className='countdown-list style-two flex-center flex-wrap'>
                    <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white'>
                      <span className='hours' />
                      {countdowns[data[0]?.id]?.hours ?? 0} Hours
                    </li>
                    <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white'>
                      <span className='minutes' />
                      {countdowns[data[0]?.id]?.minutes ?? 0} Min
                    </li>
                    <li className='countdown-list__item text-heading flex-align gap-4 text-sm fw-medium colon-white'>
                      <span className='seconds' />
                      {countdowns[data[0]?.id]?.seconds ?? 0} Sec
                    </li>
                  </ul>
                </div>
                <Link
                  href='/shop'
                  className='mt-16 btn btn-main-two fw-medium d-inline-flex align-items-center rounded-pill gap-8'
                  tabIndex={0}
                >
                  Shop Now
                  <span className='icon text-xl d-flex'>
                    <i className='ph ph-arrow-right' />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestSellsOne;
