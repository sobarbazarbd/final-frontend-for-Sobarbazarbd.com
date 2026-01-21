import Breadcrumb from "@/components/Breadcrumb";
import BreadcrumbImage from "@/components/BreadcrumbImage";
import CounterSection from "@/components/CounterSection";
import StepsSection from "@/components/StepsSection";
import TestimonialOne from "@/components/TestimonialOne";
import WhyBecomeSeller from "@/components/WhyBecomeSeller";
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
