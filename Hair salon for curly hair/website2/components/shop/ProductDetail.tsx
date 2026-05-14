"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { AddToBagButton } from "@/components/shop/AddToBagButton";
import { ProductCard, RatingStars } from "@/components/shop/ProductCard";
import { useLanguage } from "@/components/language-provider";
import type { ShopProduct } from "@/lib/shop-types";

function pick(locale: "en" | "no", en: string, no: string) {
  return locale === "no" ? no : en;
}

function formatNok(n: number) {
  return `${n.toLocaleString("nb-NO")} NOK`;
}

function StockBadgeDetail({
  stock,
  locale,
}: {
  stock: ShopProduct["stock"];
  locale: "en" | "no";
}) {
  if (stock === "in_stock") {
    return (
      <span className="inline-flex items-center gap-2 border border-ink/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink/65">
        <span className="h-2 w-2 rounded-full bg-sea" aria-hidden />
        {pick(locale, "In stock", "På lager")}
      </span>
    );
  }
  if (stock === "low_stock") {
    return (
      <span className="inline-flex items-center gap-2 border border-clay px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-clay">
        <span className="h-2 w-2 rounded-full bg-clay" aria-hidden />
        {pick(locale, "Only a few left", "Bare noen få igjen")}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 bg-ink px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper">
      {pick(locale, "Sold out", "Utsolgt")}
    </span>
  );
}

export function ProductDetail({
  product,
  related,
}: {
  product: ShopProduct;
  related: ShopProduct[];
}) {
  const { locale } = useLanguage();
  const images =
    product.imageUrls.length > 0
      ? product.imageUrls
      : ["/images/shop/placeholder.svg"];
  const [activeImage, setActiveImage] = useState(0);
  const heroImage = images[activeImage] ?? images[0];

  const isSoldOut = product.stock === "out_of_stock";
  const cartProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    imageUrl: images[0],
    externalCheckoutUrl: product.externalCheckoutUrl,
  };

  return (
    <>
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-[1440px] px-4 pt-10 sm:px-6 lg:px-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60 hover:text-clay"
            data-testid="back-to-shop"
          >
            <ArrowLeft size={12} />
            {pick(locale, "Back to shop", "Tilbake til shop")}
          </Link>
        </div>
        <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14 lg:px-8 lg:py-20">
          <ScrollReveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
              <Image
                src={heroImage}
                alt={`${product.brand} ${product.name}`}
                fill
                priority
                sizes="(min-width: 1024px) 56vw, 92vw"
                className="object-cover"
                unoptimized={heroImage.endsWith(".svg")}
              />
            </div>
            {images.length > 1 ? (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {images.map((img, index) => (
                  <button
                    key={img + index}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    aria-label={pick(locale, "Show image", "Vis bilde") + ` ${index + 1}`}
                    className={`relative aspect-square overflow-hidden border-2 ${
                      activeImage === index ? "border-clay" : "border-ink/10"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover"
                      unoptimized={img.endsWith(".svg")}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </ScrollReveal>

          <ScrollReveal delay={0.06} className="self-start">
            <p className="eyebrow text-clay">{product.brand}</p>
            <h1
              className="mt-4 font-display text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl"
              data-testid="product-title"
            >
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-4">
              <RatingStars
                rating={product.rating}
                reviewCount={product.reviewCount}
                size={14}
              />
              {product.reviewCount > 0 ? (
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink/55">
                  {product.reviewCount}{" "}
                  {pick(locale, "reviews", "anmeldelser")}
                </span>
              ) : null}
            </div>
            <p
              className="mt-6 font-display text-4xl font-semibold tracking-[-0.04em]"
              data-testid="product-price"
            >
              {formatNok(product.price)}
            </p>
            <div className="mt-4">
              <StockBadgeDetail stock={product.stock} locale={locale} />
            </div>
            <p className="mt-7 text-lg leading-8 text-ink/75">
              {product.longDescription[locale]}
            </p>

            {product.stylistPick ? (
              <aside className="mt-7 border-l-2 border-clay bg-paper-deep/50 p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-clay">
                  {pick(locale, "Stylist pick", "Stylist sin favoritt")}
                </p>
                <p className="mt-3 text-base leading-7 text-ink/80">
                  {product.stylistPick[locale]}
                </p>
              </aside>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-1.5">
              {product.hairTypes.map((tag) => (
                <span
                  key={tag}
                  className="border border-ink/15 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/65"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {isSoldOut ? (
                <button
                  type="button"
                  disabled
                  className="inline-flex h-11 cursor-not-allowed items-center bg-ink/30 px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-paper"
                >
                  {pick(locale, "Sold out", "Utsolgt")}
                </button>
              ) : (
                <AddToBagButton
                  product={cartProduct}
                  className="h-11 px-7"
                />
              )}
            </div>

            {product.ingredients ? (
              <details className="mt-8 border-t border-ink/10 pt-5">
                <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                  {pick(locale, "Key ingredients", "Nøkkel-ingredienser")}
                </summary>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  {product.ingredients}
                </p>
              </details>
            ) : null}
            {product.howToUse ? (
              <details className="mt-3 border-t border-ink/10 pt-5">
                <summary className="cursor-pointer font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">
                  {pick(locale, "How to use", "Slik bruker du")}
                </summary>
                <p className="mt-3 text-sm leading-6 text-ink/70">
                  {product.howToUse[locale]}
                </p>
              </details>
            ) : null}
          </ScrollReveal>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <p className="eyebrow text-clay">
            {pick(locale, "Related products", "Relaterte produkter")}
          </p>
          <h2 className="mt-3 font-display text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
            {pick(locale, "More like this", "Mer i samme kategori")}
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
