// sessionStorage glue for the booking flow.

import type { BookingState } from "@/lib/booking/reducer";

const KEY = "jc-booking";
const RETURNING_KEY = "jc-returning"; // dummy logged-in flag for the prototype

export function loadBookingState(): BookingState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as BookingState;
    if (typeof parsed?.step !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveBookingState(state: BookingState): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // ignore quota / private mode
  }
}

export function clearBookingState(): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}

/** Has the user previously been a "returning client" in this session? */
export function isReturningClient(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(RETURNING_KEY) === "true";
  } catch {
    return false;
  }
}

export function setReturningClient(value: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (value) window.sessionStorage.setItem(RETURNING_KEY, "true");
    else window.sessionStorage.removeItem(RETURNING_KEY);
  } catch {
    // ignore
  }
}
