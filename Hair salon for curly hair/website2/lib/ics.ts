"use client";

// Minimal RFC 5545 .ics calendar event generator.
// Used by the booking confirmation step to give the customer a one-click
// "add to calendar" download.

export type BookingForIcs = {
  bookingId: string;
  service: string;
  stylist: string;
  startTime: Date;
  durationMinutes: number;
  customerEmail: string;
};

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function fmtUtc(d: Date): string {
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    "T" +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    "00Z"
  );
}

function escapeIcs(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

export function generateIcs(b: BookingForIcs): string {
  const end = new Date(b.startTime.getTime() + b.durationMinutes * 60_000);
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Jackson and Coil//Booking//NO",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${b.bookingId}@jacksonandcoil.no`,
    `DTSTAMP:${fmtUtc(new Date())}`,
    `DTSTART:${fmtUtc(b.startTime)}`,
    `DTEND:${fmtUtc(end)}`,
    `SUMMARY:${escapeIcs(`Jackson & Coil: ${b.service}`)}`,
    `DESCRIPTION:${escapeIcs(
      `Stylist: ${b.stylist}\nBooking: ${b.bookingId}`,
    )}`,
    `LOCATION:${escapeIcs("Markveien 35, 0554 Oslo, Grünerløkka")}`,
    "ORGANIZER;CN=Jackson and Coil:mailto:bookings@jacksonandcoil.no",
    `ATTENDEE;CN=${escapeIcs(b.customerEmail)}:mailto:${b.customerEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(filename: string, content: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    URL.revokeObjectURL(url);
    a.remove();
  }, 0);
}
