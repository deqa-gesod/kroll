# Capella Salon — Site Teardown

**URL studied:** https://capellasalon.com (+ companion site https://shaiamiel.com)
**Studio:** Studio City, Los Angeles. Founders: Shai & Nicole Amiel. Founded 1995.
**Why we're studying it:** Shai Amiel is "The Curl Doctor" — a cult curly-hair stylist whose YouTube before/afters (millions of views) drive personal-brand-as-moat. We want to learn how a single-stylist content engine surfaces (or doesn't) on the salon site, and how their gallery of results is presented.

---

## TL;DR — the surprising findings

1. **Capella has TWO websites running in parallel.** `capellasalon.com` (the salon) and `shaiamiel.com` (the personal brand). They share a footer credit ("Site by Sixty Five Design") but have fundamentally different stacks, typography, and palettes. Shai's site is the one that holds the gallery, services with prices visible, and the personal-story copy.
2. **There is NO online booking.** The "Appointments" page is a Google Map + phone number + address. That's it. They deliberately route everything through a phone call (818-784-4247). Friction = filtering.
3. **The famous YouTube transformation videos are NOT embedded anywhere on either site.** Just a footer icon link. Despite YouTube being his most powerful content engine, the website chooses not to surface it.
4. **The homepage hero has zero copy.** The original H1 "Experience Full Service Haircare and Skincare" + CTA is literally commented out in the live HTML. The hero is just a 93vh photo of the salon interior. No headline. No subhead. No button.
5. **The "transformations gallery" is a flat lightbox grid of single after-portraits.** No before/after pairs on the website. No filters. No client names. No captions. The before/after content lives on Instagram and YouTube — the website gallery is curated proof, not storytelling.
6. **The "Curl Prep Instructions" page is a strict contract.** "If you don't follow the instructions, you will have to reschedule your appointment and forfeit your deposit." This is a doctor-not-stylist tone — protecting the integrity of the consultation.

---

## 1. Tech stack

| | capellasalon.com | shaiamiel.com |
|---|---|---|
| Platform | **Custom-coded PHP** (no CMS detected) — `index.php` canonical, hand-authored class names following BEM-ITCSS conventions (`.c-button`, `.o-section`, `.u-pt+`) | **WordPress** on WP Engine (`wpenginepowered.com` asset CDN), Agni theme, **WPBakery Page Builder** (`vc_row`, `vc_column_container`, `agni_column`) |
| CSS | Single bundled `/assets/css/main.css` — 10,010 lines, Sass-compiled, no CSS variables | WordPress theme stylesheet with Animate.css (`fadeInUp`, `data-animation-offset`) |
| JS | Custom + Rellax.js for parallax (`u-parallax`, `data-rellax-percentage`), jQuery-era patterns | jQuery + WPBakery JS |
| Hosting / CDN | Cloudflare in front | WP Engine + Cloudflare |
| Analytics | GA4 (`G-CFHQGVD403`) | GA + standard WP plugins |
| Build / Dev | Sixty Five Design agency (sixtyfivedesign.com) | Sixty Five Design |
| Animations | Subtle parallax on framed image cards. fadeInUp on services. Nothing flashy. | Animate.css fadeInUp on row entry |
| Notable | The CSS class `.c-button--black` actually has `background-color: #e39466` (peach). Naming/color drift. The site has an iSpionage-style spam paragraph injection (`real money casinos`, `anonymous casino`) right above the footer — **the site is hacked / SEO-spammed**. This is a legitimate anti-pattern to note. | More polished visually but a generic Agni/WPBakery theme |

**Verdict:** Capella's salon site is technically sophisticated (custom code, premium type) but visually undercooked and **currently compromised by SEO spam injection**. The personal-brand site is the more controlled marketing surface.

---

## 2. Visual brand language

### Typography (capellasalon.com)
- **Headings:** Gotham, 600 weight, very small base (~12px caps in some sections — feels editorial-ish but cramped)
- **Body:** Lineto **Brown-Light** at 15px (premium licensed typeface from lineto.com — costs real money, signals serious brand investment)
- **Nav:** Brown-Regular, 15px, sentence-case, black on cream. No tracking, no ALL CAPS — refreshing.
- **Logo:** Custom inline SVG wordmark — "CAPELLA" big serif-ish capitals, "salon" small in companion weight. Goes monochrome.
- The Brown + Gotham pairing is on-brand for premium / Lineto-aware design (used by Patagonia, Apple-adjacent brands). It's a sophisticated choice.

### Typography (shaiamiel.com)
- **Headings + nav:** CopperplateGothicBold, ALL CAPS — old-school US-salon aesthetic. Brown-on-cream.
- **Body:** Inconsolata (a monospace coding font). Strange choice for a hair salon — feels like a theme default someone forgot to swap.
- This is the visual mismatch we want to AVOID.

### Color palette (extracted from main.css color frequency)

| Hex | Role | Notes |
|---|---|---|
| `#ffffff` | Page background | Dominant |
| `#000000` | Body text, logo | High contrast, no greys |
| `#e39466` | Primary CTA / "peach" | Coral peach — the only saturated color used. Signature accent. |
| `#fff4dd`, `#ffe9c8`, `#fbebc7` | Cream tints | Background washes for sections |
| `#f3dab1`, `#f2d9b0`, `#ebd49d`, `#e1c894` | Warm tan / sand | Frame/accent strokes (`.c-card--framed-left-gold`) |
| `#ff5649` | Hot red accent | Used sparingly (alerts/sale-style) |
| `#dedede`, `#979797`, `#393434`, `#312e2e` | Neutral greys | UI chrome |

**Read:** Cream + peach + black. No saturated brand color. Photography is meant to bring all the warmth.

### Spacing scale (CSS utility classes)
- `u-pt--` = 6px
- `u-pt-` = 12px
- `u-pt` = 24px
- `u-pt+` ≈ 48px
- `u-pt++` ≈ 72px+

Powers-of-2 / 12-grid scale. Standard.

---

## 3. Photography style — and how they shoot before-afters

### On the website
- Hero: **interior architectural shot** of the salon — empty chairs, polished concrete floor, mirrors. No people. Conveys "professional" not "warm." Lit from above (drum pendant lights visible).
- About: same interior hero again, recycled.
- Press wall: client portraits + Shai+stylists posed photo as transition image.
- Gallery (shaiamiel.com): tight-framed **after-only single portraits**. Mostly head-and-shoulders, eye-contact, natural light, neutral / studio backgrounds, mostly Type 3-4 curly hair clients. Diverse range across hair types and skin tones. Quality is mid — these read as Instagram-grade, not editorial-grade.

### How they handle before/afters
- **The website does not show before/afters as paired images.** None. Zero side-by-sides.
- The before/after content is a **YouTube format** ("Curly Hair Cut Transformation by Shai Amiel") — long-form videos with story arcs (consultation → reveal → tips). Instagram has the carousel before/after stills.
- The website gallery functions as **"approved beauty portraits of finished work"** — a credibility wall, not a teaching tool.
- **This is a deliberate choice we should think hard about.** Pros: keeps the site uncluttered, drives traffic to YouTube where the algorithm rewards them. Cons: if you arrive cold via the website, you don't see the magic. The site is for people who already know who he is.

---

## 4. Copy voice — quoted lines

1. *"With over 20 years of perfecting the craft of caring for curly hair, Shai Amiel, who many followers have anointed 'The Curl Doctor,' has perfected the prescription for healthy, beautiful shiny curls."* — third-person crowning ("anointed"), medical metaphor ("prescription").
2. *"Capella was founded on the goal of gratifying our clientele through the identification of our client's uniqueness and individuality."* — overwrought, corporate-1995 register.
3. *"Whether it is for a stunning and vibrant coloring, or a hair style that highlights facial features, Capella Salon and our staff are here to to satisfy our clients' every need."* — generic, includes a typo ("to to").
4. *"Please arrive to your appointment with your hair freshly washed, tangle free and dry."* — instructional contract voice.
5. *"If you don't follow the instructions, you will have to reschedule your appointment and forfeit your deposit."* — uncompromising. This is the strongest line on the site.
6. *"We need to see your hair in it's natural form, as curly as possible. No hats, clips, headbands, ponytails, buns, twists, braids or anything that will alter your curl pattern."* — list of nos, definitive.
7. *"For best results, avoid straightening your curls!"* — exclamation feels off-tone (mom voice) but the rule is good.
8. *"Visit Us At The Salon! We are located in the heart of Studio City in Southern California!"* — over-exclamation again.
9. *"Shai Amiel has resuscitated so many curly locks that many clients, stylists and Hollywood celebrities have dubbed him 'The Curl Doctor.'"* — "resuscitated" leans into the medical metaphor.
10. *"Shai's passion for celebrating naturally curly hair has led him to become one of the rare masters of the curl-by-curl dry haircut."* — names the technique ("curl-by-curl dry haircut") as a proprietary methodology.

**Voice register:** Medical/expert authority ("doctor," "prescription," "resuscitated") fused with an older salon-marketing vernacular ("gratifying our clientele," "every need"). The strongest copy is the strict prep contract. The weakest is the About page.

---

## 5. Booking flow analysis

**There is no booking flow.** That is the analysis.

- `/appointments` page = Google Maps thumbnail (linking to Google Maps), address, "Directions" link, and a black-bg button "Call 818-784-4247" (`tel:` link).
- No calendar widget. No Square/Mindbody/Vagaro/Boulevard embed. No deposit collection on the website.
- The deposit ("forfeit your deposit") referenced on the prep page must be taken over the phone.
- **Implication:** they are deliberately filtering for clients willing to call. This is a luxury-services move (think Michelin restaurants) and works because demand >> supply. A new salon launching in Oslo cannot copy this until demand exists.
- Header has a phone number `818-784-4247` permanently displayed top-right next to the nav. This is the persistent CTA.

---

## 6. Content / transformation gallery analysis (deep)

**Location:** Lives on shaiamiel.com/gallery — NOT on the salon site.

**Structure:**
- A single page titled "GALLERY" with a one-line subhead: "Photos, Videos." (the comma-period phrasing implies videos exist but I saw no embedded videos — only photos).
- One large hero image of a model with curls.
- A **5-column responsive masonry grid** of ~30+ tiles. All tiles are `500x400` thumbnails linking to full-size JPGs in a generic lightbox (`gallery-1.jpg`, `gallery-2.jpg`, etc. — files dated 2018, never refreshed).
- All `<img alt>` attributes are placeholder ("gallery-1", "gallery-2"). No SEO benefit.
- Lightbox = simple prev/next arrows, no caption, no metadata.

**Filters / segmentation:** **None.** No "by curl type," no "by service," no "color," no "before/after," no "haircut only." Single dump.

**Captions / context:** **None.** No client name, no service performed, no products used, no time elapsed.

**What this tells us:**
- The gallery is **proof-of-volume**, not proof-of-process. "Many people, many beautiful results" — that's the only narrative.
- The actual storytelling lives on Instagram (@capellasalon) and YouTube. The website is the trust anchor; social is the magnet.
- They have not invested in this gallery since 2018. It's frozen.

### What we can steal from it
- The masonry single-tile-with-lightbox is a clean, low-maintenance pattern.
- All-after photos can work IF the rest of your funnel (IG, YouTube) does the before/after job — but for a brand-new salon with no audience, this would fail. We need before/afters on the site.

### What we can do better
- Add **categories/filters** (Curl by Curl Cut, Color, Big Chop, etc.).
- Add **client first-name attribution** (with consent) — humanizes the wall.
- Add **side-by-side before/after carousels** for the hero gallery items, since we don't have a viral YouTube channel to lean on.
- Add **service-tag links** so clicking a transformation deep-links to that service's booking page.
- Use **better alt text** for SEO ("Type 3B curl-by-curl haircut, before and after, Vanessa Jackson").

---

## 7. YouTube / social integration

| Channel | URL | How it surfaces on the website |
|---|---|---|
| Instagram | @capellasalon | Footer icon only |
| Facebook | /CapellaSalonLA | Footer icon only |
| Twitter/X | @capellasalon | Footer icon only |
| YouTube | /user/CapellaSalon (and /user/ShaiAmielDr on Shai's site) | Footer icon only |
| Pinterest | /shaiamiel/ | Footer icon only |

**The website does ZERO active social integration.** No embedded Instagram feed. No featured YouTube videos. No "Latest from our IG" carousel. No "Watch Shai's transformations" section.

This is genuinely surprising for a brand whose YouTube channel has tens of millions of views and whose Instagram is THE engine. **Either:**
- (a) They've decided the website is a separate, calmer, on-brand surface and the social platforms own the algorithmic discovery layer, OR
- (b) This is just a stale website that hasn't been touched since ~2018-2019.

Looking at the spam injection in the footer (`real money casinos`, `anonymous casino`) and the commented-out hero copy and the press dates trailing off in 2018, **option (b) is much more likely.** The website is essentially abandoned-but-functional. The brand lives on social.

**Lesson for our salon:** The website needs to work hard because we cannot rely on a YouTube algorithm to do it for us in year one.

---

## 8. Section-by-section homepage build plan

The Capella homepage is unusually minimal — only ~3 visible sections including header and footer. Here's what the structure looks like, plus what we'd actually build for our Oslo salon (using Capella as a baseline, not a target):

### Section A: Top utility banner (Capella has it; consider for us)
- Address as link to Google Maps. Single line, grey bar.
- Useful, minimal. We can do this in Norwegian: "Markveien XX, Grünerløkka, Oslo" linking to Maps.

### Section B: Sticky header
- Left: logotype (SVG wordmark, monochrome).
- Right: nav links (sentence-case, no underlines), then Menu hamburger, then **phone number as the "CTA"** in peach pill button.
- We should swap phone for a **Book Now** button in pill peach, but keep the phone number visible as a secondary chip — Norwegians appreciate phone access for real-life service businesses.

### Section C: Hero
- **Capella does:** 93vh full-bleed photo of the salon interior, no copy at all. Just lets the architecture speak.
- **What we should do:** A hero photo of curls (not the room — the work) with **a single Norwegian-language H1** and **one CTA**. The empty hero only works when the brand is already known. We don't have that luxury.

### Section D: (Capella has nothing else — page ends)

### What our homepage should add that Capella doesn't:
1. **Founder intro band** — Vanessa, photo + 2-line story. Trust-on-first-scroll.
2. **Signature service teaser** — "Curl-by-Curl Cut" with a pull-quote price ("from 1 950 kr") to set expectations and pre-qualify.
3. **Before/After hero carousel** — 4-6 hand-picked transformations, each with a curl-type tag (Type 2C, 3A, 3B, 4A...). This is what their site lacks and what would convert cold Norwegian traffic.
4. **Press / mention strip** — even if we don't have Vogue yet, we have the Norwegian press equivalents to chase. Capella's press wall is their strongest social-proof page; we should foreshadow it on the homepage.
5. **"How to prepare for your appointment"** — borrow Capella's strict-doctor tone, but warmer.
6. **Booking widget** — embedded calendar (Fresha / Boulevard / Booksy depending on the back-of-house tool), NOT phone-only.
7. **Footer** — same minimal Capella structure: 3-column links + social icons + tiny copyright.

---

## 9. What we should steal — 5–8 specific moves

1. **The "doctor" positioning vocabulary.** "Prescription," "Curl Doctor," "resuscitated," "specialist." Medical-authority register elevates a salon out of beauty-commodity into expertise-as-a-service. Vanessa can be **"krøllspesialisten"** with a clinical, calm tone — not "stylist."
2. **A named, ownable signature technique.** "Curl-by-Curl Cut" is a brandable methodology name they own and price ($250, or $350 with Shai personally). We need our own named cut — ideally something Vanessa can copyright in voice ("Vanessas tørrklipp," "Krøll-for-krøll-klipp," etc.).
3. **The strict prep-instructions page as a contract.** "Arrive with hair freshly washed, tangle-free, dry. No hats. No clips. No braids. No oils." Then the kicker: **"or you forfeit your deposit and reschedule."** This filters bad-fit clients, protects the consultation, and signals seriousness. Steal verbatim, translate to Norwegian, soften 5%.
4. **Tiered pricing with the founder.** Same service, two prices: with Shai = $350, with another stylist = $250. We can launch with Vanessa-only pricing, then layer in junior-stylist tiers as we scale, using the same +40% premium.
5. **The press / media wall.** A tight grid of ~30+ logo tiles linking to articles. Even at year-one in Oslo, we'll get 5-10 mentions in Bonytt, KK, Costume, NRK Lifestyle, etc. Build the wall structure now and fill it as we grow. **Visually it's the strongest page on the entire site.**
6. **Premium typography choice.** Lineto's Brown is a $200+ license but it's why this site reads "real" despite the rest being half-baked. Investing in a paid typeface (Brown, GT Walsheim, Söhne, etc.) over a free Google font is a compounding brand decision.
7. **The persistent header phone number.** A `tel:` link in the header gives mobile users a one-tap call without leaving the page. Even with online booking, this is high-trust and we should keep it.
8. **Architectural / interior photography in the hero.** Once the salon is built, a clean architectural shot of the empty space (no people) is a powerful aspirational hero. Capella's chairs-and-mirrors photo says "this is a serious place" before any copy is read.

---

## 10. What we should AVOID — anti-patterns to step around

1. **The dated US-salon visual aesthetic on shaiamiel.com.** ALL-CAPS Copperplate Gothic, brown-on-cream, monospace body, shadowed photo collages, big drop-shadow boxes. It reads "2014 spa template." Our Oslo brand should be Scandinavian-clean, not Americana-warm.
2. **No online booking.** A cardinal sin in 2026 for a service business launching in Norway. Even if Vanessa wants to vet clients, she can do that with a deposit-required online booking flow. Don't make people call.
3. **Empty hero with no headline or CTA.** Only works for famous brands. Cold visitors need an H1 and a button — full stop.
4. **No before/afters on the website.** Outsourcing all transformation storytelling to YouTube/Instagram only works if you already have the audience. Build the before/after gallery directly into the site from day one.
5. **Letting the website rot.** Press wall stops in 2018, asset filenames are 7 years old, the homepage hero copy is commented-out, and the footer is currently SEO-spam-injected with casino links. Treat the website as living: update at least quarterly, monitor for security issues, refresh proof points.
6. **Two parallel websites with conflicting brand languages.** capellasalon.com and shaiamiel.com look like different companies. If Vanessa builds personal brand assets, they should live as a *section* of the salon site (or share a clear design system), not as a fragmented sister property.
7. **Generic "every need" copy.** *"Capella Salon and our staff are here to satisfy our clients' every need"* is filler. Specific, opinionated copy ("We don't blow-dry your curls. We don't sell straightening services. We work with what you have.") would convert better.

---

## Appendix: file map

- `homepage.html` / `about.html` / `services.html` / `curl-prep.html` / `appointments.html` / `press.html` / `policies.html` — raw HTML downloads (curl returns short shells; full content extracted via DOM)
- `main.css` — full stylesheet (10,010 lines)
- `screenshots/` — 15 PNGs of the live site at 1440x900 (and one at 375 mobile)
- `design-tokens.md` — distilled colors / type / spacing
