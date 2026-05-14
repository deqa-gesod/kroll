"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { CaretDown, FunnelSimple, X } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useCopy, useLanguage } from "@/components/language-provider";
import { ProductCard } from "@/components/shop/ProductCard";
import { images } from "@/lib/content";
import { shopProducts } from "@/lib/shop-catalogue";
import type {
  ShopCategory,
  ShopPorosity,
  ShopProduct,
} from "@/lib/shop-types";

type Locale = "en" | "no";
type SortKey =
  | "recommended"
  | "bestselling"
  | "alpha"
  | "priceAsc"
  | "priceDesc";

const PAGE_SIZE = 12;

const CATEGORY_OPTIONS: ShopCategory[] = [
  "shampoo",
  "conditioner",
  "leave-in",
  "deep-treatment",
  "treatment",
  "styler",
  "oil",
  "tool",
  "accessory",
];

const HAIR_TYPE_OPTIONS = [
  "2A",
  "2B",
  "2C",
  "3A",
  "3B",
  "3C",
  "4A",
  "4B",
  "4C",
];

const POROSITY_OPTIONS: ShopPorosity[] = ["low", "medium", "high"];

const CONDITION_OPTIONS = [
  "dry",
  "damaged",
  "color-treated",
  "fine",
  "thick",
  "frizzy",
];

const PRICE_FLOOR = 0;
const PRICE_CEILING = 1500;

function pick(locale: Locale, en: string, no: string) {
  return locale === "no" ? no : en;
}

function categoryLabel(c: ShopCategory, locale: Locale): string {
  const map: Record<ShopCategory, [string, string]> = {
    shampoo: ["Shampoo", "Sjampo"],
    conditioner: ["Conditioner", "Balsam"],
    "leave-in": ["Leave-in", "Leave-in"],
    "deep-treatment": ["Deep treatment", "Dypbehandling"],
    treatment: ["Treatment", "Behandling"],
    styler: ["Styler", "Styling"],
    oil: ["Oil", "Olje"],
    tool: ["Tool", "Verktøy"],
    accessory: ["Accessory", "Tilbehør"],
  };
  return map[c][locale === "no" ? 1 : 0];
}

function porosityLabel(p: ShopPorosity, locale: Locale): string {
  const map: Record<ShopPorosity, [string, string]> = {
    low: ["Low", "Lav"],
    medium: ["Medium", "Medium"],
    high: ["High", "Høy"],
  };
  return map[p][locale === "no" ? 1 : 0];
}

function conditionLabel(c: string, locale: Locale): string {
  const map: Record<string, [string, string]> = {
    dry: ["Dry", "Tørt"],
    damaged: ["Damaged", "Skadet"],
    "color-treated": ["Color-treated", "Farget"],
    fine: ["Fine", "Fint"],
    thick: ["Thick", "Tykt"],
    frizzy: ["Frizzy", "Krusete"],
  };
  return map[c]?.[locale === "no" ? 1 : 0] ?? c;
}

function sortLabel(key: SortKey, locale: Locale): string {
  const map: Record<SortKey, [string, string]> = {
    recommended: ["Recommended", "Anbefalt"],
    bestselling: ["Bestselling", "Mest solgt"],
    alpha: ["A to Z", "A til Å"],
    priceAsc: ["Price low to high", "Lavest pris"],
    priceDesc: ["Price high to low", "Høyest pris"],
  };
  return map[key][locale === "no" ? 1 : 0];
}

function PageHeroShop() {
  const copy = useCopy();
  return (
    <section className="relative overflow-hidden border-b border-ink/10">
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-24">
        <ScrollReveal className="self-center">
          <p className="eyebrow text-clay">{copy.shopPage.eyebrow}</p>
          <h1 className="mt-5 max-w-5xl font-display text-6xl font-semibold leading-[0.9] tracking-[-0.065em] sm:text-8xl lg:text-9xl">
            {copy.shopPage.title}
          </h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-ink/70">
            {copy.shopPage.lead}
          </p>
        </ScrollReveal>
        <ScrollReveal
          direction="right"
          className="relative min-h-[460px] overflow-hidden bg-ink lg:min-h-[620px]"
        >
          <Image
            src={images.shop}
            alt="Jackson and Coil retail shelf"
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 92vw"
            className="object-cover"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}

type Filters = {
  categories: Set<ShopCategory>;
  hairTypes: Set<string>;
  porosity: Set<ShopPorosity>;
  conditions: Set<string>;
  priceMin: number;
  priceMax: number;
};

function emptyFilters(): Filters {
  return {
    categories: new Set(),
    hairTypes: new Set(),
    porosity: new Set(),
    conditions: new Set(),
    priceMin: PRICE_FLOOR,
    priceMax: PRICE_CEILING,
  };
}

function activeFilterCount(f: Filters): number {
  let n =
    f.categories.size + f.hairTypes.size + f.porosity.size + f.conditions.size;
  if (f.priceMin !== PRICE_FLOOR || f.priceMax !== PRICE_CEILING) n += 1;
  return n;
}

function matchesFilters(p: ShopProduct, f: Filters): boolean {
  if (f.categories.size > 0 && !f.categories.has(p.category)) return false;
  if (f.hairTypes.size > 0) {
    const hit = p.hairTypes.some((t) => f.hairTypes.has(t));
    if (!hit) return false;
  }
  if (f.porosity.size > 0) {
    const hit = p.porosity.some((t) => f.porosity.has(t));
    if (!hit) return false;
  }
  if (f.conditions.size > 0) {
    const hit = p.conditions.some((c) => f.conditions.has(c));
    if (!hit) return false;
  }
  if (p.price < f.priceMin || p.price > f.priceMax) return false;
  return true;
}

function sortProducts(list: ShopProduct[], key: SortKey): ShopProduct[] {
  const copy = [...list];
  switch (key) {
    case "bestselling":
      copy.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "alpha":
      copy.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "priceAsc":
      copy.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      copy.sort((a, b) => b.price - a.price);
      break;
    case "recommended":
    default:
      copy.sort((a, b) => {
        const aPick = a.stylistPick ? 1 : 0;
        const bPick = b.stylistPick ? 1 : 0;
        if (aPick !== bPick) return bPick - aPick;
        const aBest = a.bestseller ? 1 : 0;
        const bBest = b.bestseller ? 1 : 0;
        if (aBest !== bBest) return bBest - aBest;
        return b.rating - a.rating;
      });
      break;
  }
  return copy;
}

function ChipToggle({
  label,
  active,
  onToggle,
  testId,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
  testId?: string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      data-testid={testId}
      className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] transition ${
        active
          ? "border-clay bg-clay text-paper"
          : "border-ink/15 text-ink/70 hover:border-ink hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}

function CheckboxRow({
  label,
  active,
  onToggle,
  testId,
}: {
  label: string;
  active: boolean;
  onToggle: () => void;
  testId?: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1.5 text-sm text-ink/80 hover:text-ink">
      <input
        type="checkbox"
        checked={active}
        onChange={onToggle}
        data-testid={testId}
        className="h-4 w-4 accent-clay"
      />
      <span>{label}</span>
    </label>
  );
}

function FilterPanel({
  filters,
  setFilters,
  locale,
  onClear,
}: {
  filters: Filters;
  setFilters: (next: Filters) => void;
  locale: Locale;
  onClear: () => void;
}) {
  function toggleCategory(c: ShopCategory) {
    const next = new Set(filters.categories);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    setFilters({ ...filters, categories: next });
  }
  function toggleHairType(t: string) {
    const next = new Set(filters.hairTypes);
    if (next.has(t)) next.delete(t);
    else next.add(t);
    setFilters({ ...filters, hairTypes: next });
  }
  function togglePorosity(p: ShopPorosity) {
    const next = new Set(filters.porosity);
    if (next.has(p)) next.delete(p);
    else next.add(p);
    setFilters({ ...filters, porosity: next });
  }
  function toggleCondition(c: string) {
    const next = new Set(filters.conditions);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    setFilters({ ...filters, conditions: next });
  }

  const sectionTitle = (en: string, no: string) => (
    <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
      {pick(locale, en, no)}
    </h3>
  );

  return (
    <div className="space-y-7">
      <div>
        {sectionTitle("Category", "Kategori")}
        <div className="mt-3 space-y-0.5">
          {CATEGORY_OPTIONS.map((c) => (
            <CheckboxRow
              key={c}
              label={categoryLabel(c, locale)}
              active={filters.categories.has(c)}
              onToggle={() => toggleCategory(c)}
              testId={`filter-category-${c}`}
            />
          ))}
        </div>
      </div>

      <div>
        {sectionTitle("Hair type", "Hårtype")}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {HAIR_TYPE_OPTIONS.map((t) => (
            <ChipToggle
              key={t}
              label={t}
              active={filters.hairTypes.has(t)}
              onToggle={() => toggleHairType(t)}
              testId={`filter-hairtype-${t}`}
            />
          ))}
        </div>
      </div>

      <div>
        {sectionTitle("Porosity", "Porositet")}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {POROSITY_OPTIONS.map((p) => (
            <ChipToggle
              key={p}
              label={porosityLabel(p, locale)}
              active={filters.porosity.has(p)}
              onToggle={() => togglePorosity(p)}
              testId={`filter-porosity-${p}`}
            />
          ))}
        </div>
      </div>

      <div>
        {sectionTitle("Hair condition", "Hårtilstand")}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {CONDITION_OPTIONS.map((c) => (
            <ChipToggle
              key={c}
              label={conditionLabel(c, locale)}
              active={filters.conditions.has(c)}
              onToggle={() => toggleCondition(c)}
              testId={`filter-condition-${c}`}
            />
          ))}
        </div>
      </div>

      <div>
        {sectionTitle("Price (NOK)", "Pris (NOK)")}
        <div className="mt-3 space-y-3">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={PRICE_FLOOR}
              max={filters.priceMax}
              value={filters.priceMin}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceMin: Math.max(
                    PRICE_FLOOR,
                    Math.min(filters.priceMax, Number(e.target.value) || 0),
                  ),
                })
              }
              className="w-full border border-ink/15 bg-paper px-2 py-1.5 font-mono text-xs text-ink"
              aria-label={pick(locale, "Minimum price", "Minste pris")}
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/40">
              {pick(locale, "to", "til")}
            </span>
            <input
              type="number"
              min={filters.priceMin}
              max={PRICE_CEILING}
              value={filters.priceMax}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priceMax: Math.min(
                    PRICE_CEILING,
                    Math.max(filters.priceMin, Number(e.target.value) || 0),
                  ),
                })
              }
              className="w-full border border-ink/15 bg-paper px-2 py-1.5 font-mono text-xs text-ink"
              aria-label={pick(locale, "Maximum price", "Største pris")}
            />
          </div>
          <input
            type="range"
            min={PRICE_FLOOR}
            max={PRICE_CEILING}
            step={10}
            value={filters.priceMax}
            onChange={(e) =>
              setFilters({
                ...filters,
                priceMax: Number(e.target.value),
              })
            }
            className="w-full accent-clay"
            aria-label={pick(locale, "Maximum price slider", "Pris-slider")}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        data-testid="filter-clear"
        className="w-full border border-ink/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 hover:border-ink hover:text-ink"
      >
        {pick(locale, "Clear filters", "Tøm filter")}
      </button>
    </div>
  );
}

function Paginator({
  page,
  pageCount,
  onChange,
  locale,
}: {
  page: number;
  pageCount: number;
  onChange: (next: number) => void;
  locale: Locale;
}) {
  if (pageCount <= 1) return null;

  const pages: number[] = [];
  for (let i = 1; i <= pageCount; i++) pages.push(i);

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-center gap-2"
      aria-label={pick(locale, "Pagination", "Paginering")}
      data-testid="paginator"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="border border-ink/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 hover:border-ink hover:text-ink disabled:opacity-40"
        data-testid="paginator-prev"
      >
        {pick(locale, "Prev", "Forrige")}
      </button>
      {pages.map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-current={n === page ? "page" : undefined}
          data-testid={`paginator-page-${n}`}
          className={`min-w-10 border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] ${
            n === page
              ? "border-clay bg-clay text-paper"
              : "border-ink/15 text-ink/70 hover:border-ink hover:text-ink"
          }`}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        className="border border-ink/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 hover:border-ink hover:text-ink disabled:opacity-40"
        data-testid="paginator-next"
      >
        {pick(locale, "Next", "Neste")}
      </button>
    </nav>
  );
}

export function ShopExperience() {
  const { locale } = useLanguage();
  const [filters, setFiltersState] = useState<Filters>(emptyFilters);
  const [sortKey, setSortKey] = useState<SortKey>("recommended");
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const setFilters = (next: Filters) => {
    setFiltersState(next);
    setPage(1);
  };

  const clearFilters = () => {
    setFiltersState(emptyFilters());
    setPage(1);
  };

  const filtered = useMemo(() => {
    return shopProducts.filter((p) => matchesFilters(p, filters));
  }, [filters]);

  const sorted = useMemo(() => sortProducts(filtered, sortKey), [filtered, sortKey]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const safePage = Math.min(page, pageCount);
  const visible = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, safePage]);

  useEffect(() => {
    if (mobileFilterOpen) {
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = "hidden";
      return () => {
        document.documentElement.style.overflow = prev;
      };
    }
  }, [mobileFilterOpen]);

  const activeCount = activeFilterCount(filters);
  const countLabel =
    sorted.length === 1
      ? pick(locale, "1 product", "1 produkt")
      : pick(locale, `${sorted.length} products`, `${sorted.length} produkter`);

  return (
    <>
      <PageHeroShop />
      <section className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-24 border border-ink/12 bg-paper p-6">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                locale={locale}
                onClear={clearFilters}
              />
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/12 pb-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="inline-flex items-center gap-2 border border-ink/15 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/70 hover:border-ink hover:text-ink lg:hidden"
                  data-testid="filter-open-mobile"
                >
                  <FunnelSimple size={14} />
                  {pick(locale, "Filter", "Filter")}
                  {activeCount > 0 ? (
                    <span className="ml-1 inline-grid h-5 min-w-5 place-items-center bg-clay px-1 text-paper">
                      {activeCount}
                    </span>
                  ) : null}
                </button>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60"
                  data-testid="product-count"
                >
                  {countLabel}
                </p>
              </div>
              <label className="flex items-center gap-2 text-sm text-ink/70">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55">
                  {pick(locale, "Sort", "Sorter")}
                </span>
                <span className="relative">
                  <select
                    value={sortKey}
                    onChange={(e) => {
                      setSortKey(e.target.value as SortKey);
                      setPage(1);
                    }}
                    data-testid="sort-select"
                    className="appearance-none border border-ink/15 bg-paper px-3 py-2 pr-8 font-mono text-[10px] uppercase tracking-[0.18em] text-ink hover:border-ink"
                  >
                    {(
                      [
                        "recommended",
                        "bestselling",
                        "alpha",
                        "priceAsc",
                        "priceDesc",
                      ] as SortKey[]
                    ).map((k) => (
                      <option key={k} value={k}>
                        {sortLabel(k, locale)}
                      </option>
                    ))}
                  </select>
                  <CaretDown
                    size={12}
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ink/50"
                  />
                </span>
              </label>
            </div>

            {visible.length === 0 ? (
              <div
                className="mt-12 border border-dashed border-ink/15 p-12 text-center"
                data-testid="empty-state"
              >
                <p className="font-display text-3xl tracking-[-0.04em]">
                  {pick(
                    locale,
                    "No products match your filters.",
                    "Ingen produkter matcher filtrene dine.",
                  )}
                </p>
                <p className="mt-3 text-sm text-ink/60">
                  {pick(
                    locale,
                    "Try removing a category or widening the price range.",
                    "Prøv å fjerne en kategori eller utvide pris-spennet.",
                  )}
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="btn btn-secondary mt-6"
                >
                  {pick(locale, "Clear filters", "Tøm filter")}
                </button>
              </div>
            ) : (
              <div
                className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                data-testid="product-grid"
              >
                {visible.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <Paginator
              page={safePage}
              pageCount={pageCount}
              onChange={(n) => setPage(n)}
              locale={locale}
            />
          </div>
        </div>
      </section>

      {mobileFilterOpen ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[88vw] max-w-md overflow-y-auto bg-paper p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/12 pb-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                {pick(locale, "Filter", "Filter")}
              </p>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                aria-label={pick(locale, "Close filter", "Lukk filter")}
                className="border border-ink/15 p-2"
              >
                <X size={14} />
              </button>
            </div>
            <div className="mt-6">
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                locale={locale}
                onClear={clearFilters}
              />
            </div>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="btn btn-primary mt-8 w-full"
            >
              {pick(locale, "Show results", "Vis resultater")}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
