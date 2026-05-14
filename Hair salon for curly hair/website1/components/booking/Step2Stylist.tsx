"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import {
  bookingStylists,
  TAG_LABELS,
  type StylistTag,
  type StylistBookingEntry,
} from "@/lib/booking/stylists";
import { images } from "@/lib/content/images";
import { cn } from "@/lib/cn";

type Props = {
  selected?: string;
  onSelect: (slug: string) => void;
};

const FILTER_TAGS: StylistTag[] = [
  "type-4-specialist",
  "mens-fade-coils",
  "color",
  "wavy-loose",
  "locs",
];

export function Step2Stylist({ selected, onSelect }: Props) {
  const { t } = useLang();
  const [activeTag, setActiveTag] = useState<StylistTag | null>(null);

  const filtered = useMemo<StylistBookingEntry[]>(() => {
    if (!activeTag) return bookingStylists;
    return bookingStylists.filter((s) => s.tags.includes(activeTag));
  }, [activeTag]);

  const noPrefSelected = selected === "no-preference";

  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
          {t({ en: "02 — Stylist", no: "02 — Stylist" })}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-display leading-[1.05] max-w-2xl">
          {t({
            en: "Pick a stylist, or let us pair you.",
            no: "Velg stylist, eller la oss matche deg.",
          })}
        </h2>
        <p className="mt-3 text-ink-soft max-w-xl text-[15px] leading-snug">
          {t({
            en: "Every stylist trained for textured hair specifically. No preference is never a downgrade.",
            no: "Hver stylist er utdannet spesifikt for krøllete hår. Ingen preferanse er aldri et dårligere valg.",
          })}
        </p>
      </header>

      {/* No-preference card — top, never penalized */}
      <button
        type="button"
        onClick={() => onSelect("no-preference")}
        aria-pressed={noPrefSelected}
        className={cn(
          "w-full text-left p-5 sm:p-6 border mb-6 transition-colors",
          noPrefSelected
            ? "bg-bookgreen text-cream border-bookgreen"
            : "bg-cream-deep/60 border-line hover:border-ink",
        )}
      >
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg sm:text-2xl tracking-tight leading-tight [overflow-wrap:anywhere]">
              {t({ en: "No preference", no: "Ingen preferanse" })}
            </h3>
            <p
              className={cn(
                "mt-2 text-[13px] sm:text-[15px] leading-snug max-w-xl [overflow-wrap:anywhere]",
                noPrefSelected ? "text-cream/85" : "text-ink-soft",
              )}
            >
              {t({
                en: "We'll pair you with the best fit for your hair, no penalty in availability.",
                no: "Vi matcher deg med den som passer håret ditt best, ingen ekstra ventetid.",
              })}
            </p>
          </div>
          <p
            className={cn(
              "font-mono text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase shrink-0 mt-1",
              noPrefSelected ? "text-cream/70" : "text-ink-muted",
            )}
          >
            {t({ en: "Recommended", no: "Anbefalt" })}
          </p>
        </div>
      </button>

      {/* Filter chips */}
      <div className="mb-5">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-3">
          {t({ en: "Filter", no: "Filtrer" })}
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={cn(
              "h-9 px-4 text-[12px] tracking-wide font-mono uppercase border transition-colors",
              activeTag === null
                ? "bg-ink text-cream border-ink"
                : "bg-transparent text-ink-soft border-line hover:border-ink hover:text-ink",
            )}
          >
            {t({ en: "All", no: "Alle" })}
          </button>
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={cn(
                "h-9 px-4 text-[12px] tracking-wide font-mono uppercase border transition-colors",
                activeTag === tag
                  ? "bg-ink text-cream border-ink"
                  : "bg-transparent text-ink-soft border-line hover:border-ink hover:text-ink",
              )}
            >
              {t(TAG_LABELS[tag])}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {filtered.map((s) => (
          <StylistCard
            key={s.slug}
            stylist={s}
            selected={selected === s.slug}
            onSelect={() => onSelect(s.slug)}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-ink-muted text-[14px] mt-4">
          {t({
            en: "No stylists match that filter — clear it to see everyone.",
            no: "Ingen stylister i dette filteret — fjern filteret for å se alle.",
          })}
        </p>
      )}
    </div>
  );
}

function StylistCard({
  stylist,
  selected,
  onSelect,
}: {
  stylist: StylistBookingEntry;
  selected: boolean;
  onSelect: () => void;
}) {
  const { t } = useLang();

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "text-left p-5 sm:p-6 border transition-colors h-full",
        selected
          ? "bg-bookgreen text-cream border-bookgreen"
          : "bg-cream-deep/60 border-line hover:border-ink",
      )}
    >
      <div className="flex gap-4 items-start">
        <div
          className={cn(
            "w-14 h-14 sm:w-16 sm:h-16 shrink-0 relative overflow-hidden",
            selected ? "ring-2 ring-cream/30" : "",
          )}
        >
          <Image
            src={`/images/${images[stylist.image].file}`}
            alt={images[stylist.image].alt}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-base sm:text-xl tracking-tight leading-tight [overflow-wrap:anywhere]">
            {stylist.name}
          </h3>
          <p
            className={cn(
              "text-[12px] tracking-wide mt-0.5",
              selected ? "text-cream/70" : "text-ink-muted",
            )}
          >
            {t(stylist.role)}
          </p>
          <p
            className={cn(
              "mt-3 text-[13px] leading-snug",
              selected ? "text-cream/90" : "text-ink-soft",
            )}
          >
            {t(stylist.shortSpecialty)}
          </p>
          <p
            className={cn(
              "mt-3 text-[12px] leading-snug",
              selected ? "text-cream/70" : "text-ink-muted",
            )}
          >
            {t(stylist.training)}
          </p>
        </div>
      </div>
    </button>
  );
}
