"use client";

import { useState } from "react";
import { useLang } from "@/components/providers/LangProvider";

export function JournalSubscribe() {
  const { t } = useLang();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Mocked — log to console.
    console.log("[journal] subscribe:", email);
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="bg-ink text-cream">
      <div className="px-6 md:px-12 py-16 md:py-24 max-w-3xl mx-auto text-center">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-cream/60 mb-5">
          {t({ en: "Subscribe", no: "Abonner" })}
        </p>
        <h2 className="font-display text-4xl md:text-5xl tracking-display leading-display">
          {t({
            en: "Notes from the chair, once a month.",
            no: "Notater fra stolen, én gang i måneden.",
          })}
        </h2>
        <p className="mt-6 text-cream/70 text-base md:text-lg leading-snug max-w-xl mx-auto">
          {t({
            en: "New articles, new products on the shelf, and the occasional invitation to a meetup. No more often than that.",
            no: "Nye artikler, nye produkter på hylla, og av og til en invitasjon til en meetup. Ikke oftere enn det.",
          })}
        </p>

        {submitted ? (
          <p className="mt-10 font-mono text-[12px] tracking-[0.2em] uppercase text-terracotta-soft">
            {t({
              en: "Thanks — you're on the list.",
              no: "Takk — du er på lista.",
            })}
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <label className="sr-only" htmlFor="journal-email">
              {t({ en: "Email", no: "E-post" })}
            </label>
            <input
              id="journal-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t({
                en: "your@email.com",
                no: "din@epost.no",
              })}
              className="flex-1 h-12 px-4 bg-transparent border border-cream/30 text-cream placeholder:text-cream/40 focus:outline-none focus:border-cream"
            />
            <button
              type="submit"
              className="h-12 px-6 bg-cream text-ink text-[13px] tracking-wide hover:bg-terracotta hover:text-cream transition-colors"
            >
              {t({ en: "Subscribe", no: "Abonner" })}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
