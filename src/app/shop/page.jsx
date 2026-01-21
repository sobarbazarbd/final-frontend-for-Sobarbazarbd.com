import Breadcrumb from "@/components/Breadcrumb";
import ShopSection from "@/components/ShopSection";
import ColorInit from "@/helper/ColorInit";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "SobazarBd - Online Shopping Complex",
  description: "hello",
};

const BASE_URL = "https://api.hetdcl.com";

async function getCategories() {
  const res = await fetch(
    `${BASE_URL}/api/v1.0/stores/categories/?pagination=0`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data ?? null;
}

async function getBrands() {
  const res = await fetch(
    `${BASE_URL}/api/v1.0/stores/brands/?pagination=0`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data ?? null;
}

async function getStoreById(storeId) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/v1.0/stores/${storeId}/detail/`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    const json = await res.json();
    return json.data ?? null;
  } catch (e) {
    console.error("Error fetching store:", e);
    return null;
  }
}

async function getProducts({
  category,
  brand,
  page,
  page_size,
  subcategories,
  search,
  store,
  min_price,
  max_price,
  min_rating,
  ordering
}) {
  const params = [];
  if (category)
    params.push(`supplier_product__subcategories__category=${category}`);
  // --- Fix: support multiple subcategories ---
  if (subcategories) {
    if (Array.isArray(subcategories)) {
      subcategories.forEach((sub) => {
        params.push(`supplier_product__subcategories=${encodeURIComponent(sub)}`);
      });
    } else {
      params.push(`supplier_product__subcategories=${encodeURIComponent(subcategories)}`);
    }
  }
  if (brand) params.push(`supplier_product__brand_or_company=${brand}`);
  if (store) params.push(`supplier_product__store=${store}`);
  if (search) params.push(`search=${encodeURIComponent(search)}`);
  if (min_price) params.push(`min_price=${min_price}`);
  if (max_price) params.push(`max_price=${max_price}`);
  if (min_rating) params.push(`min_rating=${min_rating}`);
  if (ordering) params.push(`ordering=${ordering}`);
  params.push(`pagination=1`);
  params.push(`page_size=${page_size || 20}`);
  if (page) params.push(`page=${page}`);
  const url = `${BASE_URL}/api/v1.0/customers/products/?${params.join("&")}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json?.data ?? null;
  } catch (e) {
    return null;
  }
}

const Page = async ({ searchParams }) => {
  // Await the searchParams promise
  const params = await searchParams;
  const selectedCategory = params?.category || null;
  const subCategory = params?.supplier_product__subcategories || null;
  const selectedBrand = params?.brand || null;
  const selectedStore = params?.store || null;
  const currentPage = params?.page ? parseInt(params.page) : 1;
  const pageSize = 20;
  const search = params?.search || "";
  const minPrice = params?.min_price || null;
  const maxPrice = params?.max_price || null;
  const minRating = params?.min_rating || null;
  const ordering = params?.ordering || null;

  const categories = await getCategories();
  const brands = await getBrands();
  const productsData = await getProducts({
    category: selectedCategory,
    subcategories: subCategory,
    brand: selectedBrand,
    store: selectedStore,
    page: currentPage,
    page_size: pageSize,
    search,
    min_price: minPrice,
    max_price: maxPrice,
    min_rating: minRating,
    ordering: ordering,
  });

  // Fetch store data if store is selected
  const storeData = selectedStore ? await getStoreById(selectedStore) : null;

  // SSR loading/error handling
  if (!categories || !brands || !productsData) {
    return <div>Loading or error...</div>;
  }

  return (
    <>
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTopInit color='#FA6400' />

      {/* Breadcrumb */}
      <Breadcrumb title={"Shop"} />

      {/* ShopSection */}
      <ShopSection
        categories={categories}
        brands={brands}
        productsData={productsData}
        selectedCategory={selectedCategory}
        selectedBrand={selectedBrand}
        selectedStore={selectedStore}
        storeData={storeData}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  );
};

export default Page;