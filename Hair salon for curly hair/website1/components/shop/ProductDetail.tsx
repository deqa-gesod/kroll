"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { useLang } from "@/components/providers/LangProvider";
import { AddToBagButton } from "./AddToBagButton";
import type { ShopProduct } from "@/lib/content/shop-products-v2";
import { cn } from "@/lib/cn";

function formatNok(n: number) {
  return `${n.toLocaleString("nb-NO")} kr`;
}

function primaryImage(product: ShopProduct): string {
  return product.imageUrls?.[0] ?? "/images/shop/placeholder.svg";
}

export function ProductDetail({ product }: { product: ShopProduct }) {
  const { t } = useLang();
  const [activeImage, setActiveImage] = useState<number>(0);

  const images =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : ["/images/shop/placeholder.svg"];

  const isSoldOut = product.stock === "out_of_stock";
  const isLowStock = product.stock === "low_stock";

  const cartProduct = {
    id: product.id,
    name: product.name,
    brand: product.brand,
    price: product.price,
    imageUrl: primaryImage(product),
    externalCheckoutUrl: product.externalCheckoutUrl,
  };

  return (
    <section className="bg-cream">
      <Container width="wide" className="pt-10 md:pt-14 pb-24 md:pb-32">
        <Link
          href="/shop"
          data-testid="back-to-shop"
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.22em] uppercase text-ink-muted hover:text-terracotta-deep transition-colors mb-10"
        >
          <span aria-hidden="true">&larr;</span>
          {t({ en: "Back to shop", no: "Tilbake til shop" })}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div
              className="relative aspect-[4/5] w-full overflow-hidden bg-cream-deep"
              data-testid="product-image-main"
            >
              <Image
                src={images[activeImage] ?? images[0]}
                alt={`${product.brand} ${product.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
                unoptimized={(images[activeImage] ?? "").endsWith(".svg")}
              />
              {isSoldOut && (
                <span className="absolute top-4 left-4 bg-ink text-cream px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase">
                  {t({ en: "Sold out", no: "Utsolgt" })}
                </span>
              )}
              {!isSoldOut && isLowStock && (
                <span className="absolute top-4 left-4 bg-terracotta text-cream px-3 py-1.5 font-mono text-[10px] tracking-[0.22em] uppercase">
                  {t({ en: "Few left", no: "Fa igjen" })}
                </span>
              )}
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((src, idx) => (
                  <button
                    key={src + idx}
                    type="button"
                    onClick={() => setActiveImage(idx)}
                    aria-current={idx === activeImage ? "true" : undefined}
                    className={cn(
                      "relative aspect-[4/5] overflow-hidden bg-cream-deep border transition-colors",
                      idx === activeImage
                        ? "border-ink"
                        : "border-line hover:border-ink",
                    )}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover"
                      unoptimized={src.endsWith(".svg")}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-terracotta-deep">
              {product.brand}
            </p>
            <h1 className="font-display text-[clamp(36px,5vw,64px)] tracking-display leading-[1.02] text-ink mt-3">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-4">
              <RatingStars rating={product.rating} />
              <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-muted">
                {product.rating.toFixed(1)} / {product.reviewCount}{" "}
                {t({
                  en: product.reviewCount === 1 ? "review" : "reviews",
                  no: product.reviewCount === 1 ? "vurdering" : "vurderinger",
                })}
              </span>
            </div>

            <p
              className="mt-6 font-mono text-[18px] tracking-[0.04em] text-ink"
              data-testid="product-price"
            >
              {formatNok(product.price)}
            </p>

            <p className="mt-6 text-base md:text-lg leading-snug text-ink-soft">
              {t(product.longDescription)}
            </p>

            {product.stylistPick && (
              <div className="mt-8 border-l-2 border-terracotta pl-5 py-1">
                <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-terracotta-deep mb-1">
                  {t({ en: "Stylist pick", no: "Stylist sin favoritt" })}
                </p>
                <p className="italic text-ink-soft leading-snug">
                  {t(product.stylistPick)}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {product.hairTypes.map((h) => (
                <span
                  key={h}
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted border border-line px-2 py-1"
                >
                  {h}
                </span>
              ))}
              {product.porosity.map((p) => (
                <span
                  key={p}
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted border border-line px-2 py-1"
                >
                  {p}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              {isSoldOut ? (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  data-testid="waitlist-button"
                  className="h-12 px-6 bg-ink/30 text-cream font-mono text-[11px] tracking-[0.22em] uppercase cursor-not-allowed"
                >
                  {t({ en: "Sold out", no: "Utsolgt" })}
                </button>
              ) : (
                <AddToBagButton
                  product={cartProduct}
                  className="h-12 px-7 bg-ink text-cream font-mono text-[11px] tracking-[0.22em] uppercase hover:bg-terracotta"
                />
              )}
            </div>

            <div className="mt-12 flex flex-col">
              {product.ingredients && (
                <details
                  className="group border-t border-line py-5"
                  data-testid="details-ingredients"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none font-mono text-[11px] tracking-[0.22em] uppercase text-ink">
                    {t({ en: "Ingredients", no: "Ingredienser" })}
                    <span className="font-mono text-base group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                    {product.ingredients}
                  </p>
                </details>
              )}

              {product.howToUse && (
                <details
                  className="group border-t border-line py-5"
                  data-testid="details-howtouse"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none font-mono text-[11px] tracking-[0.22em] uppercase text-ink">
                    {t({ en: "How to use", no: "Slik bruker du" })}
                    <span className="font-mono text-base group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 text-sm text-ink-soft leading-relaxed">
                    {t(product.howToUse)}
                  </p>
                </details>
              )}

              {product.conditions.length > 0 && (
                <details
                  className="group border-t border-b border-line py-5"
                  data-testid="details-conditions"
                >
                  <summary className="flex items-center justify-between cursor-pointer list-none font-mono text-[11px] tracking-[0.22em] uppercase text-ink">
                    {t({ en: "Suited for", no: "Passer for" })}
                    <span className="font-mono text-base group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {product.conditions.map((c) => (
                      <li
                        key={c}
                        className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-muted border border-line px-2 py-1"
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function RatingStars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <div
      className="flex items-center gap-0.5 text-terracotta"
      aria-label={`${rating.toFixed(1)} of 5`}
      data-testid="rating-stars"
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          aria-hidden="true"
          className={cn(
            "font-mono text-[13px]",
            s <= full ? "text-terracotta" : "text-line",
          )}
        >
          ★
        </span>
      ))}
    </div>
  );
}
