"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";

export function StickyBookingCTA() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Reveal after the user has scrolled past ~85% of the first viewport
      const threshold = window.innerHeight * 0.85;
      // Hide near the very bottom (footer) so it doesn't sit on top of the dark footer
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        (window.scrollY + window.innerHeight);
      setVisible(window.scrollY > threshold && distanceFromBottom > 240);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-auto md:right-6 z-30 md:max-w-md"
        >
          <Link
            href="/booking"
            className="group flex items-center justify-between gap-4 bg-ink text-cream px-5 py-4 md:px-6 md:py-5 shadow-[0_18px_40px_-15px_rgba(26,22,18,0.5)] hover:bg-terracotta transition-colors"
          >
            <div className="flex flex-col">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cream/60">
                {t({
                  en: "Next available — Thu 16:30",
                  no: "Neste ledige — tor 16:30",
                })}
              </span>
              <span className="mt-1 text-[15px] tracking-tight">
                {t({
                  en: "Book a chair",
                  no: "Book en stol",
                })}
              </span>
            </div>
            <span
              className="inline-flex items-center justify-center w-9 h-9 border border-cream/30 group-hover:border-cream/70 transition-colors"
              aria-hidden
            >
              →
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
