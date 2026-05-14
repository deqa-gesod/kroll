"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";
import { Container } from "@/components/ui/Container";
import { images } from "@/lib/content/images";

export function FounderStrip() {
  const { t } = useLang();

  return (
    <section className="bg-cream-deep border-t border-line">
      <Container width="wide" className="py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 relative aspect-[4/5] w-full overflow-hidden bg-cream"
          >
            <Image
              src={`/images/${images.founderPortrait.file}`}
              alt={images.founderPortrait.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
              {t({ en: "The founder", no: "Grunnleggeren" })}
            </span>
            <h2 className="mt-6 font-display text-[clamp(36px,5.5vw,68px)] tracking-display leading-[1.02] text-ink">
              {t({
                en: "Vanessa Jackson. Tottenham, then Devachan, then Oslo.",
                no: "Vanessa Jackson. Tottenham, så Devachan, så Oslo.",
              })}
            </h2>
            <div className="mt-8 space-y-5 text-[16px] md:text-[17px] leading-relaxed text-ink-soft max-w-xl">
              <p>
                {t({
                  en: "Trained at Curl Bar London under Michelle Sultan, then a year at the original Devachan in New York and a season with Anthony Dickey at Hair Rules.",
                  no: "Utdannet ved Curl Bar London under Michelle Sultan, deretter et år ved opprinnelige Devachan i New York og en sesong hos Anthony Dickey på Hair Rules.",
                })}
              </p>
              <p>
                {t({
                  en: "Seven years working out of borrowed chairs in Oslo salons, building a quiet client list of women and men who'd otherwise be on flights to London or Stockholm.",
                  no: "Sju år med lånte stoler i Oslo-salonger — og en stille kundeliste av kvinner og menn som ellers ville sittet på fly til London eller Stockholm.",
                })}
              </p>
              <p className="text-ink font-display text-[20px] md:text-[22px] tracking-tight leading-snug pt-2">
                {t({
                  en: "\"Every curl pattern is the same job done with knowledge. Knowledge is something you go and get.\"",
                  no: "«Alle krøller er samme jobb gjort med kunnskap. Kunnskap er noe du henter, ikke noe du venter på.»",
                })}
              </p>
            </div>

            <div className="mt-10">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[14px] tracking-wide text-ink border-b border-ink pb-1 hover:text-terracotta-deep hover:border-terracotta transition-colors"
              >
                {t({ en: "Read the full story", no: "Les hele historien" })}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>

          {/* Hands shot */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 relative aspect-[4/5] w-full overflow-hidden bg-cream"
          >
            <Image
              src={`/images/${images.founderHands.file}`}
              alt={images.founderHands.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
