"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  // Use actual product data from props
  const productImage = product.images?.[0]?.image || "/default-image.png";
  const productName = product.name || "Product Name";
  const productPrice = product.default_variant?.final_price || 0;
  const originalPrice = product.default_variant?.price || productPrice;
  const hasDiscount = product.default_variant?.discount !== null;

  return (
    <div className='product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2'>
      <div className='product-card__thumb rounded-8 bg-gray-50 position-relative'>
        <Link
          href='/product-details-two'
          className='w-100 h-100 flex-center'
        >
          <img
            src={productImage}
            alt={productName}
            className='w-auto max-w-unset'
          />
        </Link>
        <div className='position-absolute inset-block-start-0 inset-inline-start-0 mt-16 ms-16 z-1 d-flex flex-column gap-8'>
          {hasDiscount && (
            <span className='text-main-two-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold'>
              -29%
            </span>
          )}
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
            {productName}
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
            TK{originalPrice}
          </span>
          <span className='text-heading text-md fw-semibold '>
            TK{productPrice}{" "}
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

const PromoBanner = ({ promo }) => {
  // Keep promo as is for later implementation
  const promoData = promo ||  {
      id: 1,
      image: "/assets/images/thumbs/new-arrival-promo-img1.png",
      subtitle: "Summer offer",
      title: "Get 85% Off"
    }

  return (
    <div className='rounded-24 overflow-hidden border border-main-two-600 p-16 bg-color-three h-100'>
      <div
        className='bg-img w-100 h-100 min-h-485 rounded-24 overflow-hidden'
        style={{
          backgroundImage: `url(${promoData.image})`,
        }}
      >
        <div className='py-32 pe-32 text-end'>
          <span className='text-uppercase fw-semibold text-neutral-600 text-md'>
            {promoData.subtitle}
          </span>
          <h5 className='mb-0'>{promoData.title}</h5>
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
        {promoData.discountCircle && (
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

const NewArrivalThree = ({ data = [] }) => {
  // Dynamically extract unique subcategories from products
  const subcategories = useMemo(() => {
    const allSubcategories = data.flatMap(product => 
      product.subcategories?.filter(sub => sub.is_active) || []
    );
    
    // Remove duplicates based on subcategory id
    const uniqueSubcategories = allSubcategories.reduce((acc, current) => {
      const exists = acc.find(item => item.id === current.id);
      if (!exists) {
        acc.push(current);
      }
      return acc;
    }, []);

    return uniqueSubcategories;
  }, [data]);

  // Create tabs from subcategories + "All" tab
  const tabs = useMemo(() => {
    const allTab = { id: "all", name: "All" };
    const subcategoryTabs = subcategories.map(sub => ({
      id: `subcategory-${sub.id}`,
      name: sub.name
    }));
    return [allTab, ...subcategoryTabs];
  }, [subcategories]);

  const [activeTab, setActiveTab] = useState("all");

  // Filter products based on active tab
  const filteredProducts = useMemo(() => {
    if (activeTab === "all") {
      return data;
    }
    
    const subcategoryId = parseInt(activeTab.replace('subcategory-', ''));
    return data.filter(product => 
      product.subcategories?.some(sub => sub.id === subcategoryId && sub.is_active)
    );
  }, [activeTab, data]);

  // Slice products into chunks of 3 for layout
  const firstThreeProducts = filteredProducts.slice(0, 3);
  const nextThreeProducts = filteredProducts.slice(3, 6);

  // Dummy promo data (keep as is for later implementation)
   const promos = [
    {
      id: 1,
      image: "/assets/images/thumbs/new-arrival-promo-img1.png",
      subtitle: "Summer offer",
      title: "Get 85% Off"
    },
    {
      id: 2,
      image: "/assets/images/thumbs/new-arrival-promo-img2.png",
      subtitle: "Get extra discount on first order",
      title: "Spring Collection",
      discountCircle: true
    }
  ];

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
                      {firstThreeProducts.map(product => (
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
                        {nextThreeProducts.map(product => (
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