import type { Metadata } from "next";
import { TeamPage } from "@/components/pages";

export const metadata: Metadata = {
  title: "The Team",
  description:
    "Meet the curl specialists at Jackson & Coil. Stylists trained on the full curl spectrum.",
  alternates: { canonical: "/the-team" },
  openGraph: {
    title: "The Team · Jackson & Coil",
    description: "Curl specialists, Grünerløkka, Oslo.",
    url: "/the-team",
    images: ["/images/team-stylist-portrait.jpg"],
  },
  twitter: {
    title: "The Team · Jackson & Coil",
    description: "Curl specialists, Grünerløkka, Oslo.",
    images: ["/images/team-stylist-portrait.jpg"],
  },
};

export default function TheTeam() {
  return <TeamPage />;
}
