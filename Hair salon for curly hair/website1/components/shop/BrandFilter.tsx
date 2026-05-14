"use client";

import { useLang } from "@/components/providers/LangProvider";
import { cn } from "@/lib/cn";

export type BrandFilterValue = "All" | string;

type Props = {
  value: BrandFilterValue;
  onChange: (next: BrandFilterValue) => void;
  /** Brands available in the current dataset. Caller derives from products. */
  brands: ReadonlyArray<string>;
};

export function BrandFilter({ value, onChange, brands }: Props) {
  const { t } = useLang();
  const options: BrandFilterValue[] = ["All", ...brands];

  return (
    <div className="w-full">
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
        {t({ en: "Filter by brand", no: "Filtrer etter merke" })}
      </p>
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label={t({ en: "Filter by brand", no: "Filtrer etter merke" })}
      >
        {options.map((opt) => {
          const isActive = opt === value;
          const label =
            opt === "All"
              ? t({ en: "All brands", no: "Alle merker" })
              : opt;
          return (
            <button
              key={opt}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onChange(opt)}
              className={cn(
                "h-9 px-4 text-[12px] tracking-wide transition-colors border",
                isActive
                  ? "bg-terracotta text-cream border-terracotta"
                  : "bg-transparent text-ink-soft border-line hover:border-ink hover:text-ink"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
