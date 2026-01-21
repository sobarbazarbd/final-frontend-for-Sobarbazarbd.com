import ColorInit from "@/helper/ColorInit";
import ScrollToTopInit from "@/helper/ScrollToTopInit";
import Breadcrumb from "@/components/Breadcrumb";
import ProductDetailsTwo from "@/components/ProductDetailsTwo";

const BASE_URL = "https://api.hetdcl.com";

async function getProductDetail(id) {
  const res = await fetch(`${BASE_URL}/api/v1.0/customers/products/${id}/`, { cache: "no-store" });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.data ?? null;
}

const ProductDetailPage = async ({ params }) => {
  const { id } = params;
  const product = await getProductDetail(id);

  if (!product) return <div>Product not found or error.</div>;

  const defaultVariant = product.variants?.find(v => v.is_default) || product.variants?.[0];

  // Example: Prepare discount display string if needed
  let discountText = "";
  if (defaultVariant?.discount) {
    const d = defaultVariant.discount;
    if (d.is_percentage) {
      discountText = `-${d.value}%`;
    } else {
      discountText = `-৳${d.value}`;
    }
  }

  return (
    <>
      <ColorInit color={false} />
      <ScrollToTopInit color='#299E60' />
      <Breadcrumb title={product.name} />
      {/* Pass discountText as a prop if needed */}
      <ProductDetailsTwo product={product} discountText={discountText} />
    </>
  );
};

export default ProductDetailPage;
