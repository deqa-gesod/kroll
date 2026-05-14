"use client";

import { useEffect, useReducer, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";

import { useLang } from "@/components/providers/LangProvider";
import {
  bookingReducer,
  generateBookingId,
  initialState,
  type BookingState,
  type Step,
} from "@/lib/booking/reducer";
import {
  clearBookingState,
  isReturningClient,
  loadBookingState,
  saveBookingState,
  setReturningClient,
} from "@/lib/booking/storage";
import { getServiceById } from "@/lib/booking/services";
import { getStylistById } from "@/lib/booking/stylists";

import { ProgressBar } from "@/components/booking/ProgressBar";
import { ReturningWelcome } from "@/components/booking/ReturningWelcome";
import { Step1Service } from "@/components/booking/Step1Service";
import { Step2Stylist } from "@/components/booking/Step2Stylist";
import { Step3DateTime } from "@/components/booking/Step3DateTime";
import { Step4Intake } from "@/components/booking/Step4Intake";
import { Step5Confirm } from "@/components/booking/Step5Confirm";
import { cn } from "@/lib/cn";

/**
 * Lazy-init the reducer with whatever the storage / URL has on mount. Running
 * once at construction time avoids the React 19 lint rule against calling
 * setState inside an effect.
 */
function makeInitialState(searchParamsString: string | null): BookingState {
  // Server render: always pristine. The hydration check (`hasWindow`) keeps
  // the SSR output deterministic.
  if (typeof window === "undefined") return initialState;

  const stored = loadBookingState();
  if (stored && !stored.confirmed) return stored;

  // ?service=foo deeplink
  const params = new URLSearchParams(searchParamsString ?? "");
  const svc = params.get("service");
  if (svc) {
    const found = getServiceById(svc);
    if (found) {
      return {
        ...initialState,
        service: found.slug,
        step: 2,
        furthest: 2,
        direction: "forward",
      };
    }
  }
  return initialState;
}

export function BookingShell() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  // We must keep the SSR-rendered HTML stable, so the reducer is initialized
  // with `initialState` on first render. We then "hydrate" once on the client.
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  // One bag of flags so we set it in the effect with a single setState call —
  // satisfies React 19's set-state-in-effect lint rule cleanly.
  const [boot, setBoot] = useState<{
    hydrated: boolean;
    resumed: boolean;
    returning: boolean;
  }>({ hydrated: false, resumed: false, returning: false });
  const [returningDismissed, setReturningDismissed] = useState(false);

  useEffect(() => {
    // ?returning=1 toggles the prototype's "logged-in returning client" mode.
    const r = searchParams.get("returning");
    if (r === "1") setReturningClient(true);
    if (r === "0") setReturningClient(false);

    const stored = loadBookingState();
    const hydrationState = makeInitialState(searchParams.toString());
    if (hydrationState !== initialState) {
      dispatch({ type: "HYDRATE", state: hydrationState });
    }
    // One-time bootstrap from sessionStorage: this is the documented case where
    // setState-in-effect is the right pattern (hydrating client-only state
    // after the SSR pass). One setState, no cascade.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBoot({
      hydrated: true,
      resumed: stored !== null && !stored.confirmed,
      returning: isReturningClient(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { hydrated, resumed, returning } = boot;

  // Persist on every state change (after hydration). This effect only writes —
  // it never calls setState, so it stays within the lint rules.
  useEffect(() => {
    if (!hydrated) return;
    saveBookingState(state);
  }, [state, hydrated]);

  function handleSelectService(slug: string) {
    dispatch({ type: "SET_SERVICE", service: slug });
  }

  function handleSelectStylist(slug: string) {
    dispatch({ type: "SET_STYLIST", stylist: slug });
  }

  function handleConfirmDateTime(date: string, time: string) {
    dispatch({ type: "SET_DATETIME", date, time });
  }

  function handleSubmitIntake(intake: BookingState["intake"]) {
    dispatch({ type: "SET_INTAKE", intake: intake ?? {} });
  }

  function handleSkipIntake() {
    dispatch({ type: "SKIP_INTAKE" });
  }

  function handleConfirmContact(contact: BookingState["contact"]) {
    dispatch({ type: "SET_CONTACT", contact: contact ?? {} });
    dispatch({ type: "CONFIRM", bookingId: generateBookingId() });
    // Clear sessionStorage on success — keep state in memory so the success
    // screen still has data to render.
    clearBookingState();
  }

  function handleBack() {
    if (state.step === 1) return;
    dispatch({ type: "BACK" });
  }

  function handleStepClick(step: Step) {
    if (step === state.step) return;
    dispatch({ type: "GO_TO", step });
  }

  function handleStartOver() {
    clearBookingState();
    dispatch({ type: "RESET" });
    setBoot((b) => ({ ...b, resumed: false }));
  }

  function handleReturningRebook() {
    dispatch({
      type: "FAST_FORWARD_RETURNING",
      // Daniel's mock: Sculpt Cut + Vanessa
      service: "the-sculpt-cut",
      stylist: "vanessa-jackson",
    });
  }

  // Don't render the live UI until we've checked storage. On first render we
  // show a static fallback that matches the page-level Suspense fallback so
  // there's no jolt.
  if (!hydrated) {
    return (
      <div>
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
          {t({ en: "Booking", no: "Booking" })}
        </p>
        <h1 className="font-display text-[40px] sm:text-[56px] md:text-[72px] tracking-display leading-[0.95] max-w-3xl">
          {t({
            en: "Two minutes from here to chair.",
            no: "To minutter herfra til stolen.",
          })}
        </h1>
        <p className="mt-10 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
          {t({ en: "Loading booking…", no: "Laster booking…" })}
        </p>
      </div>
    );
  }

  if (state.confirmed) {
    return (
      <div>
        <Step5Confirm
          state={state}
          onConfirm={() => {}}
          onStartOver={handleStartOver}
        />
      </div>
    );
  }

  return (
    <div>
      {/* Headline */}
      <div className="mb-7 sm:mb-9">
        <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
          {t({ en: "Booking", no: "Booking" })}
        </p>
        <h1 className="font-display text-[40px] sm:text-[56px] md:text-[72px] tracking-display leading-[0.95] max-w-3xl">
          {t({
            en: "Two minutes from here to chair.",
            no: "To minutter herfra til stolen.",
          })}
        </h1>
      </div>

      {/* Resume notice */}
      {resumed && !state.confirmed && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-3 border border-bookgreen/40 bg-bookgreen/10 text-bookgreen text-[13px] flex items-center justify-between gap-4"
        >
          <span>
            {t({
              en: "Resuming where you left off.",
              no: "Fortsetter der du var.",
            })}
          </span>
          <button
            type="button"
            onClick={handleStartOver}
            className="underline underline-offset-4 hover:text-ink"
          >
            {t({ en: "Start over", no: "Start på nytt" })}
          </button>
        </motion.div>
      )}

      {/* Returning-client one-tap rebook */}
      {returning && !returningDismissed && state.step === 1 && !state.service && (
        <ReturningWelcome
          name="Daniel"
          serviceName={t({ en: "Sculpt Cut", no: "Sculpt Cut" })}
          stylistFirstName="Vanessa"
          lastVisit={t({ en: "March 14", no: "14. mars" })}
          onRebook={handleReturningRebook}
          onDismiss={() => setReturningDismissed(true)}
        />
      )}

      <div className="mb-6 sm:mb-8">
        <ProgressBar
          step={state.step}
          furthest={state.furthest}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Back row + context summary */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleBack}
          disabled={state.step === 1}
          className={cn(
            "inline-flex items-center gap-2 text-[13px] tracking-wide transition-colors",
            state.step === 1
              ? "text-ink-muted/60 cursor-not-allowed"
              : "text-ink-soft hover:text-ink",
          )}
        >
          <span aria-hidden>&larr;</span>
          {t({ en: "Back", no: "Tilbake" })}
        </button>
        <ContextSummary state={state} />
      </div>

      {/* Animated step container.
          The slide direction is driven by a state field on the reducer, so it
          stays a normal value during render (no refs accessed during render). */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.step}
            initial={{ opacity: 0, x: state.direction === "forward" ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: state.direction === "forward" ? -24 : 24 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {state.step === 1 && (
              <Step1Service
                selected={state.service}
                onSelect={handleSelectService}
              />
            )}
            {state.step === 2 && (
              <Step2Stylist
                selected={state.stylist}
                onSelect={handleSelectStylist}
              />
            )}
            {state.step === 3 && (
              <Step3DateTime
                stylistId={state.stylist}
                selectedDate={state.date}
                selectedTime={state.time}
                onConfirm={handleConfirmDateTime}
              />
            )}
            {state.step === 4 && (
              <Step4Intake
                initial={state.intake}
                onSkip={handleSkipIntake}
                onSubmit={handleSubmitIntake}
              />
            )}
            {state.step === 5 && (
              <Step5Confirm
                state={state}
                onConfirm={handleConfirmContact}
                onStartOver={handleStartOver}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ContextSummary({ state }: { state: BookingState }) {
  const { t } = useLang();
  const service = getServiceById(state.service);
  const stylist = getStylistById(state.stylist);

  if (state.step === 1) return null;

  const parts: string[] = [];
  if (service) parts.push(t(service.name));
  if (stylist) parts.push(stylist.name.split(" ")[0]);
  else if (state.stylist === "no-preference")
    parts.push(t({ en: "any stylist", no: "hvem som helst" }));
  if (state.date && state.time) parts.push(`${state.date} · ${state.time}`);

  if (parts.length === 0) return null;

  return (
    <p className="font-mono text-[11px] tracking-wide text-ink-muted truncate max-w-[60%] text-right">
      {parts.join(" · ")}
    </p>
  );
}
