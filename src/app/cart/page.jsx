import BottomFooter from "@/components/BottomFooter";
import Breadcrumb from "@/components/Breadcrumb";
import CartSection from "@/components/CartSection";
import FooterTwo from "@/components/FooterTwo";
import HeaderTwo from "@/components/HeaderTwo";
import ShippingOne from "@/components/ShippingOne";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "SobazarBd - Oniline Shopping Complex",
  description:
    "h",
};

const page = () => {
  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTopInit color='#FA6400' />
      
      {/* Breadcrumb */}
      <Breadcrumb title={"Cart"} />

      {/* CartSection */}
      <CartSection />

      {/* ShippingOne */}
      <ShippingOne />

      {/* FooterTwo */}
      <FooterTwo />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default page;
