import BottomFooter from "@/components/BottomFooter";
import Breadcrumb from "@/components/Breadcrumb";
import FooterTwo from "@/components/FooterTwo";
import HeaderTwo from "@/components/HeaderTwo";
import ShippingOne from "@/components/ShippingOne";
import VendorTwo from "@/components/VendorTwo";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "SobazarBd - Oniline Shopping Complex",
  description:
    "jj..",
};

const page = () => {
  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTopInit color='#FA6400' />

     

      {/* Breadcrumb */}
      <Breadcrumb title={"All Vendors"} />

      {/* VendorTwo */}
      <VendorTwo />

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
