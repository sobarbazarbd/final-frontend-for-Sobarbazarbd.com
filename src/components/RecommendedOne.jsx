"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

const RecommendedOne = ({ data = [] }) => {
  const router = useRouter();
  const [activeSubCategory, setActiveSubCategory] = useState("all");

  // ✅ 1. Extract unique subcategories from all products
  const subcategories = useMemo(() => {
    const subs = [];
    data.forEach((product) => {
      product.subcategories?.forEach((sub) => {
        if (sub && !subs.find((s) => s.id === sub.id)) {
          subs.push(sub);
        }
      });
    });
    return subs;
  }, [data]);

  // ✅ 2. Dynamic filtering based on selected subcategory
  const filteredProducts = useMemo(() => {
    if (activeSubCategory === "all") return data;
    return data.filter((product) =>
      product.subcategories?.some((sub) => sub.id === activeSubCategory)
    );
  }, [data, activeSubCategory]);

  const handleProductClick = (product) => {
    router.push(`/shop/${product.id}`);
  };

  // ✅ Product Card Component
  const ProductCard = ({ product }) => {
    const { name, brand, default_variant, images, store } = product;

    const imageUrl =
      images?.[0]?.image ||
      "https://via.placeholder.com/200x200?text=No+Image";

    const price = default_variant?.final_price ?? default_variant?.price ?? 0;

    // Dummy placeholders
    const rating = product.rating ?? 4.5;
    const reviews = product.reviews ?? 32;
    const originalPrice = product.originalPrice ?? price + 10;

    return (
      <div className="col-xxl-2 col-lg-3 col-sm-4 col-6">
        <div className="product-card h-100 p-8 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
          <div
            className="product-card__thumb flex-center cursor-pointer"
            onClick={() => handleProductClick(product)}
            style={{ cursor: "pointer", height: "200px" }}
          >
            <img
              src={imageUrl}
              alt={name}
              style={{ maxHeight: "150px", objectFit: "contain" }}
            />
          </div>
          <div className="product-card__content p-sm-2">
            <h6 className="title text-lg fw-semibold mt-12 mb-8">
              <div
                className="link text-line-2 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                {name}
              </div>
            </h6>
            <div className="flex-align gap-4">
              <span className="text-main-600 text-md d-flex">
                <i className="ph-fill ph-storefront" />
              </span>
              <span className="text-gray-500 text-xs">
                By {store?.name || "Unknown Store"}
              </span>
            </div>
            <div className="product-card__content mt-12">
              <div className="product-card__price mb-8">
                <span className="text-heading text-md fw-semibold">
                  ${price}{" "}
                  <span className="text-gray-500 fw-normal">/Qty</span>
                </span>
                <span className="text-gray-400 text-md fw-semibold text-decoration-line-through ms-2">
                  ${originalPrice}
                </span>
              </div>
              <div className="flex-align gap-6">
                <span className="text-xs fw-bold text-gray-600">{rating}</span>
                <span className="text-15 fw-bold text-warning-600 d-flex">
                  <i className="ph-fill ph-star" />
                </span>
                <span className="text-xs fw-bold text-gray-600">
                  ({reviews})
                </span>
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
  };

  return (
    <section className="recommended">
      <div className="container container-lg">
        <div className="section-heading flex-between flex-wrap gap-16">
          <h5 className="mb-0">Recommended for you</h5>
          <ul className="nav common-tab nav-pills" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${activeSubCategory === "all" ? "active" : ""}`}
                onClick={() => setActiveSubCategory("all")}
                type="button"
              >
                All
              </button>
            </li>
            {subcategories.map((sub) => (
              <li key={sub.id} className="nav-item" role="presentation">
                <button
                  className={`nav-link ${
                    activeSubCategory === sub.id ? "active" : ""
                  }`}
                  onClick={() => setActiveSubCategory(sub.id)}
                  type="button"
                >
                  {sub.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tab-content mt-4" id="pills-tabContent">
          <div className="tab-pane fade show active">
            <div className="row g-12">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="text-center w-100 py-5 text-gray-500">
                  No products available in this subcategory.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedOne;
