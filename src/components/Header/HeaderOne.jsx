"use client";
import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import query from "jquery";
import { NavFooterContext } from "@/context/NavFooterProvider";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import { headerConfig } from "./data/headerConfig";
import { navigation } from "./data/navigation";
import { locationOptions } from "./data/selectOptions";
import TextSlider from "../TextSlider";

const HeaderOne = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  let pathname = usePathname();
  const router = useRouter();
  const [scroll, setScroll] = useState(false);

  const navFooter = useContext(NavFooterContext);
  const ownerInfo = navFooter?.ownerInfo ?? null;
  const categoriesFromApi = navFooter?.categories ?? [];

  const [showFallback, setShowFallback] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShowFallback(true), 700);
    return () => clearTimeout(t);
  }, []);

  const fallbackLogo = headerConfig.logo.src;
  const fallbackPhone = headerConfig.contact?.phone ?? "01713332003";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScroll(window.pageYOffset > 150);
      };
      window.addEventListener("scroll", handleScroll);

      const selectElement = query(".js-example-basic-single");
      selectElement.select2();
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (selectElement.data("select2")) {
          selectElement.select2("destroy");
        }
      };
    }
  }, []);

  // Mobile menu support
  const [menuActive, setMenuActive] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleMenuClick = (index) => {
    // Only allow dropdown toggle for items that actually have submenus
    const item = navigation[index];
    if (item && item.submenu) {
      setActiveIndex(activeIndex === index ? null : index);
    }
  };
  const handleMenuToggle = () => {
    setMenuActive(!menuActive);
  };

  // Search control support
  const [activeSearch, setActiveSearch] = useState(false);
  const handleSearchToggle = () => {
    setActiveSearch(!activeSearch);
  };

  // category control support
  const [activeCategory, setActiveCategory] = useState(false);
  const handleCategoryToggle = () => {
    setActiveCategory(!activeCategory);
  };
  const [activeIndexCat, setActiveIndexCat] = useState(null);
  const handleCatClick = (index) => {
    setActiveIndexCat(activeIndexCat === index ? null : index);
  };

  // Header search state
  const [headerSearch, setHeaderSearch] = useState("");

  const handleHeaderSearchSubmit = (e) => {
    e.preventDefault();
    if (headerSearch && headerSearch.trim().length > 0) {
      router.push(`/shop?search=${encodeURIComponent(headerSearch.trim())}`);
      setActiveSearch(false);
    }
  };

  const isActivePath = (path) => {
    return pathname === path;
  };

  // Helper function to render badge
  const renderBadge = (badge) => {
    if (!badge) return null;
    return (
      <span className={`badge-notification bg-${badge.color}-600 text-white text-sm py-2 px-8 rounded-4`}>
        {badge.text}
      </span>
    );
  };

  const renderSelectOptions = (options) => {
    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  };

  console.log("selected category", activeCategory)

  return (
    <>
    <TextSlider></TextSlider>
      <div className='overlay' />
      <div
        className={`side-overlay ${(menuActive || activeCategory) && "show"}`}
      />
      
      {/* ==================== Search Box Start Here ==================== */}
      <form
        onSubmit={handleHeaderSearchSubmit}
        className={`search-box ${activeSearch && "active"}`}
      >
        <button
          onClick={handleSearchToggle}
          type='button'
          className='search-box__close position-absolute inset-block-start-0 inset-inline-end-0 m-16 w-48 h-48 border border-gray-100 rounded-circle flex-center text-white hover-text-gray-800 hover-bg-white text-2xl transition-1'
        >
          <i className='ph ph-x' />
        </button>
        <div className='container'>
          <div className='position-relative'>
            <input
              type='text'
              className='form-control py-16 px-24 text-xl rounded-pill pe-64'
              placeholder='Search for a product or brand'
              value={headerSearch}
              onChange={e => setHeaderSearch(e.target.value)}
            />
            <button
              type='submit'
              className='w-48 h-48 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8'
            >
              <i className='ph ph-magnifying-glass' />
            </button>
          </div>
        </div>
      </form>
      {/* ==================== Search Box End Here ==================== */}
      
      {/* ==================== Mobile Menu Start Here ==================== */}
      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${
          menuActive && "active"
        }`}
      >
        <button
          onClick={() => {
            handleMenuToggle();
            setActiveIndex(null);
          }}
          type='button'
          className='close-button'
        >
          <i className='ph ph-x' />{" "}
        </button>
        <div className='mobile-menu__inner'>
          <Link href='/' className='mobile-menu__logo'>
            <img src={headerConfig.logo.src} alt={headerConfig.logo.alt} />
          </Link>
          <div className='mobile-menu__menu'>
            {/* Nav Menu Start */}
            <ul className='nav-menu flex-align nav-menu--mobile'>
              {navigation.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleMenuClick(index)}
                  className={`on-hover-item nav-menu__item ${item.submenu ? "has-submenu" : ""} ${
                    activeIndex === index ? "d-block" : ""
                  }`}
                >
                  <Link href={item.path} className='nav-menu__link'>
                    {item.badge && renderBadge(item.badge)}
                    {item.title}
                  </Link>
                  {item.submenu && (
                    <ul
                      className={`on-hover-dropdown common-dropdown nav-submenu scroll-sm ${
                        activeIndex === index ? "open" : ""
                      }`}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex} className='common-dropdown__item nav-submenu__item'>
                          <Link
                            href={subItem.path}
                            className='common-dropdown__link nav-submenu__link hover-bg-neutral-100'
                            onClick={() => setActiveIndex(null)}
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            {/* Nav Menu End */}
          </div>
        </div>
      </div>
      {/* ==================== Mobile Menu End Here ==================== */}
      
      {/* ======================= Middle Top Start ========================= */}
      <div className='header-top bg-main-600 flex-between'>
        <div className='container container-lg'>
          <div className='flex-between flex-wrap gap-8'>
            <ul className='flex-align flex-wrap d-none d-md-flex'>
              {headerConfig.topLinks.map((link, index) => (
                <li key={index} className='border-right-item'>
                  <Link
                    href={link.href}
                    className='text-white text-sm hover-text-decoration-underline'
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className='header-top__right flex-align flex-wrap'>
              <li className='on-hover-item border-right-item border-right-item-sm-space has-submenu arrow-white'>
                <Link href='#' className='text-white text-sm py-8'>
                  Help Center
                </Link>
                <ul className='on-hover-dropdown common-dropdown common-dropdown--sm max-h-200 scroll-sm px-0 py-8'>
                  {headerConfig.helpCenter.map((item, index) => (
                    <li key={index} className='nav-submenu__item'>
                      <Link
                        href={item.href}
                        className='nav-submenu__link hover-bg-gray-100 text-gray-500 text-xs py-6 px-16 flex-align gap-8 rounded-0'
                      >
                        <span className='text-sm d-flex'>
                          <i className={item.icon} />
                        </span>
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className='border-right-item'>
                {user ? (
                  <div className="dropdown">
                    <Link
                      href='#'
                      className='text-white text-sm py-8 flex-align gap-6 dropdown-toggle'
                      data-bs-toggle="dropdown"
                    >
                      <span className='icon text-md d-flex'>
                        <i className='ph ph-user-circle' />
                      </span>
                      <span className='hover-text-decoration-underline'>
                        {user.username}
                      </span>
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" href="/dashboard">
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={logout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    href='/login'
                    className='text-white text-sm py-8 flex-align gap-6'
                  >
                    <span className='icon text-md d-flex'>
                      <i className='ph ph-user-circle' />
                    </span>
                    <span className='hover-text-decoration-underline'>
                      Login / Register
                    </span>
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ======================= Middle Top End ========================= */}
      
      {/* ======================= Middle Header Start ========================= */}
      <header className='header-middle bg-color-one border-bottom border-gray-100'>
        <div className='container container-lg'>
          <nav className='header-inner flex-between'>
            {/* Logo Start */}
            <div className='logo'>
              <Link href='/' className='link'>
                {ownerInfo?.logo ? (
                  <img src={ownerInfo.logo} alt={ownerInfo.owner_name ?? "Logo"} />
                ) : !showFallback ? (
                  // skeleton logo
                  <div style={{ width: 140, height: 40, background: "#eee", borderRadius: 8 }} />
                ) : (
                  <img src={fallbackLogo} alt='Logo' />
                )}
              </Link>
            </div>
            {/* Logo End  */}
            
            {/* form location Start */}
            <form
              onSubmit={handleHeaderSearchSubmit}
              className='flex-align flex-wrap form-location-wrapper'
            >
              <div className='search-category d-flex h-48 select-border-end-0 radius-end-0 search-form d-sm-flex d-none'>
                <select
                  defaultValue={1}
                  className='js-example-basic-single border border-gray-200 border-end-0'
                  name='state'
                >
                  <option value={1}>All Categories</option>
                  {categoriesFromApi.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <div className='search-form__wrapper position-relative'>
                  <input
                    type='text'
                    className='search-form__input common-input py-13 ps-16 pe-18 rounded-end-pill pe-44'
                    placeholder='Search for a product or brand'
                    value={headerSearch}
                    onChange={e => setHeaderSearch(e.target.value)}
                  />
                  <button
                    type='submit'
                    className='w-32 h-32 bg-main-600 rounded-circle flex-center text-xl text-white position-absolute top-50 translate-middle-y inset-inline-end-0 me-8'
                  >
                    <i className='ph ph-magnifying-glass' />
                  </button>
                </div>
              </div>
              <div className='location-box bg-white flex-align gap-8 py-6 px-16 rounded-pill border border-gray-100'>
                <span className='text-gray-900 text-xl d-xs-flex d-none'>
                  <i className='ph ph-map-pin' />
                </span>
                <div className='line-height-1'>
                  <span className='text-gray-600 text-xs'>Your Location</span>
                  <div className='line-height-1'>
                    <select
                      defaultValue={1}
                      className='js-example-basic-single border border-gray-200 border-end-0'
                      name='state'
                    >
                      {renderSelectOptions(locationOptions)}
                    </select>
                  </div>
                </div>
              </div>
              <div className='location-box bg-white flex-align gap-8 py-6 px-16 rounded-pill border border-gray-100'>
                <span className='text-gray-900 text-xl d-xs-flex d-none'>
                  <i className='ph ph-map-pin' />
                </span>
                <div className='line-height-1'>
                  <span className='text-gray-600 text-xs'>Shop Location</span>
                  <div className='line-height-1'>
                    <select
                      defaultValue={1}
                      className='js-example-basic-single border border-gray-200 border-end-0'
                      name='state'
                    >
                      {renderSelectOptions(locationOptions)}
                    </select>
                  </div>
                </div>
              </div>
            </form>
            {/* form location start */}
            
            {/* Header Middle Right start */}
            <div className='header-right flex-align d-lg-block d-none'>
              <div className='flex-align flex-wrap gap-12'>
                <button
                  type='button'
                  className='search-icon flex-align d-lg-none d-flex gap-4 item-hover'
                >
                  <span className='text-2xl text-gray-700 d-flex position-relative item-hover__text'>
                    <i className='ph ph-magnifying-glass' />
                  </span>
                </button>
                <Link href='/wishlist' className='flex-align gap-4 item-hover'>
                  <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                    <i className='ph ph-heart' />
                    <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>
                      0
                    </span>
                  </span>
                  <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                    Wishlist
                  </span>
                </Link>
                <Link href='/cart' className='flex-align gap-4 item-hover'>
                  <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                    <i className='ph ph-shopping-cart-simple' />
                    {cartCount > 0 && (
                      <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>
                        {cartCount}
                      </span>
                    )}
                  </span>
                  <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                    Cart
                  </span>
                </Link>
              </div>
            </div>
            {/* Header Middle Right End  */}
          </nav>
        </div>
      </header>
      {/* ======================= Middle Header End ========================= */}
      
      {/* ==================== Header Start Here ==================== */}
      <header
        className={`header bg-white border-bottom border-gray-100 ${
          scroll && "fixed-header"
        }`}
      >
        <div className='container container-lg'>
          <nav className='header-inner d-flex justify-content-between gap-8'>
            <div className='flex-align menu-category-wrapper'>
              {/* Category Dropdown Start */}
              <div className='category on-hover-item'>
                <button
                  onClick={handleCategoryToggle}
                  type='button'
                  className='category__button flex-align gap-8 fw-medium p-16 border-end border-start border-gray-100 text-heading'
                >
                  <span className='icon text-2xl d-xs-flex d-none'>
                    <i className='ph ph-dots-nine' />
                  </span>
                  <span className='d-sm-flex d-none'>All</span> Categories
                  <span className='arrow-icon text-xl d-flex'>
                    <i className='ph ph-caret-down' />
                  </span>
                </button>
                <div
                  className={`responsive-dropdown cat on-hover-dropdown common-dropdown nav-submenu p-0 submenus-submenu-wrapper ${
                    activeCategory && "active"
                  }`}
                >
                  <button
                    onClick={() => {
                      handleCategoryToggle();
                      setActiveIndexCat(null);
                    }}
                    type='button'
                    className='close-responsive-dropdown rounded-circle text-xl position-absolute inset-inline-end-0 inset-block-start-0 mt-4 me-8 d-lg-none d-flex'
                  >
                    {" "}
                    <i className='ph ph-x' />{" "}
                  </button>
                  {/* Logo Start */}
                  <div className='logo px-16 d-lg-none d-block'>
                    <Link href='/' className='link'>
                      {ownerInfo?.logo ? (
                        <img src={ownerInfo.logo} alt={ownerInfo.owner_name ?? "Logo"} />
                      ) : !showFallback ? (
                        // skeleton logo
                        <div style={{ width: 140, height: 40, background: "#eee", borderRadius: 8 }} />
                      ) : (
                        <img src={fallbackLogo} alt='Logo' />
                      )}
                    </Link>
                  </div>
                  {/* Logo End */}
                  <ul className='scroll-sm p-0 py-8 w-300 max-h-400 overflow-y-auto'>
                    {categoriesFromApi.length > 0 ? (
                      categoriesFromApi.map((category, idx) => (
                        <li key={category.id} onClick={() => handleCatClick(idx)} className={`has-submenus-submenu ${activeIndexCat === idx ? "active" : ""}`}>
                          <Link href='#' className='text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0'>
                            <span className='text-xl d-flex'>
                              <i className='ph ph-brandy' />
                            </span>
                            <span>{category.name}</span>
                            <span className='icon text-md d-flex ms-auto'>
                              <i className='ph ph-caret-right' />
                            </span>
                          </Link>
                          <div className={`submenus-submenu py-16 ${activeIndexCat === idx ? "open" : ""}`}>
                            <h6 className='text-lg px-16 submenus-submenu__title'>{category.name}</h6>
                            <ul className='submenus-submenu__list max-h-300 overflow-y-auto scroll-sm'>
                              {Array.isArray(category.subcategories) && category.subcategories.map((sub) => (
                                <li key={sub.id}>
                                  <Link href={`/shop?subcategory=${sub.id}`}>{sub.name}</Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))
                    ) : (
                      // fallback static menu if API not available
                      <>
                        <li className='has-submenus-submenu'>
                          <Link href='#' className='text-gray-500 text-15 py-12 px-16 flex-align gap-8 rounded-0'>
                            <span className='text-xl d-flex'>
                              <i className='ph ph-carrot' />
                            </span>
                            <span>Vegetables &amp; Fruit</span>
                            <span className='icon text-md d-flex ms-auto'>
                              <i className='ph ph-caret-right' />
                            </span>
                          </Link>
                          <div className='submenus-submenu py-16'>
                            <h6 className='text-lg px-16 submenus-submenu__title'>Vegetables &amp; Fruit</h6>
                            <ul className='submenus-submenu__list max-h-300 overflow-y-auto scroll-sm'>
                              <li><Link href='/shop'>Potato &amp; Tomato</Link></li>
                              <li><Link href='/shop'>Cucumber &amp; Capsicum</Link></li>
                            </ul>
                          </div>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
              {/* Category Dropdown End  */}
              
              {/* Menu Start  */}
              <div className='header-menu d-lg-block d-none'>
                {/* Nav Menu Start */}
                <ul className='nav-menu flex-align '>
                  {navigation.map((item, index) => {
                    // Identify items that should not have dropdown
                    const noDropdownItems = ['Home', 'All Products', 'Store', 'Contact Us'];
                    const hasDropdown = item.submenu && !noDropdownItems.includes(item.title);
                    
                    return (
                      <li key={index} className={`on-hover-item nav-menu__item ${hasDropdown ? 'has-submenu' : ''}`}>
                        {item.badge && renderBadge(item.badge)}
                        <Link 
                          href={item.path} 
                          className={`nav-menu__link ${isActivePath(item.path) && "activePage"}`}
                        >
                          {item.title}
                        </Link>
                        {hasDropdown && (
                          <ul className='on-hover-dropdown common-dropdown nav-submenu scroll-sm'>
                            {item.submenu.map((subItem, subIndex) => (
                              <li key={subIndex} className='common-dropdown__item nav-submenu__item'>
                                <Link
                                  href={subItem.path}
                                  className={`common-dropdown__link nav-submenu__link hover-bg-neutral-100 ${
                                    isActivePath(subItem.path) && "activePage"
                                  }`}
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
                {/* Nav Menu End */}
              </div>
              {/* Menu End  */}
            </div>
            
            {/* Header Right start */}
            <div className='header-right flex-align'>
              <a
                href={ownerInfo?.phone ? `tel:${ownerInfo.phone}` : `tel:${fallbackPhone}`}
                className='bg-main-600 text-white p-12 h-100 hover-bg-main-800 flex-align gap-8 text-lg d-lg-flex d-none'
              >
                <div className='d-flex text-32'>
                  <i className='ph ph-phone-call' />
                </div>
                {ownerInfo?.phone ? (
                  ownerInfo.phone
                ) : !showFallback ? (
                  <span style={{ display: "inline-block", width: 120, height: 16, background: "#eee", borderRadius: 6 }} />
                ) : (
                  fallbackPhone
                )}
              </a>
              <div className='me-16 d-lg-none d-block'>
                <div className='flex-align flex-wrap gap-12'>
                  <button
                    onClick={handleSearchToggle}
                    type='button'
                    className='search-icon flex-align d-lg-none d-flex gap-4 item-hover'
                  >
                    <span className='text-2xl text-gray-700 d-flex position-relative item-hover__text'>
                      <i className='ph ph-magnifying-glass' />
                    </span>
                  </button>
                  <Link
                    href='/wishlist'
                    className='flex-align gap-4 item-hover'
                  >
                    <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                      <i className='ph ph-heart' />
                      <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>
                        2
                      </span>
                    </span>
                    <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                      Wishlist
                    </span>
                  </Link>
                  <Link href='/cart' className='flex-align gap-4 item-hover'>
                    <span className='text-2xl text-gray-700 d-flex position-relative me-6 mt-6 item-hover__text'>
                      <i className='ph ph-shopping-cart-simple' />
                      {cartCount > 0 && (
                        <span className='w-16 h-16 flex-center rounded-circle bg-main-600 text-white text-xs position-absolute top-n6 end-n4'>
                          {cartCount}
                        </span>
                      )}
                    </span>
                    <span className='text-md text-gray-500 item-hover__text d-none d-lg-flex'>
                      Cart
                    </span>
                  </Link>
                </div>
              </div>
              <button
                onClick={handleMenuToggle}
                type='button'
                className='toggle-mobileMenu d-lg-none ms-3n text-gray-800 text-4xl d-flex'
              >
                {" "}
                <i className='ph ph-list' />{" "}
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>
      {/* ==================== Header End Here ==================== */}
      
      {/* ==================== Mobile Bottom Navbar Start ==================== */}
      <nav className="navbar fixed-bottom navbar-light bg-white border-top shadow-sm d-lg-none">
        <div className="container-fluid d-flex justify-content-between text-center">
          <Link href="/" className="flex-fill text-decoration-none text-dark py-2">
            <i className="ph ph-house fs-4 d-block"></i>
            <small className="d-block">Home</small>
          </Link>
          <Link href="/shop" className="flex-fill text-decoration-none text-dark py-2">
            <i className="ph ph-storefront fs-4 d-block"></i>
            <small className="d-block">Shop</small>
          </Link>
          <Link href="/cart" className="flex-fill text-decoration-none text-dark py-2 position-relative">
            <i className="ph ph-shopping-cart-simple fs-4 d-block"></i>
            <small className="d-block">Cart</small>
            {cartCount > 0 && (
              <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/wishlist" className="flex-fill text-decoration-none text-dark py-2 position-relative">
            <i className="ph ph-heart fs-4 d-block"></i>
            <small className="d-block">Wishlist</small>
            <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
              2
            </span>
          </Link>
          <Link href="/account" className="flex-fill text-decoration-none text-dark py-2">
            <i className="ph ph-user-circle fs-4 d-block"></i>
            <small className="d-block">Account</small>
          </Link>
        </div>
      </nav>
      {/* ==================== Mobile Bottom Navbar End ==================== */}
    </>
  );
};

export default HeaderOne;