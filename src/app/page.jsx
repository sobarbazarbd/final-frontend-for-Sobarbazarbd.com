import HeroBanner from "@/components/BannerOne";
import BestSellsOne from "@/components/BestSellsOne";
import BrandOne from "@/components/BrandOne";
import DealsOne from "@/components/DealsOne";
import FeatureOne from "@/components/FeatureOne";
import FlashSalesOne from "@/components/FlashSalesOne";
import HotDealsOne from "@/components/HotDealsOne";
import NewArrivalOne from "@/components/NewArrivalOne";
import OfferOne from "@/components/OfferOne";
import OrganicOne from "@/components/OrganicOne";
import PopularProductsOne from "@/components/PopularProductsOne";
import PromotionalOne from "@/components/PromotionalOne";
import PromotionalThree from "@/components/PromotionalThree";
import RecommendedOne from "@/components/RecommendedOne";
import ShortProductOne from "@/components/ShortProductOne";
import TopVendorsOne from "@/components/TopVendorsOne";
import Trending from "@/components/Trending";
// import MegaDealsBanner from "@/components/MegaDealsBanner";
import ColorInit from "@/helper/ColorInit";
import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "SobazarBd - Online Shopping Complex",
  description: "User-friendly online marketplace..",
};

// Fetch data on the server side
const getHomePageData = async () => {
  try {
    const res = await fetch(
      "https://api.hetdcl.com/api/v1.0/base/home-page-data/",
      {
        // cache: 'no-store', // or 'force-cache' for static data
        // next: {
        //   revalidate: 3600 // Revalidate every hour (optional)
        // }
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    console.log(json.data?.recommended_products,'jsonjsonjson')
    return json;
  } catch (err) {
    console.error("Failed to fetch home page data:", err);
    return null;
  }
};

const Page = async () => {
  const homeData = await getHomePageData();

  let bannerMap = {};
  if (homeData?.data?.banner_sections) {
    homeData.data.banner_sections.forEach((section) => {
      if (section.type) {
        bannerMap[section.type] = section;
      }
    });
  }

  // console.log(homeData?.data,'homeData')

  return (
    <>
      <ScrollToTopInit color="#299E60" />
      <ColorInit color={false} />
      <HeroBanner section={bannerMap?.HeroBanner} />
      
      <FeatureOne data={homeData?.data?.subcategories || []} />
       <TopVendorsOne data={homeData?.data?.stores}/>
      {/* <MegaDealsBanner section={bannerMap?.Deals} /> */}
      <FlashSalesOne section={bannerMap?.FlashSales} />
      <RecommendedOne data={homeData?.data?.recommended_products} categories={homeData?.data?.categories}  />
      <PopularProductsOne categories={homeData?.data?.categories} section={bannerMap?.PopularProducts} />
      <Trending data={homeData?.data?.recommended_products} />
      <DealsOne section={bannerMap?.Deals}  data={homeData?.data?.recommended_products} />
      <PromotionalThree section={bannerMap?.PromotionalTwo} />
      <OfferOne section={bannerMap?.Offer} />
      <HotDealsOne section={bannerMap?.Deals}  data={homeData?.data?.recommended_products} />
     
      <BestSellsOne section={bannerMap?.Deals} data={homeData?.data?.recommended_products} />
      <OrganicOne section={bannerMap?.Deals}  data={homeData?.data?.recommended_products} />
      {/* <ShortProductOne /> */}
      <BrandOne data={homeData?.data?.brands || []} />
      <NewArrivalOne data={homeData?.data?.newly_arrived_products} />
    </>
  );
};

export default Page;
