"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCart } from "@/lib/cart/useCart";
import { useCartUI } from "@/lib/cart/useCartUI";
import { useLang } from "@/components/providers/LangProvider";
import { cn } from "@/lib/cn";

function formatNok(n: number) {
  return `${n.toLocaleString("nb-NO")} kr`;
}

export function CartDrawer() {
  const { items, subtotal, remove, setQty, clear } = useCart();
  const { isOpen, close } = useCartUI();
  const { t } = useLang();

  // Close on Escape.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [isOpen]);

  const firstCheckoutUrl = items[0]?.externalCheckoutUrl;
  const checkoutLabel = t({
    en: "Continue to external store",
    no: "Fortsett til ekstern butikk",
  });
  const multiVendorNote = t({
    en: "You will be sent to the first vendor. The remaining items stay saved in your bag.",
    no: "Du blir sendt til den første leverandøren. Andre produkter ligger lagret i kurven.",
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60]">
          <motion.button
            type="button"
            aria-label={t({ en: "Close cart", no: "Lukk kurv" })}
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
            aria-label={t({ en: "Your bag", no: "Din pose" })}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-0 right-0 h-full w-full sm:w-[420px] bg-cream text-ink shadow-2xl flex flex-col"
          >
            <header className="flex items-center justify-between h-16 px-5 border-b border-line">
              <h2 className="font-display text-2xl tracking-display">
                {t({ en: "Your bag", no: "Din pose" })}
              </h2>
              <button
                type="button"
                onClick={close}
                aria-label={t({ en: "Close", no: "Lukk" })}
                className="text-ink-soft hover:text-ink transition-colors font-mono text-[12px] tracking-[0.2em] uppercase"
              >
                {t({ en: "Close", no: "Lukk" })}
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-4">
                <p className="font-display text-3xl tracking-display text-ink-soft">
                  {t({
                    en: "Your bag is empty",
                    no: "Kurven din er tom",
                  })}
                </p>
                <p className="text-sm text-ink-muted max-w-xs">
                  {t({
                    en: "Add a product from the shop to get started.",
                    no: "Legg til et produkt fra butikken for å komme i gang.",
                  })}
                </p>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto divide-y divide-line">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 p-5">
                      <div className="relative w-20 h-20 shrink-0 bg-cream-deep overflow-hidden">
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
                        <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink-muted">
                          {item.brand}
                        </p>
                        <p className="font-display text-lg tracking-tight leading-tight text-ink truncate">
                          {item.name}
                        </p>
                        <p className="mt-1 font-mono text-[13px] text-ink">
                          {formatNok(item.price)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <label
                            htmlFor={`qty-${item.id}`}
                            className="sr-only"
                          >
                            {t({ en: "Quantity", no: "Antall" })}
                          </label>
                          <select
                            id={`qty-${item.id}`}
                            value={item.qty}
                            onChange={(e) =>
                              setQty(item.id, Number(e.target.value))
                            }
                            className="border border-line bg-cream px-2 py-1 font-mono text-[12px] tracking-wide"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                          </select>
                          <button
                            type="button"
                            onClick={() => remove(item.id)}
                            className="ml-auto text-[12px] tracking-wide text-ink-muted hover:text-terracotta-deep transition-colors underline underline-offset-4"
                          >
                            {t({ en: "Remove", no: "Fjern" })}
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <footer className="border-t border-line p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
                      {t({ en: "Subtotal", no: "Subtotal" })}
                    </span>
                    <span className="font-mono text-[14px] text-ink">
                      {formatNok(subtotal)}
                    </span>
                  </div>
                  {items.length > 1 && (
                    <p className="text-[12px] leading-snug text-ink-muted">
                      {multiVendorNote}
                    </p>
                  )}
                  <a
                    href={firstCheckoutUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "block w-full text-center h-12 leading-[3rem] bg-ink text-cream text-[13px] tracking-wide hover:bg-terracotta transition-colors",
                      !firstCheckoutUrl &&
                        "pointer-events-none opacity-60"
                    )}
                  >
                    {checkoutLabel}
                  </a>
                  <button
                    type="button"
                    onClick={clear}
                    className="block w-full text-center text-[12px] tracking-wide text-ink-muted hover:text-ink transition-colors"
                  >
                    {t({ en: "Empty bag", no: "Tøm kurv" })}
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
