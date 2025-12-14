"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

// Product card component - 
const ProductCard = ({ product, color = "main-600", badgeColors }) => {
  const router = useRouter();
  const { addToCart, refreshCart } = useCart
    ? useCart()
    : { addToCart: () => {}, refreshCart: () => {} };
  const [addingId, setAddingId] = useState(null);

  // Extract product data with fallbacks
  const { name, brand, default_variant, images, store, badge } = product;
  const imageUrl =
    images?.[0]?.image || product.image || "https://via.placeholder.com/200x200?text=No+Image";
  const price = default_variant?.final_price ?? default_variant?.price ?? product.discountedPrice ?? 0;
  const rating = product.rating ?? 4.5;
  const reviews = product.reviews ?? 32;
  const originalPrice = product.originalPrice ?? price + 10;

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

  return (
    <div className='product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2'>
      <div className='product-card__thumb rounded-8 bg-gray-50 position-relative' style={{ minHeight: "250px" }}>
        <div
          className='w-100 h-100 flex-center cursor-pointer'
          onClick={handleProductClick}
          style={{ padding: "20px" }}
        >
          <img
            src={imageUrl}
            alt={name}
            className='w-100 h-auto max-h-200 object-contain'
            style={{ 
              maxWidth: "100%", 
              maxHeight: "200px",
              objectFit: "contain"
            }}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/200x200?text=No+Image";
            }}
          />
        </div>
        <div className='position-absolute inset-block-start-0 inset-inline-start-0 mt-16 ms-16 z-1 d-flex flex-column gap-8'>
          {badgeText && (
            <span className={`text-main-two-600 w-40 h-40 d-flex justify-content-center align-items-center bg-white rounded-circle shadow-sm text-xs fw-semibold ${badgeClass}`}>
              {badgeText === "Sale" ? "-29%" : badgeText}
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
          <div
            className='link text-line-2 cursor-pointer'
            onClick={handleProductClick}
            tabIndex={0}
          >
            {name}
          </div>
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
            {rating.toFixed(1)}
          </span>
          <span className='text-xs fw-medium text-gray-500'>
            ({reviews})
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
            TK{price}{" "}
            <span className='text-gray-500 fw-normal'>
              /Qty
            </span>{" "}
          </span>
        </div>
        <div
          className='product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium cursor-pointer'
          onClick={handleAddToCart}
          tabIndex={0}
          style={{
            pointerEvents: addingId === product.id ? "none" : "auto",
            opacity: addingId === product.id ? 0.7 : 1,
          }}
        >
          {addingId === product.id ? "Adding..." : "Add To Cart"} <i className='ph ph-shopping-cart' />
        </div>
      </div>
    </div>
  );
};

// Promo banner component - আপনার টেমপ্লেট অনুযায়ী
const PromoBanner = ({ promo }) => {
  return (
    <div className='rounded-24 overflow-hidden border border-main-two-600 p-16 bg-color-three h-100'>
      <div
        className='bg-img w-100 h-100 min-h-485 rounded-24 overflow-hidden position-relative'
        style={{
          backgroundImage: `url(${promo.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className='position-relative z-2 py-32 pe-32 text-end'>
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
          <div className='position-absolute inset-inline-end-0 inset-block-end-0 me-16 mb-16'>
            <div className='bg-neutral-600 rounded-circle p-lg-5 p-md-4 p-24 max-w-260 max-h-260 w-100 h-100'>
              <div className='bg-white bg-opacity-10 w-100 h-100 rounded-circle d-flex justify-content-center align-items-center'>
                <h3 className='text-white mb-0 fw-medium text-center'>
                  45% <br /> Off
                </h3>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const NewArrivalThree = ({ 
  sectionTitle = "New Arrivals",
  categories = [],
  products = [],
  promos = [],
  badgeColors = {
    "Best Seller": "bg-tertiary-600",
    "New": "bg-warning-600",
    "Sale": "bg-danger-600",
    "Sold": "bg-success-600",
    "Default": "bg-main-600"
  }
}) => {
  // Tab data - API থেকে ক্যাটাগরি বা ডিফল্ট ট্যাব ব্যবহার
  const tabs = useMemo(() => {
    const defaultTabs = [{ id: "all", name: "All" }];
    
    if (categories && categories.length > 0) {
      const categoryTabs = categories.map(cat => ({
        id: cat.id,
        name: cat.name
      }));
      return [...defaultTabs, ...categoryTabs];
    }
    
    // Fallback ট্যাব যদি API থেকে ক্যাটাগরি না পাওয়া যায়
    return [
      { id: "all", name: "All" },
      { id: "Jacket", name: "Jacket" },
      { id: "Shoes", name: "Shoes" },
      { id: "Hats", name: "Hats" },
      { id: "Goggles", name: "Goggles" },
      { id: "Bags", name: "Bags" },
      { id: "Jeans", name: "Jeans" }
    ];
  }, [categories]);

  // Promo data - API থেকে বা ডিফল্ট
  const promoData = useMemo(() => {
    if (promos && promos.length > 0) {
      return promos;
    }
    
    // Fallback promo data
    return [
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
  }, [promos]);

  const [activeTab, setActiveTab] = useState("all");

  // Filtered products based on active tab
  const filteredProducts = useMemo(() => {
    if (activeTab === "all") {
      return products;
    }
    
    // Filter products by category
    return products.filter((product) => {
      // যদি product.categories array থাকে
      if (Array.isArray(product.categories)) {
        return product.categories.some(cat => cat.id === activeTab);
      }
      
      // যদি product.category_id থাকে
      if (product.category_id) {
        return product.category_id === activeTab;
      }
      
      // যদি product.subcategories array থাকে
      if (Array.isArray(product.subcategories)) {
        return product.subcategories.some(sub => sub.id === activeTab);
      }
      
      // যদি product.subcategory_id থাকে
      if (product.subcategory_id) {
        return product.subcategory_id === activeTab;
      }
      
      return false;
    });
  }, [products, activeTab]);

  // Split products into two groups for layout (first 3 and next 3)
  const firstThreeProducts = filteredProducts.slice(0, 3);
  const nextThreeProducts = filteredProducts.slice(3, 6);

  return (
    <section className='new-arrival-three py-120 overflow-hidden'>
      <div className='container container-lg'>
        <div className='section-heading text-center '>
          <h5 className='mb-0 text-uppercase '>{sectionTitle}</h5>
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
                    <PromoBanner promo={promoData[0]} />
                  </div>
                  <div className='col-xl-8'>
                    <div className='row gy-4'>
                      {firstThreeProducts.map(product => (
                        <div key={product.id} className='col-lg-4 col-sm-6'>
                          <ProductCard 
                            product={product} 
                            badgeColors={badgeColors}
                          />
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
                            <ProductCard 
                              product={product} 
                              badgeColors={badgeColors}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className='col-xl-4'>
                      <PromoBanner promo={promoData[1]} />
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