"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "@phosphor-icons/react";
import { AddToBagButton } from "@/components/shop/AddToBagButton";
import { useLanguage } from "@/components/language-provider";
import type { ShopProduct } from "@/lib/shop-types";

function formatNokShort(n: number): string {
  return `${n.toLocaleString("nb-NO")} NOK`;
}

function pick(locale: "en" | "no", en: string, no: string) {
  return locale === "no" ? no : en;
}

function StockBadge({
  stock,
  locale,
}: {
  stock: ShopProduct["stock"];
  locale: "en" | "no";
}) {
  if (stock === "in_stock") return null;
  if (stock === "low_stock") {
    const label = pick(locale, "Only a few left", "Bare noen få igjen");
    return (
      <span
        data-testid="stock-badge-low"
        className="absolute left-3 top-3 border border-clay bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-clay"
      >
        {label}
      </span>
    );
  }
  const label = pick(locale, "Sold out", "Utsolgt");
  return (
    <span
      data-testid="stock-badge-out"
      className="absolute left-3 top-3 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper"
    >
      {label}
    </span>
  );
}

function WaitlistButton({ locale }: { locale: "en" | "no" }) {
  const label = pick(locale, "Sold out", "Utsolgt");
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      data-testid="waitlist-button"
      className="inline-flex h-10 cursor-not-allowed items-center justify-center bg-ink/30 px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
    >
      {label}
    </button>
  );
}

export function RatingStars({
  rating,
  reviewCount,
  size = 12,
}: {
  rating: number;
  reviewCount: number;
  size?: number;
}) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-label={`Rating ${rating} of 5`}>
        {[1, 2, 3, 4, 5].map((n) => {
          const filled = n <= rounded;
          return (
            <Star
              key={n}
              size={size}
              weight={filled ? "fill" : "regular"}
              className={filled ? "text-clay" : "text-ink/30"}
            />
          );
        })}
      </div>
      {reviewCount > 0 ? (
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
          ({reviewCount})
        </span>
      ) : null}
    </div>
  );
}

export function ProductCard({ product }: { product: ShopProduct }) {
  const { locale } = useLanguage();
  const isSoldOut = product.stock === "out_of_stock";
  const cartProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    imageUrl: product.imageUrls[0] ?? "/images/shop/placeholder.svg",
    externalCheckoutUrl: product.externalCheckoutUrl,
  };
  const heroImage = product.imageUrls[0] ?? "/images/shop/placeholder.svg";

  return (
    <article
      className="flex flex-col border border-ink/12 bg-paper"
      data-testid="product-card"
      data-category={product.category}
    >
      <Link
        href={`/shop/${product.slug}`}
        className="group relative block aspect-[4/5] overflow-hidden bg-paper-deep"
        aria-label={`${product.brand} ${product.name}`}
      >
        <Image
          src={heroImage}
          alt={`${product.brand} ${product.name}`}
          fill
          sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 92vw"
          className={`object-cover transition duration-700 group-hover:scale-105 ${isSoldOut ? "opacity-85" : ""}`}
          unoptimized={heroImage.endsWith(".svg")}
        />
        {product.stylistPick ? (
          <span className="absolute right-3 top-3 bg-clay px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper">
            {pick(locale, "Stylist pick", "Stylist sin favoritt")}
          </span>
        ) : null}
        {product.bestseller ? (
          <span className="absolute right-3 top-12 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper">
            {pick(locale, "Bestseller", "Bestselger")}
          </span>
        ) : null}
        {product.newArrival ? (
          <span className="absolute right-3 top-12 border border-ink bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink">
            {pick(locale, "New", "Ny")}
          </span>
        ) : null}
        <StockBadge stock={product.stock} locale={locale} />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-clay">
          {product.brand}
        </p>
        <h3 className="mt-3 font-display text-2xl font-semibold leading-[1.05] tracking-[-0.04em]">
          <Link href={`/shop/${product.slug}`} className="hover:text-clay">
            {product.name}
          </Link>
        </h3>
        <div className="mt-3">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <p className="mt-3 text-sm leading-6 text-ink/70 line-clamp-3">
          {product.description[locale]}
        </p>
        <div className="mt-4 flex flex-wrap gap-1">
          {product.hairTypes.slice(0, 4).map((tag) => (
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
            <WaitlistButton locale={locale} />
          ) : (
            <AddToBagButton product={cartProduct} />
          )}
        </div>
      </div>
    </article>
  );
}
