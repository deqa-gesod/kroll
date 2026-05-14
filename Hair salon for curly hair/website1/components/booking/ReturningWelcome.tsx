"use client";

import { motion } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";

type Props = {
  /** Mock client name */
  name: string;
  /** Service display name (already localized) */
  serviceName: string;
  /** Stylist first name */
  stylistFirstName: string;
  /** Last visit, free-text (already localized) */
  lastVisit: string;
  onRebook: () => void;
  onDismiss: () => void;
};

export function ReturningWelcome({
  name,
  serviceName,
  stylistFirstName,
  lastVisit,
  onRebook,
  onDismiss,
}: Props) {
  const { t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="bg-bookgreen text-cream px-5 sm:px-7 py-6 sm:py-7 mb-8"
    >
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/70 mb-3">
        {t({ en: "Welcome back", no: "Velkommen tilbake" })}
      </p>
      <p className="font-display text-2xl sm:text-[28px] tracking-tight leading-tight">
        {t({
          en: `${name}, ${serviceName} with ${stylistFirstName}.`,
          no: `${name}, ${serviceName} med ${stylistFirstName}.`,
        })}
      </p>
      <p className="mt-2 text-cream/80 text-[15px] leading-snug">
        {t({
          en: `Last visit ${lastVisit}. Book the same again, next available slot.`,
          no: `Sist besøk ${lastVisit}. Book det samme igjen, neste ledige tid.`,
        })}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onRebook}
          className="inline-flex h-11 px-6 items-center bg-cream text-ink text-[13px] tracking-wide font-medium hover:bg-terracotta hover:text-cream transition-colors"
        >
          {t({ en: "Rebook in one tap", no: "Rebook med ett trykk" })}
        </button>
        <button
          type="button"
          onClick={onDismiss}
          className="inline-flex h-11 px-5 items-center text-cream/80 text-[13px] tracking-wide hover:text-cream transition-colors underline underline-offset-4"
        >
          {t({ en: "Book something different", no: "Book noe annet" })}
        </button>
      </div>
    </motion.div>
  );
}
