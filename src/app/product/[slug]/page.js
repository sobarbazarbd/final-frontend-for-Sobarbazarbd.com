import ProductDetailsOne from "@/components/ProductDetailsOne";

const ProductDetailPage = ({ params }) => {
  const { slug } = params;

  return <ProductDetailsOne productSlug={slug} />;
};

export default ProductDetailPage;