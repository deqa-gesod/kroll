"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/content/images";

const steps: Array<{ n: string; en: string; no: string }> = [
  { n: "01", en: "Assess", no: "Vurder" },
  { n: "02", en: "Map", no: "Kartlegg" },
  { n: "03", en: "Cut, dry, curl-by-curl", no: "Klipp, tørt, krøll for krøll" },
  { n: "04", en: "Finish & teach", no: "Fullfør og lær bort" },
];

export function MethodBlock() {
  const { t } = useLang();

  return (
    <section className="bg-ink text-cream">
      <Container width="wide" className="py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-soft">
              {t({ en: "The method", no: "Metoden" })}
            </span>
            <h2 className="mt-6 font-display text-[clamp(40px,6vw,76px)] tracking-display leading-[1.0]">
              {t({
                en: "The Jackson Cut.",
                no: "The Jackson Cut.",
              })}
            </h2>
            <p className="mt-3 font-display text-[clamp(24px,3vw,34px)] tracking-tight leading-[1.1] text-cream/70">
              {t({
                en: "Dry. Curl by curl. On the natural pattern.",
                no: "Tørt. Krøll for krøll. På den naturlige krøllen.",
              })}
            </p>
            <p className="mt-8 text-[16px] md:text-[17px] leading-relaxed text-cream/80 max-w-md">
              {t({
                en: "We cut the way the great curl houses cut: dry, on the curl as it actually falls, never wet, never tension-stretched. Every cut ends with you knowing what was done and why.",
                no: "Vi klipper slik de beste krøll-husene klipper: tørt, på krøllen slik den faktisk faller, aldri vått, aldri strukket. Hver klipp avsluttes med at du vet hva som er gjort, og hvorfor.",
              })}
            </p>

            {/* Steps */}
            <ol className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4">
              {steps.map((step) => (
                <li
                  key={step.n}
                  className="flex items-baseline gap-3 text-[14px] leading-tight"
                >
                  <span className="font-mono text-[11px] tracking-[0.2em] text-terracotta-soft">
                    {step.n}
                  </span>
                  <span className="text-cream">
                    {t({ en: step.en, no: step.no })}
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-10">
              <Link
                href="/the-method"
                className="inline-flex items-center gap-2 text-[14px] tracking-wide text-cream border-b border-cream/40 pb-1 hover:text-terracotta-soft hover:border-terracotta-soft transition-colors"
              >
                {t({
                  en: "Read the method in full",
                  no: "Les metoden i sin helhet",
                })}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>

          {/* Video poster */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <Link
              href="/the-method"
              className="group relative block aspect-video w-full overflow-hidden bg-cream-deep"
              aria-label={t({
                en: "Watch the 45-second method film",
                no: "Se 45-sekunders metode-film",
              })}
            >
              <Image
                src={`/images/${images.method2.file}`}
                alt={images.method2.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors" />

              {/* play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-4 bg-cream/95 text-ink pl-5 pr-7 h-16 rounded-full backdrop-blur transition-transform duration-300 group-hover:scale-105">
                  <span
                    className="flex items-center justify-center w-10 h-10 bg-ink text-cream rounded-full"
                    aria-hidden
                  >
                    <svg
                      width="14"
                      height="16"
                      viewBox="0 0 14 16"
                      fill="currentColor"
                    >
                      <path d="M14 8L0 16V0L14 8Z" />
                    </svg>
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
                    {t({
                      en: "Watch / 45 sec",
                      no: "Se / 45 sek",
                    })}
                  </span>
                </div>
              </div>

              {/* corner caption */}
              <div className="absolute left-0 bottom-0 p-4 md:p-6">
                <span className="bg-cream/90 text-ink font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1">
                  {t({
                    en: "Vanessa cutting / Type 4A",
                    no: "Vanessa klipper / Type 4A",
                  })}
                </span>
              </div>
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
