import type { ImageKey } from "@/lib/content/images";
import type { FilterValue } from "@/components/curl-type-filter/CurlTypeFilter";

export type Stylist = "Vanessa" | "Nia" | "Adé" | "Mira" | "Inés";

export type PortfolioItem = {
  id: string;
  image: ImageKey;
  /** Andre Walker tag(s) and/or pseudo-tags ("Mens", "Color"). */
  tags: ReadonlyArray<FilterValue>;
  stylist: Stylist;
  service: { en: string; no: string };
  caption: { en: string; no: string };
  /** Visual size hint for the editorial masonry layout. */
  size: "sm" | "md" | "lg";
};

export const portfolioItems: ReadonlyArray<PortfolioItem> = [
  {
    id: "p-2a",
    image: "portfolio2A",
    tags: ["2A"],
    stylist: "Inés",
    service: { en: "Jackson Cut", no: "Jackson-klipp" },
    caption: {
      en: "Loose 2A waves recut to shoulder length, day-2 hair, no styling.",
      no: "Løse 2A-bølger klippet til skulderlengde, dag 2, ingen styling.",
    },
    size: "md",
  },
  {
    id: "p-2b",
    image: "portfolio2B",
    tags: ["2B", "2C"],
    stylist: "Inés",
    service: { en: "Jackson Cut", no: "Jackson-klipp" },
    caption: {
      en: "Mid-length 2B/2C with face-framing layers, dry-cut on the natural pattern.",
      no: "Mellomlangt 2B/2C med ansiktsrammende lag, klippet tørt.",
    },
    size: "lg",
  },
  {
    id: "p-3a",
    image: "portfolio3A",
    tags: ["3A"],
    stylist: "Nia",
    service: { en: "Jackson Cut", no: "Jackson-klipp" },
    caption: {
      en: "3A spirals shaped curl by curl. First visit, walked in skeptical.",
      no: "3A-spiraler formet krølle for krølle. Første besøk, kom inn skeptisk.",
    },
    size: "md",
  },
  {
    id: "p-3b",
    image: "portfolio3B",
    tags: ["3B"],
    stylist: "Nia",
    service: { en: "Jackson Cut", no: "Jackson-klipp" },
    caption: {
      en: "Voluminous 3B ringlets, mid-length, weight removed at the canopy.",
      no: "Volumiøse 3B-ringler, mellomlang, vekt fjernet i toppen.",
    },
    size: "lg",
  },
  {
    id: "p-3c",
    image: "portfolio3C",
    tags: ["3C"],
    stylist: "Vanessa",
    service: { en: "Jackson Cut", no: "Jackson-klipp" },
    caption: {
      en: "3C corkscrews on day-1, finished outside on a Grünerløkka morning.",
      no: "3C-korketrekkere på dag 1, ferdig på en morgen i Grünerløkka.",
    },
    size: "md",
  },
  {
    id: "p-4a",
    image: "portfolio4A",
    tags: ["4A"],
    stylist: "Vanessa",
    service: { en: "Jackson Cut", no: "Jackson-klipp" },
    caption: {
      en: "4A coils shaped into a defined round silhouette. No tension, no wet cut.",
      no: "4A-krøller formet til en definert rund silhuett. Ingen strekk, ingen våtklipp.",
    },
    size: "lg",
  },
  {
    id: "p-4b",
    image: "portfolio4B",
    tags: ["4B"],
    stylist: "Vanessa",
    service: { en: "Jackson Cut", no: "Jackson-klipp" },
    caption: {
      en: "3-month grow-out, recut into a tapered crown. 4B Z-pattern, dry-cut.",
      no: "3 måneder utvokst, klippet om til en tapered krone. 4B Z-mønster, tørrklipp.",
    },
    size: "md",
  },
  {
    id: "p-4c",
    image: "portfolio4C",
    tags: ["4C"],
    stylist: "Mira",
    service: { en: "Jackson Cut", no: "Jackson-klipp" },
    caption: {
      en: "4C crown shaped for a strong silhouette. Fourth visit. We know her hair now.",
      no: "4C-krone formet for en sterk silhuett. Fjerde besøk. Vi kjenner håret hennes nå.",
    },
    size: "lg",
  },
  {
    id: "p-men-1",
    image: "portfolioMen1",
    tags: ["4A", "Mens"],
    stylist: "Adé",
    service: { en: "Sculpt Cut", no: "Sculpt-klipp" },
    caption: {
      en: "Low fade with defined 4A coils on top. Clipper and scissor work, one chair.",
      no: "Lav fade med definerte 4A-krøller på toppen. Maskin og saks, én stol.",
    },
    size: "md",
  },
  {
    id: "p-men-2",
    image: "portfolioMen2",
    tags: ["Mens"],
    stylist: "Mira",
    service: { en: "Loc maintenance", no: "Loc-vedlikehold" },
    caption: {
      en: "Mid-length sisterlocks, freshly retwisted and shaped at the perimeter.",
      no: "Mellomlange sisterlocks, nytwistet og formet i kanten.",
    },
    size: "md",
  },
  {
    id: "p-color-1",
    image: "portfolioColor1",
    tags: ["3B", "Color"],
    stylist: "Inés",
    service: { en: "Curl-safe color", no: "Krøll-trygg farge" },
    caption: {
      en: "Deep auburn balayage on 3B. Bond-builder throughout, no breakage.",
      no: "Dyp auburn balayage på 3B. Bond-builder gjennomgående, ingen brudd.",
    },
    size: "lg",
  },
  {
    id: "p-color-2",
    image: "portfolioColor2",
    tags: ["4A", "Color"],
    stylist: "Vanessa",
    service: { en: "Curl-safe color", no: "Krøll-trygg farge" },
    caption: {
      en: "Subtle copper through the canopy on 4A coils. Two-tone, no global lift.",
      no: "Subtil kobber i toppen på 4A-krøller. Tofarget, ingen global løft.",
    },
    size: "md",
  },
  {
    id: "p-process",
    image: "heroAlt2",
    tags: ["3C"],
    stylist: "Vanessa",
    service: { en: "Process shot", no: "Prosess" },
    caption: {
      en: "Mid-cut. Vanessa working a 3C section dry, curl by curl.",
      no: "Midt i klippet. Vanessa jobber tørt med en 3C-seksjon, krølle for krølle.",
    },
    size: "lg",
  },
];
