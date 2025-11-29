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
  currentPage,
  pageSize,
}) => {
  let [grid, setGrid] = useState(false);
  let [active, setActive] = useState(false);
  let [addingId, setAddingId] = useState(null);
  let [searchValue, setSearchValue] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      return params.get("search") || "";
    }
    return "";
  });
  let sidebarController = () => setActive(!active);

  const { addToCart, refreshCart } = useCart();

  // SSR: use props for products and pagination
  const products = productsData?.results || [];
  const count = productsData?.count || 0;
  const totalPages = Math.max(1, Math.ceil(count / pageSize));
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);

  // Next.js navigation and search params
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const brandParam = searchParams.get("brand");
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search") || "";

  // Use searchParams for current category/page if present
  const currentCategory = categoryParam || selectedCategory;
  const currentBrand = brandParam || selectedBrand;
  const currentPg = pageParam ? parseInt(pageParam) : currentPage;

  // handle category filter
  const handleCategoryClick = (catId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", catId);
    params.delete("page"); // reset to first page on category change
    router.push(`/shop?${params.toString()}`);
  };

  // handle brand filter
  const handleBrandChange = (brandId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("brand", brandId);
    params.delete("page"); // reset to first page on brand change
    router.push(`/shop?${params.toString()}`);
  };

  // handle pagination
  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page);
    if (currentCategory) params.set("category", currentCategory);
    router.push(`/shop?${params.toString()}`);
  };

  // handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    params.delete("page"); // reset to first page on search
    router.push(`/shop?${params.toString()}`);
  };

  // Render only main categories, no subcategories or links
  const renderCategories = () => {
    if (!categories) return null;
    return (
      <ul className='max-h-540 overflow-y-auto scroll-sm'>
        {categories.map((cat) => (
          <li key={cat.id} className='mb-16'>
            <div
              className={`d-flex align-items-center justify-content-between cursor-pointer ${
                currentCategory == cat.id ? "fw-bold text-main-600" : ""
              }`}
              style={{ fontWeight: "bold", color: "#222" }}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <span>{cat.name}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  // Helper for rendering brands
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
              <label className='form-check-label' htmlFor={`brand${brand.id}`}>
                {brand.image && (
                  <img
                    src={brand.image}
                    alt={brand.name}
                    style={{
                      width: 22,
                      height: 22,
                      objectFit: "cover",
                      marginRight: 8,
                      borderRadius: 4,
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

  // Helper for rendering products
  const renderProducts = () => {
    if (!products || products.length === 0) return null;
    return products.map((product) => {
      // --- Add to Cart handler ---
      const handleAddToCart = async (e) => {
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
                style={{
                  color: "#FA6400",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  marginLeft: 8,
                  fontWeight: 500,
                }}
                onClick={() => window.location.href = "/cart"}
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

      return (
        <div
          key={product.id}
          className='product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2'
        >
          {/* Store info */}
          {product.store && (
            <div className="d-flex align-items-center mb-8">
              {product.store.logo ? (
                <img
                  src={product.store.logo}
                  alt={product.store.name}
                  style={{
                    width: 28,
                    height: 28,
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginRight: 8,
                  }}
                />
              ) : (
                <span
                  style={{
                    width: 28,
                    height: 28,
                    display: "inline-block",
                    background: "#eee",
                    borderRadius: "50%",
                    marginRight: 8,
                    textAlign: "center",
                    lineHeight: "28px",
                    fontSize: 16,
                    color: "#888",
                  }}
                >
                  <i className="ph ph-storefront" />
                </span>
              )}
              <span className="fw-semibold text-main-600" style={{fontSize:15}}>
                {product.store.name}
              </span>
            </div>
          )}
          <Link
            href={`/shop/${product.id}`}
            className='product-card__thumb flex-center rounded-8 bg-gray-50 position-relative'
          >
            <img
              src={
                product.images?.[0]?.image ||
                "/assets/images/thumbs/product-two-img1.png"
              }
              alt={product.images?.[0]?.alt_text || ""}
              className='w-auto max-w-unset'
            />
            {/* Example badge, you can adjust logic later */}
            {product.default_variant?.discount && (
              <span className='product-card__badge bg-danger-600 px-8 py-4 text-sm text-white position-absolute inset-inline-start-0 inset-block-start-0'>
                Sale
              </span>
            )}
          </Link>
          <div className='product-card__content mt-16'>
            <h6 className='title text-lg fw-semibold mt-12 mb-8'>
              <Link
                href={`/shop/${product.id}`}
                className='link text-line-2'
                tabIndex={0}
              >
                {product.name}
              </Link>
            </h6>
            {/* Default variant name and stock */}
            {product.default_variant && (
              <div className="mb-8 text-sm text-gray-700">
                <span className="fw-medium">
                  Variant: {product.default_variant.name}
                </span>
                {" | "}
                <span>
                  Stock: {product.default_variant.stock} / {product.default_variant.available_stock}
                </span>
              </div>
            )}
            <div className='flex-align mb-20 mt-16 gap-6'>
              <span className='text-xs fw-medium text-gray-500'>
                {product.default_variant?.discount ? "4.8" : null}
              </span>
              <span className='text-15 fw-medium text-warning-600 d-flex'>
                <i className='ph-fill ph-star' />
              </span>
              <span className='text-xs fw-medium text-gray-500'>
                {product.default_variant?.discount ? "(17k)" : null}
              </span>
            </div>
            <div className='mt-8'>
              <div
                className='progress w-100 bg-color-three rounded-pill h-4'
                role='progressbar'
                aria-label='Basic example'
                aria-valuenow={35}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className='progress-bar bg-main-two-600 rounded-pill'
                  style={{ width: "35%" }}
                />
              </div>
              <span className='text-gray-900 text-xs fw-medium mt-8'>
                Sold:{" "}
                {product.default_variant?.stock || 0}/
                {product.default_variant?.available_stock || 0}
              </span>
            </div>
            {/* Price section */}
            <div className='product-card__price my-20'>
              {/* Original price (strikethrough if discounted) */}
              {product.default_variant?.discount && (
                <span className='text-gray-400 text-md fw-semibold text-decoration-line-through me-8'>
                  ৳{product.default_variant.price}
                </span>
              )}
              {/* Final price */}
              <span className='text-heading text-md fw-semibold'>
                Net Price: ৳{product.default_variant?.final_price ?? "null"}
                <span className='text-gray-500 fw-normal'> /Qty</span>
              </span>
            </div>
            <button
              type="button"
              className='product-card__cart btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-11 px-24 rounded-8 flex-center gap-8 fw-medium'
              onClick={handleAddToCart}
              disabled={addingId === product.id}
              style={{
                pointerEvents: addingId === product.id ? "none" : "auto",
                opacity: addingId === product.id ? 0.7 : 1,
              }}
            >
              {addingId === product.id ? "Adding..." : <>Add To Cart <i className='ph ph-shopping-cart' /></>}
            </button>
          </div>
        </div>
      );
    });
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
                className='shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600'
              >
                <i className='ph ph-x' />
              </button>
              <div className='shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32'>
                <h6 className='text-xl border-bottom border-gray-100 pb-24 mb-24'>
                  Product Category
                </h6>
                {renderCategories()}
              </div>
              <div className='shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32'>
                <h6 className='text-xl border-bottom border-gray-100 pb-24 mb-24'>
                  Filter by Price
                </h6>
                <div className='custom--range'>
                  <ReactSlider
                    className='horizontal-slider'
                    thumbClassName='example-thumb'
                    trackClassName='example-track'
                    defaultValue={[0, 100]}
                    ariaLabel={["Lower thumb", "Upper thumb"]}
                    ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
                    renderThumb={(props, state) => {
                      const { key, ...restProps } = props;
                      return (
                        <div {...restProps} key={state.index}>
                          {state.valueNow}
                        </div>
                      );
                    }}
                    pearling
                    minDistance={10}
                  />

                  <br />
                  <br />
                  <div className='flex-between flex-wrap-reverse gap-8 mt-24 '>
                    <button
                      type='button'
                      className='btn btn-main h-40 flex-align'
                    >
                      Filter{" "}
                    </button>
                  </div>
                </div>
              </div>

              <div className='shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32'>
                <h6 className='text-xl border-bottom border-gray-100 pb-24 mb-24'>
                  Filter by Rating
                </h6>
                <div className='flex-align gap-8 position-relative mb-20'>
                  <label
                    className='position-absolute w-100 h-100 cursor-pointer'
                    htmlFor='rating5'
                  >
                    {" "}
                  </label>
                  <div className='common-check common-radio mb-0'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='rating5'
                    />
                  </div>
                  <div
                    className='progress w-100 bg-gray-100 rounded-pill h-8'
                    role='progressbar'
                    aria-label='Basic example'
                    aria-valuenow={70}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className='progress-bar bg-main-600 rounded-pill'
                      style={{ width: "70%" }}
                    />
                  </div>
                  <div className='flex-align gap-4'>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                  </div>
                  <span className='text-gray-900 flex-shrink-0'>124</span>
                </div>
                <div className='flex-align gap-8 position-relative mb-20'>
                  <label
                    className='position-absolute w-100 h-100 cursor-pointer'
                    htmlFor='rating4'
                  >
                    {" "}
                  </label>
                  <div className='common-check common-radio mb-0'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='rating4'
                    />
                  </div>
                  <div
                    className='progress w-100 bg-gray-100 rounded-pill h-8'
                    role='progressbar'
                    aria-label='Basic example'
                    aria-valuenow={50}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className='progress-bar bg-main-600 rounded-pill'
                      style={{ width: "50%" }}
                    />
                  </div>
                  <div className='flex-align gap-4'>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-gray-400 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                  </div>
                  <span className='text-gray-900 flex-shrink-0'>52</span>
                </div>
                <div className='flex-align gap-8 position-relative mb-20'>
                  <label
                    className='position-absolute w-100 h-100 cursor-pointer'
                    htmlFor='rating3'
                  >
                    {" "}
                  </label>
                  <div className='common-check common-radio mb-0'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='rating3'
                    />
                  </div>
                  <div
                    className='progress w-100 bg-gray-100 rounded-pill h-8'
                    role='progressbar'
                    aria-label='Basic example'
                    aria-valuenow={35}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className='progress-bar bg-main-600 rounded-pill'
                      style={{ width: "35%" }}
                    />
                  </div>
                  <div className='flex-align gap-4'>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-gray-400 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-gray-400 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                  </div>
                  <span className='text-gray-900 flex-shrink-0'>12</span>
                </div>
                <div className='flex-align gap-8 position-relative mb-20'>
                  <label
                    className='position-absolute w-100 h-100 cursor-pointer'
                    htmlFor='rating2'
                  >
                    {" "}
                  </label>
                  <div className='common-check common-radio mb-0'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='rating2'
                    />
                  </div>
                  <div
                    className='progress w-100 bg-gray-100 rounded-pill h-8'
                    role='progressbar'
                    aria-label='Basic example'
                    aria-valuenow={20}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className='progress-bar bg-main-600 rounded-pill'
                      style={{ width: "20%" }}
                    />
                  </div>
                  <div className='flex-align gap-4'>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-gray-400 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-gray-400 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-gray-400 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                  </div>
                  <span className='text-gray-900 flex-shrink-0'>5</span>
                </div>
                <div className='flex-align gap-8 position-relative mb-0'>
                  <label
                    className='position-absolute w-100 h-100 cursor-pointer'
                    htmlFor='rating1'
                  >
                    {" "}
                  </label>
                  <div className='common-check common-radio mb-0'>
                    <input
                      className='form-check-input'
                      type='radio'
                      name='flexRadioDefault'
                      id='rating1'
                    />
                  </div>
                  <div
                    className='progress w-100 bg-gray-100 rounded-pill h-8'
                    role='progressbar'
                    aria-label='Basic example'
                    aria-valuenow={5}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className='progress-bar bg-main-600 rounded-pill'
                      style={{ width: "5%" }}
                    />
                  </div>
                  <div className='flex-align gap-4'>
                    <span className='text-xs fw-medium text-warning-600 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-gray-400 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-gray-400 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-gray-400 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                    <span className='text-xs fw-medium text-gray-400 d-flex'>
                      <i className='ph-fill ph-star' />
                    </span>
                  </div>
                  <span className='text-gray-900 flex-shrink-0'>2</span>
                </div>
              </div>
              <div className='shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32'>
                <h6 className='text-xl border-bottom border-gray-100 pb-24 mb-24'>
                  Filter by Color
                </h6>
                <ul className='max-h-540 overflow-y-auto scroll-sm'>
                  <li className='mb-24'>
                    <div className='form-check common-check common-radio checked-black'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='color'
                        id='color1'
                      />
                      <label className='form-check-label' htmlFor='color1'>
                        Black(12)
                      </label>
                    </div>
                  </li>
                  <li className='mb-24'>
                    <div className='form-check common-check common-radio checked-primary'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='color'
                        id='color2'
                      />
                      <label className='form-check-label' htmlFor='color2'>
                        Blue (12)
                      </label>
                    </div>
                  </li>
                  <li className='mb-24'>
                    <div className='form-check common-check common-radio checked-gray'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='color'
                        id='color3'
                      />
                      <label className='form-check-label' htmlFor='color3'>
                        Gray (12)
                      </label>
                    </div>
                  </li>
                  <li className='mb-24'>
                    <div className='form-check common-check common-radio checked-success'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='color'
                        id='color4'
                      />
                      <label className='form-check-label' htmlFor='color4'>
                        Green (12)
                      </label>
                    </div>
                  </li>
                  <li className='mb-24'>
                    <div className='form-check common-check common-radio checked-danger'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='color'
                        id='color5'
                      />
                      <label className='form-check-label' htmlFor='color5'>
                        Red (12)
                      </label>
                    </div>
                  </li>
                  <li className='mb-24'>
                    <div className='form-check common-check common-radio checked-white'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='color'
                        id='color6'
                      />
                      <label className='form-check-label' htmlFor='color6'>
                        White (12)
                      </label>
                    </div>
                  </li>
                  <li className='mb-0'>
                    <div className='form-check common-check common-radio checked-purple'>
                      <input
                        className='form-check-input'
                        type='radio'
                        name='color'
                        id='color7'
                      />
                      <label className='form-check-label' htmlFor='color7'>
                        Purple (12)
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32'>
                <h6 className='text-xl border-bottom border-gray-100 pb-24 mb-24'>
                  Filter by Brand
                </h6>
                {renderBrands()}
              </div>
              <div className='shop-sidebar__box rounded-8'>
                <img src='/assets/images/thumbs/advertise-img1.png' alt='' />
              </div>
            </div>
          </div>
          {/* Sidebar End */}
          {/* Content Start */}
          <div className='col-lg-9'>
            {/* Top Start */}
            <div className='flex-between gap-16 flex-wrap mb-40 '>
              <span className='text-gray-900'>Showing 1-20 of 85 result</span>
              <div className='position-relative flex-align gap-16 flex-wrap'>
                {/* --- Search Box --- */}
                <form
                  onSubmit={handleSearchSubmit}
                  className="d-flex align-items-center"
                  style={{ minWidth: 220, marginRight: 16 }}
                >
                  <input
                    type="text"
                    className="form-control common-input px-14 py-14 text-inherit rounded-6 w-auto"
                    placeholder="Search products..."
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    style={{ minWidth: 140 }}
                  />
                  <button
                    type="submit"
                    className="btn btn-main ms-2"
                    style={{ minWidth: 40 }}
                  >
                    <i className="ph ph-magnifying-glass" />
                  </button>
                </form>
                <div className='list-grid-btns flex-align gap-16'>
                  <button
                    onClick={() => setGrid(true)}
                    type='button'
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${
                      grid === true && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className='ph-bold ph-list-dashes' />
                  </button>
                  <button
                    onClick={() => setGrid(false)}
                    type='button'
                    className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${
                      grid === false && "border-main-600 text-white bg-main-600"
                    }`}
                  >
                    <i className='ph ph-squares-four' />
                  </button>
                </div>
                <div className='position-relative text-gray-500 flex-align gap-4 text-14'>
                  <label
                    htmlFor='sorting'
                    className='text-inherit flex-shrink-0'
                  >
                    Sort by:{" "}
                  </label>
                  <select
                    defaultValue={1}
                    className='form-control common-input px-14 py-14 text-inherit rounded-6 w-auto'
                    id='sorting'
                  >
                    <option value={1}>Popular</option>
                    <option value={1}>Latest</option>
                    <option value={1}>Trending</option>
                    <option value={1}>Matches</option>
                  </select>
                </div>
                <button
                  onClick={sidebarController}
                  type='button'
                  className='w-44 h-44 d-lg-none d-flex flex-center border border-gray-100 rounded-6 text-2xl sidebar-btn'
                >
                  <i className='ph-bold ph-funnel' />
                </button>
              </div>
            </div>
            {/* Top End */}
            <div className={`list-grid-wrapper ${grid && "list-view"}`}>
              {products.length === 0 ? (
                <div>No products found.</div>
              ) : (
                renderProducts()
              )}
            </div>
            {/* Pagination Start */}
            <ul className='pagination flex-center flex-wrap gap-16'>
              <li className={`page-item ${currentPg <= 1 ? "disabled" : ""}`}>
                <button
                  className='page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100'
                  onClick={() =>
                    currentPg > 1 && handlePageChange(currentPg - 1)
                  }
                  disabled={currentPg <= 1}
                >
                  <i className='ph-bold ph-arrow-left' />
                </button>
              </li>
              {pageNumbers.map((num) => (
                <li
                  key={num}
                  className={`page-item ${
                    currentPg === num ? "active" : ""
                  }`}
                >
                  <button
                    className='page-link h-64 w-64 flex-center text-md rounded-8 fw-medium text-neutral-600 border border-gray-100'
                    onClick={() => handlePageChange(num)}
                  >
                    {num.toString().padStart(2, "0")}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPg >= totalPages ? "disabled" : ""}`}>
                <button
                  className='page-link h-64 w-64 flex-center text-xxl rounded-8 fw-medium text-neutral-600 border border-gray-100'
                  onClick={() =>
                    currentPg < totalPages && handlePageChange(currentPg + 1)
                  }
                  disabled={currentPg >= totalPages}
                >
                  <i className='ph-bold ph-arrow-right' />
                </button>
              </li>
            </ul>
            {/* Pagination End */}
          </div>
          {/* Content End */}
        </div>
      </div>
    </section>
  );
};

export default ShopSection;
