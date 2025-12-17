import BootstrapInit from "@/helper/BootstrapInit";
import RouteScrollToTop from "@/helper/RouteScrollToTop";
import "./font.css";
import "./globals.scss";
import PhosphorIconInit from "@/helper/PhosphorIconInit";
import HeaderOne from "@/components/Header/HeaderOne";
import NewsletterOne from "@/components/NewsletterOne";
import ShippingOne from "@/components/ShippingOne";
import "./dashboard/dashboard.css";
import NavFooterProvider from "@/context/NavFooterProvider";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";
import FooterOne from "@/components/FooterTwo";

export const metadata = {
  title: "SobazarBd - Online Shopping Complex",
  description: "SobazarBd - Online Shopping Complex",
};

export default async function RootLayout({ children }) {
  let navData = null;
  try {
    const res = await fetch(
      "https://api.hetdcl.com/api/v1.0/base/navbar-data/",
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
        <Toaster position="top-right" />
        <PhosphorIconInit />
        <RouteScrollToTop />
        <NavFooterProvider initialData={navData}>
          <AuthProvider>
            <CartProvider>
              <HeaderOne />
              {children}
              <ShippingOne />
              <NewsletterOne />
              <FooterOne />
            </CartProvider>
          </AuthProvider>
        </NavFooterProvider>
      </body>
    </html>
  );
}
