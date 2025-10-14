import BottomFooter from "@/components/BottomFooter";
import BreadcrumbTwo from "@/components/BreadcrumbTwo";
import FooterOne from "@/components/FooterOne";
import HeaderOne from "@/components/HeaderOne";
import NewArrivalTwo from "@/components/NewArrivalTwo";
import NewsletterOne from "@/components/NewsletterOne";
import ProductDetailsOne from "@/components/ProductDetailsOne";
import ShippingOne from "@/components/ShippingOne";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "SobazarBd - Oniline Shopping Complex",
  description:
    "hello",
};

const page = () => {
  return (
    <>
      {/* ColorInit */}
      <ColorInit color={false} />

      {/* ScrollToTop */}
      <ScrollToTopInit color='#299E60' />

      {/* Preloader */}
      <Preloader />

    

      {/* Breadcrumb */}
      <BreadcrumbTwo title={"Product Details"} />

      {/* ProductDetailsOne */}
      <ProductDetailsOne />

      {/* NewArrivalTwo */}
      <NewArrivalTwo />

      {/* ShippingOne */}
      <ShippingOne />

      {/* NewsletterOne */}
      <NewsletterOne />

      {/* FooterTwo */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default page;
