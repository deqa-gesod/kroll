import type { Metadata } from "next";
import { BookingPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Book",
  description:
    "Book a chair at Jackson & Coil. Real availability, weekday evenings, two-minute booking.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book · Jackson & Coil",
    description:
      "Two minutes from here to chair. Real availability, dry consultation included.",
    url: "/booking",
    images: ["/images/visit-salon-interior.jpg"],
  },
  twitter: {
    title: "Book · Jackson & Coil",
    description: "Two minutes from here to chair.",
    images: ["/images/visit-salon-interior.jpg"],
  },
};

export default function Booking() {
  return <BookingPage />;
}
