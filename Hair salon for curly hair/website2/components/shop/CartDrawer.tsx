"use client";

import { useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart/useCart";
import { useCartUI } from "@/lib/cart/useCartUI";
import { useLanguage } from "@/components/language-provider";

function formatNok(n: number) {
  return `${n.toLocaleString("nb-NO")} kr`;
}

function pick(locale: "en" | "no", en: string, no: string) {
  return locale === "no" ? no : en;
}

export function CartDrawer() {
  const { items, subtotal, remove, setQty, clear } = useCart();
  const { isOpen, close } = useCartUI();
  const { locale } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [isOpen]);

  const firstCheckoutUrl = items[0]?.externalCheckoutUrl;
  const checkoutLabel = pick(
    locale,
    "Continue to external store",
    "Fortsett til ekstern butikk"
  );
  const multiVendorNote = pick(
    locale,
    "You will be sent to the first vendor. The remaining items stay saved in your bag.",
    "Du blir sendt til den første leverandøren. Andre produkter ligger lagret i kurven."
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            type="button"
            aria-label={pick(locale, "Close cart", "Lukk kurv")}
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={pick(locale, "Your bag", "Din pose")}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 h-full w-full sm:w-[440px] bg-paper text-ink shadow-2xl flex flex-col border-l border-ink/10"
          >
            <header className="flex items-center justify-between h-16 px-6 border-b border-ink/10">
              <h2 className="font-display text-2xl font-semibold tracking-[-0.04em]">
                {pick(locale, "Your bag", "Din pose")}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label={pick(locale, "Close", "Lukk")}
                className="grid h-10 w-10 place-items-center text-ink/70 hover:text-ink transition-colors"
              >
                <X size={20} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
                <p className="font-display text-3xl font-semibold tracking-[-0.04em] text-ink/70">
                  {pick(locale, "Your bag is empty", "Kurven din er tom")}
                </p>
                <p className="text-sm leading-6 text-ink/60 max-w-xs">
                  {pick(
                    locale,
                    "Add a product from the shop to get started.",
                    "Legg til et produkt fra butikken for å komme i gang."
                  )}
                </p>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto divide-y divide-ink/10">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 p-5">
                      <div className="relative w-20 h-20 shrink-0 bg-paper-deep overflow-hidden">
                        {item.imageUrl ? (
                          <Image
                            src={item.imageUrl}
                            alt={item.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-clay">
                          {item.brand}
                        </p>
                        <p className="font-display text-lg leading-tight tracking-[-0.02em] text-ink truncate">
                          {item.name}
                        </p>
                        <p className="mt-1 font-mono text-[12px] text-ink/80">
                          {formatNok(item.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <label
                            htmlFor={`qty-${item.id}`}
                            className="sr-only"
                          >
                            {pick(locale, "Quantity", "Antall")}
                          </label>
                          <select
                            id={`qty-${item.id}`}
                            value={item.qty}
                            onChange={(e) =>
                              setQty(item.id, Number(e.target.value))
                            }
                            className="border border-ink/15 bg-paper px-2 py-1 font-mono text-[12px] tracking-wide"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            className="ml-auto text-[12px] tracking-wide text-ink/60 hover:text-clay transition-colors underline underline-offset-4"
                          >
                            {pick(locale, "Remove", "Fjern")}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <footer className="border-t border-ink/10 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                      {pick(locale, "Subtotal", "Subtotal")}
                    </span>
                    <span className="font-mono text-[14px] text-ink">
                      {formatNok(subtotal)}
                    </span>
                  </div>
                  {items.length > 1 && (
                    <p className="text-[12px] leading-snug text-ink/60">
                      {multiVendorNote}
                    </p>
                  )}
                  <a
                    href={firstCheckoutUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={clsx(
                      "block w-full text-center h-12 leading-[3rem] bg-ink text-paper font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-clay transition-colors",
                      !firstCheckoutUrl &&
                        "pointer-events-none opacity-60"
                    )}
                  >
                    {checkoutLabel}
                  </a>
                  <button
                    type="button"
                    onClick={clear}
                    className="block w-full text-center text-[12px] tracking-wide text-ink/60 hover:text-ink transition-colors"
                  >
                    {pick(locale, "Empty bag", "Tøm kurv")}
                  </button>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
