"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

// Product data
const productData = {
  "c-500-antioxidant-protect-dietary-supplement": {
    id: 1,
    name: "C-500 Antioxidant Protect Dietary Supplement",
    price: 14.99,
    originalPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
    sku: "EB4DRP",
    description: "Vivamus adipiscing nisl ut dolor dignissim semper. Nulla luctus malesuada tincidunt. Class aptent taciti sociosqu ad litora torquent",
    detailedDescription: "Wherever celebrations and good times happen, the C-500 Antioxidant brand will be there just as it has been for more than 75 years. With health benefits almost as rich as our history, we have a supplement formula guaranteed to bring wellness to your life.",
    images: [
      "/assets/images/thumbs/product-details-thumb1.png",
      "/assets/images/thumbs/product-details-thumb2.png",
      "/assets/images/thumbs/product-details-thumb3.png",
    ],
    category: "supplements",
    stock: 45,
    brand: "Marketpro",
    specifications: [
      "Product Type: Dietary Supplements",
      "Product Name: C-500 Antioxidant Protect",
      "Brand: HealthPlus",
      "FSA Eligible: Yes",
      "Size/Count: 60 capsules",
      "Item Code: 331539",
      "Ingredients: Vitamin C, Zinc, Selenium, Natural Antioxidants"
    ],
    nutritionFacts: [
      "Vitamin C: 500mg 556%",
      "Zinc: 15mg 136%", 
      "Selenium: 70mcg 127%",
      "Calories: 5",
      "Total Carbohydrate: 1g 0%"
    ],
    moreDetails: [
      "Supports immune system function",
      "Provides antioxidant protection",
      "Helps in collagen production",
      "Promotes skin health and vitality"
    ],
    productReviews: [
      {
        id: 1,
        name: "Nicolas Cage",
        rating: 5,
        date: "3 Days ago",
        title: "Great Product",
        comment: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour",
        avatar: "/assets/images/thumbs/comment-img1.png"
      },
      {
        id: 2,
        name: "Sarah Johnson",
        rating: 4,
        date: "1 Week ago",
        title: "Effective Supplement",
        comment: "I've been using this for a month and feel much more energetic. The quality is excellent and it's easy to swallow.",
        avatar: "/assets/images/thumbs/comment-img1.png"
      }
    ],
    ratingStats: {
      average: 4.8,
      total: 124,
      breakdown: [
        { stars: 5, count: 87, percentage: 70 },
        { stars: 4, count: 25, percentage: 50 },
        { stars: 3, count: 8, percentage: 35 },
        { stars: 2, count: 3, percentage: 20 },
        { stars: 1, count: 1, percentage: 5 }
      ]
    }
  },
  "marcels-modern-pantry-almond-unsweetened": {
    id: 2,
    name: "Marcel's Modern Pantry Almond Unsweetened",
    price: 14.99,
    originalPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
    sku: "ALM789",
    description: "Premium quality unsweetened almonds from Marcel's Modern Pantry.",
    detailedDescription: "Marcel's Modern Pantry brings you the finest quality unsweetened almonds, carefully selected and processed to maintain their natural goodness. Our almonds are sourced from sustainable farms and packed with essential nutrients.",
    images: [
      "/assets/images/thumbs/product-details-thumb1.png",
      "/assets/images/thumbs/product-details-thumb2.png",
    ],
    category: "grocery",
    stock: 32,
    brand: "Marcel's",
    specifications: [
      "Product Type: Nuts & Seeds",
      "Product Name: Unsweetened Almonds",
      "Brand: Marcel's Modern Pantry",
      "FSA Eligible: No",
      "Size/Count: 16oz",
      "Item Code: ALM789",
      "Ingredients: 100% Raw Almonds"
    ],
    nutritionFacts: [
      "Calories: 160",
      "Total Fat: 14g 18%",
      "Saturated Fat: 1g 5%",
      "Sodium: 0mg 0%",
      "Total Carbohydrate: 6g 2%"
    ],
    moreDetails: [
      "Rich in Vitamin E and antioxidants",
      "Excellent source of healthy fats",
      "No added sugar or preservatives",
      "Perfect for snacking and cooking"
    ],
    productReviews: [
      {
        id: 1,
        name: "Emily Chen",
        rating: 5,
        date: "2 Days ago",
        title: "Fresh and Crunchy",
        comment: "These almonds are so fresh and have the perfect crunch. Love that they're unsweetened and natural.",
        avatar: "/assets/images/thumbs/comment-img1.png"
      }
    ],
    ratingStats: {
      average: 4.8,
      total: 52,
      breakdown: [
        { stars: 5, count: 36, percentage: 70 },
        { stars: 4, count: 12, percentage: 50 },
        { stars: 3, count: 3, percentage: 35 },
        { stars: 2, count: 1, percentage: 20 },
        { stars: 1, count: 0, percentage: 5 }
      ]
    }
  },
  "o-organics-milk-whole-vitamin-d": {
    id: 3,
    name: "O Organics Milk, Whole, Vitamin D",
    price: 14.99,
    originalPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
    sku: "MILK456",
    description: "Fresh organic whole milk with Vitamin D.",
    detailedDescription: "O Organics Whole Milk with Vitamin D is sourced from cows raised on organic farms without the use of antibiotics or synthetic hormones. Our milk is rich, creamy, and packed with essential nutrients for your family's health.",
    images: [
      "/assets/images/thumbs/product-details-thumb1.png",
      "/assets/images/thumbs/product-details-thumb2.png",
    ],
    category: "dairy",
    stock: 25,
    brand: "O Organics",
    specifications: [
      "Product Type: Dairy",
      "Product Name: Whole Milk with Vitamin D",
      "Brand: O Organics",
      "FSA Eligible: Yes",
      "Size/Count: 1 Gallon",
      "Item Code: MILK456",
      "Ingredients: Organic Grade A Milk, Vitamin D3"
    ],
    nutritionFacts: [
      "Calories: 150",
      "Total Fat: 8g 10%",
      "Saturated Fat: 5g 25%",
      "Cholesterol: 35mg 12%",
      "Protein: 8g 16%"
    ],
    moreDetails: [
      "USDA Organic Certified",
      "No artificial growth hormones",
      "Excellent source of Calcium and Vitamin D",
      "From pasture-raised cows"
    ],
    productReviews: [
      {
        id: 1,
        name: "Michael Rodriguez",
        rating: 5,
        date: "5 Days ago",
        title: "Creamy and Delicious",
        comment: "This is the creamiest organic milk I've ever tasted. My whole family loves it!",
        avatar: "/assets/images/thumbs/comment-img1.png"
      }
    ],
    ratingStats: {
      average: 4.8,
      total: 89,
      breakdown: [
        { stars: 5, count: 62, percentage: 70 },
        { stars: 4, count: 20, percentage: 50 },
        { stars: 3, count: 5, percentage: 35 },
        { stars: 2, count: 2, percentage: 20 },
        { stars: 1, count: 0, percentage: 5 }
      ]
    }
  },
  "whole-grains-and-seeds-organic-bread": {
    id: 4,
    name: "Whole Grains and Seeds Organic Bread",
    price: 14.99,
    originalPrice: 28.99,
    rating: 4.8,
    reviews: "17k",
    sku: "BREAD123",
    description: "Healthy organic bread with whole grains and seeds.",
    detailedDescription: "Our Whole Grains and Seeds Organic Bread is baked fresh daily using traditional methods. Packed with nutritious whole grains, seeds, and organic ingredients, this bread offers both great taste and health benefits for your daily diet.",
    images: [
      "/assets/images/thumbs/product-details-thumb1.png",
      "/assets/images/thumbs/product-dumbs-thumb2.png",
    ],
    category: "bakery",
    stock: 18,
    brand: "Organic Bakery",
    specifications: [
      "Product Type: Bakery",
      "Product Name: Whole Grains & Seeds Bread",
      "Brand: Organic Bakery",
      "FSA Eligible: No",
      "Size/Count: 24oz",
      "Item Code: BREAD123",
      "Ingredients: Organic Whole Wheat Flour, Sunflower Seeds, Flax Seeds, Oats, Honey, Sea Salt"
    ],
    nutritionFacts: [
      "Calories: 110",
      "Total Fat: 2g 3%",
      "Saturated Fat: 0g 0%",
      "Sodium: 150mg 7%",
      "Total Carbohydrate: 20g 7%"
    ],
    moreDetails: [
      "Certified Organic ingredients",
      "No artificial preservatives",
      "Rich in fiber and protein",
      "Perfect for sandwiches and toast"
    ],
    productReviews: [
      {
        id: 1,
        name: "Jennifer Wilson",
        rating: 5,
        date: "1 Week ago",
        title: "Hearty and Nutritious",
        comment: "This bread has amazing texture with all the seeds and grains. It's become our family's favorite!",
        avatar: "/assets/images/thumbs/comment-img1.png"
      }
    ],
    ratingStats: {
      average: 4.8,
      total: 67,
      breakdown: [
        { stars: 5, count: 47, percentage: 70 },
        { stars: 4, count: 15, percentage: 50 },
        { stars: 3, count: 4, percentage: 35 },
        { stars: 2, count: 1, percentage: 20 },
        { stars: 1, count: 0, percentage: 5 }
      ]
    }
  }
};

const ProductDetailsOne = ({ productSlug }) => {
  // Product data fetch based on slug
  const product = productData[productSlug] || productData["c-500-antioxidant-protect-dietary-supplement"];

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const loadCountdown = async () => {
      const { getCountdown } = await import("../helper/Countdown");
      setTimeLeft(getCountdown());
    };
    loadCountdown();
    const interval = setInterval(() => {
      loadCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // increment & decrement
  const [quantity, setQuantity] = useState(1);
  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () =>
    setQuantity(quantity > 1 ? quantity - 1 : quantity);

  const [mainImage, setMainImage] = useState(product.images[0]);

  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  // Render stars based on rating
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={`text-15 fw-medium ${index < Math.floor(rating) ? 'text-warning-600' : 'text-gray-300'} d-flex`}>
        <i className='ph-fill ph-star' />
      </span>
    ));
  };

  return (
    <section className='product-details py-80'>
      <div className='container container-lg'>
        <div className='row gy-4'>
          <div className='col-lg-9'>
            <div className='row gy-4'>
              <div className='col-xl-6'>
                <div className='product-details__left'>
                  <div className='product-details__thumb-slider border border-gray-100 rounded-16'>
                    <div className=''>
                      <div className='product-details__thumb flex-center h-100'>
                        <img src={mainImage} alt={product.name} />
                      </div>
                    </div>
                  </div>
                  <div className='mt-24'>
                    <div className='product-details__images-slider'>
                      <Slider {...settingsThumbs}>
                        {product.images.map((image, index) => (
                          <div
                            className='center max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8'
                            key={index}
                            onClick={() => setMainImage(image)}
                          >
                            <img
                              className='thum'
                              src={image}
                              alt={`${product.name} thumbnail ${index}`}
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-6'>
                <div className='product-details__content'>
                  <h5 className='mb-12'>{product.name}</h5>
                  <div className='flex-align flex-wrap gap-12'>
                    <div className='flex-align gap-12 flex-wrap'>
                      <div className='flex-align gap-8'>
                        {renderStars(product.rating)}
                      </div>
                      <span className='text-sm fw-medium text-neutral-600'>
                        {product.rating} Star Rating
                      </span>
                      <span className='text-sm fw-medium text-gray-500'>
                        ({product.reviews})
                      </span>
                    </div>
                    <span className='text-sm fw-medium text-gray-500'>|</span>
                    <span className='text-gray-900'>
                      {" "}
                      <span className='text-gray-400'>SKU:</span>{product.sku}{" "}
                    </span>
                  </div>
                  <span className='mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block' />
                  <p className='text-gray-700'>
                    {product.description}
                  </p>
                  <div className='mt-32 flex-align flex-wrap gap-32'>
                    <div className='flex-align gap-8'>
                      <h4 className='mb-0'>${product.price}</h4>
                      <span className='text-md text-gray-500'>${product.originalPrice}</span>
                    </div>
                    <Link href='#' className='btn btn-main rounded-pill'>
                      Order App
                    </Link>
                  </div>
                  <span className='mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block' />
                  <div className='flex-align flex-wrap gap-16 bg-color-one rounded-8 py-16 px-24'>
                    <div className='flex-align gap-16'>
                      <span className='text-main-600 text-sm'>
                        Special Offer:
                      </span>
                    </div>
                    <div className='countdown' id='countdown11'>
                      <ul className='countdown-list flex-align flex-wrap'>
                        <li className='countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center'>
                          {timeLeft.days} <span className='days' />
                        </li>
                        <li className='countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center'>
                          {timeLeft.hours}
                          <span className='hours' />
                        </li>
                        <li className='countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center'>
                          {timeLeft.minutes}
                          <span className='minutes' />
                        </li>
                        <li className='countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center'>
                          {timeLeft.seconds}
                          <span className='seconds' />
                        </li>
                      </ul>
                    </div>
                    <span className='text-gray-900 text-xs'>
                      Remains untill the end of the offer
                    </span>
                  </div>
                  <div className='mb-24'>
                    <div className='mt-32 flex-align gap-12 mb-16'>
                      <span className='w-32 h-32 bg-white flex-center rounded-circle text-main-600 box-shadow-xl'>
                        <i className='ph-fill ph-lightning' />
                      </span>
                      <h6 className='text-md mb-0 fw-bold text-gray-900'>
                        Products are almost sold out
                      </h6>
                    </div>
                    <div
                      className='progress w-100 bg-gray-100 rounded-pill h-8'
                      role='progressbar'
                      aria-label='Basic example'
                      aria-valuenow={32}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className='progress-bar bg-main-two-600 rounded-pill'
                        style={{ width: "32%" }}
                      />
                    </div>
                    <span className='text-sm text-gray-700 mt-8'>
                      Available only: {product.stock}
                    </span>
                  </div>
                  <span className='text-gray-900 d-block mb-8'>Quantity:</span>
                  <div className='flex-between gap-16 flex-wrap'>
                    <div className='flex-align flex-wrap gap-16'>
                      <div className='border border-gray-100 rounded-pill py-9 px-16 flex-align'>
                        <button
                          onClick={decrementQuantity}
                          type='button'
                          className='quantity__minus p-4 text-gray-700 hover-text-main-600 flex-center'
                        >
                          <i className='ph ph-minus' />
                        </button>
                        <input
                          type='number'
                          className='quantity__input border-0 text-center w-32'
                          value={quantity}
                          readOnly
                        />
                        <button
                          onClick={incrementQuantity}
                          type='button'
                          className='quantity__plus p-4 text-gray-700 hover-text-main-600 flex-center'
                        >
                          <i className='ph ph-plus' />
                        </button>
                      </div>
                      <Link
                        href='#'
                        className='btn btn-main rounded-pill flex-align d-inline-flex gap-8 px-48'
                      >
                        {" "}
                        <i className='ph ph-shopping-cart' /> Add To Cart
                      </Link>
                    </div>
                    <div className='flex-align gap-12'>
                      <Link
                        href='#'
                        className='w-52 h-52 bg-main-50 text-main-600 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle'
                      >
                        <i className='ph ph-heart' />
                      </Link>
                      <Link
                        href='#'
                        className='w-52 h-52 bg-main-50 text-main-600 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle'
                      >
                        <i className='ph ph-shuffle' />
                      </Link>
                      <Link
                        href='#'
                        className='w-52 h-52 bg-main-50 text-main-600 text-xl hover-bg-main-600 hover-text-white flex-center rounded-circle'
                      >
                        <i className='ph ph-share-network' />
                      </Link>
                    </div>
                  </div>
                  <span className='mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block' />
                  <div className='flex-between gap-16 p-12 border border-main-two-600 border-dashed rounded-8 mb-16'>
                    <div className='flex-align gap-12'>
                      <button
                        type='button'
                        className='w-18 h-18 flex-center border border-gray-900 text-xs rounded-circle hover-bg-gray-100'
                      >
                        <i className='ph ph-plus' />
                      </button>
                      <span className='text-gray-900 fw-medium text-xs'>
                        Mfr. coupon. $3.00 off 5
                      </span>
                    </div>
                    <Link
                      href='/cart'
                      className='text-xs fw-semibold text-main-two-600 text-decoration-underline hover-text-main-two-700'
                    >
                      View Details
                    </Link>
                  </div>
                  <ul className='list-inside ms-12'>
                    <li className='text-gray-900 text-sm mb-8'>
                      Buy 1, Get 1 FREE
                    </li>
                    <li className='text-gray-900 text-sm mb-0'>
                      Buy 1, Get 1 FREE
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-3'>
            <div className='product-details__sidebar border border-gray-100 rounded-16 overflow-hidden'>
              <div className='p-24'>
                <div className='flex-between bg-main-600 rounded-pill p-8'>
                  <div className='flex-align gap-8'>
                    <span className='w-44 h-44 bg-white rounded-circle flex-center text-2xl'>
                      <i className='ph ph-storefront' />
                    </span>
                    <span className='text-white'>by {product.brand}</span>
                  </div>
                  <Link
                    href='/shop'
                    className='btn btn-white rounded-pill text-uppercase'
                  >
                    View Store
                  </Link>
                </div>
              </div>
              <div className='p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100'>
                <span className='w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0'>
                  <i className='ph-fill ph-truck' />
                </span>
                <div className=''>
                  <h6 className='text-sm mb-8'>Fast Delivery</h6>
                  <p className='text-gray-700'>
                    Lightning-fast shipping, guaranteed.
                  </p>
                </div>
              </div>
              <div className='p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100'>
                <span className='w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0'>
                  <i className='ph-fill ph-arrow-u-up-left' />
                </span>
                <div className=''>
                  <h6 className='text-sm mb-8'>Free 90-day returns</h6>
                  <p className='text-gray-700'>
                    Shop risk-free with easy returns.
                  </p>
                </div>
              </div>
              <div className='p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100'>
                <span className='w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0'>
                  <i className='ph-fill ph-check-circle' />
                </span>
                <div className=''>
                  <h6 className='text-sm mb-8'>
                    Pickup available at Shop location
                  </h6>
                  <p className='text-gray-700'>Usually ready in 24 hours</p>
                </div>
              </div>
              <div className='p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100'>
                <span className='w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0'>
                  <i className='ph-fill ph-credit-card' />
                </span>
                <div className=''>
                  <h6 className='text-sm mb-8'>Payment</h6>
                  <p className='text-gray-700'>
                    Payment upon receipt of goods, Payment by card in the
                    department, Google Pay, Online card.
                  </p>
                </div>
              </div>
              <div className='p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100'>
                <span className='w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0'>
                  <i className='ph-fill ph-check-circle' />
                </span>
                <div className=''>
                  <h6 className='text-sm mb-8'>Warranty</h6>
                  <p className='text-gray-700'>
                    The Consumer Protection Act does not provide for the return
                    of this product of proper quality.
                  </p>
                </div>
              </div>
              <div className='p-24 bg-color-one d-flex align-items-start gap-24 border-bottom border-gray-100'>
                <span className='w-44 h-44 bg-white text-main-600 rounded-circle flex-center text-2xl flex-shrink-0'>
                  <i className='ph-fill ph-package' />
                </span>
                <div className=''>
                  <h6 className='text-sm mb-8'>Packaging</h6>
                  <p className='text-gray-700'>
                    Research &amp; development value proposition graphical user
                    interface investor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='pt-80'>
          <div className='product-dContent border rounded-24'>
            <div className='product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16'>
              <ul
                className='nav common-tab nav-pills mb-3'
                id='pills-tab'
                role='tablist'
              >
                <li className='nav-item' role='presentation'>
                  <button
                    className='nav-link active'
                    id='pills-description-tab'
                    data-bs-toggle='pill'
                    data-bs-target='#pills-description'
                    type='button'
                    role='tab'
                    aria-controls='pills-description'
                    aria-selected='true'
                  >
                    Description
                  </button>
                </li>
                <li className='nav-item' role='presentation'>
                  <button
                    className='nav-link'
                    id='pills-reviews-tab'
                    data-bs-toggle='pill'
                    data-bs-target='#pills-reviews'
                    type='button'
                    role='tab'
                    aria-controls='pills-reviews'
                    aria-selected='false'
                  >
                    Reviews ({product.productReviews.length})
                  </button>
                </li>
              </ul>
              <Link
                href='#'
                className='btn bg-color-one rounded-16 flex-align gap-8 text-main-600 hover-bg-main-600 hover-text-white'
              >
                <img src='assets/images/icon/satisfaction-icon.png' alt='' />
                100% Satisfaction Guaranteed
              </Link>
            </div>
            <div className='product-dContent__box'>
              <div className='tab-content' id='pills-tabContent'>
                <div
                  className='tab-pane fade show active'
                  id='pills-description'
                  role='tabpanel'
                  aria-labelledby='pills-description-tab'
                  tabIndex={0}
                >
                  <div className='mb-40'>
                    <h6 className='mb-24'>Product Description</h6>
                    <p>
                      {product.detailedDescription}
                    </p>
                    <p>
                      Morbi ut sapien vitae odio accumsan gravida. Morbi vitae
                      erat auctor, eleifend nunc a, lobortis neque. Praesent
                      aliquam dignissim viverra. Maecenas lacus odio, feugiat eu
                      nunc sit amet, maximus sagittis dolor. Vivamus nisi
                      sapien, elementum sit amet eros sit amet, ultricies cursus
                      ipsum. Sed consequat luctus ligula. Curabitur laoreet
                      rhoncus blandit. Aenean vel diam ut arcu pharetra
                      dignissim ut sed leo. Vivamus faucibus, ipsum in
                      vestibulum vulputate, lorem orci convallis quam, sit amet
                      consequat nulla felis pharetra lacus. Duis semper erat
                      mauris, sed egestas purus commodo vel.
                    </p>
                    <ul className='list-inside mt-32 ms-16'>
                      {product.moreDetails.map((detail, index) => (
                        <li key={index} className='text-gray-400 mb-4'>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='mb-40'>
                    <h6 className='mb-24'>Product Specifications</h6>
                    <ul className='mt-32'>
                      {product.specifications.map((spec, index) => (
                        <li key={index} className='text-gray-400 mb-14 flex-align gap-14'>
                          <span className='w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle'>
                            <i className='ph ph-check' />
                          </span>
                          <span className='text-heading fw-medium'>
                            {spec.split(':')[0]}:
                            <span className='text-gray-500'>
                              {spec.split(':')[1]}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='mb-40'>
                    <h6 className='mb-24'>Nutrition Facts</h6>
                    <ul className='mt-32'>
                      {product.nutritionFacts.map((fact, index) => (
                        <li key={index} className='text-gray-400 mb-14 flex-align gap-14'>
                          <span className='w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle'>
                            <i className='ph ph-check' />
                          </span>
                          <span className='text-heading fw-medium'>
                            {fact}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className='mb-0'>
                    <h6 className='mb-24'>More Details</h6>
                    <ul className='mt-32'>
                      {product.moreDetails.map((detail, index) => (
                        <li key={index} className='text-gray-400 mb-14 flex-align gap-14'>
                          <span className='w-20 h-20 bg-main-50 text-main-600 text-xs flex-center rounded-circle'>
                            <i className='ph ph-check' />
                          </span>
                          <span className='text-gray-500'>
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div
                  className='tab-pane fade'
                  id='pills-reviews'
                  role='tabpanel'
                  aria-labelledby='pills-reviews-tab'
                  tabIndex={0}
                >
                  <div className='row g-4'>
                    <div className='col-lg-6'>
                      <h6 className='mb-24'>Customer Reviews</h6>
                      {product.productReviews.map((review) => (
                        <div key={review.id} className='d-flex align-items-start gap-24 pb-44 border-bottom border-gray-100 mb-44'>
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className='w-52 h-52 object-fit-cover rounded-circle flex-shrink-0'
                          />
                          <div className='flex-grow-1'>
                            <div className='flex-between align-items-start gap-8 '>
                              <div className=''>
                                <h6 className='mb-12 text-md'>{review.name}</h6>
                                <div className='flex-align gap-8'>
                                  {renderStars(review.rating)}
                                </div>
                              </div>
                              <span className='text-gray-800 text-xs'>
                                {review.date}
                              </span>
                            </div>
                            <h6 className='mb-14 text-md mt-24'>
                              {review.title}
                            </h6>
                            <p className='text-gray-700'>
                              {review.comment}
                            </p>
                            <div className='flex-align gap-20 mt-44'>
                              <button className='flex-align gap-12 text-gray-700 hover-text-main-600'>
                                <i className='ph-bold ph-thumbs-up' />
                                Like
                              </button>
                              <Link
                                href='#comment-form'
                                className='flex-align gap-12 text-gray-700 hover-text-main-600'
                              >
                                <i className='ph-bold ph-arrow-bend-up-left' />
                                Replay
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div className='mt-56'>
                        <div className=''>
                          <h6 className='mb-24'>Write a Review</h6>
                          <span className='text-heading mb-8'>
                            What is it like to Product?
                          </span>
                          <div className='flex-align gap-8'>
                            {renderStars(5)}
                          </div>
                        </div>
                        <div className='mt-32'>
                          <form action='#'>
                            <div className='mb-32'>
                              <label
                                htmlFor='title'
                                className='text-neutral-600 mb-8'
                              >
                                Review Title
                              </label>
                              <input
                                type='text'
                                className='common-input rounded-8'
                                id='title'
                                placeholder='Great Products'
                              />
                            </div>
                            <div className='mb-32'>
                              <label
                                htmlFor='desc'
                                className='text-neutral-600 mb-8'
                              >
                                Review Content
                              </label>
                              <textarea
                                className='common-input rounded-8'
                                id='desc'
                                placeholder='Share your experience with this product...'
                                rows={5}
                              />
                            </div>
                            <button
                              type='submit'
                              className='btn btn-main rounded-pill mt-48'
                            >
                              Submit Review
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className='col-lg-6'>
                      <div className='ms-xxl-5'>
                        <h6 className='mb-24'>Customers Feedback</h6>
                        <div className='d-flex flex-wrap gap-44'>
                          <div className='border border-gray-100 rounded-8 px-40 py-52 flex-center flex-column flex-shrink-0 text-center'>
                            <h2 className='mb-6 text-main-600'>{product.ratingStats.average}</h2>
                            <div className='flex-center gap-8'>
                              {renderStars(product.ratingStats.average)}
                            </div>
                            <span className='mt-16 text-gray-500'>
                              Average Product Rating
                            </span>
                          </div>
                          <div className='border border-gray-100 rounded-8 px-24 py-40 flex-grow-1'>
                            {product.ratingStats.breakdown.map((item, index) => (
                              <div key={index} className='flex-align gap-8 mb-20'>
                                <span className='text-gray-900 flex-shrink-0'>
                                  {item.stars}
                                </span>
                                <div
                                  className='progress w-100 bg-gray-100 rounded-pill h-8'
                                  role='progressbar'
                                  aria-label='Basic example'
                                  aria-valuenow={item.percentage}
                                  aria-valuemin={0}
                                  aria-valuemax={100}
                                >
                                  <div
                                    className='progress-bar bg-main-600 rounded-pill'
                                    style={{ width: `${item.percentage}%` }}
                                  />
                                </div>
                                <div className='flex-align gap-4'>
                                  {renderStars(item.stars)}
                                </div>
                                <span className='text-gray-900 flex-shrink-0'>
                                  {item.count}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsOne;