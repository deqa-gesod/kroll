"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";
import {
  realProducts,
  type ShopProduct,
} from "@/lib/content/shop-products-v2";
import { AddToBagButton } from "./AddToBagButton";
import { cn } from "@/lib/cn";

type Category = ShopProduct["category"];
type Porosity = "low" | "medium" | "high";
type SortKey = "recommended" | "price-asc" | "price-desc" | "alpha" | "bestseller";

const PAGE_SIZE = 12;
const PRICE_MIN = 0;
const PRICE_MAX = 1500;

const CATEGORIES: { value: Category; label: { en: string; no: string } }[] = [
  { value: "shampoo", label: { en: "Shampoo", no: "Sjampo" } },
  { value: "conditioner", label: { en: "Conditioner", no: "Balsam" } },
  { value: "leave-in", label: { en: "Leave-in", no: "Leave-in" } },
  { value: "deep-treatment", label: { en: "Deep treatment", no: "Dypkur" } },
  { value: "styler", label: { en: "Styler", no: "Styling" } },
  { value: "oil", label: { en: "Oil", no: "Olje" } },
  { value: "tool", label: { en: "Tool", no: "Verktoy" } },
  { value: "accessory", label: { en: "Accessory", no: "Tilbehor" } },
];

const HAIR_TYPES = ["2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"];

const POROSITIES: { value: Porosity; label: { en: string; no: string } }[] = [
  { value: "low", label: { en: "Low", no: "Lav" } },
  { value: "medium", label: { en: "Medium", no: "Medium" } },
  { value: "high", label: { en: "High", no: "Hoy" } },
];

function formatNok(n: number) {
  return `${n.toLocaleString("nb-NO")} kr`;
}

function primaryImage(product: ShopProduct): string {
  return product.imageUrls?.[0] ?? "/images/shop/placeholder.svg";
}

export function ShopExperience() {
  const { t, lang } = useLang();

  const [categories, setCategories] = useState<Set<Category>>(new Set());
  const [hairTypes, setHairTypes] = useState<Set<string>>(new Set());
  const [porosities, setPorosities] = useState<Set<Porosity>>(new Set());
  const [priceMin, setPriceMin] = useState<number>(PRICE_MIN);
  const [priceMax, setPriceMax] = useState<number>(PRICE_MAX);
  const [sort, setSort] = useState<SortKey>("recommended");
  const [page, setPage] = useState<number>(1);

  const filtered = useMemo(() => {
    const list = realProducts.filter((p) => {
      if (categories.size > 0 && !categories.has(p.category)) return false;
      if (hairTypes.size > 0) {
        const has = p.hairTypes.some((h) => hairTypes.has(h));
        if (!has) return false;
      }
      if (porosities.size > 0) {
        const has = p.porosity.some((pp) => porosities.has(pp as Porosity));
        if (!has) return false;
      }
      if (p.price < priceMin || p.price > priceMax) return false;
      return true;
    });

    const sorted = [...list];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sort === "alpha")
      sorted.sort((a, b) => a.name.localeCompare(b.name, lang === "no" ? "nb-NO" : "en"));
    else if (sort === "bestseller")
      sorted.sort((a, b) => Number(b.bestseller ?? false) - Number(a.bestseller ?? false));
    // "recommended" keeps source order.
    return sorted;
  }, [categories, hairTypes, porosities, priceMin, priceMax, sort, lang]);

  // Reset to page 1 whenever any filter or sort changes.
  useEffect(() => {
    setPage(1);
  }, [categories, hairTypes, porosities, priceMin, priceMax, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const visible = filtered.slice(start, start + PAGE_SIZE);

  function toggleCategory(value: Category) {
    setCategories((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function toggleHair(value: string) {
    setHairTypes((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function togglePorosity(value: Porosity) {
    setPorosities((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function clearAll() {
    setCategories(new Set());
    setHairTypes(new Set());
    setPorosities(new Set());
    setPriceMin(PRICE_MIN);
    setPriceMax(PRICE_MAX);
  }

  const productLabel = t({
    en: filtered.length === 1 ? "product" : "products",
    no: filtered.length === 1 ? "produkt" : "produkter",
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 lg:gap-14 pt-8 md:pt-12">
      <aside
        className="lg:sticky lg:top-24 lg:self-start lg:border-r lg:border-line lg:pr-8"
        data-testid="shop-sidebar"
      >
        <FilterGroup
          title={t({ en: "Category", no: "Kategori" })}
          onClear={() => setCategories(new Set())}
          showClear={categories.size > 0}
        >
          <div className="flex flex-col gap-2.5">
            {CATEGORIES.map((c) => (
              <label
                key={c.value}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={categories.has(c.value)}
                  onChange={() => toggleCategory(c.value)}
                  className="appearance-none h-3.5 w-3.5 border border-line bg-cream checked:bg-ink checked:border-ink cursor-pointer relative"
                  style={{
                    backgroundImage: categories.has(c.value)
                      ? "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10'><path fill='none' stroke='%23FAF7F2' stroke-width='1.5' d='M2 5l2 2 4-4'/></svg>\")"
                      : undefined,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "10px 10px",
                  }}
                  data-testid={`filter-category-${c.value}`}
                />
                <span className="font-sans text-[13px] text-ink-soft group-hover:text-ink transition-colors">
                  {t(c.label)}
                </span>
              </label>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup
          title={t({ en: "Hair type", no: "Hartype" })}
          onClear={() => setHairTypes(new Set())}
          showClear={hairTypes.size > 0}
        >
          <div className="flex flex-wrap gap-2">
            {HAIR_TYPES.map((h) => {
              const active = hairTypes.has(h);
              return (
                <button
                  key={h}
                  type="button"
                  aria-pressed={active}
                  onClick={() => toggleHair(h)}
                  data-testid={`filter-hair-${h}`}
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full border font-mono text-[11px] tracking-[0.14em] uppercase transition-colors",
                    active
                      ? "bg-ink text-cream border-ink"
                      : "bg-cream text-ink border-line hover:border-ink",
                  )}
                >
                  {h}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        <FilterGroup
          title={t({ en: "Porosity", no: "Porositet" })}
          onClear={() => setPorosities(new Set())}
          showClear={porosities.size > 0}
        >
          <div className="flex flex-wrap gap-2">
            {POROSITIES.map((p) => {
              const active = porosities.has(p.value);
              return (
                <button
                  key={p.value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => togglePorosity(p.value)}
                  data-testid={`filter-porosity-${p.value}`}
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full border font-mono text-[11px] tracking-[0.14em] uppercase transition-colors",
                    active
                      ? "bg-ink text-cream border-ink"
                      : "bg-cream text-ink border-line hover:border-ink",
                  )}
                >
                  {t(p.label)}
                </button>
              );
            })}
          </div>
        </FilterGroup>

        <FilterGroup
          title={t({ en: "Price", no: "Pris" })}
          onClear={() => {
            setPriceMin(PRICE_MIN);
            setPriceMax(PRICE_MAX);
          }}
          showClear={priceMin !== PRICE_MIN || priceMax !== PRICE_MAX}
          isLast
        >
          <PriceRange
            min={PRICE_MIN}
            max={PRICE_MAX}
            valueMin={priceMin}
            valueMax={priceMax}
            onChangeMin={setPriceMin}
            onChangeMax={setPriceMax}
          />
        </FilterGroup>

        <button
          type="button"
          onClick={clearAll}
          data-testid="filter-clear-all"
          className="mt-6 font-mono text-[10px] tracking-[0.22em] uppercase text-terracotta-deep underline underline-offset-4 hover:text-terracotta"
        >
          {t({ en: "Clear filters", no: "Tom filter" })}
        </button>
      </aside>

      <div>
        <div className="flex items-center justify-between border-b border-line pb-5 mb-8 gap-4 flex-wrap">
          <p
            className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-muted"
            data-testid="product-count"
          >
            <span className="text-ink font-medium">{filtered.length}</span>{" "}
            {productLabel}
          </p>
          <label className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-muted">
              {t({ en: "Sort", no: "Sorter" })}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              data-testid="sort-select"
              className="bg-cream border border-line text-ink font-mono text-[11px] tracking-[0.18em] uppercase py-2 pl-3 pr-9 cursor-pointer hover:border-ink focus:outline-none focus:border-ink"
              style={{
                appearance: "none",
                WebkitAppearance: "none",
                backgroundImage:
                  "linear-gradient(45deg, transparent 50%, var(--color-ink) 50%), linear-gradient(135deg, var(--color-ink) 50%, transparent 50%)",
                backgroundPosition:
                  "calc(100% - 16px) calc(50% - 2px), calc(100% - 11px) calc(50% - 2px)",
                backgroundSize: "5px 5px, 5px 5px",
                backgroundRepeat: "no-repeat",
              }}
            >
              <option value="recommended">
                {t({ en: "Recommended", no: "Anbefalt" })}
              </option>
              <option value="price-asc">
                {t({ en: "Lowest price", no: "Lavest pris" })}
              </option>
              <option value="price-desc">
                {t({ en: "Highest price", no: "Hoyest pris" })}
              </option>
              <option value="alpha">
                {t({ en: "A to Z", no: "A til A" })}
              </option>
              <option value="bestseller">
                {t({ en: "Best selling", no: "Mest solgt" })}
              </option>
            </select>
          </label>
        </div>

        {visible.length === 0 ? (
          <div className="py-24 text-center">
            <p className="font-display text-3xl text-ink-muted tracking-tight">
              {t({
                en: "No products match.",
                no: "Ingen produkter matcher.",
              })}
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 font-mono text-[11px] tracking-[0.22em] uppercase text-terracotta-deep underline underline-offset-4"
            >
              {t({ en: "Clear filters", no: "Tom filter" })}
            </button>
          </div>
        ) : (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14"
            data-testid="product-grid"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            current={safePage}
            total={totalPages}
            onChange={setPage}
          />
        )}
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  children,
  onClear,
  showClear,
  isLast,
}: {
  title: string;
  children: React.ReactNode;
  onClear?: () => void;
  showClear?: boolean;
  isLast?: boolean;
}) {
  return (
    <div
      className={cn(
        "pb-6 mb-6",
        !isLast && "border-b border-line",
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink m-0">
          {title}
        </h4>
        {showClear && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="font-mono text-[9px] tracking-[0.22em] uppercase text-ink-muted hover:text-terracotta-deep"
          >
            {title === "Pris" || title === "Price" ? "" : ""}
            {"✕"}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function PriceRange({
  min,
  max,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
}: {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChangeMin: (v: number) => void;
  onChangeMax: (v: number) => void;
}) {
  const step = 50;
  const pctMin = ((valueMin - min) / (max - min)) * 100;
  const pctMax = ((valueMax - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between font-mono text-[12px] text-ink">
        <span>{formatNok(valueMin)}</span>
        <span>{formatNok(valueMax)}</span>
      </div>
      <div className="relative h-5 flex items-center">
        <div className="absolute inset-x-0 h-[2px] bg-line" />
        <div
          className="absolute h-[2px] bg-terracotta"
          style={{ left: `${pctMin}%`, right: `${100 - pctMax}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v <= valueMax - step) onChangeMin(v);
            else onChangeMin(Math.max(min, valueMax - step));
          }}
          data-testid="price-min"
          aria-label="Minimum price"
          className="dual-range absolute inset-x-0 w-full bg-transparent appearance-none pointer-events-none"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={(e) => {
            const v = Number(e.target.value);
            if (v >= valueMin + step) onChangeMax(v);
            else onChangeMax(Math.min(max, valueMin + step));
          }}
          data-testid="price-max"
          aria-label="Maximum price"
          className="dual-range absolute inset-x-0 w-full bg-transparent appearance-none pointer-events-none"
        />
      </div>
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] uppercase text-ink-muted">
        <span>{formatNok(min)}</span>
        <span>{formatNok(max)}</span>
      </div>
      <style jsx>{`
        .dual-range {
          height: 20px;
        }
        .dual-range::-webkit-slider-runnable-track {
          background: transparent;
          height: 2px;
        }
        .dual-range::-moz-range-track {
          background: transparent;
          height: 2px;
        }
        .dual-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: var(--color-terracotta);
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid var(--color-cream);
          box-shadow: 0 0 0 1px var(--color-terracotta);
          pointer-events: auto;
          margin-top: -7px;
        }
        .dual-range::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: var(--color-terracotta);
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid var(--color-cream);
          box-shadow: 0 0 0 1px var(--color-terracotta);
          pointer-events: auto;
        }
      `}</style>
    </div>
  );
}

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (page: number) => void;
}) {
  const { t } = useLang();
  const pages: number[] = [];
  for (let i = 1; i <= total; i++) pages.push(i);

  return (
    <nav
      className="mt-16 flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase"
      aria-label="Pagination"
      data-testid="pagination"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        data-testid="pagination-prev"
        className="px-4 py-2 border border-line text-ink hover:border-ink hover:bg-ink hover:text-cream transition-colors disabled:opacity-40 disabled:hover:bg-cream disabled:hover:text-ink disabled:hover:border-line"
      >
        {t({ en: "Previous", no: "Forrige" })}
      </button>
      <div className="flex items-center gap-1">
        {pages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === current ? "page" : undefined}
            data-testid={`pagination-page-${p}`}
            className={cn(
              "min-w-[36px] h-9 px-2 border transition-colors",
              p === current
                ? "bg-ink text-cream border-ink"
                : "bg-cream text-ink border-line hover:border-ink",
            )}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        data-testid="pagination-next"
        className="px-4 py-2 border border-line text-ink hover:border-ink hover:bg-ink hover:text-cream transition-colors disabled:opacity-40 disabled:hover:bg-cream disabled:hover:text-ink disabled:hover:border-line"
      >
        {t({ en: "Next", no: "Neste" })}
      </button>
    </nav>
  );
}

function ProductCard({ product }: { product: ShopProduct }) {
  const { t } = useLang();
  const imageUrl = primaryImage(product);
  const altText = `${product.brand} ${product.name}`;
  const isSoldOut = product.stock === "out_of_stock";

  const cartProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    imageUrl,
    externalCheckoutUrl: product.externalCheckoutUrl,
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col"
      data-testid="product-card"
      data-product-id={product.id}
    >
      <Link
        href={`/shop/${product.slug}`}
        className="block relative overflow-hidden bg-cream-deep"
        data-testid="product-link"
      >
        <div className={cn("relative aspect-[4/5] w-full", isSoldOut && "opacity-80")}>
          <Image
            src={imageUrl}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            unoptimized={imageUrl.endsWith(".svg")}
          />
        </div>
        <CardBadge product={product} />
      </Link>

      <div className="mt-4 flex flex-col gap-1.5">
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-terracotta-deep">
          {product.brand}
        </p>
        <Link href={`/shop/${product.slug}`} className="block">
          <h3 className="font-display text-[22px] tracking-tight leading-[1.15] text-ink hover:text-terracotta-deep transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.stylistPick && (
          <p className="text-xs italic text-terracotta leading-snug mt-1">
            {t(product.stylistPick)}
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="font-mono text-[13px] tracking-[0.06em] text-ink">
          {formatNok(product.price)}
        </span>
        {isSoldOut ? (
          <button
            type="button"
            disabled
            aria-disabled="true"
            data-testid="waitlist-button"
            className="h-9 px-4 bg-ink/30 text-cream font-mono text-[10px] tracking-[0.22em] uppercase cursor-not-allowed"
          >
            {t({ en: "Sold out", no: "Utsolgt" })}
          </button>
        ) : (
          <AddToBagButton
            product={cartProduct}
            className="border border-ink bg-transparent text-ink font-mono text-[10px] tracking-[0.22em] uppercase hover:bg-ink hover:text-cream"
          />
        )}
      </div>
    </motion.article>
  );
}

function CardBadge({ product }: { product: ShopProduct }) {
  const { t } = useLang();
  const isSoldOut = product.stock === "out_of_stock";
  const isLowStock = product.stock === "low_stock";

  if (isSoldOut) {
    return (
      <span
        data-testid="stock-badge-out"
        className="absolute top-3 left-3 bg-ink text-cream px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] uppercase"
      >
        {t({ en: "Sold out", no: "Utsolgt" })}
      </span>
    );
  }
  if (isLowStock) {
    return (
      <span
        data-testid="stock-badge-low"
        className="absolute top-3 left-3 bg-terracotta text-cream px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] uppercase"
      >
        {t({ en: "Few left", no: "Fa igjen" })}
      </span>
    );
  }
  if (product.stylistPick) {
    return (
      <span
        data-testid="badge-stylist-pick"
        className="absolute top-3 left-3 bg-terracotta text-cream px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] uppercase"
      >
        {t({ en: "Stylist pick", no: "Stylist sin favoritt" })}
      </span>
    );
  }
  if (product.bestseller) {
    return (
      <span
        data-testid="badge-bestseller"
        className="absolute top-3 left-3 bg-ink text-cream px-2.5 py-1 font-mono text-[10px] tracking-[0.22em] uppercase"
      >
        {t({ en: "Bestseller", no: "Mest solgt" })}
      </span>
    );
  }
  return null;
}
