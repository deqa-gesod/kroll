import type { Metadata } from "next";
import AboutPage from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About Vanessa",
  description:
    "Vanessa Jackson trained at Curl Bar London and Devachan NYC, then built Jackson & Coil in Grünerløkka so Oslo would finally have a salon for every curl.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Vanessa · Jackson & Coil",
    description:
      "Trained at Curl Bar London and Devachan NYC. Now in Grünerløkka, Oslo.",
    url: "/about",
    images: ["/images/founder-portrait.jpg"],
  },
  twitter: {
    title: "About Vanessa · Jackson & Coil",
    description: "Founder, curl specialist, Oslo.",
    images: ["/images/founder-portrait.jpg"],
  },
};

export default function Page() {
  return <AboutPage />;
}
