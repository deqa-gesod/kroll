import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { BookingShell } from "./BookingShell";

// The booking flow itself is fully interactive. Every step is a Client
// Component. The page-level wrapper is a Server Component so we can put a
// Suspense boundary around `useSearchParams` (Next 16 build requirement) and
// emit a small server-rendered intro for SEO / first paint.

export const metadata: Metadata = {
  title: "Book",
  description:
    "Book a chair at Jackson & Coil. Real availability, weekday evenings, two-minute booking.",
  alternates: { canonical: "/booking" },
  openGraph: {
    title: "Book · Jackson & Coil",
    description:
      "Two minutes from here to chair. Real availability, dry consultation included.",
    url: "/booking",
    images: ["/images/visit-interior.jpg"],
  },
  twitter: {
    title: "Book · Jackson & Coil",
    description: "Two minutes from here to chair.",
    images: ["/images/visit-interior.jpg"],
  },
};

export default function BookingPage() {
  return (
    <div className="min-h-[80vh] py-10 sm:py-16">
      <Container width="default">
        <Suspense fallback={<BookingFallback />}>
          <BookingShell />
        </Suspense>
      </Container>
    </div>
  );
}

function BookingFallback() {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.25em] uppercase text-ink-muted mb-3">
        Booking
      </p>
      <h1 className="font-display text-[40px] sm:text-[56px] md:text-[72px] tracking-display leading-[0.95] max-w-3xl">
        Two minutes from here to chair.
      </h1>
      <p className="mt-10 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-muted">
        Loading booking…
      </p>
    </div>
  );
}
