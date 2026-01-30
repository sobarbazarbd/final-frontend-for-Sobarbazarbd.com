"use client";

import React, { useState } from "react";
import Link from "next/link";
import ReactSlider from "react-slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";

const ShopSection = ({
  categories,
  brands,
  productsData,
  selectedCategory,
  selectedBrand,
  selectedStore,
  storeData,
  currentPage,
  pageSize,
}) => {
  let [grid, setGrid] = useState(false);
  let [active, setActive] = useState(false);
  let [addingId, setAddingId] = useState(null);
  let [searchValue, setSearchValue] = useState("");
  let [priceRange, setPriceRange] = useState([0, 500000]);
  let [selectedRating, setSelectedRating] = useState(null);
  let [filterOptions, setFilterOptions] = useState(null);
  let [expandedCategories, setExpandedCategories] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParam = searchParams.get("search") || "";
  const minPriceParam = searchParams.get("min_price");
  const maxPriceParam = searchParams.get("max_price");
  const minRatingParam = searchParams.get("min_rating");
  const sortParam = searchParams.get("ordering");
  
  // Initialize search value from URL
  React.useEffect(() => {
    if (searchParam) {
      setSearchValue(searchParam);
    }
  }, [searchParam]);

  // Fetch filter options (categories with subcategories, brands, price range)
  React.useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const res = await fetch(`https://api.hetdcl.com/api/v1.0/customers/products/filter_options/`);
        if (res.ok) {
          const data = await res.json();
          setFilterOptions(data);
          // Set initial price range from API
          if (data.price_range) {
            setPriceRange([
              minPriceParam ? parseInt(minPriceParam) : data.price_range.min,
              maxPriceParam ? parseInt(maxPriceParam) : data.price_range.max
            ]);
          }
        }
      } catch (err) {
        console.error('Error fetching filter options:', err);
      }
    };
    fetchFilterOptions();
  }, []);

  // Initialize filters from URL
  React.useEffect(() => {
    if (minRatingParam) {
      setSelectedRating(parseFloat(minRatingParam));
    }
  }, [minRatingParam]);

  let sidebarController = () => setActive(!active);
  const { addToCart, refreshCart } = useCart();

  // Products data
  const products = productsData?.results || [];
  const count = productsData?.count || 0;
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  // URL params
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const storeParam = searchParams.get("store");
  const pageParam = searchParams.get("page");
  
  const currentCategory = categoryParam || selectedCategory;
  const currentBrand = brandParam || selectedBrand;
  const currentStore = storeParam || selectedStore;
  const currentPg = pageParam ? parseInt(pageParam) : currentPage;

  // Calculate showing text
  const startItem = (currentPg - 1) * pageSize + 1;
  const endItem = Math.min(currentPg * pageSize, count);

  // Handlers
  const handleCategoryClick = (catId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", catId);
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  const handleBrandChange = (brandId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("brand", brandId);
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  const handleClearStoreFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("store");
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    if (currentCategory) params.set("category", currentCategory);
    router.push(`/shop?${params.toString()}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  const handlePriceFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("min_price", priceRange[0]);
    params.set("max_price", priceRange[1]);
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    const params = new URLSearchParams(searchParams.toString());
    if (rating) {
      params.set("min_rating", rating);
    } else {
      params.delete("min_rating");
    }
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (sortValue === "latest") {
      params.set("ordering", "-created_at");
    } else if (sortValue === "price-low") {
      params.set("ordering", "variants__price");
    } else if (sortValue === "price-high") {
      params.set("ordering", "-variants__price");
    } else {
      params.delete("ordering");
    }
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  const handleClearFilters = () => {
    router.push('/shop');
    setSelectedRating(null);
    if (filterOptions?.price_range) {
      setPriceRange([filterOptions.price_range.min, filterOptions.price_range.max]);
    }
  };

  const hasActiveFilters = () => {
    return (
      currentCategory ||
      currentBrand ||
      currentStore ||
      minPriceParam ||
      maxPriceParam ||
      minRatingParam ||
      sortParam ||
      searchParam
    );
  };

  const handleAddToCart = async (product, e) => {
    e.preventDefault();
    if (!product.default_variant?.id) {
      toast.error("No variant available for this product.");
      return;
    }
    setAddingId(product.id);
    const result = await addToCart(product.default_variant.id, 1);
    setAddingId(null);
    if (result.success) {
      refreshCart();
      toast.success(
        <span>
          Added to cart!{" "}
          <button
            className="btn btn-link text-main-600 p-0 text-decoration-underline"
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

  // Handle subcategory filter
  const handleSubcategoryClick = (subcatId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("supplier_product__subcategories", subcatId);
    params.delete("category");
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  };

  // Toggle category expansion
  const toggleCategory = (catId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Render categories with subcategories as accordion
  const renderCategories = () => {
    const dataSource = filterOptions?.categories || categories;
    if (!dataSource) return null;

    const subcategoryParam = searchParams.get("supplier_product__subcategories");

    return (
      <ul className='max-h-540 overflow-y-auto scroll-sm'>
        {dataSource.map((cat) => {
          const isExpanded = expandedCategories[cat.id];
          const hasSubcategories = cat.subcategories && cat.subcategories.length > 0;

          return (
            <li key={cat.id} className='mb-12'>
              <div className='d-flex align-items-center justify-content-between'>
                <div
                  className={`cursor-pointer py-2 fw-semibold flex-grow-1 ${
                    currentCategory == cat.id ? "text-main-600" : "text-gray-900 hover-text-main-600"
                  }`}
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  {cat.name}
                </div>
                {/* Accordion toggle icon */}
                {hasSubcategories && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCategory(cat.id);
                    }}
                    className='btn btn-sm p-0 ms-2'
                    style={{ width: '24px', height: '24px' }}
                  >
                    <i className={`ph ${isExpanded ? 'ph-caret-up' : 'ph-caret-down'} text-gray-600`} />
                  </button>
                )}
              </div>
              {/* Subcategories - collapsible */}
              {hasSubcategories && isExpanded && (
                <ul className='ms-16 mt-8'>
                  {cat.subcategories.map((subcat) => (
                    <li key={subcat.id} className='mb-8'>
                      <div
                        className={`cursor-pointer py-1 text-sm ${
                          subcategoryParam == subcat.id
                            ? "text-main-600 fw-medium"
                            : "text-gray-600 hover-text-main-600"
                        }`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubcategoryClick(subcat.id);
                        }}
                      >
                        {subcat.name}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  // Render brands
  const renderBrands = () => {
    if (!brands) return null;
    return (
      <ul className='max-h-540 overflow-y-auto scroll-sm'>
        {brands.map((brand) => (
          <li key={brand.id} className='mb-24'>
            <div className='form-check common-check common-radio'>
              <input
                className='form-check-input'
                type='radio'
                name='brand'
                id={`brand${brand.id}`}
                checked={String(currentBrand) === String(brand.id)}
                onChange={() => handleBrandChange(brand.id)}
              />
              <label className='form-check-label d-flex align-items-center' htmlFor={`brand${brand.id}`}>
                {brand.image && (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="rounded me-2"
                    style={{
                      width: 22,
                      height: 22,
                      objectFit: 'contain',
                    }}
                  />
                )}
                {brand.name}
              </label>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // Render rating filter - আগের ডিজাইনের মতো করে
  const renderRatingFilter = () => {
    const ratings = [
      { value: 5, label: "5 Star", count: 124, percentage: 70 },
      { value: 4, label: "4 Star & Above", count: 52, percentage: 50 },
      { value: 3, label: "3 Star & Above", count: 12, percentage: 35 },
      { value: 2, label: "2 Star & Above", count: 5, percentage: 20 },
      { value: 1, label: "1 Star & Above", count: 2, percentage: 5 }
    ];

    return (
      <>
        {ratings.map((rating) => (
          <div key={rating.value} className='flex-align gap-8 position-relative mb-20'>
            <label
              className='position-absolute w-100 h-100 cursor-pointer'
              htmlFor={`rating${rating.value}`}
            >
              {" "}
            </label>
            <div className='common-check common-radio mb-0'>
              <input
                className='form-check-input'
                type='radio'
                name='flexRadioDefault'
                id={`rating${rating.value}`}
                checked={selectedRating === rating.value}
                onChange={() => handleRatingChange(rating.value)}
              />
            </div>
            <div
              className='progress w-100 bg-gray-100 rounded-pill h-8'
              role='progressbar'
              aria-label='Basic example'
              aria-valuenow={rating.percentage}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className='progress-bar bg-main-600 rounded-pill'
                style={{ width: `${rating.percentage}%` }}
              />
            </div>
            <div className='flex-align gap-4'>
              {[...Array(5)].map((_, i) => (
                <span key={i} className='text-xs fw-medium d-flex'>
                  <i className={`ph-fill ph-star ${i < rating.value ? 'text-warning-600' : 'text-gray-400'}`} />
                </span>
              ))}
            </div>
            <span className='text-gray-900 flex-shrink-0'>{rating.count}</span>
          </div>
        ))}
      </>
    );
  };


  // Render products
  const renderProducts = () => {
    if (!products || products.length === 0) {
      return (
        <div className="col-12">
          <div className="text-center py-80">
            <i className="ph ph-magnifying-glass text-6xl text-gray-300 mb-16"></i>
            <h4 className="text-gray-600 mb-8">No products found</h4>
            <p className="text-gray-500">Try adjusting your search or filter</p>
          </div>
        </div>
      );
    }

    return products.map((product) => {
      const stockPercentage = Math.min(
        ((product.default_variant?.sold ||product.sold || 0) / (product.default_variant?.available_stock || 1)) * 100,
        80
      );

      // Prepare discount info
      let discountBadge = null;
      let discountValue = null;
      if (product.default_variant?.discount) {
        const discount = product.default_variant.discount;
        // If discount is an object, show value and type
        if (typeof discount === "object" && discount !== null) {
          discountBadge = (
            <span className='badge bg-danger-600 text-white px-12 py-4 rounded-pill'>
              -{discount.value}
              {discount.is_percentage ? "%" : ""} {discount.type ? discount.type : ""}
            </span>
          );
          discountValue = discount.value;
        } else {
          // If discount is a number or string
          discountBadge = (
            <span className='badge bg-danger-600 text-white px-12 py-4 rounded-pill'>
              -{discount}
            </span>
          );
          discountValue = discount;
        }
      }

      return (
        <div 
          key={product.id} 
          className={`${grid ? 'col-12' : 'col-xxl-3 col-lg-4 col-sm-6 col-12'}`}
        >
          <div className='product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2 hover-shadow-lg overflow-hidden'>
            {/* Product badges */}
            {discountBadge && (
              <div className="position-absolute top-0 start-0 m-12 z-2">
                {discountBadge}
              </div>
            )}
            {product.is_new && (
              <div className="position-absolute top-0 end-0 m-12 z-2">
                <span className='badge bg-warning-600 text-white px-12 py-4 rounded-pill'>
                  New
                </span>
              </div>
            )}

            {/* Product image - ফিক্সড */}
            <Link
              href={`/shop/${product.id}`}
              className='product-card__thumb d-block bg-gray-50 position-relative overflow-hidden rounded-8'
              style={{ height: grid ? '280px' : '220px' }}
            >
              <div className="w-100 h-100 d-flex align-items-center justify-content-center p-16">
                <img
                  src={
                    product.images?.[0]?.image ||
                    "/assets/images/thumbs/product-two-img1.png"
                  }
                  alt={product.images?.[0]?.alt_text || product.name}
                  className="img-fluid max-h-100 object-fit-contain"
                  style={{ 
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/assets/images/thumbs/product-two-img1.png";
                  }}
                />
              </div>
              {/* Store Badge */}
              {product.store && (
                <div className="position-absolute bottom-0 start-0 m-12">
                  <div className="d-flex align-items-center bg-white rounded-pill shadow-sm px-12 py-6">
                    {product.store.logo ? (
                      <img
                        src={product.store.logo}
                        alt={product.store.name}
                        className="rounded-circle me-8"
                        style={{ width: 20, height: 20, objectFit: 'cover' }}
                      />
                    ) : (
                      <i className="ph ph-storefront text-main-600 me-8" style={{fontSize: '12px'}}></i>
                    )}
                    <span className="text-xs fw-medium text-gray-700">
                      {product.store.name}
                    </span>
                  </div>
                </div>
              )}
            </Link>

            {/* Product content */}
            <div className='product-card__content mt-16'>
              {/* Product title */}
              <h6 className='title text-lg fw-semibold mb-12'>
                <Link
                  href={`/shop/${product.id}`}
                  className='link text-gray-900 hover-text-main-600 text-line-2'
                  tabIndex={0}
                >
                  {product.name}
                </Link>
              </h6>

              {/* Variant info */}
              {product.default_variant && (
                <div className="mb-12 text-sm">
                  <div className="text-gray-600 mb-4">
                    <span className="fw-medium">Variant:</span> {product.default_variant.name}
                  </div>
                </div>
              )}

              {/* Rating - Dynamic */}
              <div className='flex-align mb-16 gap-6'>
                <span className='text-xs fw-medium text-gray-500'>
                  {product.rating ? product.rating.toFixed(1) : '0.0'}
                </span>
                <div className='text-15 fw-medium text-warning-600 d-flex gap-1'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`${star <= Math.floor(product.rating || 0) ? 'ph-fill' : 'ph'} ph-star ${star <= Math.floor(product.rating || 0) ? '' : 'text-gray-400'}`}
                    />
                  ))}
                </div>
                <span className='text-xs fw-medium text-gray-500'>
                  ({product.review_count >= 1000
                    ? `${(product.review_count / 1000).toFixed(1)}k`
                    : product.review_count || 0})
                </span>
              </div>

              {/* Stock progress */}
              <div className='mt-8 mb-16'>
                <div
                  className='progress w-100 bg-color-three rounded-pill h-4'
                  role='progressbar'
                  aria-label='Basic example'
                  aria-valuenow={stockPercentage}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className='progress-bar bg-main-two-600 rounded-pill'
                    style={{ width: `${stockPercentage}%` }}
                  />
                </div>
                <span className='text-gray-900 text-xs fw-medium mt-8'>
                  Sold: {product.default_variant?.sold ||product.sold || 0}/{product.default_variant?.stock || 0}
                </span>
              </div>

              {/* Price - আগের ডিজাইনের মতো */}
              <div className='product-card__price my-20'>
                {discountValue !== null && (
                  <span className='text-gray-400 text-md fw-semibold text-decoration-line-through me-8'>
                    ৳{product.default_variant.price}
                  </span>
                )}
                <span className='text-heading text-md fw-semibold'>
                  ৳{product.default_variant?.final_price || product.default_variant?.price || 'N/A'}
                  <span className='text-gray-500 fw-normal'> /Qty</span>
                </span>
              </div>

              {/* Add to Cart button */}
              <button
                type="button"
                className='btn btn-main w-100 py-12 px-24 rounded-8 d-flex align-items-center justify-content-center gap-8 fw-medium'
                onClick={(e) => handleAddToCart(product, e)}
                disabled={addingId === product.id}
              >
                {addingId === product.id ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Adding...
                  </>
                ) : (
                  <>
                    Add To Cart <i className='ph ph-shopping-cart' />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  // Render store info card
  const renderStoreInfoCard = () => {
    if (!currentStore || !storeData) return null;

    return (
      <div className='shop-sidebar__box border border-main-600 bg-main-50 rounded-16 p-24 mb-32'>
        {/* Store Header */}
        <div className='text-center pb-24 mb-24 border-bottom border-main-200'>
          {storeData.logo ? (
            <div className="mb-16 flex-center">
              <img
                src={storeData.logo}
                alt={storeData.name}
                className="rounded-circle object-fit-cover"
                style={{ width: 100, height: 100 }}
              />
            </div>
          ) : (
            <div className="mb-16 flex-center">
              <div className="d-flex align-items-center justify-content-center bg-white rounded-circle" style={{ width: 100, height: 100 }}>
                <i className="ph ph-storefront text-main-600" style={{ fontSize: '48px' }} />
              </div>
            </div>
          )}
          <h5 className="mb-8 text-main-600">{storeData.name}</h5>
          {storeData.city && (
            <span className="text-sm text-gray-700 d-flex align-items-center justify-content-center gap-4">
              <i className="ph ph-map-pin" />
              {storeData.city}
            </span>
          )}
        </div>

        {/* Store Description */}
        {storeData.description && (
          <div className="mb-20">
            <p className="text-sm text-gray-700 mb-0" style={{ 
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {storeData.description}
            </p>
          </div>
        )}

        {/* Contact Info */}
        <div className="mb-20">
          {storeData.phone_number && (
            <div className="d-flex align-items-center gap-12 mb-12">
              <span className="w-32 h-32 bg-white text-main-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                <i className="ph ph-phone" />
              </span>
              <div>
                <span className="text-xs text-gray-600 d-block">Phone</span>
                <a href={`tel:${storeData.phone_number}`} className="text-sm text-gray-900 hover-text-main-600">
                  {storeData.phone_number}
                </a>
              </div>
            </div>
          )}

          {storeData.contact_email && (
            <div className="d-flex align-items-center gap-12 mb-12">
              <span className="w-32 h-32 bg-white text-main-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                <i className="ph ph-envelope" />
              </span>
              <div>
                <span className="text-xs text-gray-600 d-block">Email</span>
                <a href={`mailto:${storeData.contact_email}`} className="text-sm text-gray-900 hover-text-main-600 text-break">
                  {storeData.contact_email}
                </a>
              </div>
            </div>
          )}

          {storeData.address && (
            <div className="d-flex align-items-start gap-12">
              <span className="w-32 h-32 bg-white text-main-600 rounded-circle d-flex align-items-center justify-content-center flex-shrink-0">
                <i className="ph ph-map-pin" />
              </span>
              <div>
                <span className="text-xs text-gray-600 d-block">Address</span>
                <span className="text-sm text-gray-900">{storeData.address}</span>
              </div>
            </div>
          )}
        </div>

        {/* Clear Filter Button */}
        <button
          onClick={handleClearStoreFilter}
          className='btn btn-outline-main w-100 rounded-8 py-12'
        >
          <i className='ph ph-x me-2'></i>
          Clear Store Filter
        </button>

        {/* Social Links */}
        {(storeData.facebook_url || storeData.twitter_url || storeData.website_url) && (
          <div className="mt-20 pt-20 border-top border-main-200">
            <span className="text-sm text-gray-700 d-block mb-12 fw-medium">Follow Store</span>
            <div className="d-flex align-items-center gap-8 justify-content-center">
              {storeData.facebook_url && (
                <a
                  href={storeData.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-36 h-36 d-flex align-items-center justify-content-center bg-white text-main-600 rounded-circle hover-bg-main-600 hover-text-white transition"
                >
                  <i className="ph-fill ph-facebook-logo" />
                </a>
              )}
              {storeData.twitter_url && (
                <a
                  href={storeData.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-36 h-36 d-flex align-items-center justify-content-center bg-white text-main-600 rounded-circle hover-bg-main-600 hover-text-white transition"
                >
                  <i className="ph-fill ph-twitter-logo" />
                </a>
              )}
              {storeData.website_url && (
                <a
                  href={storeData.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-36 h-36 d-flex align-items-center justify-content-center bg-white text-main-600 rounded-circle hover-bg-main-600 hover-text-white transition"
                >
                  <i className="ph ph-globe" />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className='shop py-80'>
      <div className={`side-overlay ${active && "show"}`}></div>
      <div className='container container-lg'>
        <div className='row'>
          {/* Sidebar Start */}
          <div className='col-lg-3'>
            <div className={`shop-sidebar ${active && "active"}`}>
              <button
                onClick={sidebarController}
                type='button'
                className='shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute end-0 me-10 mt-8 hover-text-white hover-border-main-600'
              >
                <i className='ph ph-x' />
              </button>
              
              {/* Store Info Card - Show when filtered by store */}
              {renderStoreInfoCard()}
              
              {/* Category Filter */}
              <div className='shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32'>
                <h6 className='text-xl border-bottom border-gray-100 pb-24 mb-24'>
                  Product Category
                </h6>
                {renderCategories()}
              </div>

              {/* Price Filter - Dynamic */}
              <div className='shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32'>
                <h6 className='text-xl border-bottom border-gray-100 pb-24 mb-24'>
                  Filter by Price
                </h6>
                <div className='custom--range'>
                  <ReactSlider
                    className='horizontal-slider'
                    thumbClassName='example-thumb'
                    trackClassName='example-track'
                    value={priceRange}
                    min={filterOptions?.price_range?.min || 0}
                    max={filterOptions?.price_range?.max || 500000}
                    onChange={(value) => setPriceRange(value)}
                    ariaLabel={["Lower thumb", "Upper thumb"]}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => {
                      const { key, ...restProps } = props;
                      return (
                        <div {...restProps} key={state.index}>
                          ৳{state.valueNow}
                        </div>
                      );
                    }}
                    pearling
                    minDistance={100}
                  />
                  <div className='flex-between gap-8 mt-32 mb-16'>
                    <span className='text-sm text-gray-600'>৳{priceRange[0]}</span>
                    <span className='text-sm text-gray-600'>৳{priceRange[1]}</span>
                  </div>
                  <button
                    type='button'
                    onClick={handlePriceFilter}
                    className='btn btn-main h-40 w-100 flex-center'
                  >
                    Apply Price Filter
                  </button>
                </div>
              </div>

              {/* Rating Filter - Dynamic */}
              <div className='shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32'>
                <h6 className='text-xl border-bottom border-gray-100 pb-24 mb-24'>
                  Filter by Rating
                </h6>
                {renderRatingFilter()}
              </div>

              {/* Brand Filter */}
              <div className='shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32'>
                <h6 className='text-xl border-bottom border-gray-100 pb-24 mb-24'>
                  Filter by Brand
                </h6>
                {renderBrands()}
              </div>
              
              {/* Advertisement */}
              <div className='shop-sidebar__box rounded-8 overflow-hidden'>
                <img 
                  src='/assets/images/thumbs/advertise-img1.png' 
                  alt='Advertisement' 
                  className='w-100 rounded-8'
                />
              </div>
            </div>
          </div>
          {/* Sidebar End */}

          {/* Content Start */}
          <div className='col-lg-9'>
            {/* Top Bar */}
            <div className='flex-between gap-16 flex-wrap mb-40'>
              <div className='d-flex align-items-center gap-12 flex-wrap'>
                <span className='text-gray-900 text-sm'>
                  Showing {startItem}-{endItem} of {count} results
                </span>
                {/* Clear Filters Button */}
                {hasActiveFilters() && (
                  <button
                    onClick={handleClearFilters}
                    className='btn btn-outline-main h-40 px-16 d-flex align-items-center gap-8 flex-shrink-0'
                    type='button'
                  >
                    <i className='ph ph-x-circle' />
                    Clear Filters
                  </button>
                )}
              </div>
              <div className='d-flex align-items-center gap-16 flex-wrap w-sm-100'>
                {/* Search */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="d-flex flex-grow-1"
                  style={{ minWidth: 0, maxWidth: '300px' }}
                >
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control border-end-0 rounded-start-8"
                      placeholder="Search products..."
                      value={searchValue}
                      onChange={e => setSearchValue(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="btn btn-main rounded-end-8"
                    >
                      <i className="ph ph-magnifying-glass" />
                    </button>
                  </div>
                </form>

                {/* View Toggle */}
                <div className='list-grid-btns d-flex align-items-center gap-8'>
                  <button
                    onClick={() => setGrid(false)}
                    type='button'
                    className={`w-44 h-44 d-flex align-items-center justify-content-center border rounded-6 text-lg ${
                      !grid ? "border-main-600 text-white bg-main-600" : "border-gray-100 text-gray-500"
                    }`}
                  >
                    <i className='ph ph-squares-four' />
                  </button>
                  <button
                    onClick={() => setGrid(true)}
                    type='button'
                    className={`w-44 h-44 d-flex align-items-center justify-content-center border rounded-6 text-lg ${
                      grid ? "border-main-600 text-white bg-main-600" : "border-gray-100 text-gray-500"
                    }`}
                  >
                    <i className='ph-bold ph-list-dashes' />
                  </button>
                </div>

                {/* Sort - Functional */}
                <div className='d-flex align-items-center gap-4'>
                  <label htmlFor='sorting' className='text-gray-500 text-sm flex-shrink-0'>
                    Sort by:
                  </label>
                  <select
                    className='form-select border-gray-100 rounded-6 py-8 px-12'
                    id='sorting'
                    style={{ width: 'auto', minWidth: '120px' }}
                    onChange={handleSortChange}
                    value={
                      sortParam === "-created_at" ? "latest" :
                      sortParam === "variants__price" ? "price-low" :
                      sortParam === "-variants__price" ? "price-high" :
                      "popular"
                    }
                  >
                    <option value="popular">Popular</option>
                    <option value="latest">Latest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

                {/* Mobile Filter Button */}
                <button
                  onClick={sidebarController}
                  type='button'
                  className='w-44 h-44 d-lg-none d-flex align-items-center justify-content-center border border-gray-100 rounded-6 text-lg'
                >
                  <i className='ph-bold ph-funnel' />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className={grid ? "list-view" : ""}>
              <div className="row g-30">
                {renderProducts()}
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-60">
                <ul className='pagination flex-center flex-wrap gap-8'>
                  <li className='page-item'>
                    <button
                      className='page-link h-48 w-48 flex-center text-xl rounded-8 fw-medium text-neutral-600 border border-gray-100'
                      onClick={() => currentPg > 1 && handlePageChange(currentPg - 1)}
                      disabled={currentPg <= 1}
                    >
                      <i className='ph-bold ph-arrow-left' />
                    </button>
                  </li>

                  {(() => {
                    const pages = [];
                    const showPage = (num) => (
                      <li key={num} className={`page-item ${currentPg === num ? 'active' : ''}`}>
                        <button
                          className='page-link h-48 w-48 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100'
                          onClick={() => handlePageChange(num)}
                        >
                          {num}
                        </button>
                      </li>
                    );
                    const showEllipsis = (key) => (
                      <li key={key} className='page-item'>
                        <span className='page-link h-48 w-48 flex-center text-md text-gray-400 border-0'>...</span>
                      </li>
                    );

                    if (totalPages <= 5) {
                      for (let i = 1; i <= totalPages; i++) pages.push(showPage(i));
                    } else {
                      pages.push(showPage(1));
                      if (currentPg > 3) pages.push(showEllipsis('start'));
                      const start = Math.max(2, currentPg - 1);
                      const end = Math.min(totalPages - 1, currentPg + 1);
                      for (let i = start; i <= end; i++) pages.push(showPage(i));
                      if (currentPg < totalPages - 2) pages.push(showEllipsis('end'));
                      pages.push(showPage(totalPages));
                    }
                    return pages;
                  })()}

                  <li className='page-item'>
                    <button
                      className='page-link h-48 w-48 flex-center text-xl rounded-8 fw-medium text-neutral-600 border border-gray-100'
                      onClick={() => currentPg < totalPages && handlePageChange(currentPg + 1)}
                      disabled={currentPg >= totalPages}
                    >
                      <i className='ph-bold ph-arrow-right' />
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* Content End */}
        </div>
      </div>
      
      {/* Custom CSS for image fix */}
      <style jsx>{`
        .product-card__thumb {
          position: relative;
          overflow: hidden;
        }
        
        .product-card__thumb img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          transition: transform 0.3s ease;
        }
        
        .product-card__thumb:hover img {
          transform: scale(1.05);
        }
        
        .img-fluid.max-h-100 {
          max-height: 100% !important;
          width: auto !important;
          max-width: 100% !important;
          display: block;
          margin: 0 auto;
        }
        
        .object-fit-contain {
          object-fit: contain !important;
        }
        
        .text-line-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .hover-shadow-lg {
          transition: all 0.3s ease;
        }
        
        .hover-shadow-lg:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
          transform: translateY(-2px);
        }
        
        /* Grid view special styling */
        .list-view .product-card {
          display: flex;
          flex-direction: row;
        }
        
        .list-view .product-card__thumb {
          flex: 0 0 280px;
          height: 280px;
        }
        
        .list-view .product-card__content {
          flex: 1;
          padding-left: 20px;
        }
        
        @media (max-width: 768px) {
          .list-view .product-card {
            flex-direction: column;
          }

          .list-view .product-card__thumb {
            flex: 0 0 auto;
            width: 100%;
            height: 220px;
          }

          .list-view .product-card__content {
            padding-left: 0;
          }
        }

        /* Shop top bar responsive */
        @media (max-width: 576px) {
          .w-sm-100 {
            width: 100% !important;
          }
          .w-sm-100 form {
            max-width: 100% !important;
            width: 100% !important;
          }
          .list-grid-btns {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
};

export default ShopSection;