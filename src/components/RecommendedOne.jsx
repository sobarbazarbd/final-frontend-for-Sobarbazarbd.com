"use client";

import React, { useEffect } from "react";
import Link from "next/link";

const RecommendedOne = () => {
  // Product data array
  const products = [
    {
      id: 1,
      name: "C-500 Antioxidant Protect Dietary Supplement",
      image: "/assets/images/thumbs/product-img7.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: null,
      category: "all"
    },
    {
      id: 2,
      name: "Marcel's Modern Pantry Almond Unsweetened",
      image: "/assets/images/thumbs/product-img8.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: { type: "danger", text: "Sale 50%" },
      category: "grocery"
    },
    {
      id: 3,
      name: "O Organics Milk, Whole, Vitamin D",
      image: "/assets/images/thumbs/product-img9.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: { type: "danger", text: "Sale 50%" },
      category: "grocery"
    },
    {
      id: 4,
      name: "Whole Grains and Seeds Organic Bread",
      image: "/assets/images/thumbs/product-img10.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: { type: "info", text: "Best Sale" },
      category: "organic"
    },
    {
      id: 5,
      name: "Lucerne Yogurt, Lowfat, Strawberry",
      image: "/assets/images/thumbs/product-img11.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: null,
      category: "grocery"
    },
    {
      id: 6,
      name: "Nature Valley Whole Grain Oats and Honey Protein",
      image: "/assets/images/thumbs/product-img12.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: { type: "danger", text: "Sale 50%" },
      category: "snacks"
    },
    {
      id: 7,
      name: "C-500 Antioxidant Protect Dietary Supplement",
      image: "/assets/images/thumbs/product-img13.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: null,
      category: "all"
    },
    {
      id: 8,
      name: "C-500 Antioxidant Protect Dietary Supplement",
      image: "/assets/images/thumbs/product-img14.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: { type: "danger", text: "Sale 50%" },
      category: "all"
    },
    {
      id: 9,
      name: "C-500 Antioxidant Protect Dietary Supplement",
      image: "/assets/images/thumbs/product-img15.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: { type: "warning", text: "New" },
      category: "all"
    },
    {
      id: 10,
      name: "Good & Gather Farmed Atlantic Salmon",
      image: "/assets/images/thumbs/product-img16.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: { type: "danger", text: "Sale 50%" },
      category: "grocery"
    },
    {
      id: 11,
      name: "Market Pantry 41/50 Raw Tail-Off Large Raw Shrimp",
      image: "/assets/images/thumbs/product-img17.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: { type: "danger", text: "Sale 50%" },
      category: "grocery"
    },
    {
      id: 12,
      name: "Tropicana 100% Juice, Orange, No Pulp",
      image: "/assets/images/thumbs/product-img18.png",
      price: 14.99,
      originalPrice: 28.99,
      rating: 4.8,
      reviews: "17k",
      badge: { type: "warning", text: "New" },
      category: "juices"
    },
  ];

  // Tab categories
  const categories = [
    { id: "all", name: "All" },
    { id: "grocery", name: "Grocery" },
    { id: "fruits", name: "Fruits" },
    { id: "juices", name: "Juices" },
    { id: "vegetables", name: "Vegetables" },
    { id: "snacks", name: "Snacks" },
    { id: "organic", name: "Organic Foods" },
  ];

  // Filter products by category
  const filterProductsByCategory = (categoryId) => {
    if (categoryId === "all") return products;
    return products.filter(product => product.category === categoryId);
  };

  // Product card component
  const ProductCard = ({ product }) => (
    <div className="col-xxl-2 col-lg-3 col-sm-4 col-6">
      <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
        {product.badge && (
          <span className={`product-card__badge bg-${product.badge.type}-600 px-8 py-4 text-sm text-white`}>
            {product.badge.text}
          </span>
        )}
        <Link href="/product-details" className="product-card__thumb flex-center">
          <img src={product.image} alt={product.name} />
        </Link>
        <div className="product-card__content p-sm-2">
          <h6 className="title text-lg fw-semibold mt-12 mb-8">
            <Link href="/product-details" className="link text-line-2">
              {product.name}
            </Link>
          </h6>
          <div className="flex-align gap-4">
            <span className="text-main-600 text-md d-flex">
              <i className="ph-fill ph-storefront" />
            </span>
            <span className="text-gray-500 text-xs">By Lucky Supermarket</span>
          </div>
          <div className="product-card__content mt-12">
            <div className="product-card__price mb-8">
              <span className="text-heading text-md fw-semibold">
                ${product.price}{" "}
                <span className="text-gray-500 fw-normal">/Qty</span>{" "}
              </span>
              <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                ${product.originalPrice}
              </span>
            </div>
            <div className="flex-align gap-6">
              <span className="text-xs fw-bold text-gray-600">{product.rating}</span>
              <span className="text-15 fw-bold text-warning-600 d-flex">
                <i className="ph-fill ph-star" />
              </span>
              <span className="text-xs fw-bold text-gray-600">({product.reviews})</span>
            </div>
            <Link
              href="/cart"
              className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center"
            >
              Add To Cart <i className="ph ph-shopping-cart" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // Load Bootstrap JavaScript
  useEffect(() => {
    // This ensures Bootstrap's JavaScript is loaded for the tabs to work
    if (typeof window !== 'undefined') {
      // Import Bootstrap JavaScript
      import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <section className="recommended">
      <div className="container container-lg">
        <div className="section-heading flex-between flex-wrap gap-16">
          <h5 className="mb-0">Recommended for you</h5>
          <ul className="nav common-tab nav-pills" id="pills-tab" role="tablist">
            {categories.map((category, index) => (
              <li key={category.id} className="nav-item" role="presentation">
                <button
                  className={`nav-link ${index === 0 ? "active" : ""}`}
                  id={`pills-${category.id}-tab`}
                  data-bs-toggle="pill"
                  data-bs-target={`#pills-${category.id}`}
                  type="button"
                  role="tab"
                  aria-controls={`pills-${category.id}`}
                  aria-selected={index === 0}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="tab-content" id="pills-tabContent">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
              id={`pills-${category.id}`}
              role="tabpanel"
              aria-labelledby={`pills-${category.id}-tab`}
              tabIndex={0}
            >
              <div className="row g-12">
                {filterProductsByCategory(category.id).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedOne;