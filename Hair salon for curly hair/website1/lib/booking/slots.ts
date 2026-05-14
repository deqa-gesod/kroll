// Mock availability generator.
//
// Schedule rules per BRAND.md (lib/content/site.ts):
//   Tue–Fri    10:00 — 19:00
//   Thursday   10:00 — 20:00 (extended evening)
//   Saturday   10:00 — 17:00
//   Sun & Mon  closed
//
// Some slots are pseudo-randomly removed to feel real. Same seed (date + stylist)
// always yields the same slot list, so revisits are stable.

export type DaySlots = {
  date: string; // ISO yyyy-mm-dd
  weekday: number; // 0 = Sun .. 6 = Sat
  closed: boolean;
  /** "HH:MM" strings; empty array if closed or fully booked */
  slots: string[];
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function isoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function dailyHours(weekday: number): { start: number; end: number } | null {
  // 0 Sun, 1 Mon, 2 Tue, 3 Wed, 4 Thu, 5 Fri, 6 Sat
  switch (weekday) {
    case 0:
    case 1:
      return null;
    case 2:
    case 3:
    case 5:
      return { start: 10, end: 19 };
    case 4:
      return { start: 10, end: 20 };
    case 6:
      return { start: 10, end: 17 };
    default:
      return null;
  }
}

/** Generate slots for `days` days starting from `start` for the given stylist. */
export function generateAvailability(
  start: Date,
  days: number,
  stylistId: string | undefined,
): DaySlots[] {
  const result: DaySlots[] = [];
  const stylistSeed = hashString(stylistId ?? "no-preference");

  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    d.setHours(0, 0, 0, 0);
    const weekday = d.getDay();
    const date = isoDate(d);
    const hours = dailyHours(weekday);

    if (!hours) {
      result.push({ date, weekday, closed: true, slots: [] });
      continue;
    }

    const seed = stylistSeed ^ hashString(date);
    const rand = mulberry32(seed);

    const slots: string[] = [];
    for (let h = hours.start; h < hours.end; h++) {
      // Two slots per hour: :00 and :30. Skip a fraction to feel real.
      for (const m of [0, 30]) {
        const key = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
        // 35% removed at random (booked / lunch / break)
        if (rand() < 0.35) continue;
        slots.push(key);
      }
    }
    result.push({ date, weekday, closed: false, slots });
  }
  return result;
}

export function findNextAvailable(days: DaySlots[]): { date: string; time: string } | null {
  for (const d of days) {
    if (!d.closed && d.slots.length > 0) {
      return { date: d.date, time: d.slots[0] };
    }
  }
  return null;
}

export function formatDayLabel(
  isoStr: string,
  lang: "en" | "no",
): { weekday: string; dayMonth: string } {
  const [y, m, d] = isoStr.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  const weekday = date.toLocaleDateString(lang === "no" ? "nb-NO" : "en-GB", {
    weekday: "short",
  });
  const dayMonth = date.toLocaleDateString(lang === "no" ? "nb-NO" : "en-GB", {
    day: "numeric",
    month: "short",
  });
  return { weekday, dayMonth };
}
