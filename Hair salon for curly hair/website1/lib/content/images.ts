// Image manifest — every image referenced anywhere on the site is listed here.
// The Codex imagegen agent generates these into /public/images/ using the
// descriptions below as prompts. Page agents reference these by key.
//
// Every image MUST pass BRAND.md §9 Photography Test:
//   Type 4 hair, dark skin, lit properly, joyful, real-life context.
//   Hero rotation includes Black man with fade-and-coils.
//   No "wavy 2b girl with a flip" as the lead.

export type SiteImage = {
  /** filename (relative to /public/images/) */
  file: string;
  /** what the image shows — used as imagegen prompt */
  description: string;
  /** alt text (English) */
  alt: string;
  /** rough aspect ratio: portrait / landscape / square */
  aspect: "portrait" | "landscape" | "square";
};

export const images = {
  // ---------------- Hero ----------------
  heroPrimary: {
    file: "hero-primary.jpg",
    description:
      "Editorial portrait of a Black woman in her late 20s with Type 4a/4b natural curls, mid-laugh, looking off-camera. Warm cream studio backdrop. Soft directional daylight from camera-left, properly lit dark skin (not muddy). Wearing a simple ribbed cream tank. Hands relaxed. Full face, eye contact direction warm but candid. Frame: from collarbones up, head centered with breathing room above. Photographic, not illustrative.",
    alt: "A Black woman with Type 4 curls laughing, warm cream backdrop",
    aspect: "portrait" as const,
  },
  heroAlt1: {
    file: "hero-alt-1.jpg",
    description:
      "Black man, early 30s, sharp high-top fade with defined coils on top — Lakeith Stanfield silhouette. Documentary register: shot on the street outside a Grünerløkka café in Oslo, mid-conversation, gesturing with one hand. Late-afternoon golden light. Wearing a textured wool coat over an off-white turtleneck. Editorial / documentary, not beauty. Frame: from chest up.",
    alt: "Black man with a high-top fade and coils on top, Oslo street setting",
    aspect: "portrait" as const,
  },
  heroAlt2: {
    file: "hero-alt-2.jpg",
    description:
      "Mid-action mid-cut: a Black female stylist (Vanessa, mid-30s, locs herself) cutting another woman's Type 3c curls with scissors, dry-cutting, curl by curl. Both women smiling slightly mid-conversation. Salon interior visible in soft focus background — cream walls, brass details, plants. Documentary / editorial register. Hands in focus.",
    alt: "Stylist Vanessa Jackson dry-cutting a client's Type 3c curls in the salon",
    aspect: "landscape" as const,
  },

  // ---------------- Founder ----------------
  founderPortrait: {
    file: "founder-portrait.jpg",
    description:
      "Editorial portrait of Vanessa Jackson, mid-30s, Black British woman with shoulder-length sisterlocks. Direct gaze, slight half-smile. Wearing a tobacco-brown linen overshirt. Warm cream studio backdrop. Soft daylight from camera-left. Frame: from chest up. Looks like a confident salon owner / editorial founder portrait, not a corporate headshot.",
    alt: "Founder Vanessa Jackson, portrait against cream backdrop",
    aspect: "portrait" as const,
  },
  founderHands: {
    file: "founder-hands.jpg",
    description:
      "Close-up of Vanessa's hands working a section of Type 4 hair — fingers separating coils, gold rings on two fingers. Documentary, soft top-light. Skin tones rendered properly, not muddy. Tight crop on hands and a portion of hair only.",
    alt: "Close-up of hands working through Type 4 coils",
    aspect: "landscape" as const,
  },

  // ---------------- Team ----------------
  team1: {
    file: "team-nia.jpg",
    description:
      "Editorial portrait of a mixed-heritage woman in her late 20s with Type 3b spiral curls in a low bun, gold hoop earrings. Warm cream backdrop, soft directional light, slight smile. Frame: from shoulders up.",
    alt: "Stylist portrait — Type 3b curls",
    aspect: "portrait" as const,
  },
  team2: {
    file: "team-ade.jpg",
    description:
      "Editorial portrait of a Black man in his late 30s with a sharp barbered taper and short coils on top, well-groomed beard. Warm cream backdrop. Confident, slight smile. From shoulders up.",
    alt: "Stylist portrait — Black male barber-stylist with taper and coils",
    aspect: "portrait" as const,
  },
  team3: {
    file: "team-mira.jpg",
    description:
      "Editorial portrait of a Somali-Norwegian woman in her early 30s with locs styled half-up, hoop earrings, calm direct gaze. Warm cream backdrop. From shoulders up.",
    alt: "Stylist portrait — Somali-Norwegian stylist with locs",
    aspect: "portrait" as const,
  },
  team4: {
    file: "team-ines.jpg",
    description:
      "Editorial portrait of a white-passing mixed-heritage woman in her early 40s with Type 3a wavy-curly hair shoulder length, freckles, warm slight smile. Warm cream backdrop. From shoulders up.",
    alt: "Stylist portrait — Type 3a curl specialist",
    aspect: "portrait" as const,
  },

  // ---------------- Portfolio ----------------
  portfolio2A: {
    file: "portfolio-2a-1.jpg",
    description:
      "Three-quarter editorial portrait of a Norwegian woman, late 30s, with Type 2A loose waves freshly cut to shoulder length, day-2 hair (slightly air-dried, natural). Outside on a Grünerløkka street, autumn light. Wearing a navy oversized blazer.",
    alt: "Type 2A finished cut, Oslo street",
    aspect: "portrait" as const,
  },
  portfolio2B: {
    file: "portfolio-2b-1.jpg",
    description:
      "Editorial portrait of a Type 2B/2C wavy-curly woman, mid-30s, mid-length cut with face-framing layers, mixed Asian-European heritage. Warm cream backdrop, soft daylight.",
    alt: "Type 2B/2C cut, studio",
    aspect: "portrait" as const,
  },
  portfolio3A: {
    file: "portfolio-3a-1.jpg",
    description:
      "Editorial portrait of a mixed-heritage woman in her late 20s with shoulder-length Type 3A spiral curls, freshly cut for definition. Slight side glance. Warm cream backdrop.",
    alt: "Type 3A spiral curls, finished cut",
    aspect: "portrait" as const,
  },
  portfolio3B: {
    file: "portfolio-3b-1.jpg",
    description:
      "Editorial portrait of a Black-Afro-Latina woman, early 30s, voluminous Type 3B/3C ringlet curls, mid-length, joyful expression. Warm cream backdrop.",
    alt: "Type 3B ringlet curls, finished cut",
    aspect: "portrait" as const,
  },
  portfolio3C: {
    file: "portfolio-3c-1.jpg",
    description:
      "Three-quarter portrait of a Black woman, mid-20s, freshly cut Type 3C corkscrew curls, day-1 hair, voluminous. Outside, Oslo storefront in soft background. Confident gaze.",
    alt: "Type 3C corkscrew curls, Oslo street",
    aspect: "portrait" as const,
  },
  portfolio4A: {
    file: "portfolio-4a-1.jpg",
    description:
      "Editorial portrait of a Black woman, late 20s, Type 4A coils freshly shaped — defined, voluminous, mid-length. Warm cream backdrop. Hand resting near her cheek. Soft direct daylight.",
    alt: "Type 4A coils, defined and shaped",
    aspect: "portrait" as const,
  },
  portfolio4B: {
    file: "portfolio-4b-1.jpg",
    description:
      "Editorial portrait of a Black woman, mid-30s, Type 4B Z-pattern coils sculpted into a tapered afro shape. Looking over her shoulder, mid-laugh. Warm cream backdrop, dappled light.",
    alt: "Type 4B tapered afro, sculpted",
    aspect: "portrait" as const,
  },
  portfolio4C: {
    file: "portfolio-4c-1.jpg",
    description:
      "Editorial portrait of a dark-skinned Black woman, late 20s, Type 4C tightly coiled crown freshly shaped — strong silhouette. Wearing gold hoop earrings. Direct confident gaze. Warm cream backdrop, properly lit dark skin.",
    alt: "Type 4C crown, freshly shaped",
    aspect: "portrait" as const,
  },
  portfolioMen1: {
    file: "portfolio-men-fade-coils.jpg",
    description:
      "Editorial portrait of a Black man, early 30s, sharp low-fade with defined Type 4A coils on top — clean lineup at the temple, mid-laugh. Warm cream backdrop.",
    alt: "Black man, low-fade with defined coils on top",
    aspect: "portrait" as const,
  },
  portfolioMen2: {
    file: "portfolio-men-locs.jpg",
    description:
      "Editorial portrait of a Black man, late 20s, mid-length sisterlocks freshly maintained, head turned slightly. Warm cream backdrop.",
    alt: "Black man with sisterlocks",
    aspect: "portrait" as const,
  },
  portfolioColor1: {
    file: "portfolio-color-1.jpg",
    description:
      "Editorial portrait of a mixed-heritage woman, late 20s, Type 3B curls with curl-safe deep auburn balayage. Warm cream backdrop, side-lit so the color reads.",
    alt: "Curl-safe auburn balayage on Type 3B",
    aspect: "portrait" as const,
  },
  portfolioColor2: {
    file: "portfolio-color-2.jpg",
    description:
      "Editorial portrait of a Black woman, mid-20s, Type 4A coils with subtle copper highlights through the canopy. Warm cream backdrop.",
    alt: "Copper highlights on Type 4A coils",
    aspect: "portrait" as const,
  },

  // ---------------- The Method ----------------
  method1: {
    file: "method-1-assess.jpg",
    description:
      "Documentary close-up: stylist's hands gently lifting a section of Type 4 coils to assess the curl pattern dry, before any cutting. Salon interior soft focus. Warm light. Hands and a section of hair only — tight crop.",
    alt: "Stylist assessing dry curl pattern",
    aspect: "landscape" as const,
  },
  method2: {
    file: "method-2-cut.jpg",
    description:
      "Documentary mid-shot: stylist mid-cut, scissors visible, snipping a single dry curl. Client visible only in soft focus. Salon interior. Warm side light.",
    alt: "Dry curl-by-curl cutting in progress",
    aspect: "landscape" as const,
  },
  method3: {
    file: "method-3-finish.jpg",
    description:
      "Documentary close-up: client's finished Type 4 coils with hand running through them, defined and voluminous. Salon mirror visible in background, soft.",
    alt: "Finished coils after dry cut",
    aspect: "landscape" as const,
  },

  // ---------------- Visit / Salon ----------------
  visitExterior: {
    file: "visit-exterior.jpg",
    description:
      "Quiet exterior shot of a small, tasteful salon storefront on a Grünerløkka street in Oslo. Cream-colored signage, dark window frames, plants visible inside. Late afternoon warm light, no people. Wide architectural frame.",
    alt: "Salon exterior on Grünerløkka street",
    aspect: "landscape" as const,
  },
  visitInterior: {
    file: "visit-interior.jpg",
    description:
      "Salon interior, no people. Two styling chairs visible, mirrors, cream walls, terracotta-toned accents (a single ceramic vase, framed art), plants, brass shelving with retail products. Warm indirect daylight from a window.",
    alt: "Salon interior with cream walls and terracotta accents",
    aspect: "landscape" as const,
  },

  // ---------------- Retail ----------------
  retailHero: {
    file: "retail-hero.jpg",
    description:
      "Still-life of curl products on a warm cream surface with terracotta-toned ceramic dish: bottles labeled like Bread, Pattern, Bouclème, a sponge brush, a silk durag folded neatly, a microfiber curl T-shirt. Editorial product styling, soft daylight from camera-left.",
    alt: "Curl products and tools on cream surface",
    aspect: "landscape" as const,
  },
  retail1: {
    file: "retail-1.jpg",
    description:
      "Single-product editorial: a leave-in conditioner bottle on a warm cream backdrop, soft top-light, tight composition.",
    alt: "Leave-in conditioner",
    aspect: "square" as const,
  },
  retail2: {
    file: "retail-2.jpg",
    description:
      "Single-product editorial: a sponge brush (twist sponge) on a warm cream backdrop, soft top-light, tight composition.",
    alt: "Twist / curl sponge",
    aspect: "square" as const,
  },
  retail3: {
    file: "retail-3.jpg",
    description:
      "Single-product editorial: a folded silk durag in deep teal on a warm cream backdrop, soft top-light, tight composition.",
    alt: "Silk durag",
    aspect: "square" as const,
  },

  // ---------------- Journal ----------------
  journal1: {
    file: "journal-1.jpg",
    description:
      "Editorial photograph: a hand cradling a small ceramic dish containing scalp oil, dropper visible, on a warm cream surface with linen napkin folded nearby.",
    alt: "Scalp oil ritual",
    aspect: "landscape" as const,
  },
  journal2: {
    file: "journal-2.jpg",
    description:
      "Documentary photograph: a small group of mixed-heritage women in their 20s-30s, in a salon space mid-conversation, candid. Warm soft daylight. Some seated on a low bench, others standing.",
    alt: "Mixed-heritage community meetup at the salon",
    aspect: "landscape" as const,
  },
  journal3: {
    file: "journal-3.jpg",
    description:
      "Editorial: a mother (Black) gently styling her young daughter's (mixed-heritage, age 5-6) Type 3C curls at a salon station, mirror visible, warm tones, both smiling.",
    alt: "Parent and child curl session",
    aspect: "landscape" as const,
  },
  journal4: {
    file: "journal-4.jpg",
    description:
      "Editorial: an array of three head silhouettes from the back, varied curl types (3A waves, 3C ringlets, 4B coils), warm cream backdrop, like a typology illustration. Soft directional light.",
    alt: "Curl-type typology",
    aspect: "landscape" as const,
  },
} as const;

export type ImageKey = keyof typeof images;
