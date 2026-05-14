import type { Metadata } from "next";
import PortfolioPage from "./PortfolioPageClient";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "One gallery for the whole curl spectrum. Type 4 is the home base; 3A and 2C live here too. Filter by curl type to find a head that looks like yours.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio · Jackson & Coil",
    description: "Every cut, every type, by the team.",
    url: "/portfolio",
    images: ["/images/portfolio-4c-1.jpg"],
  },
  twitter: {
    title: "Portfolio · Jackson & Coil",
    description: "Every cut, every type, by the team.",
    images: ["/images/portfolio-4c-1.jpg"],
  },
};

export default function Page() {
  return <PortfolioPage />;
}
