"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";
import {
  realProducts,
  type ShopProduct,
} from "@/lib/content/shop-products-v2";
import {
  CurlTypeFilter,
  matchesFilter,
  type FilterValue,
  type CurlType,
} from "@/components/curl-type-filter/CurlTypeFilter";
import { BrandFilter, type BrandFilterValue } from "./BrandFilter";
import { AddToBagButton } from "./AddToBagButton";
import { cn } from "@/lib/cn";

function formatNok(n: number) {
  // 1234 -> "1 234 kr" Norwegian style. Mono-friendly.
  return `${n.toLocaleString("nb-NO")} kr`;
}

// ShopProduct.hairTypes is a string[] (e.g. ["3A", "4B"]). The curl-type
// filter component speaks the FilterValue union. We cast through the data
// because the data values are validated by the data file itself.
function productMatchesCurl(product: ShopProduct, active: FilterValue) {
  return matchesFilter(
    product.hairTypes as ReadonlyArray<CurlType>,
    active,
  );
}

// Brand list, derived from the catalogue itself so adding a product
// automatically grows the filter row.
function uniqueBrands(products: ReadonlyArray<ShopProduct>): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];
  for (const p of products) {
    if (!seen.has(p.brand)) {
      seen.add(p.brand);
      ordered.push(p.brand);
    }
  }
  return ordered;
}

function primaryImage(product: ShopProduct): string {
  return product.imageUrls?.[0] ?? "/images/shop/placeholder.svg";
}

export function ShopGrid() {
  const { t } = useLang();
  const [curlFilter, setCurlFilter] = useState<FilterValue>("All");
  const [brandFilter, setBrandFilter] = useState<BrandFilterValue>("All");

  const brands = useMemo(() => uniqueBrands(realProducts), []);

  const filtered = useMemo(
    () =>
      realProducts.filter(
        (p) =>
          productMatchesCurl(p, curlFilter) &&
          (brandFilter === "All" || p.brand === brandFilter),
      ),
    [curlFilter, brandFilter],
  );

  return (
    <>
      <div className="space-y-8 mb-12 md:mb-16">
        <CurlTypeFilter
          value={curlFilter}
          onChange={setCurlFilter}
          label={{ en: "Filter by curl type", no: "Filtrer etter krølltype" }}
        />
        <BrandFilter
          value={brandFilter}
          onChange={setBrandFilter}
          brands={brands}
        />
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
          {filtered.length}{" "}
          {t({
            en: filtered.length === 1 ? "product" : "products",
            no: filtered.length === 1 ? "produkt" : "produkter",
          })}
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
        <AnimatePresence mode="popLayout">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <p className="mt-12 text-center text-ink-muted">
          {t({
            en: "No products match these filters yet. Clear a filter or two.",
            no: "Ingen produkter matcher filtrene ennå. Fjern et filter eller to.",
          })}
        </p>
      )}
    </>
  );
}

function StockBadge({ stock }: { stock: ShopProduct["stock"] }) {
  const { t } = useLang();
  if (stock === "in_stock") return null;

  if (stock === "low_stock") {
    return (
      <span
        data-testid="stock-badge-low"
        className="absolute top-3 right-3 bg-cream text-terracotta border border-terracotta px-2 py-1 font-mono text-[10px] tracking-[0.2em] uppercase"
      >
        {t({ en: "Only a few left", no: "Bare noen få igjen" })}
      </span>
    );
  }

  return (
    <span
      data-testid="stock-badge-out"
      className="absolute top-3 right-3 bg-ink text-cream px-2 py-1 font-mono text-[10px] tracking-[0.2em] uppercase"
    >
      {t({ en: "Sold out", no: "Utsolgt" })}
    </span>
  );
}

function WaitlistButton({ className }: { className?: string }) {
  const { t } = useLang();
  const label = t({ en: "Sold out", no: "Utsolgt" });
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      data-testid="waitlist-button"
      onClick={() => {
        // Prototype: would post to a waitlist endpoint. Disabled keeps the
        // button from doing anything unexpected.
        if (typeof window !== "undefined") {
          // eslint-disable-next-line no-console
          console.log("waitlist click (disabled)");
        }
      }}
      aria-label={label}
      className={cn(
        "relative h-9 px-4 bg-ink/30 text-cream text-[12px] tracking-wide cursor-not-allowed",
        className,
      )}
    >
      {label}
    </button>
  );
}

function ProductCard({ product }: { product: ShopProduct }) {
  const { t } = useLang();

  const imageUrl = primaryImage(product);

  const cartProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    imageUrl,
    externalCheckoutUrl: product.externalCheckoutUrl,
  };

  const altText = `${product.brand} ${product.name}`;
  const isSoldOut = product.stock === "out_of_stock";

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
      <div
        className={cn(
          "relative aspect-square bg-cream-deep overflow-hidden",
          isSoldOut && "opacity-80",
        )}
      >
        <Image
          src={imageUrl}
          alt={altText}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          unoptimized={imageUrl.endsWith(".svg")}
        />
        {product.stylistPick && (
          <span className="absolute top-3 left-3 bg-terracotta text-cream px-2 py-1 font-mono text-[10px] tracking-[0.2em] uppercase">
            {t({ en: "Stylist pick", no: "Stylist sin favoritt" })}
          </span>
        )}
        <StockBadge stock={product.stock} />
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-muted">
          {product.brand}
        </p>
        <h3 className="font-display text-xl md:text-2xl tracking-tight leading-[1.1] text-ink">
          {product.name}
        </h3>
        <p className="text-sm text-ink-soft leading-snug mt-1">
          {t(product.description)}
        </p>
        {product.stylistPick && (
          <p className="text-xs text-terracotta italic leading-snug mt-2">
            {t(product.stylistPick)}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-1">
          {product.hairTypes.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] tracking-[0.15em] uppercase text-ink-muted border border-line px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-mono text-[14px] tracking-tight text-ink">
            {formatNok(product.price)}
          </span>
          {isSoldOut ? (
            <WaitlistButton />
          ) : (
            <AddToBagButton product={cartProduct} />
          )}
        </div>
      </div>
    </motion.article>
  );
}
