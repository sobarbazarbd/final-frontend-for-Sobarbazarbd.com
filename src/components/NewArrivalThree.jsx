"use client";

import React, { useState } from "react";
import Link from "next/link";

// Product card component to avoid repetition
const ProductCard = ({ product }) => {
  return (
    <div className='product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2'>
      <div className='product-card__thumb rounded-8 bg-gray-50 position-relative'>
        <Link
          href='/product-details-two'
          className='w-100 h-100 flex-center'
        >
          <img
            src={product.image}
            alt={product.name}
            className='w-auto max-w-unset'
          />
        </Link>
        <div className='position-absolute inset-block-start-0 inset-inline-start-0 mt-16 ms-16 z-1 d-flex flex-column gap-8'>
          <span className='text-main-two-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold'>
            -29%
          </span>
          <span className='text-neutral-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold'>
            HOT
          </span>
        </div>
        <div className='group bg-white p-2 rounded-pill z-1 position-absolute inset-inline-end-0 inset-block-start-0 me-16 mt-16 shadow-sm'>
          <button
            type='button'
            className='expand-btn w-40 h-40 text-md d-flex justify-content-center align-items-center rounded-circle hover-bg-main-two-600 hover-text-white'
          >
            <i className='ph ph-plus' />
          </button>
          <div className='expand-icons gap-20 my-20'>
            <button
              type='button'
              className='text-neutral-600 text-xl flex-center hover-text-main-two-600 wishlist-btn'
            >
              <i className='ph ph-heart' />
            </button>
            <button
              type='button'
              className='text-neutral-600 text-xl flex-center hover-text-main-two-600'
            >
              <i className='ph ph-eye' />
            </button>
            <button
              type='button'
              className='text-neutral-600 text-xl flex-center hover-text-main-two-600'
            >
              <i className='ph ph-shuffle' />
            </button>
          </div>
        </div>
      </div>
      <div className='product-card__content mt-16 w-100'>
        <h6 className='title text-lg fw-semibold my-16'>
          <Link
            href='/product-details-two'
            className='link text-line-2'
            tabIndex={0}
          >
            {product.name}
          </Link>
        </h6>
        <div className='flex-align gap-6'>
          <div className='flex-align gap-8'>
            {[...Array(5)].map((_, i) => (
              <span key={i} className='text-15 fw-medium text-warning-600 d-flex'>
                <i className='ph-fill ph-star' />
              </span>
            ))}
          </div>
          <span className='text-xs fw-medium text-gray-500'>
            4.8
          </span>
          <span className='text-xs fw-medium text-gray-500'>
            (12K)
          </span>
        </div>
        <span className='py-2 px-8 text-xs rounded-pill text-main-two-600 bg-main-two-50 mt-16'>
          Fulfilled by Marketpro
        </span>
        <div className='product-card__price mt-16 mb-30'>
          <span className='text-gray-400 text-md fw-semibold text-decoration-line-through'>
            TK{product.originalPrice}
          </span>
          <span className='text-heading text-md fw-semibold '>
            TK{product.discountedPrice}{" "}
            <span className='text-gray-500 fw-normal'>
              /Qty
            </span>{" "}
          </span>
        </div>
        <Link
          href='/cart'
          className='product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium'
          tabIndex={0}
        >
          Add To Cart <i className='ph ph-shopping-cart' />
        </Link>
      </div>
    </div>
  );
};

// Promo banner component
const PromoBanner = ({ promo }) => {
  return (
    <div className='rounded-24 overflow-hidden border border-main-two-600 p-16 bg-color-three h-100'>
      <div
        className='bg-img w-100 h-100 min-h-485 rounded-24 overflow-hidden'
        style={{
          backgroundImage: `url(${promo.image})`,
        }}
      >
        <div className='py-32 pe-32 text-end'>
          <span className='text-uppercase fw-semibold text-neutral-600 text-md'>
            {promo.subtitle}
          </span>
          <h5 className='mb-0'>{promo.title}</h5>
          <Link
            href='/shop'
            className='btn btn-black rounded-pill gap-8 mt-32 flex-align d-inline-flex'
            tabIndex={0}
          >
            Shop Now
            <span className='text-xl d-flex'>
              <i className='ph ph-shopping-cart-simple' />
            </span>
          </Link>
        </div>
        {promo.discountCircle && (
          <div className='bg-neutral-600 rounded-circle p-lg-5 p-md-4 p--24 max-w-260 max-h-260 w-100 h-100 ms-auto'>
            <div className='bg-white bg-opacity-10 w-100 h-100 rounded-circle d-flex justify-content-center align-items-center'>
              <h3 className='text-white mb-0 fw-medium'>
                45% <br /> Off
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NewArrivalThree = () => {
  // Sample data for products - now with all categories defined
  const productsData = {
    all: [
      {
        id: 1,
        name: "Instax Mini 12 Instant Film Camera - Green",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "28.99",
        discountedPrice: "14.99"
      },
      {
        id: 2,
        name: "Velvet Blossom Dress",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "28.99",
        discountedPrice: "14.99"
      },
      {
        id: 3,
        name: "Midnight Noir Leather Jacket",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "28.99",
        discountedPrice: "14.99"
      },
      {
        id: 4,
        name: "Oasis Linen Jumpsuit",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "28.99",
        discountedPrice: "14.99"
      },
      {
        id: 5,
        name: "Velvet Rose Clutch",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "28.99",
        discountedPrice: "14.99"
      },
      {
        id: 6,
        name: "Echoes of Elegance Trench Coat",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "28.99",
        discountedPrice: "14.99"
      }
    ],
    Jacket: [
      {
        id: 1,
        name: "Midnight Noir Leather Jacket",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "89.99",
        discountedPrice: "59.99"
      },
      {
        id: 2,
        name: "Classic Denim Jacket",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "49.99",
        discountedPrice: "34.99"
      },
      {
        id: 3,
        name: "Bomber Style Jacket",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "79.99",
        discountedPrice: "54.99"
      },
      {
        id: 4,
        name: "Winter Parka Jacket",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "129.99",
        discountedPrice: "89.99"
      },
      {
        id: 5,
        name: "Lightweight Windbreaker",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "39.99",
        discountedPrice: "29.99"
      },
      {
        id: 6,
        name: "Formal Blazer Jacket",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "99.99",
        discountedPrice: "69.99"
      }
    ],
    Shoes: [
      {
        id: 1,
        name: "Running Shoes",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "89.99",
        discountedPrice: "59.99"
      },
      {
        id: 2,
        name: "Casual Sneakers",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "69.99",
        discountedPrice: "49.99"
      },
      {
        id: 3,
        name: "Formal Leather Shoes",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "119.99",
        discountedPrice: "79.99"
      },
      {
        id: 4,
        name: "Hiking Boots",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "129.99",
        discountedPrice: "89.99"
      },
      {
        id: 5,
        name: "Sandals",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "39.99",
        discountedPrice: "29.99"
      },
      {
        id: 6,
        name: "Sports Shoes",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "79.99",
        discountedPrice: "54.99"
      }
    ],
    Hats: [
      {
        id: 1,
        name: "Baseball Cap",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "24.99",
        discountedPrice: "19.99"
      },
      {
        id: 2,
        name: "Beanie",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "19.99",
        discountedPrice: "14.99"
      },
      {
        id: 3,
        name: "Sun Hat",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "29.99",
        discountedPrice: "22.99"
      },
      {
        id: 4,
        name: "Bucket Hat",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "22.99",
        discountedPrice: "17.99"
      },
      {
        id: 5,
        name: "Fedora",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "34.99",
        discountedPrice: "24.99"
      },
      {
        id: 6,
        name: "Visor",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "18.99",
        discountedPrice: "14.99"
      }
    ],
    Goggles: [
      {
        id: 1,
        name: "Sunglasses",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "49.99",
        discountedPrice: "34.99"
      },
      {
        id: 2,
        name: "Swimming Goggles",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "29.99",
        discountedPrice: "19.99"
      },
      {
        id: 3,
        name: "Safety Goggles",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "24.99",
        discountedPrice: "17.99"
      },
      {
        id: 4,
        name: "Ski Goggles",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "69.99",
        discountedPrice: "49.99"
      },
      {
        id: 5,
        name: "VR Headset",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "199.99",
        discountedPrice: "149.99"
      },
      {
        id: 6,
        name: "Night Vision Goggles",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "299.99",
        discountedPrice: "249.99"
      }
    ],
    Bags: [
      {
        id: 1,
        name: "Backpack",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "59.99",
        discountedPrice: "39.99"
      },
      {
        id: 2,
        name: "Handbag",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "79.99",
        discountedPrice: "54.99"
      },
      {
        id: 3,
        name: "Travel Duffel",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "89.99",
        discountedPrice: "64.99"
      },
      {
        id: 4,
        name: "Laptop Bag",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "49.99",
        discountedPrice: "34.99"
      },
      {
        id: 5,
        name: "Crossbody Bag",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "44.99",
        discountedPrice: "29.99"
      },
      {
        id: 6,
        name: "Tote Bag",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "39.99",
        discountedPrice: "24.99"
      }
    ],
    Jeans: [
      {
        id: 1,
        name: "Slim Fit Jeans",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "59.99",
        discountedPrice: "39.99"
      },
      {
        id: 2,
        name: "Bootcut Jeans",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "54.99",
        discountedPrice: "37.99"
      },
      {
        id: 3,
        name: "Skinny Jeans",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "49.99",
        discountedPrice: "34.99"
      },
      {
        id: 4,
        name: "Relaxed Fit Jeans",
        image: "assets/images/thumbs/trending-three-img1.png",
        originalPrice: "64.99",
        discountedPrice: "44.99"
      },
      {
        id: 5,
        name: "Distressed Jeans",
        image: "assets/images/thumbs/trending-three-img2.png",
        originalPrice: "69.99",
        discountedPrice: "49.99"
      },
      {
        id: 6,
        name: "High-Waisted Jeans",
        image: "assets/images/thumbs/trending-three-img3.png",
        originalPrice: "59.99",
        discountedPrice: "39.99"
      }
    ]
  };

  // Promo data
  const promos = [
    {
      id: 1,
      image: "assets/images/thumbs/new-arrival-promo-img1.png",
      subtitle: "Summer offer",
      title: "Get 85% Off"
    },
    {
      id: 2,
      image: "assets/images/thumbs/new-arrival-promo-img2.png",
      subtitle: "Get extra discount on first order",
      title: "Spring Collection",
      discountCircle: true
    }
  ];

  // Tab data
  const tabs = [
    { id: "all", name: "All" },
    { id: "Jacket", name: "Jacket" },
    { id: "Shoes", name: "Shoes" },
    { id: "Hats", name: "Hats" },
    { id: "Goggles", name: "Goggles" },
    { id: "Bags", name: "Bags" },
    { id: "Jeans", name: "Jeans" }
  ];

  const [activeTab, setActiveTab] = useState("all");

  return (
    <section className='new-arrival-three py-120 overflow-hidden'>
      <div className='container container-lg'>
        <div className='section-heading text-center '>
          <h5 className='mb-0 text-uppercase '>New Arrivals</h5>
        </div>
        <ul
          className='nav common-tab style-two nav-pills justify-content-center mb-40 '
          id='pills-tabThree'
          role='tablist'
        >
          {tabs.map((tab) => (
            <li key={tab.id} className='nav-item' role='presentation'>
              <button
                className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                id={`pills-${tab.id}-tab`}
                data-bs-toggle='pill'
                data-bs-target={`#pills-${tab.id}`}
                type='button'
                role='tab'
                aria-controls={`pills-${tab.id}`}
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
        <div className='tab-content' id='pills-tabContentThree'>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab-pane fade ${activeTab === tab.id ? 'show active' : ''}`}
              id={`pills-${tab.id}`}
              role='tabpanel'
              aria-labelledby={`pills-${tab.id}-tab`}
              tabIndex={0}
            >
              <div className='new-arrival-three-wrapper'>
                <div className='row gy-4'>
                  <div className='col-xl-4'>
                    <PromoBanner promo={promos[0]} />
                  </div>
                  <div className='col-xl-8'>
                    <div className='row gy-4'>
                      {productsData[tab.id]?.slice(0, 3).map(product => (
                        <div key={product.id} className='col-lg-4 col-sm-6'>
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='mt-24'>
                  <div className='row gy-4'>
                    <div className='col-xl-8'>
                      <div className='row gy-4'>
                        {productsData[tab.id]?.slice(3, 6).map(product => (
                          <div key={product.id} className='col-lg-4 col-sm-6'>
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='col-xl-4'>
                      <PromoBanner promo={promos[1]} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalThree;