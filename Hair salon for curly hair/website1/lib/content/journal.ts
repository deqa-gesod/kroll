import type { ImageKey } from "@/lib/content/images";

export type JournalCategory = "Education" | "Community" | "Family" | "Products";

export type JournalArticle = {
  id: string;
  image: ImageKey;
  category: JournalCategory;
  title: { en: string; no: string };
  preview: { en: string; no: string };
  readTime: { en: string; no: string };
  date: string;
  /** Mocked link target — articles are not built. */
  href: string;
  /** First article gets the larger featured card. */
  featured?: boolean;
};

const categoryLabel: Record<
  JournalCategory,
  { en: string; no: string }
> = {
  Education: { en: "Education", no: "Lær" },
  Community: { en: "Community", no: "Felleskap" },
  Family: { en: "Family", no: "Familie" },
  Products: { en: "Products", no: "Produkter" },
};

export function labelFor(category: JournalCategory) {
  return categoryLabel[category];
}

export const articles: ReadonlyArray<JournalArticle> = [
  {
    id: "read-your-curl-pattern",
    image: "journal4",
    category: "Education",
    title: {
      en: "How to read your curl pattern",
      no: "Slik leser du krøllmønsteret ditt",
    },
    preview: {
      en: "The Andre Walker scale gets you 60% of the way. Porosity and density do the other 40%. Here is how to read all three at home, in a mirror, in five minutes.",
      no: "Andre Walker-skalaen tar deg 60% av veien. Porøsitet og tetthet tar de siste 40%. Slik leser du alle tre hjemme, i speilet, på fem minutter.",
    },
    readTime: { en: "8 min read", no: "8 min lesing" },
    date: "April 22, 2026",
    href: "#",
    featured: true,
  },
  {
    id: "mixed-heritage-mondays",
    image: "journal2",
    category: "Community",
    title: {
      en: "Mixed-heritage Mondays — what we're listening to",
      no: "Mixed-heritage Mondays — det vi hører på",
    },
    preview: {
      en: "Recap of last week's meetup at the salon. Twelve women. One playlist. A slightly burned focaccia. Notes from the conversation.",
      no: "Oppsummering fra forrige ukes meetup i salongen. Tolv kvinner. Én spilleliste. En litt brent focaccia. Notater fra samtalen.",
    },
    readTime: { en: "5 min read", no: "5 min lesing" },
    date: "April 14, 2026",
    href: "#",
  },
  {
    id: "a-childs-hair-without-tears",
    image: "journal3",
    category: "Family",
    title: {
      en: "Doing a child's hair without tears",
      no: "Hvordan stelle barnets hår uten tårer",
    },
    preview: {
      en: "Four parents, two stylists, one child who finally sat still. The order of operations that works for tender heads, and the products we keep on the shelf.",
      no: "Fire foreldre, to stylister, ett barn som endelig satt stille. Rekkefølgen som fungerer for ømme hoder, og produktene vi alltid har på hylla.",
    },
    readTime: { en: "6 min read", no: "6 min lesing" },
    date: "April 2, 2026",
    href: "#",
  },
  {
    id: "three-oils-we-never-run-out-of",
    image: "journal1",
    category: "Products",
    title: {
      en: "The 3 oils we never run out of",
      no: "De 3 oljene vi aldri går tom for",
    },
    preview: {
      en: "Mielle's rosemary mint for the scalp. Bread's hair oil for finishing. A house-blended castor for sealing. What each one does, and when not to reach for it.",
      no: "Mielles rosmarin-mint for hodebunnen. Breads hårolje til finish. En castor-blanding fra huset for forsegling. Hva hver gjør, og når du ikke skal bruke den.",
    },
    readTime: { en: "4 min read", no: "4 min lesing" },
    date: "March 28, 2026",
    href: "#",
  },
];
