import type { Lang } from "@/components/providers/LangProvider";
import type { ImageKey } from "@/lib/content/images";

type LocalizedString = Record<Lang, string>;

export type Stylist = {
  /** url-safe slug, used for booking deep links */
  slug: string;
  /** display name */
  name: string;
  /** image key in /lib/content/images.ts */
  image: ImageKey;
  /** the role line above the name (founder / stylist / barber-stylist) */
  role: LocalizedString;
  /** the manifesto quote — first-person, 1–2 sentences. Lead of the card. */
  quote: LocalizedString;
  /** one-line training credit. Always English-leaning, brand-voice. */
  training: LocalizedString;
  /** one-line specialty. Architectural register for Adé. */
  specialty: LocalizedString;
  /** instagram handle, no @ */
  instagram?: string;
};

export const team: Stylist[] = [
  {
    slug: "vanessa-jackson",
    name: "Vanessa Jackson",
    image: "founderPortrait",
    role: { en: "Founder & senior stylist", no: "Grunnlegger og senior stylist" },
    quote: {
      en: "Every curl pattern is the same job done with knowledge. The hair tells you the shape — you just have to know how to look.",
      no: "Hver krølltype er den samme jobben, gjort med kunnskap. Håret forteller deg formen — du må bare vite hvordan du skal se.",
    },
    training: {
      en: "Trained at Curl Bar London under Michelle Sultan, 2014. Devachan NYC, 2018. A season with Anthony Dickey at Hair Rules.",
      no: "Utdannet ved Curl Bar London under Michelle Sultan, 2014. Devachan NYC, 2018. En sesong med Anthony Dickey på Hair Rules.",
    },
    specialty: {
      en: "Type 2A through 4C. Dry-cutting, curl-safe color, and the education side of every appointment.",
      no: "Type 2A til 4C. Tørrklipp, krøll-trygg farge, og utdanningsdelen av hver time.",
    },
    instagram: "vanessajackson.cuts",
  },
  {
    slug: "nia-berhane",
    name: "Nia Berhane",
    image: "team1",
    role: { en: "Senior stylist", no: "Senior stylist" },
    quote: {
      en: "I listen to the curl before I touch it. Most of what goes wrong in a chair happens before the scissors are even open.",
      no: "Jeg lytter til krøllen før jeg tar i den. Det meste som går galt i en stol skjer før saksen er åpen.",
    },
    training: {
      en: "Norwegian-Eritrean. Two years assisting at Hare & Bone, London. Curly Hair Artistry programme, 2022.",
      no: "Norsk-eritreisk. To år som assistent ved Hare & Bone i London. Curly Hair Artistry-programmet, 2022.",
    },
    specialty: {
      en: "Type 3 spiral and ringlet patterns. Definition without crunch. Day-three hair you still recognise.",
      no: "Type 3 spiral- og ringlett-krøller. Definisjon uten stivhet. Dag-tre-hår du fortsatt kjenner igjen.",
    },
    instagram: "nia.cuts.curls",
  },
  {
    slug: "ade-okonkwo",
    name: "Adé Okonkwo",
    image: "team2",
    role: { en: "Barber-stylist — men's specialist", no: "Barber-stylist — herrespesialist" },
    quote: {
      en: "A fade is architecture. The taper is the line, the coil is the volume — get the geometry right and the rest takes care of itself.",
      no: "En fade er arkitektur. Tapern er linja, krøllen er volumet — får du geometrien riktig, ordner resten seg selv.",
    },
    training: {
      en: "Trained at Hawthorne, NYC. Nine years inside the Tøyen barber tradition before that. The hands behind the Sculpt Cut.",
      no: "Utdannet ved Hawthorne, NYC. Ni år i Tøyen-barbertradisjonen før det. Hendene bak the Sculpt Cut.",
    },
    specialty: {
      en: "The Sculpt Cut. Fades, tapers, lineups, and dry coil shaping in the same chair. Beard work shaped to the jaw.",
      no: "The Sculpt Cut. Fades, tapere, lineups og tørr krøllforming i samme stol. Skjeggarbeid formet etter kjevelinja.",
    },
    instagram: "ade.sculpts",
  },
  {
    slug: "mira-dahir",
    name: "Mira Dahir",
    image: "team3",
    role: { en: "Senior stylist — locs and protective styles", no: "Senior stylist — locs og beskyttende frisyrer" },
    quote: {
      en: "Healthy hair starts at the scalp. We can talk about shape and definition all day, but if the foundation isn't right, none of it lasts.",
      no: "Friskt hår starter i hodebunnen. Vi kan snakke om form og definisjon hele dagen, men om fundamentet ikke er riktig, holder ingenting.",
    },
    training: {
      en: "Somali-Norwegian. Ran her own chair in Tøyen for six years. Trichology certificate, 2023.",
      no: "Somalisk-norsk. Drev egen stol på Tøyen i seks år. Trikologi-sertifikat, 2023.",
    },
    specialty: {
      en: "Type 4. Loc maintenance, retwists, protective styles, scalp health. Long appointments done properly, not rushed.",
      no: "Type 4. Loc-vedlikehold, retwist, beskyttende frisyrer, hodebunnshelse. Lange timer gjort ordentlig, ikke forhastet.",
    },
    instagram: "mira.locs.oslo",
  },
  {
    slug: "ines-lindberg",
    name: "Inés Lindberg",
    image: "team4",
    role: { en: "Stylist", no: "Stylist" },
    quote: {
      en: "I was the wavy girl who got told her hair was frizzy for twenty years. Half my job is unlearning what someone else taught the client about their own head.",
      no: "Jeg var jenta med bølger som ble fortalt at håret var krusete i tjue år. Halve jobben min er å lære bort det noen andre lærte kunden om sitt eget hode.",
    },
    training: {
      en: "Norwegian. Trained at Bouclème, London. Curly Hair Artistry advanced, 2023.",
      no: "Norsk. Utdannet ved Bouclème i London. Curly Hair Artistry, viderekommen, 2023.",
    },
    specialty: {
      en: "Type 2 and looser Type 3. Wave-friendly cuts, face-framing layers, the first-time-curly-method client.",
      no: "Type 2 og løsere type 3. Bølgevennlige klipp, ansiktsformende lag, krølle-metode-nybegynneren.",
    },
    instagram: "ines.bolger",
  },
];
