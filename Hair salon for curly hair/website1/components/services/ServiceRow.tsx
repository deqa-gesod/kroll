"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";
import type { Service } from "@/lib/content/services";
import { cn } from "@/lib/cn";

type Props = {
  service: Service;
  /** running index used as the leading roman/numeric tag */
  index: number;
};

export function ServiceRow({ service, index }: Props) {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const num = String(index).padStart(2, "0");

  return (
    <div
      className={cn(
        "group border-t border-line",
        "transition-colors duration-300",
        open ? "bg-cream-deep/40" : "hover:bg-cream-deep/20"
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`svc-${service.slug}-panel`}
        onClick={() => setOpen((s) => !s)}
        className="w-full text-left px-2 md:px-4 py-7 md:py-9 grid grid-cols-12 gap-4 md:gap-6 items-baseline"
      >
        {/* Index */}
        <span className="col-span-2 md:col-span-1 font-mono text-[11px] tracking-[0.2em] text-ink-muted pt-1">
          {num}
        </span>

        {/* Name + tagline */}
        <span className="col-span-10 md:col-span-6 block">
          <span className="font-display block text-[clamp(28px,4.4vw,52px)] tracking-display leading-[1] text-ink">
            {t(service.name)}
          </span>
          <span className="mt-2 block max-w-prose text-[15px] md:text-[16px] leading-snug text-ink-soft">
            {t(service.blurb)}
          </span>
          <span className="mt-3 block font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-muted">
            {t(service.forWhom)}
          </span>
        </span>

        {/* Duration */}
        <span className="hidden md:block md:col-span-2 font-mono text-[13px] tracking-wide text-ink-soft pt-1">
          {t(service.duration)}
        </span>

        {/* Price + chevron */}
        <span className="col-span-12 md:col-span-3 mt-3 md:mt-0 flex md:justify-end items-baseline gap-4 md:gap-6">
          <span className="md:hidden font-mono text-[13px] tracking-wide text-ink-soft">
            {t(service.duration)}
          </span>
          <span className="font-mono text-[18px] md:text-[20px] tabular-nums tracking-tight text-ink">
            {t(service.price)}
          </span>
          <span
            aria-hidden
            className={cn(
              "inline-block ml-auto md:ml-0 transition-transform duration-300",
              "translate-y-[-2px]",
              open ? "rotate-45" : "rotate-0"
            )}
          >
            <span className="block w-3 h-px bg-ink" />
            <span className="block w-px h-3 bg-ink translate-x-[5.5px] -translate-y-[6.5px]" />
          </span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`svc-${service.slug}-panel`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-2 md:px-4 pb-10 md:pb-14 grid grid-cols-12 gap-6 md:gap-10">
              <div className="hidden md:block md:col-span-1" />
              <div className="col-span-12 md:col-span-7">
                <p className="font-mono text-[10.5px] tracking-[0.22em] uppercase text-ink-muted">
                  {t({ en: "What's included", no: "Hva som er inkludert" })}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {service.includes.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-baseline gap-3 text-[15px] md:text-[16px] leading-snug text-ink-soft"
                    >
                      <span
                        aria-hidden
                        className="font-mono text-[11px] text-terracotta-deep tabular-nums pt-[3px]"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{t(item)}</span>
                    </li>
                  ))}
                </ul>
                {service.priceNote && (
                  <p className="mt-6 max-w-prose text-[13px] leading-snug text-ink-muted italic">
                    {t(service.priceNote)}
                  </p>
                )}
              </div>

              <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-4">
                <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
                  {t({ en: "Book this", no: "Book denne" })}
                </div>
                <Link
                  href={`/booking?service=${service.slug}`}
                  className="inline-flex h-12 px-6 items-center justify-between bg-ink text-cream text-[13px] tracking-wide hover:bg-terracotta transition-colors"
                >
                  <span>
                    {t({ en: "Book", no: "Book" })} {t(service.name)}
                  </span>
                  <span aria-hidden className="ml-4 font-mono">→</span>
                </Link>
                <Link
                  href="/booking?service=consultation"
                  className="text-[13px] text-ink-soft hover:text-terracotta-deep transition-colors underline underline-offset-4 decoration-line"
                >
                  {t({
                    en: "Or talk first — free 15-min consult",
                    no: "Eller prat først — gratis 15-min konsultasjon",
                  })}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
