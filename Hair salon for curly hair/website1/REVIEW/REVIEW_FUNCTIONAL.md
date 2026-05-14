# Functional Review — Jackson & Coil Prototype

**Reviewed**: 2026-05-08
**Server**: `http://localhost:3010` (Next.js 16 dev)
**Scope**: behavior only (visual + a11y handled by parallel reviews)

## Verdict — 🟢 strong

The prototype is functionally tight. Every route renders, every nav link works, the language toggle actually swaps content (not just state), the booking flow gets a first-time mobile user from `/booking` to confirmation in well under 2 minutes, and the curl-type/brand filters on `/portfolio` and `/shop` filter live and compose. The only real soft spot is that the returning-client rebook still has to fill name/email/phone on step 5 — close to the 60s target but not under it without prefill.

## Test results

| # | Test | Pass/fail | Time | Notes |
|---|---|---|---|---|
| 1 | Smoke — all 10 routes return 200 | 🟢 pass | — | Curl-checked; titles render. |
| 1b | Console errors per page | 🟢 pass | — | Zero JS errors. Only image 400s (expected per brief). |
| 2 | Header nav — 8 links + wordmark | 🟢 pass | — | Every link routes correctly on desktop. |
| 2b | Mobile menu (375px) | 🟢 pass | — | Hamburger toggles `display:none ↔ flex`; links route. |
| 3 | Language toggle EN ↔ NO | 🟢 pass | — | Sampled `/`, `/cuts-and-services`, `/the-method`, `/shop`, `/booking`. Copy actually changes; voice-rule terms (Sculpt Cut, The Edit) intentionally kept English. No untranslated fragments seen. |
| 4 | Sigrid — first-timer mobile booking | 🟢 pass | **~76s** wall-clock | Step 1 → 5 + confirmation. Refresh at step 3 preserves state ("Resuming where you left off"). Back from step 4 → 3 keeps date/time. |
| 5 | Daniel — returning client rebook | 🟡 mixed | **~83s** wall-clock | "Welcome back, Daniel — Sculpt Cut with Vanessa" surface appears on `?returning=1`. "Rebook in one tap" jumps to step 3 with service+stylist prefilled and `isReturning:true`. "Skip — I've been before" on step 4 jumps to step 5. **Misses the 60s target only because name/email/phone are not prefilled** — clicking the same fields a regular flow uses. |
| 6 | Homepage CTAs | 🟢 pass | — | Hero "Book a chair", consultation CTA (deep-links to `/booking?service=consultation` and lands user at step 2 with consultation prefilled), founder strip, method block, retail teaser, sticky bottom CTA, footer "Book". |
| 6b | Sticky-bottom CTA | 🟢 pass | — | Renders `position:fixed`, `z-index:30`, after ~85% of viewport scroll. Hides near footer. Mobile + desktop. |
| 6c | Footer (12 links) | 🟢 pass | — | All hrefs valid; 10 internal routes already covered by smoke test. |
| 7 | Portfolio curl-type filter | 🟢 pass | — | All=13 → 4A=3 → Men's=2 → Color=2 → All=13. Live filtering. |
| 7b | Shop filter composition | 🟢 pass | — | All=21 → 4A=15 → 4A+Pattern=2. Curl-type AND brand compose correctly. |
| 8 | Lightbox on /portfolio | 🟡 mixed | — | Click an image → caption-and-image overlay opens with Close button. Esc closes it. Functional, but the overlay does not use `[role=dialog]` semantics (a11y concern, deferred to a11y review). |

## Booking flow timing

| Walk-through | Wall-clock (incl. test overhead) | Target | Verdict |
|---|---|---|---|
| Sigrid first-timer (375×812 mobile, fresh storage, 5 steps + intake) | **76 s** | <120 s | 🟢 pass with margin |
| Daniel returning rebook (`?returning=1` → one-tap → 1 time pick → skip intake → 3 contact fields → confirm) | **83 s** | <60 s | 🟡 close — fails only because contact fields aren't prefilled for the returning user |

Booking refs were generated on confirmation (e.g. `JC-BVU35N`, `JC-ZLWGHQ`); confirmation page renders When/Where + Reschedule / Add to calendar / Book another buttons.

## Console error inventory

Zero JavaScript errors and zero unhandled promise rejections on any of the 10 routes. The only error-level console messages across the whole walk-through are HTTP 400 responses from `/_next/image` for `public/images/portfolio-*.jpg`, `retail-*.jpg`, `journal-*.jpg`, `retail-hero.jpg` — i.e. missing image assets, expected per the review brief.

| Route | JS errors | Notes |
|---|---|---|
| `/` | 0 | clean |
| `/cuts-and-services` | 0 | clean |
| `/the-method` | 0 | 1 image 400 (`portfolio-4a-1.jpg`) — expected |
| `/the-team` | 0 | clean |
| `/portfolio` | 0 | 7 image 400s — expected |
| `/shop` | 0 | 2 image 400s — expected |
| `/journal` | 0 | 4 image 400s — expected |
| `/visit` | 0 | clean |
| `/booking` | 0 | clean |
| `/about` | 0 | clean |

## Critical broken behavior

**None.** Nothing is broken in a way that blocks user goals.

Items worth flagging for the team (severity-ordered, not blockers):

1. **Daniel rebook overshoots 60s** because contact details (name/email/phone) on step 5 are not prefilled even when `isReturning:true`. To meet the BRAND.md §13 60-second target, prefill these from a returning-user payload (or from saved-bag state) so a tap-tap-tap rebook actually finishes in one screen.
   - Repro: `/booking?returning=1` → "Rebook in one tap" → "Next available" + a time → "Skip — I've been before" → step 5 still has empty name/email/phone fields.
   - Files: `components/booking/*` and the data path that produces the "Welcome back" surface (need to search; the message is rendered on `app/booking/page.tsx`'s child).

2. **"Next available" button on step 3 doesn't auto-advance.** Clicking "Next available — 8 May — 10:00" highlights the day but doesn't pick the time, so the user still has to tap a time chip. Single-tap "Next available → continue" would shave 5–10 s for both personas.
   - Repro: any step 3 → click the "Next available" button → state stays on `step:3` with no time set in sessionStorage.

3. **Lightbox is not a `[role=dialog]`.** Functionally fine (Esc closes, Close button works), but a screen reader has no signal a modal opened. Flagged for the a11y reviewer.

4. **Mobile menu DOM is rendered visible-but-`display:none`** rather than aria-hidden — the link tree is in the snapshot before the hamburger is clicked. Toggle works correctly via `display`. Minor a11y nit, not functional.

## Polished moments

1. **Booking refresh persistence is real.** Hitting reload at step 3 preserves `service`, `stylist`, `furthest`, and step itself in `sessionStorage` under `jc-booking`, and the UI surfaces a quiet *"Resuming where you left off — Start over"* — exactly the Sigrid-22:30-with-kid-asleep behavior the brief asks for.
2. **Back navigation preserves forward state.** Going step 4 → back to step 3 keeps `date` and `time` filled, so you don't get punished for second-thoughts.
3. **Returning-client surface nails the brief.** `/booking?returning=1` greets "Daniel, Sculpt Cut with Vanessa, last visit March 14" with a single primary "Rebook in one tap" — this is Daniel's literal ask in BRAND.md §4.3 implemented verbatim.
4. **Skip-intake for returning clients.** Step 4 has a "Skip — I've been before" button that jumps to step 5; the confirm panel then says *"Returning client — intake skipped."* Small detail, sharp call.
5. **Filter composition on /shop.** Curl type + brand compose, and the result count updates live ("21 PRODUCTS" → "15" → "2"). Same UI utility used on `/portfolio` per the BRAND.md retail principle. The deep-link `?service=consultation` also works and pre-routes to step 2 — booking flow is genuinely interlinked, not a dead-end form.
