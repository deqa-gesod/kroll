"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/components/providers/LangProvider";
import { team, type Stylist } from "@/lib/content/team";
import { images } from "@/lib/content/images";

export default function TheTeamPage() {
  const { t } = useLang();

  return (
    <>
      {/* Opener */}
      <section className="bg-cream-deep">
        <Container width="wide" className="pt-20 md:pt-28 pb-20 md:pb-28">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-8">
            {t({ en: "The team — Jackson & Coil", no: "Teamet — Jackson & Coil" })}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8 font-display text-[clamp(48px,8.5vw,140px)] tracking-display leading-[0.95] text-ink"
            >
              {t({
                en: (
                  <>
                    Five people.<br />
                    <span className="text-terracotta-deep">One curl spectrum.</span>
                  </>
                ) as unknown as string,
                no: (
                  <>
                    Fem stylister.<br />
                    <span className="text-terracotta-deep">Hele krøll-spekteret.</span>
                  </>
                ) as unknown as string,
              }) as unknown as React.ReactNode}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 max-w-md text-lg md:text-xl leading-snug text-ink-soft"
            >
              <p>
                {t({
                  en: "Every stylist here trained somewhere real. Every stylist here cuts the full curl spectrum. But each one has a chair they own — a pattern, a technique, a register they go deeper on than anyone else in the room.",
                  no: "Alle her er utdannet et sted som faktisk lærer dem noe. Alle her klipper hele krøll-spekteret. Men hver enkelt har sin egen stol — en krølltype, en teknikk, et register de går dypere på enn noen andre i rommet.",
                })}
              </p>
              <p className="mt-5 text-base text-ink-muted">
                {t({
                  en: "Pick the stylist by their work — not by who's free Tuesday at four. (Though we make that easy too.)",
                  no: "Velg stylist etter arbeidet deres — ikke etter hvem som er ledig tirsdag klokka fire. (Selv om det også skal være enkelt.)",
                })}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Stylist cards */}
      <section className="bg-cream">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-24 md:gap-y-32">
            {team.map((stylist, i) => (
              <StylistCard key={stylist.slug} stylist={stylist} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Closing strip — what every chair shares */}
      <section className="bg-ink text-cream">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <h2 className="md:col-span-5 font-display text-[clamp(36px,5.5vw,72px)] tracking-display leading-[0.95]">
              {t({
                en: "What every chair here shares.",
                no: "Hva hver stol her har til felles.",
              })}
            </h2>
            <div className="md:col-span-7 md:pl-10 md:border-l md:border-cream/15">
              <ul className="space-y-6 text-lg md:text-xl leading-snug text-cream/85">
                <li className="flex gap-5">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-cream/50 pt-1.5 w-10 shrink-0">01</span>
                  <span>
                    {t({
                      en: "We cut your hair dry, on its natural pattern. Always. Wet-cutting hides the shape — we'd rather see it.",
                      no: "Vi klipper håret tørt, på dets naturlige krøllmønster. Alltid. Vått klipp skjuler formen — vi vil heller se den.",
                    })}
                  </span>
                </li>
                <li className="flex gap-5">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-cream/50 pt-1.5 w-10 shrink-0">02</span>
                  <span>
                    {t({
                      en: "First visit always includes a free 15-minute dry consultation. No upsell, no pressure, no surprises on the bill.",
                      no: "Første besøk inkluderer alltid en gratis 15-minutters tørr konsultasjon. Ingen mersalg, ingen press, ingen overraskelser på regninga.",
                    })}
                  </span>
                </li>
                <li className="flex gap-5">
                  <span className="font-mono text-[11px] tracking-[0.25em] text-cream/50 pt-1.5 w-10 shrink-0">03</span>
                  <span>
                    {t({
                      en: "Every appointment ends with a short education. You leave knowing what was done and why — and how to do it at home.",
                      no: "Hver time avsluttes med en kort gjennomgang. Du går herfra og vet hva som ble gjort og hvorfor — og hvordan du gjør det selv hjemme.",
                    })}
                  </span>
                </li>
              </ul>

              <div className="mt-12 flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="inline-flex h-13 px-7 items-center bg-cream text-ink text-[14px] tracking-wide hover:bg-terracotta hover:text-cream transition-colors h-12"
                >
                  {t({ en: "Book a chair", no: "Book en stol" })}
                </Link>
                <Link
                  href="/the-method"
                  className="inline-flex h-12 px-7 items-center border border-cream/40 text-cream text-[14px] tracking-wide hover:bg-cream hover:text-ink transition-colors"
                >
                  {t({ en: "Read the method", no: "Les om metoden" })}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function StylistCard({ stylist, index }: { stylist: Stylist; index: number }) {
  const { t } = useLang();
  const img = images[stylist.image];

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 2) * 0.08 }}
      className="flex flex-col"
    >
      {/* Photo */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream-deep">
        <Image
          src={`/images/${img.file}`}
          alt={img.alt}
          fill
          sizes="(max-width: 768px) 100vw, 45vw"
          className="object-cover"
        />
        <div className="absolute left-0 top-0 p-4 md:p-5">
          <span className="bg-cream/90 backdrop-blur text-ink font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1">
            {String(index + 1).padStart(2, "0")} / {String(5).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Quote — the lead, in their own voice */}
      <blockquote className="mt-8 md:mt-10 font-display text-[clamp(26px,3vw,40px)] tracking-tight leading-[1.1] text-ink">
        &ldquo;{t(stylist.quote)}&rdquo;
      </blockquote>

      {/* Meta */}
      <div className="mt-8 grid grid-cols-1 gap-y-5">
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <h3 className="font-display text-2xl md:text-3xl tracking-tight text-ink">
            {stylist.name}
          </h3>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted text-right">
            {t(stylist.role)}
          </p>
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-[88px_1fr] gap-y-3 sm:gap-x-6 text-sm leading-relaxed">
          <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted pt-0.5">
            {t({ en: "Trained", no: "Utdannet" })}
          </dt>
          <dd className="text-ink-soft">{t(stylist.training)}</dd>

          <dt className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted pt-0.5">
            {t({ en: "Specialty", no: "Spesialitet" })}
          </dt>
          <dd className="text-ink-soft">{t(stylist.specialty)}</dd>
        </dl>

        <div className="flex items-center gap-4 pt-2">
          <Link
            href={`/booking?stylist=${stylist.slug}`}
            className="inline-flex h-11 px-5 items-center bg-ink text-cream text-[13px] tracking-wide hover:bg-terracotta transition-colors"
          >
            {t({ en: "Book with", no: "Book hos" })} {stylist.name.split(" ")[0]}
          </Link>
          {stylist.instagram && (
            <a
              href={`https://instagram.com/${stylist.instagram}`}
              target="_blank"
              rel="noreferrer"
              className="text-[13px] text-ink-soft hover:text-terracotta-deep transition-colors font-mono tracking-wide"
            >
              @{stylist.instagram}
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
