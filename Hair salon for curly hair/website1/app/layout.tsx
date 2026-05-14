import type { Metadata } from "next";
import { Fraunces, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { LangProvider } from "@/components/providers/LangProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Header } from "@/components/chrome/Header";
import { Footer } from "@/components/chrome/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://jacksonandcoil.no";
const siteName = "Jackson & Coil";

// Default OG variant: V1 (Editorial, hero-amara-chair).
// To switch: replace ogTitle / ogDescription / ogImage below with the
// JSON output from og-kort-velger.html. Keep `metadataBase` and `siteName`.
const ogTitle = "Vi har snakket med håret ditt før vi tar i det.";
const ogDescription =
  "Jackson & Coil. Den beste krøll-spesialiserte salongen i Oslo.";
const ogImage = "/images/visit-salon-interior.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jackson & Coil · Curl-specialist hair salon, Grünerløkka, Oslo",
    template: "%s · Jackson & Coil",
  },
  description:
    "Oslo's first salon built around the curl spectrum. From loose waves to tight coils, every pattern gets the same care, by stylists who trained for it.",
  applicationName: siteName,
  keywords: [
    "curly hair salon Oslo",
    "krøllespesialist Oslo",
    "Grünerløkka frisør",
    "type 4 hair Oslo",
    "DevaCut Oslo",
    "Rezo Cut Oslo",
    "curl specialist Norway",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: siteUrl,
    languages: {
      "no-NO": siteUrl,
      "en-US": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    locale: "no_NO",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName,
    title: ogTitle,
    description: ogDescription,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Curl specialist salon in Grünerløkka, Oslo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: "Every curl pattern, one chair.",
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Hair salon",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: siteName,
  image: `${siteUrl}${ogImage}`,
  url: siteUrl,
  telephone: "+47-12345678",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Grünerløkka",
    addressLocality: "Oslo",
    postalCode: "0552",
    addressCountry: "NO",
  },
  priceRange: "350-2200 NOK",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "16:00",
    },
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      className={`${fraunces.variable} ${interTight.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-cream text-ink">
        <script
          type="application/ld+json"
          // JSON-LD HairSalon schema, rendered server-side for crawlers.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:bg-ink focus:text-cream focus:px-4 focus:py-2 focus:font-mono focus:text-[12px] focus:tracking-wide"
        >
          Skip to main content
        </a>
        <LangProvider>
          <MotionProvider>
            <LenisProvider>
              <Header />
              <main id="main" className="flex-1">{children}</main>
              <Footer />
            </LenisProvider>
          </MotionProvider>
        </LangProvider>
      </body>
    </html>
  );
}
