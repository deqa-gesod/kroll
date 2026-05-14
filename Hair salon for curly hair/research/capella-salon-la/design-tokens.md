# Capella Salon — Design Tokens

Extracted from `https://capellasalon.com/assets/css/main.css` (10,010 lines, Sass-compiled, no CSS variables) and live computed styles via Playwright.

---

## Colors

### Frequency-ranked (top 20, from main.css)

| Hex | Count | Role | Notes |
|---|---:|---|---|
| `#ffffff` | 79 | Page bg, button text | Dominant background |
| `#000000` | 62 | Body text, logo, ghost-button border | High contrast, no soft black |
| `#dedede` | 33 | Light grey UI / dividers / `.c-button--grey-light` | |
| `#979797` | 12 | Muted text / secondary | |
| `#ff5649` | 8 | Accent red | Used sparingly (alerts/sale highlight) |
| `#f3dab1` | 8 | Warm sand | Section washes |
| `#e39466` | 8 | **Primary CTA "peach"** | Signature accent — used on `.c-button--black` (yes, naming drift) |
| `#fafafa` | 6 | Off-white surface | |
| `#333333` | 5 | Body text alt | |
| `#fff4dd` | 4 | Cream wash | |
| `#ffe9c8` | 4 | Cream wash deeper | |
| `#fbebc7` | 4 | Cream wash | |
| `#f5f5f5` | 4 | Neutral surface | |
| `#f2d9b0` | 4 | Sand | |
| `#ebd49d` | 4 | Sand-darker | |
| `#ead0a2` | 4 | Sand | |
| `#e1c894` | 4 | Sand-darker (frame strokes `.c-card--framed-left-gold`) | |
| `#d9d9d9` | 4 | Light grey | |
| `#393434`, `#312e2e`, `#262323` | 4/4/2 | Warm near-black | Footer / dark surfaces |
| `#ffb5af`, `#fddbcf`, `#f3ece6` | 1-2 | Pink tints | Misc |

### Distilled palette (designer-usable)

```
/* Core */
--bg:               #ffffff;
--bg-cream-50:      #fff4dd;
--bg-cream-100:     #ffe9c8;
--bg-cream-200:     #fbebc7;

--ink:              #000000;
--ink-soft:         #393434;   /* warm near-black for body */
--ink-muted:        #979797;

/* Sand frame strokes */
--sand-100:         #f3dab1;
--sand-200:         #ebd49d;
--sand-300:         #e1c894;

/* Brand accents */
--peach:            #e39466;   /* PRIMARY CTA color */
--peach-text:       #ffffff;
--red:              #ff5649;   /* used sparingly */

/* Neutrals */
--surface-50:       #fafafa;
--surface-100:      #f5f5f5;
--border:           #dedede;
```

**Read:** A cream + sand + peach + black palette. No saturated brand color besides the peach CTA. Photography is meant to bring all the warmth.

---

## Typography

### Faces loaded (via @font-face)

| Family | Source | Notes |
|---|---|---|
| **Brown-Light** | `lineto-brown-light.woff2` | Body text (15px) |
| **Brown-Regular** | `lineto-brown-regular.woff2` | Nav, UI |
| **Brown-Bold** | `lineto-brown-bold.woff2` | Emphasis |
| **Brown** | (multi-weight family alias) | 300, 400, 700 |
| **Gotham** | (locally hosted, woff/woff2 not in @font-face dump) | Headings |
| **Sofia Pro** / **Sofia Pro Medium** | (referenced in cascade fallbacks) | Likely never actually loaded — fallback only |

**Lineto's Brown** is a paid commercial typeface ($200+/license, Lineto.com, by Aurèle Sack) — same family used by Patagonia, MailChimp legacy, and many premium agency sites. Choosing Brown over a free Google font signals real brand investment.

**Gotham** is Hoefler & Co — also a paid premium face.

### Computed live values (capellasalon.com homepage, 1440px)

```
body          → font-family: "Brown-Light", Arial; font-size: 15px; color: #000;
nav a         → font-family: "Brown-Regular", Arial; font-size: 15px; weight: 400;
                text-transform: none; color: #000;
heading       → font-family: "Gotham", arial, sans-serif; weight: 600; size: ~12-13px (small)
promo banner  → bg: #8c8c8c; color: #fff;
button        → bg: #e39466; color: #fff; padding: 1rem 2.3rem; border-radius: 0;
                border: 1px solid; text-transform: (none — sentence-case)
```

### Type pairing summary

```
Display / headings:   Gotham, 600, often small caps-feeling (tight)
Nav / UI:             Brown-Regular, 15px, sentence-case, NOT uppercase
Body:                 Brown-Light, 15px, leading roughly 1.6
```

Sentence-case nav (instead of ALL CAPS) is unusual for a salon and reads more editorial / less mall-spa.

---

## Spacing scale

CSS utility classes follow a multiplicative naming convention:

```
.u-pt--   → padding-top: 6px       (extra-tight)
.u-pt-    → padding-top: 12px      (tight)
.u-pt     → padding-top: 24px      (default)
.u-pt+    → padding-top: ~48px     (loose)
.u-pt++   → padding-top: ~72px+    (extra-loose)
.u-pt0    → padding-top: 0
```

Same suffixes apply to `pb` (padding-bottom), `pv` (vertical), `ph` (horizontal), `mt`/`mb`/`mv`/`mh` (margins).

Plus responsive variants: `.u-pt+@desktop`, `.u-pt+@tablet`, `.u-pt+@mobile`, `.u-pt+@mobileSmall`.

**Implied scale:** 0, 6, 12, 24, 48, 72 — a doubling scale, with an in-between half-step (so `--`/`-` differ by 2x). Nice and predictable.

---

## Components — notable CSS

### Button (`.c-button` + `.c-button--black`)

```css
.c-button {
    padding: 1rem 2.3rem;
    align-self: flex-start;
    border: 1px solid;
    border-radius: 0;          /* SQUARE corners — important brand choice */
    cursor: pointer;
    display: inline-block;
}

.c-button--black {              /* class name says "black" but… */
    background-color: #e39466;  /* …it's actually peach */
    border: none;
    color: #fff;
    position: relative;
}

.c-button--black:hover {
    background-color: #404040;  /* hover goes near-black */
}

.c-button--white {
    background-color: #fff;
    border: none;
    color: #000;
}

.c-button--ghost {
    background-color: transparent;
    border: 1px solid #000;
    color: #000;
}
```

**Lessons:**
- **Square corners** (`border-radius: 0`) — gives the buttons an editorial / fashion feel rather than friendly-rounded. Strong choice.
- Default brand button is a peach pill of #e39466 with white text.
- Ghost variant for secondary actions on dark backgrounds.

### Framed-image card (parallax)

```css
.c-card--framed-left-gold .c-card__frame {
    /* sand-colored frame stroke offset behind image */
    /* uses Rellax.js for parallax: data-rellax-percentage="0.5" data-rellax-speed="1" */
}
```

Used on the appointments page for the map block — gives a quiet motion layer.

### Hero (`.c-hero-banner`)

```html
<section class="c-hero-banner u-1/1">
  <div class="c-hero-banner__image"
       style="background-image: url(/assets/img/home-splash.jpg);
              background-size: cover;
              min-height: 93vh;
              background-position: 10% 50%">
  </div>
</section>
```

- Hero is `93vh` (not `100vh`) — leaves a sliver for the next section, signaling there's more to scroll.
- Background-image only, no overlay, no text.

### Naming convention (ITCSS / BEM-ish)

- `.o-` = object (layout): `.o-section`, `.o-wrapper`, `.o-layout`, `.o-layout__item`
- `.c-` = component: `.c-button`, `.c-page-header`, `.c-card`, `.c-hero-banner`
- `.u-` = utility: `.u-pt+`, `.u-mb`, `.u-flex`, `.u-color-grey`
- `.s-` = scope: `.s-page`, `.s-hero`
- `.js-` = JS hook: `.js-page-header`, `.js-frame`, `.js-image`
- Modifier: `--` (e.g., `.c-button--black`, `.c-card--framed-left-gold`)
- Element: `__` (e.g., `.c-card__frame`, `.c-page-header__logo`)

ITCSS + BEM. Solid architecture for a hand-coded site.

### Other notable patterns

- `.u-stack-layout@mobile` — responsive layout-mode toggle (flex stack on mobile)
- `.u-1/1`, `.u-7/12@mobile`, `.u-5/12@mobile` — fractional width utilities
- `.u-parallax` + `data-rellax-*` — Rellax.js-driven parallax layers
- `.animate` + `data-animation="fadeInUp"` + `data-animation-offset="95%"` — used on shaiamiel.com (WordPress side) for scroll-in
- `text-transform: none` on nav — sentence-case is intentional, not uppercase

---

## Quick "rip-and-reuse" snippet

For our Oslo salon, a minimal token starter inspired by Capella but **modernized for a 2026 Scandinavian brand**:

```css
:root {
  /* Surfaces */
  --bg:               #ffffff;
  --bg-cream:         #fff4dd;
  --bg-sand:          #f3dab1;

  /* Ink */
  --ink:              #1a1a1a;
  --ink-soft:         #393434;
  --ink-muted:        #6b6b6b;

  /* Brand accent (warmer than Capella's peach for Nordic light) */
  --accent:           #e39466;
  --accent-hover:     #d17a4f;
  --accent-text:      #ffffff;

  /* Borders / dividers */
  --border:           #e5e5e5;

  /* Spacing scale (doubling) */
  --s-1:    6px;
  --s-2:   12px;
  --s-3:   24px;
  --s-4:   48px;
  --s-5:   72px;
  --s-6:  120px;

  /* Type */
  --font-display:     "GT Walsheim", "Gotham", system-ui, sans-serif;
  --font-body:        "Söhne", "Brown", system-ui, sans-serif;
  --font-size-base:   16px;       /* nudge up from Capella's 15px for Norwegian readability */
  --line-height-base: 1.6;

  /* Radii — keep square per Capella; revisit if too cold */
  --radius-button:    0;
  --radius-card:      4px;
}
```

**Two delta-from-Capella choices baked in:**
1. Slightly lighter accent for Nordic ambient light + warmer peach hover.
2. `--radius-card: 4px` on cards (keeps Capella's square buttons but softens content surfaces — a Scandinavian touch).
