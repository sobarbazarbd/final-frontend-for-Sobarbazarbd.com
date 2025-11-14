import Breadcrumb from "@/components/Breadcrumb";
import ShopSection from "@/components/ShopSection";
import ColorInit from "@/helper/ColorInit";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "SobazarBd - Online Shopping Complex",
  description: "hello",
};

const BASE_URL = "http://localhost:8000";

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

async function getProducts({ category, brand, page, page_size }) {
  // Use correct backend params for category and brand filtering
  const params = [];
  if (category)
    params.push(`supplier_product__subcategories__category=${category}`);
  if (brand) params.push(`supplier_product__brand_or_company=${brand}`);
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
  const selectedBrand = params?.brand || null;
  const currentPage = params?.page ? parseInt(params.page) : 1;
  const pageSize = 20;

  const categories = await getCategories();
  const brands = await getBrands();
  const productsData = await getProducts({
    category: selectedCategory,
    brand: selectedBrand,
    page: currentPage,
    page_size: pageSize,
  });

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
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </>
  );
};

export default Page;