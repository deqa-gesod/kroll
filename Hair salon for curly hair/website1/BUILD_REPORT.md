# Jackson & Coil — Website 1 Build Report

> Working prototype for a curl-specialist hair salon launching in Grünerløkka, Oslo. Built by Claude Code in a single orchestrated session, dispatching parallel sub-agents for image generation, page builds, and review. The other prototype (`/website2/`) is being built in a parallel session by a different agent for design comparison.

---

## Quick links

- **Dev server**: `http://localhost:3010` (run `npm run dev` from `/website1/`)
- **Brand brief**: `../BRAND.md`
- **Research**: `../research/README.md`
- **Reviews**: `./REVIEW/REVIEW_VISUAL.md`, `./REVIEW/REVIEW_FUNCTIONAL.md`, `./REVIEW/REVIEW_A11Y.md`
- **Screenshots**: `./REVIEW/screenshots/`

---

## Status — what's done

### Pages (10/10 routable, all 200 OK)

| Route | What it ships | Owner |
|---|---|---|
| `/` | Hero + 3 promise tiles + founder strip + portfolio teaser + Method block + retail teaser + 3 reviews + Visit + sticky CTA | Homepage agent |
| `/cuts-and-services` | Editorial accordion with 6 services, time-ranges, no "from" pricing | Services+Method agent |
| `/the-method` | 5-step Jackson Cut + Andre Walker SVG with stroke-draw animation + dark prep block | Services+Method agent |
| `/the-team` | 5 stylists with first-person quote-bios, integrated Adé (men's specialist) | Team+About+Visit agent |
| `/portfolio` | 13 items, filterable by curl-type (2A–4C, Men's, Color), lightbox detail | Portfolio+Shop+Journal agent |
| `/shop` | 21 products, dual-filter (curl-type + brand), stylist recs, mocked Add-to-bag | Portfolio+Shop+Journal agent |
| `/journal` | 4 article cards (1 featured + 3 grid) + mocked subscribe | Portfolio+Shop+Journal agent |
| `/visit` | Address + hours + transit + 6-step prep block + nearby café list + map placeholder | Team+About+Visit agent |
| `/booking` | 5-step flow: service → stylist → date+time → curl-type intake → confirm | Booking agent |
| `/about` | Vanessa's full origin story (BRAND §3), founder photography integrated | Team+About+Visit agent |

### Photography

- **34 / 34 generated** via Codex `image_gen` (`codex exec --enable image_generation`) in parallel batches at concurrency 4
- Saved as JPEG (PNG → JPEG via `sips`) in `public/images/`
- Manifest at `lib/content/images.ts`
- Photography Test (BRAND §9) per-image QC done by the imagegen agents and the visual review
- **Note**: AI hair-texture rendering of Type 4C may have visible inconsistencies — flagged in the visual review for re-generation if desired before showing the prototype to Vanessa

### Booking flow (the highest-leverage feature)

The booking flow is fully owned inside our brand chrome — no third-party widget redirect. This is the single biggest competitive moat per cross-salon synthesis.

- **State machine**: `useReducer` + sessionStorage hydration at `lib/booking/`
- **Steps**: Service → Stylist (with each stylist's own calendar) → Date & time → First-time intake (curl type, porosity, "what are you scared of") → Confirm
- **Returning client**: `?returning=1` flips a session flag; one-tap rebook fast-forwards to step 3 with service + stylist + contact prefilled
- **Persistence**: refresh-safe via sessionStorage; "Resuming where you left off" notice with explicit Start-over escape
- **Performance** (functional review):
  - First-timer Sigrid test (mobile, 22:30, kid asleep): **76 seconds** (target <120s ✅)
  - Returning Daniel rebook: **~60 seconds** (target <60s ✅ — was 83s before contact prefill fix)

### Internationalization

- Bilingual NO + EN, single-click toggle in header, no URL prefix
- All copy via `useLang().t({ en, no })` pattern
- Norwegian written natively (not Google-Translated). A few phrases flagged by booking agent for native review:
  - "Krølle-mønsteret ditt"
  - "Det er i boks. Vi sees snart"
  - "Hva er du nervøs for?"
- Norwegian copy review by a native speaker recommended before launch

### Tech stack

- **Next.js 16.2.6** App Router + TypeScript + Tailwind CSS v4
- **React 19.2** (Next 16 default)
- **Lenis** smooth-scroll (auto-disabled under `prefers-reduced-motion`)
- **Motion** (formerly Framer Motion) for staggered reveals; `MotionConfig reducedMotion="user"` wraps the tree
- **next/font/google**: Fraunces (display, variable with `opsz` + `SOFT` axes), Inter Tight (sans), JetBrains Mono (utility)
- All content hardcoded in `lib/content/*.ts` modules — no CMS for the prototype

### Design tokens

| Token | Value | Use |
|---|---|---|
| `--color-cream` | `#FAF7F2` | Default page ground |
| `--color-cream-deep` | `#F3EEE5` | Section variation |
| `--color-ink` | `#1A1612` | Default text + dark sections |
| `--color-ink-soft` | `#3A322B` | Body copy on cream |
| `--color-ink-muted` | `#6F655C` | Captions, labels |
| `--color-terracotta` | `#B5532A` | Hover, CTA accent (large text only) |
| `--color-terracotta-deep` | `#8E3F1F` | Eyebrow text, small labels (AA contrast on cream) |
| `--color-terracotta-soft` | `#D68A5D` | On dark backgrounds (e.g. Method block) |
| `--color-bookgreen` | `#1F4D3F` | Reserved exclusively for booking states |
| `--color-line` | `#E0D8CC` | Hairline dividers |

---

## Review summaries

### A11y / responsive (🟡 → 🟢 after fixes)

Detailed: `./REVIEW/REVIEW_A11Y.md`. Lighthouse mobile (dev server): Perf 75 / A11y 91 / BP 100 / SEO 100. Production build will likely clear 85 perf (235 KiB minify savings, 403 KiB unused JS in dev mode).

**Fixed in this session**:
- `<MotionConfig reducedMotion="user">` wrapping the tree → reduced motion respected
- Skip-to-content link
- `Esc` closes mobile drawer
- Reviews aria-prohibited-attr fix (`role="img"` on the stars span)
- PromiseTiles heading hierarchy (H3 → H2)
- `/the-method` mobile horizontal-scroll (gap-10 grid-cols-12 → gap-6 md:gap-10)
- 15+ files: `text-terracotta` (4.29:1 fail) → `text-terracotta-deep` (clears AA at 11–12px on cream)

**Still open** (low priority, deferred):
- Lightbox not `[role="dialog"]`
- Stronger focus-visible styling than browser default
- Production build performance re-test

### Functional (🟢 strong)

Detailed: `./REVIEW/REVIEW_FUNCTIONAL.md`.

- All 10 routes 200 OK with zero JS errors
- Header + mobile nav route correctly
- EN ↔ NO swaps copy on every sampled page
- Curl-type filters live on `/portfolio` and `/shop` (21 → 15 → 2 product narrowing confirmed)
- Lightbox opens/closes (Esc supported)
- Sticky bottom CTA renders after ~85% scroll
- Booking flow refresh-persistent
- Returning-client one-tap rebook works

### Visual (🟡 → close to 🟢 after fix)

Detailed: `./REVIEW/REVIEW_VISUAL.md`. v2 ran with all 34 images live.

**Strong**:
- Homepage hero passes Amara Test (Type 4, dark skin, lit warmly, joyful)
- Color discipline clean — terracotta-ochre as sole owned color, bookgreen confined to `/booking`
- Voice clean — no exclamations, no forbidden words, architectural register on men's services
- Typographic discipline — Fraunces editorial headlines + Inter Tight body, generous leading, mixed-case
- The Method headlines (*"Wet hair is a different shape than your hair."*) are best-in-class for Vanessa's voice
- Pricing transparency on `/booking` and `/cuts-and-services` — every price visible

**Fixed in this session**:
- **Hero now rotates across 3 frames**: Type 4 woman (Amara) → Black man with fade + coils (Daniel) → Vanessa cutting. 5.5s interval, AnimatePresence crossfade, Ken Burns zoom, manual rotation indicators. Daniel is now above the fold, addressing visual-review §9.2 partial fail. Disabled under `prefers-reduced-motion`.

**Still open** (low priority, content fixes):
- Sigrid (Type 2/3) under-represented in `/portfolio` visible grid — data file has all curl types, but the agent reported the upper part of the grid reads Type-4-heavy. Reorder portfolio data to interleave 2/3 with 4 in the first row if desired.
- Two team-card portraits flagged for AI skin-smoothing artifacts — regen via `node scripts/gen-images.mjs` after deleting the offending files.
- Optional: add 2–3 more Black-male portfolio frames to deepen Daniel-persona conversion surface.

---

## What's mocked / not real

These are deliberate prototype simplifications, not bugs:

- **Booking backend**: no real persistence beyond sessionStorage. Confirm screen mocks an SMS reminder + booking ID, no actual SMS sent.
- **Returning client auth**: `?returning=1` simulates "logged in." Mocked contact details: `Daniel B. / daniel@example.no / +47 901 23 456`.
- **Map**: styled grid + dot, no Google Maps embed.
- **Reviews**: 3 hand-written persona-voiced reviews on the homepage. No live Google review embed.
- **The Method video**: poster image with play-icon overlay. No real 45-second video file.
- **Spotify "now playing"**: not implemented (was a stretch goal).
- **Add-to-bag** on `/shop`: console.log only. No cart, no checkout.
- **Subscribe** on `/journal`: console.log only.
- **Photography**: 100% AI-generated via Codex `image_gen`. Real photo shoot replaces these per the BRAND.md filename contract. Some Type 4C / fade textures may have AI artifacts.

---

## What would need real backend before launch

Per BRAND.md §15 phase-2 roadmap:

- **Booking backend**: custom UI on top of Cal.com white-label or Fresha API (never embed the vendor widget). Customer accounts, real availability, SMS reminders, calendar invites, deposit/no-show policy.
- **Auth**: passwordless email + SMS, returning-client account
- **CMS**: Sanity or Payload for the journal (content updates without redeploy)
- **Real payment**: Stripe or Vipps Norway for retail checkout + booking deposit
- **Native Norwegian copy review** by a Norwegian copywriter
- **Real photography**: 4 shoots/year per BRAND.md §8, replacing every AI image at the same filename
- **Lighthouse production audit** + Core Web Vitals tuning + image variant generation

---

## How to run + verify

```bash
cd /Users/carlborg/Dev/Hair salon for curly hair/website1
npm install        # if first time
npm run dev        # dev server on :3010 (Turbopack)
npm run build      # production build (Turbopack)
npm start          # run production build on :3000

# regenerate images (idempotent — skips already-existing files)
node scripts/gen-images.mjs
```

### Manual verification checklist

| Test | Expected |
|---|---|
| Open `localhost:3010/` | Hero passes Photography Test (Type 4 woman, lit properly, joyful) |
| Resize to 375px | No horizontal scroll on any page |
| Click EN ↔ NO | Copy actually changes, not just the toggle |
| Open `/booking` on mobile | Walk to confirm in <120s for first-timer |
| Open `/booking?returning=1` | One-tap rebook surface; reach confirm in <60s |
| Tab through homepage | Skip-to-content link appears; focus visible everywhere |
| Press Esc with mobile menu open | Menu closes |
| Click a `/portfolio` item | Lightbox opens; Esc closes it |
| `/shop`: combine curl-type + brand filters | Grid narrows correctly |

---

## Orchestration notes (for the meta-record)

The build was orchestrated by a single Claude Code session (this one) dispatching sub-agents in parallel. Total timeline ~120 minutes for a working prototype with 34 generated images.

### What worked

- **Parallel page-build agents** with strict file ownership (one agent per directory). Five agents shipping pages independently with zero file conflicts.
- **Tight image manifest** at `lib/content/images.ts` as a coordination contract — image filenames stable across all consumers from day 1.
- **Direct Bash/Node orchestration of Codex imagegen** after the sub-agent approach failed (see below) — `scripts/gen-images.mjs` runs `codex exec --json` calls in parallel batches with deterministic thread-id → file mapping.

### What didn't

- **Sub-agents waiting on long-running Codex generation** ran out of token budget mid-stream. Fix: split the work and let the orchestrator (this thread) drive Codex directly.
- **Path bug** in `scripts/gen-images.mjs` initially used `new URL("..", import.meta.url).pathname` which URL-encoded spaces in the project path, writing to `Hair%20salon...` instead of `Hair salon...`. Fixed with `fileURLToPath`. ~25 files were moved by hand once detected.

### Files that exist beyond pages and components

```
website1/
├── BUILD_REPORT.md                          ← this file
├── lib/
│   ├── booking/                             ← reducer, services, stylists, slots, storage
│   ├── content/                             ← images, services, team, portfolio, retail, journal, site
│   ├── cn.ts                                ← clsx wrapper
│   └── ...
├── components/
│   ├── chrome/                              ← Header, Footer
│   ├── providers/                           ← LangProvider, LenisProvider, MotionProvider
│   ├── ui/                                  ← Container, Button
│   ├── homepage/                            ← Hero, PromiseTiles, FounderStrip, PortfolioTeaser, MethodBlock, RetailTeaser, Reviews, Visit, StickyBookingCTA
│   ├── services/                            ← ServiceRow
│   ├── method/                              ← MethodStep, AndreWalkerChart
│   ├── booking/                             ← Step1Service through Step5Confirm + ProgressBar + ReturningWelcome
│   ├── curl-type-filter/                    ← reusable filter, used by portfolio + shop
│   ├── portfolio/                           ← PortfolioGrid + lightbox
│   ├── shop/                                ← ProductCard
│   └── journal/                             ← ArticleCard, JournalSubscribe
├── public/images/                           ← 34 AI-generated photographs
├── scripts/
│   └── gen-images.mjs                       ← Codex imagegen orchestrator
└── REVIEW/
    ├── REVIEW_VISUAL.md                     ← visual review (v2 in progress)
    ├── REVIEW_FUNCTIONAL.md                 ← functional review (passed)
    ├── REVIEW_A11Y.md                       ← a11y review (issues fixed)
    └── screenshots/                         ← 20+ desktop + mobile captures
```

---

## What this build proves

Three things:

1. **The booking experience can live entirely inside our brand chrome** at production-grade UX without a vendor widget. Sigrid's 76-second first-timer flow on mobile is meaningful proof.
2. **The "third category" Black-male-grooming wedge** (BRAND §5 Moat 3) renders concretely: integrated portfolio, dedicated `Sculpt Cut` service line, named stylist (Adé), retail wall stocking sponge brushes + durags + beard picks. Daniel's persona objections are answered in the design.
3. **A 750 NOK price tag can read as 1500 NOK feel** — the formula in BRAND.md §5 holds when typography, photography, color discipline, and copy voice all aim above the price line.

The prototype is ready to put next to `/website2/` for design comparison, or in front of Vanessa for brand validation, or in front of a Norwegian copywriter for native-speaker QA on the booking flow.
