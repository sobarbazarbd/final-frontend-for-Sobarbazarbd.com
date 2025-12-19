"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

export const ProductCard = ({ product, color = "main-600", badgeColors }) => {
  const router = useRouter();
  const { addToCart, refreshCart } = useCart
    ? useCart()
    : { addToCart: () => {}, refreshCart: () => {} };
  const [addingId, setAddingId] = useState(null);

  const { name, brand, default_variant, images, store, badge } = product;
  const imageUrl =
    images?.[0]?.image || "https://via.placeholder.com/200x200?text=No+Image";
  const rating = product.rating ?? 4.5;
  const reviews = product.reviews ?? 32;
 
  const handleProductClick = () => {
    router.push(`/shop/${product.id}`);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    if (!default_variant?.id) {
      toast.error("No variant available for this product.");
      return;
    }
    setAddingId(product.id);
    const result = await addToCart(default_variant.id, 1);
    setAddingId(null);
    if (result.success) {
      refreshCart();
      toast.success(
        <span>
          Added to cart!{" "}
          <button
            style={{
              color: "#FA6400",
              textDecoration: "underline",
              background: "none",
              border: "none",
              cursor: "pointer",
              marginLeft: 8,
              fontWeight: 500,
            }}
            onClick={() => router.push("/cart")}
          >
            View Cart
          </button>
        </span>,
        { duration: 4000 }
      );
    } else {
      toast.error(result.error || "Failed to add to cart");
    }
  };

  // Badge color logic
  let badgeText = badge || product.badgeText;
  let badgeClass =
    badgeColors?.[badgeText] ||
    badgeColors?.[badgeText?.toLowerCase()] ||
    badgeColors?.Default ||
    "bg-main-600";

  // Price display logic
  const hasDiscount =
    default_variant &&
    typeof default_variant.price === "number" &&
    typeof default_variant.final_price === "number" &&
    default_variant.final_price < default_variant.price;

  return (
    <div className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
      <div
        className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative cursor-pointer"
        onClick={handleProductClick}
        style={{ cursor: "pointer", height: "200px" }}
      >
        {badgeText && (
          <span
            className={`product-card__badge ${badgeClass} px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0`}
          >
            {badgeText}
          </span>
        )}
        <img
          src={imageUrl}
          alt={name}
          className="w-auto max-w-unset"
          style={{ maxHeight: "150px", objectFit: "contain" }}
        />
      </div>
      <div className="product-card__content mt-16">
        <div className="flex-align gap-6">
          <span className="text-xs fw-medium text-gray-500">{rating}</span>
          <span className="text-15 fw-medium text-warning-600 d-flex">
            <i className="ph-fill ph-star" />
          </span>
          <span className="text-xs fw-medium text-gray-500">
            ({reviews})
          </span>
        </div>
        <h6 className="title text-lg fw-semibold mt-12 mb-8">
          <div
            className="link text-line-2 cursor-pointer"
            onClick={handleProductClick}
          >
            {name}
          </div>
        </h6>
        <div className="flex-align gap-4">
          <span className={`text-${color} text-md d-flex`}>
            <i className="ph-fill ph-storefront" />
          </span>
          <span className="text-gray-500 text-xs">
            By {store?.name || "Unknown Store"}
          </span>
        </div>
        <div className="product-card__price my-20">
          {hasDiscount && (
            <span className="text-gray-400 text-md fw-semibold text-decoration-line-through me-2">
              ৳{default_variant.price}
            </span>
          )}
          <span className="text-heading text-md fw-semibold ">
            ৳{default_variant?.final_price ?? default_variant?.price ?? "-"}
            <span className="text-gray-500 fw-normal">/Qty</span>{" "}
          </span>
        </div>
        <div
          className={`product-card__cart btn bg-main-50 text-${color} hover-bg-${color} hover-text-white py-11 px-24 rounded-pill flex-align gap-8 mt-24 w-100 justify-content-center cursor-pointer`}
          onClick={handleAddToCart}
          style={{
            pointerEvents: addingId === product.id ? "none" : "auto",
            opacity: addingId === product.id ? 0.7 : 1,
          }}
        >
          {addingId === product.id ? (
            "Adding..."
          ) : (
            <>
              Add To Cart <i className="ph ph-shopping-cart" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductTabSection = ({
  sectionTitle = "Trending Products",
  categories = [],
  data = [],
  color = "main-600",
  badgeColors = {
    "Best Seller": "bg-tertiary-600",
    "New": "bg-warning-600",
    "Sale": "bg-danger-600",
    "Sold": "bg-success-600",
    "Default": "bg-main-600"
  },
  tabClassName = "common-tab nav-pills",
}) => {
  const router = useRouter();
  
  // All ট্যাবকে ডিফল্ট হিসেবে সেট করুন
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Filtered products with useMemo
  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") {
      return data; // All ট্যাবের জন্য সব প্রোডাক্ট
    }
    
    // নির্দিষ্ট ক্যাটাগরির প্রোডাক্ট ফিল্টার করুন
    return data.filter((product) => {
      // যদি product.categories array থাকে
      if (Array.isArray(product.categories)) {
        return product.categories.some(cat => cat.id === activeCategory);
      }
      
      // যদি product.category_id থাকে
      if (product.category_id) {
        return product.category_id === activeCategory;
      }
      
      // যদি product.subcategories array থাকে
      if (Array.isArray(product.subcategories)) {
        return product.subcategories.some(sub => sub.id === activeCategory);
      }
      
      // যদি product.subcategory_id থাকে
      if (product.subcategory_id) {
        return product.subcategory_id === activeCategory;
      }
      
      return false;
    });
  }, [data, activeCategory]);

  // Handle tab click
  const handleTabClick = (categoryId) => {
    setActiveCategory(categoryId);
  };

  return (
    <section className="trending-productss pt-80">
      <div className="container container-lg">
        <div className="border border-gray-100 p-24 rounded-16">
          <div className="section-heading mb-24">
            <div className="flex-between flex-wrap gap-8">
              <h5 className="mb-0">{sectionTitle}</h5>
              <ul
                className={`nav ${tabClassName}`}
                id="pills-tab"
                role="tablist"
              >
                {/* All ট্যাব - ডিফল্টভাবে active */}
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${activeCategory === "all" ? "active" : ""}`}
                    onClick={() => handleTabClick("all")}
                    type="button"
                    aria-selected={activeCategory === "all"}
                  >
                    All
                  </button>
                </li>
                
                {/* অন্যান্য ক্যাটাগরি ট্যাব */}
                {categories.map((cat) => (
                  <li key={cat.id} className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${activeCategory === cat.id ? "active" : ""}`}
                      onClick={() => handleTabClick(cat.id)}
                      type="button"
                      aria-selected={activeCategory === cat.id}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="tab-content" id="pills-tabContent">
            <div 
              className={`tab-pane fade ${activeCategory === "all" ? "show active" : ""}`}
              id="all"
              role="tabpanel"
              aria-labelledby="all-tab"
            >
              <div className="row g-12">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div
                      className="col-xxl-2 col-lg-3 col-sm-4 col-6"
                      key={product.id}
                    >
                      <ProductCard
                        product={product}
                        color={color}
                        badgeColors={badgeColors}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-center w-100 py-5 text-gray-500">
                    No products available in this category.
                  </div>
                )}
              </div>
            </div>
            
            {/* অন্যান্য ক্যাটাগরির জন্য ট্যাব প্যানেল */}
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`tab-pane fade ${activeCategory === cat.id ? "show active" : ""}`}
                id={`cat-${cat.id}`}
                role="tabpanel"
                aria-labelledby={`cat-${cat.id}-tab`}
              >
                <div className="row g-12">
                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        className="col-xxl-2 col-lg-3 col-sm-4 col-6"
                        key={product.id}
                      >
                        <ProductCard
                          product={product}
                          color={color}
                          badgeColors={badgeColors}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center w-100 py-5 text-gray-500">
                      No products available in {cat.name} category.
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductTabSection;