"use client";

import { useLang } from "@/components/providers/LangProvider";
import { cn } from "@/lib/cn";

// The Andre Walker scale used across the site. Plus virtual filters that aren't
// strictly curl-types but live in the same chip row: All, Men's cuts, Color.
export const CURL_TYPES = [
  "2A",
  "2B",
  "2C",
  "3A",
  "3B",
  "3C",
  "4A",
  "4B",
  "4C",
] as const;

export type CurlType = (typeof CURL_TYPES)[number];

// "All" is the default. "Mens" and "Color" are pseudo-tags used to slice the
// gallery / shop by service or category. Items can carry these as tags too.
export type FilterValue = "All" | "Mens" | "Color" | CurlType;

export const ALL_FILTERS: FilterValue[] = [
  "All",
  ...CURL_TYPES,
  "Mens",
  "Color",
];

type Labelable = { en: string; no: string };

const FILTER_LABELS: Record<FilterValue, Labelable> = {
  All: { en: "All", no: "Alle" },
  "2A": { en: "2A", no: "2A" },
  "2B": { en: "2B", no: "2B" },
  "2C": { en: "2C", no: "2C" },
  "3A": { en: "3A", no: "3A" },
  "3B": { en: "3B", no: "3B" },
  "3C": { en: "3C", no: "3C" },
  "4A": { en: "4A", no: "4A" },
  "4B": { en: "4B", no: "4B" },
  "4C": { en: "4C", no: "4C" },
  Mens: { en: "Men's cuts", no: "Herreklipp" },
  Color: { en: "Color", no: "Farge" },
};

type Props = {
  value: FilterValue;
  onChange: (next: FilterValue) => void;
  /** Optional restriction — e.g. shop may want to hide "Color" */
  options?: FilterValue[];
  /** Optional label above the row */
  label?: Labelable;
  className?: string;
};

export function CurlTypeFilter({
  value,
  onChange,
  options = ALL_FILTERS,
  label,
  className,
}: Props) {
  const { t } = useLang();

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
          {t(label)}
        </p>
      )}
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label={t({ en: "Filter by curl type", no: "Filtrer etter krølltype" })}
      >
        {options.map((opt) => {
          const isActive = opt === value;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(opt)}
              className={cn(
                "h-9 px-4 text-[12px] tracking-wide font-mono uppercase border transition-colors",
                isActive
                  ? "bg-ink text-cream border-ink"
                  : "bg-transparent text-ink-soft border-line hover:border-ink hover:text-ink"
              )}
            >
              {t(FILTER_LABELS[opt])}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Test whether an item with one or more tags should be visible under the given
 * active filter. Items can carry curl-type tags AND/OR the pseudo-tags
 * "Mens" / "Color".
 */
export function matchesFilter(
  itemTags: ReadonlyArray<FilterValue>,
  active: FilterValue
): boolean {
  if (active === "All") return true;
  return itemTags.includes(active);
}
