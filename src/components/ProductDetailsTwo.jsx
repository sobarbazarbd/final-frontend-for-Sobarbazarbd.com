"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductTabSection";
import dynamic from "next/dynamic";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // add this import
import toast from "react-hot-toast"; // <-- add this import
import ProductCompare from "./ProductCompare";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.hetdcl.com/api/v1.0";

const ProductDetailsTwo = ({ product, discountText }) => {
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
  // Images
  const productImages = product?.images?.length
    ? product.images.map((img) => img.image)
    : ["/assets/images/thumbs/product-details-two-thumb1.png"];

  // Variant selection state
  const [selectedVariantId, setSelectedVariantId] = useState(
    product?.variants?.find((v) => v.is_default)?.id ||
      product?.variants?.[0]?.id
  );
  const selectedVariant = product?.variants?.find(
    (v) => v.id === selectedVariantId
  );

  // Main image state - update when variant changes
  const [mainImage, setMainImage] = useState(
    selectedVariant?.image || productImages[0]
  );

  // Update main image when variant changes
  useEffect(() => {
    if (selectedVariant?.image) {
      setMainImage(selectedVariant.image);
    }
  }, [selectedVariantId, selectedVariant]);

  // Parse attributes if present
  let attributes = {};
  if (selectedVariant?.attributes) {
    try {
      attributes = JSON.parse(selectedVariant.attributes.replace(/'/g, '"'));
    } catch {
      attributes = {};
    }
  }

  const settingsThumbs = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    focusOnSelect: true,
  };

  const { addToCart, loading: cartLoading } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewStats, setReviewStats] = useState({
    average: 0,
    total: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: "",
  });
  const [submittingReview, setSubmittingReview] = useState(false);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (!product?.id) return;

      try {
        const res = await fetch(
          `${API_BASE_URL}/api/v1.0/customers/products/${product.id}/reviews/`
        );
        if (res.ok) {
          const data = await res.json();
          const reviewsList = Array.isArray(data) ? data : data.data || [];
          setReviews(reviewsList);

          // Calculate stats
          if (reviewsList.length > 0) {
            const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
            let totalRating = 0;
            reviewsList.forEach((r) => {
              distribution[r.rating] = (distribution[r.rating] || 0) + 1;
              totalRating += r.rating;
            });
            setReviewStats({
              average: (totalRating / reviewsList.length).toFixed(1),
              total: reviewsList.length,
              distribution,
            });
          }
        }
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchReviews();
  }, [product?.id]);

  // Submit review handler
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to submit a review");
      return;
    }
    if (!reviewForm.comment.trim()) {
      toast.error("Please write a review comment");
      return;
    }

    setSubmittingReview(true);
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(
        `${API_BASE_URL}/api/v1.0/customers/products/${product.id}/reviews/`,
        {
          method: "POST",
          headers: {
            Authorization: `JWT ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: reviewForm.rating,
            comment: reviewForm.comment,
            orderitem_id: 0, // This needs a valid order item ID - see note below
          }),
        }
      );

      if (res.ok) {
        const newReview = await res.json();
        setReviews((prev) => [newReview, ...prev]);
        setReviewForm({ rating: 5, comment: "" });
        toast.success("Review submitted successfully!");
      } else {
        const errorData = await res.json();
        toast.error(
          errorData?.detail ||
            errorData?.non_field_errors?.[0] ||
            "You can only review products you have purchased and received"
        );
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("Failed to submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  // Helper to render stars
  const renderStars = (rating, size = "text-15") => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={`${size} fw-medium ${
            i < rating ? "text-warning-600" : "text-gray-400"
          } d-flex`}
        >
          <i className="ph-fill ph-star" />
        </span>
      ));
  };

  // Helper to format date
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Please select a variant"); // changed from alert
      return;
    }

    if (quantity > selectedVariant.available_stock) {
      toast.error(
        `Only ${selectedVariant.available_stock} items available in stock`
      ); // changed from alert
      return;
    }

    setAddingToCart(true);
    const result = await addToCart(selectedVariant.id, quantity);
    setAddingToCart(false);

    if (result.success) {
      toast.success("Item added to cart successfully!"); // changed from alert
      setQuantity(1);
    } else {
      toast.error(result.error || "Failed to add item to cart"); // changed from alert
    }
  };

  // Add to wishlist handler
  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error("Please login to add to wishlist");
      return;
    }
    if (!product?.id) {
      toast.error("Invalid product");
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${API_BASE_URL}/api/v1.0/customers/favorite-products/`, {
        method: "POST",
        headers: {
          Authorization: `JWT ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: product.id,
          is_favorite: true,
        }),
      });
      if (res.ok) {
        toast.success("Added to wishlist!");
      } else {
        const data = await res.json();
        toast.error(
          data?.product?.[0] || data?.detail || "Already in wishlist or failed"
        );
      }
    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  };

  const incrementQuantity = () => {
    if (selectedVariant && quantity < selectedVariant.available_stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <section className="product-details py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9">
            <div className="row gy-4">
              <div className="col-xl-6">
                <div className="product-details__left">
                  <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                    <div className="">
                      <div className="product-details__thumb flex-center h-100">
                        <img src={mainImage} alt="Main Product" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-24">
                    <div className="product-details__images-slider">
                      <Slider {...settingsThumbs}>
                        {productImages.map((image, index) => (
                          <div
                            className="center max-w-120 max-h-120 h-100 flex-center border border-gray-100 rounded-16 p-8"
                            key={index}
                            onClick={() => setMainImage(image)}
                          >
                            <img
                              className="thum"
                              src={image}
                              alt={`Thumbnail ${index}`}
                            />
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="product-details__content">
                  <div className="flex-center mb-24 flex-wrap gap-16 bg-color-one rounded-8 py-16 px-24 position-relative z-1">
                    <img
                      src="/assets/images/bg/details-offer-bg.png"
                      alt=""
                      className="position-absolute inset-block-start-0 inset-inline-start-0 w-100 h-100 z-n1"
                    />
                    <div className="flex-align gap-16">
                      <span className="text-white text-sm">Special Offer:</span>
                    </div>
                    <div className="countdown" id="countdown11">
                      <ul className="countdown-list flex-align flex-wrap">
                        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
                          {timeLeft.days}
                          <span className="days" />
                        </li>
                        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
                          {timeLeft.hours}
                          <span className="hours" />
                        </li>
                        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
                          {timeLeft.minutes}
                          <span className="minutes" />
                        </li>
                        <li className="countdown-list__item text-heading flex-align gap-4 text-xs fw-medium w-28 h-28 rounded-4 border border-main-600 p-0 flex-center">
                          {timeLeft.seconds}
                          <span className="seconds" />
                        </li>
                      </ul>
                    </div>
                    <span className="text-white text-xs">
                      Remains untill the end of the offer
                    </span>
                  </div>
                  <h5 className="mb-12">{product?.name}</h5>
                  {/* Variant Selector - Enhanced */}
                  {product?.variants?.length > 0 && (
                    <div className="mb-24">
                      <label className="fw-semibold mb-12 d-block text-lg">
                        Select Variant:
                      </label>
                      <div className="d-flex flex-wrap jus gap-12">
                        {product.variants.map((variant) => {
                          const isSelected = selectedVariantId === variant.id;
                          let variantAttrs = {};
                          try {
                            variantAttrs = JSON.parse(variant.attributes.replace(/'/g, '"'));
                          } catch {}

                          return (
                            <div
                              key={variant.id}
                              onClick={() => setSelectedVariantId(variant.id)}
                              className={`border rounded-12 p-12 cursor-pointer transition-all ${
                                isSelected
                                  ? 'border-main-600 bg-main-50 shadow-sm'
                                  : 'border-gray-200 hover:border-main-400'
                              }`}
                              style={{ minWidth: '140px', cursor: 'pointer' }}
                            >
                              {/* Variant Image */}
                              {variant.image && (
                                <div className="mb-8 text-center">
                                  <img
                                    src={variant.image}
                                    alt={variant.name}
                                    className="rounded-8"
                                    style={{
                                      width: '60px',
                                      height: '60px',
                                      objectFit: 'cover',
                                      border: isSelected ? '2px solid #299E60' : '1px solid #e5e7eb'
                                    }}
                                  />
                                </div>
                              )}

                              {/* Variant Name */}
                              <div className={`fw-semibold mb-4 text-sm ${isSelected ? 'text-main-600' : 'text-gray-900'}`}>
                                {variant.name}
                              </div>

                              {/* Attributes */}
                              {Object.keys(variantAttrs).length > 0 && (
                                <div className="text-xs text-gray-600 mb-6">
                                  {Object.entries(variantAttrs).map(([k, v], idx) => (
                                    <div key={idx}>
                                      <span className="fw-medium">{k}:</span> {v}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Price */}
                              <div className={`fw-bold text-sm ${isSelected ? 'text-main-600' : 'text-gray-700'}`}>
                                ৳{variant.final_price || variant.price}
                              </div>

                              {/* Stock indicator */}
                              <div className={`text-xs mt-4 ${variant.available_stock > 0 ? 'text-success-600' : 'text-danger-600'}`}>
                                {variant.available_stock > 0 ? `${variant.available_stock} in stock` : 'Out of stock'}
                              </div>

                              {/* Selected indicator */}
                              {isSelected && (
                                <div className="mt-8 text-center">
                                  <i className="ph-fill ph-check-circle text-main-600" style={{fontSize: '18px'}}></i>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  <div className="flex-align flex-wrap gap-12">
                    <div className="flex-align gap-12 flex-wrap">
                      <div className="flex-align gap-8">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            className={`text-15 fw-medium d-flex ${
                              star <= Math.floor(product.rating || 0)
                                ? 'text-warning-600'
                                : 'text-gray-300'
                            }`}
                          >
                            <i className="ph-fill ph-star" />
                          </span>
                        ))}
                      </div>
                      <span className="text-sm fw-medium text-neutral-600">
                        {product.rating ? product.rating.toFixed(1) : '0.0'} Star Rating
                      </span>
                      <span className="text-sm fw-medium text-gray-500">
                        ({product.review_count >= 1000
                          ? `${(product.review_count / 1000).toFixed(1)}k`
                          : product.review_count || 0})
                      </span>
                    </div>
                    <span className="text-sm fw-medium text-gray-500">|</span>
                    <span className="text-gray-900">
                      <span className="text-gray-400">SKU:</span>{" "}
                      {selectedVariant?.sku || ""}
                    </span>
                  </div>
                  <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                  <p className="text-gray-700">{product?.short_description}</p>
                  {/* Show attributes if present */}
                  {Object.keys(attributes).length > 0 && (
                    <div className="mb-12">
                      <span className="fw-semibold">Attributes:</span>{" "}
                      {Object.entries(attributes).map(([k, v]) => (
                        <span key={k} className="badge bg-light text-dark me-2">
                          {k}: {v}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="my-32 flex-align gap-16 flex-wrap">
                    <div className="flex-align gap-8">
                      {/* Fix: Render discountText instead of object */}
                      {discountText && (
                        <div className="flex-align gap-8 text-main-two-600">
                          <i className="ph-fill ph-seal-percent text-xl" />
                          {discountText}
                        </div>
                      )}
                      <h6 className="mb-0">৳{selectedVariant?.final_price}</h6>
                    </div>
                    <div className="flex-align gap-8">
                      <span className="text-gray-700">Regular Price</span>
                      <h6 className="text-xl text-gray-400 mb-0 fw-medium">
                        {selectedVariant?.price
                          ? `৳${selectedVariant.price}`
                          : ""}
                      </h6>
                    </div>
                  </div>
                  {/* Stock info */}
                  <div className="mb-8 text-sm text-gray-700">
                    <span className="fw-medium">
                      Stock: {selectedVariant?.stock} /{" "}
                      {selectedVariant?.available_stock}
                    </span>
                  </div>
                  <div className="my-32 flex-align gap-16 flex-wrap">
                    <Link
                      href="#"
                      className="px-12 py-8 text-sm rounded-8 flex-align gap-8 text-gray-900 border border-gray-200 hover-border-main-600 hover-text-main-600"
                    >
                      Security &amp; Privacy
                      <i className="ph ph-caret-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3">
            <div className="product-details__sidebar py-40 px-32 border border-gray-100 rounded-16">
              <div className="mb-32">
                <label
                  htmlFor="delivery"
                  className="h6 activePage mb-8 text-heading fw-semibold d-block"
                >
                  Delivery
                </label>
                <div className="flex-align border border-gray-100 rounded-4 px-16">
                  <span className="text-xl d-flex text-main-600">
                    <i className="ph ph-map-pin" />
                  </span>
                  <select
                    defaultValue={1}
                    className="common-input border-0 px-8 rounded-4"
                    id="delivery"
                  >
                    <option value={1}>Maymansign</option>
                    <option value={1}>Khulna</option>
                    <option value={1}>Rajshahi</option>
                    <option value={1}>Rangpur</option>
                  </select>
                </div>
              </div>
              <div className="mb-32">
                <label
                  htmlFor="stock"
                  className="text-lg mb-12 text-heading fw-semibold d-block"
                >
                  Quantity
                </label>
                <div className="d-flex align-items-center gap-12 mb-16">
                  <div className='d-flex rounded-8 overflow-hidden border border-gray-200'>
                    <button
                      onClick={decrementQuantity}
                      type='button'
                      disabled={quantity <= 1}
                      className='quantity__minus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <i className='ph ph-minus fw-bold' />
                    </button>
                    <input
                      type='number'
                      className='quantity__input flex-grow-1 border-0 text-center w-64 px-16 fw-semibold'
                      id='stock'
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        if (val >= 1 && val <= (selectedVariant?.available_stock || 0)) {
                          setQuantity(val);
                        }
                      }}
                      min={1}
                      max={selectedVariant?.available_stock || 0}
                    />
                    <button
                      onClick={incrementQuantity}
                      type='button'
                      disabled={quantity >= (selectedVariant?.available_stock || 0)}
                      className='quantity__plus flex-shrink-0 h-48 w-48 text-neutral-600 bg-gray-50 flex-center hover-bg-main-600 hover-text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      <i className='ph ph-plus fw-bold' />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="fw-medium">{selectedVariant?.available_stock || 0}</span> available
                  </div>
                </div>
              </div>
              <div className="mb-32">
                <div className="flex-between flex-wrap gap-8 border-bottom border-gray-100 pb-16 mb-16">
                  <span className="text-gray-500">Price</span>
                  <h6 className="text-lg mb-0">
                    ৳{selectedVariant?.final_price ?? ""}
                  </h6>
                </div>
                {/* <div className="flex-between flex-wrap gap-8">
                  <span className="text-gray-500">Shipping</span>
                  <h6 className="text-lg mb-0">From $10.00</h6>
                </div> */}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={
                  addingToCart ||
                  cartLoading ||
                  !selectedVariant ||
                  selectedVariant.available_stock === 0
                }
                className="btn btn-main flex-center gap-8 rounded-8 py-16 fw-normal mt-48"
              >
                {addingToCart ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    ></span>
                    Adding...
                  </>
                ) : (
                  <>
                    <i className="ph ph-shopping-cart-simple text-lg" />
                    Add To Cart
                  </>
                )}
              </button>
              {/* Add to Wishlist button */}
              <button
                onClick={handleAddToWishlist}
                disabled={!user}
                className="btn btn-secondary flex-center gap-8 rounded-8 py-12 fw-normal mt-16 w-100"
                style={{ opacity: user ? 1 : 0.6 }}
              >
                <i className="ph ph-heart text-lg" />
                Add to Wishlist
              </button>

              <div className="mt-32"></div>
              <div className="mt-32">
                {/* <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-14">
                  <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                    <i className="ph-fill ph-truck" />
                  </span>
                  <span className="text-sm text-neutral-600">
                    Ship from{" "}
                    <span className="fw-semibold">
                      {product?.store?.name ?? "SobarBazarBD"}
                    </span>
                  </span>
                </div> */}
                <div className="px-16 py-8 bg-main-50 rounded-8 flex-between gap-24 mb-0">
                  <span className="w-32 h-32 bg-white text-main-600 rounded-circle flex-center text-xl flex-shrink-0">
                    <i className="ph-fill ph-storefront" />
                  </span>
                  <span className="text-sm text-neutral-600">
                    Sold by:{" "}
                    <span className="fw-semibold">
                      {product?.store?.name ?? "SobarBazarBD"}
                    </span>
                  </span>
                </div>
              </div>
              <div className="mt-32">
                <div className="px-32 py-16 rounded-8 border border-gray-100 flex-between gap-8">
                  <Link href="#" className="d-flex text-main-600 text-28">
                    <i className="ph-fill ph-chats-teardrop" />
                  </Link>
                  <span className="h-26 border border-gray-100" />
                  <div className="dropdown on-hover-item">
                    <button
                      className="d-flex text-main-600 text-28"
                      type="button"
                    >
                      <i className="ph-fill ph-share-network" />
                    </button>
                    <div className="on-hover-dropdown common-dropdown border-0 inset-inline-start-auto inset-inline-end-0">
                      <ul className="flex-align gap-16">
                        <li>
                          <Link
                            href="/https://www.facebook.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-facebook-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/https://www.twitter.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-twitter-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/https://www.linkedin.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-instagram-logo" />
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/https://www.pinterest.com"
                            className="w-44 h-44 flex-center bg-main-100 text-main-600 text-xl rounded-circle hover-bg-main-600 hover-text-white"
                          >
                            <i className="ph-fill ph-linkedin-logo" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-12">
          <div className="product-dContent border rounded-24">
            <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16">
              <ul
                className="nav common-tab nav-pills mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-description-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-description"
                    type="button"
                    role="tab"
                    aria-controls="pills-description"
                    aria-selected="true"
                  >
                    Description
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-reviews-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-reviews"
                    type="button"
                    role="tab"
                    aria-controls="pills-reviews"
                    aria-selected="false"
                  >
                    Reviews
                  </button>
                </li>
              </ul>
              <Link
                href="#"
                className="btn bg-color-one rounded-16 flex-align gap-8 text-main-600 hover-bg-main-600 hover-text-white"
              >
                <img src="/assets/images/icon/satisfaction-icon.png" alt="" />
                100% Satisfaction Guaranteed
              </Link>
            </div>
            <div className="product-dContent__box">
              <div className="tab-content" id="pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="pills-description"
                  role="tabpanel"
                  aria-labelledby="pills-description-tab"
                  tabIndex={0}
                >
                  <div className="mb-40">
                    <h6 className="mb-24">Product Description</h6>
                    <p
                      className="text-gray-700"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="pills-reviews"
                  role="tabpanel"
                  aria-labelledby="pills-reviews-tab"
                  tabIndex={0}
                >
                  <div className="row g-4">
                    <div className="col-lg-6">
                      <h6 className="mb-24">Customer Reviews ({reviewStats.total})</h6>

                      {reviewsLoading ? (
                        <div className="text-center py-4">
                          <div className="spinner-border text-main-600" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : reviews.length === 0 ? (
                        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                      ) : (
                        reviews.map((review, index) => (
                          <div
                            key={review.id}
                            className={`d-flex align-items-start gap-24 ${
                              index < reviews.length - 1 ? "pb-44 border-bottom border-gray-100 mb-44" : ""
                            }`}
                          >
                            <img
                              src={review.customer?.profile_image || "/assets/images/thumbs/comment-img1.png"}
                              alt={review.customer?.name || "User"}
                              className="w-52 h-52 object-fit-cover rounded-circle flex-shrink-0"
                            />
                            <div className="flex-grow-1">
                              <div className="flex-between align-items-start gap-8">
                                <div>
                                  <h6 className="mb-12 text-md">
                                    {review.customer?.name || "Anonymous"}
                                  </h6>
                                  <div className="flex-align gap-8">
                                    {renderStars(review.rating)}
                                  </div>
                                </div>
                                <span className="text-gray-800 text-xs">
                                  {formatDate(review.created_at)}
                                </span>
                              </div>
                              <p className="text-gray-700 mt-16">{review.comment}</p>
                              {review.image && (
                                <img
                                  src={review.image}
                                  alt="Review"
                                  className="mt-12 rounded-8"
                                  style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "cover" }}
                                />
                              )}
                            </div>
                          </div>
                        ))
                      )}

                      <div className="mt-56">
                        <div>
                          <h6 className="mb-24">Write a Review</h6>
                          {!user ? (
                            <p className="text-gray-500">
                              Please <Link href="/login" className="text-main-600">login</Link> to write a review
                            </p>
                          ) : (
                            <>
                              <span className="text-heading mb-8 d-block">
                                How would you rate this product?
                              </span>
                              <div className="flex-align gap-8 mb-24">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                                    className={`text-xl fw-medium ${
                                      star <= reviewForm.rating ? "text-warning-600" : "text-gray-400"
                                    } d-flex border-0 bg-transparent cursor-pointer`}
                                  >
                                    <i className="ph-fill ph-star" />
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                        {user && (
                          <div className="mt-32">
                            <form onSubmit={handleSubmitReview}>
                              <div className="mb-32">
                                <label htmlFor="review-content" className="text-neutral-600 mb-8">
                                  Your Review
                                </label>
                                <textarea
                                  className="common-input rounded-8"
                                  id="review-content"
                                  rows={4}
                                  placeholder="Share your experience with this product..."
                                  value={reviewForm.comment}
                                  onChange={(e) =>
                                    setReviewForm((prev) => ({ ...prev, comment: e.target.value }))
                                  }
                                  required
                                />
                              </div>
                              <p className="text-gray-500 text-sm mb-16">
                                Note: You can only review products you have purchased and received.
                              </p>
                              <button
                                type="submit"
                                disabled={submittingReview}
                                className="btn btn-main rounded-pill"
                              >
                                {submittingReview ? (
                                  <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Submitting...
                                  </>
                                ) : (
                                  "Submit Review"
                                )}
                              </button>
                            </form>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="ms-xxl-5">
                        <h6 className="mb-24">Customers Feedback</h6>
                        <div className="d-flex flex-wrap gap-44">
                          <div className="border border-gray-100 rounded-8 px-40 py-52 flex-center flex-column flex-shrink-0 text-center">
                            <h2 className="mb-6 text-main-600">
                              {reviewStats.total > 0 ? reviewStats.average : "N/A"}
                            </h2>
                            <div className="flex-center gap-8">
                              {renderStars(Math.round(reviewStats.average))}
                            </div>
                            <span className="mt-16 text-gray-500">
                              {reviewStats.total > 0
                                ? `Based on ${reviewStats.total} review${reviewStats.total > 1 ? "s" : ""}`
                                : "No reviews yet"}
                            </span>
                          </div>
                          <div className="border border-gray-100 rounded-8 px-24 py-40 flex-grow-1">
                            {[5, 4, 3, 2, 1].map((star) => {
                              const count = reviewStats.distribution[star] || 0;
                              const percentage = reviewStats.total > 0
                                ? Math.round((count / reviewStats.total) * 100)
                                : 0;
                              return (
                                <div
                                  key={star}
                                  className={`flex-align gap-8 ${star > 1 ? "mb-20" : "mb-0"}`}
                                >
                                  <span className="text-gray-900 flex-shrink-0">{star}</span>
                                  <div
                                    className="progress w-100 bg-gray-100 rounded-pill h-8"
                                    role="progressbar"
                                    aria-valuenow={percentage}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                  >
                                    <div
                                      className="progress-bar bg-main-600 rounded-pill"
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <div className="flex-align gap-4">
                                    {renderStars(star, "text-xs")}
                                  </div>
                                  <span className="text-gray-900 flex-shrink-0" style={{ minWidth: "30px" }}>
                                    {count}
                                  </span>
                                </div>
                              );
                            })}
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
        <ProductCompare
          currentProduct={product}
          relatedProducts={product?.related_products}
        />
        <div className="pt-12">
          <h6 className="mb-32">Related Products</h6>
          <div className="row g-4">
            {product.related_products && product.related_products.length > 0 ? (
              product.related_products.map((relatedProduct) => (
                <div className="col-sm-6 col-lg-4 col-xl-3" key={relatedProduct.id}>
                  <ProductCard product={relatedProduct} />
                </div>
              ))
            ) : (
              <p>No related products found.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsTwo;
