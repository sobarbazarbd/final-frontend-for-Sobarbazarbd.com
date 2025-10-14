import BootstrapInit from "@/helper/BootstrapInit";
import RouteScrollToTop from "@/helper/RouteScrollToTop";
import "./font.css";
import "./globals.scss";
import PhosphorIconInit from "@/helper/PhosphorIconInit";
import HeaderOne from "@/components/Header/HeaderOne";
import FooterOne from "@/components/Footer/FooterOne";
import NewsletterOne from "@/components/NewsletterOne";
import BottomFooter from "@/components/BottomFooter";
import ShippingOne from "@/components/ShippingOne";

export const metadata = {
  title: "SobazarBd - Oniline Shopping Complex",
  description:
    "SobazarBd - Oniline Shopping Complex",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <BootstrapInit />
        <PhosphorIconInit />
        <RouteScrollToTop />
        <HeaderOne />
        {children}
       <ShippingOne></ShippingOne>
        <NewsletterOne />
        <FooterOne />
        <BottomFooter />
      </body>
    </html>
  );
}
