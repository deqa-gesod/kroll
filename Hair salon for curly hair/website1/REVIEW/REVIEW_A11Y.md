# A11Y + Responsive Review — Jackson & Coil

Reviewer: parallel a11y + responsive agent
Test date: 2026-05-08
Routes tested: `/`, `/cuts-and-services`, `/the-method`, `/the-team`, `/portfolio`, `/shop`, `/journal`, `/visit`, `/booking`, `/about`
Viewports: 375x812, 768x1024, 1440x900
Tooling: Playwright (Chromium), Lighthouse 12 (mobile, simulated throttling)

## Verdict

| Category       | Status | Notes                                                                 |
| -------------- | ------ | --------------------------------------------------------------------- |
| Responsive     | 🟡     | Single horizontal-scroll bug at 375px on `/the-method` closing CTA.   |
| Keyboard       | 🟡     | Tab order good, focus visible. Esc does NOT close mobile drawer.      |
| ARIA / semantics | 🟡   | Heading-order skip + prohibited `aria-label` on `<span>`.             |
| Color contrast | 🟡     | One AA fail (small terracotta label on cream-deep) + several borderlines. |
| Performance (LH mobile) | 🟡 | 75 perf, 91 a11y, 100 BP, 100 SEO. LCP 8.6 s — almost certainly dev-server overhead. |

Overall: nothing blocking, but 5–7 small fixes get this above the BRAND.md target.

---

## 1. Responsive issues

| Page         | Viewport | Issue                                                                                                                                                                                                                                          | Source                                                                                              |
| ------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `/the-method` | 375 mobile | Page scrolls horizontally (`scrollWidth` 464 vs 375). Closing-CTA section (`<section class="bg-ink text-cream">`) uses `grid grid-cols-12 gap-10` inside a 327-px container; the 40-px gap collapses 12 tracks to negative width and `col-span-12` children render at 440 px (overflow). | `app/the-method/page.tsx:501-538` (the "Now book the cut." section). Reduce gap to `gap-4 md:gap-10` or change to `flex flex-col md:grid md:grid-cols-12`. |
| `/journal`   | mobile/tablet/desktop | All four article images fail to load (`naturalWidth=0`). Layout still holds but cards show empty cream boxes. | `components/journal/ArticleCard.tsx` — verify `/images/...` paths in `lib/content/journal.ts`. Caller already noted 404 images are out of scope but counting because *every* journal image is broken, not just a subset. |
| `/portfolio` | tablet/desktop | 7 of 13 images 404. (Mobile: 3 of 13 — fewer because some are below the fold and lazy-loaded.) | `lib/content/portfolio.ts` (or wherever the portfolio list lives). |
| `/shop`     | all | 5–9 of 22 images 404.                                                                                                                                                                                                                         | `lib/content/shop.ts`.                                                                              |
| All pages   | mobile  | Smallest body-ish text is **10 px** (`font-mono text-[10px]`, used in image overlay badges and the EN/NO toggle on Header at 12 px). 10 px is below recommended ~13 px floor; OK as decorative caps-mono labels but verify contrast (some pass, some don't — see contrast section). | `components/portfolio/PortfolioGrid.tsx`, `components/shop/ShopGrid.tsx`, `components/the-team/*` cards, etc. |

No nav-stack breakage, no overlapping text, no truncation observed at the three viewports tested.

---

## 2. Keyboard / ARIA issues

| ID  | Severity | Issue                                                                                                                                                                                                          | Reproduction                                                                                                              | Source                                                                                                                                       |
| --- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| K1  | High     | Mobile drawer cannot be closed with Esc. `aria-expanded` stays `true`, `aria-label` stays "Close menu".                                                                                                          | At 375px, click hamburger → press Escape → menu remains open.                                                              | `components/chrome/Header.tsx` — add `useEffect` keydown listener to close on `Escape` and (optionally) trap focus within drawer while open. |
| K2  | Med      | No skip-to-content link. Tabbing through the homepage requires 12 stops (wordmark + 8 nav links + 2 lang buttons + Book CTA) before reaching main content. Booking page same.                                   | Tab from page load on `/`.                                                                                                | `app/layout.tsx` — add `<a href="#main" class="sr-only focus:not-sr-only ...">Skip to content</a>` and an `id="main"` on the page wrapper.    |
| K3  | Med      | Focus ring is browser default (`outline auto 1px`, ~1 px wide, color follows currentColor). On `bg-cream` over `text-cream/70` and on the dark hero this is barely visible. WCAG 2.4.7 passes; 2.4.13 (focus-not-obscured) is borderline. | Tab any link; observe outline thickness on screenshots.                                                                   | `app/globals.css` — add `*:focus-visible { outline: 2px solid var(--color-terracotta); outline-offset: 2px; }`.                              |
| A1  | High     | `aria-prohibited-attr` (Lighthouse): `<span aria-label="5 stars">` is invalid — `aria-label` is prohibited on a `<span>` with no role.                                                                          | LH audit `aria-prohibited-attr` on homepage.                                                                              | `components/homepage/Reviews.tsx:46` — change to `<span role="img" aria-label="5 stars">` or wrap in `<div role="img">`.                      |
| A2  | Med      | Heading-order skip on `/`: `H1 → H3 → H3 → H3 → H2`. The Promise tiles are H3 immediately after the H1; should be H2.                                                                                            | View source on homepage, or run axe/Lighthouse `heading-order`.                                                          | `components/homepage/PromiseTiles.tsx:72` — change `<h3>` to `<h2>`. Same hierarchy hop appears on `/the-team`, `/portfolio`, `/shop`, `/about` (footer-headings are H3 after page H2 — that one is fine because they sit after a section H2). |
| A3  | Low      | Image-only `<a>` to `/portfolio` and `/shop` (10 of them on `/`). Accessible name comes from `<img alt>`, which works for screen readers, but multiple links with identical alt-derived names ("Type 4C crown..." etc.) all pointing to `/portfolio` are noisy in a screen-reader rotor. | Tab through homepage portfolio teaser.                                                                                    | `components/homepage/PortfolioTeaser.tsx`, `RetailTeaser.tsx` — consider `aria-label="View portfolio"` on the link wrapper or grouping under one labeled `<nav>`. |
| A4  | Low      | Lang toggle (EN/NO) is a pair of `<button aria-pressed>` — semantics are correct. Group lacks `role="group" aria-label="Language"`. Minor.                                                                       | Inspect Header DOM.                                                                                                       | `components/chrome/Header.tsx:68` — wrap in `<div role="group" aria-label="Language">`.                                                       |

Positives:
- All interactive elements are real `<button>` / `<a>` — zero `<div onClick>` found across the codebase.
- `aria-pressed` correctly used on EN/NO buttons.
- `aria-expanded` correctly toggled on mobile menu button.
- All `<img>` elements have an `alt` attribute (0 missing on every page tested).
- Each page has exactly one `<h1>`.

---

## 3. Color contrast

Tokens (from `app/globals.css`): cream `#faf7f2`, cream-deep `#f3eee5`, ink `#1a1612`, ink-soft `#3a322b`, ink-muted `#6f655c`, terracotta `#b5532a`, terracotta-soft `#d68a5d`, bookgreen `#1f4d3f`.

| Pair                                            | Ratio | AA normal (4.5) | AA large/AAA |
| ----------------------------------------------- | ----- | --------------- | ------------ |
| ink on cream                                    | 16.83 | ✅ AAA           |              |
| ink-soft on cream                               | 11.76 | ✅ AAA           |              |
| ink-muted on cream                              | 5.32  | ✅ AA (fails AAA 7.0) |        |
| ink-muted on cream-deep                         | 4.92  | ✅ AA (borderline)    |        |
| terracotta on cream                             | 4.64  | ✅ AA (1 px headroom; fails AAA) |   |
| **terracotta on cream-deep**                    | **4.29** | **❌ FAIL AA normal** | passes AA Large only |
| terracotta-deep on cream                        | 6.82  | ✅ AA            |              |
| cream on terracotta (CTA buttons hover)         | 4.64  | ✅ AA            |              |
| cream on ink (primary CTA, footer)              | 16.83 | ✅ AAA           |              |
| cream on bookgreen                              | 8.97  | ✅ AAA           |              |
| terracotta-soft on ink (dark sections)          | 6.56  | ✅ AA            |              |
| terracotta on ink                               | 3.63  | ❌ fails AA small | passes AA Large (≥3.0) |
| `text-cream/40` on ink (decorative numerals)    | ~2.94 | ❌ fails        | fails AA Large too — only acceptable as decoration |

Confirmed Lighthouse `color-contrast` failure (score 0):
- Homepage subhead label (`<span class="font-mono text-[11px] ... text-terracotta">` over a `cream-deep` background, 11 px = 8.3 pt) at 4.29:1.

The `font-mono text-[11px] uppercase text-terracotta` pattern is repeated in **9 components** (PromiseTiles, PortfolioTeaser, Reviews, RetailTeaser, Visit, FounderStrip, ArticleCard, MethodBlock, ShopGrid). On `bg-cream` (4.64) it just passes; on `bg-cream-deep` (4.29) it fails. Recommendation: either bump the color to `terracotta-deep` (6.82 on cream, 6.32 on cream-deep), or make these labels at least 14 px regular / 11 px bold to qualify for AA Large (≥3.0).

---

## 4. Lighthouse — homepage, mobile, simulated throttling

| Category       | Score |
| -------------- | ----- |
| Performance    | 75    |
| Accessibility  | 91    |
| Best Practices | 100   |
| SEO            | 100   |

BRAND.md target: **mobile perf ≥ 85** — currently **10 points short**, but the audit was run against the dev server (un-minified JS + un-fingerprinted assets + HMR runtime). A production build will almost certainly clear 85.

Top performance opportunities (Lighthouse `metricSavings` mobile, simulated):

| ID                       | Title                                       | Display saving |
| ------------------------ | ------------------------------------------- | -------------- |
| `unused-javascript`      | Reduce unused JavaScript                    | 403 KiB / 2.25 s |
| `unminified-javascript`  | Minify JavaScript                           | 235 KiB / 1.10 s |
| `unminified-css`         | Minify CSS                                  | 3 KiB / 150 ms |
| `image-delivery-insight` | Improve image delivery                      | 45 KiB / 150 ms |
| `lcp-discovery-insight`  | LCP request discovery (no `priority` hint?) | —              |
| `network-dependency-tree` | Long font/JS chain                         | —              |
| `legacy-javascript-insight` | Polyfills for evergreen browsers          | 8 KiB          |

Top a11y opportunities (Lighthouse on `/`):
1. `aria-prohibited-attr` — `<span aria-label="5 stars">` (Reviews.tsx).
2. `color-contrast` — small terracotta labels on cream-deep.
3. `heading-order` — H1 → H3 hop (PromiseTiles.tsx).

The remaining ~9-point a11y gap maps directly onto these three findings; fixing them likely lifts LH a11y to ~98–100.

---

## 5. Reduced motion

`prefers-reduced-motion: reduce` honored:
- `LenisProvider` (`components/providers/LenisProvider.tsx:8`) early-returns when `matchMedia('(prefers-reduced-motion: reduce)').matches`. Verified in browser: under reduced-motion emulation `<html>` does **not** receive the `lenis` class and `lenis-smooth` is not initialised.
- `app/globals.css:83` re-enables native `scroll-behavior: smooth`.
- Framer Motion is used in 20+ components (Hero, PromiseTiles, MethodBlock, etc.). Framer Motion respects `prefers-reduced-motion` automatically only when components opt-in via the `MotionConfig` provider with `reducedMotion="user"`. **No `MotionConfig` wrapper found** in `app/layout.tsx`. Result: scroll-triggered fade/slide animations still play under reduced-motion. Not a hard WCAG fail (no parallax, no auto-playing video, no flashing), but it does miss the SC 2.3.3 (Animation from Interactions) intent. Add `<MotionConfig reducedMotion="user">` in `app/layout.tsx`.

---

## Top 5 fixes ranked by impact

1. **Production build before judging perf** — re-run Lighthouse against `next build && next start`; minify + tree-shake should add ~15 perf points and clear the BRAND.md ≥85 target without code changes.
2. **`/the-method` closing CTA horizontal scroll on mobile** (`app/the-method/page.tsx:501-538`). Replace `gap-10` with `gap-4 md:gap-10`, or stack the grid on mobile.
3. **Color contrast — terracotta @ 11 px on cream-deep** (9 components listed above). Swap `text-terracotta` for `text-terracotta-deep` on these tiny labels, or raise size/weight. Single-token search-and-replace in most cases.
4. **Esc closes mobile drawer + skip-to-content link** (`components/chrome/Header.tsx`, `app/layout.tsx`). Two small a11y wins, both very fast.
5. **Heading-order H1→H3 + prohibited aria-label** (`PromiseTiles.tsx`, `Reviews.tsx`). Three-character edits each; lifts Lighthouse a11y from 91 to ~99.

Bonus: wrap app in `<MotionConfig reducedMotion="user">` so Framer Motion fades stop playing under reduced motion.

---

## Files referenced

- `/Users/carlborg/Dev/Hair salon for curly hair/website1/app/the-method/page.tsx`
- `/Users/carlborg/Dev/Hair salon for curly hair/website1/app/layout.tsx`
- `/Users/carlborg/Dev/Hair salon for curly hair/website1/app/globals.css`
- `/Users/carlborg/Dev/Hair salon for curly hair/website1/components/chrome/Header.tsx`
- `/Users/carlborg/Dev/Hair salon for curly hair/website1/components/ui/Container.tsx`
- `/Users/carlborg/Dev/Hair salon for curly hair/website1/components/providers/LenisProvider.tsx`
- `/Users/carlborg/Dev/Hair salon for curly hair/website1/components/homepage/Reviews.tsx`
- `/Users/carlborg/Dev/Hair salon for curly hair/website1/components/homepage/PromiseTiles.tsx`
- `/Users/carlborg/Dev/Hair salon for curly hair/website1/components/homepage/PortfolioTeaser.tsx`
- Lighthouse JSON: `/tmp/lighthouse-home.json`
