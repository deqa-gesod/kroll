# Site Teardown — Hair Rules (Anthony Dickey)

**URL:** https://hairrules.com
**Built by:** Slide Creative (`https://slidecreative.co`) — credited in footer
**Platform:** Framer (`<meta name="generator" content="Framer 281588d">`)
**Booking system:** Vagaro (third-party, embedded via outbound link to `vagaro.com/hairrules`)
**Date analyzed:** 2026-05-08

---

## 1. Tech Stack (Confirmed from rendered DOM + `<head>`)

| Technology         | Evidence                                                                   | Purpose                                       |
| ------------------ | -------------------------------------------------------------------------- | --------------------------------------------- |
| **Framer**         | `<meta name="generator" content="Framer 281588d">`; assets on `framerusercontent.com`; CSS tokens in `--token-{uuid}` UUID format | CMS + hosting + page builder                  |
| **Lenis**          | `<html class="lenis lenis-smooth">` on every page                          | Page-wide smooth scroll                       |
| **Framer Motion**  | `motion.VNKSAXDZ.mjs` modulepreload                                        | Reveal-on-scroll, hover, marquee animations   |
| **React 18**       | `react.D4ZQ1ZiU.mjs` modulepreload                                         | App runtime                                   |
| **Rolldown**       | `rolldown-runtime.BXVgRTY5.mjs`                                            | Module bundler runtime (Framer's build)       |
| **Phosphor Icons** | `Phosphor.B7EYhGDU.mjs`                                                    | UI iconography (chevrons, social, arrows)     |
| **FlowPlay**       | `FlowPlay_Custom_Videos.BVB6jHyP.mjs`                                      | Custom hero / inline video player             |
| **Geist + Inter**  | `fonts.gstatic.com/s/geist/v4/...`                                         | Typography                                    |
| **accessiBe**      | `acsbapp.com/apps/app/dist/js/app.js`                                      | Accessibility overlay widget                  |
| **Framer Events**  | `events.framer.com/script?v=2`                                             | First-party analytics                         |
| **Vagaro**         | All "Book Now" CTAs link to `vagaro.com/hairrules/services`                | Booking, calendar, payment, gift cards        |

> Bottom line: this is a **Framer site, not a hand-coded one**. They are paying for the visual sophistication a designer can pull off in Framer + the speed-to-market it gives them. The booking is fully outsourced to Vagaro and they don't try to fake an in-brand booking flow.

---

## 2. Visual Brand Language

### 2.1 Typography

The single biggest move is the **wordmark-as-system**. The logo `hair rules.` is set in Geist 600 with -5% letter-spacing — and that exact treatment cascades into every H1/H2/H5 across the site. The whole site reads as one continuous expression of the wordmark.

| Role                       | Family | Size  | Weight | LSP    |
| -------------------------- | ------ | ----- | ------ | ------ |
| Hero marquee H1            | Geist  | 250px | 600    | -7.5px |
| Section statement H1       | Geist  | 48px  | 600    | -2.9px |
| Section H2                 | Geist  | 40px  | 600    | -2px   |
| Sub-hero H2 (lede)         | Geist  | 30px  | 600    | -1.5px |
| Eyebrow / nav / btn (H5)   | Geist  | 18px  | 600    | -0.9px |
| Body large                 | Geist  | 20px  | 500    | —      |
| Body small / utility       | Inter  | 16px  | 400    | —      |
| Caption                    | Geist  | 15px  | 400    | —      |

Inter shows up in italic for inline emphasis ("From the pages of *Vogue*") and 16px body in less-prominent panels.

### 2.2 Color Palette

A near-monochrome neutral system; almost no chromatic accents in the chrome. See `design-tokens.md` for the full hex list.

| Bucket               | Hex           |
| -------------------- | ------------- |
| Primary text         | `#2e2e2e`     |
| Secondary text       | `#585858`     |
| Muted                | `#707070`     |
| Hairline / dividers  | `#e6e6e6`     |
| Off-white surface    | `#fafafa`     |
| White                | `#ffffff`     |
| Near-black surface   | `#1c1c1c` / `#0d0d0d` |
| Black                | `#000000`     |
| Editorial accents    | `#ff5d17`, `#ff2600`, `#ff94fa`, `#86ac09` (used as image / chip colours, not UI) |

### 2.3 Spacing rhythm

- Squared corners everywhere — `border-radius: 0` on buttons. No pills, no friendly rounding. This is a deliberate authority move.
- Hairline `1px` dividers (`#e6e6e6`) carry most of the structural weight in dense info sections (locations, accordions).
- Sections separated by ~120-160px on desktop. Generous breathing room.
- Photos breach the gutter: full-bleed image + offset text is the dominant layout pattern.

---

## 3. Photography Style

- **Subjects**: real clients in the real studio chair (not stock). Anthony Dickey hands-on with hair. The book *Hair Rules!* is a recurring object — they make their own product / IP the prop. Models span every visible curl pattern (4C kinky → 3 curly → 2 wavy → straight) in single frames; the cover-of-book hero shows 3 textures at once.
- **Lighting**: natural daylight from large studio windows; no harsh studio strobes. Skin tones rendered warm and accurate; no clinical overhead light.
- **Framing**: shallow depth-of-field, often shoulder-up or chair-level. Photographer in the room with the subject — photojournalism feel, not editorial perfection.
- **Mood**: calm, attentive, lived-in. The salon looks like a working place, not a marketing set. Plants, mirrors, equipment visible.
- **Color grade**: lifted blacks, mid-tones intact, slight warmth. Nothing crushed or punchy. Reads as "documented" rather than "art-directed."

> The photographic credit `Photo by: Ellen von Unwerth` is embedded directly in the studio hero text — they're advertising the editorial photographer's name as proof-of-tier. Worth stealing as a move (Vanessa won't have von Unwerth on day one, but the pattern of "named photographer in the chrome" telegraphs seriousness).

---

## 4. Copy Voice — 5 quoted lines + annotation

These are exact strings pulled from the rendered DOM:

1. **"Texture, understood."** *(homepage H1)*
   > Two words. A noun and a past participle. Not "we understand texture" — texture is the subject, understood is the state. Removes the practitioner from the sentence and gives the client the agency. Authoritative without being self-promotional.

2. **"For 4 decades, Dickey has defined the standard for multi-textural beauty. From the pages of *Vogue* to the industry's most influential brands, this is where hair is celebrated, not just managed."** *(homepage sub-hero)*
   > "Celebrated, not just managed" is the entire positioning in five words. Reframes a salon as a cultural institution. The Vogue italic does the credibility work without a logo wall.

3. **"A HAIRCUT is a TRIM a TRIM is a HAIRCUT. We do not have different prices for different lengths."** *(Vagaro service description)*
   > This is the manifesto. Pricing as ethics. This single sentence kills the "kids' table" problem the brief describes — they refuse to charge curly hair more or less. The all-caps echoes a sermon.

4. **"You aren't just paying for a service. You're paying for the manual."** *(studio page — "The Care Tag")*
   > Re-frames the transaction. The client is buying *literacy in their own hair*, not a haircut. This is how you charge $300 for a haircut without flinching.

5. **"The market is the majority."** *(consulting H1)*
   > Five-word counter-punch to the entire industry's framing of textured hair as "niche." Built for executives, not for clients — but it earns the brand the right to talk to brands.

6. **"When you solve for the most complex textures, you create a superior experience for everyone."** *(consulting page — "The philosophy")*
   > The accessibility-design argument applied to hair. Universal-design framing — kinky/4C is the hardest case, and once you can serve it everyone else benefits. Clean, defensible, and useful.

7. **"Pioneering a new standard of beauty."** *(about page H2)*
   > "Standard" is repeated across the site at every level. It's their north-star word — used 4+ times in unique sections. Steal the discipline of one anchor word.

8. **"To the New York Times, he's a 'Style Svengali.' To Ebony, a member of their Power 100. To the clients who've trusted him for decades, he's simply the only person who ever understood their hair."** *(about page)*
   > The classic "to X he is Y, to Y he is Z, but to me…" rhetorical structure. Three credibility anchors that descend in formality and end on an emotional core. Stealable structure.

> **What makes the voice work**: declarative present-tense, never apologetic, refuses to use the word "inclusive" as a buzzword. Uses industry words ("texture spectrum", "multi-textural", "care tag") confidently and defines them in plain English nearby.
>
> **What's a touch off**: the line *"As many shades of a people, WE are as many unique textures"* on Vagaro is grammatically clumsy and reads like Dickey's own phrasing dropped in unedited. The site's main pages are tightened; the booking flow is the founder's voice. We'll want to either match that consistency or commit fully to one register.

---

## 5. Booking Flow Analysis

### Flow architecture
1. Every "Book Now" CTA on `hairrules.com` opens an outbound link to `https://www.vagaro.com/hairrules/services` (NYC location).
2. Vagaro page lists services with flat-rate pricing (`$300.00`) and Affirm financing (`$28/mo or 0% APR`).
3. Per-service "Book Now" should open a calendar modal — but **on the day of capture (2026-05-08) Vagaro's API was returning errors** (`getallpromotiondetailsbybusinessid` 500), blocking the modal. Captured the error state as `06-booking-error-modal.png`.
4. Direct path `/hairrules/book-now` loads a staff-selection step listing **Anthony Dickey, Katiria Martin Florent, Brittani Carter** — only 3 stylists at the NYC flagship.

### UX observations
- **Pricing transparency**: a single `$300.00` for any cut, regardless of length, gender, or texture. They put the philosophy *in the price field*: "We do not have different prices for different lengths."
- **No calendar preview on the salon site**: clicking Book Now drops the visitor into Vagaro's domain and visual system. There is **no soft on-brand wrapper** — once you click, you're on `vagaro.com` cookie-banner-and-all. This is a clear UX seam and a place we can do better.
- **Affirm financing is surfaced** at the service line. Smart for a $300 ticket.
- **Services are richly described**, and each block reinforces the brand voice ("YOUR hair, YOUR choice, YOUR rules!").
- **Three locations** but only NYC has online booking. Atlanta is "Currently located at: Purple Door Salon" — they haven't bothered to fake a permanent footprint in cities where they're a guest.

### What the flow gets right
- One price. One ticket. One philosophy statement printed on the price.
- Stylist names visible upfront — clients can ask for who they trust.
- Accepts financing on a premium ticket without shame.

### What the flow gets wrong
- The handoff from `hairrules.com` to `vagaro.com` is jarring; the visual quality drops dramatically.
- Vagaro's interface today felt fragile (API errors, cookie banner, generic styling).
- No way to compare across locations / book virtual from the booking entrypoint — that's all back on the brand site.

---

## 6. Section-by-section build plan (homepage)

How we'd recreate the homepage in our own brand. Sections are taken from the captured DOM in scroll order.

### Section 1 — Sticky nav + wordmark hero (above the fold)
- Top-left: minimal wordmark `hair rules.` set in Geist 600 with tight letter-spacing. Nav links right-aligned at H5/18px: Studio, Consulting, Pro Artistry, About, Insights.
- The hero is **a full-bleed video** of Dickey in the chair holding the *Hair Rules!* book showing 3 women with 3 different curl patterns. The video plays muted, autoplay, looped, and is colour-graded warm.
- A **giant scrolling marquee** "hair rules — hair rules — hair rules —" set at 250px Geist 600 with -7.5px tracking sits *over* the video at the bottom of the fold. Six copies of the H1 form the marquee; it loops horizontally.
- **Build approach**: HTML5 `<video autoplay muted loop playsinline>` + CSS `position: absolute; inset: 0; object-fit: cover;`. Marquee = a flex row of 6+ duplicate `<h1>` nodes inside `overflow: hidden`, animated with a CSS keyframe `transform: translateX(-50%)` + Framer Motion or pure CSS infinite linear loop.

### Section 2 — "About" eyebrow → "Texture, understood." statement → CTA pair
- White section, 1-column centred.
- Eyebrow "About" in 18px Geist 600, then the 48px statement, then a 30px sub-hero paragraph (with italic "Vogue").
- Two CTAs side-by-side: filled black "Book at the Studio →" and ghost "Explore the Legacy →".
- **Build**: simple flex column, max-width 880px, centred. Buttons are 18px Geist 600 with 0px border-radius, 12px padding, arrow icon from Phosphor.

### Section 3 — 3-up dark service cards (Studio / Consulting / Pro Artistry)
- 3 vertically-stacked **dark-bg cards**, each a full-width tall block with a photo on the left, white H2 (40px), a 20px paragraph, and one CTA button.
- Photos: man sitting in a salon chair facing mirror; woman jumping in the air; woman with afro smiling.
- Card backgrounds are near-black `#1c1c1c` / `#0d0d0d`.
- **Build**: CSS grid 2-col (image / content), background dark, ~80px padding. Stack to 1-col on mobile. Subtle parallax on the photo on scroll using Framer Motion's `useScroll`.

### Section 4 — Credentials list + logo strip
- White section. H2 "Credentials" (40px) with 6 paragraphs as bullet-style list (no bullets — just stacked 20px Geist 600 lines with 1px hairline dividers).
- Below: a horizontal **scrolling logo marquee** of every press / brand mention (~36 logo `<img>` items). Auto-scrolls infinitely.
- **Build**: same marquee technique as the hero. Use 36+ small SVG or PNG logos at greyscale.

### Section 5 — "Watch and listen" media row
- Two video player tiles side-by-side: "Ask Dickey Video Series" + "Who's In My Chair? Podcast".
- Each tile is 16:9 with a play button overlay, captioned with a paragraph + CTA.
- **Build**: native `<video>` with custom poster + Phosphor play icon overlay, or embed YouTube/Spotify with a custom thumbnail mask.

### Section 6 — "The standard" — testimonial marquee (two rows, opposing directions)
- H2 "The standard" (40px).
- **Two horizontal marquees** stacked: top row scrolls right→left, bottom row scrolls left→right. Each row contains ~9 testimonial cards. Cards are off-white (`#fafafa`) with a 5-star top, the quote (20px Geist 500), client name, "Verified Hair Rules Client" caption, and a small avatar circle.
- Below: single "Book at the Studio →" CTA.
- **Build**: two flex rows, each a duplicated set of cards animated with keyframe translateX. Pause on hover. This is the section to **steal wholesale** — the dual-direction marquee is the highest-craft moment on the site.

### Section 7 — Footer (CTA panel + nav grid)
- Left column: "Got hair questions?" → CTA + "Ready to get started?" with two CTAs.
- Right columns: "Navigate" and "Follow us" link grids, each link styled at 40px Geist 600 (huge!).
- Bottom row: "© 2026 Hair Rules. All rights reserved." + "Web by Slide Creative" credit.
- **Build**: 2-column grid. The "Navigate" headings being 40px is a deliberate trick — it makes the footer feel like a section, not a postscript.

---

## 7. What we should steal (5–8 specific moves)

1. **Wordmark-as-system**: pick one tight-tracked sans (we'd use a similar geometric like Geist or Söhne), set everything from logo to nav to H2 in it at -5% letter-spacing. The whole site reads as one wordmark expression.
2. **One-price manifesto**: print the philosophy in the price field. "One haircut, one price, every curl pattern." Steal the exact discipline of "A HAIRCUT is a TRIM a TRIM is a HAIRCUT."
3. **Giant scrolling wordmark marquee** over the hero video. Cheap to build, immediately premium-feeling, instantly readable as "this is a salon where the brand voice is the brand."
4. **Dual-direction testimonial marquee** with verified-client tags. Two rows opposing directions, cards stay readable because each one is wide and lingers in the viewport for 2-3s.
5. **Anchor word repetition**: pick our equivalent of "standard" and use it 4+ times across major sections (we suggest something like "kjenne" / "understand" or "spectrum"). Discipline > variety.
6. **Footer headings sized as section headings (40px)**. Makes navigate / follow feel like equal real estate, kills the "afterthought footer" energy.
7. **Photographer credit in the chrome**: when we have editorial photos, surface the photographer's name as inline meta (`Photo by: Ellen von Unwerth`). Reads as confident.
8. **Squared buttons (`border-radius: 0`)** and Phosphor-style chevron / arrow icons. The geometry of the wordmark extends into every interactive element — no rounded pills.
9. **Stylists named on the booking entry** — "Anthony Dickey, Katiria Martin Florent, Brittani Carter" is shown before any time-slot picker. Vanessa's stylists should be similarly named on first contact.

## 8. What we should avoid (3–5 specific anti-patterns)

1. **The Vagaro handoff**. Clicking Book Now on a $300 premium brand and landing on a generic-styled vendor page with a cookie banner is a brand-quality cliff. We should either skin our booking system in-brand or use a vendor with theming (Boulevard, Squire, Treatwell with custom CSS, or build a simple in-brand calendar that posts to a backend).
2. **An accessibility overlay widget** (accessiBe). Overlays are generally considered an anti-pattern in 2026 — they actively interfere with native screen-reader behaviour and have been called out in lawsuits. Build native accessibility instead.
3. **No mobile nav optimisation visible**. The mobile homepage we captured shows the wordmark + hamburger but the giant 250px marquee gets cropped weirdly behind the fold. We should design the mobile hero from scratch, not rely on the desktop marquee trick scaled down.
4. **Inconsistent voice on the booking flow**. The Vagaro service descriptions use a different (more raw, more first-person) register than the hairrules.com main pages. We should pick one register and stay there.
5. **Stale copyright / dates**. The footer says "© 2026" which on 2026-05-08 reads fine, but small things like `Hair Rules!` book references with no link to buy or the broken Vagaro Book Now button were present on a live site. We need a simple QA loop on launch and quarterly thereafter — broken booking flow on a salon site is the worst possible defect.

---

## 9. Effects breakdown

| Effect                                   | Implementation (inferred from Framer + assets) | Complexity | Cloneable? |
| ---------------------------------------- | ---------------------------------------------- | ---------- | ---------- |
| Lenis page-wide smooth scroll            | `lenis lenis-smooth` class on `<html>`         | Low        | Yes — `npm i lenis` + 5-line init |
| Hero video autoplay + word-mark marquee  | Native `<video autoplay muted loop>` + CSS keyframe `translateX` infinite | Low | Yes |
| Reveal-on-scroll for sections            | Framer Motion `whileInView` / IntersectionObserver | Low | Yes |
| Logo strip horizontal marquee            | Duplicated flex row, CSS keyframe              | Low        | Yes        |
| Testimonial dual-direction marquee       | Two flex rows, opposing keyframe directions    | Low-Med    | Yes        |
| Hover state on nav links (double H5 stack) | Two `<h5>`s in a clipped div, Y-translate on hover (90° text scroll) | Med | Yes — classic `overflow: hidden` + `transform: translateY()` swap |
| Service cards parallax photo             | Framer Motion `useScroll` + transform on image | Med        | Yes        |
| Custom video player tiles                | FlowPlay (Framer's component) — replaceable with custom HTML5 + Phosphor icon | Low | Yes |

The double-stacked nav-link headings (every nav link has `<h5>X</h5><h5>X</h5>` in the DOM — see snapshot e28-e56) is **the signature micro-interaction**: hovering a nav item clip-shifts the top text up and out while the duplicate slides in from below. Looks expensive, costs 6 lines of CSS.

---

## 10. Build plan / recommended stack for our salon

- **Framework**: Next.js 15 App Router (so we get great SEO, image optimisation, and edge rendering).
- **Styling**: Tailwind CSS + a small set of CSS custom properties for our token system.
- **Animation**: Framer Motion for component-level reveals + Lenis for page scroll. Optional GSAP only if we need scrub-pinned scroll later.
- **Fonts**: We do **not** use Geist (too obviously the Framer / Vercel default of 2026). Suggest a similar geometric grotesque with character — *Söhne*, *Neue Haas Grotesk*, *Aeonik*, or *General Sans* depending on licensing budget. Set the same -5% tracking to capture the wordmark feel.
- **Booking**: Boulevard or Treatwell (skinnable) or a custom calendar. Do not embed Vagaro raw.
- **CMS**: Sanity or Payload — needed because Vanessa will want to update press, team, and pricing herself.
- **Hosting**: Vercel (Next.js native).

### NPM bootstrap
```bash
npm create next-app@latest --ts --tailwind --app --eslint salon
cd salon
npm i lenis framer-motion @phosphor-icons/react clsx
```

---

## 11. Notes / gotchas

- **Vagaro had an active API outage** during capture — booking step-2 could not be reached. The error modal is preserved as `06-booking-error-modal.png`. The `05-booking-step-1.png` is the services list, and the staff-select page exists at `/hairrules/book-now` but rendered without staff cards on the day.
- **Framer-published sites are not easy to git-clone**. Their assets are on `framerusercontent.com` with hashed filenames; the JS is bundled and obfuscated. We're not literally lifting code — we're rebuilding from observed patterns.
- **No CMS is exposed**. There's no `wp-content`, `_next`, or `/api/` paths visible. Everything is published statically by Framer.
- **The site is fast** despite being heavy on photos. Framer's image pipeline does the lifting (responsive AVIF, lazy loading on every img). Our build needs to match this — Next/Image with `sizes` set properly.
- **Their accessibility approach is via an overlay widget (accessiBe)** rather than native ARIA work. We should do better — proper alt text on every photo, semantic landmarks, real keyboard nav.
- **One copy-voice inconsistency to watch**: the salon site is tight, professional, declarative. The Vagaro service descriptions are looser and read as first-person Dickey. We need to lock in one register for our build.
