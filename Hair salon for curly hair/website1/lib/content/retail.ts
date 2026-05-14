import type { ImageKey } from "@/lib/content/images";
import type { FilterValue } from "@/components/curl-type-filter/CurlTypeFilter";
import type { Stylist } from "@/lib/content/portfolio";

export type ProductBrand =
  | "Bread Beauty Supply"
  | "Pattern Beauty"
  | "Adwoa Beauty"
  | "Innersense"
  | "Bouclème"
  | "Curlsmith"
  | "Cantu"
  | "Mielle Organics"
  | "Camille Rose"
  | "Shea Moisture"
  | "As I Am"
  | "Design Essentials"
  | "House"; // tools / accessories without a single brand

export type ProductCategory =
  | "Cleanse"
  | "Condition"
  | "Leave-in"
  | "Style"
  | "Oil"
  | "Tool"
  | "Accessory"
  | "Men's";

export type Product = {
  id: string;
  image: ImageKey;
  name: { en: string; no: string };
  brand: ProductBrand;
  /** Price in NOK, integer. */
  price: number;
  description: { en: string; no: string };
  /** Curl-type tags + pseudo-tags ("Mens" for men's-specific items). */
  tags: ReadonlyArray<FilterValue>;
  category: ProductCategory;
  /** Optional stylist endorsement. */
  recommendedBy?: Stylist;
};

export const PRODUCT_BRANDS: ProductBrand[] = [
  "Bread Beauty Supply",
  "Pattern Beauty",
  "Adwoa Beauty",
  "Innersense",
  "Bouclème",
  "Curlsmith",
  "Cantu",
  "Mielle Organics",
  "Camille Rose",
  "Shea Moisture",
  "As I Am",
  "Design Essentials",
  "House",
];

export const products: ReadonlyArray<Product> = [
  {
    id: "bread-hair-oil",
    image: "retail1",
    name: { en: "Hair Oil", no: "Hårolje" },
    brand: "Bread Beauty Supply",
    price: 320,
    description: {
      en: "Lightweight finishing oil. Macadamia, sea buckthorn, vitamin E.",
      no: "Lett finishing-olje. Macadamia, havtindorn, E-vitamin.",
    },
    tags: ["2C", "3A", "3B", "3C"],
    category: "Oil",
    recommendedBy: "Inés",
  },
  {
    id: "bread-hair-mask",
    image: "retail1",
    name: { en: "Hair Mask", no: "Hårmaske" },
    brand: "Bread Beauty Supply",
    price: 380,
    description: {
      en: "Weekly slip-and-soak conditioner for stretched, dry curls.",
      no: "Ukentlig kur for tørre, strukne krøller.",
    },
    tags: ["3B", "3C", "4A", "4B"],
    category: "Condition",
  },
  {
    id: "bread-leave-in",
    image: "retail1",
    name: { en: "Everyday Gloss Leave-in", no: "Everyday Gloss Leave-in" },
    brand: "Bread Beauty Supply",
    price: 295,
    description: {
      en: "Light leave-in for everyday refresh. Spray, scrunch, go.",
      no: "Lett leave-in for daglig oppfriskning. Spray, krøll, ferdig.",
    },
    tags: ["2B", "2C", "3A", "3B"],
    category: "Leave-in",
  },
  {
    id: "pattern-heavy-conditioner",
    image: "retail1",
    name: { en: "Heavy Conditioner", no: "Heavy Conditioner" },
    brand: "Pattern Beauty",
    price: 290,
    description: {
      en: "Slip-heavy conditioner for tight coils. Detangles in the shower.",
      no: "Tung conditioner for tette krøller. Greier ut i dusjen.",
    },
    tags: ["4A", "4B", "4C"],
    category: "Condition",
    recommendedBy: "Vanessa",
  },
  {
    id: "pattern-leave-in",
    image: "retail1",
    name: { en: "Leave-in Conditioner", no: "Leave-in Conditioner" },
    brand: "Pattern Beauty",
    price: 310,
    description: {
      en: "Creamy leave-in. Layer under a styler for definition without crunch.",
      no: "Kremaktig leave-in. Legg under en styler for definisjon uten knase.",
    },
    tags: ["3C", "4A", "4B", "4C"],
    category: "Leave-in",
  },
  {
    id: "adwoa-baomint-deep",
    image: "retail1",
    name: { en: "Baomint Deep Conditioner", no: "Baomint Deep Conditioner" },
    brand: "Adwoa Beauty",
    price: 410,
    description: {
      en: "Baobab and mint deep treatment. Cooling, slip-rich, weekly.",
      no: "Baobab og mint dyp kur. Kjølig, glir godt, ukentlig.",
    },
    tags: ["3B", "3C", "4A", "4B", "4C"],
    category: "Condition",
    recommendedBy: "Mira",
  },
  {
    id: "adwoa-baomint-styler",
    image: "retail1",
    name: { en: "Baomint Styler", no: "Baomint Styler" },
    brand: "Adwoa Beauty",
    price: 365,
    description: {
      en: "Curl-defining cream. Soft hold, no white cast on dark hair.",
      no: "Krøll-definerende krem. Mykt grep, ingen hvit hinne på mørkt hår.",
    },
    tags: ["3B", "3C", "4A", "4B"],
    category: "Style",
  },
  {
    id: "innersense-hydrating-cream",
    image: "retail1",
    name: { en: "Hydrating Cream Hairbath", no: "Hydrating Cream Hairbath" },
    brand: "Innersense",
    price: 340,
    description: {
      en: "Low-poo cream cleanser. Honey, coconut, no sulfates.",
      no: "Mild cream-rens. Honning, kokos, sulfatfri.",
    },
    tags: ["3A", "3B", "3C"],
    category: "Cleanse",
  },
  {
    id: "boucleme-curl-cream",
    image: "retail1",
    name: { en: "Curl Defining Gel", no: "Curl Defining Gel" },
    brand: "Bouclème",
    price: 285,
    description: {
      en: "UK-formulated curl gel. Linseed and flaxseed for medium hold.",
      no: "Krøll-gele fra UK. Linfrø for medium grep.",
    },
    tags: ["2C", "3A", "3B", "3C"],
    category: "Style",
    recommendedBy: "Inés",
  },
  {
    id: "curlsmith-protein-cream",
    image: "retail1",
    name: { en: "Curl Cream Mousse", no: "Curl Cream Mousse" },
    brand: "Curlsmith",
    price: 305,
    description: {
      en: "Protein-balanced styling foam. Use on soaking-wet hair.",
      no: "Proteinbalansert styling-skum. Bruk på vått hår.",
    },
    tags: ["2B", "2C", "3A"],
    category: "Style",
  },
  {
    id: "cantu-leave-in",
    image: "retail1",
    name: { en: "Leave-in Repair Cream", no: "Leave-in Repair Cream" },
    brand: "Cantu",
    price: 95,
    description: {
      en: "The drugstore staple. Shea butter base, layer-friendly, good price.",
      no: "Klassikeren fra apoteket. Shea-base, kan lagdeles, god pris.",
    },
    tags: ["3B", "3C", "4A", "4B", "4C"],
    category: "Leave-in",
  },
  {
    id: "mielle-rosemary-mint",
    image: "retail1",
    name: {
      en: "Rosemary Mint Scalp & Hair Strengthening Oil",
      no: "Rosmarin-mint hodebunn og hår styrkende olje",
    },
    brand: "Mielle Organics",
    price: 220,
    description: {
      en: "Castor base, rosemary and mint. Massage into the scalp twice a week.",
      no: "Castor-base, rosmarin og mynte. Masser inn i hodebunnen to ganger i uken.",
    },
    tags: ["3A", "3B", "3C", "4A", "4B", "4C"],
    category: "Oil",
    recommendedBy: "Vanessa",
  },
  {
    id: "camille-rose-honey",
    image: "retail1",
    name: { en: "Honey Hydrate Leave-in", no: "Honey Hydrate Leave-in" },
    brand: "Camille Rose",
    price: 275,
    description: {
      en: "Honey, mango, rice. Sweet on the nose, slip-rich for thick textures.",
      no: "Honning, mango, ris. Søt duft, god glid for tykke teksturer.",
    },
    tags: ["3C", "4A", "4B"],
    category: "Leave-in",
  },
  {
    id: "shea-moisture-mens",
    image: "retail1",
    name: { en: "Beard Wash & Conditioner", no: "Skjegg-shampoo og balsam" },
    brand: "Shea Moisture",
    price: 195,
    description: {
      en: "Two-in-one for coily beards. Maracuja oil, shea butter.",
      no: "To-i-én for krøllete skjegg. Maracuja-olje, sheasmør.",
    },
    tags: ["Mens", "4A", "4B", "4C"],
    category: "Men's",
    recommendedBy: "Adé",
  },
  {
    id: "twist-sponge",
    image: "retail2",
    name: { en: "Twist Sponge", no: "Twist-svamp" },
    brand: "House",
    price: 180,
    description: {
      en: "Double-sided sponge for defining short coils. Daniel's specific ask.",
      no: "Tosidig svamp for å definere korte krøller.",
    },
    tags: ["Mens", "4A", "4B", "4C"],
    category: "Tool",
    recommendedBy: "Adé",
  },
  {
    id: "silk-durag-teal",
    image: "retail3",
    name: { en: "Silk Durag — Deep Teal", no: "Silke-durag — dyp teal" },
    brand: "House",
    price: 240,
    description: {
      en: "Real mulberry silk, not polyester. Long tails, double-stitched seams.",
      no: "Ekte mulberry-silke, ikke polyester. Lange bånd, dobbeltsydde sømmer.",
    },
    tags: ["Mens", "3C", "4A", "4B", "4C"],
    category: "Accessory",
  },
  {
    id: "microfiber-curl-tee",
    image: "retail2",
    name: { en: "Microfiber Curl Tee", no: "Mikrofiber krøll-T" },
    brand: "House",
    price: 295,
    description: {
      en: "For plopping. Absorbs without roughing up the cuticle.",
      no: "For plopping. Suger opp uten å rufse opp neglebåndet.",
    },
    tags: ["2C", "3A", "3B", "3C", "4A", "4B"],
    category: "Accessory",
  },
  {
    id: "diffuser-universal",
    image: "retail2",
    name: { en: "Universal Diffuser", no: "Universal-diffuser" },
    brand: "House",
    price: 380,
    description: {
      en: "Fits standard hairdryers. Long fingers for root volume on tighter coils.",
      no: "Passer standard hårfønere. Lange fingre for rotvolum på tette krøller.",
    },
    tags: ["3A", "3B", "3C", "4A"],
    category: "Tool",
  },
  {
    id: "denman-brush",
    image: "retail2",
    name: { en: "Denman D3 Brush", no: "Denman D3-børste" },
    brand: "House",
    price: 320,
    description: {
      en: "Seven rows of nylon pins. Defines clumps on damp hair, then leave alone.",
      no: "Syv rader nylonbørster. Definerer klumper i fuktig hår, la så være.",
    },
    tags: ["2C", "3A", "3B", "3C"],
    category: "Tool",
    recommendedBy: "Inés",
  },
  {
    id: "wide-tooth-comb",
    image: "retail2",
    name: { en: "Wide-tooth Comb", no: "Bred-tannet kam" },
    brand: "House",
    price: 95,
    description: {
      en: "Seamless cellulose acetate, no snag points. Detangle with conditioner.",
      no: "Sømløs celluloseacetat, ingen krokpunkter. Greie ut med balsam.",
    },
    tags: ["2A", "2B", "2C", "3A", "3B", "3C", "4A", "4B", "4C"],
    category: "Tool",
  },
  {
    id: "beard-pick-oil",
    image: "retail2",
    name: { en: "Beard Pick + Beard Oil Set", no: "Skjegg-pick + skjegg-olje sett" },
    brand: "House",
    price: 290,
    description: {
      en: "Solid wood pick and 30ml jojoba-argan beard oil. For coily beards.",
      no: "Pick i solid tre og 30ml jojoba-argan skjegg-olje. For krøllete skjegg.",
    },
    tags: ["Mens", "4A", "4B", "4C"],
    category: "Men's",
    recommendedBy: "Adé",
  },
];
