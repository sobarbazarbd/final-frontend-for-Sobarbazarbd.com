import BottomFooter from "@/components/BottomFooter";
import BreadcrumbThree from "@/components/BreadcrumbThree";
import FooterOne from "@/components/FooterOne";
import HeaderOne from "@/components/HeaderOne";
import NewsletterOne from "@/components/NewsletterOne";
import VendorsListTwo from "@/components/VendorsListTwo";
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

      {/* HeaderOne */}
      <HeaderOne />

      {/* BreadcrumbThree */}
      <BreadcrumbThree title={"Vendor Details"} />

      {/* VendorsListTwo */}
      <VendorsListTwo />

      {/* NewsletterOne */}
      <NewsletterOne />

      {/* FooterOne */}
      <FooterOne />

      {/* BottomFooter */}
      <BottomFooter />
    </>
  );
};

export default page;
