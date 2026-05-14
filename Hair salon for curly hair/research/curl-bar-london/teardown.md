# Curl Bar London — Site Teardown

**URL:** https://www.thecurlbarlondon.com (the marketing redirect `curlbarlondon.com` is unregistered; the live site is `thecurlbarlondon.com`)
**Founder/Face:** Michelle Sultan (curl-specialist; styling team: Andrina, Mia, Nia, Niah)
**Why we're studying it:** Single-mission curl-only salon in a major European city. The closest playbook match for what we want to build in Grünerløkka.

---

## 1. Tech stack

| Layer | What they use | Evidence |
|---|---|---|
| CMS / hosting | **Squarespace 7.1** (default template family) | `<!-- This is Squarespace. --><!-- thecurlbarlondon -->` HTML comment; `Static.SQUARESPACE_CONTEXT` JSON object in head; `images.squarespace-cdn.com` + `static1.squarespace.com` asset hosts; canonical points to `ext-sq.squarespace.com` (DNS CNAME). |
| Page builder | Squarespace **Fluid Engine** (the post-2022 flex layout system) | `.fluid-engine` selectors throughout `site.css`; `data-block-type` block model. |
| Booking | **Acuity Scheduling** (now Squarespace Scheduling), embedded inline on `/book-appointment-1` | `acuity-url="https://thecurlbarlondon2.as.me"` on a Squarespace acuity block; `embed.acuityscheduling.com/js/embed.js`; the booking flow in screenshots 06/09/10 (white card on pink, "Select Appointment" / "Select Calendar" labels) is the standard Acuity inline embed. |
| Fonts | **Adobe Fonts (Typekit)** — single family: `pragmatica-extended`, weight 700, italic + roman | `use.typekit.net/ik/...js` in head; the Typekit kit JSON declares one family: `{"family":"pragmatica-extended","weight":"700","style":"normal"\|"italic"}`. Body falls back to Helvetica Neue. |
| Animations | Squarespace built-in section transitions only — no GSAP, Framer Motion, or Lenis. | No third-party animation libraries in the script tags; only Squarespace's own `scrolling` and `marquee` block CSS. The "Celebrating you through your curls 〰️" wave-line is a Squarespace **Marquee Block**. |
| Analytics / tags | Facebook (`facebookAppId: 314192535267336`), default Squarespace analytics | In `SQUARESPACE_CONTEXT`. |
| Forms | Squarespace native form blocks |  |
| eCommerce | None enabled | No product blocks, no cart. |

**One-line summary:** out-of-the-box Squarespace 7.1 + Fluid Engine + Acuity. The template is doing all the heavy lifting; the brand is doing the differentiation.

---

## 2. Visual brand language

### Typography
**Single typeface across the entire site: Pragmatica Extended (Adobe Fonts), 700 weight.**

| Role | Family | Weight | Style | Notes |
|---|---|---|---|---|
| Site title ("THE CURL BAR LONDON") | pragmatica-extended | 700 | uppercase | Letter-spacing ~0.01em |
| H1 / H2 / H3 | pragmatica-extended | 700 | uppercase | Massive scale on hero ("FOR CURLS, COILS AND WAVES.") and on inner pages ("OUR SERVICES", "FIND YOUR AVAILABLE SLOT") |
| Nav, meta labels, buttons | pragmatica-extended | 700 | uppercase, ~0.01em tracking, line-height 1em | |
| Body / paragraph | "Helvetica Neue", Arial, sans-serif | 400 | sentence case, line-height 1.6em | The default Squarespace body fallback — they never replaced it. |
| Pink italic accent | pragmatica-extended | 700 | **italic**, pink | Used for "TCBL Team" sign-off on the booking page (screenshot 06). The only italic usage in the site. |

The italic + pink combo as a signature flourish is the most distinctive type move. Everything else is a wall of black uppercase extended sans.

### Color palette
Extracted from CSS custom properties (`hsla(--lightAccent-hsl)` etc.):

| Token | Hex | HSL | Where it shows up |
|---|---|---|---|
| Hot pink (primary accent) | **#EB88BB** | hsl(329, 72%, 73%) | Booking page background (screenshots 05/06/09/10), section blocks on homepage, mobile hero secondary panel (07), italic "TCBL Team" sign-off |
| Soft blush (secondary accent) | **#F7BED2** | hsl(339, 80%, 86%) | Lighter pink panels behind the cork-board polaroid section (screenshot 02) |
| Pure white | **#FFFFFF** | hsl(0, 0%, 100%) | Page background; nav bar; body type backdrop |
| Near-black | **#030303** | hsl(0, 0%, 1.2%) | Headings, body text, the "Book Now" pill button background |
| Off-white / cream | (photography backdrop) | — | Studio photography wall in the hero — warm cream, not pure white |

**No grays, no neutrals beyond that.** The brand runs on a stark black-on-white + hot-pink-on-white system. That severity is the look.

### Spacing rhythm
- Squarespace Fluid Engine 24-column grid, default gutters
- Section padding is generous: hero takes ~85vh, each homepage section is its own full-bleed panel
- Block-level rhythm is tight inside cards (polaroid grid, team grid) and loose between sections
- Buttons are pill-shaped with full radius (e.g. "Book Now" capsule top-right) — short height, generous horizontal padding
- No CSS custom properties for spacing scale (Squarespace handles it via the editor, not tokens)

---

## 3. Photography style

From screenshots 01, 02, 04, 08:

- **Subjects:** Real clients and stylists, predominantly Black women with type 3–4 curl/coil patterns. One hijab-wearing client mentioned in copy. Diverse curl typology is the entire content strategy of the imagery.
- **Hero shot (01):** Two women back-to-back, only their hair visible — one auburn looser curl, one near-black tight coil. Plain neutral wall background. The hair *is* the subject; faces are not shown. This is the strongest single image on the site and it works because it instantly tells you the niche without a single word of copy.
- **Lighting:** Soft, directional, warm. Natural-light feel, no studio strobes. The wall is cream/oat, not paper-white — gives it warmth.
- **Framing:** A mix of (a) close-up curl studies (just hair + shoulder), (b) full-body editorial portraits (the cropped torso shot in screenshot 03 — model in black bralette + jeans, getting hair done), (c) candid mid-shots of stylists at work, (d) before/after results.
- **The polaroid grid (screenshot 02):** A 4×3+ grid of polaroid-style instant photos pinned to a cork board — feels like a salon "wall of clients", deeply personal. Uses real instax-style borders, not a CSS effect.
- **Mood:** Warm, intimate, celebratory. Zero corporate stock-photo energy. Closer to a friend's portfolio site than a salon brochure.
- **Team portraits (04):** Each stylist gets a 4:5 portrait against a complementary colored backdrop (green, deep red, pink, soft blue) — different per stylist, used as a personality cue. Framed tightly, eye contact, slight smile.

---

## 4. Copy voice — actual lines from the site

1. **"FOR CURLS, COILS AND WAVES."** *(homepage hero H1, screenshot 01)*
   The whole positioning in five words. No verb, no fluff. Names the three textures the salon serves and excludes everything else (straight hair) by omission. This is the sharpest copy on the site.

2. **"A safe space for clients to feel empowered and embraced."** *(hero subhead)*
   "Safe space" is the deliberate emotional move — it speaks directly to clients who've been turned away or had bad experiences at non-specialist salons. "Embraced" is the second hit.

3. **"Celebrating you through your curls 〰️"** *(scrolling marquee section)*
   Repurposes "curls" as a relational object — you're not getting a haircut, you're being celebrated. The squiggle emoji in the actual marquee is part of the brand voice.

4. **"YOUR HAIR IS WAITING!"** *(footer CTA, screenshot 08)*
   Inverts the usual "we're waiting for you" — gives the hair its own agency. Playful, ownable, sits over a 4-image mini-gallery.

5. **"For all of our beautiful Queens who wear a hijab, we have a private room…"** *(booking page policies, screenshot 06)*
   "Queens" is the aspirational customer noun used throughout. Concrete service detail (private room) baked into the brand voice instead of buried in FAQs.

6. **"MEET THE CURL BAR GIRLS"** *(team page H1, screenshot 04)*
   The team brand-name is "Curl Bar Girls" — collective identity, plural, sisterly. Not "stylists" or "team".

7. **"I believe that a woman's hair is her crown and she should wear it proudly."** *(Andrina's bio)*
   Stylist quotes are first-person and emotional, not credential lists. No mention of years of training as a checklist; instead a manifesto sentence per stylist.

8. **"Learning to love my curls led me to love myself. This salon is an extension of me and my love for natural hair."** *(Nia's bio)*
   The salon-as-extension-of-the-founder framing. Personal mission, not business positioning.

9. **"CONSULTATION/ UNSURE WHAT TO BOOK? — If you are unsure of what to book, please send us photos of your hair to our email or Instagram DM and we will advise you there."** *(booking pre-flow)*
   Concierge tone in front of the booking widget. They've turned a friction point (which service do I pick?) into an Instagram-DM moment. This is excellent.

10. **"Wash and detangle your hair one to two days before your appointment. You can apply product if this makes you feel more comfortable but we'd prefer it was minimal."** *(pre-appointment instructions)*
    Specific, instructional, slightly bossy in a friend-giving-advice way. Manages expectations before clients arrive — reduces no-shows and bad starts.

**Voice summary:** First-person plural ("we"), warm but direct, uses "Queens" / "girls" deliberately, emoji-friendly, manifesto-leaning. Avoids any salon-industry jargon (no "transformation experience" or "luxury hair journey"). The copy is doing more work than the design.

---

## 5. Booking flow analysis (screenshots 05–06, 09–10)

The whole booking system is an Acuity Scheduling iframe-equivalent embedded inline on a Squarespace page. The flow:

**Step 0 — `/book` landing (screenshot 05)**
- Black-on-white nav, big black H1 **"FIND YOUR AVAILABLE SLOT"** — strong, action-oriented, no ambiguity
- Below: a single hot-pink panel with the location name **"MYDDLETON ROAD"** in black uppercase — they've structured this for future expansion (multiple locations) but currently only one exists, so this acts as a giant "click to book" hit-target
- Footer-style address block beneath: address, phone, opening hours, parking info
- The pink panel is unusually large — almost a full viewport tall. It serves as both a brand statement and a single huge tap target.

**Step 1 — pre-flow policies wall (screenshot 06)**
- Once you click into the location, the **entire viewport background turns hot pink (#EB88BB)** — strong context shift, "you are now in the booking flow"
- A white card centered on the pink contains a **letter-style policies brief**:
  - Greeting "HELLO,"
  - "Please have a read through the variety of treatments…"
  - "HOW TO ARRIVE:" instructions (wash 1–2 days before, no manipulation)
  - Sections: CONSULTATION / UNSURE WHAT TO BOOK, HIJAB / PRIVACY ROOM, APPOINTMENT SLOTS (released 1st of every month at 8pm)
  - Sign-off: "Best, **TCBL Team**" — the team name in pink italic, the only italic on the site
- Below the letter, a "[Select Appointment Category]" link that reveals the Acuity widget

**Step 2 — service selection (screenshot 09)**
- Acuity's standard service list, restyled (slightly) by Squarespace's acuity-block CSS
- Categories: **Cuts**, with services like *The Curl By Curl Cut With a Wash n' Style — 1 hour 20 minutes @ £110.00*, *The Curl Bar Cut - Curly Curls — 1 hour 20 minutes @ £80.00*, *The Curl Bar Cut - Wavy Curls — £80.00*
- Each service card has a 2–3 line description, "SHOW ALL" expander, and a black **SELECT** pill button on the right
- Service names are deliberate: "Curly Curls" vs "Wavy Curls" vs "Curl By Curl Cut" — they're educating type-language at the point of selection

**Step 3 — calendar / stylist selection (screenshot 10)**
- "Select Calendar" view — top section confirms the chosen service in a card with an X to close
- "WITH" section: choice of **Any Available** stylist, then individual stylists by name and address ("Nia — 79 Myddleton Road, N22 8NE")
- Each option has a black SELECT pill

**Friction observations:**
- The pink-letter policies wall (screenshot 06) is an *enormous* amount of text before users can book. It's clearly intentional — they want to filter out clients who'll show up with the wrong hair-prep — but it's a real barrier on mobile.
- Slots are only released on the 1st of each month at 8pm. This is a deliberate scarcity / batch-release model, communicated explicitly. It works for them because they're capacity-constrained and Instagram-driven.
- "Book Now" button is duplicated: top-right pill in nav, bottom-page CTA, footer CTA. Three reliable entry points.
- The whole booking experience commits hard to brand: even though Acuity's inline embed is generic, the **pink full-viewport background** and the **policies-letter framing** make it feel like part of the salon, not a third-party widget.

---

## 6. Section-by-section homepage build plan

This is how to recreate the homepage rhythm in our brand. Reference: screenshot 02 (full-page mobile + desktop view).

| # | Section | Content | Visual treatment | Notes for our build |
|---|---|---|---|---|
| 1 | **Sticky nav bar** | Left: Services / Team / Health and safety / Book / Policies / FAQs (text links, underlined-on-hover). Center: "THE CURL BAR LONDON" wordmark. Right: black "Book Now" pill button. | White bg, black type, single line on desktop, two lines on mobile. ~60px tall. | We replicate the structure: left links, centered wordmark, right CTA pill. Replace label with our brand. |
| 2 | **Hero** | Full-bleed photo of two women back-to-back (only hair visible). Centered overlay H1 "FOR CURLS, COILS AND WAVES." in massive uppercase Pragmatica-Extended 700, white. Subhead one line below: "A safe space for clients to feel empowered and embraced." | ~85vh image; type centered both axes; slight dark overlay on image to keep type legible. | Our hero must lead with **the hair** as subject (not the salon, not a stylist). Use 1–2 real clients shot back-to-back or close-up. Tagline must name what we serve: e.g. "FOR CURLS, COILS, KRØLLER" — owning the Norwegian-language curl word would be a unique move. |
| 3 | **Manifesto block (pink panel)** | Hot-pink full-bleed section, centered short copy: "We want every client to walk out feeling confident and beautiful with their natural hair." | Pink #EB88BB bg, black uppercase type, photo of salon storefront on the right. | Single statement of intent. Anchor the brand mission in one sentence. |
| 4 | **"OUR SERVICES" header + 3 category tiles** | H2 "OUR SERVICES" centered. Three category cards: "Curly Cuts / Curl Styling and Education / Curl Steams and Treatments" with "Explore →" link out. | White bg; service names in uppercase Pragmatica; minimal description. | We do the same with our service taxonomy. Use category-level cards on home, push detail to /services. |
| 5 | **Marquee strip** | Horizontal scrolling text "Celebrating you through your curls 〰️ Celebrating you through your curls 〰️…" repeating | Squarespace Marquee Block; black text on white, full-width, infinite scroll | A simple CSS marquee or [a tiny library]. Pick our own one-line mantra and repeat it. |
| 6 | **Polaroid wall** | Cork-board background with ~10–15 polaroid-style real client photos pinned in slight rotations | Photo asset, not CSS-generated polaroids. Manually composed. | Style it deliberately — composed once, shot once, replaced quarterly. The hand-crafted feel is the point. |
| 7 | **Team grid** | 4 stylist portraits in a 4-up grid, each with name + 1-line role | Each stylist on different colored backdrop; clickable to /team | We mimic this layout but match our stylist count. Different bg color per portrait gives personality without bespoke design. |
| 8 | **Before/after / portfolio strip** | A second image grid (3–4 wide) showing real client results | Tightly packed grid, no spacing, edge-to-edge | This is the social-proof block. Replace stock with real client work from day 1. |
| 9 | **Final CTA** | Big H2 "YOUR HAIR IS WAITING!" with a single "Book Now →" pill underneath | White bg, oversized type, centered, generous vertical padding | Replicate the playful inversion. Norwegian: "HÅRET DITT VENTER!" works directly. |
| 10 | **Footer** | 3-column: branch info + hours + address + email / Site map / Follow us (Instagram only) | Black bg, white type, small | Curl Bar London only links Instagram in social — single channel commitment. We should consider the same. |

---

## 7. What we should steal (specific moves)

1. **Single-typeface brand system in an extended-grotesk weight 700.** Pragmatica Extended is doing 100% of the typographic work. Pick one strong extended/wide sans and commit — it gives us the same brand cohesion with zero cost. (Norwegian options: GT Walsheim Wide, Söhne Breit, or open-source: Space Grotesk or Wide Display from Google Fonts.)

2. **Hot-pink-as-context-shift.** White brand on white pages, but the *booking flow* turns the entire viewport hot pink. It's a brand-safe way to say "you've crossed a threshold". We should pick one off-brand color and reserve it for one specific moment (booking, or post-booking confirmation, or the gift-card flow).

3. **Hair-as-subject hero.** No founder face, no salon interior, no stylist mid-cut. Just two clients photographed back-to-back showing only the hair. It tells the entire story in 0.5 seconds. We commission one signature back-to-back photo for our hero.

4. **Pre-booking policies letter.** A warm, first-person letter ("HELLO,") explaining how to prep for an appointment, how slots are released, what to do if unsure. This converts "FAQ" content into brand voice and reduces support load. We write our equivalent in Norwegian + English before launch.

5. **Stylist quotes as bios, not CVs.** First-person manifesto sentences ("I believe a woman's hair is her crown") instead of years-of-experience lists. Makes the team feel human, not corporate. We interview each stylist for one quote-sentence and one specialty bullet — that's the bio.

6. **Service naming that teaches.** "Curl Bar Cut — Curly Curls" vs "— Wavy Curls" vs "Curl By Curl Cut". The names themselves educate clients about curl typology and nudge them to the right booking. We do the same in Norwegian: name services around the curl pattern they serve, not the technique we use.

7. **Scarcity-by-batch slot release.** "Slots released on the 1st of every month at 8pm." Communicated explicitly, drives Instagram engagement, fills the calendar in one batch. This is a marketing channel, not just a calendar policy. We should consider a similar cadence, posted to our IG.

8. **Plural-collective team identity.** "Curl Bar Girls / TCBL Team" — the team has a brand name. It signals a tribe to clients and a culture to future hires. We name our collective.

---

## 8. What we should avoid (anti-patterns)

1. **Squarespace as the foundation.** It's fine for Curl Bar London at their scale, but it locks them out of bespoke booking flows, multilingual handling (NO/EN), and any custom interactions (e.g. curl-type quiz). We're better off on **Next.js + Sanity (or Payload) + a real booking integration** (Fresha, Booksy, or a direct Acuity API). The site's lack of Norwegian-quality animation/motion is a Squarespace limitation, not a design choice.

2. **No motion design at all.** The site is static. In 2026, a salon site that doesn't move feels last-decade — especially next to Norwegian competitors using Framer or custom Next.js. We don't need to be flashy, but a Lenis-smooth scroll, a cursor-follow on the hero, and section reveals would put us a tier above this.

3. **The pre-booking letter is too long on mobile.** Screenshot 06 shows ~600 words of policy before the user can even see the calendar. That's friction. We capture the same info but progressively disclose: a short letter on the booking page, with details revealed inline as users hit each step.

4. **Helvetica Neue as body fallback.** They never replaced the Squarespace default. Body type looks like a 2014 Squarespace template. We pair our heading face with a real body face (e.g. Inter, or a Norwegian-lovely choice like SuisseWorks or ABC Diatype Mono for accents).

5. **Single-channel social presence (Instagram only) with no on-site portfolio depth.** They link only to Instagram. That's fragile (algorithm risk) and doesn't help SEO. We host our own portfolio gallery on-site with proper alt text and per-client case-study pages — both for SEO and for clients who don't use IG.
