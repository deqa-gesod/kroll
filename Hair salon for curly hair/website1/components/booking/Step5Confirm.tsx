"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useLang } from "@/components/providers/LangProvider";
import type { BookingState, Contact } from "@/lib/booking/reducer";
import { getServiceById } from "@/lib/booking/services";
import { getStylistById } from "@/lib/booking/stylists";
import { formatDayLabel } from "@/lib/booking/slots";
import { cn } from "@/lib/cn";
import { sendBookingEmail } from "@/lib/email";
import { downloadIcs, generateIcs } from "@/lib/ics";

type Props = {
  state: BookingState;
  onConfirm: (contact: Contact) => void;
  /** Called once the confirmation screen has been shown for "start over". */
  onStartOver: () => void;
};

// Norwegian phone validation: 8 digits, optional +47 prefix.
function isValidPhone(input: string): boolean {
  const cleaned = input.replace(/\s|-/g, "");
  return /^(\+47)?\d{8}$/.test(cleaned);
}

function isValidEmail(input: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

export function Step5Confirm({ state, onConfirm, onStartOver }: Props) {
  const { t, lang } = useLang();
  const [name, setName] = useState(state.contact?.name ?? "");
  const [email, setEmail] = useState(state.contact?.email ?? "");
  const [phone, setPhone] = useState(state.contact?.phone ?? "");
  const [touched, setTouched] = useState(false);

  const service = getServiceById(state.service);
  const stylist = getStylistById(state.stylist);
  const noPref = state.stylist === "no-preference";

  const nameValid = name.trim().length >= 2;
  const emailValid = isValidEmail(email.trim());
  const phoneValid = isValidPhone(phone.trim());
  const formValid = nameValid && emailValid && phoneValid;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!formValid) return;
    onConfirm({ name: name.trim(), email: email.trim(), phone: phone.trim() });
  }

  // Confirmation screen
  if (state.confirmed && state.bookingId) {
    return <ConfirmationSuccess state={state} onStartOver={onStartOver} />;
  }

  return (
    <div>
      <header className="mb-6 sm:mb-8">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
          {t({ en: "05 — Confirm", no: "05 — Bekreft" })}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-display leading-[1.05] max-w-2xl">
          {t({ en: "Last look.", no: "Siste sjekk." })}
        </h2>
      </header>

      {/* Summary */}
      <div className="bg-cream-deep/60 border border-line p-5 sm:p-6 mb-8">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-4">
          {t({ en: "Your booking", no: "Bookingen din" })}
        </p>
        <dl className="space-y-3 text-[14px]">
          {service && (
            <Row
              label={t({ en: "Service", no: "Tjeneste" })}
              value={
                <>
                  <span className="font-display text-[17px] tracking-tight">
                    {t(service.name)}
                  </span>
                  <span className="block font-mono text-[12px] text-ink-muted mt-0.5">
                    {t(service.duration)} — {t(service.price)}
                  </span>
                </>
              }
            />
          )}
          <Row
            label={t({ en: "Stylist", no: "Stylist" })}
            value={
              noPref ? (
                <span>{t({ en: "No preference", no: "Ingen preferanse" })}</span>
              ) : stylist ? (
                <>
                  <span className="font-display text-[17px] tracking-tight">
                    {stylist.name}
                  </span>
                  <span className="block text-[12px] text-ink-muted mt-0.5">
                    {t(stylist.shortSpecialty)}
                  </span>
                </>
              ) : null
            }
          />
          {state.date && state.time && (
            <Row
              label={t({ en: "When", no: "Når" })}
              value={
                <>
                  <span className="font-display text-[17px] tracking-tight">
                    {formatDayLabel(state.date, lang).weekday}{" "}
                    {formatDayLabel(state.date, lang).dayMonth}
                  </span>
                  <span className="block font-mono text-[12px] text-ink-muted mt-0.5">
                    {state.time}
                  </span>
                </>
              }
            />
          )}
          {state.intake && hasIntake(state.intake) && (
            <Row
              label={t({ en: "About you", no: "Om deg" })}
              value={
                <ul className="space-y-1 text-[13px] text-ink-soft">
                  {state.intake.curlType && (
                    <li>
                      {t({ en: "Curl pattern", no: "Krølletype" })}:{" "}
                      <span className="font-mono">
                        {state.intake.curlType === "unsure"
                          ? t({ en: "Not sure / mixed", no: "Usikker / blandet" })
                          : state.intake.curlType}
                      </span>
                    </li>
                  )}
                  {state.intake.porosity && (
                    <li>
                      {t({ en: "Porosity", no: "Porøsitet" })}:{" "}
                      <span className="capitalize">{state.intake.porosity}</span>
                    </li>
                  )}
                  {state.intake.lastChemicalService && (
                    <li>
                      {t({ en: "Last chemical", no: "Siste kjemiske" })}:{" "}
                      {state.intake.lastChemicalService}
                    </li>
                  )}
                  {state.intake.goals && (
                    <li>
                      {t({ en: "Goal", no: "Ønske" })}: {state.intake.goals}
                    </li>
                  )}
                  {state.intake.fears && (
                    <li>
                      {t({ en: "Nervous about", no: "Nervøs for" })}:{" "}
                      {state.intake.fears}
                    </li>
                  )}
                </ul>
              }
            />
          )}
          {state.isReturning && !state.intake && (
            <p className="text-[12px] text-ink-muted">
              {t({
                en: "Returning client — intake skipped.",
                no: "Tilbakevendende kunde — intake hoppet over.",
              })}
            </p>
          )}
        </dl>
      </div>

      {/* Contact form */}
      <form onSubmit={handleSubmit} noValidate>
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-4">
          {t({ en: "Your details", no: "Detaljene dine" })}
        </p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Field
            id="contact-name"
            label={t({ en: "Name", no: "Navn" })}
            value={name}
            onChange={setName}
            error={touched && !nameValid}
            errorMessage={t({
              en: "Please add your name.",
              no: "Vennligst skriv inn navnet ditt.",
            })}
            autoComplete="name"
          />
          <Field
            id="contact-email"
            label={t({ en: "Email", no: "E-post" })}
            value={email}
            onChange={setEmail}
            error={touched && !emailValid}
            errorMessage={t({
              en: "Please add a valid email.",
              no: "Vennligst skriv en gyldig e-postadresse.",
            })}
            autoComplete="email"
            type="email"
            inputMode="email"
          />
        </div>
        <div className="mb-6">
          <Field
            id="contact-phone"
            label={t({ en: "Phone (Norwegian)", no: "Telefon (norsk)" })}
            placeholder="+47 412 34 567"
            value={phone}
            onChange={setPhone}
            error={touched && !phoneValid}
            errorMessage={t({
              en: "8 digits, optionally with +47.",
              no: "8 siffer, eventuelt med +47.",
            })}
            hint={t({
              en: "We use this for the SMS reminder 24 hours before.",
              no: "Vi bruker det til SMS-påminnelsen 24 timer før.",
            })}
            autoComplete="tel"
            type="tel"
            inputMode="tel"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-[12px] text-ink-muted max-w-md">
            {t({
              en: "By confirming you accept our cancellation terms — change or cancel up to 24h before, no charge.",
              no: "Ved å bekrefte godtar du våre avbestillingsregler — endre eller avbestille inntil 24 timer før, uten gebyr.",
            })}
          </p>
          <button
            type="submit"
            className="h-12 px-7 bg-bookgreen text-cream text-[14px] tracking-wide hover:bg-bookgreen/90 transition-colors"
          >
            {t({ en: "Confirm booking", no: "Bekreft booking" })}
          </button>
        </div>
      </form>
    </div>
  );
}

function hasIntake(intake: BookingState["intake"]): boolean {
  if (!intake) return false;
  return Boolean(
    intake.curlType ||
      intake.porosity ||
      intake.lastChemicalService ||
      intake.goals ||
      intake.fears,
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line/70 last:border-b-0 pb-3 last:pb-0">
      <dt className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted shrink-0 pt-1">
        {label}
      </dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  errorMessage,
  hint,
  placeholder,
  autoComplete,
  type = "text",
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  errorMessage?: string;
  hint?: string;
  placeholder?: string;
  autoComplete?: string;
  type?: "text" | "email" | "tel";
  inputMode?: "text" | "email" | "tel" | "numeric";
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="block font-mono text-[11px] tracking-[0.15em] uppercase text-ink-muted mb-2">
        {label}
      </span>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={cn(
          "w-full h-12 px-4 bg-cream-deep/40 border text-ink placeholder:text-ink-muted/70 focus:outline-none transition-colors text-[14px]",
          error
            ? "border-terracotta focus:border-terracotta"
            : "border-line focus:border-ink",
        )}
      />
      {error && errorMessage ? (
        <span className="block mt-1 text-[12px] text-terracotta-deep">{errorMessage}</span>
      ) : hint ? (
        <span className="block mt-1 text-[12px] text-ink-muted">{hint}</span>
      ) : null}
    </label>
  );
}

function ConfirmationSuccess({
  state,
  onStartOver,
}: {
  state: BookingState;
  onStartOver: () => void;
}) {
  const { t, lang } = useLang();
  const service = getServiceById(state.service);
  const stylist = getStylistById(state.stylist);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const customerEmail = state.contact?.email ?? "";
  const customerPhone = state.contact?.phone ?? "";
  const serviceLabel = service ? t(service.name) : "";
  const stylistLabel = stylist
    ? stylist.name
    : t({ en: "No preference", no: "Ingen preferanse" });
  const timeLabel =
    state.date && state.time
      ? `${formatDayLabel(state.date, lang).weekday} ${formatDayLabel(state.date, lang).dayMonth} ${state.time}`
      : "";

  async function handleSendEmail() {
    if (!customerEmail || emailSending) return;
    setEmailSending(true);
    try {
      await sendBookingEmail({
        bookingId: state.bookingId ?? "",
        service: serviceLabel,
        stylist: stylistLabel,
        time: timeLabel,
        curlType: state.intake?.curlType,
        customerEmail,
        customerPhone: customerPhone || undefined,
      });
      setEmailSent(true);
    } finally {
      setEmailSending(false);
    }
  }

  function handleAddToCalendar() {
    if (!state.date || !state.time) return;
    // Parse "HH:MM" against the ISO date. Slot times are Europe/Oslo local;
    // we approximate as Oslo's offset from UTC. For prototype purposes we
    // treat the slot as UTC+1 (winter) / +2 (summer) by relying on the local
    // Date constructor — accurate enough for an .ics that lands in Google
    // Calendar, which then re-anchors to the user's TZ.
    const [h, m] = state.time.split(":").map((n) => Number.parseInt(n, 10));
    const start = new Date(`${state.date}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00`);
    // duration is a labeled string like "75 min" or "from 120 min"; extract digits
    const durMatch = service ? /(\d+)/.exec(t(service.duration)) : null;
    const duration = durMatch ? Number.parseInt(durMatch[1], 10) : 60;
    const ics = generateIcs({
      bookingId: state.bookingId ?? "JC-0000-XXXX",
      service: serviceLabel,
      stylist: stylistLabel,
      startTime: start,
      durationMinutes: duration,
      customerEmail: customerEmail || "guest@jacksonandcoil.no",
    });
    downloadIcs(`jackson-coil-${state.bookingId ?? "booking"}.ics`, ics);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="bg-bookgreen text-cream p-7 sm:p-9 mb-8">
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-cream/70 mb-3">
          {t({ en: "Booked", no: "Booket" })}
        </p>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-display leading-[1.05]">
          {t({
            en: "You're in. See you soon.",
            no: "Det er i boks. Vi sees snart.",
          })}
        </h2>
        <p className="mt-4 text-cream/85 max-w-lg leading-snug">
          {customerEmail
            ? t({
                en: `A copy is on its way to ${customerEmail}. We'll send a reminder by SMS 24 hours before.`,
                no: `En kopi er på vei til ${customerEmail}. Vi sender en SMS-påminnelse 24 timer før.`,
              })
            : t({
                en: "We'll send a reminder by SMS 24 hours before.",
                no: "Vi sender en SMS-påminnelse 24 timer før.",
              })}
        </p>
        <p className="mt-6 font-mono text-[13px] tracking-wide">
          {t({ en: "Booking ref", no: "Bookingref." })}{" "}
          <span className="text-cream" data-testid="booking-id">{state.bookingId}</span>
        </p>
      </div>

      {/* Email + calendar actions */}
      <div
        data-testid="confirmation-actions"
        className="bg-cream-deep/60 border border-line p-5 sm:p-6 mb-8"
      >
        <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-3">
          {t({ en: "Confirmation", no: "Bekreftelse" })}
        </p>
        <p className="text-[14px] text-ink-soft max-w-xl leading-snug">
          {t({
            en: "Send yourself a copy of the booking, or drop it straight into your calendar.",
            no: "Send deg selv en kopi av bookingen, eller legg den rett i kalenderen.",
          })}
        </p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={handleSendEmail}
            disabled={!customerEmail || emailSending || emailSent}
            data-testid="send-confirmation"
            className={cn(
              "h-12 px-6 text-[13px] tracking-wide transition-colors border",
              emailSent
                ? "bg-bookgreen text-cream border-bookgreen cursor-default"
                : "bg-ink text-cream border-ink hover:bg-ink/90 disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {emailSent
              ? t({ en: "Sent", no: "Sendt" })
              : emailSending
                ? t({ en: "Sending…", no: "Sender…" })
                : t({ en: "Send me a copy", no: "Send kopi til meg" })}
          </button>
          <button
            type="button"
            onClick={handleAddToCalendar}
            data-testid="add-to-calendar"
            className="h-12 px-6 border border-ink text-[13px] tracking-wide hover:bg-ink hover:text-cream transition-colors"
          >
            {t({ en: "Add to calendar", no: "Legg til i kalender" })}
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="bg-cream-deep/60 border border-line p-5">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-2">
            {t({ en: "When", no: "Når" })}
          </p>
          <p className="font-display text-2xl tracking-tight">
            {state.date && formatDayLabel(state.date, lang).weekday}{" "}
            {state.date && formatDayLabel(state.date, lang).dayMonth}
          </p>
          <p className="font-mono text-[14px] mt-1">{state.time}</p>
          <p className="text-[13px] text-ink-soft mt-3">
            {service && t(service.name)}
            {stylist ? ` — ${stylist.name}` : ""}
          </p>
        </div>

        {/* Mock map preview */}
        <div className="bg-cream-deep/60 border border-line p-5">
          <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted mb-2">
            {t({ en: "Where", no: "Hvor" })}
          </p>
          <p className="font-display text-2xl tracking-tight">Markveien 35</p>
          <p className="text-[13px] text-ink-soft mt-1">
            {t({ en: "0554 Oslo, Grünerløkka", no: "0554 Oslo, Grünerløkka" })}
          </p>
          <div
            aria-hidden
            className="mt-4 h-24 bg-cream relative overflow-hidden border border-line"
          >
            {/* stylized map block — terracotta dot at center */}
            <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(0deg,transparent_24%,rgba(180,165,140,.18)_25%,rgba(180,165,140,.18)_26%,transparent_27%,transparent_74%,rgba(180,165,140,.18)_75%,rgba(180,165,140,.18)_76%,transparent_77%),linear-gradient(90deg,transparent_24%,rgba(180,165,140,.18)_25%,rgba(180,165,140,.18)_26%,transparent_27%,transparent_74%,rgba(180,165,140,.18)_75%,rgba(180,165,140,.18)_76%,transparent_77%)] [background-size:24px_24px]" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-terracotta ring-4 ring-terracotta/20" />
          </div>
          <p className="mt-3 text-[12px] text-ink-muted">
            {t({
              en: "Trams 11, 12, 13 — Olaf Ryes plass, two minutes away.",
              no: "Trikk 11, 12 og 13 — Olaf Ryes plass, to minutter unna.",
            })}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          className="h-12 px-7 border border-ink text-[13px] tracking-wide hover:bg-ink hover:text-cream transition-colors"
        >
          {t({ en: "Reschedule", no: "Endre tid" })}
        </button>
        <button
          type="button"
          onClick={onStartOver}
          className="h-12 px-7 text-ink-muted text-[13px] tracking-wide hover:text-ink transition-colors underline underline-offset-4 sm:ml-auto"
        >
          {t({ en: "Book another", no: "Book en til" })}
        </button>
      </div>
    </motion.div>
  );
}
