"use client";

import { Container } from "@/components/ui/Container";
import { useLang } from "@/components/providers/LangProvider";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";

export default function PortfolioPage() {
  const { t } = useLang();

  return (
    <>
      {/* Hero / opener */}
      <section className="bg-cream-deep">
        <Container width="wide" className="pt-16 md:pt-24 pb-14 md:pb-20">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-6">
            {t({ en: "Portfolio", no: "Portefølje" })}
          </p>
          <h1 className="font-display text-[clamp(48px,9vw,140px)] tracking-display leading-[0.94] text-ink max-w-5xl">
            {t({
              en: "Every cut, every type, by the team.",
              no: "Hver klipp, hver krølltype, av teamet.",
            })}
          </h1>
          <p className="mt-8 max-w-xl text-lg md:text-xl leading-snug text-ink-soft">
            {t({
              en: "One gallery for the whole spectrum. Type 4 is the home base; 3A and 2C live here too. Filter by curl type to find a head that looks like yours.",
              no: "Ett galleri for hele spekteret. Type 4 er hjemmebasen; 3A og 2C bor her også. Filtrer etter krølltype for å finne et hode som ligner ditt.",
            })}
          </p>
        </Container>
      </section>

      {/* Grid + filter */}
      <section className="bg-cream">
        <Container width="wide" className="pt-12 md:pt-16 pb-24 md:pb-32">
          <PortfolioGrid />
        </Container>
      </section>
    </>
  );
}
