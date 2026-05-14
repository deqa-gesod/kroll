"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/content/images";
import { site } from "@/lib/content/site";

// Rotating hero set — three frames covering the three personas:
// Amara (Type 4 woman), Daniel (Black male, fade + coils), Vanessa cutting
// (founder/process). Sigrid (Type 3) is in the portfolio teaser.
// The rotation passes BRAND §9 Photography Test by surfacing Daniel above
// the fold rather than relegating him to a downstream gallery strip.
const HERO_FRAMES = [
  {
    image: images.heroPrimary,
    captionEn: "Type 4 / shaped dry",
    captionNo: "Type 4 / klippet tørr",
  },
  {
    image: images.heroAlt1,
    captionEn: "Sculpt cut / fade + coils",
    captionNo: "Sculpt cut / fade + krøller",
  },
  {
    image: images.heroAlt2,
    captionEn: "The Jackson Cut, in progress",
    captionNo: "The Jackson Cut, mid-klipp",
  },
] as const;

export function Hero() {
  const { t, lang } = useLang();
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(() => {
      setFrameIndex((i) => (i + 1) % HERO_FRAMES.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, []);

  const frame = HERO_FRAMES[frameIndex];

  return (
    <section className="relative w-full overflow-hidden bg-cream-deep">
      {/* Top meta strip */}
      <Container width="wide" className="relative z-10 pt-6 md:pt-10">
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
          <span>
            {t({
              en: "Grünerløkka, Oslo",
              no: "Grünerløkka, Oslo",
            })}
          </span>
          <span className="hidden sm:inline">
            {t({
              en: "Founded by Vanessa Jackson",
              no: "Grunnlagt av Vanessa Jackson",
            })}
          </span>
        </div>
      </Container>

      <Container width="wide" className="relative z-10 pt-10 md:pt-16 pb-10 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          {/* Headline */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(56px,10.5vw,176px)] tracking-display leading-[0.92] text-ink"
            >
              {lang === "no" ? (
                <>
                  Alle krøller.
                  <br />
                  Ett sted.
                  <br />
                  <span className="text-terracotta-deep">Hele spekteret.</span>
                </>
              ) : (
                <>
                  Every curl
                  <br />
                  pattern.
                  <br />
                  <span className="text-terracotta-deep">One place.</span>
                </>
              )}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl text-lg md:text-xl leading-snug text-ink-soft"
            >
              {t(site.tagline)}{" "}
              {t({
                en: "From loose waves to tight coils, every pattern gets the same care, by stylists who actually trained for it.",
                no: "Fra løse bølger til tette krøller. Hver krølltype får samme omsorg, av stylister som faktisk er utdannet for det.",
              })}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <Link
                href="/booking"
                className="inline-flex h-14 px-8 items-center justify-center bg-ink text-cream text-[14px] tracking-wide hover:bg-terracotta transition-colors"
              >
                {t({ en: "Book a chair", no: "Book en stol" })}
              </Link>
              <Link
                href="/booking?service=consultation"
                className="inline-flex h-14 px-8 items-center justify-center border border-ink text-ink text-[14px] tracking-wide hover:bg-ink hover:text-cream transition-colors"
              >
                {t({
                  en: "First time? Free 15-minute consultation",
                  no: "Første gang? Gratis 15-minutters konsultasjon",
                })}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-mono tracking-wider text-ink-muted"
            >
              <span className="flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-bookgreen" />
                {t({
                  en: "Next available: Thursday 16:30",
                  no: "Neste ledige: torsdag 16:30",
                })}
              </span>
              <span className="hidden md:inline">
                {t({
                  en: "Type 2 — 4. Women & men.",
                  no: "Type 2 — 4. Kvinner og menn.",
                })}
              </span>
            </motion.div>
          </div>

          {/* Hero image — rotating across 3 frames */}
          <div className="lg:col-span-5 order-1 lg:order-2 relative aspect-[4/5] w-full overflow-hidden bg-cream">
            <AnimatePresence mode="sync">
              <motion.div
                key={frameIndex}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                  scale: { duration: 6, ease: "linear" },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={`/images/${frame.image.file}`}
                  alt={frame.image.alt}
                  fill
                  priority={frameIndex === 0}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            {/* caption strip — sits above the rotating frames */}
            <div className="absolute left-0 bottom-0 right-0 p-4 md:p-6 flex items-end justify-between text-[11px] font-mono tracking-[0.2em] uppercase text-cream pointer-events-none z-10">
              <span className="bg-ink/70 backdrop-blur px-2 py-1">
                {t({ en: frame.captionEn, no: frame.captionNo })}
              </span>
              <span className="bg-ink/70 backdrop-blur px-2 py-1 tabular-nums">
                {String(frameIndex + 1).padStart(2, "0")} / {String(HERO_FRAMES.length).padStart(2, "0")}
              </span>
            </div>
            {/* rotation indicators */}
            <div className="absolute left-4 top-4 md:left-6 md:top-6 flex gap-1.5 z-10">
              {HERO_FRAMES.map((_, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setFrameIndex(i)}
                  aria-label={`Show hero frame ${i + 1}`}
                  className={`h-1 transition-all ${
                    i === frameIndex ? "w-8 bg-cream" : "w-4 bg-cream/50 hover:bg-cream/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
