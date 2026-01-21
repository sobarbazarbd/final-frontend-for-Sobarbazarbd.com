import Breadcrumb from "@/components/Breadcrumb";
import Checkout from "@/components/Checkout";
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
