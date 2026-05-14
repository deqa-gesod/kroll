"use client";

import { useLang } from "@/components/providers/LangProvider";
import { cn } from "@/lib/cn";
import type { Step } from "@/lib/booking/reducer";

const STEP_LABELS: Record<Step, { en: string; no: string }> = {
  1: { en: "Service", no: "Tjeneste" },
  2: { en: "Stylist", no: "Stylist" },
  3: { en: "Date & time", no: "Dato og tid" },
  4: { en: "About you", no: "Om deg" },
  5: { en: "Confirm", no: "Bekreft" },
};

type Props = {
  step: Step;
  onStepClick?: (step: Step) => void;
  /** Highest step the user has actually reached (so they can jump back). */
  furthest?: Step;
};

export function ProgressBar({ step, onStepClick, furthest = step }: Props) {
  const { t } = useLang();
  const total = 5;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
          {t({ en: "Step", no: "Steg" })}{" "}
          <span className="text-ink">{step}</span>
          <span className="text-ink-muted">/{total}</span>
          <span className="hidden sm:inline ml-3 text-ink">
            {t(STEP_LABELS[step])}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {([1, 2, 3, 4, 5] as Step[]).map((i) => {
          const reached = i <= step;
          const isFurther = i <= furthest;
          const isCurrent = i === step;
          const clickable = !!onStepClick && isFurther && !isCurrent;
          return (
            <button
              key={i}
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onStepClick(i)}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`${t({ en: "Step", no: "Steg" })} ${i}: ${t(STEP_LABELS[i])}`}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                reached ? "bg-bookgreen" : "bg-line",
                clickable && "cursor-pointer hover:opacity-80",
                !clickable && "cursor-default",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
