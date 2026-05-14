"use client";

// Booking confirmation email helper.
//
// Strategy: if all three EmailJS env vars are set, dynamically import the
// @emailjs/browser SDK and send a real email. The package is NOT a dependency
// in package.json on purpose — the dynamic import is wrapped in try/catch so
// the missing-module case falls through to the mailto: fallback below.
//
// To activate real email later:
//   1. npm install @emailjs/browser
//   2. Set in .env.local:
//        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=...
//        NEXT_PUBLIC_EMAILJS_SERVICE_ID=...
//        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=...
//      The EmailJS template should accept variables:
//        to_email, bcc_email, booking_id, service, stylist, time, curl_type
//
// Current default (no env vars set): opens the user's email client with a
// pre-filled body via mailto:. The user still has to hit "send" but the copy
// is in their outbox and the BCC to deqa.gesod@gmail.com is included.

const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const DEQA_NOTIFY_EMAIL = "deqa.gesod@gmail.com";

export type BookingDetails = {
  bookingId: string;
  service: string;
  stylist: string;
  time: string;
  curlType?: string;
  customerEmail: string;
  customerPhone?: string;
};

export type SendResult = {
  ok: boolean;
  mode: "emailjs" | "mailto-fallback" | "noop";
};

export async function sendBookingEmail(b: BookingDetails): Promise<SendResult> {
  if (typeof window === "undefined") {
    return { ok: false, mode: "noop" };
  }

  if (EMAILJS_PUBLIC_KEY && EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID) {
    try {
      type EmailjsModule = {
        send: (
          serviceId: string,
          templateId: string,
          params: Record<string, string>,
          options: { publicKey: string },
        ) => Promise<unknown>;
      };
      // Module name is constructed at runtime so the TS compiler does not
      // resolve it. Avoids a hard dependency on @emailjs/browser at build time.
      const pkg = ["@emailjs", "browser"].join("/");
      const mod = (await import(/* webpackIgnore: true */ pkg).catch(
        () => null,
      )) as EmailjsModule | null;
      if (mod) {
        await mod.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          {
            to_email: b.customerEmail,
            bcc_email: DEQA_NOTIFY_EMAIL,
            booking_id: b.bookingId,
            service: b.service,
            stylist: b.stylist,
            time: b.time,
            curl_type: b.curlType ?? "",
          },
          { publicKey: EMAILJS_PUBLIC_KEY },
        );
        return { ok: true, mode: "emailjs" };
      }
    } catch (err) {
      console.error("EmailJS send failed, falling back to mailto", err);
    }
  }

  const subject = `Booking-bekreftelse ${b.bookingId}`;
  const lines = [
    `Tjeneste: ${b.service}`,
    `Stylist: ${b.stylist}`,
    `Tid: ${b.time}`,
  ];
  if (b.curlType) lines.push(`Krølltype: ${b.curlType}`);
  lines.push("", `Mottatt på: ${b.customerEmail}`);
  if (b.customerPhone) lines.push(`Telefon: ${b.customerPhone}`);
  lines.push("", "Jackson & Coil, Grünerløkka, Oslo");

  const body = lines.join("\n");
  const url = `mailto:${encodeURIComponent(b.customerEmail)}?cc=${encodeURIComponent(
    DEQA_NOTIFY_EMAIL,
  )}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = url;
  return { ok: true, mode: "mailto-fallback" };
}
