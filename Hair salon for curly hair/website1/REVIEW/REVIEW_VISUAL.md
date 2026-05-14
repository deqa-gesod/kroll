# Visual Review — Jackson & Coil Website Prototype

**Date:** 2026-05-08
**Scope:** 20 fresh screenshots (10 pages, desktop + mobile) at `/Users/carlborg/Dev/Hair salon for curly hair/website1/REVIEW/screenshots/`
**Brand reference:** `/Users/carlborg/Dev/Hair salon for curly hair/BRAND.md`

---

## Verdict: 🟡 (passes the load-bearing rules; specific items to fix before launch)

The prototype clears the §9 Photography Test, holds color discipline, and lands the editorial-Scandinavian-meets-PATTERN tone the brief asks for. The remaining issues are concentrated in three places: (1) Black-male visibility in the **portfolio** (only one or two heads visible — needs more), (2) Sigrid's Type 2/3 head not present in the visible portfolio grid (BRAND §9.3 risk), (3) one or two AI portraits with slightly plasticky skin/hair texture worth a regen pass.

---

## Photography Test (§9) — Results

| Test | Result | Notes |
|---|---|---|
| **9.1 Hero passes Amara Test** (Type 4, dark skin, lit, joyful, real context) | ✅ PASS | Homepage hero is a Type 4 Black woman, dark skin, lit warmly (not muddy), genuine smile, paper-cream backdrop. This is the strongest single asset on the site. |
| **9.2 Hero rotation includes Black man, fade + coils, integrated** | 🟡 PARTIAL | A Black male head is present in the homepage gallery strip ("One gallery. The whole spectrum.") and on the team page (stylist card, fade + coils silhouette). He is NOT in the *primary* hero rotation above the fold — he's downstream. Recommend promoting one Daniel-archetype frame into the hero rotation itself, not the gallery band. |
| **9.3 Sigrid sees one head she recognizes** (Type 2/3 visible without a `/loose-curl` tab) | 🔴 FAIL (in portfolio grid) | The portfolio desktop grid reads as overwhelmingly Type 4. I do not see a clear Type 2c/3a head in the portfolio. The team page has a curly white woman (Vera Pedersen card, looks 3a/3b) — good — but Sigrid will land on `/portfolio` and not see herself. Add at least 2 Type 2/3 heads to the portfolio grid before launch. |
| **Type 4 lit properly, no muddy darks** | ✅ PASS | The Codex-generated portraits handle dark skin well — warm key light, separation between hair and background, no flat shadows. Vanessa's about-page portrait is the standout. |

---

## Specific images flagged for regen

| Manifest key (best guess) | Issue | Page |
|---|---|---|
| `team-male-stylist` (Black male, brown sweater, beard) | Beard texture reads slightly plasticky / AI-rendered up close; eyes have minor uncanny-valley quality | the-team-desktop.png, card 3 |
| `team-vera` or equivalent (older white curly stylist) | Skin texture is over-smoothed; reads stock-ish next to the others | the-team-desktop.png, card 5 |
| Portfolio thumbnails — at least 2 frames | Need to swap in Type 2c/3a heads (Sigrid inclusion) | portfolio-desktop.png |
| Portfolio thumbnails — at least 1–2 more Black male frames | Currently under-indexed on Daniel persona | portfolio-desktop.png |
| Homepage gallery strip ("One gallery") | Add a Daniel-archetype (fade + coils) frame in the hero rotation, not just the strip | home-desktop.png |

The 34 photographs in `public/images/` mostly hold up at 1x viewing. The risk is the homepage hero rotation and the portfolio grid being the two surfaces most scrutinized — so spend the regen budget there first.

---

## Per-page quick verdicts

| Page | Verdict | One-line note |
|---|---|---|
| home-desktop | 🟢 | Strong hero, good rhythm, "Two minutes from Olaf Ryes plass" closer is on-brand |
| home-mobile | 🟢 | Stack reads cleanly; hero portrait dominates appropriately |
| about-desktop | 🟢 | Vanessa portrait excellent; "she stops borrowing chairs" headline lands |
| about-mobile | 🟢 | (sampled briefly — clean stack) |
| portfolio-desktop | 🟡 | Type 4 representation strong, Sigrid + Daniel under-represented in visible grid |
| portfolio-mobile | 🟡 | Same content issue as desktop; layout is fine |
| the-team-desktop | 🟢 | Five cards, mixed ethnicity, good editorial restraint; two AI flags above |
| the-team-mobile | 🟢 | (sampled briefly — clean stack) |
| the-method-desktop | 🟢 | 5-step layout reads beautifully; Andre Walker SVG is present and well-set; "Wet hair is a different shape than your hair" is exactly the right voice |
| the-method-mobile | 🟢 | (sampled briefly) |
| booking-desktop | 🟢 | Color discipline perfect — paper-cream + off-black + bookgreen "Book" button only. Prices visible, no "from." |
| booking-mobile | 🟢 | The Sigrid 22:30 test looks plausible — single column, tap targets adequate |
| cuts-and-services-desktop | 🟢 | "What it is. What it costs." headline is best-in-class for the brief's voice |
| cuts-and-services-mobile | 🟢 | Clean |
| shop-desktop | 🟢 | Retail wall reads premium; product tiles disciplined; terracotta-ochre price tags consistent |
| shop-mobile | 🟢 | Clean stack |
| visit-desktop | 🟢 | "Markveien 35. Two trams away." — interior photo of the salon chair area is good |
| visit-mobile | 🟢 | Clean |
| journal-desktop | 🟢 | Three-column editorial grid, "Notes from the chair, once a month" newsletter strip is on-brand |
| journal-mobile | 🟢 | Clean |

---

## Top 5 things that look great

1. **Homepage hero** — the Amara-archetype Type 4 portrait, paper-cream background, warm side light, real smile. Passes §9.1 cleanly. This is the brand in three seconds.
2. **Typographic discipline** — the serif headlines ("Every curl pattern. One place.", "What it is. What it costs.", "Five people. One curl spectrum.") have generous leading, mixed-case ligature feel, and never decoratively used. Tekla-meets-Aesop register, exactly per BRAND §8.
3. **Color discipline** — terracotta-ochre is the only owned color across nav, price tags, accent rules; bookgreen is genuinely reserved for the `/booking` CTA. No second brand color crept in.
4. **Voice in the long-form pages** — `/the-method` headlines ("Read the hair before you touch.", "Curls curl dry. Never under tension.", "Wet hair is a different shape than your hair.") are exactly Vanessa's voice from BRAND §3 and §7.
5. **Pricing transparency on `/booking` and `/cuts-and-services`** — every price visible, no "from," durations explicit, color flagged as "consultation required." This is the BRAND §4.4 cross-persona truth delivered.

---

## Top 5 things to fix

1. **Sigrid inclusion in `/portfolio`** — add at least 2 Type 2c/3a heads to `/Users/carlborg/Dev/Hair salon for curly hair/website1/public/images/portfolio*` and surface them in the visible (above-fold) grid. Currently the portfolio reads as Type 4 only; this is a §9.3 fail.
2. **Daniel in the homepage hero rotation** — promote one fade+coils frame from the gallery strip into the hero rotation itself in `/Users/carlborg/Dev/Hair salon for curly hair/website1/app/page.tsx` (or wherever the hero array is wired). Currently he's a downstream beat, not a hero beat — that's a §9.2 partial fail.
3. **Two team-card portraits with AI texture artifacts** — regen `team-male-stylist` and `team-vera` (or whatever the manifest names them) at `/Users/carlborg/Dev/Hair salon for curly hair/website1/public/images/team-*.jpg`. Skin reads slightly over-smoothed.
4. **Portfolio Black-male representation** — currently under-indexed. Add 2–3 more Daniel-archetype frames (fade + defined coils on top, beard, side profile of the line work). The portfolio is the Daniel-persona conversion surface.
5. **Hero rotation cadence on mobile** — on `home-mobile.png` the hero portrait is excellent but only one frame is visible above the fold. Confirm the rotation is actually rotating on mobile (not just static), and that the second/third frame includes Daniel and Sigrid respectively. File: `/Users/carlborg/Dev/Hair salon for curly hair/website1/app/page.tsx` or the hero component.

---

## Color discipline check

| Check | Result |
|---|---|
| Terracotta-ochre as the single owned color | ✅ Used consistently for nav accents, price chips, the "+47" phone marker, divider rules. No drift. |
| Bookgreen reserved for booking states | ✅ Visible only on the "Book" CTA in the nav and the Step-1 progress indicator on `/booking`. Not leaking into homepage or shop. |
| Off-black is warm-shifted (not pure #000) | ✅ The footer reads as warm near-black, not flat black. |
| Paper-cream as dominant background (not pure white) | ✅ Consistent across all 10 pages. |
| No second brand color, no gradient palettes | ✅ Clean. |

---

## Voice violations

| Check | Result |
|---|---|
| Exclamation marks in headlines | ✅ None spotted. |
| "Embrace your curls!" / "your hair journey" / "pamper" / "treat yourself" | ✅ None spotted. |
| "Curl whisperer" | ✅ None. |
| "All hair types welcome!" defensive caveats | ✅ None — the site states the position calmly: "Every curl pattern. One place." |
| "Tribal / exotic / unruly / tame" | ✅ None. |
| Performative AAVE | ✅ None. |
| Architectural register on men's services | ✅ "Sculpt Cut", "taper", "line", "edge" all present on `/cuts-and-services` and `/booking`. |

The voice is the strongest non-photographic asset on the site. No corrections needed.

---

## AI image quality flags (regen candidates)

Confidence is moderate — at 1x browser viewing, most images hold. At 2x or hero-crop scale these are the suspects:

1. **Team page card 3** (Black male stylist, brown sweater) — beard hair has a faint "rendered" sheen rather than real follicle texture. File path likely: `public/images/team-*.jpg` (the male card). **Regen.**
2. **Team page card 5** (older white woman with curls) — skin too smooth, eyes slightly glassy. **Regen or accept as a softer "founder energy" portrait.**
3. **Shop product imagery** — a couple of the bottle-on-shelf shots have label text that is the AI-illegible kind. If the user clicks through and sees garbled label text, trust collapses. Audit at 2x. (If labels are real product overlays from a CMS, ignore.)
4. **Portfolio frame ~middle row** — one frame has hair that reads slightly waxy at the highlight. Low priority.
5. **Homepage "The Jackson Cut" video poster** — the poster image of hands-in-hair reads fine, but verify the video (not in screenshots) has the same lighting register as the stills.

The Vanessa about-page portrait, the homepage hero, the team cards 1, 2, and 4, and `/the-method` mid-cut crops all look strong.

---

## Bottom line for the build phase

The site delivers the brief's hardest asks: the Photography Test passes on the hero, the voice is Vanessa's, the color is owned, and the booking flow is honest. Two structural gaps before launch: **more Daniel in the hero rotation** and **Sigrid in the portfolio grid**. Both are content-side fixes (image manifest + which frames the homepage hero array points to), not redesigns. Ship those and the prototype clears 🟢.
