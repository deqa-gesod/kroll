# Site Teardown: HARE & BONE (London)

**URL:** https://hareandbone.co.uk (note: hareandbone.com is dead — UK domain only)
**Tagline:** "A Sam Burnett Salon"
**Locations:** Fitzrovia (London) + Esher (Surrey)
**Founded:** 2016 by Sam Burnett
**Date analyzed:** 2026-05-08

---

## Tech Stack (confirmed from page source)

| Layer | What they use | Evidence |
|---|---|---|
| CMS | **WordPress** | `/wp-content/`, `/wp-includes/`, `wp-json` REST API |
| Page builder | **Elementor 4.0.6** | `<meta name="generator" content="Elementor 4.0.6 ... google_font-enabled, font_display-swap">` + `essential-addons-for-elementor-lite` plugin |
| Commerce / retail | **WooCommerce 10.7.0** | `/plugins/woocommerce/assets/js/...` (used for retail products / vouchers) |
| Slider | **Royal Slider** (`new-royalslider-core-css`, `rsUni`) | Cached CSS files |
| Booking engine | **Slick** (`book.getslick.com`) — third-party hairdresser SaaS | Anchor → `https://book.getslick.com/#/group/62/` |
| Secondary booking widget | **Gappt** (`hareandbone.gappt.com/widget/widget.js`) | Embedded widget script |
| Pricing tables | **TablePress** WP plugin | `tablepress-default` CSS |
| Newsletter | **Mailchimp** popup (`chimpstatic.com`) | Inline popup script |
| Analytics | GA4 (`G-M9W96BVZH8`), Google Ads (`AW-957915605`), GTM (`GTM-PV47Q9B`), Meta Pixel | Script srcs |
| Cookies | GDPR Cookie Consent (Cookie Law Info) | `cookie-law-info` CSS bundles |
| Performance | WP-Optimize Minify (`wpo-minify`) | All CSS/JS concatenated |
| Fonts | **Google Fonts**: Playfair Display + Open Sans | `google_font-enabled` + computed styles |
| Hosting | UK-stack WP host (typical) | Generic |

**Verdict:** It's a 2018-era WordPress + Elementor build, lightly maintained. No bespoke front-end framework, no GSAP, no Lenis, no animation library. The premium feel is **100% earned by photography and typography** — not by code. That's the headline insight for us.

---

## Visual brand language

### Color palette (computed from live CSS)

| Role | Value | Where it shows |
|---|---|---|
| Background | `#FFFFFF` | All pages |
| Primary text / nav | `#333333` | Body copy, nav links |
| Heading black | `#000000` | H2 display headlines |
| Footer heading | `#4C4C4C` | Footer column titles |
| **Brand gold** | `#B29650` (rgb 178,150,80) | Active nav state, link accents, hover state, "more" arrows. **The only chromatic accent on the site.** |
| Secondary muted gold | `#B29650` at lower opacity (used for arrows, dividers) | UI accents |

That's it. The entire site is **3 colors**: white ground, black/dark-grey ink, one antique-gold accent. No shadows, no gradients, no second accent. This is the cleanest possible expression of "luxury British heritage."

### Typography

| Role | Family | Weight | Size | Letter-spacing | Transform |
|---|---|---|---|---|---|
| **Display H2 (hero/section)** | `Playfair Display, serif` | **900** (black) | **78px** | normal | uppercase |
| Tiny eyebrow H2 | Playfair Display | 900 | 13px | normal | uppercase |
| Body / nav / footer / labels | `Open Sans, sans-serif` | 400 | 13–14px | normal | uppercase for nav |
| Footer column heads (H3) | Open Sans | 400 | 14px | normal | none (sentence case) |
| CTA buttons | Open Sans | 400–700 | 14–16px | normal | uppercase |

Two-font system, period. The contrast is the whole story:
- **Playfair Display Black 900** at 78px screams editorial fashion magazine (think Vogue cover line).
- **Open Sans Regular** at 13–14px stays out of the way. Quiet utility font.

This pairing is "luxury that doesn't try hard." Playfair carries every ounce of brand voice; Open Sans is invisible.

### Spacing & layout

- Container: ~1170px max width, generous side padding on desktop.
- Vertical rhythm: very large — sections are 600–900px tall on the homepage so each photo earns full attention.
- Grid: classic 3-column "feature card" grid (Services / Salons / Book Online) directly above the footer.
- No rounded corners anywhere. Borders are sharp.
- No drop-shadows. No glass effects. No gradients. Flat as a magazine spread.
- Buttons are mostly text-link style with an underline or color shift — there is no big "filled pill" CTA on the homepage. The nav `BOOK ONLINE` link is the same style as every other nav item.

### Responsive

Elementor's default breakpoint set (with `additional_custom_breakpoints` enabled). Mobile homepage stacks the photo-text blocks vertically and the gold accent persists. Hamburger menu via `rmp_menu` (Responsive Menu plugin).

---

## Photography style — their actual strength

This is the only thing about the site that justifies the brand position. The site itself is a basic WP/Elementor build; the **art direction of the imagery** is what reads as premium.

Patterns observed across hero, services, team, and salon pages:

1. **Single-subject editorial portraits, shot wide.** Every hero block is one model, framed roughly chest-up to half-body, lots of negative space above and around. Ratio is usually portrait or square — never wide cinematic.
2. **Studio neutral backdrops** in cream, warm grey, or soft taupe. No location/contextual backgrounds in the hero photography. This isolates the hair as the subject.
3. **Hair in motion / wind-machine moments.** Several heroes show hair caught mid-toss — implies energy and "wearable but bold."
4. **Direct gaze or confident profile.** Models look straight at the camera or in a strong 3/4 turn. No coy candid moments. This is fashion editorial, not lifestyle.
5. **Skin and tone consistency.** The grading is warm, slightly desaturated, with creamy highlights — feels like a Nars / Aesop ad campaign. Same colorist across the whole site.
6. **Diversity of hair colour and texture in the cast.** Blondes, redheads, brunettes, textured/curly hair shown alongside straight — important signal we should match.
7. **Salon interiors are shot like architectural photography.** When you do see the room (locations page), it's wide-lens, daylight-only, perfectly tidy, no people in frame, low-saturation palette of warm wood + cream walls + black accents. Looks like a spa or a Soho House magazine shot — never like an "in use" busy salon.
8. **Black and white / desaturated tonal images** are mixed in for editorial pacing — used as "rest" between full-color hero shots.

**Key insight for our build:** the photography is doing 90% of the design work. The site itself is plain. If we replicate the photographic language at a more accessible vibe (we're mid-market, not Mayfair) we steal most of the magic without needing to copy any code.

---

## Copy voice — quoted lines

The voice is **British heritage + craft + restrained confidence**. No exclamation marks except on newsletter CTA. Sentences end firmly. Almost zero adverbs. Heavy on nouns: "instinct," "craftsmanship," "individuality," "vision."

1. > "We celebrate individuality & Self Expression"
2. > "HARE & BONE is an instinctive hair salon that offers the very best technically executed wearable hair with creative and Artistic flair."
3. > "Our technicians are highly skilled and artistic colourists who will offer advice whilst working with you to create outstanding results."
4. > "Inspired by a desire to create hair that works with the bone structure of the face, we spend time getting to really know each client in order to create a hairstyle that will truly complement you and your personal style."
5. > "Sam's mission for HARE & BONE is simple: to provide every one of our clients with an exceptional salon experience, whilst leaving with hair they absolutely love!"
6. > "Housed in comfortable and relaxed spaces in Fitzrovia and Esher, our salons are rooted in British heritage with a modern aesthetic."
7. > "We celebrate individuality and self expression, which is why our salons and pricing is gender neutral."
8. > "BOLD VISION"
9. > "WE LOVE COLOUR"
10. > "Founded in 2016 by Sam Burnett, HARE & BONE is a fashion-forward salon collective driven by creativity, craftsmanship and an instinctive understanding of style. Every cut, colour and finish…"

**Notable craft moves:**
- They capitalise "Artistic" mid-sentence — a small typographic flourish that feels like a fashion magazine lede.
- Use of "instinctive" twice — it's their owned word.
- The gender-neutral pricing call-out is moved to the front of the brand promise. Worth stealing — fits curly-hair-specialist brand perfectly.
- "Individuality & Self Expression" — directly applicable to our curl positioning.

---

## Booking flow analysis

Hare & Bone outsource booking entirely to **Slick** (`book.getslick.com`). It's a hairdresser-SaaS booking engine.

**Flow:**
1. Click any "Book Online" / "Book Now" link on the site → leaves the H&B-branded site, lands on `book.getslick.com/#/group/62/`.
2. **Step 1: Location chooser.** Two cards: "HARE & BONE ESHER" and "HARE & BONE FITZROVIA". A "Powered by Slick" stamp top-left. Cookie banner overlays the page.
3. **Step 2: Service category.** After picking location, you see a long "Welcome to Hare & Bone Fitzrovia" intro paragraph (with read-more), then **6 collapsed accordion categories**: COLOUR / COLOUR PACKAGES / CUTTING & STYLING / KERASILK / GENTS / CONSULTATIONS. NEXT button is disabled until a service is chosen.
4. **Step 3+ (typical Slick flow, not screenshotted):** Stylist tier picker → date/time → contact details → deposit/card capture.

**Observations:**
- The branding handoff is **bad**. Slick's chrome (their logo, colors, fonts, button styles) takes over completely. The H&B brand vanishes the moment a guest commits to booking. For a "premium" salon this is a significant friction point.
- **6 categories is too many** for a first-time client. There's no guidance like "I'm new" / "I've been before" / "I just want a trim." This is operationally efficient but conversion-hostile.
- The intro paragraph is buried — they put 3 lines of brand copy ABOVE the location buttons on step 1, and again on step 2. It clutters the path.
- Mandatory deposit is implied (Slick has a "Deposits" tab in nav).
- **Outsourced login/account** — clients get a Slick account, not a Hare & Bone account. No CRM ownership.

**For our build:** if we use a hairdresser-SaaS (Slick / Fresha / Treatwell), at minimum we should embed the booking iframe inside our own page chrome rather than redirecting away. Better: use a headless booking API + custom front-end so brand never breaks. Even better: **a curly-specific intake** ("Is this your first curl appointment with us?" / "Type 2C, 3A, 3B, 4?") before the service tree appears — that's the differentiator and Hare & Bone gives us a wide-open lane to own it.

---

## Section-by-section homepage build plan

The Hare & Bone homepage is structurally simple. Here's everything in order:

### 1. Top notice bar (very thin, dark)
- Tiny line: "Bespoke in salon education now available. Click here for details!"
- Single full-width strip, black bg, white text, 12–13px, centered.

### 2. Header / navigation
- Logo left (wordmark "HARE & BONE" in Playfair).
- Horizontal nav right: HOME · ABOUT US · SALONS · SERVICES · NEWS & INSPIRATION · EDUCATION · CONTACT · BOOK ONLINE.
- Active item is gold (`#B29650`). Inactive is grey-black. No underline. All caps, 14px.
- No sticky behavior on scroll (verified — header scrolls away). Mild miss.

### 3. Hero — Royal Slider full-bleed photo carousel
- Slides between 3 editorial portrait shots (one is the "We celebrate individuality" shot, others are "Bold Vision," "We love colour").
- Each slide has:
  - Large 78px Playfair Display Black headline overlaid (or beside the image, depending on slide).
  - Sometimes a tiny Open Sans paragraph beneath.
- Auto-advancing carousel, dot pagination, no scroll-driven motion.
- This is the centerpiece — lives or dies on the photography.

### 4. Triptych "feature card" grid (3 columns)
- Three equal cards: **Services / Salons / Book Online**.
- Each card = portrait photo on top, 1-line description, then a text link or two.
- Spacing is generous; cards are not bordered, not shadowed.
- Cards are simply labelled images with anchor text — no fancy hover effects (verified, vanilla `<a><img></a>`).

### 5. CTA strip
- Single centered text link "Book Now" (gold, large) — set against white.

### 6. Footer
- 5-column structure: brand list / services / get-to-know-us / customer service / contact us.
- All links Open Sans 13–14px grey.
- Above the footer: newsletter signup (centered, with Instagram + YouTube icons) and a Mailchimp popup overlay that auto-fires on first visit.
- Bottom strip: copyright + Disclaimer | Terms | Privacy.

### What's NOT on the homepage
- No testimonials / reviews block.
- No team/stylist intro on home (it's its own page).
- No price teaser.
- No interior salon shots on home (those are tucked into `/locations/london`).
- No press/awards strip on home (also separate page).
- No video.
- No FAQ.

The homepage is essentially: **Hero photo carousel → 3 doors (Services / Visit / Book) → Footer.** That's it. Five screens of scroll, almost all of which is photography.

---

## What we should steal (5–8 moves)

1. **The 3-color discipline.** White + near-black + ONE warm accent. Don't add a second accent. Resist gradients and glass. Our curl positioning can use a softer accent (terracotta, deep curl-coffee, or warm amber instead of antique gold) but the **discipline is the asset**.
2. **Playfair Display Black 900 at huge size as the only display font, paired with a quiet sans for everything else.** This single decision makes basic HTML feel editorial. We'd want to test a curlier display alternative (Recoleta, GT Sectra, or Domaine Display) but the principle — one expressive serif, one quiet workhorse — is gold.
3. **Photography-as-design.** Treat photo art direction as the largest line-item in the build budget. Studio backdrops, single-subject portraits, hair-in-motion moments, consistent warm grade across the site. Cast curl types 2C–4C diversely. This is the lever that makes a plain WordPress site feel like Mayfair.
4. **"We celebrate individuality" framing.** Their gender-neutral pricing line is a brand move that fits curly-hair specialism beautifully ("we celebrate every curl pattern"). Steal the structural pattern: declare a values stance that's also operationally true.
5. **One word-noun headlines.** "Bold Vision." "We Love Colour." Two-to-four-word display headers in massive type. We should write our own pair: e.g. "Curl Confidence." "We Speak Curl." "Coil & Spring."
6. **Triptych "3 doors" homepage.** Hero → 3 equal-weight CTAs (Services / Visit / Book) → Footer. Refreshing simplicity. We can adapt: Services / Meet your stylist / Book your first curl consult.
7. **The "instinctive" / craft vocabulary.** Words like *instinctive, technically executed, wearable, craftsmanship, bone structure*. They build a craft-respecting voice without sounding clinical. We can substitute curl-craft vocabulary: *coil mapping, porosity-led, hand-cut dry, density-aware*.
8. **Editorial pacing — let photos breathe.** Sections are 600–900px tall with one photo each. We should fight the temptation to cram. Big photos, big silence around them.

---

## What we should AVOID (3–5 anti-patterns)

1. **Don't outsource booking to a redirect.** The Slick handoff destroys their brand at the most important conversion moment. We should embed (iframe inside our chrome) or go headless. **Especially** because curl clients want hand-holding — a sudden generic SaaS UI signals "this is a chain salon" and reads cheap.
2. **Don't price-shame with a 6-tier stylist ladder (Stylist / Salon / Senior / Master / Director / Sam).** This is *peak* high-end London salon and reads exclusionary. For our mid-market positioning we want max 2–3 tiers (e.g. *Curl Stylist / Senior Curl Specialist*) and ideally show the *highest* price first to signal premium without intimidating.
3. **Don't show "POA" (price on application) anywhere.** It signals "if you have to ask, you can't afford it" and breaks trust. For a "premium feel at accessible price" brand we should publish ranges for everything, including bleach and extensions.
4. **Don't bury all interior/spatial photography on a sub-page.** Hare & Bone's homepage has zero shots of the actual salon space. For a NEW salon launching in Grünerløkka, the *space itself* is part of the credibility — guests need to see they're not walking into a back room. Put one strong interior shot on the home.
5. **Don't ship a 78px display headline without thinking about non-Latin / Norwegian characters.** Playfair Display Black 900 at 78px with the word "VANESSA" or "BØLGE" or "INDIVIDUALITET" can collide. Our Norwegian + English bilingual context will demand more careful typesetting than Hare & Bone need to do.
6. **(Bonus) Don't ignore mobile hero crop.** Their mobile homepage stacks the desktop layout literally — the hero portraits get awkwardly cropped on a 375px viewport. We should art-direct two crops per hero asset (desktop wide, mobile portrait) from day one.

---

## Final summary insight

Hare & Bone is the **upper bound for "what photography + typography alone can do for a salon brand."** The site itself is unremarkable WordPress; the experience is unforgettable because of one font pair, one accent color, and a five-figure photography budget executed with a single art-director's eye.

For Vanessa's Grünerløkka salon, the lesson is: **invest in photography and typography first**, build the rest in any tech stack. We can match 80% of Hare & Bone's perceived premium-ness with a fraction of their price ladder, *as long as* we don't compromise on the photo direction and we don't dilute the color discipline.
