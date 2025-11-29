import Account from "@/components/Account";
import Breadcrumb from "@/components/Breadcrumb";
import ColorInit from "@/helper/ColorInit";
import Preloader from "@/helper/Preloader";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "My Account - SobazarBd",
  description: "Manage your account",
};

const page = () => {
  return (
    <>
      <ColorInit color={true} />
      <ScrollToTopInit color='#FA6400' />
      <Preloader />
      <Breadcrumb title={"Account"} />
      <Account />
    </>
  );
};

export default page;
