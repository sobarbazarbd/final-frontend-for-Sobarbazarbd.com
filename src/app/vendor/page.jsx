import BreadcrumbThree from "@/components/BreadcrumbThree";
import VendorsList from "@/components/VendorsList";
import ColorInit from "@/helper/ColorInit";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "Vendors - SobazarBd",
  description: "Browse our vendors",
};

const page = () => {
  return (
    <>
      <ColorInit color={false} />
      <ScrollToTopInit color='#299E60' />
      <BreadcrumbThree title={"Vendor List"} />
      <VendorsList />
    </>
  );
};

export default page;
