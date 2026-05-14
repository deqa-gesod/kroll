"use client";

import { motion } from "motion/react";
import { useLang, type Lang } from "@/components/providers/LangProvider";
import { Container } from "@/components/ui/Container";

type Review = {
  name: string;
  meta: Record<Lang, string>;
  body: Record<Lang, string>;
  date: Record<Lang, string>;
};

const reviews: Review[] = [
  {
    name: "Amara O.",
    meta: { en: "Type 4a / Tøyen", no: "Type 4a / Tøyen" },
    body: {
      en: "First salon in Oslo where I didn't have to explain my hair before someone touched it. Vanessa cut dry, on the curl, and I walked out with shape I've only seen in London. The fact that I can now book this in my own city is a small life upgrade.",
      no: "Første salong i Oslo der jeg ikke måtte forklare håret mitt før noen tok i det. Vanessa klippet tørt, på krøllen, og jeg gikk ut med form jeg bare har sett i London. At jeg nå kan booke dette i min egen by, er en liten oppgradering av livet.",
    },
    date: { en: "2 weeks ago", no: "2 uker siden" },
  },
  {
    name: "Daniel B.",
    meta: { en: "Fade + coils / Grünerløkka", no: "Fade + krøller / Grünerløkka" },
    body: {
      en: "Fade is sharp, lineup is clean, and the coils on top are actually shaped — not just left to fend for themselves. One chair, both skills, no Stockholm flight. Booked the next four already.",
      no: "Fade er skarp, lineup er ren, og krøllene på toppen er faktisk formet — ikke bare overlatt til seg selv. Én stol, begge ferdigheter, ingen flyreise til Stockholm. Har bookt de fire neste allerede.",
    },
    date: { en: "1 month ago", no: "1 måned siden" },
  },
  {
    name: "Sigrid M.",
    meta: { en: "Type 3a / Torshov", no: "Type 3a / Torshov" },
    body: {
      en: "Five Oslo salons told me my hair was \"frizzy.\" Vanessa called it 3a and cut it accordingly. Day-three hair still has the shape, which has not happened to me before. The dry consultation alone was worth the trip.",
      no: "Fem Oslo-salonger sa håret mitt var «krusete». Vanessa kalte det 3a og klippet deretter. Dag-tre-håret har fortsatt fasong — det har aldri skjedd før. Den tørre konsultasjonen alene var verdt turen.",
    },
    date: { en: "3 weeks ago", no: "3 uker siden" },
  },
];

function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-terracotta-deep" role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden
        >
          <path d="M8 0L10.2 5.5L16 6.1L11.6 10L13 16L8 12.8L3 16L4.4 10L0 6.1L5.8 5.5L8 0Z" />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  const { t } = useLang();

  return (
    <section className="bg-cream border-t border-line">
      <Container width="wide" className="py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
              {t({ en: "From the chair", no: "Fra stolen" })}
            </span>
            <h2 className="mt-5 font-display text-[clamp(36px,5.5vw,68px)] tracking-display leading-[1.02] text-ink max-w-2xl">
              {t({
                en: "Three years of borrowed-chair clients, in their own words.",
                no: "Tre år med kunder fra lånte stoler, med deres egne ord.",
              })}
            </h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-[12px] tracking-wider text-ink-muted">
            <Stars />
            <span>
              4.9 / 5 · {t({ en: "Google", no: "Google" })}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="bg-cream-deep p-7 md:p-8 flex flex-col"
            >
              <Stars />
              <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
                {t(r.body)}
              </p>
              <div className="mt-7 pt-5 border-t border-line flex items-baseline justify-between gap-3">
                <div>
                  <p className="text-[14px] text-ink">{r.name}</p>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted mt-1">
                    {t(r.meta)}
                  </p>
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                  {t(r.date)}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
