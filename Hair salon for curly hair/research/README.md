# Research — World-Class Curl Salons

Visual + UX teardowns of five world-class curl-specialist salons, used to anchor design and brand decisions for our Oslo flagship.

## How this folder is organized

```
research/
├── README.md                       (this file — index + cross-salon synthesis)
├── hair-rules-nyc/
│   ├── teardown.md                 (full structured analysis)
│   ├── design-tokens.md            (colors, fonts, CSS extracts)
│   └── screenshots/                (homepage, services, booking, etc.)
├── curl-bar-london/                (same structure)
├── hare-and-bone-london/           (same structure)
├── curl-up-amsterdam/              (same structure)
└── capella-salon-la/               (same structure)
```

## The five salons & why we chose them

| Salon | City | Why studying them |
|---|---|---|
| **Hair Rules** (Anthony Dickey) | NYC | Closest spiritual ancestor — *"every curl pattern, one place, no kids' table."* Voice and positioning anchor. |
| **Curl Bar London** (Michelle Sultan) | London | Single-mission curl-only space in a major European city. The closest playbook match for what we want to build in Oslo. |
| **Hare & Bone** | London | Premium fashion-forward sophistication — the *upper bound* of design quality we adapt down to mid-market. |
| **Curl Up** | Amsterdam | Closest *geographic* peer. Multi-service curl ecosystem (cuts + retail + education) in a comparable European city. |
| **Capella Salon** (Shai Amiel) | Studio City, LA | Personal-brand-as-moat. Long-form transformation content as customer acquisition. |

## Status

| Salon | Teardown | Screenshots | Design tokens |
|---|---|---|---|
| **[Hair Rules NYC](hair-rules-nyc/teardown.md)** | ✅ | ✅ 12 caps | ✅ |
| **[Curl Bar London](curl-bar-london/teardown.md)** | ✅ | ✅ 10 caps | ✅ |
| **[Hare & Bone London](hare-and-bone-london/teardown.md)** | ✅ | ✅ 12 caps | ✅ |
| **[Curl Up Amsterdam](curl-up-amsterdam/teardown.md)** *(substituted: Curl Spa Salon)* | ✅ | ✅ 14 caps | ✅ |
| **[Capella Salon LA](capella-salon-la/teardown.md)** | ✅ | ✅ 15 caps | ✅ |

> ⚠️ **Note on Curl Up Amsterdam**: the original "Curl Up Amsterdam" brand doesn't exist (domains dead/parked). Agent substituted **Curl Spa Salon (curlspa.nl)** as closest profile-matching peer. Other Amsterdam peers worth a follow-up scan if needed: **BRUSH (brushhm.com)**, **The Set**, **By Lesley Amsterdam**.

This README will be updated with the cross-salon synthesis once all five land.

---

## Cross-salon synthesis

### Patterns worth stealing across multiple salons

**Visual**

1. **Hair-as-subject, faceless or back-of-head hero shot.** Curl Bar's two-women-back-to-back (only hair visible) and Hair Rules' book-cover-with-three-textures both lead with the hair, not the founder or the room. Tells the brand story in 0.5 seconds with no copy. *[Curl Bar London, Hair Rules NYC]*
2. **Single-subject editorial portraits on warm neutral studio backdrops.** Cream / oat / warm-grey walls, soft directional daylight, no harsh strobes, hair-in-motion moments. *[Hare & Bone, Curl Bar London, Hair Rules NYC]*
3. **One-color discipline + black + white.** Three salons run a strict 3-color system (BG + ink + ONE owned accent). Hare & Bone: antique gold `#B29650`. Curl Bar: hot pink `#EB88BB`. Capella: peach `#e39466`. The discipline itself is the asset; the accent is recognizable from a thumbnail. *[Hare & Bone, Curl Bar London, Capella]*
4. **Square corners (`border-radius: 0`) on buttons and CTAs.** Authority move — replaces friendly-rounded pills with editorial / fashion-magazine geometry. *[Hair Rules, Capella]* (Curl Bar uses pills; the pattern is contested but the editorial cluster wins on premium feel.)
5. **Display-serif-or-tight-sans + quiet workhorse sans, two faces only.** Hare & Bone: Playfair Display Black 900 + Open Sans. Capella: Gotham + Lineto Brown. Hair Rules: Geist + Inter. Curl Bar: Pragmatica Extended only. The two-face ceiling is universal across the premium tier. *[All five]*
6. **Tight negative letter-spacing on display headlines** (-3% to -7%). Hair Rules' -7.5px on the 250px marquee is the headline move; Hare & Bone's tracking is `normal` but compensates with weight 900. *[Hair Rules, Hare & Bone]*

**Voice**

7. **Anchor-word repetition.** Hair Rules uses *"standard"* 4+ times across major sections; Hare & Bone owns *"instinctive"* and *"craftsmanship"*. Pick one word, hammer it. *[Hair Rules, Hare & Bone]*
8. **Two-to-four-word display headlines.** *"Texture, understood."* / *"Bold Vision."* / *"We Love Colour."* / *"For curls, coils and waves."* Short noun-led statements at huge size, no verb if possible. *[Hair Rules, Hare & Bone, Curl Bar]*
9. **First-person stylist quote bios, not credential lists.** Curl Bar's *"I believe a woman's hair is her crown"* beats every years-of-experience CV on every other site. *[Curl Bar London]* — and is the negative-image of Curl Spa's three-sentence About.
10. **Concrete pre-appointment prep instructions** baked into the booking flow. *"Arrive with completely dry, detangled hair, in its natural state. No hats, clips, or braids."* Filters bad-fit clients, reduces chair time, signals expertise. *[Capella, Curl Spa, Curl Bar London]*
11. **Service names that teach.** *"Curl Bar Cut — Curly Curls"* vs *"— Wavy Curls"* vs *"Curl-by-Curl Cut"* — names educate clients about typology at the point of selection. *[Curl Bar London, Curl Spa, Capella]*

**UX / Booking / Content**

12. **Stylists named *before* the time-slot picker.** Hair Rules surfaces "Anthony Dickey, Katiria Martin Florent, Brittani Carter" upfront; Curl Bar lists "Nia, Andrina, Mia, Niah" as choosable calendars. Removes the "service-first then no availability" trap. *[Hair Rules, Curl Bar London]*
13. **Time-range honesty** in service durations (e.g. "30 mins – 1h 25 mins") and **"from £X" + a one-line caveat that final pricing is personalised**. Curl work is variable; ranges + caveats build trust. *[Curl Spa, Hare & Bone, Capella]*
14. **One-channel social commitment** — Instagram only, linked once in the footer. Curl Bar and Capella both reject the social-icon zoo. Reads focused, not desperate. *[Curl Bar London, Capella]*
15. **Footer headings sized as section headings.** Hair Rules' 40px Geist nav links in the footer make it feel like a section, not a postscript. *[Hair Rules]* — single source but an unusually high-leverage move.

### Tired conventions to actively avoid

1. **Outsourcing booking to a third-party redirect that nukes the brand.** *Every single one of the five* hands off to Vagaro / Acuity / Slick / Fresha / a phone call. The handoff destroys design quality at the highest-conversion moment, silos CRM data, and ships a generic SaaS UI to a premium-priced first-time client. *[Hair Rules → Vagaro, Curl Bar → Acuity, Hare & Bone → Slick, Curl Spa → Fresha, Capella → phone-only]* — this is the single most universal failure across the set.
2. **Squarespace / Wix / WordPress-Elementor as the ceiling.** Curl Bar (Squarespace), Curl Spa (Wix), Hare & Bone (WP+Elementor) all have their visual ambition capped by the builder. No motion budget, no fluid type, no real i18n, no custom interactions. *[Curl Bar, Curl Spa, Hare & Bone]*
3. **Default Wix / Squarespace font pairings** (Playfair Display + Raleway, Helvetica Neue body fallback). Reads as "template" instantly. *[Curl Spa, Curl Bar London body fallback]*
4. **Fragmented / undisciplined palettes.** Curl Spa runs four purples + two reds + browser-default link blue (`#0000EE`). Capella's CSS class `.c-button--black` is actually `#e39466` peach (naming drift). *[Curl Spa, Capella]*
5. **Three-sentence "About" pages on a founder-led salon.** Curl Spa buries the founder; Capella's About is filler ("gratifying our clientele through... uniqueness and individuality"). For Vanessa, this is malpractice. *[Curl Spa, Capella]*
6. **Empty hero with no H1 and no CTA.** Capella commented out their hero copy; only works for already-famous brands and even then is a coin-flip. *[Capella]*
7. **Letting the website rot.** Capella's press wall stops in 2018, asset filenames are 7 years old, footer is currently SEO-spam-injected with casino links. *[Capella]*
8. **Accessibility-overlay widgets** (accessiBe et al.). They interfere with native screen readers and have been called out in lawsuits. Build native ARIA / keyboard nav instead. *[Hair Rules]*
9. **Voice inconsistency between the marketing site and the booking flow.** Hair Rules' main pages are tight third-person; Vagaro service descriptions read first-person Dickey. Curl Spa has English everywhere except *"Haarverzorging"* in the Fresha menu. Pick one register and police it across surfaces. *[Hair Rules, Curl Spa]*
10. **Six-tier stylist price ladders and "POA" pricing.** Hare & Bone runs Stylist / Salon / Senior / Master / Director / Sam — reads exclusionary; "price on application" reads "if you have to ask, you can't afford it." *[Hare & Bone]*

### The single biggest opportunity for our brand

**Own the booking experience end-to-end inside our brand chrome — and make it the best curl-specific booking flow in Europe.** Every one of the five salons studied — including the $300-haircut Hair Rules and the Mayfair-priced Hare & Bone — drops the visitor onto a generic third-party SaaS at the most decisive moment. The visual quality plummets, the CRM data goes to the vendor, and the curl-specific intelligence (curl type, porosity, "what are you scared of") is nowhere in the flow. This is the **gap nobody is filling**, and it compounds with three other competitor weaknesses we already know how to beat: (a) Curl Spa's grammar-error-riddled English-only copy in our nearest geographic peer market; (b) Hare & Bone and Capella's photography-as-the-only-premium-signal approach, which we can match on a fraction of the budget if our art direction is disciplined; (c) every competitor's failure to integrate a Black-male fade-and-coils service as a first-class booking option. The thesis: *Cutters-grade booking UX, wrapped in Aesop-grade typography, populated with PATTERN-grade photography of Type 4 hair, with a curl-type intake step nobody else offers, in Norwegian + English from day one.* That combination doesn't exist anywhere on the global curl-specialist map. It is the lane.

### Direct application to Jackson & Coil

1. **Stack: Next.js 15 (App Router) + Sanity + Tailwind + Lenis + Framer Motion, deployed on Vercel.** *Why this not Framer:* Hair Rules ships beautiful Framer output but their tokens are UUID-named, their assets are on `framerusercontent.com`, and we cannot do real Norwegian/English i18n, custom auth, or a curl-quiz inside Framer. *Why not WordPress / Squarespace / Wix:* see anti-patterns 2 and 3 above. *Why Lenis specifically:* Hair Rules' page-wide smooth scroll is the cheapest "premium" win in their build (`<html class="lenis lenis-smooth">` + 5 lines of init).
2. **Booking: roll our own UI on top of a calendar engine (Cal.com white-label or a custom layer over Fresha/Timma's API). Never embed the vendor widget.** This is *the* single highest-leverage decision in the entire build. All five teardowns flagged the third-party handoff as the primary brand failure. We add a curl-type intake step (Andre Walker 2A–4C selector with one-line porosity explainer) before service selection — Hare & Bone's six-category accordion gives us a wide-open lane. Steps 1–5 of BRAND.md §13 are already specified; ship them as-is.
3. **Typography: pair an editorial serif with character against a tight grotesque, both via paid licenses.** Specifically: **GT Sectra Display** or **Editorial New** for headings; **Söhne** or **GT America** for body; **Söhne Mono** for prices and times. *Avoid Geist* (too obviously the Framer/Vercel default; Hair Rules already owns it), *avoid Playfair Display* (Curl Spa and Hare & Bone both use it — Wix-template tell + 2018 wedding-blog energy), *avoid Pragmatica Extended* (Curl Bar's signature). Capella's Lineto Brown investment shows that paying $200+ for a license compounds; we should match that discipline.
4. **Display headlines: -5% letter-spacing, mixed-case (not uppercase), one weight (probably 600 or 700).** *Why not weight 900 like Hare & Bone:* Norwegian and English text has wide character variance ("INDIVIDUALITET" vs "VANESSA"); 900 collides at 78px. *Why not all-caps like Curl Bar:* mixed-case reads more contemporary and works better with Norwegian-language pages. Hair Rules' tight-tracked Geist 600 is the closest reference.
5. **Color: paper-cream `#FAF7F2` ground + warm off-black `#1A1612` ink + one owned terracotta-ochre primary (~`#B5532A` direction, lock during photo grade) + one deep blue-green accent for booking states only.** *Why not pink (Curl Bar) or gold (Hare & Bone) or peach (Capella):* terracotta-ochre is unowned in the curl-specialist competitive set, sits warm against Nordic light, and reads textile-heritage rather than beauty-industry. *Hard rule from BRAND §8:* no second brand color, no gradient palettes, no "secondary green for the wellness section."
6. **Photography: budget like Hare & Bone, art-direct like PATTERN, cast like Curl Bar.** Single warm grade across the entire site (no mixed sources — Curl Spa's mistake), warm-cream studio backdrops (Hare & Bone reference), real clients only (no stock — Hair Rules' rule), Type 4 dark skin lit *properly* (skin-aware, not the standard salon backlight that turns dark skin muddy — BRAND §8). 4 shoots/year, varied weather. The hero must pass BRAND §9's three-part Photography Test before launch.
7. **Square corners on buttons + Phosphor-style chevron/arrow icons.** Steal directly from Hair Rules and Capella. Pill buttons (Curl Bar) read warmer but less editorial; we want editorial.
8. **Hero composition: hair-as-subject, not founder-as-subject.** Curl Bar's two-women-back-to-back is the model. Founder photography (Vanessa working, hands in hair, mid-laugh per BRAND §3) lives on the About page and as a band on the homepage — but the hero is hair. Vanessa is *not* posing alone with scissors.
9. **Stylist bios = one quote + one specialty bullet + training credentials (where they trained).** Curl Bar's manifesto sentences beat every CV-format bio in the set. Add training credentials inline (Vanessa: Curl Bar London + Devachan NYC) — non-negotiable per BRAND §13.
10. **Pricing transparency to the cent.** Hair Rules prints the philosophy *in the price field* ("A HAIRCUT is a TRIM..."). We show every price with no "from"; we use time-ranges (Curl Spa's only real win); we surface the free 15-min consultation as a bundled inclusion, not an upsell.
11. **A named, owned cutting method as a `/the-method` page.** *The Jackson Cut* (women) + *The Sculpt Cut* (men). Capella owns "Curl-by-Curl Cut" as marketing IP; we extend the move with a 45-second video of Vanessa cutting + Andre Walker zone-map diagrams. This is the page that converts skeptics and earns SEO (BRAND §11).
12. **Anchor word: pick one and hammer it.** Strong candidates: *spectrum*, *coil*, *understood*, *kjenne* (Norwegian: "to know"). Hair Rules' "standard" discipline is the model. Decide during voice lock; use it 4+ times across major sections.
13. **One-channel social commitment: Instagram only on the footer.** Curl Bar and Capella both do this; resist the YouTube/TikTok/Pinterest icon zoo. SEO and the on-site portfolio pick up the slack (BRAND §12).
14. **Footer treated as a section, not a postscript.** Steal Hair Rules' 40px nav-link sizing in the footer and the dual-direction testimonial marquee just above it. The marquee is the single highest-craft moment we can lift wholesale.
15. **Bilingual NO/EN from day one with a single-click toggle, no `/no/` URL prefix, hreflang tags, native-grade Norwegian booking flow.** Curl Spa fakes the EN button; we ship the real thing. Booking flow Norwegian translation reviewed by a Norwegian copywriter, not Google Translate (BRAND §16, risk #5).

---

## Companion documents

- **[BRAND.md](../BRAND.md)** — the canonical brand brief these teardowns inform.
- **Plan file** at `~/.claude/plans/https-cutters-com-hey-so-i-wiggly-boot.md` — the strategy synthesis that produced BRAND.md.
