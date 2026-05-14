"use client";

import { useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import { CURL_TYPES } from "@/components/curl-type-filter/CurlTypeFilter";
import type { CurlType, Intake, Porosity } from "@/lib/booking/reducer";
import { cn } from "@/lib/cn";

type Props = {
  initial?: Intake;
  onSkip: () => void;
  onSubmit: (intake: Intake) => void;
};

const POROSITY_OPTIONS: {
  value: Porosity;
  label: { en: string; no: string };
  hint: { en: string; no: string };
}[] = [
  {
    value: "low",
    label: { en: "Low", no: "Lav" },
    hint: {
      en: "Water beads on your hair. Products take a while to absorb.",
      no: "Vann legger seg som perler på håret. Produkter trekker sakte inn.",
    },
  },
  {
    value: "normal",
    label: { en: "Normal", no: "Normal" },
    hint: {
      en: "Hair holds moisture without feeling dry or weighed down.",
      no: "Håret holder fukt uten å bli tørt eller tungt.",
    },
  },
  {
    value: "high",
    label: { en: "High", no: "Høy" },
    hint: {
      en: "Hair drinks water fast and dries fast. Frizz comes easy.",
      no: "Håret tar imot vann fort og tørker fort. Krus kommer lett.",
    },
  },
  {
    value: "unsure",
    label: { en: "Not sure", no: "Usikker" },
    hint: {
      en: "Most common. Your stylist will read it on the day.",
      no: "Det vanligste svaret. Stylisten leser det på dagen.",
    },
  },
];

export function Step4Intake({ initial, onSkip, onSubmit }: Props) {
  const { t } = useLang();
  const [curlType, setCurlType] = useState<CurlType | undefined>(initial?.curlType);
  const [porosity, setPorosity] = useState<Porosity | undefined>(initial?.porosity);
  const [last, setLast] = useState(initial?.lastChemicalService ?? "");
  const [goals, setGoals] = useState(initial?.goals ?? "");
  const [fears, setFears] = useState(initial?.fears ?? "");

  function handleSubmit() {
    onSubmit({
      curlType,
      porosity,
      lastChemicalService: last.trim() || undefined,
      goals: goals.trim() || undefined,
      fears: fears.trim() || undefined,
    });
  }

  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted">
            {t({ en: "04 — About you", no: "04 — Om deg" })}
          </p>
          <button
            type="button"
            onClick={onSkip}
            className="text-[13px] text-ink-soft hover:text-ink underline underline-offset-4"
          >
            {t({ en: "Skip — I've been before", no: "Hopp over — jeg har vært her før" })}
          </button>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-display leading-[1.05] max-w-2xl">
          {t({
            en: "A few things, before you sit down.",
            no: "Et par ting, før du setter deg.",
          })}
        </h2>
        <p className="mt-3 text-ink-soft max-w-xl text-[15px] leading-snug">
          {t({
            en: "Optional, but every answer makes the chair time better. Two minutes, then we're done.",
            no: "Frivillig, men hvert svar gjør tida i stolen bedre. To minutter, så er vi ferdige.",
          })}
        </p>
      </header>

      {/* Curl type */}
      <section className="mb-8">
        <label className="block mb-3">
          <span className="font-display text-xl tracking-tight">
            {t({ en: "Your curl pattern", no: "Krølle-mønsteret ditt" })}
          </span>
          <span className="block mt-1 text-[13px] text-ink-muted leading-snug">
            {t({
              en: "Andre Walker scale. Pick the closest, or leave blank.",
              no: "Andre Walker-skalaen. Velg det nærmeste, eller la stå tomt.",
            })}
          </span>
        </label>
        <div className="flex flex-wrap gap-2">
          {CURL_TYPES.map((type) => {
            const isActive = curlType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setCurlType(isActive ? undefined : type)}
                aria-pressed={isActive}
                className={cn(
                  "h-10 px-4 font-mono text-[13px] tracking-wide border transition-colors",
                  isActive
                    ? "bg-bookgreen text-cream border-bookgreen"
                    : "bg-transparent text-ink-soft border-line hover:border-ink hover:text-ink",
                )}
              >
                {type}
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => setCurlType(curlType === "unsure" ? undefined : "unsure")}
            aria-pressed={curlType === "unsure"}
            className={cn(
              "h-10 px-4 font-mono text-[12px] tracking-wide uppercase border transition-colors",
              curlType === "unsure"
                ? "bg-bookgreen text-cream border-bookgreen"
                : "bg-transparent text-ink-soft border-line hover:border-ink hover:text-ink",
            )}
          >
            {t({ en: "Not sure / mixed", no: "Usikker / blandet" })}
          </button>
        </div>
      </section>

      {/* Porosity */}
      <section className="mb-8">
        <label className="block mb-3">
          <span className="font-display text-xl tracking-tight">
            {t({ en: "Porosity", no: "Porøsitet" })}
          </span>
          <span className="block mt-1 text-[13px] text-ink-muted leading-snug">
            {t({
              en: "How fast your hair takes in water. We'll tell you on the day if you're not sure.",
              no: "Hvor fort håret ditt tar imot vann. Vi forteller deg det på dagen om du ikke vet.",
            })}
          </span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {POROSITY_OPTIONS.map((opt) => {
            const isActive = porosity === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPorosity(isActive ? undefined : opt.value)}
                aria-pressed={isActive}
                className={cn(
                  "text-left p-4 border transition-colors",
                  isActive
                    ? "bg-bookgreen text-cream border-bookgreen"
                    : "bg-cream-deep/60 border-line hover:border-ink",
                )}
              >
                <p className="font-display text-[18px] tracking-tight">
                  {t(opt.label)}
                </p>
                <p
                  className={cn(
                    "mt-1 text-[12px] leading-snug",
                    isActive ? "text-cream/80" : "text-ink-muted",
                  )}
                >
                  {t(opt.hint)}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Last chemical service */}
      <section className="mb-8">
        <label htmlFor="intake-last" className="block mb-3">
          <span className="font-display text-xl tracking-tight">
            {t({ en: "Last chemical service", no: "Siste kjemiske behandling" })}
          </span>
          <span className="block mt-1 text-[13px] text-ink-muted leading-snug">
            {t({
              en: "Color, bleach, relaxer, perm — when, and what. Or just write 'none'.",
              no: "Farge, bleking, relaxer, perm — når, og hva. Eller bare skriv 'ingen'.",
            })}
          </span>
        </label>
        <input
          id="intake-last"
          type="text"
          value={last}
          onChange={(e) => setLast(e.target.value)}
          placeholder={t({
            en: "e.g. Balayage, March 2024",
            no: "f.eks. balayage, mars 2024",
          })}
          className="w-full h-12 px-4 bg-cream-deep/40 border border-line text-ink placeholder:text-ink-muted/70 focus:outline-none focus:border-ink transition-colors text-[14px]"
        />
      </section>

      {/* Goals */}
      <section className="mb-8">
        <label htmlFor="intake-goals" className="block mb-3">
          <span className="font-display text-xl tracking-tight">
            {t({ en: "What you'd like", no: "Hva du ønsker" })}
          </span>
          <span className="block mt-1 text-[13px] text-ink-muted leading-snug">
            {t({
              en: "Optional. A reference, a feeling, a length, anything.",
              no: "Frivillig. En referanse, en følelse, en lengde, hva som helst.",
            })}
          </span>
        </label>
        <textarea
          id="intake-goals"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          rows={3}
          placeholder={t({
            en: "Shoulder-length, more definition, less weight on the canopy…",
            no: "Skulderlengde, mer definisjon, mindre tyngde på toppen…",
          })}
          className="w-full px-4 py-3 bg-cream-deep/40 border border-line text-ink placeholder:text-ink-muted/70 focus:outline-none focus:border-ink transition-colors text-[14px] leading-snug resize-y"
        />
      </section>

      {/* Fears — Amara's question */}
      <section className="mb-8">
        <label htmlFor="intake-fears" className="block mb-3">
          <span className="font-display text-xl tracking-tight">
            {t({
              en: "What are you nervous about?",
              no: "Hva er du nervøs for?",
            })}
          </span>
          <span className="block mt-1 text-[13px] text-ink-muted leading-snug">
            {t({
              en: "Optional, but really helpful. Last bad cut, a stylist who didn't know your hair, anything you want us to know before scissors come out.",
              no: "Frivillig, men veldig nyttig. En dårlig klipp sist, en stylist som ikke kjente håret ditt, eller noe annet du vil vi skal vite før saksen kommer fram.",
            })}
          </span>
        </label>
        <textarea
          id="intake-fears"
          value={fears}
          onChange={(e) => setFears(e.target.value)}
          rows={3}
          placeholder={t({
            en: "Last salon thinned the canopy and it took a year to grow back…",
            no: "Forrige salong tynnet toppen og det tok ett år å vokse ut igjen…",
          })}
          className="w-full px-4 py-3 bg-cream-deep/40 border border-line text-ink placeholder:text-ink-muted/70 focus:outline-none focus:border-ink transition-colors text-[14px] leading-snug resize-y"
        />
      </section>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-[12px] text-ink-muted">
          {t({
            en: "All optional. Skip what you don't have an answer for.",
            no: "Alt er frivillig. Hopp over det du ikke har svar på.",
          })}
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className="h-12 px-7 bg-bookgreen text-cream text-[14px] tracking-wide hover:bg-bookgreen/90 transition-colors"
        >
          {t({ en: "Continue", no: "Fortsett" })}
        </button>
      </div>
    </div>
  );
}
