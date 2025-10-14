import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FooterTwo from "@/components/FooterTwo";
import HeaderTwo from "@/components/HeaderTwo";
import ShippingTwo from "@/components/ShippingTwo";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";
import Link from "next/link";

// 🔹 Demo products
const demoProducts = [
  { id: 1, name: "Organic Broccoli", price: "$12.00", image: "/assets/images/thumbs/product1.png", category: "vegetables", badge: "Sale 50%", rating: 4.8, reviews: "17k", sold: "18/35", originalPrice: "$28.99" },
  { id: 2, name: "Chicken Breast", price: "$18.99", image: "/assets/images/thumbs/product2.png", category: "fish-meats", badge: "New", rating: 4.5, reviews: "12k", sold: "22/40", originalPrice: "$24.99" },
  { id: 3, name: "Chocolate Cake", price: "$25.00", image: "/assets/images/thumbs/product3.png", category: "desserts", badge: "Best seller", rating: 4.9, reviews: "8k", sold: "15/30", originalPrice: "$35.00" },
  { id: 4, name: "Apple Juice", price: "$8.50", image: "/assets/images/thumbs/product4.png", category: "drinks-juice", badge: "Hot", rating: 4.7, reviews: "5k", sold: "28/50", originalPrice: "$12.00" },
  { id: 5, name: "Dog Food", price: "$14.00", image: "/assets/images/thumbs/product5.png", category: "animals-food", badge: "Sale 20%", rating: 4.6, reviews: "3k", sold: "12/25", originalPrice: "$17.50" },
  { id: 6, name: "Fresh Mango", price: "$11.00", image: "/assets/images/thumbs/product6.png", category: "fresh-fruits", badge: "New", rating: 4.8, reviews: "9k", sold: "35/60", originalPrice: "$15.00" },
  { id: 7, name: "Candy Mix", price: "$6.50", image: "/assets/images/thumbs/product7.png", category: "yummy-candy", badge: "Best seller", rating: 4.3, reviews: "7k", sold: "20/45", originalPrice: "$9.00" },
  { id: 8, name: "Egg Tray", price: "$10.00", image: "/assets/images/thumbs/product8.png", category: "dairy-eggs", badge: "Hot", rating: 4.4, reviews: "4k", sold: "25/35", originalPrice: "$13.00" },
];

const CategoryPage = ({ params }) => {
  const { slug } = params;

  const filteredProducts = demoProducts.filter((p) => p.category === slug);

  return (
    <>
      <ScrollToTopInit color="#FA6400" />
      <Breadcrumb title={slug.replace(/-/g, " ")} />

      {/* ShopSection এর exact design */}
      <section className='shop py-80'>
        <div className='container container-lg'>
          <div className='row'>
            {/* Content Start - Full width without sidebar */}
            <div className='col-lg-12'>
              {/* Top Bar - Exact same as ShopSection */}
              <div className='flex-between gap-16 flex-wrap mb-40'>
                <span className='text-gray-900'>Showing 1-{filteredProducts.length} of {filteredProducts.length} results</span>
                <div className='position-relative flex-align gap-16 flex-wrap'>
                  <div className='list-grid-btns flex-align gap-16'>
                    <button
                      type='button'
                      className='w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100'
                    >
                      <i className='ph-bold ph-list-dashes' />
                    </button>
                    <button
                      type='button'
                      className='w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 border-main-600 text-white bg-main-600'
                    >
                      <i className='ph ph-squares-four' />
                    </button>
                  </div>
                  <div className='position-relative text-gray-500 flex-align gap-4 text-14'>
                    <label htmlFor='sorting' className='text-inherit flex-shrink-0'>
                      Sort by:{" "}
                    </label>
                    <select
                      defaultValue={1}
                      className='form-control common-input px-14 py-14 text-inherit rounded-6 w-auto'
                      id='sorting'
                    >
                      <option value={1}>Popular</option>
                      <option value={2}>Latest</option>
                      <option value={3}>Trending</option>
                      <option value={4}>Matches</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Top Bar End */}

              {/* Products Grid - Exact same structure as ShopSection */}
              <div className='list-grid-wrapper'>
                <div className="row g-4">
                  {filteredProducts.length === 0 ? (
                    <div className="col-12">
                      <div className="text-center py-5">
                        <p className="text-muted">No products found for this category.</p>
                      </div>
                    </div>
                  ) : (
                    filteredProducts.map((product) => (
                      <div key={product.id} className="col-6 col-md-4 col-lg-3">
                        <div className='product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2'>
                          <Link
                            href={`/product/${product.id}`}
                            className='product-card__thumb flex-center rounded-8 bg-gray-50 position-relative'
                            style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className='w-auto max-w-unset'
                              style={{ maxHeight: '150px', objectFit: 'contain' }}
                            />
                            {product.badge && (
                              <span className={`product-card__badge px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0 ${
                                product.badge.includes('Sale') ? 'bg-danger-600' : 
                                product.badge.includes('New') ? 'bg-warning-600' : 
                                product.badge.includes('Best') ? 'bg-primary-600' : 'bg-success-600'
                              }`}>
                                {product.badge}
                              </span>
                            )}
                          </Link>
                          
                          <div className='product-card__content mt-16'>
                            <h6 className='title text-lg fw-semibold mt-12 mb-8'>
                              <Link
                                href={`/product/${product.id}`}
                                className='link text-line-2'
                              >
                                {product.name}
                              </Link>
                            </h6>
                            
                            {/* Rating Section */}
                            <div className='flex-align mb-20 mt-16 gap-6'>
                              <span className='text-xs fw-medium text-gray-500'>{product.rating}</span>
                              <span className='text-15 fw-medium text-warning-600 d-flex'>
                                <i className='ph-fill ph-star' />
                              </span>
                              <span className='text-xs fw-medium text-gray-500'>
                                ({product.reviews})
                              </span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className='mt-8'>
                              <div
                                className='progress w-100 bg-color-three rounded-pill h-4'
                                role='progressbar'
                              >
                                <div
                                  className='progress-bar bg-main-two-600 rounded-pill'
                                  style={{ width: "35%" }}
                                />
                              </div>
                              <span className='text-gray-900 text-xs fw-medium mt-8'>
                                Sold: {product.sold}
                              </span>
                            </div>
                            
                            {/* Price Section */}
                            <div className='product-card__price my-20'>
                              <span className='text-gray-400 text-md fw-semibold text-decoration-line-through'>
                                {product.originalPrice}
                              </span>
                              <span className='text-heading text-md fw-semibold'>
                                {product.price}{" "}
                                <span className='text-gray-500 fw-normal'>/Qty</span>
                              </span>
                            </div>
                            
                            {/* Add to Cart Button */}
                            <Link
                              href='/cart'
                              className='product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium w-100'
                            >
                              Add To Cart <i className='ph ph-shopping-cart' />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Pagination - Exact same as ShopSection */}
              {filteredProducts.length > 0 && (
                <ul className='pagination flex-center flex-wrap gap-16 mt-40'>
                  <li className='page-item'>
                    <Link
                      className='page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100'
                      href='#'
                    >
                      <i className='ph-bold ph-arrow-left' />
                    </Link>
                  </li>
                  <li className='page-item active'>
                    <Link
                      className='page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100'
                      href='#'
                    >
                      01
                    </Link>
                  </li>
                  <li className='page-item'>
                    <Link
                      className='page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100'
                      href='#'
                    >
                      02
                    </Link>
                  </li>
                  <li className='page-item'>
                    <Link
                      className='page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100'
                      href='#'
                    >
                      03
                    </Link>
                  </li>
                  <li className='page-item'>
                    <Link
                      className='page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100'
                      href='#'
                    >
                      <i className='ph-bold ph-arrow-right' />
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      
    </>
  );
};

export default CategoryPage;