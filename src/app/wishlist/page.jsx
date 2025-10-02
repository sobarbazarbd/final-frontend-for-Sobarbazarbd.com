import BottomFooter from "@/components/BottomFooter";
import Breadcrumb from "@/components/Breadcrumb";
import FooterTwo from "@/components/FooterTwo";
import HeaderTwo from "@/components/HeaderTwo";
import ShippingOne from "@/components/ShippingOne";
import WishListSection from "@/components/WishListSection";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "SobazarBd - Oniline Shopping Complex",
  description:
    "ooo",
};

const page = () => {
  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTopInit color='#FA6400' />

      {/* Preloader */}
      <Preloader />

      {/* HeaderTwo */}
      <HeaderTwo category={true} />

      {/* Breadcrumb */}
      <Breadcrumb title={"My Wishlist"} />

      {/* WishListSection */}
      <WishListSection />

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
