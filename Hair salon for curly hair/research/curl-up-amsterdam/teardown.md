# Curl-Specialist Salon Amsterdam — Site Teardown

> **IMPORTANT TARGET CORRECTION.** The brief named "CURL UP (Amsterdam)" with URLs `curl-up.nl` / `curlup.nl` / `curlup.com`. None of these resolve to a salon: the `.nl` variants don't resolve at all (NXDOMAIN), and `curlup.com` is a parked Afternic domain. There is **no salon called "Curl Up" operating in Amsterdam**.
>
> The closest real peer matching the brief's described profile — *"curl-specialist salon in a comparable European city, with a multi-service ecosystem (cuts + retail + education)"* — is **Curl Spa Salon** (`https://www.curlspa.nl/`). It is:
> - A curl-specialist salon with two NL locations (Amsterdam West + The Hague/Scheveningen)
> - Founded 2018 by Lea Muses ("a family of beauty professionals", American stylist)
> - Has retail webshop, blog, and an education arm ("Curl Academy" at `curl-academy.com`)
> - Reached via 4.8★ Fresha reviews (265 Amsterdam, 767 The Hague)
>
> This teardown analyses Curl Spa Salon as the substitute target. Other plausible peers worth flagging for parallel teardown: **BRUSH** (`brushhm.com` — sharper brand), **Curl Association by Iana**, **The Set** (`theset.nl/thecurlspecialist`), **By Lesley Amsterdam**.

---

## 1. Tech stack

| Layer | Tool | Evidence |
|---|---|---|
| Site builder | **Wix.com Website Builder** | `<meta name="generator" content="Wix.com Website Builder">` |
| Image CDN | `static.wixstatic.com` | All assets served from Wix CDN with AVIF + transformations |
| Booking | **Fresha** (external, off-domain) | "Book Now" links go to `fresha.com/book-now/curl-spa-salon-p1pm70jw` |
| E-commerce | **Wix Stores** (native) | URL pattern `/product-page/<slug>`, "Add to Cart" widget |
| Wholesale | **Faire** | `curlspa.faire.com` linked in footer |
| AI widget | "Smartarget" popup + "Chat with AI" assistant | Wix-marketplace plugins |
| Newsletter | Wix native subscribe form | Inline name + email widget |

**Verdict on stack vs brief's hypothesis.** The brief assumed **Shopify**. It is *not* Shopify — it is Wix Stores. This matters: Wix's commerce UX (Quick View, basic cart, generic product pages) is **markedly weaker** than Shopify, and is a key opening for us to leapfrog them on retail experience.

---

## 2. Visual brand language

### Typography
- **Display / Headings**: **Playfair Display** (serif, 400 weight) — used for H1/H2/H3 at 23–50px, all locations
- **Body / Nav / UI**: **Raleway** (sans-serif, 14px default body)
- **Tertiary fallbacks** in CSS: Avenir LT, Proxima Nova, Helvetica W01 — Wix theme defaults that leak through

The pairing is **conventional Wix** — Playfair + Raleway is one of Wix's three or four most-used out-of-the-box combos. There is **no custom typeface** and no clear typographic hierarchy beyond size.

### Color palette
| Role | Hex | RGB | Notes |
|---|---|---|---|
| Primary text / brand navy | `#0E0A32` | `rgb(14, 10, 50)` | Used on all headings |
| Secondary brand purple | `#1B1464` | `rgb(27, 20, 100)` | "Become a Curl Specialist" headers |
| Deep purple accent | `#532563` | `rgb(83, 37, 99)` | Body paragraph color (low contrast issue) |
| Magenta accent | `#ED1566` | `rgb(237, 21, 102)` | Used sparingly (CTA highlights) |
| Crimson accent | `#DC2244` | `rgb(220, 34, 68)` | Sale tags / badges |
| Slate accent | `#58538B` | `rgb(88, 83, 139)` | Subheads |
| Default link | `#0000EE` | (browser blue) | **Unstyled `<a>` tags** — brand failure |
| Background | `#FFFFFF` | white | |
| Border / muted | `#E8E6E6` | `rgb(232, 230, 230)` | |

**Diagnosis.** Palette is undisciplined: 4 different purples, 2 reds, an unstyled browser-default link blue. No tokenisation. The "purple-magenta-on-cream" intent is *aspirationally* feminine-luxury but is not executed with rigor.

### Spacing & layout
- Wix grid (1200px max content width on desktop)
- Generous vertical padding (~80–120px between sections) but **inconsistent rhythm** between blocks — telltale of "drag and drop" layout
- Hero is asymmetric: image slideshow right, text block left
- Footer is **dense and chaotic** — 3 nav columns, 2 social bars, address block, newsletter, all squashed

### Photography style
- **Lifestyle product flat-lays** (Wix-stock-adjacent): models with curls on neutral backgrounds, product bottles in soft lighting
- **Heavy reliance on Fresha-supplied venue photos** (booking flow shows 6 The Hague + 9 Amsterdam interior images — these are higher quality than the homepage hero)
- No consistent visual treatment — mix of warm interior shots, product hero shots, model portraits with no shared filter or grade
- Aspect ratios drift between 1:1, 4:3, 16:9 with no system

---

## 3. Copy voice — quoted lines

All site copy is **English by default** (no Dutch toggle visible in the main site UI; the `EN` button is decorative — only Fresha exposes a real locale switch). One bit of Dutch leaks through inside Fresha's service description.

| # | Quote | Source | Notes |
|---|---|---|---|
| 1 | "Check out our selection for all Naturally curly hair." | Homepage hero H3 | Awkward capitalization; reads ESL |
| 2 | "Offering the best Sulfate, paraben, mineral oil free products & Spa treatments. Not tested on animals." | Homepage hero | Ingredient-first, ethics-driven — solid positioning, ugly grammar |
| 3 | "We are dedicated to a natural healthy lifestyle." | Homepage paragraph | Generic |
| 4 | "Launched in 2018 by a family of beauty professionals." | About page | Founder-story stub — entire About is 3 sentences |
| 5 | "Our mission is to encourage and educate people towards a more fulfilling and healthier beauty practices and lifestyle." | About page | Grammar ("a more fulfilling and healthier beauty practices") |
| 6 | "BECOME A CURL SPECIALIST" | Footer | Education funnel CTA — links to coming-soon page |
| 7 | "Cut and Go service! Hair is cut curl by curl by our specialists. This 'cut dry' service works amazing on curly hair." | Fresha service description | Strong technique signalling, weak prose |
| 8 | "Be sure to arrive with completely dry and detangled hair, in its natural state. Remove all hair accessories and bring pictures of curls you love." | Fresha — DevaCut service | Best line on the entire site — concrete, prescriptive, client-prep-aware |
| 9 | "Of course you're curious about your new hair! Ask us for advise [sic] before booking your treatment." | Pricing page | Friendly but typo'd |
| 10 | **(Dutch)** "Let op: de genoemde prijs is een vanaf-prijs. De definitieve prijs is onder andere afhankelijk van je persoonlijke wensen en hoor je in de salon." | Fresha — Color service | **Translation:** "Note: the listed price is a starting price. The final price depends on your personal wishes and you'll hear it in the salon." Pragmatic NL pricing convention worth keeping in our localised version |

**Voice diagnosis.** Aspirational-warm but riddled with grammar errors and inconsistent voice (English-as-second-language tells). No clear brand persona. The strongest copy lives inside the Fresha booking flow, not on the brand site itself. **Massive opening for us** to win on copy quality.

---

## 4. Booking flow analysis (CRITICAL — closest peer)

### Architecture
The booking is **fully delegated to Fresha** (multi-tenant SaaS marketplace) — Curl Spa does not own the booking experience. "Book Now" / "Price List" / "Book with a Curl Specialist" all jump off-domain to `fresha.com/...`.

### Step-by-step flow (observed)

**Step 0 — Entry (on `curlspa.nl`)**
- 3 redundant CTAs: top-nav "BOOK WITH A CURL SPECIALIST", header "Book Now" button, in-slideshow "Book a salon treatment" link. All point to Fresha.
- "Price List" page (`/krullenkapper`) is just a placeholder pointing to Fresha — no actual prices are listed on the brand site.

**Step 1 — Choose location (Fresha)** — `Make a booking at Curl Spa Salon`
- Card grid: The Hague venue + Amsterdam venue, each with photo carousel (6 / 9 images), 4.8★ rating, vote count, "Open until X" / "Closed - opens on Saturday" status
- Embedded Google Map with two pins
- "Securely accepts online bookings with Fresha" trust strip
- *Strength:* the venue cards are visually richer than anything on the brand site.

**Step 2 — Choose intent**
- 3 tiles: **Book an appointment** (single), **Group appointment** (multiple people), **Buy Gift Card**
- Sidebar: "Curl Spa Salon Amsterdam, 4.8 (265), Tweede Hugo de Grootstraat 24"
- Group bookings is a thoughtful inclusion (curl-friend duos)

**Step 3 — Choose service**
Service categories (left sidebar tabs):
1. Featured
2. Waxing Menu
3. Hair cut and style
4. Dry Cutting Only
5. Haarverzorging *(Dutch: Hair care)*
6. Twists / Braids
7. Hair Coloring & High Lights
8. Semi-Permanent Makeup
9. Hair treatments
10. Head Spa Massages
11. Deluxe Specials Unisex - Knippen Color & styling
12. Janneke (a stylist's personal menu)

**Featured services pricing:**
- Ladies Curl Cut only — 1h — €65 (cut-dry, comes-curly-defined)
- Women's DevaCut — 1h — from €85 (includes Curl Transformation)
- Men's Cut (Curls) — 30m–1h25m — from €55
- Curly Kids Cut — 30m–1h5m — from €30
- Color — 2h–2h15m — from €95

**Step 4–6** (not walked, but standard Fresha): Stylist pick → Date/time → Customer details + payment → Confirmation email.

### What Fresha does well (worth borrowing)
1. **Prep instructions on the service card itself** ("arrive with completely dry and detangled hair, bring pictures of curls you love") — sets expectations before the chair
2. **Time-range display** ("30m – 1h25m") — handles variability honestly
3. **"From €X" with sidebar caveat** about final pricing being personalised
4. **Group appointment as first-class option**
5. **Gift cards in the booking flow** (not buried in retail)
6. **Per-stylist tabs** (Janneke has her own list)

### What's broken about delegating to Fresha
1. **Brand handoff is jarring** — design system, type, color all change the moment you click "Book"
2. **No analytics ownership** — Curl Spa cannot see funnel drop-off, only Fresha can
3. **No CRM data** — customer relationship lives inside Fresha
4. **Fresha branding bleeds through** ("Fresha" lockup, Fresha-styled venue cards, Fresha checkout)
5. **Service categories are unsorted/duplicative** — "Hair cut and style" + "Dry Cutting Only" + "Deluxe Specials Unisex - Knippen Color & styling" overlap
6. **One Dutch service title in an otherwise English booking flow** ("Haarverzorging") — language inconsistency
7. **No clear curl-type guidance** before service selection — a 2A and a 4C client see the same menu

---

## 5. Retail integration analysis

### Page architecture
```
curlspa.nl/
├── /              (home — hero pushes shop AND booking equally)
├── /krullenkapper (Price List → bounces to Fresha)
├── /shop          (webshop overview — Wix Stores collection grid)
│   └── /product-page/<slug>  (PDP)
├── /blog          (Wix Blog — content marketing)
├── /about         (3-sentence story)
├── /faq           (placeholder — empty)
└── /contact       (form + addresses)
External: fresha.com (booking)  |  curl-academy.com (education, coming soon)
         curlspa.faire.com (B2B wholesale)
```

### Webshop UX
- **Filters**: Collection (All / Curly / Eden Body Works / Body), Price, Color, Rose Oil [sic — a value, not a facet], Size
- **Sort**: standard
- **Product cards**: Image + name + price + "Quick View" + badges ("Best Seller", "New*", "Out of stock")
- **PDP**: image carousel, name, price, quantity, Add to Cart, descriptive paragraph, breadcrumb (`Home / Webshop / Product`). No reviews. No related products. No usage instructions structured. No curl-type tagging.

### Inventory (sample of ~18 products)
Mix of:
- Third-party brands: **Eden Body Works** (heavy presence), OWAY, Bounce Curl
- **Curl Spa house brand**: Aloe Vera Gel €18, Mousse €18, Mask €25, Towel €31.85
- Adjacent merch: iPhone case €17.50, Shampoo Brush Massager €12.50, Wide Tooth Curl Comb €7

### Salon-retail integration moves they make
1. House brand on shelf alongside imports — reinforces salon authority
2. "Best Seller" badges leverage social proof
3. Wholesale link in footer (Faire) — separate B2B channel
4. Newsletter form in footer collects across funnel
5. Shop CTA on homepage hero ("View our favorite products for curls, kinks and waves. Shop Now")

### Salon-retail integration moves they **miss**
1. No stylist-recommended bundles ("After your DevaCut, use these 3")
2. No post-appointment email cross-sell tied to the service booked
3. No "shop the look" on blog posts or Instagram embeds
4. No subscription / replenishment for the consumables (shampoo etc.)
5. No in-store-pickup option
6. No quiz ("which products for your curl type?") despite curl typing being central to the brand

---

## 6. Section-by-section homepage build plan

| # | Section | Curl Spa current implementation | Effort to beat | Notes |
|---|---|---|---|---|
| 1 | **Sticky top nav** | 8 items + cart + login + EN toggle, all crammed | Easy | Trim to 5: Services / Stylists / Shop / About / Book |
| 2 | **Hero** | Asymmetric: H3 left, image slideshow right, "We are dedicated…" paragraph | Medium | Use one strong photograph, one declarative line, two CTAs (Book / Shop) |
| 3 | **Brand promise / ingredients** | "Sulfate, paraben, mineral oil free… Not tested on animals." inline in hero | Easy | Pull into a 3-icon strip: technique, ingredients, ethics |
| 4 | **Slideshow** | 3 slides (#02, #01, #03) with Fresha booking link | Skip | Replace with editorial gallery |
| 5 | **Shop teaser** | Single CTA "View our favorite products" with one image | Easy | Carousel of 6 best-sellers with prices and quick-add |
| 6 | **Education hook** | Footer-only: "BECOME A CURL SPECIALIST" → coming-soon page | Easy | Promote to a homepage strip; capture email for waitlist |
| 7 | **Locations** | Address text in footer + Fresha map in booking | Easy | Two-card layout with photo, hours, "Book here" |
| 8 | **Footer** | Dense: nav + 5 utility links + WhatsApp + 2 social bars + newsletter + address + Curl Academy CTA + Patent line | Easy | Restructure into 4 columns with proper hierarchy |

---

## 7. What we should steal (5–8 moves)

1. **Multi-service ecosystem framing in nav.** Their "Services / Webshop / Blog / About / FAQ / Contact / Book" demonstrates a salon can wear retailer + publisher + bookable hats simultaneously without confusion. Adopt the same architecture; just execute it with discipline.
2. **Service prep instructions on the booking card** (e.g. "arrive with completely dry and detangled hair, bring pictures of curls you love"). This is the strongest UX move on the entire property — it pre-qualifies clients and reduces chair time. Put this on every service.
3. **Time-range honesty in service duration** ("30 mins – 1h 25 mins"). Curl work is variable; ranges set expectation. Steal this exactly.
4. **"From €X" + visible disclaimer** that final pricing is personalised after consultation. This is European salon convention and worth respecting.
5. **House brand on the shelf alongside imports.** Sells authority, captures higher margin, and lets the salon narrate ingredient choices.
6. **Education arm as second domain** (Curl Academy on `curl-academy.com`). Separating the B2B/student funnel from the consumer salon site keeps each focused. We can do the same when our education product is ready.
7. **Group appointment option** in the booking flow — a real curl-community insight (friends, mother-daughter, partners) that feels human.
8. **Wholesale via Faire** as a B2B revenue line — low effort, separate channel, indexable for press / stockists.

---

## 8. What we should avoid (anti-patterns)

1. **Don't delegate booking to Fresha as the brand experience.** The handoff destroys design control, breaks the customer journey, and silos the data. Use a booking SaaS that supports embedded white-label flows (Booksy embed, Shore, Treatwell embed) or roll a thin Cal.com/SimplyBook layer with our own type system.
2. **Don't ship on Wix.** It will define the ceiling of the design forever — generic Playfair+Raleway, unstyled link blue, drag-and-drop spacing rhythm, dense footer. Build on Next.js + Sanity (or similar) so we own typography, spacing tokens, motion, and CWV.
3. **Don't let copy ship with grammar errors.** "Ask us for advise", "a more fulfilling and healthier beauty practices", "Patent 2026" instead of "©" — these tell visitors the brand isn't fluent. Hire one editor for one day; this is solved.
4. **Don't fragment the palette.** Curl Spa runs four purples (`#0E0A32`, `#1B1464`, `#532563`, `#58538B`), two reds (`#ED1566`, `#DC2244`), and unstyled browser blue. Ship a 7-token palette and police it.
5. **Don't bury the founder.** Their "About" is three sentences and no founder photo. For a single-named salon (Vanessa Jackson) on a heritage street in Grünerløkka, the founder *is* the brand — she should be on the homepage, not 3 clicks deep.

---

## 9. How do we beat them on design quality? (concrete)

1. **Custom type, not Wix presets.** Pair an editorial serif with character (e.g. *GT Sectra*, *Ogg*, *Editorial New*) with a clean grotesque (*Söhne*, *Inter*, *Neue Haas Grotesk*). Avoid Playfair entirely — it screams "Wix template".
2. **Disciplined palette tokens.** Ship 1 brand primary, 1 ink, 1 paper, 1 accent, 2 neutrals — written into Tailwind/CSS tokens and locked. Sketch out a curl-friendly warm cream + deep burgundy / rust direction (NL competitor leans cool purple — go warm + earthy to differentiate).
3. **Photography system, not a photo grab-bag.** Commission one 1-day shoot: founder portrait, 4 model portraits across curl types 2B–4C, 6 interior shots, 6 product shots. Single warm grade applied across all. Single aspect ratio system (1:1 product, 4:5 portrait, 3:2 interior).
4. **Type-led hero, image second.** Curl Spa's hero is a fragmented H3+H3+P+slideshow mash-up. Ours: one declarative sentence at large size, one hero image, two CTAs. White space as luxury signal.
5. **Motion budget.** One scroll-tied marquee of curl-type photography. One subtle hover-lift on cards. Lenis-smooth scrolling. No carousel auto-rotation; no popup; no "Chat with AI" floating widget. Restraint reads premium.
6. **Owned, embedded booking.** Even a basic in-page booking widget that shares our typography and color is more premium than Fresha's redirect. Even better: a 3-step custom flow (curl-type quiz → service match → time slot) that ends in a Calendly-style confirm.
7. **Editorial blog, not Wix Blog.** Properly designed long-form (large body type, generous line-height, pull quotes, captioned imagery, end-of-article shop module). Curl Spa's blog uses default Wix blog cards.
8. **PDPs that respect the product.** Hero image at high res, ingredient list expandable, "best for curl types 3A–3C" tag, "stylists who recommend this" pull, related-service CTA ("Pair with our DevaCut"). Wix Stores PDP is utilitarian — that's the bar.
9. **Founder-led About page.** Long-form interview with Vanessa, 4–6 portraits, the heritage of the building, philosophy on curl care. Not 3 generic sentences.
10. **Real i18n.** NO/EN proper locale toggle (Norwegian primary in Oslo, English secondary), hreflang tags, translated booking flow. Curl Spa fakes the EN button — we ship the real thing.

---

## 10. Summary table — Curl Spa vs. our opportunity

| Dimension | Curl Spa Salon | Our target bar |
|---|---|---|
| Stack | Wix + Wix Stores + Fresha | Next.js + Sanity + embedded booking |
| Type | Playfair + Raleway (default Wix) | Custom editorial serif + grotesque |
| Palette | 4 purples + 2 reds + browser blue | 6-token disciplined system |
| Booking | Off-domain Fresha redirect | Owned, embedded, branded |
| Photography | Mixed sources, no grade | Commissioned, single grade, single ratio system |
| Copy | ESL grammar errors, generic voice | Edited, opinionated, founder-led |
| About | 3 sentences | Founder-led long-form |
| Retail | Wix Stores generic PDP | Editorial PDP with curl-type tagging + service pairing |
| Education | Coming-soon page on subdomain | Soft-launch waitlist with content |
| Locations | Two NL salons | One Grünerløkka flagship — easier to film, photograph, narrate |
