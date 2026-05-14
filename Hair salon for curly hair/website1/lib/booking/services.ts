// Booking-flow service catalog.
//
// We re-export the master service list from `lib/content/services.ts` (the
// services agent owns it) and add booking-specific metadata: a stable
// ServiceId enum, an order, and a "duration range" that reads honestly per
// research pattern 13 ("Curl work is variable; ranges + caveats build trust.").

import { services as masterServices, type Service } from "@/lib/content/services";

export type ServiceId = string; // slug from masterServices

/** Order they appear inside the booking step (NOT the same as the catalog page). */
const BOOKING_ORDER: string[] = [
  "first-visit-bundle",
  "the-jackson-cut",
  "the-sculpt-cut",
  "sculpt-cut-and-beard",
  "color-curl-safe",
  "deep-treatment",
  "consultation",
  "childrens-cut",
];

/** Services that REQUIRE a free consultation first — surfaced inside booking. */
export const REQUIRES_CONSULTATION: ServiceId[] = ["color-curl-safe"];

/** Featured trio shown at the top of step 1 (per BRAND §13). */
export const FEATURED_SERVICE_IDS: ServiceId[] = [
  "first-visit-bundle",
  "the-jackson-cut",
  "the-sculpt-cut",
];

export const bookingServices: Service[] = BOOKING_ORDER
  .map((slug) => masterServices.find((s) => s.slug === slug))
  .filter((s): s is Service => Boolean(s));

export function getServiceById(id: ServiceId | undefined): Service | undefined {
  if (!id) return undefined;
  return masterServices.find((s) => s.slug === id);
}
