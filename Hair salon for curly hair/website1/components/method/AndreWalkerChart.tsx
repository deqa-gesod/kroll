"use client";

import { motion } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";

type Pattern = {
  code: string;
  name: { en: string; no: string };
  detail: { en: string; no: string };
  /** SVG path describing one strand of hair, drawn within a 60x140 viewBox */
  path: string;
};

const patterns: Pattern[] = [
  {
    code: "2A",
    name: { en: "Loose wave", no: "Løs bølge" },
    detail: {
      en: "Subtle S-bend. Fine to medium strand.",
      no: "Forsiktig S-bend. Fin til middels strå.",
    },
    // Loose, long wave — gentle
    path: "M30 4 C 24 30, 36 56, 30 84, 26 110, 34 134, 30 138",
  },
  {
    code: "2B",
    name: { en: "Defined wave", no: "Definert bølge" },
    detail: {
      en: "S-shape, holds shape from mid-length down.",
      no: "S-form, holder formen fra midten og ned.",
    },
    path: "M30 4 C 18 24, 42 50, 30 78, 18 100, 42 124, 30 138",
  },
  {
    code: "2C",
    name: { en: "Wave with curl", no: "Bølge med krøll" },
    detail: {
      en: "S-shape tightening into open ringlets.",
      no: "S-form som strammer seg til åpne ringer.",
    },
    path: "M30 4 C 14 18, 46 36, 30 54, 14 70, 46 86, 30 104, 18 122, 42 134, 30 138",
  },
  {
    code: "3A",
    name: { en: "Loose curl", no: "Løs krøll" },
    detail: {
      en: "Spiral the size of a chalk stick.",
      no: "Spiral på størrelse med en kritt-stang.",
    },
    path: "M30 4 C 12 14, 48 28, 30 38, 12 48, 48 62, 30 72, 12 82, 48 96, 30 106, 12 116, 48 130, 30 138",
  },
  {
    code: "3B",
    name: { en: "Spiral curl", no: "Spiral-krøll" },
    detail: {
      en: "Spiral the size of a Sharpie marker.",
      no: "Spiral på størrelse med en sprittusj.",
    },
    path: "M30 4 C 8 10, 50 20, 30 28, 10 36, 50 46, 30 54, 10 62, 50 72, 30 80, 10 88, 50 98, 30 106, 10 114, 50 124, 30 132, 24 136, 36 138, 30 138",
  },
  {
    code: "3C",
    name: { en: "Tight curl", no: "Tett krøll" },
    detail: {
      en: "Corkscrew, the size of a pencil.",
      no: "Korketrekker, på størrelse med en blyant.",
    },
    path: "M30 4 C 6 8, 52 16, 30 22, 8 28, 52 38, 30 44, 8 50, 52 60, 30 66, 8 72, 52 82, 30 88, 8 94, 52 104, 30 110, 8 116, 52 126, 30 132, 28 138, 32 138, 30 138",
  },
  {
    code: "4A",
    name: { en: "Soft coil", no: "Myk coil" },
    detail: {
      en: "Coil the size of a crochet needle. Defined.",
      no: "Coil på størrelse med en heklenål. Definert.",
    },
    path: "M30 4 C 4 6, 54 12, 30 16, 6 22, 54 30, 30 34, 6 40, 54 48, 30 52, 6 58, 54 66, 30 70, 6 76, 54 84, 30 88, 6 94, 54 102, 30 106, 6 112, 54 120, 30 124, 6 130, 54 136, 30 138",
  },
  {
    code: "4B",
    name: { en: "Z-pattern coil", no: "Z-mønster coil" },
    detail: {
      en: "Sharp angles, less defined coil. Holds volume.",
      no: "Skarpe vinkler, mindre definert coil. Holder volum.",
    },
    // Sharp Z zig-zag
    path: "M30 4 L 8 14 L 52 22 L 8 30 L 52 38 L 8 46 L 52 54 L 8 62 L 52 70 L 8 78 L 52 86 L 8 94 L 52 102 L 8 110 L 52 118 L 8 126 L 30 138",
  },
  {
    code: "4C",
    name: { en: "Tight coil", no: "Tett coil" },
    detail: {
      en: "Densely packed Z-pattern. The crown of the spectrum.",
      no: "Tettpakket Z-mønster. Spekterets krone.",
    },
    path: "M30 4 L 12 8 L 48 12 L 12 16 L 48 20 L 12 24 L 48 28 L 12 32 L 48 36 L 12 40 L 48 44 L 12 48 L 48 52 L 12 56 L 48 60 L 12 64 L 48 68 L 12 72 L 48 76 L 12 80 L 48 84 L 12 88 L 48 92 L 12 96 L 48 100 L 12 104 L 48 108 L 12 112 L 48 116 L 12 120 L 48 124 L 12 128 L 48 132 L 30 138",
  },
];

export function AndreWalkerChart() {
  const { t } = useLang();

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-9 gap-2 md:gap-3">
      {patterns.map((p, i) => (
        <motion.figure
          key={p.code}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{
            duration: 0.55,
            delay: i * 0.06,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative flex flex-col items-stretch"
        >
          <div className="relative aspect-[3/7] bg-cream-deep border border-line overflow-hidden">
            <svg
              viewBox="0 0 60 142"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 w-full h-full"
              aria-hidden
            >
              <motion.path
                d={p.path}
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-ink"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{
                  duration: 1.4,
                  delay: 0.2 + i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </svg>
            <span className="absolute top-2 left-2 font-mono text-[10px] tracking-[0.18em] text-ink-muted">
              {p.code}
            </span>
          </div>
          <figcaption className="mt-3">
            <p className="font-display text-[15px] md:text-[16px] tracking-tight leading-tight text-ink">
              {t(p.name)}
            </p>
            <p className="mt-1 text-[12px] leading-snug text-ink-muted">
              {t(p.detail)}
            </p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
