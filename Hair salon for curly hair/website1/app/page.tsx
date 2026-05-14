import { Hero } from "@/components/homepage/Hero";
import { PromiseTiles } from "@/components/homepage/PromiseTiles";
import { FounderStrip } from "@/components/homepage/FounderStrip";
import { PortfolioTeaser } from "@/components/homepage/PortfolioTeaser";
import { MethodBlock } from "@/components/homepage/MethodBlock";
import { RetailTeaser } from "@/components/homepage/RetailTeaser";
import { Reviews } from "@/components/homepage/Reviews";
import { Visit } from "@/components/homepage/Visit";
import { StickyBookingCTA } from "@/components/homepage/StickyBookingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <PromiseTiles />
      <FounderStrip />
      <PortfolioTeaser />
      <MethodBlock />
      <RetailTeaser />
      <Reviews />
      <Visit />
      <StickyBookingCTA />
    </>
  );
}
