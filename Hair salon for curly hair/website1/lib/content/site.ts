import type { Lang } from "@/components/providers/LangProvider";

type LocalizedString = Record<Lang, string>;

export const site = {
  name: "Jackson & Coil",
  shortName: "J&C",
  tagline: {
    en: "Oslo's first salon built around the curl spectrum.",
    no: "Oslos første salong for hele krøll-spekteret.",
  } satisfies LocalizedString,
  founder: "Vanessa Jackson",
  neighborhood: "Grünerløkka, Oslo",
  address: {
    line1: "Markveien 35",
    line2: "0554 Oslo",
    country: "Norway",
  },
  phone: "+47 22 00 00 00",
  email: "hei@jacksonandcoil.no",
  hours: [
    { day: { en: "Tuesday", no: "Tirsdag" }, time: "10:00 — 19:00" },
    { day: { en: "Wednesday", no: "Onsdag" }, time: "10:00 — 19:00" },
    { day: { en: "Thursday", no: "Torsdag" }, time: "10:00 — 20:00" },
    { day: { en: "Friday", no: "Fredag" }, time: "10:00 — 19:00" },
    { day: { en: "Saturday", no: "Lørdag" }, time: "10:00 — 17:00" },
    { day: { en: "Sunday & Monday", no: "Søndag og mandag" }, time: { en: "Closed", no: "Stengt" } },
  ],
  instagram: {
    handle: "@jacksonandcoil",
    url: "https://instagram.com/jacksonandcoil",
  },
  transit: {
    en: "Trams 11, 12, 13 stop two minutes away at Olaf Ryes plass. Closest metro: Grünerløkka.",
    no: "Trikk 11, 12 og 13 stopper to minutter unna ved Olaf Ryes plass. Nærmeste T-bane: Grünerløkka.",
  } satisfies LocalizedString,
} as const;

export const navItems: Array<{
  href: string;
  label: LocalizedString;
}> = [
  { href: "/cuts-and-services", label: { en: "Cuts & services", no: "Klipp og tjenester" } },
  { href: "/the-method", label: { en: "The method", no: "Metoden" } },
  { href: "/the-team", label: { en: "The team", no: "Teamet" } },
  { href: "/portfolio", label: { en: "Portfolio", no: "Portefølje" } },
  { href: "/shop", label: { en: "Shop", no: "Butikk" } },
  { href: "/journal", label: { en: "Journal", no: "Magasin" } },
  { href: "/visit", label: { en: "Visit", no: "Besøk" } },
  { href: "/about", label: { en: "About", no: "Om" } },
];
