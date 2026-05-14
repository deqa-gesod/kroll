// Booking-flow state machine.
//
// Plain useReducer state. The orchestrator (app/booking/page.tsx) hydrates from
// sessionStorage on mount and writes back on every dispatch.

import type { ServiceId } from "@/lib/booking/services";
import type { StylistId } from "@/lib/booking/stylists";

export type Step = 1 | 2 | 3 | 4 | 5;

export type CurlType =
  | "2A" | "2B" | "2C"
  | "3A" | "3B" | "3C"
  | "4A" | "4B" | "4C"
  | "unsure";

export type Porosity = "low" | "normal" | "high" | "unsure";

export type Intake = {
  curlType?: CurlType;
  porosity?: Porosity;
  lastChemicalService?: string;
  goals?: string;
  fears?: string;
};

export type Contact = {
  name?: string;
  email?: string;
  phone?: string;
};

export type BookingState = {
  step: Step;
  /** Highest step the user has ever reached this session — used by ProgressBar. */
  furthest: Step;
  /** Last navigation direction — drives slide animations. */
  direction: "forward" | "back";
  service?: ServiceId;
  stylist?: StylistId; // can be 'no-preference'
  date?: string; // ISO yyyy-mm-dd
  time?: string; // HH:MM
  intake?: Intake;
  isReturning?: boolean;
  contact?: Contact;
  /** Set true after the confirm screen renders so we don't re-prompt. */
  confirmed?: boolean;
  /** Mock booking ID, generated at confirm. */
  bookingId?: string;
};

export const initialState: BookingState = {
  step: 1,
  furthest: 1,
  direction: "forward",
};

export type BookingAction =
  | { type: "SET_SERVICE"; service: ServiceId }
  | { type: "SET_STYLIST"; stylist: StylistId }
  | { type: "SET_DATETIME"; date: string; time: string }
  | { type: "SET_INTAKE"; intake: Intake }
  | { type: "SKIP_INTAKE" }
  | { type: "SET_CONTACT"; contact: Contact }
  | { type: "GO_TO"; step: Step }
  | { type: "BACK" }
  | { type: "RESET" }
  | { type: "HYDRATE"; state: BookingState }
  | { type: "CONFIRM"; bookingId: string }
  | { type: "FAST_FORWARD_RETURNING"; service: ServiceId; stylist: StylistId };

function withStep(state: BookingState, nextStep: Step): BookingState {
  const direction: "forward" | "back" =
    nextStep > state.step ? "forward" : "back";
  const furthest = (Math.max(state.furthest, nextStep) as Step);
  return { ...state, step: nextStep, direction, furthest };
}

export function bookingReducer(
  state: BookingState,
  action: BookingAction,
): BookingState {
  switch (action.type) {
    case "SET_SERVICE":
      return withStep({ ...state, service: action.service }, 2);
    case "SET_STYLIST":
      return withStep({ ...state, stylist: action.stylist }, 3);
    case "SET_DATETIME":
      return withStep({ ...state, date: action.date, time: action.time }, 4);
    case "SET_INTAKE":
      return withStep({ ...state, intake: action.intake }, 5);
    case "SKIP_INTAKE":
      return withStep({ ...state, isReturning: true }, 5);
    case "SET_CONTACT":
      return { ...state, contact: action.contact };
    case "GO_TO":
      return withStep(state, action.step);
    case "BACK": {
      const prev = Math.max(1, state.step - 1) as Step;
      return withStep(state, prev);
    }
    case "RESET":
      return initialState;
    case "HYDRATE":
      return action.state;
    case "CONFIRM":
      return { ...state, confirmed: true, bookingId: action.bookingId };
    case "FAST_FORWARD_RETURNING":
      return withStep(
        {
          ...state,
          service: action.service,
          stylist: action.stylist,
          isReturning: true,
          // Mock returning-client contact prefill so rebook lands under 60s.
          // In production, these come from the logged-in account.
          contact: {
            name: "Daniel B.",
            email: "daniel@example.no",
            phone: "+47 901 23 456",
          },
        },
        3,
      );
    default:
      return state;
  }
}

export function generateBookingId(): string {
  // Mock — JC-XXXXXX, e.g. JC-7K2P9A
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "JC-";
  for (let i = 0; i < 6; i++) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}
