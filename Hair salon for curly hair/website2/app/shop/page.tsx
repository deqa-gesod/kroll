import type { Metadata } from "next";
import { ShopExperience } from "@/components/shop/ShopExperience";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Curated curl products on the shelf at Jackson & Coil. Stylist-tested for type 2A through 4C.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop · Jackson & Coil",
    description: "Curated curl products, stylist-tested.",
    url: "/shop",
    images: ["/images/shop-curl-shelf.jpg"],
  },
  twitter: {
    title: "Shop · Jackson & Coil",
    description: "Curated curl products, stylist-tested.",
    images: ["/images/shop-curl-shelf.jpg"],
  },
};

export default function Shop() {
  return <ShopExperience />;
}
