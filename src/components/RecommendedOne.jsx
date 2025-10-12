"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RecommendedOne = () => {
  const router = useRouter();
  
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
      category: "supplements",
      slug: "c-500-antioxidant-protect-dietary-supplement"
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
      category: "grocery",
      slug: "marcels-modern-pantry-almond-unsweetened"
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
      category: "dairy",
      slug: "o-organics-milk-whole-vitamin-d"
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
      category: "bakery",
      slug: "whole-grains-and-seeds-organic-bread"
    }
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

  // Handle product click
  const handleProductClick = (product) => {
    // Navigate to product details page
    router.push(`/product/${product.slug}`);
  };

  // Handle category filter
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Product card component
  const ProductCard = ({ product }) => (
    <div className="col-xxl-2 col-lg-3 col-sm-4 col-6">
      <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
        {product.badge && (
          <span className={`product-card__badge bg-${product.badge.type}-600 px-8 py-4 text-sm text-white`}>
            {product.badge.text}
          </span>
        )}
        <div 
          className="product-card__thumb flex-center cursor-pointer"
          onClick={() => handleProductClick(product)}
          style={{ cursor: 'pointer', height: '200px' }}
        >
          <img src={product.image} alt={product.name} style={{ maxHeight: '150px', objectFit: 'contain' }} />
        </div>
        <div className="product-card__content p-sm-2">
          <h6 className="title text-lg fw-semibold mt-12 mb-8">
            <div 
              className="link text-line-2 cursor-pointer"
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              {product.name}
            </div>
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
            <div 
              className="product-card__cart btn bg-main-50 text-main-600 hover-bg-main-600 hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              Add To Cart <i className="ph ph-shopping-cart" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="recommended">
      <div className="container container-lg">
        <div className="section-heading flex-between flex-wrap gap-16">
          <h5 className="mb-0">Recommended for you</h5>
          <ul className="nav common-tab nav-pills" id="pills-tab" role="tablist">
            {categories.map((category, index) => (
              <li key={category.id} className="nav-item" role="presentation">
                <button
                  className={`nav-link ${activeCategory === category.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                  type="button"
                  role="tab"
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="tab-content" id="pills-tabContent">
          <div className="tab-pane fade show active">
            <div className="row g-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedOne;