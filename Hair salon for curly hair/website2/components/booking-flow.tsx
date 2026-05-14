"use client";

import Image from "next/image";
import { ArrowRight, Check, Clock, Scissors, Sparkle } from "@phosphor-icons/react";
import { useEffect, useMemo, useState } from "react";
import { curlTypes } from "@/lib/content";
import { useCopy } from "@/components/language-provider";
import { sendBookingEmail } from "@/lib/email";
import { downloadIcs, generateIcs } from "@/lib/ics";

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function BookingFlow() {
  const copy = useCopy();
  const serviceText = copy.serviceNames as Record<string, readonly [string, string]>;
  const stylistText = copy.stylistNames as Record<string, readonly [string, string]>;
  const slots = copy.booking.slots;
  const [step, setStep] = useState(0);
  const [service, setService] = useState("first");
  const [stylist, setStylist] = useState("any");
  const [slot, setSlot] = useState<string>(slots[0]);
  const [curlType, setCurlType] = useState("4B");
  const [porosity, setPorosity] = useState("medium");
  const [lastChemical, setLastChemical] = useState("");
  const [want, setWant] = useState("");
  const [scared, setScared] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("JC-0000-0000-AAA");
  const [emailSent, setEmailSent] = useState(false);
  const [emailSending, setEmailSending] = useState(false);

  const emailValid = useMemo(() => isValidEmail(email), [email]);

  useEffect(() => {
    setSlot(slots[0]);
  }, [slots]);

  useEffect(() => {
    setBookingId(generateBookingId());
  }, []);

  const selectedService = copy.services.find((item) => item.id === service) ?? copy.services[0];
  const selectedStylist = copy.stylists.find((item) => item.id === stylist) ?? copy.stylists[0];
  const selectedServiceText = serviceText[selectedService.id];
  const selectedStylistText = stylistText[selectedStylist.id];

  function bookReturningClient() {
    setService("sculpt");
    setStylist("vanessa");
    setSlot(slots[0]);
    setCurlType("4A");
    if (!email) setEmail("daniel@example.no");
    setConfirmed(true);
  }

  async function handleSendConfirmation() {
    if (!emailValid || emailSending) return;
    setEmailSending(true);
    try {
      await sendBookingEmail({
        bookingId,
        service: selectedServiceText[0],
        stylist: selectedStylistText[0],
        time: slot,
        curlType,
        customerEmail: email.trim(),
        customerPhone: phone.trim() || undefined,
      });
      setEmailSent(true);
    } finally {
      setEmailSending(false);
    }
  }

  function handleAddToCalendar() {
    // Slots are display strings like "Tir 18:30" — parse "HH:MM" and anchor
    // to the next matching weekday from now. For the prototype we use the
    // next future occurrence of that time.
    const timeMatch = /(\d{1,2}):(\d{2})/.exec(slot);
    const now = new Date();
    let start: Date;
    if (timeMatch) {
      const h = Number.parseInt(timeMatch[1], 10);
      const m = Number.parseInt(timeMatch[2], 10);
      start = new Date(now);
      start.setHours(h, m, 0, 0);
      // bump to next week if past
      if (start.getTime() < now.getTime()) {
        start = new Date(start.getTime() + 7 * 24 * 60 * 60_000);
      }
    } else {
      start = new Date(now.getTime() + 24 * 60 * 60_000);
    }
    const durMatch = /(\d+)/.exec(selectedService.time);
    const duration = durMatch ? Number.parseInt(durMatch[1], 10) : 60;
    const ics = generateIcs({
      bookingId,
      service: selectedServiceText[0],
      stylist: selectedStylistText[0],
      startTime: start,
      durationMinutes: duration,
      customerEmail: email.trim() || "guest@jacksonandcoil.no",
    });
    downloadIcs(`jackson-coil-${bookingId}.ics`, ics);
  }

  if (confirmed) {
    return (
      <section className="mx-auto max-w-5xl border border-ink/15 bg-paper-deep p-5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr]">
          <div className="grid min-h-72 place-items-center bg-sea text-paper">
            <div className="text-center">
              <span className="mx-auto grid h-16 w-16 place-items-center border border-paper/30">
                <Check size={30} weight="bold" />
              </span>
              <h2 className="mt-6 font-display text-5xl font-semibold tracking-[-0.05em]">
                {copy.booking.successTitle}
              </h2>
            </div>
          </div>
          <div className="self-center">
            <p className="eyebrow text-clay">Jackson & Coil</p>
            <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.045em]">
              {selectedServiceText[0]} {copy.labels.with} {selectedStylistText[0]}
            </h3>
            <dl className="mt-6 grid gap-3 font-mono text-sm uppercase tracking-[0.12em] text-ink/68 sm:grid-cols-3">
              <div className="border border-ink/12 p-4">
                <dt>{copy.common.duration}</dt>
                <dd className="mt-2 text-ink">{selectedService.time}</dd>
              </div>
              <div className="border border-ink/12 p-4">
                <dt>{copy.common.price}</dt>
                <dd className="mt-2 text-ink">{selectedService.price}</dd>
              </div>
              <div className="border border-ink/12 p-4">
                <dt>{copy.booking.curlType}</dt>
                <dd className="mt-2 text-ink">{curlType}</dd>
              </div>
            </dl>
            <p className="mt-6 max-w-xl text-lg leading-8 text-ink/70">{copy.booking.successBody}</p>
            <p className="mt-4 border-l-2 border-clay pl-4 font-medium text-ink">{copy.booking.prep}</p>
            <div
              data-testid="email-confirmation"
              className="mt-6 max-w-xl border-l-4 border-clay bg-paper-deep/70 p-5"
            >
              <p className="text-sm leading-6 text-ink/80">
                <Check size={16} weight="bold" className="mr-2 inline-block align-[-2px] text-clay" />
                {email
                  ? `${copy.booking.emailConfirmation} (${email})`
                  : copy.booking.emailConfirmation}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-ink/60">
                {copy.booking.emailBookingIdLabel}:{" "}
                <span className="text-ink" data-testid="booking-id">{bookingId}</span>
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={handleSendConfirmation}
                  disabled={!emailValid || emailSending || emailSent}
                  data-testid="send-confirmation"
                  className={`btn ${emailSent ? "btn-secondary" : "btn-primary"} disabled:cursor-not-allowed disabled:opacity-50`}
                >
                  {emailSent
                    ? copy.booking.emailSent
                    : emailSending
                      ? copy.booking.emailSending
                      : copy.booking.emailSendCta}
                </button>
                <button
                  type="button"
                  onClick={handleAddToCalendar}
                  data-testid="add-to-calendar"
                  className="btn btn-secondary"
                >
                  {copy.booking.addToCalendar}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl">
      <div className="grid gap-5 lg:grid-cols-[0.95fr_1.35fr]">
        <aside className="border border-ink/15 bg-ink p-5 text-paper sm:p-7">
          <p className="eyebrow text-paper/52">{copy.booking.returning}</p>
          <h2 className="mt-4 font-display text-4xl font-semibold tracking-[-0.05em]">
            {copy.booking.returningTitle}
          </h2>
          <p className="mt-4 leading-7 text-paper/70">{copy.booking.returningBody}</p>
          <button
            type="button"
            onClick={bookReturningClient}
            className="btn mt-6 w-full bg-paper text-ink hover:bg-clay hover:text-paper"
          >
            {copy.booking.returningCta}
            <ArrowRight size={18} />
          </button>

          <div className="mt-8 border-t border-paper/12 pt-6">
            <p className="eyebrow text-paper/52">{copy.labels.summary}</p>
            <dl className="mt-4 space-y-4 text-sm text-paper/72">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/42">{copy.labels.service}</dt>
                <dd className="mt-1 text-paper">{selectedServiceText[0]}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/42">{copy.labels.stylist}</dt>
                <dd className="mt-1 text-paper">{selectedStylistText[0]}</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-paper/42">{copy.labels.time}</dt>
                <dd className="mt-1 text-paper">{slot}</dd>
              </div>
            </dl>
          </div>
        </aside>

        <div className="border border-ink/15 bg-paper p-4 sm:p-6 lg:p-8">
          <ol className="grid grid-cols-5 gap-1" aria-label="Booking steps">
            {copy.booking.steps.map((label, index) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => setStep(index)}
                  aria-current={step === index ? "step" : undefined}
                  className="w-full border border-ink/12 px-2 py-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-ink/52 aria-[current=step]:border-clay aria-[current=step]:bg-clay aria-[current=step]:text-paper sm:text-xs"
                >
                  <span className="block text-[10px] opacity-70">0{index + 1}</span>
                  {label}
                </button>
              </li>
            ))}
          </ol>

          <div className="mt-8 min-h-[520px]">
            {step === 0 && (
              <div>
                <StepTitle icon={<Scissors size={22} />} title={copy.booking.chooseService} />
                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {copy.services.map((item) => {
                    const text = serviceText[item.id];
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setService(item.id)}
                        className={`group border p-5 text-left transition hover:-translate-y-0.5 ${
                          service === item.id ? "border-clay bg-clay text-paper" : "border-ink/12 bg-paper-deep/55"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-display text-3xl font-semibold leading-none tracking-[-0.045em]">
                              {text[0]}
                            </h3>
                            <p className={`mt-3 text-sm leading-6 ${service === item.id ? "text-paper/72" : "text-ink/64"}`}>
                              {text[1]}
                            </p>
                          </div>
                          {item.featured && <span className="font-mono text-[10px] uppercase tracking-[0.16em]">{copy.labels.core}</span>}
                        </div>
                        <div className="mt-5 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.12em]">
                          <span>{item.time}</span>
                          <span aria-hidden="true">/</span>
                          <span>{item.price}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <StepTitle icon={<Sparkle size={22} />} title={copy.booking.chooseStylist} />
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  {copy.stylists.map((item) => {
                    const text = stylistText[item.id];
                    const isAny = item.id === "any";
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setStylist(item.id)}
                        className={`grid gap-4 border p-4 text-left transition hover:-translate-y-0.5 sm:grid-cols-[112px_minmax(0,1fr)] ${
                          stylist === item.id
                            ? isAny
                              ? "border-clay bg-clay text-paper"
                              : "border-clay bg-clay text-paper"
                            : isAny
                              ? "border-clay/40 bg-clay/10"
                              : "border-ink/12 bg-paper-deep/55"
                        }`}
                      >
                        <div className="relative min-h-32 overflow-hidden bg-ink/10 sm:min-h-28">
                          <Image src={item.image} alt="" fill sizes="160px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] [overflow-wrap:anywhere] sm:text-3xl sm:tracking-[-0.045em]">
                            {text[0]}
                          </h3>
                          <p className={`mt-2 text-sm leading-6 ${stylist === item.id ? "text-paper/72" : "text-ink/64"}`}>
                            {text[1]}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span key={tag} className="border border-current px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] opacity-70">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <StepTitle icon={<Clock size={22} />} title={copy.booking.chooseTime} />
                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {slots.map((item, index) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setSlot(item)}
                      className={`border p-5 text-left transition hover:-translate-y-0.5 ${
                        slot === item ? "border-sea bg-sea text-paper" : "border-ink/12 bg-paper-deep/55"
                      }`}
                    >
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] opacity-70">
                        {index === 0 ? copy.labels.nextAvailable : copy.labels.available}
                      </span>
                      <span className="mt-3 block font-display text-4xl font-semibold tracking-[-0.045em]">{item}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <StepTitle icon={<Sparkle size={22} />} title={copy.booking.intakeTitle} />
                <p className="mt-2 max-w-2xl text-ink/68">{copy.booking.intakeBody}</p>
                <fieldset className="mt-6">
                  <legend className="font-mono text-xs uppercase tracking-[0.16em] text-ink/58">{copy.booking.curlType}</legend>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-9">
                    {curlTypes.map((type) => (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setCurlType(type)}
                        className={`border p-3 text-center ${curlType === type ? "border-clay bg-clay text-paper" : "border-ink/12 bg-paper-deep/55"}`}
                      >
                        <CurlGlyph type={type} />
                        <span className="mt-2 block font-mono text-xs font-semibold uppercase tracking-[0.16em]">{type}</span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-7 grid gap-4 md:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold">
                    {copy.booking.porosity}
                    <select
                      value={porosity}
                      onChange={(event) => setPorosity(event.target.value)}
                      className="border border-ink/15 bg-paper px-4 py-3 font-normal"
                    >
                      <option value="low">{copy.booking.low}</option>
                      <option value="medium">{copy.booking.medium}</option>
                      <option value="high">{copy.booking.high}</option>
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">
                    {copy.booking.lastChemical}
                    <input
                      value={lastChemical}
                      onChange={(event) => setLastChemical(event.target.value)}
                      className="border border-ink/15 bg-paper px-4 py-3 font-normal"
                      placeholder={copy.labels.noChemicalPlaceholder}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                    {copy.booking.want}
                    <textarea
                      value={want}
                      onChange={(event) => setWant(event.target.value)}
                      className="min-h-24 border border-ink/15 bg-paper px-4 py-3 font-normal"
                      placeholder={copy.labels.wantPlaceholder}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold md:col-span-2">
                    {copy.booking.scared}
                    <textarea
                      value={scared}
                      onChange={(event) => setScared(event.target.value)}
                      className="min-h-24 border border-ink/15 bg-paper px-4 py-3 font-normal"
                      placeholder={copy.labels.scaredPlaceholder}
                    />
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">
                    {copy.booking.emailLabel}
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      data-testid="intake-email"
                      className="border border-ink/15 bg-paper px-4 py-3 font-normal"
                      placeholder={copy.booking.emailPlaceholder}
                    />
                    <span className="text-xs font-normal text-ink/60">{copy.booking.emailHint}</span>
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">
                    {copy.booking.phoneLabel}
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      data-testid="intake-phone"
                      className="border border-ink/15 bg-paper px-4 py-3 font-normal"
                      placeholder={copy.booking.phonePlaceholder}
                    />
                    <span className="text-xs font-normal text-ink/60">{copy.booking.phoneHint}</span>
                  </label>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <StepTitle icon={<Check size={22} />} title={copy.booking.confirmTitle} />
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <SummaryBlock label={copy.labels.service} value={selectedServiceText[0]} detail={`${selectedService.time} / ${selectedService.price}`} />
                  <SummaryBlock label={copy.labels.stylist} value={selectedStylistText[0]} detail={selectedStylistText[1]} />
                  <SummaryBlock label={copy.labels.time} value={slot} detail={copy.labels.location} />
                  <SummaryBlock label={copy.booking.curlType} value={curlType} detail={`${copy.booking.porosity}: ${porosity}`} />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm font-semibold">
                    {copy.booking.emailLabel}
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      data-testid="confirm-email"
                      className={`border bg-paper px-4 py-3 font-normal ${
                        email && !emailValid ? "border-clay" : "border-ink/15"
                      }`}
                      placeholder={copy.booking.emailPlaceholder}
                    />
                    {email && !emailValid ? (
                      <span className="text-xs font-normal text-clay">{copy.booking.emailInvalid}</span>
                    ) : (
                      <span className="text-xs font-normal text-ink/60">{copy.booking.emailHint}</span>
                    )}
                  </label>
                  <label className="grid gap-2 text-sm font-semibold">
                    {copy.booking.phoneLabel}
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      data-testid="confirm-phone"
                      className="border border-ink/15 bg-paper px-4 py-3 font-normal"
                      placeholder={copy.booking.phonePlaceholder}
                    />
                    <span className="text-xs font-normal text-ink/60">{copy.booking.phoneHint}</span>
                  </label>
                </div>
                <p className="mt-6 border-l-2 border-clay pl-4 text-ink/72">{copy.booking.prep}</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-between gap-3 border-t border-ink/10 pt-5">
            <button
              type="button"
              onClick={() => setStep((value) => Math.max(0, value - 1))}
              className="btn btn-secondary"
              disabled={step === 0}
            >
              {copy.common.back}
            </button>
            <div className="flex gap-3">
              {step === 3 && (
                <button type="button" onClick={() => setStep(4)} className="btn btn-secondary">
                  {copy.booking.skipIntake}
                </button>
              )}
              {step < 4 ? (
                <button type="button" onClick={() => setStep((value) => Math.min(4, value + 1))} className="btn btn-primary">
                  {copy.common.next}
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmed(true)}
                  disabled={!emailValid}
                  data-testid="confirm-booking"
                  className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                  title={!emailValid ? copy.booking.emailRequired : undefined}
                >
                  {copy.common.confirm}
                  <Check size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-11 w-11 place-items-center bg-ink text-paper">{icon}</span>
      <h2 className="font-display text-4xl font-semibold tracking-[-0.045em]">{title}</h2>
    </div>
  );
}

function SummaryBlock({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="border border-ink/12 bg-paper-deep/55 p-5">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink/50">{label}</p>
      <p className="mt-3 font-display text-3xl font-semibold tracking-[-0.04em]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-ink/62">{detail}</p>
    </div>
  );
}

function generateBookingId() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let suffix = "";
  for (let i = 0; i < 3; i += 1) {
    suffix += letters[Math.floor(Math.random() * letters.length)];
  }
  return `JC-${year}-${month}${day}-${suffix}`;
}

function CurlGlyph({ type }: { type: string }) {
  const family = type.startsWith("2") ? "wave" : type.startsWith("3") ? "curl" : "coil";
  const path =
    family === "wave"
      ? "M6 22 C14 6 24 38 34 22 C42 8 52 36 58 22"
      : family === "curl"
        ? "M30 7 C48 7 50 30 33 31 C17 32 16 13 31 15 C45 17 40 43 21 42"
        : "M34 8 C48 11 45 31 31 29 C17 27 16 10 31 12 C49 15 48 50 25 48 C8 46 9 26 24 25";

  return (
    <svg aria-hidden="true" viewBox="0 0 64 56" className="mx-auto h-9 w-12" fill="none">
      <path d={path} stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
