import Breadcrumb from "@/components/Breadcrumb";
import CartSection from "@/components/CartSection";
import ColorInit from "@/helper/ColorInit";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "Shopping Cart - SobazarBd",
  description: "Review your cart",
};

const page = () => {
  return (
    <>
      <ColorInit color={true} />
      <ScrollToTopInit color='#FA6400' />
      <Breadcrumb title={"Cart"} />
      <CartSection />
    </>
  );
};

export default page;
