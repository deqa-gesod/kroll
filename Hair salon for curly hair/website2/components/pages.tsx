"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, MapPin, Scissors } from "@phosphor-icons/react";
import { useState, type ReactNode } from "react";
import { BookingFlow } from "@/components/booking-flow";
import { ScrollReveal } from "@/components/scroll-reveal";
import { curlTypes, images } from "@/lib/content";
import { useCopy, useLanguage } from "@/components/language-provider";
import { AddToBagButton } from "@/components/shop/AddToBagButton";
import { realProducts, type RealProduct } from "@/lib/shop-products";

type ServiceText = Record<string, readonly [string, string]>;
type StylistText = Record<string, readonly [string, string]>;

export function HomePage() {
  const copy = useCopy();
  const serviceText = copy.serviceNames as ServiceText;

  return (
    <>
      <section className="relative overflow-hidden border-b border-ink/10">
        <div className="hairline-grid absolute inset-0 opacity-55" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-[1440px] items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:px-8 lg:py-18">
          <ScrollReveal>
            <p className="eyebrow text-clay">{copy.home.eyebrow}</p>
            <h1 className="mt-5 max-w-6xl font-display text-[clamp(3.5rem,7.5vw,7.25rem)] font-semibold leading-[0.88] tracking-[-0.065em] text-ink">
              {copy.home.title}
            </h1>
            <p className="mt-7 max-w-2xl text-xl leading-8 text-ink/70 sm:text-2xl sm:leading-9">
              {copy.home.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/booking" className="btn btn-primary">
                {copy.common.bookNow}
                <ArrowRight size={18} />
              </Link>
              <Link href="/cuts-and-services" className="btn btn-secondary">
                {copy.common.viewServices}
              </Link>
            </div>
            <div className="mt-9 grid gap-2 sm:grid-cols-3">
              {copy.home.proof.map((item) => (
                <div key={item} className="border border-ink/12 bg-paper/75 p-4 font-mono text-xs uppercase tracking-[0.12em] text-ink/70">
                  {item}
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} direction="right" className="relative min-h-[620px]">
            <div className="absolute right-0 top-0 h-[76%] w-[74%] overflow-hidden bg-ink">
              <Image
                src={images.heroAmara}
                alt="Black woman with Type 4 coils laughing in a salon chair during a dry cut"
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 92vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-0 left-0 h-[42%] w-[52%] overflow-hidden border-[10px] border-paper bg-ink shadow-2xl shadow-ink/15">
              <Image
                src={images.heroDaniel}
                alt="Black man with fade and defined Type 4 coils in warm documentary light"
                fill
                priority
                sizes="(min-width: 1024px) 30vw, 58vw"
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <TextMarquee text={copy.home.band} />

      <section className="mx-auto grid max-w-[1440px] gap-5 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
        <ScrollReveal className="bg-ink p-8 text-paper lg:p-12">
          <p className="eyebrow text-paper/48">Booking</p>
          <h2 className="mt-4 font-display text-5xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-7xl">
            {copy.home.bookingTitle}
          </h2>
          <p className="mt-6 text-lg leading-8 text-paper/70">{copy.home.bookingBody}</p>
          <Link href="/booking" className="btn mt-8 bg-paper text-ink hover:bg-clay hover:text-paper">
            {copy.common.bookNow}
          </Link>
        </ScrollReveal>
        <div className="grid gap-5 md:grid-cols-3">
          {copy.services
            .filter((service) => service.featured)
            .map((service, index) => {
              const text = serviceText[service.id];
              return (
                <ScrollReveal key={service.id} delay={index * 0.05} className="border border-ink/12 bg-paper-deep/65 p-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-clay">0{index + 1}</span>
                  <h3 className="mt-5 font-display text-4xl font-semibold leading-none tracking-[-0.05em]">{text[0]}</h3>
                  <p className="mt-4 min-h-24 text-sm leading-6 text-ink/66">{text[1]}</p>
                  <div className="mt-6 border-t border-ink/12 pt-4 font-mono text-xs uppercase tracking-[0.12em] text-ink/62">
                    {service.time} / {service.price}
                  </div>
                </ScrollReveal>
              );
            })}
        </div>
      </section>

      <SplitFeature
        eyebrow={copy.labels.method}
        title={copy.home.methodTitle}
        body={copy.home.methodBody}
        image={images.method}
        alt="Close detail of dry curl-by-curl cutting on Type 4 hair"
        href="/the-method"
        cta={copy.common.readMethod}
      />

      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.85fr] lg:px-8 lg:py-24">
        <ScrollReveal className="relative min-h-[560px] overflow-hidden bg-ink">
          <Image src={images.founder} alt="Vanessa Jackson working with a client, hands in hair, mid-laugh" fill sizes="(min-width: 1024px) 52vw, 92vw" className="object-cover" />
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="self-center">
          <p className="eyebrow text-clay">{copy.labels.founder}</p>
          <h2 className="mt-4 font-display text-6xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-8xl">
            {copy.home.founderTitle}
          </h2>
          <p className="mt-6 text-lg leading-8 text-ink/70">{copy.home.founderBody}</p>
          <Link href="/about" className="btn btn-secondary mt-8">
            {copy.nav.about}
          </Link>
        </ScrollReveal>
      </section>

      <PortfolioPreview />
      <TestimonialMarquee />

      <SplitFeature
        eyebrow={copy.nav.visit}
        title={copy.home.visitTitle}
        body={copy.home.visitBody}
        image={images.visit}
        alt="Lean warm Scandinavian salon interior with terracotta accents"
        href="/visit"
        cta={copy.footer.visit}
        reverse
      />
    </>
  );
}

export function CutsAndServicesPage() {
  const copy = useCopy();
  const serviceText = copy.serviceNames as ServiceText;

  return (
    <>
      <PageHero eyebrow={copy.servicesPage.eyebrow} title={copy.servicesPage.title} lead={copy.servicesPage.lead} image={images.heroAmara} />
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-4 lg:grid-cols-4">
          {copy.services.map((service) => {
            const text = serviceText[service.id];
            return (
              <ScrollReveal key={service.id} className="border border-ink/12 bg-paper p-5">
                <h2 className="font-display text-4xl font-semibold leading-none tracking-[-0.05em]">{text[0]}</h2>
                <p className="mt-4 min-h-24 text-sm leading-6 text-ink/66">{text[1]}</p>
                <dl className="mt-5 grid grid-cols-2 gap-2 border-t border-ink/10 pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink/58">
                  <div>
                    <dt>{copy.common.duration}</dt>
                    <dd className="mt-1 text-ink">{service.time}</dd>
                  </div>
                  <div>
                    <dt>{copy.common.price}</dt>
                    <dd className="mt-1 text-ink">{service.price}</dd>
                  </div>
                </dl>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
      <TwoColumnText
        leftTitle={copy.servicesPage.prepTitle}
        leftBody={copy.servicesPage.prep}
        rightTitle={copy.servicesPage.pricingTitle}
        rightBody={copy.servicesPage.pricingBody}
      />
    </>
  );
}

export function MethodPage() {
  const copy = useCopy();

  return (
    <>
      <PageHero eyebrow={copy.methodPage.eyebrow} title={copy.methodPage.title} lead={copy.methodPage.lead} image={images.method} />
      <section className="mx-auto grid max-w-[1440px] gap-4 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8 lg:py-24">
        {copy.methodPage.steps.map(([title, body], index) => (
          <ScrollReveal key={title} delay={index * 0.04} className="border border-ink/12 bg-paper-deep/60 p-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-clay">0{index + 1}</span>
            <h2 className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em]">{title}</h2>
            <p className="mt-4 text-sm leading-6 text-ink/66">{body}</p>
          </ScrollReveal>
        ))}
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:pb-28">
        <ScrollReveal>
          <p className="eyebrow text-clay">2A-4C</p>
          <h2 className="mt-4 font-display text-4xl font-semibold leading-[0.95] tracking-[-0.05em] [overflow-wrap:anywhere] sm:text-5xl lg:text-6xl">
            {copy.methodPage.diagramTitle}
          </h2>
          <p className="mt-6 text-lg leading-8 text-ink/70">{copy.methodPage.diagramBody}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
          {curlTypes.map((type) => (
            <div key={type} className="flex flex-col items-center border border-ink/12 bg-paper p-3 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full border border-ink/12 font-display text-xl font-semibold text-clay sm:h-16 sm:w-16 sm:text-2xl">
                {type}
              </div>
              <div className="mt-3 w-full border-t border-ink/12 pt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/50">
                Andre Walker
              </div>
            </div>
          ))}
        </ScrollReveal>
      </section>
    </>
  );
}

export function TeamPage() {
  const copy = useCopy();
  const stylistText = copy.stylistNames as StylistText;

  return (
    <>
      <PageHero eyebrow={copy.teamPage.eyebrow} title={copy.teamPage.title} lead={copy.teamPage.lead} image={images.founder} />
      <section className="mx-auto grid max-w-[1440px] items-stretch gap-5 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8 lg:py-24">
        {copy.stylists.slice(1).map((stylist, index) => {
          const text = stylistText[stylist.id];
          return (
            <ScrollReveal key={stylist.id} delay={index * 0.05} className="flex h-full flex-col bg-paper">
              <div className="relative aspect-[4/5] overflow-hidden bg-ink">
                <Image src={stylist.image} alt={`${text[0]}, Jackson & Coil stylist`} fill sizes="(min-width: 1024px) 25vw, 92vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col border border-t-0 border-ink/12 p-5">
                <h2 className="font-display text-4xl font-semibold tracking-[-0.05em]">{text[0]}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-ink/66">{text[1]}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stylist.tags.map((tag) => (
                    <span key={tag} className="border border-ink/12 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </section>
    </>
  );
}

export function PortfolioPage() {
  const copy = useCopy();
  const [active, setActive] = useState(0);
  const activeLabel = copy.portfolioPage.filters[active];
  const items = active === 0 ? copy.portfolio : copy.portfolio.filter((item) => item.tag === activeLabel);

  return (
    <>
      <PageHero eyebrow={copy.portfolioPage.eyebrow} title={copy.portfolioPage.title} lead={copy.portfolioPage.lead} image={images.portfolioType4} />
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-wrap gap-2">
          {copy.portfolioPage.filters.map((filter, index) => (
            <button
              type="button"
              key={filter}
              onClick={() => setActive(index)}
              className={`border px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] ${
                active === index ? "border-clay bg-clay text-paper" : "border-ink/14 text-ink/64 hover:border-ink hover:text-ink"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <ImageCard key={item.title} image={item.image} title={item.title} meta={item.tag} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}

function formatNokShort(n: number): string {
  return `${n.toLocaleString("nb-NO")} NOK`;
}

function StockBadgeWebsite2({ product, locale }: { product: RealProduct; locale: "en" | "no" }) {
  if (product.stock === "in_stock") return null;
  if (product.stock === "low_stock") {
    const label = locale === "no" ? "Bare noen få igjen" : "Only a few left";
    return (
      <span
        data-testid="stock-badge-low"
        className="absolute left-3 top-3 border border-clay bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-clay"
      >
        {label}
      </span>
    );
  }
  const label = locale === "no" ? "Utsolgt" : "Sold out";
  return (
    <span
      data-testid="stock-badge-out"
      className="absolute left-3 top-3 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper"
    >
      {label}
    </span>
  );
}

function WaitlistButtonWebsite2({ locale }: { locale: "en" | "no" }) {
  const label = locale === "no" ? "Utsolgt" : "Sold out";
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      data-testid="waitlist-button"
      onClick={() => {
        if (typeof window !== "undefined") {
          // Prototype only: a real implementation would call a waitlist API.
          // eslint-disable-next-line no-console
          console.log("waitlist click (disabled)");
        }
      }}
      className="inline-flex h-10 cursor-not-allowed items-center justify-center bg-ink/30 px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
    >
      {label}
    </button>
  );
}

export function ShopPage() {
  const copy = useCopy();
  const { locale } = useLanguage();

  return (
    <>
      <PageHero eyebrow={copy.shopPage.eyebrow} title={copy.shopPage.title} lead={copy.shopPage.lead} image={images.shop} />
      <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {realProducts.map((product, index) => {
            const cartProduct = {
              id: product.id,
              name: product.name,
              brand: product.brand,
              price: product.price,
              imageUrl: product.imageUrl,
              externalCheckoutUrl: product.externalCheckoutUrl,
            };
            const altText = `${product.brand} ${product.name}`;
            const isSoldOut = product.stock === "out_of_stock";
            return (
              <ScrollReveal
                key={product.id}
                delay={index * 0.03}
                className="flex flex-col border border-ink/12 bg-paper"
              >
                <div className={`relative aspect-[4/5] overflow-hidden bg-paper-deep ${isSoldOut ? "opacity-85" : ""}`}>
                  <Image
                    src={product.imageUrl}
                    alt={altText}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover"
                    unoptimized={product.imageUrl.endsWith(".svg")}
                  />
                  {product.stylistPick && (
                    <span className="absolute right-3 top-3 bg-clay px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper">
                      {locale === "no" ? "Stylist sin favoritt" : "Stylist pick"}
                    </span>
                  )}
                  <StockBadgeWebsite2 product={product} locale={locale} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-clay">{product.brand}</p>
                  <h2 className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-[-0.04em]">{product.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-ink/70">{product.description[locale]}</p>
                  {product.stylistPick && (
                    <p className="mt-3 text-xs italic leading-5 text-clay">
                      {product.stylistPick[locale]}
                    </p>
                  )}
                  <div className="mt-4 flex flex-wrap gap-1">
                    {product.curlTypes.map((tag) => (
                      <span
                        key={tag}
                        className="border border-ink/15 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/10 pt-4">
                    <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
                      {formatNokShort(product.price)}
                    </p>
                    {isSoldOut ? (
                      <WaitlistButtonWebsite2 locale={locale} />
                    ) : (
                      <AddToBagButton product={cartProduct} />
                    )}
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </>
  );
}

export function JournalPage() {
  const copy = useCopy();
  const journalImages = [images.method, images.shop, images.portfolioSculpt];

  return (
    <>
      <PageHero eyebrow={copy.journalPage.eyebrow} title={copy.journalPage.title} lead={copy.journalPage.lead} image={images.founder} />
      <section className="mx-auto grid max-w-[1440px] items-stretch gap-5 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-24">
        {copy.journal.map(([title, body], index) => (
          <ScrollReveal key={title} delay={index * 0.05} className="flex h-full flex-col bg-paper">
            <div className="relative aspect-[5/4] overflow-hidden bg-ink">
              <Image src={journalImages[index]} alt="Jackson & Coil journal photography" fill sizes="(min-width: 1024px) 33vw, 92vw" className="object-cover" />
            </div>
            <div className="flex flex-1 flex-col border border-t-0 border-ink/12 p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-clay">Journal 0{index + 1}</p>
              <h2 className="mt-4 min-h-[2.2em] font-display text-4xl font-semibold tracking-[-0.05em]">{title}</h2>
              <p className="mt-4 flex-1 text-sm leading-6 text-ink/66">{body}</p>
            </div>
          </ScrollReveal>
        ))}
      </section>
    </>
  );
}

export function VisitPage() {
  const copy = useCopy();

  return (
    <>
      <PageHero eyebrow={copy.visitPage.eyebrow} title={copy.visitPage.title} lead={copy.visitPage.lead} image={images.visit} />
      <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-24">
        <ScrollReveal className="border border-ink/12 bg-paper p-8">
          <MapPin size={30} className="text-clay" />
          <h2 className="mt-5 font-display text-5xl font-semibold tracking-[-0.055em]">Markveien 58</h2>
          <p className="mt-4 text-lg leading-8 text-ink/70">Grünerløkka, Oslo</p>
          <div className="mt-8 grid gap-3">
            {copy.visitPage.directions.map((item) => (
              <div key={item} className="flex gap-3 border-t border-ink/10 pt-3 text-sm leading-6 text-ink/70">
                <Check size={18} className="mt-1 shrink-0 text-clay" />
                {item}
              </div>
            ))}
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.06} className="border border-ink/12 bg-sea p-8 text-paper">
          <p className="eyebrow text-paper/46">{copy.labels.openingHours}</p>
          <div className="mt-8 space-y-5 font-display text-4xl font-semibold tracking-[-0.05em]">
            <p>Tue-Fri 10-20</p>
            <p>Sat 10-17</p>
            <p>{copy.labels.closed}</p>
          </div>
          <Link href="/booking" className="btn mt-10 bg-paper text-ink hover:bg-clay hover:text-paper">
            {copy.common.bookNow}
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}

export function AboutPage() {
  const copy = useCopy();

  return (
    <>
      <PageHero eyebrow={copy.aboutPage.eyebrow} title={copy.aboutPage.title} lead={copy.aboutPage.lead} image={images.founder} />
      <section className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
        <ScrollReveal className="border-l-2 border-clay pl-6">
          <p className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.055em]">{copy.aboutPage.belief}</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className="text-xl leading-9 text-ink/72">{copy.aboutPage.body}</p>
          <Link href="/the-team" className="btn btn-secondary mt-8">
            {copy.nav.team}
          </Link>
        </ScrollReveal>
      </section>
    </>
  );
}

export function BookingPage() {
  const copy = useCopy();

  return (
    <>
      <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <p className="eyebrow text-clay">{copy.bookingPage.eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-display text-6xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-8xl lg:text-9xl">
          {copy.bookingPage.title}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-ink/70">{copy.bookingPage.lead}</p>
      </section>
      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <BookingFlow />
      </section>
    </>
  );
}

function PageHero({ eyebrow, title, lead, image }: { eyebrow: string; title: string; lead: string; image: string }) {
  return (
    <section className="relative overflow-hidden border-b border-ink/10">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
        <ScrollReveal className="self-center">
          <p className="eyebrow text-clay">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-6xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-8xl lg:text-9xl">
            {title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-ink/70">{lead}</p>
        </ScrollReveal>
        <ScrollReveal direction="right" className="relative min-h-[460px] overflow-hidden bg-ink lg:min-h-[620px]">
          <Image src={image} alt="Jackson & Coil editorial documentary photography" fill priority sizes="(min-width: 1024px) 48vw, 92vw" className="object-cover" />
        </ScrollReveal>
      </div>
    </section>
  );
}

function SplitFeature({
  eyebrow,
  title,
  body,
  image,
  alt,
  href,
  cta,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  href: string;
  cta: string;
  reverse?: boolean;
}) {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
      <ScrollReveal className={`relative min-h-[560px] overflow-hidden bg-ink ${reverse ? "lg:order-2" : ""}`}>
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 92vw" className="object-cover" />
      </ScrollReveal>
      <ScrollReveal delay={0.08} className="self-center">
        <p className="eyebrow text-clay">{eyebrow}</p>
        <h2 className="mt-4 font-display text-6xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-8xl">
          {title}
        </h2>
        <p className="mt-6 text-lg leading-8 text-ink/70">{body}</p>
        <Link href={href} className="btn btn-secondary mt-8">
          {cta}
        </Link>
      </ScrollReveal>
    </section>
  );
}

function PortfolioPreview() {
  const copy = useCopy();

  return (
    <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <ScrollReveal className="max-w-4xl">
        <p className="eyebrow text-clay">{copy.labels.portfolio}</p>
        <h2 className="mt-4 font-display text-6xl font-semibold leading-[0.92] tracking-[-0.06em] sm:text-8xl">
          {copy.home.portfolioTitle}
        </h2>
        <p className="mt-6 text-lg leading-8 text-ink/70">{copy.home.portfolioBody}</p>
      </ScrollReveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {copy.portfolio.map((item, index) => (
          <ImageCard key={item.title} image={item.image} title={item.title} meta={item.tag} index={index} />
        ))}
      </div>
      <Link href="/portfolio" className="btn btn-primary mt-8">
        {copy.nav.portfolio}
      </Link>
    </section>
  );
}

function ImageCard({ image, title, meta, index }: { image: string; title: string; meta: string; index: number }) {
  return (
    <ScrollReveal delay={index * 0.04} className="group bg-paper">
      <div className="relative aspect-[4/5] overflow-hidden bg-ink">
        <Image src={image} alt={title} fill sizes="(min-width: 1024px) 25vw, 92vw" className="object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="border border-t-0 border-ink/12 p-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-clay">{meta}</p>
        <h3 className="mt-3 min-h-[2.4em] font-display text-3xl font-semibold leading-[1.05] tracking-[-0.045em]">{title}</h3>
      </div>
    </ScrollReveal>
  );
}

function TextMarquee({ text }: { text: string }) {
  return (
    <section className="overflow-hidden border-y border-ink/10 bg-clay py-5 text-paper" aria-label={text}>
      <div className="marquee flex w-max gap-8">
        {Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className="font-display text-5xl font-semibold leading-none tracking-[-0.055em] sm:text-7xl">
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}

function TestimonialMarquee() {
  const copy = useCopy();

  return (
    <section className="overflow-hidden bg-paper-deep py-16 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <p className="eyebrow text-clay">{copy.labels.proof}</p>
        <h2 className="mt-4 font-display text-6xl font-semibold tracking-[-0.06em]">{copy.labels.proofTitle}</h2>
      </div>
      <div className="mt-10 space-y-4">
        <MarqueeRow items={copy.home.testimonials} />
        <MarqueeRow items={[...copy.home.testimonials].reverse()} reverse />
      </div>
    </section>
  );
}

type Testimonial = { quote: string; attribution: string };

function MarqueeRow({ items, reverse }: { items: readonly Testimonial[]; reverse?: boolean }) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden">
      <div className={`${reverse ? "marquee-reverse" : "marquee"} flex w-max gap-4 px-4`}>
        {repeated.map((item, index) => (
          <figure key={`${item.quote}-${index}`} className="w-[320px] border border-ink/12 bg-paper p-5 sm:w-[420px]">
            <blockquote className="font-display text-3xl font-semibold leading-[1.02] tracking-[-0.045em]">“{item.quote}”</blockquote>
            <figcaption className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">{item.attribution}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

function TwoColumnText({ leftTitle, leftBody, rightTitle, rightBody }: { leftTitle: string; leftBody: string; rightTitle: string; rightBody: string }) {
  return (
    <section className="mx-auto grid max-w-[1440px] gap-5 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-28">
      <InfoPanel title={leftTitle} body={leftBody} icon={<Scissors size={28} />} />
      <InfoPanel title={rightTitle} body={rightBody} icon={<Check size={28} />} />
    </section>
  );
}

function InfoPanel({ title, body, icon }: { title: string; body: string; icon: ReactNode }) {
  return (
    <ScrollReveal className="border border-ink/12 bg-ink p-8 text-paper">
      <span className="grid h-12 w-12 place-items-center border border-paper/20 text-clay">{icon}</span>
      <h2 className="mt-8 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.055em]">{title}</h2>
      <p className="mt-6 text-lg leading-8 text-paper/70">{body}</p>
    </ScrollReveal>
  );
}
