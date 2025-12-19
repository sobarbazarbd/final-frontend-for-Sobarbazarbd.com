import React from "react";
import ProductDetailsOne from "@/components/ProductDetailsOne";
import Breadcrumb from "@/components/Breadcrumb";
import FooterTwo from "@/components/FooterTwo";
import HeaderTwo from "@/components/HeaderTwo";
import ShippingTwo from "@/components/ShippingTwo";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

const ProductDetailPage = ({ params }) => {
  const { slug } = params;

  return (
    <>
      <ColorInit color={true} />
      <ScrollToTopInit color="#19fa00ff" />
      <Preloader />
      <Breadcrumb title={slug.replace(/-/g, " ")} />
      
      <ProductDetailsOne productSlug={slug} />
 
    </>
  );
};

export default ProductDetailPage;