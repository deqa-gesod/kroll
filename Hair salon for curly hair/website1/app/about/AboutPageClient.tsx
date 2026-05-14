"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/components/providers/LangProvider";
import { images } from "@/lib/content/images";

export default function AboutPage() {
  const { t } = useLang();

  return (
    <>
      {/* Opener — the founder line, set as a stage */}
      <section className="bg-cream-deep">
        <Container width="wide" className="pt-20 md:pt-28 pb-20 md:pb-28">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-10">
            {t({ en: "About — Vanessa Jackson", no: "Om — Vanessa Jackson" })}
          </p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(40px,7vw,116px)] tracking-display leading-[0.96] text-ink max-w-5xl"
          >
            {t({
              en: (
                <>
                  The salon is what happens when she <span className="text-terracotta-deep italic">stops borrowing chairs.</span>
                </>
              ) as unknown as string,
              no: (
                <>
                  Salongen er det som skjer når hun <span className="text-terracotta-deep italic">slutter å låne stoler.</span>
                </>
              ) as unknown as string,
            }) as unknown as React.ReactNode}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 max-w-2xl text-lg md:text-xl leading-snug text-ink-soft"
          >
            {t({
              en: "Jackson & Coil is the salon Vanessa Jackson spent seven years in Oslo not opening. This is how she got here, and what she promises to the chair.",
              no: "Jackson & Coil er salongen Vanessa Jackson brukte sju år i Oslo på å ikke åpne. Dette er hvordan hun kom hit, og hva hun lover stolen.",
            })}
          </motion.p>
        </Container>
      </section>

      {/* Founder portrait, full-bleed-ish */}
      <section className="bg-cream">
        <Container width="wide" className="pt-16 md:pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 1.02 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/10] w-full overflow-hidden bg-cream-deep"
          >
            <Image
              src={`/images/${images.founderPortrait.file}`}
              alt={images.founderPortrait.alt}
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover"
              priority
            />
            <div className="absolute left-0 bottom-0 p-5 md:p-7">
              <span className="bg-cream/90 backdrop-blur text-ink font-mono text-[10px] tracking-[0.2em] uppercase px-2 py-1">
                {t({ en: "Vanessa Jackson, founder", no: "Vanessa Jackson, grunnlegger" })}
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* The story — long-form editorial */}
      <section className="bg-cream">
        <Container className="pt-20 md:pt-28 pb-12 md:pb-16">
          <div className="max-w-2xl mx-auto">
            <SectionLabel>{t({ en: "Tottenham, kitchen, Saturday morning", no: "Tottenham, kjøkken, lørdag morgen" })}</SectionLabel>

            <Prose>
              <p>
                {t({
                  en: "Vanessa grew up in Tottenham, North London, the youngest daughter of Jamaican parents who ran a small Caribbean grocery on Bruce Grove. Her hair was 4a. Her grandmother did it every Saturday morning at the kitchen table — hot-comb on the gas hob, coconut oil, the smell of burned newspaper on the windowsill.",
                  no: "Vanessa vokste opp i Tottenham i Nord-London, yngste datter av jamaikanske foreldre som drev en liten karibisk dagligvare på Bruce Grove. Håret hennes var 4a. Bestemora gjorde det hver lørdag morgen ved kjøkkenbordet — varmkam på gasskomfyren, kokosolje, lukten av brent avispapir i vinduskarmen.",
                })}
              </p>
              <p>
                {t({
                  en: "By the time she was sixteen she was doing the hair of every girl in her year for ten quid and a Lucozade. By eighteen she'd worked out that the thing she'd been doing for free at kitchen tables was a craft people in actual salons hadn't bothered to learn.",
                  no: "Da hun var seksten gjorde hun håret til alle jentene i klassetrinnet for ti pund og en Lucozade. Da hun var atten hadde hun skjønt at det hun hadde gjort gratis ved kjøkkenbord var et håndverk folk i faktiske salonger ikke hadde brydd seg om å lære.",
                })}
              </p>
            </Prose>
          </div>
        </Container>

        {/* Hands inset */}
        <Container width="wide" className="pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/9] w-full max-w-5xl mx-auto overflow-hidden bg-cream-deep"
          >
            <Image
              src={`/images/${images.founderHands.file}`}
              alt={images.founderHands.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </motion.div>
        </Container>

        <Container className="pb-16 md:pb-20">
          <div className="max-w-2xl mx-auto">
            <SectionLabel>{t({ en: "London, then New York, then back", no: "London, så New York, så tilbake" })}</SectionLabel>
            <Prose>
              <p>
                {t({
                  en: "She trained formally at Curl Bar London under Michelle Sultan. Then she crossed to New York for a year — the original Devachan, then a season studying with Anthony Dickey at Hair Rules. Two of the rooms where the modern art of curl-cutting was being written.",
                  no: "Hun ble formelt utdannet ved Curl Bar London under Michelle Sultan. Så krysset hun til New York i et år — det opprinnelige Devachan, så en sesong med Anthony Dickey på Hair Rules. To av rommene der den moderne kunsten å klippe krøller ble skrevet.",
                })}
              </p>
              <p>
                {t({
                  en: "She came back to London with one clear opinion: that the binary the industry insisted on — Black hair in one shop, everything else in another — was a failure of craft, not of biology. Curl is curl. The technique is the same. The knowledge is the part you go and get.",
                  no: "Hun kom tilbake til London med én tydelig mening: at det binære skillet bransjen insisterte på — svart hår i én salong, alt annet i en annen — var en svikt i håndverket, ikke i biologien. Krøll er krøll. Teknikken er den samme. Kunnskapen er delen du går og henter.",
                })}
              </p>
            </Prose>
          </div>
        </Container>

        {/* Pull quote — the founder voice */}
        <Container className="pb-20 md:pb-28">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            <p className="font-display text-[clamp(32px,5vw,68px)] tracking-display leading-[1.05] text-ink">
              <span className="text-terracotta-deep">&ldquo;</span>
              {t({
                en: "Every curl pattern is the same job done with knowledge — and knowledge is something you go and get, not something you wait for.",
                no: "Hver krølltype er den samme jobben gjort med kunnskap — og kunnskap er noe du går og henter, ikke noe du venter på.",
              })}
              <span className="text-terracotta-deep">&rdquo;</span>
            </p>
            <footer className="mt-8 font-mono text-[12px] tracking-[0.2em] uppercase text-ink-muted">
              — {t({ en: "Vanessa Jackson", no: "Vanessa Jackson" })}
            </footer>
          </motion.blockquote>
        </Container>

        {/* Why Oslo */}
        <Container className="pb-20 md:pb-28">
          <div className="max-w-2xl mx-auto">
            <SectionLabel>{t({ en: "Why Oslo, then", no: "Hvorfor Oslo, da" })}</SectionLabel>
            <Prose>
              <p>
                {t({
                  en: "She moved here at 28 for a Norwegian boyfriend who didn't last but a city that did. For the next seven years she worked out of a borrowed chair at three different Oslo salons — quietly building a tightly-kept client list of women and men who'd otherwise have been on flights to London or Stockholm.",
                  no: "Hun flyttet hit som 28-åring for en norsk kjæreste som ikke holdt, men en by som holdt. De neste sju årene jobbet hun fra lånt stol på tre ulike Oslo-salonger — og bygde stille en tett kundeliste av kvinner og menn som ellers hadde sittet på fly til London eller Stockholm.",
                })}
              </p>
              <p>
                {t({
                  en: "What she heard in those chairs, on repeat, in three languages: that nobody in this country sees this hair properly. Not really. Not at the level the hair deserves. The choice was either get on a plane every six weeks, or accept a haircut that wasn't quite right. Most people accepted it. Some cried in the car on the way home.",
                  no: "Det hun hørte i de stolene, om og om igjen, på tre språk: at ingen her i landet ser dette håret skikkelig. Ikke egentlig. Ikke på det nivået håret fortjener. Valget var enten å ta fly hver sjette uke, eller godta en frisyre som ikke helt stemte. De fleste godtok den. Noen gråt i bilen på vei hjem.",
                })}
              </p>
              <p>
                {t({
                  en: "Jackson & Coil is the answer to that, in one room, on Markveien. The whole curl spectrum — Type 2A through 4C, women and men — done by stylists who actually trained for it. No kids' table. No referral up the road. No crying in the car.",
                  no: "Jackson & Coil er svaret, i ett rom, på Markveien. Hele krøll-spekteret — type 2A til 4C, kvinner og menn — utført av stylister som faktisk er utdannet for det. Ingen barnebord. Ingen henvising videre. Ingen som gråter i bilen.",
                })}
              </p>
            </Prose>
          </div>
        </Container>
      </section>

      {/* What we believe — three columns */}
      <section className="bg-cream-deep">
        <Container width="wide" className="py-20 md:py-28">
          <div className="max-w-3xl mb-16 md:mb-20">
            <SectionLabel>{t({ en: "What we believe", no: "Det vi tror på" })}</SectionLabel>
            <h2 className="font-display text-[clamp(32px,5vw,72px)] tracking-display leading-[0.98] text-ink">
              {t({
                en: "Three things we won't argue about.",
                no: "Tre ting vi ikke vil diskutere.",
              })}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <Belief
              n="01"
              title={t({
                en: "Every curl pattern is the same job, done with knowledge.",
                no: "Hver krølltype er den samme jobben, gjort med kunnskap.",
              })}
              body={t({
                en: "The technique is the same. The training is the difference. We trained for all of it — Type 2A loose waves through Type 4C tight coils — and we don't have a 'specialist' page for some of it and a regular page for the rest.",
                no: "Teknikken er den samme. Utdanningen er forskjellen. Vi er utdannet for alt — type 2A løse bølger til type 4C tette krøller — og vi har ingen «spesialist»-side for noen av det og vanlig side for resten.",
              })}
            />
            <Belief
              n="02"
              title={t({
                en: "We cut you for your curl, not against it.",
                no: "Vi klipper deg for krøllen din, ikke mot den.",
              })}
              body={t({
                en: "Dry. Curl by curl. On the natural pattern. Wet-cutting and tension-stretching hide what the hair is actually doing — and that's exactly the part we need to see.",
                no: "Tørt. Krølle for krølle. På det naturlige mønsteret. Vått klipp og strekking skjuler det håret faktisk gjør — og det er nøyaktig den delen vi trenger å se.",
              })}
            />
            <Belief
              n="03"
              title={t({
                en: "You leave knowing what was done and why.",
                no: "Du går herfra og vet hva som ble gjort og hvorfor.",
              })}
              body={t({
                en: "Every appointment ends with a short education — the cut, the products, the technique you can actually recreate at home on a Tuesday morning when the salon is closed. No mystery, no dependency.",
                no: "Hver time slutter med en kort gjennomgang — klippet, produktene, teknikken du faktisk kan gjenta hjemme en tirsdag morgen når salongen er stengt. Ingen mystikk, ingen avhengighet.",
              })}
            />
          </div>
        </Container>
      </section>

      {/* Salon space teaser */}
      <section className="bg-cream">
        <Container width="wide" className="py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 relative aspect-[4/3] overflow-hidden bg-cream-deep"
            >
              <Image
                src={`/images/${images.visitInterior.file}`}
                alt={images.visitInterior.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </motion.div>
            <div className="lg:col-span-5">
              <SectionLabel>{t({ en: "The room", no: "Rommet" })}</SectionLabel>
              <h2 className="font-display text-[clamp(32px,4.5vw,60px)] tracking-display leading-[1] text-ink">
                {t({
                  en: "Lean Scandinavian, warm where it counts.",
                  no: "Stramt skandinavisk, varmt der det betyr noe.",
                })}
              </h2>
              <p className="mt-6 text-lg leading-snug text-ink-soft">
                {t({
                  en: "Markveien 35. Cream walls, brass shelving, a single terracotta accent, plants, music in Vanessa's taste. Two chairs, a private styling room for clients who want one. The same playlist every visit, the same scent, the same coffee.",
                  no: "Markveien 35. Kremfargede vegger, messinghyller, én terrakotta-aksent, planter, musikk etter Vanessas smak. To stoler, et privat stylingrom for kunder som ønsker det. Samme spilleliste hver gang, samme duft, samme kaffe.",
                })}
              </p>
              <Link
                href="/visit"
                className="mt-8 inline-flex h-12 px-6 items-center border border-ink text-ink text-[14px] tracking-wide hover:bg-ink hover:text-cream transition-colors"
              >
                {t({ en: "Plan a visit", no: "Planlegg et besøk" })}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA strip */}
      <section className="bg-ink text-cream">
        <Container width="wide" className="py-20 md:py-28 text-center">
          <h2 className="font-display text-[clamp(40px,7vw,112px)] tracking-display leading-[0.95] max-w-4xl mx-auto">
            {t({
              en: (
                <>
                  Book the chair <br />
                  <span className="text-terracotta-soft italic">she stopped borrowing.</span>
                </>
              ) as unknown as string,
              no: (
                <>
                  Book stolen <br />
                  <span className="text-terracotta-soft italic">hun sluttet å låne.</span>
                </>
              ) as unknown as string,
            }) as unknown as React.ReactNode}
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/booking"
              className="inline-flex h-14 px-8 items-center bg-cream text-ink text-[14px] tracking-wide hover:bg-terracotta hover:text-cream transition-colors"
            >
              {t({ en: "Book a chair", no: "Book en stol" })}
            </Link>
            <Link
              href="/visit"
              className="inline-flex h-14 px-8 items-center border border-cream/40 text-cream text-[14px] tracking-wide hover:bg-cream hover:text-ink transition-colors"
            >
              {t({ en: "Visit the salon", no: "Besøk salongen" })}
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep mb-6">
      {children}
    </p>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-6 text-lg md:text-[19px] leading-[1.65] text-ink-soft">
      {children}
    </div>
  );
}

function Belief({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-line pt-6"
    >
      <span className="font-mono text-[11px] tracking-[0.25em] text-terracotta-deep">{n}</span>
      <h3 className="mt-4 font-display text-2xl md:text-3xl tracking-tight leading-[1.15] text-ink">
        {title}
      </h3>
      <p className="mt-5 text-base leading-relaxed text-ink-soft">{body}</p>
    </motion.div>
  );
}
