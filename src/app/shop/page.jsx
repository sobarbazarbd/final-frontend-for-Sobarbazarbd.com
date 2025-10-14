import Breadcrumb from "@/components/Breadcrumb";
import FooterTwo from "@/components/FooterTwo";
import HeaderTwo from "@/components/HeaderTwo";
import ShippingTwo from "@/components/ShippingTwo";
import ShopSection from "@/components/ShopSection";
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
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTopInit color='#FA6400' />

     

      {/* Breadcrumb */}
      <Breadcrumb title={"Shop"} />

      {/* ShopSection */}
      <ShopSection />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}
      <FooterTwo />
    </>
  );
};

export default page;
