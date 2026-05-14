"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/content/site";

export function Visit() {
  const { t } = useLang();

  return (
    <section className="bg-cream border-t border-line">
      <Container width="wide" className="py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative aspect-[4/3] md:aspect-[16/10] w-full border border-ink/15 bg-cream-deep overflow-hidden"
          >
            {/* Stylized map grid */}
            <div className="absolute inset-0">
              <svg
                className="w-full h-full"
                viewBox="0 0 800 500"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden
              >
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#1a1612"
                      strokeOpacity="0.06"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="800" height="500" fill="url(#grid)" />
                {/* "streets" — simple lines */}
                <g
                  stroke="#1a1612"
                  strokeOpacity="0.18"
                  strokeWidth="2"
                  fill="none"
                >
                  <path d="M 0 180 L 800 240" />
                  <path d="M 0 320 L 800 280" />
                  <path d="M 220 0 L 280 500" />
                  <path d="M 540 0 L 500 500" />
                  <path d="M 0 100 L 800 90" strokeOpacity="0.1" />
                  <path d="M 0 410 L 800 420" strokeOpacity="0.1" />
                </g>
                {/* River (Akerselva) */}
                <path
                  d="M 100 0 Q 140 200 80 320 T 60 500"
                  fill="none"
                  stroke="#1f4d3f"
                  strokeOpacity="0.28"
                  strokeWidth="6"
                />
                {/* Pin location */}
                <g transform="translate(400, 240)">
                  <circle r="40" fill="#b5532a" fillOpacity="0.12" />
                  <circle r="20" fill="#b5532a" fillOpacity="0.22" />
                  <circle r="8" fill="#b5532a" />
                </g>
              </svg>
            </div>

            <div className="absolute top-5 left-5 right-5 flex items-start justify-between gap-3">
              <div className="bg-cream/95 backdrop-blur px-3 py-2 font-mono text-[10px] tracking-[0.2em] uppercase text-ink">
                {t({
                  en: "Markveien 35 · Grünerløkka",
                  no: "Markveien 35 · Grünerløkka",
                })}
              </div>
              <div className="bg-cream/95 backdrop-blur px-3 py-2 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                59.92°N · 10.76°E
              </div>
            </div>

            <div className="absolute bottom-5 left-5">
              <Link
                href="/visit"
                className="inline-flex items-center gap-2 bg-ink text-cream px-4 py-2.5 text-[12px] tracking-wide hover:bg-terracotta transition-colors"
              >
                {t({
                  en: "Open in Maps",
                  no: "Åpne i Kart",
                })}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>

          {/* Visit details */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex flex-col"
          >
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
              {t({ en: "Visit", no: "Besøk" })}
            </span>
            <h2 className="mt-5 font-display text-[clamp(36px,5vw,60px)] tracking-display leading-[1.02] text-ink">
              {t({
                en: "Two minutes from Olaf Ryes plass.",
                no: "To minutter fra Olaf Ryes plass.",
              })}
            </h2>

            {/* Next available */}
            <div className="mt-8 inline-flex items-center gap-3 self-start bg-bookgreen/10 text-bookgreen px-4 py-2.5 border border-bookgreen/20">
              <span className="inline-block w-2 h-2 rounded-full bg-bookgreen animate-pulse" />
              <span className="font-mono text-[12px] tracking-wider">
                {t({
                  en: "Next available — Thursday 16:30",
                  no: "Neste ledige — torsdag 16:30",
                })}
              </span>
            </div>

            <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 text-[14px]">
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                  {t({ en: "Address", no: "Adresse" })}
                </dt>
                <dd className="mt-2 leading-relaxed text-ink">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                  {t({ en: "Transit", no: "Transport" })}
                </dt>
                <dd className="mt-2 leading-relaxed text-ink">
                  {t(site.transit)}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                  {t({ en: "Hours", no: "Åpningstider" })}
                </dt>
                <dd className="mt-2">
                  <ul className="space-y-1 leading-relaxed text-ink">
                    {site.hours.slice(0, 5).map((row) => (
                      <li
                        key={row.day.en}
                        className="flex justify-between gap-3 max-w-[18rem]"
                      >
                        <span>{t(row.day)}</span>
                        <span className="font-mono text-[12px] text-ink-muted">
                          {typeof row.time === "string"
                            ? row.time
                            : t(row.time)}
                        </span>
                      </li>
                    ))}
                    <li className="flex justify-between gap-3 max-w-[18rem] text-ink-muted">
                      <span>
                        {t({
                          en: "Sun & Mon",
                          no: "Søn & man",
                        })}
                      </span>
                      <span className="font-mono text-[12px]">
                        {t({ en: "Closed", no: "Stengt" })}
                      </span>
                    </li>
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                  {t({ en: "Contact", no: "Kontakt" })}
                </dt>
                <dd className="mt-2 space-y-1 leading-relaxed text-ink">
                  <p>
                    <a
                      href={`mailto:${site.email}`}
                      className="hover:text-terracotta-deep transition-colors"
                    >
                      {site.email}
                    </a>
                  </p>
                  <p className="font-mono text-[13px]">{site.phone}</p>
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex h-12 px-7 items-center bg-ink text-cream text-[14px] tracking-wide hover:bg-terracotta transition-colors"
              >
                {t({ en: "Book a chair", no: "Book en stol" })}
              </Link>
              <Link
                href="/visit"
                className="inline-flex h-12 px-7 items-center border border-ink text-ink text-[14px] tracking-wide hover:bg-ink hover:text-cream transition-colors"
              >
                {t({ en: "Plan your visit", no: "Planlegg besøket" })}
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
