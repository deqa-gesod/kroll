"use client";

import { useMemo, useState } from "react";
import { useLang } from "@/components/providers/LangProvider";
import {
  generateAvailability,
  findNextAvailable,
  formatDayLabel,
} from "@/lib/booking/slots";
import { cn } from "@/lib/cn";

type Props = {
  stylistId?: string;
  selectedDate?: string;
  selectedTime?: string;
  onConfirm: (date: string, time: string) => void;
};

export function Step3DateTime({
  stylistId,
  selectedDate,
  selectedTime,
  onConfirm,
}: Props) {
  const { t, lang } = useLang();

  // Generate the next-14-days schedule once per stylist (deterministic seed).
  // useMemo keeps it pure — no setState-in-effect hazard.
  const days = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    return generateAvailability(start, 14, stylistId);
  }, [stylistId]);

  const nextAvailable = useMemo(() => findNextAvailable(days), [days]);

  const [activeDate, setActiveDate] = useState<string | undefined>(
    selectedDate ?? nextAvailable?.date,
  );
  const [activeTime, setActiveTime] = useState<string | undefined>(selectedTime);

  const activeDay = useMemo(
    () => days.find((d) => d.date === activeDate),
    [days, activeDate],
  );

  function handleConfirm() {
    if (activeDate && activeTime) onConfirm(activeDate, activeTime);
  }

  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
          {t({ en: "03 — Date & time", no: "03 — Dato og tid" })}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-display leading-[1.05] max-w-2xl">
          {t({ en: "Pick a slot.", no: "Velg en tid." })}
        </h2>
        <p className="mt-3 text-ink-soft max-w-xl text-[15px] leading-snug">
          {t({
            en: "Real availability, the next 14 days. Closed Sundays and Mondays. Thursday evenings run late.",
            no: "Faktisk tilgjengelighet, neste 14 dager. Stengt søndag og mandag. Torsdag kveld er åpent lenger.",
          })}
        </p>
      </header>

      {/* Next available pill */}
      {nextAvailable && (
        <button
          type="button"
          onClick={() => {
            setActiveDate(nextAvailable.date);
            setActiveTime(nextAvailable.time);
          }}
          className="inline-flex items-center gap-3 mb-6 px-4 h-10 border border-bookgreen text-bookgreen hover:bg-bookgreen hover:text-cream transition-colors text-[13px]"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
            {t({ en: "Next available", no: "Neste ledige" })}
          </span>
          <span className="font-mono">
            {formatDayLabel(nextAvailable.date, lang).dayMonth}
            {" — "}
            {nextAvailable.time}
          </span>
        </button>
      )}

      {/* Day strip — horizontal scroll on mobile */}
      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-3">
        {t({ en: "Day", no: "Dag" })}
      </p>
      <div className="-mx-6 px-6 sm:-mx-10 sm:px-10 overflow-x-auto pb-2 mb-6">
        <div className="flex gap-2 min-w-max">
          {days.map((d) => {
            const labels = formatDayLabel(d.date, lang);
            const isActive = d.date === activeDate;
            const isClosed = d.closed || d.slots.length === 0;
            return (
              <button
                key={d.date}
                type="button"
                disabled={isClosed}
                onClick={() => {
                  setActiveDate(d.date);
                  setActiveTime(undefined);
                }}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 w-[68px] sm:w-[76px] py-3 px-2 border text-center transition-colors",
                  isClosed && "opacity-40 cursor-not-allowed",
                  !isClosed && isActive
                    ? "bg-bookgreen text-cream border-bookgreen"
                    : !isClosed && "bg-cream-deep/60 border-line hover:border-ink",
                )}
              >
                <p
                  className={cn(
                    "font-mono text-[10px] tracking-[0.2em] uppercase mb-1",
                    isActive ? "text-cream/70" : "text-ink-muted",
                  )}
                >
                  {labels.weekday}
                </p>
                <p className="font-display text-[18px] tracking-tight leading-none">
                  {labels.dayMonth}
                </p>
                {isClosed ? (
                  <p
                    className={cn(
                      "mt-1 font-mono text-[10px] tracking-wide",
                      "text-ink-muted",
                    )}
                  >
                    {t({ en: "Closed", no: "Stengt" })}
                  </p>
                ) : (
                  <p
                    className={cn(
                      "mt-1 font-mono text-[10px] tracking-wide",
                      isActive ? "text-cream/70" : "text-ink-muted",
                    )}
                  >
                    {d.slots.length} {t({ en: "open", no: "ledig" })}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {activeDay && !activeDay.closed && (
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-3">
            {t({ en: "Time", no: "Tid" })}
          </p>
          {activeDay.slots.length === 0 ? (
            <p className="text-ink-muted text-[14px]">
              {t({
                en: "Fully booked. Try the next day or join the waitlist.",
                no: "Fullbooket. Prøv neste dag eller bli med på venteliste.",
              })}
            </p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {activeDay.slots.map((time) => {
                const isActive = time === activeTime;
                return (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setActiveTime(time)}
                    aria-pressed={isActive}
                    className={cn(
                      "h-12 font-mono text-[14px] border transition-colors",
                      isActive
                        ? "bg-bookgreen text-cream border-bookgreen"
                        : "bg-cream-deep/40 border-line hover:border-ink text-ink",
                    )}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Confirm bar */}
      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="font-mono text-[12px] text-ink-muted">
          {activeDate && activeTime ? (
            <>
              <span className="text-ink">
                {formatDayLabel(activeDate, lang).weekday}{" "}
                {formatDayLabel(activeDate, lang).dayMonth}
              </span>
              {" — "}
              <span className="text-ink">{activeTime}</span>
            </>
          ) : (
            t({ en: "Pick a day, then a time.", no: "Velg dag, så tid." })
          )}
        </p>
        <button
          type="button"
          disabled={!activeDate || !activeTime}
          onClick={handleConfirm}
          className={cn(
            "h-12 px-7 text-[14px] tracking-wide transition-colors",
            activeDate && activeTime
              ? "bg-bookgreen text-cream hover:bg-bookgreen/90 cursor-pointer"
              : "bg-line/60 text-ink-muted cursor-not-allowed",
          )}
        >
          {t({ en: "Continue", no: "Fortsett" })}
        </button>
      </div>
    </div>
  );
}
