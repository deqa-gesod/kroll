"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/components/providers/LangProvider";
import { images } from "@/lib/content/images";
import {
  groupLabels,
  groupOrder,
  services,
  type Service,
} from "@/lib/content/services";
import { ServiceRow } from "@/components/services/ServiceRow";

export default function CutsAndServicesPage() {
  const { t } = useLang();

  // Continuous numbering across the whole list, regardless of group
  let runningIndex = 0;

  return (
    <div className="bg-cream">
      {/* ───────────────── HERO ───────────────── */}
      <section className="relative bg-cream-deep">
        <Container width="wide" className="pt-12 md:pt-20 pb-10 md:pb-16">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted"
          >
            {t({
              en: "Cuts & Services — every price on the page",
              no: "Klipp og tjenester — alle priser på siden",
            })}
          </motion.p>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8 font-display text-[clamp(56px,11vw,180px)] tracking-display leading-[0.92] text-ink"
            >
              {t({
                en: (
                  <>
                    What it is.
                    <br />
                    <span className="text-terracotta-deep">What it costs.</span>
                  </>
                ) as unknown as string,
                no: (
                  <>
                    Hva det er.
                    <br />
                    <span className="text-terracotta-deep">Hva det koster.</span>
                  </>
                ) as unknown as string,
              }) as unknown as React.ReactNode}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4"
            >
              <p className="text-lg leading-snug text-ink-soft">
                {t({
                  en: "No “from.” No POA. The price you see is the price you pay, unless your hair changes between the email and the chair. Color is the only exception, and we say so on the line.",
                  no: "Ingen «fra.» Ingen POA. Prisen du ser er prisen du betaler, med mindre håret ditt forandrer seg mellom epost og stol. Farge er eneste unntak, og det står på linjen.",
                })}
              </p>
              <div className="mt-6 flex items-center gap-3 text-[12px] font-mono tracking-wider text-ink-muted">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-bookgreen" />
                {t({
                  en: "Eight services. One menu. Both languages.",
                  no: "Åtte tjenester. Én meny. Begge språk.",
                })}
              </div>
            </motion.div>
          </div>
        </Container>

        {/* Hero image — landscape strip, used as the section divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4 }}
          className="relative w-full aspect-[16/7] md:aspect-[21/8] overflow-hidden bg-cream"
        >
          <Image
            src={`/images/${images.heroAlt2.file}`}
            alt={images.heroAlt2.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute left-0 bottom-0 p-4 md:p-6 flex items-end gap-3 text-[11px] font-mono tracking-[0.2em] uppercase text-cream">
            <span className="bg-ink/70 backdrop-blur px-2 py-1">
              {t({
                en: "Type 3C — dry, curl by curl",
                no: "Type 3C — tørr, krølle for krølle",
              })}
            </span>
          </div>
        </motion.div>
      </section>

      {/* ───────────────── PHILOSOPHY ───────────────── */}
      <section className="border-t border-line">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
                {t({ en: "How we price", no: "Slik priser vi" })}
              </p>
              <h2 className="mt-6 font-display text-[clamp(36px,5.4vw,72px)] tracking-display leading-[0.95] text-ink">
                {t({
                  en: "Same craft. Same price. Whatever your texture.",
                  no: "Samme håndverk. Samme pris. Uansett tekstur.",
                })}
              </h2>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-10 md:gap-14">
              {[
                {
                  k: "01",
                  h: { en: "One price per service.", no: "Én pris per tjeneste." },
                  b: {
                    en: "The Jackson Cut is 750, whether your hair is shoulder length or down your back, Type 2A or Type 4C. The work is the same. The price is the same.",
                    no: "The Jackson Cut koster 750, enten håret ditt går til skuldrene eller til midjen, Type 2A eller Type 4C. Jobben er den samme. Prisen er den samme.",
                  },
                },
                {
                  k: "02",
                  h: {
                    en: "Bundles, not à la carte.",
                    no: "Pakker, ikke à la carte.",
                  },
                  b: {
                    en: "Beard isn't 400 NOK on top of a cut. It's a bundle. The first-visit consultation isn't a separate ticket. It's already in.",
                    no: "Skjegg er ikke 400 NOK på toppen av en klipp. Det er en pakke. Førstegangs-konsultasjonen er ikke en egen post. Den er allerede inkludert.",
                  },
                },
                {
                  k: "03",
                  h: {
                    en: "Color is a plan.",
                    no: "Farge er en plan.",
                  },
                  b: {
                    en: "The only service we range-price, because the only honest answer before we see your hair is a range. Final number set in writing at the consult.",
                    no: "Eneste tjeneste vi prissetter med spenn — fordi det eneste ærlige svaret før vi ser håret ditt er et spenn. Endelig pris settes skriftlig ved konsultasjon.",
                  },
                },
                {
                  k: "04",
                  h: {
                    en: "The consultation is free.",
                    no: "Konsultasjonen er gratis.",
                  },
                  b: {
                    en: "First time, every time. Fifteen minutes, dry, no pressure. We'd rather give you the time and the truth, than book you into a chair and have it go wrong.",
                    no: "Første gang, hver gang. Femten minutter, tørr, uten press. Vi gir deg heller tiden og sannheten enn å bestille deg inn i en stol som ikke passer.",
                  },
                },
              ].map((tile) => (
                <div key={tile.k}>
                  <span className="font-mono text-[11px] tracking-[0.22em] text-terracotta-deep">
                    {tile.k}
                  </span>
                  <h3 className="mt-3 font-display text-2xl md:text-[28px] tracking-tight leading-tight text-ink">
                    {t(tile.h)}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                    {t(tile.b)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────── SERVICE LIST ───────────────── */}
      <section className="border-t border-line">
        <Container width="wide" className="pt-14 md:pt-20 pb-24 md:pb-32">
          {/* Top legend row */}
          <div className="hidden md:grid grid-cols-12 gap-6 pb-5 font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-muted">
            <span className="col-span-1">{t({ en: "No.", no: "Nr." })}</span>
            <span className="col-span-6">{t({ en: "Service", no: "Tjeneste" })}</span>
            <span className="col-span-2">{t({ en: "Time", no: "Tid" })}</span>
            <span className="col-span-3 text-right">
              {t({ en: "Price (NOK)", no: "Pris (NOK)" })}
            </span>
          </div>

          {groupOrder.map((group) => {
            const items = services.filter((s) => s.group === group);
            if (items.length === 0) return null;
            const meta = groupLabels[group];

            return (
              <div key={group} className="mt-10 md:mt-16 first:mt-0">
                {/* Section header */}
                <div className="grid grid-cols-12 gap-6 pb-6 md:pb-8 items-end">
                  <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
                    {t(meta.eyebrow)}
                  </p>
                  <h2 className="col-span-12 md:col-span-5 font-display text-[clamp(28px,4vw,46px)] tracking-display leading-[1] text-ink">
                    {t(meta.heading)}
                  </h2>
                  <p className="col-span-12 md:col-span-4 text-[14px] leading-snug text-ink-soft md:text-right">
                    {t(meta.intro)}
                  </p>
                </div>

                {/* Rows */}
                <div className="border-b border-line">
                  {items.map((service: Service) => {
                    runningIndex += 1;
                    return (
                      <ServiceRow
                        key={service.slug}
                        service={service}
                        index={runningIndex}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      {/* ───────────────── PRE-APPOINTMENT PREP ───────────────── */}
      <section className="bg-ink text-cream">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            <div className="lg:col-span-4">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-cream/50">
                {t({ en: "Before you come in", no: "Før du kommer inn" })}
              </p>
              <h2 className="mt-6 font-display text-[clamp(36px,5vw,68px)] tracking-display leading-[0.95]">
                {t({
                  en: "Arrive dry. On the natural pattern.",
                  no: "Møt tørr. På det naturlige mønsteret.",
                })}
              </h2>
              <p className="mt-6 max-w-md text-cream/70 leading-relaxed">
                {t({
                  en: "We cut dry, on what your hair actually does — not what it does once we've stretched it under water. Coming in prepped means we get to the cut faster, and you get the time on the part that matters.",
                  no: "Vi klipper tørt, på det håret ditt faktisk gjør — ikke det det gjør når vi har strukket det under vann. Kommer du forberedt, får vi raskere til klippen, og du får tiden på det som teller.",
                })}
              </p>
            </div>
            <div className="lg:col-span-8 grid sm:grid-cols-2 gap-x-10 gap-y-8">
              {[
                {
                  num: "01",
                  h: {
                    en: "Wash 24 — 48h before.",
                    no: "Vask 24 — 48 timer før.",
                  },
                  b: {
                    en: "Day-2 hair tells the truth about your pattern. Day-of-wash hair lies.",
                    no: "Dag-2-hår forteller sannheten om mønsteret ditt. Hår vasket samme dag lyver.",
                  },
                },
                {
                  num: "02",
                  h: {
                    en: "Detangle gently.",
                    no: "Greie ut forsiktig.",
                  },
                  b: {
                    en: "Wide-tooth comb on damp, conditioner-coated hair. Or fingers. Never on bone-dry hair.",
                    no: "Brei kam på fuktig hår med balsam. Eller fingrene. Aldri på beintørt hår.",
                  },
                },
                {
                  num: "03",
                  h: {
                    en: "Minimal product.",
                    no: "Minimalt med produkt.",
                  },
                  b: {
                    en: "Leave-in is fine. Skip heavy gels, custards or mousse on the day. We need to read the curl, not the cast.",
                    no: "Leave-in er greit. Hopp over tunge geleer, custards eller mousse på dagen. Vi må lese krøllen, ikke produktet.",
                  },
                },
                {
                  num: "04",
                  h: {
                    en: "No clips. No buns. No braids.",
                    no: "Ingen klips. Ingen bun. Ingen fletter.",
                  },
                  b: {
                    en: "Hair down, on the natural pattern, the way it sits. Imprints take ten minutes off your appointment.",
                    no: "Håret ned, på det naturlige mønsteret, slik det faller. Avtrykk koster ti minutter av timen din.",
                  },
                },
                {
                  num: "05",
                  h: {
                    en: "Bring a reference.",
                    no: "Ta med referanse.",
                  },
                  b: {
                    en: "A photo of you on a good day, or someone with a similar pattern, helps us calibrate. Not required — useful.",
                    no: "Et bilde av deg på en god dag, eller noen med tilsvarende mønster, hjelper oss kalibrere. Ikke påkrevd — nyttig.",
                  },
                },
                {
                  num: "06",
                  h: {
                    en: "Allow time.",
                    no: "Sett av tid.",
                  },
                  b: {
                    en: "We hold space for the chair to be unhurried. There is rarely anyone waiting behind you.",
                    no: "Vi holder rommet for at stolen skal være rolig. Det er sjelden noen som venter bak deg.",
                  },
                },
              ].map((row) => (
                <div key={row.num} className="border-t border-cream/15 pt-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-terracotta-soft">
                      {row.num}
                    </span>
                    <h3 className="font-display text-xl md:text-[22px] tracking-tight leading-tight text-cream">
                      {t(row.h)}
                    </h3>
                  </div>
                  <p className="mt-2 text-[14px] leading-relaxed text-cream/70">
                    {t(row.b)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────── WHAT WE DON'T DO ───────────────── */}
      <section className="border-t border-line">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
                {t({ en: "What we don't do", no: "Det vi ikke gjør" })}
              </p>
              <h2 className="mt-6 font-display text-[clamp(36px,5vw,72px)] tracking-display leading-[0.95] text-ink">
                {t({
                  en: "A short list, because honesty is faster than a phone call.",
                  no: "En kort liste, for ærlighet går raskere enn en telefon.",
                })}
              </h2>
            </div>

            <ul className="lg:col-span-7 divide-y divide-line border-y border-line">
              {[
                {
                  k: { en: "Keratin treatments", no: "Keratin-behandlinger" },
                  v: {
                    en: "Incompatible with our curl-affirming positioning. We won't book it, even if asked.",
                    no: "Ikke forenlig med vårt krøll-bekreftende ståsted. Vi booker det ikke, selv om vi blir spurt.",
                  },
                },
                {
                  k: { en: "Chemical relaxers", no: "Kjemisk retting" },
                  v: {
                    en: "Same. We don't relax curls. Other Oslo salons can — we are not them.",
                    no: "Samme. Vi retter ikke krøller. Andre Oslo-salonger kan — vi er ikke dem.",
                  },
                },
                {
                  k: { en: "Wet cutting", no: "Våt klipping" },
                  v: {
                    en: "Stretches the curl, hides the pattern, returns the wrong shape when the hair springs back. We dry-cut, always.",
                    no: "Strekker krøllen, skjuler mønsteret, gir feil form når håret slår seg tilbake. Vi klipper tørt, alltid.",
                  },
                },
                {
                  k: { en: "Lashes, nails, brows", no: "Vipper, negler, bryn" },
                  v: {
                    en: "Specialism is the brand. Curls are the work. Anything else is somewhere else.",
                    no: "Spesialiseringen er selve merket. Krøller er jobben. Alt annet er et annet sted.",
                  },
                },
                {
                  k: { en: "Surprise pricing", no: "Skjult prising" },
                  v: {
                    en: "Every price is on this page. Anything that lands on the bill that wasn't quoted, we eat.",
                    no: "Hver pris står på denne siden. Alt som havner på regningen uten at det er kvotert — det tar vi.",
                  },
                },
              ].map((row, i) => (
                <li
                  key={i}
                  className="grid grid-cols-12 gap-4 py-5 items-baseline"
                >
                  <span className="col-span-12 md:col-span-4 font-display text-xl md:text-[22px] tracking-tight text-ink">
                    {t(row.k)}
                  </span>
                  <span className="col-span-12 md:col-span-8 text-[15px] leading-snug text-ink-soft">
                    {t(row.v)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ───────────────── FINAL CTA ───────────────── */}
      <section className="bg-cream-deep border-t border-line">
        <Container width="wide" className="py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <h2 className="lg:col-span-8 font-display text-[clamp(48px,9vw,140px)] tracking-display leading-[0.95] text-ink">
              {t({
                en: (
                  <>
                    Pick a service.
                    <br />
                    <span className="text-terracotta-deep">Or talk first.</span>
                  </>
                ) as unknown as string,
                no: (
                  <>
                    Velg en tjeneste.
                    <br />
                    <span className="text-terracotta-deep">Eller prat først.</span>
                  </>
                ) as unknown as string,
              }) as unknown as React.ReactNode}
            </h2>
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                href="/booking"
                className="inline-flex h-14 px-8 items-center justify-between bg-ink text-cream text-[14px] tracking-wide hover:bg-terracotta transition-colors"
              >
                <span>
                  {t({ en: "Book a chair", no: "Book en stol" })}
                </span>
                <span aria-hidden className="font-mono">→</span>
              </Link>
              <Link
                href="/booking?service=consultation"
                className="inline-flex h-14 px-8 items-center justify-between border border-ink text-ink text-[14px] tracking-wide hover:bg-ink hover:text-cream transition-colors"
              >
                <span>
                  {t({
                    en: "Free 15-minute consultation",
                    no: "Gratis 15-min konsultasjon",
                  })}
                </span>
                <span aria-hidden className="font-mono">→</span>
              </Link>
              <Link
                href="/the-method"
                className="mt-4 text-[13px] text-ink-soft hover:text-terracotta-deep transition-colors underline underline-offset-4 decoration-line"
              >
                {t({
                  en: "Or read about The Jackson Cut method →",
                  no: "Eller les om The Jackson Cut-metoden →",
                })}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
