"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { useCart, type CartItem } from "@/lib/cart/useCart";
import { useLanguage } from "@/components/language-provider";

type AddToBagButtonProps = {
  product: Omit<CartItem, "qty">;
  label?: string;
  className?: string;
};

function pick(locale: "en" | "no", en: string, no: string) {
  return locale === "no" ? no : en;
}

export function AddToBagButton({
  product,
  label,
  className,
}: AddToBagButtonProps) {
  const { add } = useCart();
  const { locale } = useLanguage();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const id = window.setTimeout(() => setJustAdded(false), 1400);
    return () => window.clearTimeout(id);
  }, [justAdded]);

  const defaultLabel = pick(locale, "Add to bag", "Legg i pose");
  const buttonLabel = label ?? defaultLabel;
  const addedLabel = pick(locale, "Added", "Lagt til");

  return (
    <button
      type="button"
      onClick={() => {
        add(product);
        setJustAdded(true);
      }}
      aria-label={buttonLabel}
      className={clsx(
        "relative inline-flex items-center justify-center h-10 px-5 bg-ink text-paper font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-clay transition-colors overflow-hidden",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {justAdded ? (
          <motion.span
            key="added"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {addedLabel}
          </motion.span>
        ) : (
          <motion.span
            key="label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {buttonLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
