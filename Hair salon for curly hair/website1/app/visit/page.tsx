"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/components/providers/LangProvider";
import { images } from "@/lib/content/images";
import { site } from "@/lib/content/site";

export default function VisitPage() {
  const { t } = useLang();

  return (
    <>
      {/* Opener */}
      <section className="bg-cream-deep">
        <Container width="wide" className="pt-20 md:pt-28 pb-16 md:pb-20">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-8">
            {t({ en: "Visit — Markveien 35, Grünerløkka", no: "Besøk — Markveien 35, Grünerløkka" })}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 font-display text-[clamp(48px,8vw,132px)] tracking-display leading-[0.95] text-ink"
            >
              {t({
                en: (
                  <>
                    Markveien 35.<br />
                    <span className="text-terracotta-deep">Two trams away.</span>
                  </>
                ) as unknown as string,
                no: (
                  <>
                    Markveien 35.<br />
                    <span className="text-terracotta-deep">To trikker unna.</span>
                  </>
                ) as unknown as string,
              }) as unknown as React.ReactNode}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 max-w-md text-lg md:text-xl leading-snug text-ink-soft"
            >
              {t({
                en: "Everything you need before your appointment, on one page. The address, the hours, what to do with your hair the day before, where to get a coffee while you wait.",
                no: "Alt du trenger før timen, på én side. Adressen, åpningstidene, hva du gjør med håret dagen før, hvor du får kaffe mens du venter.",
              })}
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Address / Hours / Transit — quick facts */}
      <section className="bg-cream">
        <Container width="wide" className="py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-line pt-12">
            {/* Address */}
            <Fact label={t({ en: "Address", no: "Adresse" })}>
              <p className="font-display text-2xl md:text-3xl tracking-tight leading-[1.15] text-ink">
                {site.address.line1}
                <br />
                {site.address.line2}
              </p>
              <p className="mt-3 font-mono text-[12px] tracking-wider text-ink-muted uppercase">
                {site.neighborhood}
              </p>
            </Fact>

            {/* Hours */}
            <Fact label={t({ en: "Hours", no: "Åpningstider" })}>
              <ul className="space-y-1.5 text-[15px] leading-relaxed text-ink-soft">
                {site.hours.map((row) => (
                  <li key={row.day.en} className="flex justify-between gap-3">
                    <span>{t(row.day)}</span>
                    <span className="font-mono text-[12px] text-ink-muted pt-1">
                      {typeof row.time === "string" ? row.time : t(row.time)}
                    </span>
                  </li>
                ))}
              </ul>
            </Fact>

            {/* Contact */}
            <Fact label={t({ en: "Contact", no: "Kontakt" })}>
              <ul className="space-y-2 text-[15px] leading-relaxed text-ink-soft">
                <li>
                  <a href={`mailto:${site.email}`} className="hover:text-terracotta-deep transition-colors">
                    {site.email}
                  </a>
                </li>
                <li className="font-mono text-[14px] text-ink-soft">{site.phone}</li>
                <li>
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-terracotta-deep transition-colors"
                  >
                    {site.instagram.handle}
                  </a>
                </li>
              </ul>
            </Fact>
          </div>
        </Container>
      </section>

      {/* Map placeholder + transit info */}
      <section className="bg-cream">
        <Container width="wide" className="pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8 relative aspect-[16/10] overflow-hidden border border-line bg-cream-deep"
            >
              {/* Stylised map placeholder */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 opacity-60">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border-r border-b border-line/60" />
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-muted mb-3">
                  {t({ en: "Map — coming soon", no: "Kart — kommer snart" })}
                </span>
                <p className="font-display text-3xl md:text-5xl tracking-display leading-[1] text-ink">
                  Markveien 35
                </p>
                <p className="mt-3 text-sm text-ink-muted">
                  {t({
                    en: "Between Olaf Ryes plass and Schous plass",
                    no: "Mellom Olaf Ryes plass og Schous plass",
                  })}
                </p>
                <div className="mt-6 flex flex-col items-center gap-1 font-mono text-[11px] tracking-wider text-terracotta-deep">
                  <span>59.9230° N</span>
                  <span>10.7600° E</span>
                </div>
              </div>
              <div className="absolute left-4 top-4 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-muted">
                Grünerløkka / Oslo
              </div>
            </motion.div>

            <div className="lg:col-span-4 flex flex-col gap-6">
              <div>
                <SectionLabel>{t({ en: "Getting here", no: "Sånn kommer du hit" })}</SectionLabel>
                <p className="text-base leading-relaxed text-ink-soft">{t(site.transit)}</p>
              </div>
              <div>
                <SectionLabel>{t({ en: "Parking", no: "Parkering" })}</SectionLabel>
                <p className="text-base leading-relaxed text-ink-soft">
                  {t({
                    en: "Street parking on Markveien is metered weekdays until 17:00. The Olaf Ryes plass underground garage is two minutes south. Most of our clients come by tram or bike — it's faster.",
                    no: "Gateparkering i Markveien er avgiftsbelagt på hverdager fram til 17:00. P-huset under Olaf Ryes plass ligger to minutter sør. De fleste kundene våre kommer med trikk eller sykkel — det går raskere.",
                  })}
                </p>
              </div>
              <div>
                <SectionLabel>{t({ en: "Cycling", no: "Sykkel" })}</SectionLabel>
                <p className="text-base leading-relaxed text-ink-soft">
                  {t({
                    en: "Bike racks directly outside the door. Oslo Bysykkel station at Olaf Ryes plass.",
                    no: "Sykkelstativ rett utenfor døra. Oslo Bysykkel-stasjon ved Olaf Ryes plass.",
                  })}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Exterior + interior — two photos in a strip */}
      <section className="bg-cream-deep">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden bg-cream"
            >
              <Image
                src={`/images/${images.visitExterior.file}`}
                alt={images.visitExterior.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute left-0 bottom-0 p-4 md:p-5">
                <span className="bg-cream/90 backdrop-blur text-ink font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1">
                  {t({ en: "Outside", no: "Utenfor" })}
                </span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/5] overflow-hidden bg-cream"
            >
              <Image
                src={`/images/${images.visitInterior.file}`}
                alt={images.visitInterior.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute left-0 bottom-0 p-4 md:p-5">
                <span className="bg-cream/90 backdrop-blur text-ink font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1">
                  {t({ en: "Inside", no: "Inne" })}
                </span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* What to expect — first visit prep */}
      <section className="bg-cream">
        <Container width="wide" className="py-20 md:py-28">
          <div className="max-w-3xl mb-14 md:mb-20">
            <SectionLabel>{t({ en: "First visit", no: "Første besøk" })}</SectionLabel>
            <h2 className="font-display text-[clamp(36px,5.5vw,80px)] tracking-display leading-[0.98] text-ink">
              {t({
                en: "What to do with your hair before you come.",
                no: "Hva du gjør med håret før du kommer.",
              })}
            </h2>
            <p className="mt-6 text-lg leading-snug text-ink-soft max-w-2xl">
              {t({
                en: "We cut dry, on the natural pattern. That means the hair you arrive with is the hair we cut — so the prep is half the appointment. Read this once. It saves us both an hour.",
                no: "Vi klipper tørt, på det naturlige mønsteret. Det betyr at håret du kommer med, er håret vi klipper — så forberedelsen er halve timen. Les dette én gang. Det sparer oss begge en time.",
              })}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 md:gap-x-16">
            <Step
              n="01"
              title={t({ en: "Arrive with dry hair.", no: "Kom med tørt hår." })}
              body={t({
                en: "Completely dry, completely detangled, in its natural state. We need to see the curl pattern doing what it does on a normal day — not what it does ten minutes after a shower.",
                no: "Helt tørt, helt utgreidd, i sin naturlige form. Vi trenger å se krøllen gjøre det den gjør en vanlig dag — ikke det den gjør ti minutter etter dusjen.",
              })}
            />
            <Step
              n="02"
              title={t({ en: "No hats, clips, braids — 24 hours before.", no: "Ingen lue, klips eller fletter — 24 timer før." })}
              body={t({
                en: "Anything that compresses or splits the hair gives us a false read. If it's raining, hood up but loose. If you slept in a bonnet, that's fine — just take it off before you arrive, not after you sit down.",
                no: "Alt som klemmer eller deler håret gir oss feil avlesning. Regner det, ha hetta løst på. Sov du med bonnet, er det helt greit — bare ta den av før du kommer, ikke etter du har satt deg.",
              })}
            />
            <Step
              n="03"
              title={t({ en: "Wash the day before, not the morning of.", no: "Vask dagen før, ikke samme morgen." })}
              body={t({
                en: "Day-two hair shows us the actual pattern better than freshly-washed hair. If you usually use a leave-in or curl cream, use the one you always use — we want to see your hair on its normal routine, not a special occasion.",
                no: "Dag-to-hår viser oss det faktiske mønsteret bedre enn nyvasket hår. Bruker du vanligvis leave-in eller krøllkrem, bruk den du alltid bruker — vi vil se håret ditt i normalrutina, ikke på spesialdag.",
              })}
            />
            <Step
              n="04"
              title={t({ en: "Allow 60 to 90 minutes.", no: "Sett av 60 til 90 minutter." })}
              body={t({
                en: "Wear something comfortable. We work standing, you sit; appointments often run a touch over while we finish properly rather than rush the last ten percent. The first visit includes the free 15-minute consultation built in.",
                no: "Ha på noe behagelig. Vi jobber stående, du sitter; timer går av og til litt over fordi vi heller fullfører ordentlig enn å haste de siste ti prosentene. Første besøk har den gratis 15-minutters konsultasjonen bakt inn.",
              })}
            />
            <Step
              n="05"
              title={t({ en: "Bring product references.", no: "Ta med produktreferanser." })}
              body={t({
                en: "If you have go-to brands you actually love — Bread, Pattern, Bouclème, whatever — tell us, or bring the bottle. Half the consultation is matching the cut to the routine you already keep.",
                no: "Har du favorittmerker du faktisk er glad i — Bread, Pattern, Bouclème, hva det enn er — så si fra, eller ta med flaska. Halve konsultasjonen er å matche klippet med rutinen du allerede har.",
              })}
            />
            <Step
              n="06"
              title={t({ en: "Tell us what you're scared of.", no: "Si fra hva du er redd for." })}
              body={t({
                en: "Most people show up with something. \"Last time someone took off too much.\" \"My hair always looks flat at the back.\" \"I'm not sure if you cut my pattern.\" Say it before we start. It changes the whole appointment.",
                no: "De fleste kommer med noe. «Sist tok noen av for mye.» «Håret er alltid flatt bak.» «Jeg er ikke sikker på om dere klipper mønsteret mitt.» Si det før vi starter. Det endrer hele timen.",
              })}
            />
          </div>
        </Container>
      </section>

      {/* Day-of — practical block: nearby */}
      <section className="bg-cream-deep">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionLabel>{t({ en: "Day-of", no: "Selve dagen" })}</SectionLabel>
              <h2 className="font-display text-[clamp(32px,5vw,68px)] tracking-display leading-[1] text-ink">
                {t({
                  en: "If you're early, here's where to go.",
                  no: "Er du tidlig ute, gå hit.",
                })}
              </h2>
              <p className="mt-6 text-lg leading-snug text-ink-soft">
                {t({
                  en: "Grünerløkka has more good coffee per square metre than anywhere in Oslo. We've kept this list short and biased.",
                  no: "Grünerløkka har mer god kaffe per kvadratmeter enn noe annet sted i Oslo. Vi har holdt lista kort og partisk.",
                })}
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-line">
                <Nearby
                  name="Tim Wendelboe"
                  meta={t({ en: "Coffee — 3 minutes east", no: "Kaffe — 3 minutter øst" })}
                  body={t({
                    en: "If your appointment is at 11, get a flat white at 10:30 and read on the bench outside. The bar inside is loud at peak hours.",
                    no: "Er timen din 11, ta en flat white 10:30 og les på benken utenfor. Baren inne kan være travel midt på dagen.",
                  })}
                />
                <Nearby
                  name="Talormade"
                  meta={t({ en: "Ice cream — 2 minutes south", no: "Iskrem — 2 minutter sør" })}
                  body={t({
                    en: "After, not before. The brown butter is the answer. They open at 12:00.",
                    no: "Etter, ikke før. Brunsmør-isen er svaret. De åpner kl. 12:00.",
                  })}
                />
                <Nearby
                  name="Nedre Foss Gård"
                  meta={t({ en: "Lunch — 6 minutes north along Akerselva", no: "Lunsj — 6 minutter nord langs Akerselva" })}
                  body={t({
                    en: "If you've made a half-day of it. River-side, slow service in a good way.",
                    no: "Hvis du har gjort halve dagen av det. Ved elva, treig service på den gode måten.",
                  })}
                />
                <Nearby
                  name="Olaf Ryes plass"
                  meta={t({ en: "The square — 2 minutes south", no: "Plassen — 2 minutter sør" })}
                  body={t({
                    en: "Bench, tree, people-watching, free. The honest answer for most clients.",
                    no: "Benk, tre, folk å se på, gratis. Det ærlige svaret for de fleste.",
                  })}
                />
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Booking CTA */}
      <section className="bg-ink text-cream">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <h2 className="lg:col-span-7 font-display text-[clamp(40px,7vw,116px)] tracking-display leading-[0.95]">
              {t({
                en: (
                  <>
                    See you on <br />
                    <span className="text-terracotta-soft italic">Markveien.</span>
                  </>
                ) as unknown as string,
                no: (
                  <>
                    Vi sees i <br />
                    <span className="text-terracotta-soft italic">Markveien.</span>
                  </>
                ) as unknown as string,
              }) as unknown as React.ReactNode}
            </h2>
            <div className="lg:col-span-5 lg:pl-10 lg:border-l lg:border-cream/15">
              <p className="text-lg leading-snug text-cream/80 mb-8">
                {t({
                  en: "Real availability — not request-and-we'll-get-back-to-you. Weekday evenings included. SMS reminder 24 hours before.",
                  no: "Faktisk ledig tid — ikke send-en-forespørsel-så-hører-du-fra-oss. Hverdagskvelder også. SMS-påminnelse 24 timer før.",
                })}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/booking"
                  className="inline-flex h-14 px-8 items-center bg-cream text-ink text-[14px] tracking-wide hover:bg-terracotta hover:text-cream transition-colors"
                >
                  {t({ en: "Book a chair", no: "Book en stol" })}
                </Link>
                <Link
                  href="/booking?service=consultation"
                  className="inline-flex h-14 px-8 items-center border border-cream/40 text-cream text-[14px] tracking-wide hover:bg-cream hover:text-ink transition-colors"
                >
                  {t({
                    en: "Free 15-min consultation",
                    no: "Gratis 15-min konsultasjon",
                  })}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep mb-4">
      {children}
    </p>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-5">
        {label}
      </h2>
      {children}
    </div>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-line pt-6"
    >
      <span className="font-mono text-[11px] tracking-[0.25em] text-terracotta-deep">{n}</span>
      <h3 className="mt-4 font-display text-2xl md:text-[28px] tracking-tight leading-[1.2] text-ink">
        {title}
      </h3>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">{body}</p>
    </motion.div>
  );
}

function Nearby({ name, meta, body }: { name: string; meta: string; body: string }) {
  return (
    <li className="py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start">
      <div className="md:col-span-4">
        <p className="font-display text-2xl tracking-tight text-ink leading-tight">{name}</p>
        <p className="mt-1 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">{meta}</p>
      </div>
      <p className="md:col-span-8 text-base leading-relaxed text-ink-soft">{body}</p>
    </li>
  );
}
