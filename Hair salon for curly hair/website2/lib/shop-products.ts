// Real product catalogue, replacing the mock [name, tag, price] tuples that
// used to live inline in lib/content.ts. Generated from
// /shop-products-research.md (15 products, real prices in NOK, real product
// photography stored under /public/images/shop/).
// The cart subsystem (useCart + AddToBagButton + CartDrawer) is product-data
// agnostic, so this file only needs to expose the shape used by ShopPage.

export type ShopCategory =
  | "leave-in"
  | "shampoo"
  | "treatment"
  | "tool"
  | "accessory";

export type ShopStock = "in_stock" | "low_stock" | "out_of_stock";

export type RealProduct = {
  id: string;
  name: string;
  brand: string;
  /** Price in NOK, integer. */
  price: number;
  category: ShopCategory;
  /** Andre Walker curl pattern tags, e.g. ["3B", "4A"]. */
  curlTypes: string[];
  stock: ShopStock;
  description: { en: string; no: string };
  /** Path under /public, e.g. /images/shop/innersense-definition.jpg. */
  imageUrl: string;
  /** External brand or distributor checkout link. */
  externalCheckoutUrl: string;
  /** Optional in-house stylist endorsement, bilingual. */
  stylistPick?: { en: string; no: string };
};

export const SHOP_CATEGORIES: ShopCategory[] = [
  "leave-in",
  "shampoo",
  "treatment",
  "tool",
  "accessory",
];

export const realProducts: RealProduct[] = [
  {
    id: "pattern-heavy-conditioner",
    name: "Pattern Beauty Heavy Conditioner",
    brand: "Pattern Beauty",
    price: 320,
    category: "leave-in",
    curlTypes: ["4A", "4B", "4C"],
    stock: "in_stock",
    description: {
      en: "A slip-heavy moisture mask from Tracee Ellis Ross. Detangles tight coils in the shower without protein overload.",
      no: "Tung fukt-conditioner fra Tracee Ellis Ross. Greier ut tette krøller i dusjen uten å proppe håret med protein.",
    },
    imageUrl: "/images/shop/placeholder.svg",
    externalCheckoutUrl: "https://patternbeauty.com/products/heavy-conditioner",
    stylistPick: {
      en: "Vanessa pulls this off the shelf for any client with dense Type 4 hair and a long detangle.",
      no: "Vanessa griper denne til klienter med tykt Type 4-hår og lang utgreiingsjobb.",
    },
  },
  {
    id: "bread-everyday-gloss",
    name: "Bread Beauty Supply Everyday Gloss Leave-in",
    brand: "Bread Beauty Supply",
    price: 295,
    category: "leave-in",
    curlTypes: ["2B", "2C", "3A", "3B"],
    stock: "in_stock",
    description: {
      en: "Light Australian leave-in spray. Macadamia and sea buckthorn for next-day refresh without buildup.",
      no: "Lett leave-in-spray fra Australia. Macadamia og havtindorn gir oppfriskning til dag to uten å tynge.",
    },
    imageUrl: "/images/shop/placeholder.svg",
    externalCheckoutUrl: "https://breadbeautysupply.com/products/everyday-gloss-leave-in",
    stylistPick: {
      en: "Inés uses this on wavy Type 2 clients who want movement, not crunch.",
      no: "Inés bruker denne på Type 2-bølger som vil ha bevegelse, ikke knase.",
    },
  },
  {
    id: "innersense-i-create-definition",
    name: "Innersense I Create Definition",
    brand: "Innersense Organic Beauty",
    price: 390,
    category: "leave-in",
    curlTypes: ["2C", "3A", "3B", "3C"],
    stock: "in_stock",
    description: {
      en: "Lightweight defining gel-cream with shea butter and tamanu oil. Soft hold, no flake.",
      no: "Lett definisjonskrem med sheasmør og tamanu-olje. Mykt grep og ingen hvit hinne.",
    },
    imageUrl: "/images/shop/innersense-definition.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/i-create-definition",
  },
  {
    id: "ufd-curly-magic",
    name: "Uncle Funky's Daughter Curly Magic",
    brand: "Uncle Funky's Daughter",
    price: 695,
    category: "leave-in",
    curlTypes: ["3B", "3C", "4A", "4B"],
    stock: "low_stock",
    description: {
      en: "Aloe, marshmallow root and nettle gel-cream for definition with serious slip. A Texas cult favourite.",
      no: "Gele-krem med aloe, marshmallow-rot og brennesle. Gir definisjon med skikkelig glid. Kultfavoritt fra Texas.",
    },
    imageUrl: "/images/shop/ufd-curly-magic.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/curly-magic-532ml",
    stylistPick: {
      en: "Vanessa's pick for thick Type 3C to 4A hair that drinks product.",
      no: "Vanessa sin favoritt for tykt 3C til 4A-hår som suger til seg produkt.",
    },
  },
  {
    id: "boucleme-super-volumising-foam",
    name: "Bouclème Super Volumising Foam",
    brand: "Bouclème",
    price: 349,
    category: "leave-in",
    curlTypes: ["2A", "2B", "2C", "3A"],
    stock: "in_stock",
    description: {
      en: "UK-formulated mousse with linseed extract. Lifts roots on fine waves without stiffness.",
      no: "Skum fra UK med linfrø-ekstrakt. Løfter rotpartiet på fine bølger uten å stivne.",
    },
    imageUrl: "/images/shop/boucleme-volumising-foam.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/super-volumising-foam-200-ml",
    stylistPick: {
      en: "Inés recommends for fine Type 2 hair that goes flat by lunch.",
      no: "Inés anbefaler til fint Type 2-hår som faller flatt etter lunsj.",
    },
  },
  {
    id: "innersense-hydrating-cream-hairbath",
    name: "Innersense Hydrating Cream Hairbath",
    brand: "Innersense Organic Beauty",
    price: 380,
    category: "shampoo",
    curlTypes: ["3A", "3B", "3C", "4A"],
    stock: "in_stock",
    description: {
      en: "Low-poo cream cleanser with honey and coconut. Sulfate-free, made for daily curl wash days.",
      no: "Mild cream-rens med honning og kokos. Sulfatfri, lagd for ofte krøll-vask.",
    },
    imageUrl: "/images/shop/innersense-hydrating-hairbath.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/hydrating-cream-hairbath",
  },
  {
    id: "innersense-clarity-hairbath",
    name: "Innersense Clarity Hairbath",
    brand: "Innersense Organic Beauty",
    price: 380,
    category: "shampoo",
    curlTypes: ["2B", "2C", "3A", "3B"],
    stock: "in_stock",
    description: {
      en: "Clarifying sulfate-free wash for buildup-prone curls. Lemongrass and bergamot. Use monthly.",
      no: "Sulfatfri klargjørende vask for krøller med belegg. Sitrongress og bergamott. Brukes månedlig.",
    },
    imageUrl: "/images/shop/innersense-clarity-hairbath.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/clarity-hairbath",
  },
  {
    id: "cbb-creamy-hair-cleanser",
    name: "Curls by Brown Creamy Hair Cleanser",
    brand: "Curls by Brown",
    price: 399,
    category: "shampoo",
    curlTypes: ["3C", "4A", "4B", "4C"],
    stock: "in_stock",
    description: {
      en: "Conditioning co-wash for tight coils between deeper cleanses. No sulfates, no silicones.",
      no: "Pleiende co-wash for tette krøller mellom vanlige vasker. Uten sulfater og silikoner.",
    },
    imageUrl: "/images/shop/cbb-creamy-cleanser.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/creamy-hair-cleanser",
    stylistPick: {
      en: "Adé suggests this for clients washing two or three times a week without stripping.",
      no: "Adé foreslår denne til klienter som vasker to eller tre ganger i uken uten å tørke ut håret.",
    },
  },
  {
    id: "innersense-hydrating-hair-mask",
    name: "Innersense Hydrating Hair Mask",
    brand: "Innersense Organic Beauty",
    price: 440,
    category: "treatment",
    curlTypes: ["3B", "3C", "4A", "4B", "4C"],
    stock: "in_stock",
    description: {
      en: "Intensive weekly mask with shea butter, tamanu and jojoba. Repairs split ends and softens coarse texture.",
      no: "Intensiv ukentlig kur med sheasmør, tamanu og jojoba. Reparerer kløyvde tupper og mykner grov tekstur.",
    },
    imageUrl: "/images/shop/innersense-hydrating-mask.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/hydrating-hair-masque",
    stylistPick: {
      en: "Mira layers this under a plastic cap with low heat for ten minutes.",
      no: "Mira lar denne ligge under plast med lav varme i ti minutter.",
    },
  },
  {
    id: "k18-leave-in-molecular-repair",
    name: "K18 Leave-in Molecular Repair Hair Mask",
    brand: "K18",
    price: 890,
    category: "treatment",
    curlTypes: ["2C", "3A", "3B", "3C", "4A"],
    stock: "low_stock",
    description: {
      en: "Bioactive peptide treatment that repairs bond damage from bleach, color and heat. Four minutes, no rinse.",
      no: "Bioaktiv peptid-behandling som reparerer skader fra bleking, farge og varme. Fire minutter, ingen skylling.",
    },
    imageUrl: "/images/shop/placeholder.svg",
    externalCheckoutUrl: "https://www.k18hair.com/products/leave-in-molecular-repair-hair-mask",
    stylistPick: {
      en: "Vanessa recommends after every color service for coloured curls.",
      no: "Vanessa anbefaler etter hver fargebehandling for fargede krøller.",
    },
  },
  {
    id: "boucleme-revive-5-hair-oil",
    name: "Bouclème Revive 5 Hair Oil",
    brand: "Bouclème",
    price: 439,
    category: "treatment",
    curlTypes: ["2C", "3A", "3B", "3C", "4A", "4B"],
    stock: "in_stock",
    description: {
      en: "Plant-based finishing oil with kahai, moringa and mongongo. Use as a sealant under stylers or overnight pre-wash.",
      no: "Plantebasert finish-olje med kahai, moringa og mongongo. Bruk som forsegling under styling eller som pre-wash over natten.",
    },
    imageUrl: "/images/shop/boucleme-revive-oil.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/revive-5-hair-oil-100ml",
  },
  {
    id: "bounce-curl-edgelift-brush",
    name: "Bounce Curl Define EdgeLift Brush",
    brand: "Bounce Curl",
    price: 449,
    category: "tool",
    curlTypes: ["3A", "3B", "3C", "4A", "4B"],
    stock: "in_stock",
    description: {
      en: "Two-in-one brush. One side smooths edges, the other lifts and separates curls at the root.",
      no: "To-i-én-børste. Den ene siden glatter kanter, den andre løfter og separerer krøller ved roten.",
    },
    imageUrl: "/images/shop/bounce-curl-edgelift.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/bounce-curl-define-edgelift-brush",
    stylistPick: {
      en: "Adé uses this for sharp edges on fades and tapered coily cuts.",
      no: "Adé bruker denne for skarpe kanter på fade og taperte krøllklipp.",
    },
  },
  {
    id: "denman-d3-brush",
    name: "Denman D3 7-Row Brush",
    brand: "Denman",
    price: 280,
    category: "tool",
    curlTypes: ["2C", "3A", "3B", "3C"],
    stock: "in_stock",
    description: {
      en: "Seven rows of nylon pins. Defines clumps on damp hair, then leave the curls alone to dry.",
      no: "Syv rader nylonpinner. Definerer klumper i fuktig hår, så lar du krøllene tørke i fred.",
    },
    imageUrl: "/images/shop/denman-d3.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/denman-d3n-7-row",
    stylistPick: {
      en: "Inés walks every new Type 3 client through Denman technique at the chair.",
      no: "Inés viser hver nye Type 3-klient hvordan Denman skal brukes ved stolen.",
    },
  },
  {
    id: "cbb-bamboo-afro-pick",
    name: "Curls by Brown Bamboo Afro Pick",
    brand: "Curls by Brown",
    price: 190,
    category: "accessory",
    curlTypes: ["3C", "4A", "4B", "4C"],
    stock: "in_stock",
    description: {
      en: "Lightweight bamboo pick for stretching coils without static. Smooth tips, no snag.",
      no: "Lett bambus-pick for å strekke krøller uten statisk elektrisitet. Glatte tupper, ingen rufsing.",
    },
    imageUrl: "/images/shop/cbb-bamboo-pick.jpg",
    externalCheckoutUrl: "https://www.curlsbybrown.no/products/bamboo-afro-comb",
  },
  {
    id: "house-silk-pillowcase-teal",
    name: "Mulberry Silk Pillowcase, Deep Teal",
    brand: "Jackson & Coil",
    price: 540,
    category: "accessory",
    curlTypes: ["2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"],
    stock: "out_of_stock",
    description: {
      en: "22 momme mulberry silk, hidden zipper, standard size. Reduces friction, frizz and overnight breakage.",
      no: "22 momme mulberry-silke med skjult glidelås i standard størrelse. Mindre friksjon, mindre frizz og mindre brekk om natten.",
    },
    imageUrl: "/images/shop/placeholder.svg",
    externalCheckoutUrl: "https://jacksonandcoil.no/shop/silk-pillowcase",
    stylistPick: {
      en: "Vanessa says this is the single highest-impact aftercare purchase any client makes.",
      no: "Vanessa sier dette er det enkleste kjøpet som gir størst utslag på krøll-helsen.",
    },
  },
];
