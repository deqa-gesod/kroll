"use client";

import { useLang } from "@/components/providers/LangProvider";
import {
  bookingServices,
  FEATURED_SERVICE_IDS,
  REQUIRES_CONSULTATION,
} from "@/lib/booking/services";
import type { Service } from "@/lib/content/services";
import { cn } from "@/lib/cn";

type Props = {
  selected?: string;
  onSelect: (slug: string) => void;
};

export function Step1Service({ selected, onSelect }: Props) {
  const { t } = useLang();

  const featured = FEATURED_SERVICE_IDS
    .map((id) => bookingServices.find((s) => s.slug === id))
    .filter((s): s is Service => Boolean(s));
  const rest = bookingServices.filter(
    (s) => !FEATURED_SERVICE_IDS.includes(s.slug),
  );

  return (
    <div>
      <header className="mb-8 sm:mb-10">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
          {t({ en: "01 — Service", no: "01 — Tjeneste" })}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-display leading-[1.05] max-w-2xl">
          {t({
            en: "What are we doing today?",
            no: "Hva skal vi gjøre i dag?",
          })}
        </h2>
        <p className="mt-3 text-ink-soft max-w-xl text-[15px] leading-snug">
          {t({
            en: "Every price shown. The free 15-minute consultation comes bundled with every first visit, never an add-on.",
            no: "Alle priser oppgitt. Gratis 15-minutters konsultasjon følger med ved første besøk, aldri som tillegg.",
          })}
        </p>
      </header>

      {/* Featured trio */}
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-3">
        {t({ en: "Featured", no: "Mest valgt" })}
      </p>
      <div className="grid gap-3 sm:gap-4 mb-8">
        {featured.map((s) => (
          <ServiceCard
            key={s.slug}
            service={s}
            selected={selected === s.slug}
            onSelect={() => onSelect(s.slug)}
            featured
          />
        ))}
      </div>

      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-3">
        {t({ en: "Everything else", no: "Resten" })}
      </p>
      <div className="grid gap-3 sm:gap-4">
        {rest.map((s) => (
          <ServiceCard
            key={s.slug}
            service={s}
            selected={selected === s.slug}
            onSelect={() => onSelect(s.slug)}
          />
        ))}
      </div>
    </div>
  );
}

function ServiceCard({
  service,
  selected,
  onSelect,
  featured,
}: {
  service: Service;
  selected: boolean;
  onSelect: () => void;
  featured?: boolean;
}) {
  const { t } = useLang();
  const requiresConsult = REQUIRES_CONSULTATION.includes(service.slug);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "group text-left w-full p-5 sm:p-6 border transition-colors",
        selected
          ? "bg-bookgreen text-cream border-bookgreen"
          : "bg-cream-deep/60 border-line hover:border-ink",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3
            className={cn(
              "font-display text-xl sm:text-2xl tracking-tight leading-tight",
              featured && "sm:text-[28px]",
            )}
          >
            {t(service.name)}
          </h3>
          <p
            className={cn(
              "mt-2 text-[14px] sm:text-[15px] leading-snug max-w-xl",
              selected ? "text-cream/85" : "text-ink-soft",
            )}
          >
            {t(service.blurb)}
          </p>
          <p
            className={cn(
              "mt-3 text-[12px] tracking-wide",
              selected ? "text-cream/70" : "text-ink-muted",
            )}
          >
            {t(service.forWhom)}
          </p>
          {requiresConsult && (
            <p
              className={cn(
                "mt-3 text-[12px] leading-snug max-w-md",
                selected ? "text-cream/85" : "text-terracotta-deep",
              )}
            >
              {t({
                en: "Color requires a free consultation first — we'll book that in the next step.",
                no: "Farge krever en gratis konsultasjon først — den booker vi i neste steg.",
              })}
            </p>
          )}
        </div>
        <div className="text-right shrink-0">
          <p className="font-mono text-[15px] sm:text-[16px] leading-none">
            {t(service.price)}
          </p>
          <p
            className={cn(
              "mt-2 font-mono text-[12px] tracking-wide",
              selected ? "text-cream/70" : "text-ink-muted",
            )}
          >
            {t(service.duration)}
          </p>
        </div>
      </div>
      {service.priceNote && (
        <p
          className={cn(
            "mt-4 text-[12px] leading-snug border-t pt-3 max-w-xl",
            selected ? "border-cream/20 text-cream/70" : "border-line text-ink-muted",
          )}
        >
          {t(service.priceNote)}
        </p>
      )}
    </button>
  );
}
