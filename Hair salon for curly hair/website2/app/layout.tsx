import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/language-provider";
import { LenisProvider } from "@/components/lenis-provider";
import { SiteShell } from "@/components/site-shell";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const siteUrl = "https://jacksonandcoil.no";
const siteName = "Jackson & Coil";

// Default OG variant for website2: V4 (Brand-statement, minimal).
// To switch variant: replace the three constants below with the JSON copied
// from og-kort-velger.html. metadataBase + siteName stay the same.
const ogTitle = "Vi har snakket med håret ditt før vi tar i det.";
const ogDescription =
  "Jackson & Coil. Den beste krøll-spesialiserte salongen i Oslo.";
const ogImage = "/images/visit-salon-interior.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jackson & Coil · Curl Specialist Salon, Oslo",
    template: "%s · Jackson & Coil",
  },
  description:
    "Oslo's first salon built around the full curl spectrum. Type 2A through 4C, dry consultation, prices on the page.",
  applicationName: siteName,
  keywords: [
    "curly hair salon Oslo",
    "krøllfrisør Oslo",
    "Grünerløkka salong",
    "type 4 hair",
    "curl specialist",
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
        alt: "Jackson & Coil, curl specialist salon in Oslo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ogTitle,
    description: ogDescription,
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
  icons: {
    icon: "/icon.svg",
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
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>
          <LenisProvider>
            <SiteShell>{children}</SiteShell>
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
