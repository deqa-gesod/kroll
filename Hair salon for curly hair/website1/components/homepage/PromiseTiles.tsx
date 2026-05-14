"use client";

import { motion } from "motion/react";
import { useLang, type Lang } from "@/components/providers/LangProvider";
import { Container } from "@/components/ui/Container";

type Tile = {
  index: string;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
};

const tiles: Tile[] = [
  {
    index: "01",
    title: {
      en: "Every curl pattern. One place.",
      no: "Alle krøller. Ett sted.",
    },
    body: {
      en: "From Type 2 loose waves through Type 4 coils — same chair, same care, no kids' table. The whole spectrum, understood.",
      no: "Fra Type 2 løse bølger til Type 4 krøller — samme stol, samme omsorg, ingen B-liga. Hele spekteret, forstått.",
    },
  },
  {
    index: "02",
    title: {
      en: "Dry consultation, every first visit, free.",
      no: "Tørr konsultasjon på første besøk, gratis.",
    },
    body: {
      en: "Fifteen minutes, dry, on your natural pattern. No obligation, no upsell. We see your hair before we touch it.",
      no: "Femten minutter, tørt hår, på din naturlige krøll. Ingen forpliktelser, ingen mersalg. Vi ser håret ditt før vi tar i det.",
    },
  },
  {
    index: "03",
    title: {
      en: "Trained for your hair, not against it.",
      no: "Utdannet for håret ditt, ikke mot det.",
    },
    body: {
      en: "Curl Bar London. Devachan NYC. Hair Rules. The places that actually teach textured hair, with the credentials to back it.",
      no: "Curl Bar London. Devachan NYC. Hair Rules. Stedene som faktisk lærer bort krøllete hår — med papirene i orden.",
    },
  },
];

export function PromiseTiles() {
  const { t } = useLang();

  return (
    <section className="bg-cream border-t border-line">
      <Container width="wide" className="py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line">
          {tiles.map((tile, i) => (
            <motion.div
              key={tile.index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-cream p-8 md:p-10 lg:p-12 flex flex-col"
            >
              <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
                {tile.index} / 03
              </span>
              <h2 className="mt-6 font-display text-[clamp(28px,3.6vw,42px)] tracking-display leading-[1.05] text-ink">
                {t(tile.title)}
              </h2>
              <p className="mt-5 text-[15px] md:text-base leading-relaxed text-ink-soft">
                {t(tile.body)}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
