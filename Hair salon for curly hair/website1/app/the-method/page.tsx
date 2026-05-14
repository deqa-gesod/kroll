"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/components/providers/LangProvider";
import { images } from "@/lib/content/images";
import { MethodStep } from "@/components/method/MethodStep";
import { AndreWalkerChart } from "@/components/method/AndreWalkerChart";

export default function TheMethodPage() {
  const { t } = useLang();

  return (
    <div className="bg-cream">
      {/* ───────────────── HERO ─────────────────
          Hero image: portfolio4A — a Type 4A Black woman, lit properly.
          Passes BRAND §9 Photography Test for this page. Headline overlays. */}
      <section className="relative w-full overflow-hidden">
        <div className="relative aspect-[16/10] md:aspect-[21/10] bg-cream-deep">
          <Image
            src={`/images/${images.portfolio4A.file}`}
            alt={images.portfolio4A.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Bottom gradient for type legibility */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
          />
          {/* Top meta */}
          <div className="absolute inset-x-0 top-0 p-5 md:p-8">
            <Container width="wide">
              <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.25em] uppercase text-cream/80">
                <span>
                  {t({
                    en: "The Method — Jackson & Coil",
                    no: "Metoden — Jackson & Coil",
                  })}
                </span>
                <span className="hidden sm:inline">
                  {t({ en: "Five steps. One craft.", no: "Fem trinn. Ett håndverk." })}
                </span>
              </div>
            </Container>
          </div>

          {/* Bottom headline */}
          <div className="absolute inset-x-0 bottom-0 pb-10 md:pb-16">
            <Container width="wide">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-mono text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-terracotta-soft"
              >
                {t({
                  en: "Trained at Curl Bar London. Devachan NYC. Hair Rules.",
                  no: "Utdannet ved Curl Bar London. Devachan NYC. Hair Rules.",
                })}
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="mt-5 font-display text-[clamp(60px,12vw,200px)] tracking-display leading-[0.9] text-cream"
              >
                {t({
                  en: "The Jackson Cut.",
                  no: "The Jackson Cut.",
                })}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="mt-6 max-w-2xl text-cream/85 text-lg md:text-xl leading-snug"
              >
                {t({
                  en: "A named, owned, dry-cutting method for Type 2 — 4 hair. The cut for women, the Sculpt Cut for men, both descended from the same five steps. This is what we mean by it.",
                  no: "En navngitt, egen, tørr klippemetode for Type 2 — 4-hår. Klippen for kvinner, Sculpt Cut for menn, begge utviklet fra de samme fem trinnene. Dette er hva vi mener med det.",
                })}
              </motion.p>
            </Container>
          </div>
        </div>
      </section>

      {/* ───────────────── ANCHOR LINE ───────────────── */}
      <section className="border-t border-line">
        <Container width="wide" className="py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <p className="lg:col-span-2 font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
              {t({ en: "In one sentence", no: "Med én setning" })}
            </p>
            <p className="lg:col-span-10 font-display text-[clamp(28px,4.4vw,56px)] tracking-display leading-[1.05] text-ink">
              {t({
                en: (
                  <>
                    Every curl pattern is the same job done with{" "}
                    <span className="text-terracotta-deep">knowledge</span> — and
                    knowledge is something you go and get, not something you
                    wait for.
                  </>
                ) as unknown as string,
                no: (
                  <>
                    Hvert krøllmønster er den samme jobben gjort med{" "}
                    <span className="text-terracotta-deep">kunnskap</span> — og
                    kunnskap er noe du går og henter, ikke noe du venter på.
                  </>
                ) as unknown as string,
              }) as unknown as React.ReactNode}
            </p>
          </div>
          <p className="mt-8 lg:ml-[16.667%] font-mono text-[11px] tracking-[0.22em] uppercase text-ink-muted">
            — {t({ en: "Vanessa Jackson", no: "Vanessa Jackson" })}
          </p>
        </Container>
      </section>

      {/* ───────────────── 45-SECOND VIDEO PLACEHOLDER ───────────────── */}
      <section className="border-t border-line bg-ink text-cream">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-5">
              <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-cream/50">
                {t({ en: "Watch — 45 seconds", no: "Se — 45 sekunder" })}
              </p>
              <h2 className="mt-6 font-display text-[clamp(36px,5.4vw,80px)] tracking-display leading-[0.95]">
                {t({
                  en: "Vanessa, mid-cut, in real time.",
                  no: "Vanessa, midt i klippen, i sanntid.",
                })}
              </h2>
              <p className="mt-6 max-w-md text-cream/70 leading-relaxed">
                {t({
                  en: "No voiceover. No music swell. Just the work, dry, on the natural pattern, exactly the way it happens in the chair.",
                  no: "Ingen voiceover. Ingen musikkbygg. Bare arbeidet, tørt, på det naturlige mønsteret, akkurat slik det skjer i stolen.",
                })}
              </p>
            </div>

            {/* Video poster */}
            <button
              type="button"
              className="lg:col-span-7 group relative block w-full aspect-[16/10] overflow-hidden bg-cream-deep cursor-pointer"
              aria-label={t({
                en: "Play 45-second method video",
                no: "Spill av 45-sekunders metode-video",
              })}
            >
              <Image
                src={`/images/${images.method2.file}`}
                alt={images.method2.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 56vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-ink/30 group-hover:bg-ink/15 transition-colors"
              />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="relative inline-flex items-center justify-center w-20 h-20 md:w-28 md:h-28 rounded-full bg-cream text-ink transition-transform duration-500 group-hover:scale-110">
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-cream/60 scale-110 group-hover:scale-125 transition-transform duration-700"
                  />
                  <svg
                    viewBox="0 0 24 24"
                    width="22"
                    height="22"
                    aria-hidden
                    className="md:w-7 md:h-7 translate-x-[2px]"
                  >
                    <polygon points="6,4 20,12 6,20" fill="currentColor" />
                  </svg>
                </span>
              </div>

              {/* Bottom strip */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 flex items-end justify-between text-[11px] font-mono tracking-[0.2em] uppercase text-cream">
                <span className="bg-ink/70 backdrop-blur px-2 py-1">
                  {t({ en: "Type 4 / dry / curl by curl", no: "Type 4 / tørr / krølle for krølle" })}
                </span>
                <span className="bg-ink/70 backdrop-blur px-2 py-1 font-mono">
                  00:45
                </span>
              </div>
            </button>
          </div>
        </Container>
      </section>

      {/* ───────────────── THE FIVE STEPS ───────────────── */}
      <section>
        <Container width="wide" className="pt-20 md:pt-28">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <p className="col-span-12 md:col-span-2 font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
              {t({ en: "The five steps", no: "De fem trinnene" })}
            </p>
            <h2 className="col-span-12 md:col-span-10 font-display text-[clamp(40px,7vw,108px)] tracking-display leading-[0.95] text-ink">
              {t({
                en: "Assess. Map. Cut. Finish. Educate.",
                no: "Vurder. Kartlegg. Klipp. Finish. Forklar.",
              })}
            </h2>
          </div>
        </Container>

        <Container width="wide">
          <MethodStep
            index={1}
            total={5}
            eyebrow={{ en: "Step one — Assess", no: "Trinn én — Vurder" }}
            title={{
              en: "Read the hair before you touch it.",
              no: "Les håret før du rører det.",
            }}
            body={{
              en: "Dry. On the natural pattern. We read curl type, density, porosity, and growth direction before scissors come out — and we write it down. The same hair on a different day will tell a different story; we cut what's actually in front of us, not the photograph from your last appointment.",
              no: "Tørt. På det naturlige mønsteret. Vi leser krølltype, tetthet, porøsitet og veksretning før saksen kommer fram — og vi skriver det ned. Samme hår på en annen dag forteller en annen historie; vi klipper det som faktisk er foran oss, ikke fotografiet fra forrige time.",
            }}
            moves={[
              { en: "Curl type", no: "Krølltype" },
              { en: "Density", no: "Tetthet" },
              { en: "Porosity", no: "Porøsitet" },
              { en: "Growth direction", no: "Veksretning" },
            ]}
            image={{
              src: `/images/${images.method1.file}`,
              alt: images.method1.alt,
            }}
            reverse={false}
          />

          <MethodStep
            index={2}
            total={5}
            eyebrow={{ en: "Step two — Map", no: "Trinn to — Kartlegg" }}
            title={{
              en: "Different rules for different zones.",
              no: "Ulike regler for ulike soner.",
            }}
            body={{
              en: "We mark four zones — canopy, underlayer, nape, temple — and the cut takes a different rule in each. The canopy frames; the underlayer holds the shape; the nape sets the silhouette; the temple is where the lineup lives. The map is what makes the same haircut work on Type 2A and Type 4C.",
              no: "Vi markerer fire soner — topplag, underlag, nakke, tinning — og klippen følger ulike regler i hver. Topplaget rammer inn; underlaget holder formen; nakken setter silhuetten; tinningen er der lineupen lever. Kartet er det som gjør at samme klipp fungerer på Type 2A og Type 4C.",
            }}
            moves={[
              { en: "Canopy", no: "Topplag" },
              { en: "Underlayer", no: "Underlag" },
              { en: "Nape", no: "Nakke" },
              { en: "Temple", no: "Tinning" },
            ]}
            reverse
          />

          <MethodStep
            index={3}
            total={5}
            eyebrow={{ en: "Step three — Cut", no: "Trinn tre — Klipp" }}
            title={{
              en: "Curl by curl. Dry. Never under tension.",
              no: "Krølle for krølle. Tørr. Aldri under spenning.",
            }}
            body={{
              en: "Each curl is taken individually, on its own pattern, never stretched between fingers, never wet. The shape is built from the springback, not against it. This is the slowest part of the appointment and the part the work depends on.",
              no: "Hver krølle tas individuelt, på sitt eget mønster, aldri strukket mellom fingrene, aldri våt. Formen bygges fra tilbakefjæringen, ikke mot den. Dette er den tregeste delen av timen og den jobben hviler på.",
            }}
            moves={[
              { en: "Dry-cut", no: "Tørr klipp" },
              { en: "Curl-by-curl", no: "Krølle-for-krølle" },
              { en: "Springback shape", no: "Tilbakefjær-form" },
            ]}
            image={{
              src: `/images/${images.method2.file}`,
              alt: images.method2.alt,
            }}
            reverse={false}
          />

          <MethodStep
            index={4}
            total={5}
            eyebrow={{ en: "Step four — Finish", no: "Trinn fire — Finish" }}
            title={{
              en: "Style it the way you'll style it.",
              no: "Style det slik du selv vil style det.",
            }}
            body={{
              en: "Cleanse, condition, leave-in, definition product. Whatever the routine is, it's the one you can buy on your way out and recreate on a Tuesday morning before work. We don't do salon-only finishes that need three products you can't get in Norway.",
              no: "Vask, balsam, leave-in, definisjons-produkt. Uansett hvilken rutine — det er den du kan kjøpe på vei ut og gjenskape en tirsdag morgen før jobb. Vi gjør ikke salong-finishes som krever tre produkter du ikke får tak i Norge.",
            }}
            moves={[
              { en: "Low-poo", no: "Lavskum" },
              { en: "Leave-in", no: "Leave-in" },
              { en: "Definition", no: "Definisjon" },
              { en: "Diffuse-or-air", no: "Diffuse-eller-luft" },
            ]}
            image={{
              src: `/images/${images.method3.file}`,
              alt: images.method3.alt,
            }}
            reverse
          />

          <MethodStep
            index={5}
            total={5}
            eyebrow={{ en: "Step five — Educate", no: "Trinn fem — Forklar" }}
            title={{
              en: "You leave knowing what was done.",
              no: "Du går herfra og vet hva som ble gjort.",
            }}
            body={{
              en: "Every cut ends the same way: with the stylist showing you what was done, where, and why. Which zone we shaped, what your porosity asked for, what to wash with on Sunday. The chair is half the appointment. The hand-off is the other half.",
              no: "Hver klipp slutter på samme måte: med at stylisten viser deg hva som ble gjort, hvor, og hvorfor. Hvilken sone vi formet, hva porøsiteten din ba om, hva du skal vaske med på søndag. Stolen er halve timen. Overleveringen er den andre halvparten.",
            }}
            moves={[
              { en: "Walkthrough", no: "Gjennomgang" },
              { en: "At-home routine", no: "Hjemme-rutine" },
              { en: "Written notes", no: "Skriftlige notater" },
            ]}
            reverse={false}
          />
        </Container>
      </section>

      {/* ───────────────── ANDRE WALKER CHART ───────────────── */}
      <section className="border-t border-line bg-cream-deep">
        <Container width="wide" className="py-24 md:py-32">
          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12 md:mb-16 items-end">
            <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
              {t({ en: "The chart", no: "Tabellen" })}
            </p>
            <h2 className="col-span-12 md:col-span-9 font-display text-[clamp(36px,6vw,84px)] tracking-display leading-[0.95] text-ink">
              {t({
                en: "Andre Walker. Type 2A through 4C.",
                no: "Andre Walker. Type 2A til 4C.",
              })}
            </h2>
          </div>

          <div className="grid grid-cols-12 gap-6 md:gap-10 mb-12">
            <p className="col-span-12 md:col-span-8 md:col-start-4 max-w-prose text-[16px] md:text-[17px] leading-relaxed text-ink-soft">
              {t({
                en: "Andre Walker — Oprah's stylist for twenty-five years — published this typology in 1997. It is not the whole truth (most heads carry two or three patterns at once, and porosity matters as much as type), but it is the shared vocabulary the curl world uses. We read it on day one, in front of the mirror, with you. Then we get to work.",
                no: "Andre Walker — Oprahs stylist i tjuefem år — publiserte denne typologien i 1997. Den er ikke hele sannheten (de fleste hoder har to-tre mønstre samtidig, og porøsitet betyr like mye som type), men det er det felles vokabularet krøll-verdenen bruker. Vi leser den dag én, foran speilet, med deg. Så går vi i gang.",
              })}
            </p>
          </div>

          <AndreWalkerChart />

          <div className="mt-14 md:mt-20 grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-6">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-muted">
                {t({ en: "Type 2", no: "Type 2" })}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {t({
                  en: "Wave. The S-shape. Sigrid's hair. Often misdiagnosed as “straight but frizzy” by stylists who only read it under tension.",
                  no: "Bølge. S-formen. Sigrids hår. Ofte feildiagnostisert som «rett men frizzy» av stylister som kun leser det under spenning.",
                })}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-muted">
                {t({ en: "Type 3", no: "Type 3" })}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {t({
                  en: "Spiral. Defined ringlets. The DevaCut category. Heaviness at the root and the temple is where most stylists get this one wrong.",
                  no: "Spiral. Definerte ringer. DevaCut-kategorien. Tyngde ved roten og tinningen er der de fleste stylister bommer på denne.",
                })}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-muted">
                {t({ en: "Type 4", no: "Type 4" })}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {t({
                  en: "Coil. The Z-pattern. Amara's hair, Daniel's hair. Built for volume and density. The category most Oslo salons quietly turn away — and the one we built for first.",
                  no: "Coil. Z-mønsteret. Amaras hår, Daniels hår. Bygget for volum og tetthet. Kategorien de fleste Oslo-salonger stille avviser — og den vi bygde for først.",
                })}
              </p>
            </div>
            <div className="col-span-12 md:col-span-6">
              <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-muted">
                {t({ en: "Mixed pattern", no: "Blandet mønster" })}
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {t({
                  en: "Most heads. A 3B canopy over a 4A nape, a 2C crown over a 3A side. The Map step exists because of this.",
                  no: "De fleste hoder. Et 3B-topplag over en 4A-nakke, en 2C-krone over en 3A-side. Kartlegging-trinnet finnes på grunn av dette.",
                })}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────── WHY DRY ───────────────── */}
      <section className="border-t border-line">
        <Container width="wide" className="py-24 md:py-32">
          <div className="grid grid-cols-12 gap-6 md:gap-10">
            <p className="col-span-12 md:col-span-2 font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
              {t({ en: "Why dry", no: "Hvorfor tørr" })}
            </p>
            <div className="col-span-12 md:col-span-10">
              <h2 className="font-display text-[clamp(40px,6.4vw,96px)] tracking-display leading-[0.95] text-ink">
                {t({
                  en: (
                    <>
                      Wet hair is a{" "}
                      <span className="italic text-terracotta-deep">different shape</span>{" "}
                      than your hair.
                    </>
                  ) as unknown as string,
                  no: (
                    <>
                      Vått hår er en{" "}
                      <span className="italic text-terracotta-deep">annen form</span>{" "}
                      enn håret ditt.
                    </>
                  ) as unknown as string,
                }) as unknown as React.ReactNode}
              </h2>
              <div className="mt-10 grid sm:grid-cols-2 gap-10 md:gap-14">
                <p className="max-w-prose text-[16px] md:text-[17px] leading-relaxed text-ink-soft">
                  {t({
                    en: "A Type 4 coil cut wet, under tension, comes back at half the length when it dries. A Type 2 wave cut wet, brushed straight, comes back too short on the canopy and unbalanced through the nape. The hair returns to its pattern; the cut should have been built for that pattern in the first place.",
                    no: "En Type 4-coil klippet våt, under spenning, kommer tilbake på halve lengden når den tørker. En Type 2-bølge klippet våt og børstet rett, kommer tilbake for kort i topplaget og ujevn i nakken. Håret går tilbake til sitt mønster; klippen skulle vært bygget for det mønsteret fra starten.",
                  })}
                </p>
                <p className="max-w-prose text-[16px] md:text-[17px] leading-relaxed text-ink-soft">
                  {t({
                    en: "Dry-cutting is slower, harder, and the reason most stylists don't offer it. It is also the only way to cut for a curl pattern instead of against one. We learned it at Curl Bar, refined it at Devachan and Hair Rules, and we don't deviate from it.",
                    no: "Tørr klipping er tregere, vanskeligere, og grunnen til at de fleste stylister ikke tilbyr det. Det er også den eneste måten å klippe for et krøllmønster på, istedenfor mot det. Vi lærte det på Curl Bar, raffinerte det på Devachan og Hair Rules, og vi avviker ikke fra det.",
                  })}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────── SCULPT CUT NOTE ───────────────── */}
      <section className="border-t border-line bg-cream-deep">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <p className="col-span-12 md:col-span-3 font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
              {t({ en: "For men", no: "For menn" })}
            </p>
            <h2 className="col-span-12 md:col-span-9 font-display text-[clamp(36px,5.6vw,80px)] tracking-display leading-[0.95] text-ink">
              {t({
                en: "Same five steps. Sharper edges.",
                no: "Samme fem trinn. Skarpere kanter.",
              })}
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-12 gap-6 md:gap-10">
            <div className="col-span-12 md:col-span-6 md:col-start-4 max-w-prose">
              <p className="text-[16px] md:text-[17px] leading-relaxed text-ink-soft">
                {t({
                  en: "The Sculpt Cut takes the same assessment, the same zone map, the same dry curl-by-curl work on top — and brings clipper precision in for the fade and lineup. One chair. One appointment. The fade and the coils are not two separate skills handed to two separate people. That is the entire point.",
                  no: "The Sculpt Cut tar samme vurdering, samme sonekart, samme tørre krølle-for-krølle-arbeid på toppen — og legger til maskinpresisjon for fade og lineup. Én stol. Én time. Fade og krøller er ikke to ulike ferdigheter levert til to ulike personer. Det er hele poenget.",
                })}
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {[
                  { en: "Sculpt", no: "Sculpt" },
                  { en: "Taper", no: "Taper" },
                  { en: "Definition", no: "Definisjon" },
                  { en: "Line", no: "Linje" },
                  { en: "Edge", no: "Kant" },
                ].map((tag, i) => (
                  <li
                    key={i}
                    className="px-3 py-1.5 border border-ink/30 text-[10.5px] font-mono tracking-[0.22em] uppercase text-ink"
                  >
                    {t(tag)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ───────────────── CLOSING CTA ───────────────── */}
      <section className="bg-ink text-cream">
        <Container width="wide" className="py-24 md:py-32">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
            <h2 className="col-span-12 md:col-span-8 font-display text-[clamp(48px,9vw,148px)] tracking-display leading-[0.92] text-cream">
              {t({
                en: (
                  <>
                    Now book{" "}
                    <span className="text-terracotta-soft">the cut.</span>
                  </>
                ) as unknown as string,
                no: (
                  <>
                    Nå er det på tide å{" "}
                    <span className="text-terracotta-soft">book.</span>
                  </>
                ) as unknown as string,
              }) as unknown as React.ReactNode}
            </h2>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-3">
              <Link
                href="/booking?service=the-jackson-cut"
                className="inline-flex h-14 px-8 items-center justify-between bg-cream text-ink text-[14px] tracking-wide hover:bg-terracotta hover:text-cream transition-colors"
              >
                <span>
                  {t({
                    en: "Book the Jackson Cut",
                    no: "Book the Jackson Cut",
                  })}
                </span>
                <span aria-hidden className="font-mono">→</span>
              </Link>
              <Link
                href="/booking?service=the-sculpt-cut"
                className="inline-flex h-14 px-8 items-center justify-between border border-cream/60 text-cream text-[14px] tracking-wide hover:bg-cream hover:text-ink transition-colors"
              >
                <span>
                  {t({
                    en: "Book the Sculpt Cut",
                    no: "Book the Sculpt Cut",
                  })}
                </span>
                <span aria-hidden className="font-mono">→</span>
              </Link>
              <Link
                href="/booking?service=consultation"
                className="mt-2 text-[13px] text-cream/70 hover:text-terracotta-soft transition-colors underline underline-offset-4 decoration-cream/20"
              >
                {t({
                  en: "Or talk first — free 15-min consult →",
                  no: "Eller prat først — gratis 15-min konsultasjon →",
                })}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
