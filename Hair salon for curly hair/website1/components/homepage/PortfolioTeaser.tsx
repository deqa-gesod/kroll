"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLang, type Lang } from "@/components/providers/LangProvider";
import { Container } from "@/components/ui/Container";
import { images, type ImageKey } from "@/lib/content/images";

type PortfolioItem = {
  key: ImageKey;
  caption: Record<Lang, string>;
};

// Six pieces — Type 4 (twice — Daniel + women), Type 3, Type 2, Color, Men's fade
// Order intentionally integrates the men's fade in position 2, not last.
const items: PortfolioItem[] = [
  {
    key: "portfolio4C",
    caption: { en: "Type 4C / shaped dry", no: "Type 4C / klippet tørr" },
  },
  {
    key: "portfolioMen1",
    caption: {
      en: "Sculpt cut / fade and coils",
      no: "Sculpt cut / fade og krøller",
    },
  },
  {
    key: "portfolio3B",
    caption: { en: "Type 3B ringlets", no: "Type 3B ringlekrøller" },
  },
  {
    key: "portfolio4A",
    caption: { en: "Type 4A coils", no: "Type 4A krøller" },
  },
  {
    key: "portfolioColor1",
    caption: {
      en: "Curl-safe colour / 3B",
      no: "Krøll-trygg farge / 3B",
    },
  },
  {
    key: "portfolio2B",
    caption: { en: "Type 2B / mid-length", no: "Type 2B / midjelang" },
  },
];

export function PortfolioTeaser() {
  const { t } = useLang();

  return (
    <section className="bg-cream border-t border-line">
      <Container width="wide" className="py-24 md:py-32">
        {/* Heading */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end mb-12 md:mb-16">
          <div className="md:col-span-7">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
              {t({ en: "The portfolio", no: "Porteføljen" })}
            </span>
            <h2 className="mt-5 font-display text-[clamp(40px,6.5vw,84px)] tracking-display leading-[0.98] text-ink">
              {t({
                en: "One gallery. The whole spectrum.",
                no: "Ett galleri. Hele spekteret.",
              })}
            </h2>
          </div>
          <div className="md:col-span-5 md:pb-3">
            <p className="text-[15px] md:text-base leading-relaxed text-ink-soft max-w-md">
              {t({
                en: "Type 2 through Type 4. Women and men. Colour and cut. No \"loose curl\" tab. No men's section.",
                no: "Type 2 til Type 4. Kvinner og menn. Farge og klipp. Ingen «løs-krøll»-fane. Ingen herreseksjon.",
              })}
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {items.map((item, i) => {
            const img = images[item.key];
            return (
              <motion.figure
                key={item.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                <Link
                  href="/portfolio"
                  className="block relative aspect-[4/5] w-full overflow-hidden bg-cream-deep"
                >
                  <Image
                    src={`/images/${img.file}`}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <figcaption className="mt-3 flex items-baseline justify-between gap-3 font-mono text-[11px] tracking-[0.18em] uppercase text-ink-muted">
                  <span>{t(item.caption)}</span>
                  <span className="text-ink/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>

        <div className="mt-12 md:mt-16 flex justify-start">
          <Link
            href="/portfolio"
            className="inline-flex h-12 px-7 items-center bg-ink text-cream text-[14px] tracking-wide hover:bg-terracotta transition-colors"
          >
            {t({
              en: "See the full portfolio",
              no: "Se hele porteføljen",
            })}
            <span className="ml-2" aria-hidden>
              →
            </span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
