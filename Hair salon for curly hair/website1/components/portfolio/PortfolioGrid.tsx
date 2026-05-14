"use client";

import Image from "next/image";
import { useMemo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";
import { images } from "@/lib/content/images";
import { portfolioItems, type PortfolioItem } from "@/lib/content/portfolio";
import {
  CurlTypeFilter,
  matchesFilter,
  type FilterValue,
} from "@/components/curl-type-filter/CurlTypeFilter";
import { cn } from "@/lib/cn";

const SIZE_CLASS: Record<PortfolioItem["size"], string> = {
  sm: "aspect-[4/5]",
  md: "aspect-[4/5]",
  lg: "aspect-[4/5]",
};

export function PortfolioGrid() {
  const { t } = useLang();
  const [filter, setFilter] = useState<FilterValue>("All");
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(
    () => portfolioItems.filter((it) => matchesFilter(it.tags, filter)),
    [filter]
  );

  const open = filtered.find((it) => it.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      <div className="mb-10 md:mb-14">
        <CurlTypeFilter
          value={filter}
          onChange={setFilter}
          label={{
            en: "Filter by curl type",
            no: "Filtrer etter krølltype",
          }}
        />
        <p className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
          {filtered.length}{" "}
          {t({
            en: filtered.length === 1 ? "result" : "results",
            no: filtered.length === 1 ? "treff" : "treff",
          })}
        </p>
      </div>

      <div
        className={cn(
          "grid gap-4 md:gap-6",
          "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            const img = images[item.image];
            return (
              <motion.button
                key={item.id}
                layout
                type="button"
                onClick={() => setOpenId(item.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className={cn(
                  "group relative overflow-hidden bg-cream-deep text-left",
                  SIZE_CLASS[item.size]
                )}
                aria-label={`${img.alt} — ${item.stylist}`}
              >
                <Image
                  src={`/images/${img.file}`}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Tag chip — always visible */}
                <span className="absolute top-3 left-3 bg-cream/90 backdrop-blur px-2 py-1 font-mono text-[10px] tracking-[0.2em] uppercase text-ink">
                  {item.tags
                    .filter((tag) => tag !== "Mens" && tag !== "Color")
                    .slice(0, 2)
                    .join(" / ") ||
                    (item.tags.includes("Mens")
                      ? t({ en: "Men's", no: "Herre" })
                      : t({ en: "Color", no: "Farge" }))}
                </span>
                {/* Caption — fades in on hover */}
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 bg-gradient-to-t from-ink/90 via-ink/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-cream/80">
                    {t(item.service)} — {item.stylist}
                  </p>
                  <p className="mt-2 text-cream text-sm leading-snug">
                    {t(item.caption)}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-ink/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl bg-cream"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={close}
                aria-label={t({ en: "Close", no: "Lukk" })}
                className="absolute -top-10 right-0 md:top-4 md:right-4 z-10 w-9 h-9 flex items-center justify-center text-cream md:text-ink hover:text-terracotta-deep transition-colors"
              >
                <span className="block w-5 h-px bg-current rotate-45" />
                <span className="block w-5 h-px bg-current -rotate-45 -ml-5" />
              </button>
              <div className="grid md:grid-cols-5">
                <div className="relative md:col-span-3 aspect-[3/4] md:aspect-auto bg-cream-deep">
                  <Image
                    src={`/images/${images[open.image].file}`}
                    alt={images[open.image].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div className="md:col-span-2 p-6 md:p-10 flex flex-col gap-4">
                  <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
                    {open.tags
                      .filter((tag) => tag !== "Mens" && tag !== "Color")
                      .join(" / ")}
                    {open.tags.includes("Mens") && " · "}
                    {open.tags.includes("Mens") &&
                      t({ en: "Men's", no: "Herre" })}
                    {open.tags.includes("Color") && " · "}
                    {open.tags.includes("Color") &&
                      t({ en: "Color", no: "Farge" })}
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl tracking-display leading-display text-ink">
                    {t(open.service)}
                  </h2>
                  <p className="text-ink-soft text-base leading-relaxed">
                    {t(open.caption)}
                  </p>
                  <div className="mt-auto pt-6 border-t border-line">
                    <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
                      {t({ en: "Cut by", no: "Klippet av" })}
                    </p>
                    <p className="mt-1 font-display text-2xl tracking-display text-ink">
                      {open.stylist}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
