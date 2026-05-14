import type { Metadata } from "next";
import ShopPage from "./ShopPageClient";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Thirty-six curated curl products on the shelf at Jackson & Coil. Stylist-tested for type 2A through 4C, ships within Norway.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop · Jackson & Coil",
    description: "Curated curl products, stylist-tested.",
    url: "/shop",
    images: ["/images/retail-hero.jpg"],
  },
  twitter: {
    title: "Shop · Jackson & Coil",
    description: "Curated curl products, stylist-tested.",
    images: ["/images/retail-hero.jpg"],
  },
};

export default function Page() {
  return <ShopPage />;
}
