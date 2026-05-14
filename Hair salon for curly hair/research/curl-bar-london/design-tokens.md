# Curl Bar London — Design Tokens

Extracted from `https://www.thecurlbarlondon.com` HTML head, the Squarespace site CSS (`static1.squarespace.com/static/versioned-site-css/.../site.css`), and the Typekit kit JSON (`use.typekit.net/ik/....js`). All values are real, lifted directly from the live site CSS.

---

## Brand colors

```css
:root {
  /* Primary surfaces */
  --color-bg:           #FFFFFF;   /* page background, nav bar, body type backdrop */
  --color-fg:           #030303;   /* near-black; headings, body type, primary CTA */
                                   /* Squarespace declares it as hsl(0,0%,1.17647%)
                                      which converts to #030303 — not pure black. */

  /* Accent system — the entire brand color identity beyond black/white */
  --color-accent-pink:  #EB88BB;   /* hot bubblegum pink. Booking flow background,
                                      section panels, accent moments.
                                      Squarespace token: --lightAccent-hsl
                                      = 329.09, 72.26%, 73.14% */
  --color-accent-blush: #F7BED2;   /* softer blush pink. Used behind the polaroid
                                      cork-board section on home.
                                      Squarespace token: --darkAccent-hsl
                                      = 338.95, 80.28%, 86.08% */

  /* Photography backdrop (perceptual, not CSS) */
  /* Hero & studio shots use a warm cream wall — approx #EFE8DD — set by the
     physical salon environment, not declared in CSS. */
}
```

**Note on naming:** Squarespace inverts the semantic of "lightAccent" / "darkAccent" — `lightAccent` is the brighter pink, `darkAccent` is the lighter blush. We re-named them above for clarity.

**Functional usage:**
- Black on white = default content surfaces
- White on hot pink = booking flow, brand context-shift moments
- Hot pink italic on white = the "TCBL Team" sign-off (the only italic usage in the entire site)
- Black pill on white = primary CTAs ("Book Now")
- White pill on hot pink = CTA when on a pink panel (e.g. footer "Book Now" in screenshot 08)

---

## Typography

### Single typeface family

```css
:root {
  --font-display: "pragmatica-extended", "Helvetica Neue", Arial, sans-serif;
  --font-body:    "Helvetica Neue", Arial, sans-serif;  /* Squarespace default fallback,
                                                            never replaced */
}
```

**Source:** Adobe Fonts / Typekit. Loaded via `https://use.typekit.net/ik/....js` in `<head>`.

**Available cuts (per Typekit kit JSON):**
- `pragmatica-extended` 700 normal (the workhorse — H1 through nav, buttons, meta)
- `pragmatica-extended` 700 italic (used once: "TCBL Team" sign-off, in pink)

That's it — one family, one weight, two styles. Total brand typographic system.

### Squarespace tweak variables (verbatim from `site.css`)

```css
:root {
  /* Headings — H1, H2, H3, H4 all use this */
  --heading-font-font-family:    "pragmatica-extended";
  --heading-font-font-weight:    700;
  --heading-font-font-style:     normal;
  --site-title-font-font-family: var(--heading-font-font-family);

  /* Body / paragraph */
  --body-font-font-family:       "Helvetica Neue", Arial, sans-serif;
  --body-font-font-weight:       400;
  --body-font-font-style:        normal;
  --body-font-text-transform:    none;
  --body-font-letter-spacing:    0em;
  --body-font-line-height:       1.6em;

  /* Meta — nav links, button labels, "BOOK NOW" pills, location names */
  --meta-font-font-family:       "pragmatica-extended";
  --meta-font-font-weight:       700;
  --meta-font-font-style:        normal;
  --meta-font-text-transform:    uppercase;
  --meta-font-letter-spacing:    0.01em;
  --meta-font-line-height:       1em;

  /* Primary buttons (.sqs-button-element--primary) */
  --primary-button-font-font-family: "Helvetica Neue", Arial, sans-serif;
  --primary-button-font-font-weight: 700;
}
```

**Observed type roles in the wild (visual scale, not declared in tokens):**

| Role | Approx px @ desktop | Style |
|---|---|---|
| Hero H1 ("FOR CURLS, COILS AND WAVES.") | ~96px / 6rem | uppercase, tight leading, white over photo |
| Page H1 ("OUR SERVICES", "FIND YOUR AVAILABLE SLOT", "MEET THE CURL BAR GIRLS") | ~64–80px | uppercase, black on white |
| H2 ("CURL CUT", "MYDDLETON ROAD") | ~36–44px | uppercase |
| H3 (stylist names "ANDRINA / MIA / NIA / NIAH") | ~24px | uppercase, often pink or black |
| Service item ("CURL BAR CUT") | ~18–20px | uppercase |
| Body | 16px | sentence case, line-height 1.6em |
| Meta / labels / from-£80 | ~12–13px | sentence case, regular |
| Nav links | ~14px | sentence case (NOT uppercase — note this is the only place sentence case appears in non-body type) |

---

## Spacing & layout

Squarespace **Fluid Engine** (24-column grid) handles layout. There is **no declared spacing scale** as CSS variables — Squarespace authors space via the editor, not via tokens.

Observed rhythm (from screenshots):
- Hero: ~85vh
- Section vertical padding: roughly 96–160px on desktop, 64–96px on mobile
- Container max-width: full-bleed on most sections (no `--site-max-width` declared)
- Inline content typically capped around 1200–1400px and centered
- Card grids (polaroid wall, team) use 4-up on desktop, 2-up on tablet, 1-up on mobile

For our build, define an explicit scale:
```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;
  --space-32: 128px;
  --space-40: 160px;
}
```

---

## Borders & radii

```css
:root {
  /* Buttons: full-pill radius (capsule) */
  --radius-pill:   9999px;        /* "Book Now", "SELECT", primary CTAs */

  /* Acuity service/calendar cards: very subtle radius */
  --radius-card:   4px;           /* the white booking cards on pink */

  /* Images: square corners — no radius applied */
  --radius-image:  0;
}
```

---

## Notable Squarespace CSS custom properties (verbatim)

```css
:root {
  /* The HSL values that drive everything else */
  --white-hsl:                  0, 0%, 100%;
  --black-hsl:                  0, 0%, 1.17647059%;
  --lightAccent-hsl:            329.09090909, 72.26277372%, 73.1372549%;   /* #EB88BB */
  --darkAccent-hsl:             338.94736842, 80.28169014%, 86.07843137%;  /* #F7BED2 */
  --safeLightAccent-hsl:        0, 0%, 100%;
  --safeDarkAccent-hsl:         0, 0%, 0%;
  --accent-hsl:                 0, 0%, 100%;
}
```

These HSL triplets are then used in `hsla(var(--lightAccent-hsl), 1)` patterns throughout the stylesheet, which is how Squarespace builds opacity-aware color tokens. Worth replicating the *pattern* in our own tokens — it makes alpha variants trivial:

```css
:root {
  --color-pink-hsl: 329, 72%, 73%;
  --color-fg-hsl:   0, 0%, 1%;
  --color-bg-hsl:   0, 0%, 100%;
}

.section-pink         { background: hsla(var(--color-pink-hsl), 1); }
.section-pink-soft    { background: hsla(var(--color-pink-hsl), 0.4); }
.text-on-pink-muted   { color:      hsla(var(--color-bg-hsl),   0.8); }
```

---

## Asset hosts (for reference)

| Asset | Origin |
|---|---|
| Imagery | `images.squarespace-cdn.com` |
| Site CSS | `static1.squarespace.com/static/versioned-site-css/...` |
| Static template assets | `static1.squarespace.com/static/vta/...` |
| Fonts | `use.typekit.net` (Adobe Fonts) |
| Booking embed | `embed.acuityscheduling.com/js/embed.js` → `thecurlbarlondon2.as.me` |

---

## Quick-reference summary card

```
BRAND        Black + White + Hot Pink. Single italic accent in pink.
TYPE         Pragmatica Extended (Adobe Fonts), 700 only,
             roman + italic. Helvetica Neue body fallback (default Squarespace).
COLOR        #FFFFFF  #030303  #EB88BB  #F7BED2
RADII        Pill (9999px) for CTAs. Square for images. 4px on cards.
GRID         Squarespace Fluid Engine 24-col. Full-bleed sections.
MOTION       None. Marquee block only.
STACK        Squarespace 7.1 + Acuity Scheduling + Typekit.
```
