# Design Tokens — HARE & BONE (Fitzrovia / Esher)

All values pulled from live computed styles on hareandbone.co.uk on 2026-05-08 (1440x900 viewport).

## Colors

```css
:root {
  /* Surfaces */
  --color-bg:            #FFFFFF;   /* page background */

  /* Ink */
  --color-text:          #333333;   /* body, nav, paragraphs */
  --color-heading:       #000000;   /* H2 display headlines */
  --color-text-muted:    #4C4C4C;   /* footer column titles */

  /* Brand accent — the ONLY chromatic color on the entire site */
  --color-accent:        #B29650;   /* antique gold; rgb(178,150,80) */

  /* States */
  --color-accent-hover:  #B29650;   /* same gold, used as hover/active for nav + links */
  --color-link:          #B29650;
}
```

There are **no secondary accents, no gradients, no shadows, no glass effects** anywhere on the homepage, services, about, or team pages.

## Typography

### Font families

```css
--font-display: "Playfair Display", serif;   /* H1, H2 hero headlines */
--font-body:    "Open Sans", sans-serif;     /* everything else */
```

Both loaded via Google Fonts (Elementor's `google_font-enabled` setting). `font-display: swap` is on.

### Type scale (computed values from production)

| Token | Family | Weight | Size | Transform | Used for |
|---|---|---|---|---|---|
| `--type-display-xl` | Playfair Display | **900** | **78px** | uppercase | "BOLD VISION", "WE LOVE COLOUR" hero headlines |
| `--type-eyebrow` | Playfair Display | 900 | 13px | uppercase | Tiny eyebrow above hero ("WE CELEBRATE INDIVIDUALITY...") |
| `--type-body` | Open Sans | 400 | 13px | none | Body paragraphs |
| `--type-nav` | Open Sans | 400 | 14px | uppercase | Top navigation, footer links |
| `--type-cta-large` | Open Sans | 700 | 16px | none | Top-bar notice CTA "Click here for details!" |
| `--type-footer-h3` | Open Sans | 400 | 14px | none | Footer column heads (note: H3, NOT uppercased) |

### Letter-spacing
- Always `normal`. They do not track-out their type.
- Despite being a "fashion-forward" brand they avoid the wide-tracked / high-letter-spacing look.

### Line-heights
- Body paragraphs: ~1.6 (Open Sans default in Elementor).
- Display: ~1.0–1.1 — tight to make 78px feel poster-like.

## Spacing

Elementor doesn't expose a custom spacing scale; values are inline. Observed pattern:

| Token (suggested) | Approximate value | Use |
|---|---|---|
| `--space-section-y` | 80–120px desktop, 48–64px mobile | Vertical padding inside hero / feature sections |
| `--space-section-y-large` | 160–200px | Between hero blocks |
| `--space-card-gap` | 24–32px | Gap between the 3 feature cards |
| `--space-text-gap` | 12–16px | Heading → paragraph |
| `--container-max` | 1170px | Main content container |
| `--container-pad-x` | 32px desktop / 20px mobile | Side padding |

## Borders, radii, shadows

```css
--radius-all:      0px;       /* nothing is rounded */
--shadow-all:      none;      /* no shadows used anywhere */
--border-style:    none;      /* buttons have no borders; underlines are text-decoration only */
```

## Buttons / CTAs

There is no traditional button system. CTAs are implemented as styled anchor tags with text + an underline or a color shift. The most prominent CTA on the homepage is the centered "Book Now" link in `--color-accent`, no fill, no border, just gold text in Open Sans.

Recommended port of their "button" patterns:

```css
.cta-text-link {
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
}
.cta-text-link:hover { opacity: 0.7; }

/* "Book Now" centered hero CTA — same as above but larger, no underline */
.cta-hero {
  color: var(--color-accent);
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
}
```

## Layout primitives

- **Header:** flex row, logo left, horizontal `<ul>` nav right. Not sticky.
- **Hero:** full-bleed Royal Slider (jQuery-based). Photos are usually portrait or square crops with text overlay or text beside.
- **Triptych grid:** CSS grid / flex, `grid-template-columns: repeat(3, 1fr)` on desktop, stack on mobile. Photo on top, copy below, link beneath.
- **Footer:** 5-column flex/grid above, single-row legal strip below.

## Notable CSS patterns observed

- `text-transform: uppercase` is applied generously on nav, button, eyebrow text.
- `font-weight: 900` (Playfair "Black") is the load-bearing weight — they do not use 700/Bold for display.
- All page chrome (header, nav, footer) uses **Open Sans 14px Regular**, which is genuinely small. This stays out of the way of the photography.
- `font-size: 13px` for body is on the small side for 2025 standards. Worth bumping to 16–17px in our build for accessibility, especially given older curl-client demographics.

## Iconography

- Social icons (Instagram, YouTube) are flat 1-color SVGs at footer.
- Dropdown chevrons are tiny SVGs in `--color-accent` gold.
- No icon system / no icon font on the public site.

## Imagery treatment (referenced from teardown.md)

```css
/* Suggested treatment to match their photography grading */
--image-grade: warm, slightly desaturated, creamy highlights;
--image-bg-tones: cream / warm-grey / soft taupe studio backdrops;
--image-aspect-hero: portrait or square (NOT 16:9 cinematic);
--image-aspect-card: portrait 3:4 or 4:5;
```

No image filters, blend modes, or overlays detected via CSS — the grading is baked into the photographs themselves.

## What's deliberately missing

- No CSS custom properties exposed publicly (Elementor inlines all values).
- No design-system documentation.
- No Storybook / pattern library.
- No fluid typography (`clamp()` etc).
- No dark mode.
- No motion / animation tokens — they have none.

This is deliberately a thin, document-style design system. Three colors, two fonts, no chrome. The minimalism IS the brand.
