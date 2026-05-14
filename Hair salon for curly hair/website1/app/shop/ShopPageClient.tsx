"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/components/providers/LangProvider";
import { images } from "@/lib/content/images";
import { ShopExperience } from "@/components/shop/ShopExperience";

export default function ShopPage() {
  const { t } = useLang();

  return (
    <>
      {/* Hero / opener */}
      <section className="bg-cream-deep">
        <Container width="wide" className="pt-16 md:pt-24 pb-14 md:pb-20">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <div className="lg:col-span-7">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-6">
                {t({ en: "Shop", no: "Butikk" })}
              </p>
              <h1 className="font-display text-[clamp(48px,8.5vw,128px)] tracking-display leading-[0.94] text-ink">
                {t({
                  en: "Hard-to-find brands, finally in Oslo.",
                  no: "Vanskelige merker å finne, endelig i Oslo.",
                })}
              </h1>
              <p className="mt-8 max-w-xl text-lg md:text-xl leading-snug text-ink-soft">
                {t({
                  en: "A curated edit, not a wall. Bread, Pattern, Adwoa, Bouclème, Mielle, plus the tools that ship from the UK in three weeks if you order them yourself: real silk durags, twist sponges, beard picks for coily beards.",
                  no: "Et kuratert utvalg, ikke en vegg. Bread, Pattern, Adwoa, Bouclème, Mielle, pluss verktøyene som tar tre uker fra UK hvis du må bestille dem selv: ekte silke-durags, twist-svamper, skjegg-pick for krøllete skjegg.",
                })}
              </p>
              <p className="mt-6 max-w-xl text-sm text-ink-muted">
                {t({
                  en: "Modest markup. We want people to actually buy, not maximise margin per bottle.",
                  no: "Beskjeden margin. Vi vil at folk faktisk skal kjøpe, ikke maksimere fortjeneste per flaske.",
                })}
              </p>
            </div>
            <div className="lg:col-span-5 relative aspect-[4/3] w-full overflow-hidden bg-cream">
              <Image
                src={`/images/${images.retailHero.file}`}
                alt={images.retailHero.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Filters + grid */}
      <section className="bg-cream">
        <Container width="wide" className="pt-16 md:pt-24 pb-24 md:pb-32">
          <ShopExperience />
        </Container>
      </section>
    </>
  );
}
