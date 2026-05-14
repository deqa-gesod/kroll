"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useCart, type CartItem } from "@/lib/cart/useCart";
import { useLang } from "@/components/providers/LangProvider";
import { cn } from "@/lib/cn";

type AddToBagButtonProps = {
  product: Omit<CartItem, "qty">;
  label?: string;
  className?: string;
};

export function AddToBagButton({
  product,
  label,
  className,
}: AddToBagButtonProps) {
  const { add } = useCart();
  const { t } = useLang();
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!justAdded) return;
    const id = window.setTimeout(() => setJustAdded(false), 1400);
    return () => window.clearTimeout(id);
  }, [justAdded]);

  const defaultLabel = t({ en: "Add to bag", no: "Legg i pose" });
  const buttonLabel = label ?? defaultLabel;

  return (
    <button
      type="button"
      onClick={() => {
        add(product);
        setJustAdded(true);
      }}
      aria-label={buttonLabel}
      className={cn(
        "relative h-9 px-4 bg-ink text-cream text-[12px] tracking-wide hover:bg-terracotta transition-colors overflow-hidden",
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
            {t({ en: "Added", no: "Lagt til" })}
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
