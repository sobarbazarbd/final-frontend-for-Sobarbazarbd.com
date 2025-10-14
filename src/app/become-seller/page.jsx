import BottomFooter from "@/components/BottomFooter";
import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbImage from "@/components/BreadcrumbImage";
import CounterSection from "@/components/CounterSection";
import FooterTwo from "@/components/FooterTwo";
import HeaderTwo from "@/components/HeaderTwo";
import ShippingOne from "@/components/ShippingOne";
import StepsSection from "@/components/StepsSection";
import TestimonialOne from "@/components/TestimonialOne";
import WhyBecomeSeller from "@/components/WhyBecomeSeller";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "SobazarBd - Oniline Shopping Complex",
  description:
    "SobazarBd - Oniline Shopping Complex.",
};

const page = () => {
  return (
    <>
    

      {/* ScrollToTop */}
      <ScrollToTopInit color='#FA6400' />

      {/* Breadcrumb */}
      <Breadcrumb title={"Become Seller"} />

      {/* BreadcrumbImage */}
      <BreadcrumbImage />

      {/* WhyBecomeSeller */}
      <WhyBecomeSeller />

      {/* CounterSection */}
      <CounterSection />

      {/* StepsSection */}
      <StepsSection />

      {/* TestimonialOne */}
      <section className='pb-120'>
        <TestimonialOne />
      </section>

     
    </>
  );
};

export default page;
