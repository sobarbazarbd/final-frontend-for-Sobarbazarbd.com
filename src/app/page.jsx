import HeroBanner from "@/components/BannerOne";
import BestSellsOne from "@/components/BestSellsOne";
import BrandOne from "@/components/BrandOne";
import DealsOne from "@/components/DealsOne";
import FeatureOne from "@/components/FeatureOne";
import FlashSalesOne from "@/components/FlashSalesOne";
import HotDealsOne from "@/components/HotDealsOne";
import NewArrivalOne from "@/components/NewArrivalOne";
// NewArrivalThree ইম্পোর্ট করুন
import NewArrivalThree from "@/components/NewArrivalThree";
import OfferOne from "@/components/OfferOne";
import OrganicOne from "@/components/OrganicOne";
import PopularProductsOne from "@/components/PopularProductsOne";
import PromotionalOne from "@/components/PromotionalOne";
import PromotionalThree from "@/components/PromotionalThree";
import RecommendedOne from "@/components/RecommendedOne";
import ShortProductOne from "@/components/ShortProductOne";
import TopVendorsOne from "@/components/TopVendorsOne";
import Trending from "@/components/Trending";
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
      <PromotionalOne section={bannerMap?.Promotional} />
      <FlashSalesOne section={bannerMap?.FlashSales} />
      <RecommendedOne data={homeData?.data?.recommended_products} categories={homeData?.data?.categories}  />
      <PopularProductsOne categories={homeData?.data?.categories} section={bannerMap?.PopularProducts} />
      <Trending data={homeData?.data?.recommended_products} />
      <DealsOne section={bannerMap?.Deals}  data={homeData?.data?.recommended_products} />
      <PromotionalThree section={bannerMap?.PromotionalTwo} />
      <OfferOne section={bannerMap?.Offer} />
      <HotDealsOne section={bannerMap?.Deals}  data={homeData?.data?.recommended_products} />
      <TopVendorsOne data={homeData?.data?.stores}/>
      <BestSellsOne section={bannerMap?.Deals} data={homeData?.data?.recommended_products} />
      <OrganicOne section={bannerMap?.Deals}  data={homeData?.data?.recommended_products} />
      {/* <ShortProductOne /> */}
      <BrandOne data={homeData?.data?.brands || []} />
      <NewArrivalOne data={homeData?.data?.newly_arrived_products} />
      
      {/* NewArrivalThree যোগ করুন - আপনার API ডেটা অনুযায়ী */}
      <NewArrivalThree 
        sectionTitle="New Arrivals"
        categories={homeData?.data?.categories || []}
        products={homeData?.data?.newly_arrived_products || homeData?.data?.recommended_products || []}
        // যদি আপনার API-তে প্রোমো সেকশন থাকে
        // promos={homeData?.data?.promo_sections || []}
      />
    </>
  );
};

export default Page;