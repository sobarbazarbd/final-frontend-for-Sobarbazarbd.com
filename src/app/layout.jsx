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
import "./dashboard/dashboard.css";
import NavFooterProvider from "@/context/NavFooterProvider";

export const metadata = {
  title: "SobazarBd - Oniline Shopping Complex",
  description: "SobazarBd - Oniline Shopping Complex",
};

export default async function RootLayout({ children }) {
  let navData = null;
  try {
    const res = await fetch(
      "http://localhost:8000/api/v1.0/base/navbar-data/",
      {
        cache: "force-cache",
      }
    );
    if (res.ok) {
      const json = await res.json();
      navData = json?.data ?? null;
    }
  } catch (e) {
    navData = null;
  }

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <BootstrapInit />
        <PhosphorIconInit />
        <RouteScrollToTop />
        <NavFooterProvider initialData={navData}>
          <HeaderOne />
          {children}
          <ShippingOne />
          <NewsletterOne />
          {/* <FooterOne /> */}
          {/* <BottomFooter /> */}
        </NavFooterProvider>
      </body>
    </html>
  );
}
