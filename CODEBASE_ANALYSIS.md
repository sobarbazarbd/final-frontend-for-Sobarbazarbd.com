# Codebase Analysis Report - SobazarBd

## Recent Updates (Current Session)

### ✅ Cart Functionality - Full API Integration Completed
1. **Cart Lifecycle Management** - Create, read, update, delete operations
2. **Persistent Cart ID** - Stored in localStorage for session continuity
3. **Promotional Discounts** - Display discount badges and savings
4. **Quantity Management** - Add/remove quantities with API integration (+1/-1)
5. **Stock Validation** - Real-time stock availability checks
6. **Error Recovery** - Handle missing carts, create new if needed

### 🔌 API Endpoints Integrated
- `POST /api/v1.0/customers/carts/` - Create cart (returns UUID)
- `GET /api/v1.0/customers/carts/{cart_id}/items/` - Get cart items
- `POST /api/v1.0/customers/carts/{cart_id}/items/` - Add items (supports +/- quantity)
- `PATCH /api/v1.0/customers/carts/{cart_id}/items/{id}/` - Update item quantity
- `DELETE /api/v1.0/customers/carts/{cart_id}/items/{id}/` - Remove item

### 📱 User Experience Enhancements
- ✅ Loading indicators during cart operations
- ✅ Success/error feedback messages
- ✅ Discount badges on products
- ✅ Savings calculation display
- ✅ Stock availability warnings
- ✅ Real-time cart count updates
- ✅ Quantity controls with validation

### 🔗 Navigation Fixed
- All footer links now point to correct pages
- Mobile bottom navigation implemented
- Cart count displays correctly on all devices
- Proper routing between pages

## Overview
This is a Next.js 15 e-commerce application with multiple themes and components.

## Project Structure Analysis

### 📁 Key Directories
- **src/app/** - Next.js 15 App Router pages (25 JSX files)
- **src/components/** - Reusable React components (~80 components)
- **src/helper/** - Utility components (9 files)
- **src/context/** - React Context providers (1 file)
- **public/** - Static assets (images, fonts, data JSON files)

### 🔍 Component Usage Analysis

#### **ACTIVE ROUTES (Used in Production)**
1. `/` (Home page) - Main landing page
2. `/shop` - Product listing with filters
3. `/product/[slug]` - Dynamic product details
4. `/cart` - Shopping cart
5. `/checkout` - Checkout process
6. `/login` - Authentication
7. `/signup` - Registration
8. `/dashboard` - User dashboard
9. `/account` - User account
10. `/category/[slug]` - Category pages
11. `/blog` - Blog listing
12. `/blog-details` - Blog details
13. `/contact` - Contact page
14. `/wishlist` - Wishlist
15. `/become-seller` - Seller registration
16. `/vendor` - Vendor listing
17. `/vendor-details` - Vendor details

#### **DEMO/TEMPLATE ROUTES (Not Used)**
- `/index-two` - Alternative homepage (Theme 2)
- `/index-three` - Alternative homepage (Theme 3)
- `/product-details` - Old product details template
- `/product-details-two` - Alternative product details
- `/vendor-two` - Alternative vendor listing
- `/vendor-two-details` - Alternative vendor details
- `/shop/[id]` - Alternative shop route (conflicts with /product/[slug])

### 🗑️ UNUSED/REDUNDANT FILES

#### Components with Duplicates
1. **HeaderOne** exists in:
   - `src/components/HeaderOne.jsx` ✅ (imported in layout)
   - `src/components/Header/HeaderOne.jsx` ✅ (actual usage)
   
2. **FooterOne** exists in:
   - `src/components/FooterOne.jsx` (unused)
   - `src/components/Footer/FooterOne.jsx` ✅ (actual usage)

#### Likely Unused Components (Template/Demo Only)
These are used ONLY in demo pages (index-two, index-three):
- `BannerTwo.jsx` - Used in index-two only
- `BannerThree.jsx` - Used in index-three only
- `BrandThree.jsx` - Used in index-three only
- `BrandTwo.jsx` - Appears unused
- `DeliveryOne.jsx` - Appears unused
- `ProductListOne.jsx` - Appears unused
- `HeaderTwo.jsx` - Used in demo pages
- `HeaderThree.jsx` - Used in index-three only
- `FooterTwo.jsx` - Used in demo pages
- `FooterThree.jsx` - Used in index-three only
- `TopSellingOne.jsx` - Used in index-two only
- `TopSellingTwo.jsx` - Used in index-two only
- `TopVendorsTwo.jsx` - Used in index-two only
- `NewArrivalThree.jsx` - Used in index-three only
- `TrendingThree.jsx` - Used in index-three only
- `DiscountThree.jsx` - Used in index-three only
- `PromotionalTwo.jsx` - Used in index-two only
- `NewsletterTwo.jsx` - Used in index-two only
- `NewsletterThree.jsx` - Used in index-three only
- `ShippingTwo.jsx` - Used in demo pages
- `ShippingThree.jsx` - Used in index-three only
- `BigDealOne.jsx` - Used in index-two only
- `FeaturedOne.jsx` - Used in index-two only
- `DaySaleOne.jsx` - Used in index-two only
- `RecentlyViewedOne.jsx` - Used in index-two only
- `DealsSection.jsx` - Used in index-three only
- `PopularProductsThree.jsx` - Used in index-three only
- `InstagramSection.jsx` - Used in index-three only
- `VendorTwo.jsx` - Used in vendor-two demo
- `VendorTwoDetails.jsx` - Used in vendor-two-details demo
- `BreadcrumbTwo.jsx` - Used in demo pages
- `BreadcrumbThree.jsx` - Used in vendor pages (keep if vendors used)

#### Potentially Unused Helper Files
- `Animation.jsx` - Need to check if animations are used
- `Countdown.js` - Need to check usage
- `BootstrapInit.js` - ✅ Used in layout
- `PhosphorIconInit.js` - ✅ Used in layout
- `RouteScrollToTop.jsx` - ✅ Used in layout
- `ColorInit.jsx` - ✅ Used in multiple pages
- `ScrollToTopInit.jsx` - ✅ Used in multiple pages
- `Preloader.jsx` - Used in some demo pages
- `QuantityControl.jsx` - Likely used in product components

### 📄 ROOT LEVEL FILES TO REVIEW
- `product` (file, not folder) - Contains PrestaShop copyright notice, likely leftover template file **→ DELETE**

### 📊 Public Assets
- Multiple JSON files in `public/data/` - Need to verify if all are used
- Check if all images in `public/assets/images/` are referenced

## 🎯 RECOMMENDATIONS

### Priority 1: Remove Demo Pages (Safe to Delete)
Delete these entire directories:
```
src/app/index-two/
src/app/index-three/
src/app/product-details/ (old template)
src/app/product-details-two/ (old template)
src/app/vendor-two/
src/app/vendor-two-details/
src/app/shop/[id]/ (conflicts with /product/[slug])
```

### Priority 2: Remove Demo-Only Components
After removing demo pages, these become unused:
```
src/components/BannerTwo.jsx
src/components/BannerThree.jsx
src/components/HeaderTwo.jsx
src/components/HeaderThree.jsx
src/components/FooterTwo.jsx
src/components/FooterThree.jsx
src/components/BrandTwo.jsx
src/components/BrandThree.jsx
src/components/TopSellingOne.jsx
src/components/TopSellingTwo.jsx
src/components/TopVendorsTwo.jsx
src/components/NewArrivalThree.jsx
src/components/TrendingThree.jsx
src/components/DiscountThree.jsx
src/components/PromotionalTwo.jsx
src/components/NewsletterTwo.jsx
src/components/NewsletterThree.jsx
src/components/ShippingTwo.jsx
src/components/ShippingThree.jsx
src/components/BigDealOne.jsx
src/components/FeaturedOne.jsx
src/components/DaySaleOne.jsx
src/components/RecentlyViewedOne.jsx
src/components/DealsSection.jsx
src/components/PopularProductsThree.jsx
src/components/InstagramSection.jsx
src/components/DeliveryOne.jsx
src/components/ProductListOne.jsx
src/components/VendorTwo.jsx
src/components/VendorTwoDetails.jsx
src/components/BreadcrumbTwo.jsx
```

### Priority 3: Consolidate Duplicate Components
- Remove `src/components/FooterOne.jsx` (use Footer/FooterOne.jsx)
- Verify HeaderOne usage and remove duplicate

### Priority 4: Remove Root Level Unused Files
```
Delete: product (file at root)
```

### Priority 5: Optimize Public Assets
- Audit `public/data/*.json` files for usage
- Remove unused images (requires deeper analysis)

### Priority 6: Code Organization
- All demo-specific SCSS could be removed from `public/assets/sass/`
- Review and remove unused SASS partials for home-two and homeThree

## 🔧 OPTIMIZATION OPPORTUNITIES

### 1. **Consolidate Shipping Components**
Currently have ShippingOne, ShippingTwo, ShippingThree - likely can merge into one configurable component

### 2. **Consolidate Newsletter Components**
Three newsletter components could be one with theme variants

### 3. **Consolidate Banner Components**
Three banner components could be unified

### 4. **Component Structure**
- Move all Header variants to `src/components/Header/`
- Move all Footer variants to `src/components/Footer/`
- Create `src/components/Layout/` for layout-specific components

### 5. **Unused Dependencies Check**
After cleanup, run:
```bash
npx depcheck
```

### 6. **Bundle Size Optimization**
- Remove unused imports across remaining components
- Tree-shake Material-UI imports (currently importing large icons)
- Consider lazy loading for dashboard page

## 📈 ESTIMATED IMPACT

### Files to Delete:
- **7 demo page directories** (~140 LOC each = ~1,000 lines)
- **30+ unused components** (~2,000-3,000 lines)
- **SCSS partials for unused themes** (~500-1,000 lines)
- **Total reduction: ~4,000-5,000 lines of code (30-40% reduction)**

### Benefits:
- ✅ Faster build times
- ✅ Smaller bundle size
- ✅ Easier maintenance
- ✅ Clearer project structure
- ✅ Reduced confusion for developers

## ⚠️ CAUTIONS

1. **Backup before deletion** - Create a git commit/branch
2. **Test after each major deletion** - Run `npm run build` to ensure no errors
3. **Check vendor pages** - If vendors are used in production, keep those routes
4. **Material-UI Dashboard** - Dashboard page uses Material-UI extensively, might want to refactor to match project style

## 🚀 EXECUTION PLAN

1. ✅ Create this analysis document
2. Create git backup branch
3. Remove demo pages (index-two, index-three, etc.)
4. Test build
5. Remove components only used by deleted pages
6. Test build
7. Remove duplicate components
8. Test build
9. Remove unused helpers (if any)
10. Clean up SCSS files
11. Final build and testing
