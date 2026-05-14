import type { Metadata } from "next";
import { PortfolioPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "One gallery for the whole curl spectrum. Type 4 is the home base; 3A and 2C live here too.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio · Jackson & Coil",
    description: "Every cut, every type, by the team.",
    url: "/portfolio",
    images: ["/images/portfolio-type4-after.jpg"],
  },
  twitter: {
    title: "Portfolio · Jackson & Coil",
    description: "Every cut, every type, by the team.",
    images: ["/images/portfolio-type4-after.jpg"],
  },
};

export default function Portfolio() {
  return <PortfolioPage />;
}
