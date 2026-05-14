import type { Metadata } from "next";
import TheTeamPage from "./TeamPageClient";

export const metadata: Metadata = {
  title: "The Team",
  description:
    "Meet the curl specialists at Jackson & Coil. Stylists trained on the full curl spectrum, from loose waves to tight coils.",
  alternates: { canonical: "/the-team" },
  openGraph: {
    title: "The Team · Jackson & Coil",
    description: "Curl specialists, Grünerløkka, Oslo.",
    url: "/the-team",
    images: ["/images/team-nia.jpg"],
  },
  twitter: {
    title: "The Team · Jackson & Coil",
    description: "Curl specialists, Grünerløkka, Oslo.",
    images: ["/images/team-nia.jpg"],
  },
};

export default function Page() {
  return <TheTeamPage />;
}
