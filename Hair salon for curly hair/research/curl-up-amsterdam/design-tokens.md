# Design Tokens — Curl Spa Salon (`curlspa.nl`)

> Note: brief asked for "Curl Up Amsterdam" but no such salon exists. This documents the closest peer, **Curl Spa Salon** (curlspa.nl). See `teardown.md` for context.

## Stack signals
- `<meta name="generator" content="Wix.com Website Builder">`
- All assets served from `static.wixstatic.com` (AVIF, query-param transforms)
- Booking off-domain to `fresha.com`
- `<html lang="en">`, `viewport: width=device-width, initial-scale=1`
- No service worker, no Next.js, no Shopify globals

---

## Colors

```css
/* Brand */
--brand-navy:       #0E0A32;   /* rgb(14,10,50)    — primary heading text */
--brand-purple:     #1B1464;   /* rgb(27,20,100)   — secondary heads (e.g. footer "Become a Curl Specialist") */
--brand-deep:       #532563;   /* rgb(83,37,99)    — body paragraph color */
--brand-slate:      #58538B;   /* rgb(88,83,139)   — muted subhead */

/* Accents */
--accent-magenta:   #ED1566;   /* rgb(237,21,102)  — sparingly, CTA highlights */
--accent-crimson:   #DC2244;   /* rgb(220,34,68)   — sale tags / badges */
--accent-burgundy:  #93172D;   /* rgb(147,23,45)   — deep red, edge accent */
--accent-blue:      #116DFF;   /* rgb(17,109,255)  — Wix theme blue, mostly UI chrome */

/* UI / Neutrals */
--ui-link-default:  #0000EE;   /* rgb(0,0,238)     — UNSTYLED browser default; appears on real anchors. Brand failure. */
--ui-text-dark:     #2F2E2E;   /* rgb(47,46,46)    — secondary body */
--ui-text-mid:      #414141;   /* rgb(65,65,65) */
--ui-text-mute:     #959595;   /* rgb(149,149,149) */
--ui-text-faint:    #999997;   /* rgb(153,153,151) */
--ui-border:        #E8E6E6;   /* rgb(232,230,230) */
--ui-bg:            #FFFFFF;
```

**Diagnosis.** No tokenisation, no semantic role mapping. Five distinct purples coexist. The `#0000EE` browser-default link blue appears on un-restyled `<a>` elements in the footer and product blocks — a tell that the design system never got policed.

---

## Typography

### Font stack (computed)
```css
/* Headings (H1, H2, H3, H4) */
font-family: "Playfair Display", serif;
font-weight: 400;
/* Sizes observed: 50px (H1, hero "2026"), 23px (H3), 20px (H2 footer) */

/* Body, nav, links, paragraphs */
font-family: raleway, sans-serif;
font-size: 14px;
font-weight: 400;

/* Tertiary / fallback fonts loaded by Wix theme (mostly unused) */
/* avenir-lt-w01_35-light1475496, sans-serif */
/* proxima-n-w01-reg, sans-serif */
/* helvetica-w01-light, sans-serif */
/* avenir-lt-w01_85-heavy1475544, sans-serif */
```

### Type scale (observed)
| Role | Element | Size | Weight | Family |
|---|---|---|---|---|
| Hero title | H1 ("Curl Spa Salon") | 50px | 400 | Playfair Display |
| Hero subtitle | H3 | 23px | 400 | Playfair Display |
| Section H2 | "Become a Curl Specialist" | 20px | 400 | Playfair Display |
| Body | P | 14px | 400 | Raleway |
| Nav | LI > P | 14px | 400 | Raleway |
| Button label | A | 14px | 400 | Raleway |

**Diagnosis.** No fluid scale, no clamp(), no responsive ramp. Body 14px is small for a long-read site. No italic or weight variation to create hierarchy beyond size.

---

## Spacing

Wix lays the page out with a 1200px max-width grid, 80–120px vertical section padding, but no consistent rhythm — drag-and-drop tells.

Approximate captured spacings (no token system):
```css
--space-xs:   8px;
--space-sm:   16px;
--space-md:   24px;
--space-lg:   48px;
--space-xl:   80px;   /* between sections */
--space-2xl:  120px;  /* hero bottom padding */
```

---

## Imagery

- CDN: `static.wixstatic.com/media/...`
- Default delivery: AVIF with `q_85`, `usm_0.66_1.00_0.01` (unsharp mask), variable `w` / `h`
- Logo: purple/cream painterly script lockup, PNG, 301×401
- Social icons: 39×39 PNG flat, no SVG
- Product imagery: white background, mixed aspect ratios (~1:1)
- Venue imagery (lives on Fresha, not on brand site): warm interior shots, daylight, plants, neon — higher production quality than anything on the brand site itself

---

## Notable CSS observations

```css
/* Body */
background: #FFFFFF;
color: #0E0A32;          /* but paragraphs override to #532563 — low contrast */
font: 14px raleway, sans-serif;

/* Default link (un-restyled) */
a { color: #0000EE; }    /* browser default leaks through */

/* Buttons (Wix default) */
button {
  background: transparent;
  color: black;
  font: 13.3333px Arial;  /* literally browser default */
}
```

Anti-patterns to encode in our system (so they cannot recur):
- Lock link color via `:where(a)` token
- Reset all `<button>` to inherit the Raleway/grotesque stack with explicit padding
- Single `--text-body` color used everywhere
- Consistent vertical rhythm via spacing scale tokens, not pixel-pushed sections

---

## Iconography
- Icons: PNG raster from Wix media library at small sizes (39×39, 54×8). No SVG icon set.
- WhatsApp / YouTube / Instagram / Facebook icons all ship as separate PNGs.

**For our build:** ship a single SVG icon set (Phosphor, Lucide, or custom) at 1.25x viewports with currentColor inheritance.

---

## Motion / interaction
- Wix slideshow on the hero (auto-rotating, 3 slides)
- "Smartarget" promotional popup on first visit (intercept marketing)
- "Chat with AI" floating button (3rd party widget)
- No scroll-tied animation, no Lenis, no parallax, no hover micro-interactions on cards
- Quick View opens an inline modal; no page transition motion

---

## Performance / accessibility flags noticed
- Console threw 1 error + 26+ warnings on homepage load (Wix script noise + 3rd-party widgets)
- "Skip to Main Content" link present (good)
- Decorative images have empty alt — fine
- Low contrast paragraph color (`#532563` body on white = ~6.5:1, OK; but in some sections deep purple sits on near-purple bg)
- No reduced-motion preference honoured by the slideshow

---

## Build-vs-buy summary for our project

| Concern | Curl Spa choice | Our recommended choice |
|---|---|---|
| CMS / builder | Wix | Next.js (App Router) + Sanity |
| E-commerce | Wix Stores | Shopify Hydrogen embed *or* Sanity Commerce + Stripe |
| Booking | Fresha (off-domain) | Booksy / Treatwell embed *or* Cal.com white-label *or* custom Stripe-backed slot picker |
| Type | Playfair + Raleway (Google) | Adobe / commercial editorial serif + grotesque (e.g. GT Sectra Display + Söhne) |
| Image CDN | Wix CDN | Cloudinary or Sanity image pipeline |
| Analytics | None evident | PostHog + Plausible |
| Newsletter | Wix native | Klaviyo / Resend audiences |
