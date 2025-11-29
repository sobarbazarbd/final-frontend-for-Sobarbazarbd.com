import Breadcrumb from "@/components/Breadcrumb";
import WishListSection from "@/components/WishListSection";
import ColorInit from "@/helper/ColorInit";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "Wishlist - SobazarBd",
  description: "Your favorite products",
};

const page = () => {
  return (
    <>
      <ColorInit color={true} />
      <ScrollToTopInit color='#FA6400' />
      <Breadcrumb title={"My Wishlist"} />
      <WishListSection />
    </>
  );
};

export default page;
