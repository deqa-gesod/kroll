// Booking-flow stylist catalog.
//
// Re-exports the master team list and adds booking-specific tags that drive
// the filter chips on step 2 (per BRAND §13: "Filterable: 4c specialist,
// color, men's fade + coils, etc.").

import { team, type Stylist } from "@/lib/content/team";

export type StylistId = string; // slug

export type StylistTag =
  | "type-4-specialist"
  | "color"
  | "mens-fade-coils"
  | "wavy-loose"
  | "locs"
  | "kids";

export type StylistMeta = {
  slug: StylistId;
  tags: StylistTag[];
  /** Short specialty chip shown under name in step 2 */
  shortSpecialty: { en: string; no: string };
};

export const stylistMeta: StylistMeta[] = [
  {
    slug: "vanessa-jackson",
    tags: ["type-4-specialist", "color"],
    shortSpecialty: {
      en: "Type 2A — 4C, color",
      no: "Type 2A — 4C, farge",
    },
  },
  {
    slug: "nia-berhane",
    tags: ["wavy-loose"],
    shortSpecialty: {
      en: "Type 3 spirals & ringlets",
      no: "Type 3 spiraler og ringletter",
    },
  },
  {
    slug: "ade-okonkwo",
    tags: ["mens-fade-coils"],
    shortSpecialty: {
      en: "Men's fade + coils, beard",
      no: "Herre fade + krøller, skjegg",
    },
  },
  {
    slug: "mira-dahir",
    tags: ["type-4-specialist", "locs"],
    shortSpecialty: {
      en: "Type 4, locs, protective styles",
      no: "Type 4, locs, beskyttende frisyrer",
    },
  },
  {
    slug: "ines-lindberg",
    tags: ["wavy-loose"],
    shortSpecialty: {
      en: "Type 2 & looser Type 3",
      no: "Type 2 og løsere Type 3",
    },
  },
];

export type StylistBookingEntry = Stylist & {
  tags: StylistTag[];
  shortSpecialty: { en: string; no: string };
};

export const bookingStylists: StylistBookingEntry[] = stylistMeta
  .map((m) => {
    const base = team.find((s) => s.slug === m.slug);
    if (!base) return null;
    return { ...base, tags: m.tags, shortSpecialty: m.shortSpecialty };
  })
  .filter((s): s is StylistBookingEntry => Boolean(s));

export function getStylistById(id: StylistId | undefined) {
  if (!id) return undefined;
  if (id === "no-preference") return undefined;
  return bookingStylists.find((s) => s.slug === id);
}

/** Filter tag labels for the chip row */
export const TAG_LABELS: Record<StylistTag, { en: string; no: string }> = {
  "type-4-specialist": { en: "Type 4 specialist", no: "Type 4-spesialist" },
  color: { en: "Color", no: "Farge" },
  "mens-fade-coils": { en: "Men's fade + coils", no: "Herre fade + krøller" },
  "wavy-loose": { en: "Wavy / loose curls", no: "Bølger / løsere krøller" },
  locs: { en: "Locs", no: "Locs" },
  kids: { en: "Kids", no: "Barn" },
};
