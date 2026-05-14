import type { Metadata } from "next";
import { AboutPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "About Vanessa",
  description:
    "Vanessa Jackson trained at Curl Bar London and Devachan NYC, then built Jackson & Coil in Grünerløkka.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Vanessa · Jackson & Coil",
    description: "Trained at Curl Bar London and Devachan NYC. Now in Grünerløkka, Oslo.",
    url: "/about",
    images: ["/images/founder-vanessa-working.jpg"],
  },
  twitter: {
    title: "About Vanessa · Jackson & Coil",
    description: "Founder, curl specialist, Oslo.",
    images: ["/images/founder-vanessa-working.jpg"],
  },
};

export default function About() {
  return <AboutPage />;
}
