import BottomFooter from "@/components/BottomFooter";
import Breadcrumb from "@/components/Breadcrumb";
import Checkout from "@/components/Checkout";
import FooterTwo from "@/components/FooterTwo";
import HeaderTwo from "@/components/HeaderTwo";
import ShippingOne from "@/components/ShippingOne";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "SobazarBd - Oniline Shopping Complex",
  description:
    "SobazarBd - Oniline Shopping Complex",
};

const page = () => {
  return (
    <>
     

      {/* ScrollToTop */}
      <ScrollToTopInit color='#FA6400' />

     



      {/* Breadcrumb */}
      <Breadcrumb title={"Checkout"} />

      {/* Checkout */}
      <Checkout />

    
    </>
  );
};

export default page;
