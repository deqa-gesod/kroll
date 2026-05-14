import type { Lang } from "@/components/providers/LangProvider";

type LocalizedString = Record<Lang, string>;

export type Service = {
  slug: string;
  /** category — used for the editorial subhead above each block */
  group: "signature" | "men" | "color" | "treatment" | "consult" | "kids";
  name: LocalizedString;
  /** one-line description, voice per BRAND §7 */
  blurb: LocalizedString;
  /** what's included — short bullet list */
  includes: LocalizedString[];
  /** for whom — short tag */
  forWhom: LocalizedString;
  /** duration label, mono — never just a number, always with units */
  duration: LocalizedString;
  /** price as displayed, mono — never "from" except when genuinely variable */
  price: LocalizedString;
  /** small helper note shown beneath price */
  priceNote?: LocalizedString;
};

export const services: Service[] = [
  // ---------- Signature women ----------
  {
    slug: "the-jackson-cut",
    group: "signature",
    name: {
      en: "The Jackson Cut",
      no: "The Jackson Cut",
    },
    blurb: {
      en: "Dry, curl by curl, on the natural pattern. The cut every other cut answers to.",
      no: "Tørr, krølle for krølle, på det naturlige mønsteret. Klippen alle andre klipp svarer til.",
    },
    forWhom: {
      en: "Women, Type 2 — 4",
      no: "Kvinner, Type 2 — 4",
    },
    includes: [
      {
        en: "Dry consultation on your natural pattern",
        no: "Tørr konsultasjon på ditt naturlige mønster",
      },
      {
        en: "Curl-by-curl shaping with the Jackson zone map",
        no: "Krølle-for-krølle forming med Jackson-sonekartet",
      },
      {
        en: "Cleanse, condition, finish you can recreate at home",
        no: "Vask, pleie og finish du kan gjenskape hjemme",
      },
      {
        en: "Education — what was done and why, before you leave",
        no: "Forklaring — hva som ble gjort og hvorfor, før du går",
      },
    ],
    duration: { en: "75 min", no: "75 min" },
    price: { en: "750 NOK", no: "750 NOK" },
  },
  {
    slug: "first-visit-bundle",
    group: "signature",
    name: {
      en: "First Visit Bundle",
      no: "Førstegangs-pakke",
    },
    blurb: {
      en: "The way every first appointment with us should start. Consultation, cut, finish, and a discount on the products you actually use.",
      no: "Slik enhver første time hos oss skal starte. Konsultasjon, klipp, finish, og rabatt på produktene du faktisk bruker.",
    },
    forWhom: {
      en: "First-time clients, Type 2 — 4",
      no: "Førstegangs-kunder, Type 2 — 4",
    },
    includes: [
      {
        en: "Free 15-minute dry consultation",
        no: "Gratis 15-minutters tørr konsultasjon",
      },
      {
        en: "The Jackson Cut",
        no: "The Jackson Cut",
      },
      {
        en: "Finish — natural-product styling you can recreate",
        no: "Finish — styling med naturprodukter du kan gjenskape",
      },
      {
        en: "20% off your first retail purchase",
        no: "20 % rabatt på første kjøp i butikken",
      },
    ],
    duration: { en: "90 min", no: "90 min" },
    price: { en: "750 NOK", no: "750 NOK" },
    priceNote: {
      en: "Same price as the Cut alone. The consultation comes with us, not on top.",
      no: "Samme pris som klippen alene. Konsultasjonen følger med, ikke ovenpå.",
    },
  },

  // ---------- Men ----------
  {
    slug: "the-sculpt-cut",
    group: "men",
    name: {
      en: "The Sculpt Cut",
      no: "The Sculpt Cut",
    },
    blurb: {
      en: "Fade, lineup and dry coil shaping in one chair. Clipper precision into scissor work — no second appointment, no Stockholm flight.",
      no: "Fade, lineup og tørr formgivning av krøller i samme stol. Maskin og saks i ett — ingen ekstra time, ingen flytur til Stockholm.",
    },
    forWhom: {
      en: "Men, Type 3 — 4",
      no: "Menn, Type 3 — 4",
    },
    includes: [
      {
        en: "Skin / low / mid / high fade — your call",
        no: "Skin / low / mid / high fade — ditt valg",
      },
      {
        en: "Sharp lineup at temple and nape",
        no: "Skarp lineup ved tinning og nakke",
      },
      {
        en: "Dry coil shaping on top, scissor over comb",
        no: "Tørr forming av krøller på toppen, saks over kam",
      },
      {
        en: "Hot-towel finish",
        no: "Avslutning med varmt håndkle",
      },
    ],
    duration: { en: "60 min", no: "60 min" },
    price: { en: "850 NOK", no: "850 NOK" },
  },
  {
    slug: "sculpt-cut-and-beard",
    group: "men",
    name: {
      en: "Sculpt Cut + Beard",
      no: "Sculpt Cut + skjegg",
    },
    blurb: {
      en: "The Sculpt Cut with the beard architected to match the cut — line, taper, edge.",
      no: "Sculpt Cut med skjegg formet til klippen — linje, taper, kant.",
    },
    forWhom: {
      en: "Men, Type 3 — 4",
      no: "Menn, Type 3 — 4",
    },
    includes: [
      {
        en: "Everything in The Sculpt Cut",
        no: "Alt i The Sculpt Cut",
      },
      {
        en: "Beard shape and lineup, picked out for coily texture",
        no: "Skjeggform og lineup, gjort for krøllete struktur",
      },
      {
        en: "Beard oil and pick at home",
        no: "Skjeggolje og pick med hjem",
      },
    ],
    duration: { en: "75 min", no: "75 min" },
    price: { en: "950 NOK", no: "950 NOK" },
  },

  // ---------- Color ----------
  {
    slug: "color-curl-safe",
    group: "color",
    name: {
      en: "Color, curl-safe",
      no: "Farge, krøll-trygg",
    },
    blurb: {
      en: "Color formulated and applied so your curl pattern survives it. Balayage, single-process, glaze, gloss, grey blending.",
      no: "Farge laget og lagt slik at krøllmønsteret overlever den. Balayage, single-process, glanseskyll, glaze, grå-blanding.",
    },
    forWhom: {
      en: "All curl types — consultation required",
      no: "Alle krølltyper — konsultasjon påkrevd",
    },
    includes: [
      {
        en: "Required free 15-minute consultation in advance",
        no: "Obligatorisk gratis 15-minutters konsultasjon på forhånd",
      },
      {
        en: "Curl-safe lightener and bond protection",
        no: "Krøll-trygg blekning og bond-beskyttelse",
      },
      {
        en: "Toning, glaze and finish on your natural pattern",
        no: "Toning, glaze og finish på ditt naturlige mønster",
      },
      {
        en: "Aftercare protocol you can keep",
        no: "Etterpleie-protokoll til å ta med",
      },
    ],
    duration: { en: "from 120 min", no: "fra 120 min" },
    price: { en: "1,200 — 2,200 NOK", no: "1 200 — 2 200 NOK" },
    priceNote: {
      en: "Final price set at consultation, against your hair, in writing — never a surprise.",
      no: "Endelig pris settes ved konsultasjon, mot håret ditt, skriftlig — aldri en overraskelse.",
    },
  },

  // ---------- Treatments / add-ons ----------
  {
    slug: "deep-treatment",
    group: "treatment",
    name: {
      en: "Deep Treatment",
      no: "Deep Treatment",
    },
    blurb: {
      en: "Olaplex, protein or moisture — the right one for what your hair is asking for. Add to any cut.",
      no: "Olaplex, protein eller fukt — den som passer det håret ditt ber om. Tilleggsbehandling til enhver klipp.",
    },
    forWhom: {
      en: "Add-on, all curl types",
      no: "Tilleggsbehandling, alle krølltyper",
    },
    includes: [
      {
        en: "Porosity check before product selection",
        no: "Porøsitets-sjekk før produktvalg",
      },
      {
        en: "Steam or heat cap, depending on your pattern",
        no: "Damp eller varmehette, avhengig av ditt mønster",
      },
      {
        en: "Rinse, condition, leave-in, finish",
        no: "Skylling, balsam, leave-in, finish",
      },
    ],
    duration: { en: "30 min", no: "30 min" },
    price: { en: "350 NOK", no: "350 NOK" },
    priceNote: {
      en: "Add-on. Booked alongside any cut.",
      no: "Tilleggsbehandling. Bookes sammen med en klipp.",
    },
  },

  // ---------- Consult / kids ----------
  {
    slug: "consultation",
    group: "consult",
    name: {
      en: "Free 15-minute consultation",
      no: "Gratis 15-minutters konsultasjon",
    },
    blurb: {
      en: "Dry. No obligation. No upsell. Bring your hair and your questions; we'll tell you what we'd do and what it would cost. Stand-alone, or bundled into a first visit at no charge.",
      no: "Tørr. Uten forpliktelse. Uten salgspress. Ta med håret og spørsmålene dine; vi forteller hva vi ville gjort og hva det ville kostet. Frittstående, eller inkludert i første time uten ekstra kostnad.",
    },
    forWhom: {
      en: "Anyone — first-timers, color clients, the unsure",
      no: "Alle — førstegangs, farge-kunder, de som er usikre",
    },
    includes: [
      {
        en: "Curl type, density, porosity read",
        no: "Avlesning av krølltype, tetthet og porøsitet",
      },
      {
        en: "Honest plan and a written quote",
        no: "Ærlig plan og skriftlig pristilbud",
      },
      {
        en: "Answers to questions you've been holding onto",
        no: "Svar på spørsmål du har gått og lurt på",
      },
    ],
    duration: { en: "15 min", no: "15 min" },
    price: { en: "0 NOK", no: "0 NOK" },
    priceNote: {
      en: "Free, every time. Not a trial. Not a hook.",
      no: "Gratis, hver gang. Ikke en prøvetime. Ikke en krok.",
    },
  },
  {
    slug: "childrens-cut",
    group: "kids",
    name: {
      en: "Children's cut",
      no: "Barneklipp",
    },
    blurb: {
      en: "For curly kids under 12. Calm, unhurried, with a parent in the room and a stylist who knows that the chair is the half of the appointment that takes work.",
      no: "For krøllete barn under 12. Rolig, uten stress, med en forelder i rommet og en stylist som vet at det å sitte stille er den halve timen som krever jobb.",
    },
    forWhom: {
      en: "Under 12, all curl types",
      no: "Under 12, alle krølltyper",
    },
    includes: [
      {
        en: "Dry assessment together with the parent",
        no: "Tørr vurdering sammen med foresatt",
      },
      {
        en: "Cut on the natural pattern",
        no: "Klipp på det naturlige mønsteret",
      },
      {
        en: "A short product chat for at-home care",
        no: "Kort produkt-prat om hjemmepleie",
      },
    ],
    duration: { en: "30 min", no: "30 min" },
    price: { en: "350 NOK", no: "350 NOK" },
  },
];

export const groupLabels: Record<
  Service["group"],
  { eyebrow: LocalizedString; heading: LocalizedString; intro: LocalizedString }
> = {
  signature: {
    eyebrow: { en: "01 — Signature", no: "01 — Signatur" },
    heading: {
      en: "The Jackson Cut",
      no: "The Jackson Cut",
    },
    intro: {
      en: "Our women's cut. Dry. Curl by curl. On the natural pattern. The price doesn't change with your texture or your length.",
      no: "Dameklippen vår. Tørr. Krølle for krølle. På det naturlige mønsteret. Prisen endres ikke med teksturen eller lengden din.",
    },
  },
  men: {
    eyebrow: { en: "02 — Men", no: "02 — Menn" },
    heading: {
      en: "The Sculpt Cut",
      no: "The Sculpt Cut",
    },
    intro: {
      en: "Clipper precision and scissor work, in one chair. Architected, not pampered. The Oslo answer to the Stockholm flight.",
      no: "Maskinpresisjon og sakseteknikk i samme stol. Formgitt, ikke forkjælet. Oslo-svaret på Stockholm-turen.",
    },
  },
  color: {
    eyebrow: { en: "03 — Color", no: "03 — Farge" },
    heading: {
      en: "Color, curl-safe",
      no: "Farge, krøll-trygg",
    },
    intro: {
      en: "Color that respects the curl. We won't book it without a consultation first — color on textured hair is a plan, not a slot.",
      no: "Farge som respekterer krøllen. Vi booker det ikke uten konsultasjon først — farge på krøllete hår er en plan, ikke et tidspunkt.",
    },
  },
  treatment: {
    eyebrow: { en: "04 — Treatment", no: "04 — Behandling" },
    heading: {
      en: "Add-ons",
      no: "Tilleggsbehandlinger",
    },
    intro: {
      en: "What we add when your hair is asking for it — never as a surprise on the bill.",
      no: "Det vi legger til når håret ditt ber om det — aldri som en overraskelse på regningen.",
    },
  },
  consult: {
    eyebrow: { en: "05 — Consultation", no: "05 — Konsultasjon" },
    heading: {
      en: "Just want to talk first",
      no: "Bare vil prate først",
    },
    intro: {
      en: "Free, dry, no obligation, no upsell. The most useful 15 minutes you'll spend before booking anywhere.",
      no: "Gratis, tørr, ingen forpliktelse, ingen salgspress. De mest nyttige 15 minuttene før du booker noe sted.",
    },
  },
  kids: {
    eyebrow: { en: "06 — Children", no: "06 — Barn" },
    heading: { en: "Children's cut", no: "Barneklipp" },
    intro: {
      en: "Calm, unhurried, with a stylist who's done this before.",
      no: "Rolig, uten stress, med en stylist som har gjort dette før.",
    },
  },
};

export const groupOrder: Service["group"][] = [
  "signature",
  "men",
  "color",
  "treatment",
  "consult",
  "kids",
];
