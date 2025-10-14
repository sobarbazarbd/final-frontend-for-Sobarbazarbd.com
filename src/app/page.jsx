import BannerOne from "@/components/BannerOne";
import BestSellsOne from "@/components/BestSellsOne";

import BrandOne from "@/components/BrandOne";
import DealsOne from "@/components/DealsOne";
import DeliveryOne from "@/components/DeliveryOne";
import FeatureOne from "@/components/FeatureOne";
import FeatureThree from "@/components/FeatureThree";
import FlashSalesOne from "@/components/FlashSalesOne";
import HotDealsOne from "@/components/HotDealsOne";
import NewArrivalOne from "@/components/NewArrivalOne";
import NewArrivalThree from "@/components/NewArrivalThree";
import OfferOne from "@/components/OfferOne";
import OrganicOne from "@/components/OrganicOne";
import PopularProductsOne from "@/components/PopularProductsOne";
import PromotionalOne from "@/components/PromotionalOne";
import PromotionalThree from "@/components/PromotionalThree";
import RecommendedOne from "@/components/RecommendedOne";
import ShortProductOne from "@/components/ShortProductOne";
import TextSlider from "@/components/TextSlider";
import TopVendorsOne from "@/components/TopVendorsOne";
import TrendingOne from "@/components/TrendingOne";
import ColorInit from "@/helper/ColorInit";

import ScrollToTopInit from "@/helper/ScrollToTopInit";

export const metadata = {
  title: "SobazarBd - Oniline Shopping Complex",
  description:
    "User-friendly online marketplace..",
};

const page = () => {
  return (
    <>
      {/* Preloader */}
      {/* <Preloader /> */}

      {/* ScrollToTop */}
      <ScrollToTopInit color='#299E60' />

      {/* ColorInit */}
      <ColorInit color={false} />

     

      {/* BannerOne */}
      <BannerOne />

      {/* FeatureOne */}
      <FeatureOne />
     

      {/* PromotionalOne */}
      <PromotionalOne />

      {/* FlashSalesOne */}
      <FlashSalesOne />
        {/* RecommendedOne */}
      <RecommendedOne />
      <PopularProductsOne></PopularProductsOne>
      
      {/* NewArrivalThree */}
      <NewArrivalThree />
      {/* TextSlider */}
      <TextSlider />
      {/* TrendingOne */}
      <TrendingOne />

      
       <DealsOne />

         {/* FeatureThree */}
      <FeatureThree />

    
{/* PromotionalThree */}
      <PromotionalThree />

      {/* OfferOne */}
      <OfferOne />

     

      {/* HotDealsOne */}
      <HotDealsOne />

      {/* TopVendorsOne */}
      <TopVendorsOne />

      {/* BestSellsOne */}
      <BestSellsOne />

      {/* DeliveryOne */}
      <DeliveryOne />

      {/* OrganicOne */}
      <OrganicOne />

      {/* ShortProductOne */}
      <ShortProductOne />

      {/* BrandOne */}
      <BrandOne />

      {/* NewArrivalOne */}
      <NewArrivalOne />

    
    </>
  );
};

export default page;
