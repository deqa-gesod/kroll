# UI/UX-analyse: website1 vs website2

## Sammendrag i tre setninger

Website1 er en disiplinert editorial-prototype med Fraunces-overskrifter, en cream-palett (#faf7f2) og en rolig komposisjon som veksler mellom store typografiske flater og fotografi. Website2 går tyngre på serif-skalaen (overskrifter dekker ofte 5-6 linjer vertikalt), bruker en varmere paper-palett (#f7f0e6) med en støy-overlay på 16% opacity, og har en mer ambisiøs booking-flow med returning-client-sidebar. Website1 vinner totalt på visuell finess, hierarki og bredde i innhold, mens website2 vinner på booking-arkitektur og navigasjons-mikrointeraksjoner.

## Sammenlignings-matrise

| Aspekt | website1 | website2 | Vinner |
| --- | --- | --- | --- |
| Hero | 2-spalts, headline 96-112px Fraunces variable opsz 144, terracotta accent på linje 3 ("One place." #b5532a), bilde-karusell med 3 frames + dot-pagination. Pent. | 1-spalts headline strekker seg over 5 linjer ("Oslo's first salon built around the curl spectrum.") pga snever bredde-cap, dobbelt-bilde-stable nede til høyre. Tyngre, mer "brutalist". | website1 |
| Typografi | Fraunces (display, opsz 144, SOFT 30, tracking -0.025em) + Inter Tight (sans, ss01/ss02). Tre-vekts hierarki konsekvent: eyebrow mono 11px / body 17px / headline 96-112px. Italic terracotta brukt sparsomt for emfase. | Serif display + sans body, men headline-vektingen er konstant tung på alle hero-er. Mono brukes på eyebrow (.eyebrow, 11.5px, letter-spacing .18em). Mindre nyansert vekting. | website1 |
| Fargebruk | cream #faf7f2 / cream-deep #f3eee5 / ink #1a1612 / terracotta #b5532a / bookgreen #1f4d3f. Bruker green kun på booking-progress, terracotta som accent. | paper #f7f0e6 / paper-deep #efe2d1 / ink #1a130f / clay #a84d2a / sea #0d4b43. Body har radial-gradient i clay 12% + en støy-overlay (multiply, 16%) over hele siden. | likt, ulike strategier |
| Bilder | 9 hero/portfolio-bilder, 4 team-portretter, 4 retail-bilder, journal-bilder. Stort foto-bibliotek. | 10 bilder totalt. Mye gjenbruk: én Vanessa-arbeider-foto, ett dry-cut-foto, én interior. Tre stylist-portretter. | website1 |
| Navigasjon | 8 nav-lenker (Cuts & services, The method, The team, Portfolio, Shop, Journal, Visit, About) + EN/NO + Book CTA. Skip-link "Skip to main content". | 8 nav-lenker (kortere labels: Cuts, Team, Portfolio, Method, Shop, Journal, Visit, About). Skip-link "Skip to content". Underline-hover med scaleX transform fra høyre til venstre. | website2 (mikrointeraksjon) |
| Bookingflyt | 5 steg: Service / Stylist / Date & time / About you / Confirm. Pen disabled-state på fremtidige steg. Step 1 har "Featured"/"Everything else"-gruppering. Persisterer state ("Resuming where you left off"). | 5 steg: Service / Stylist / Time / Curl intake / Confirm. "Returning"-sidebar med "Daniel, book the same again". Live summary i venstre sidebar. CORE-tag på featured services. Tydelig Back/Next-knapper. | website2 |
| Mobil | 375x812: hero-bilde først, headline andre. Hamburger åpner full-screen menu med store serif-lenker. Booking persisterer state. | 375x812: headline-wrap blir ekstrem (5 linjer for "Oslo's first salon built around the curl spectrum"). Hamburger gir clean fullscreen menu med hairline-dividere og NORSK + Book now som dual CTA i bunn. | website1 (hero), website2 (meny) |
| Tilgjengelighet | 1 H1 per side, logisk H2/H3-nedstigning. Knappetekster meningsfulle ("Book a chair", "First time? Free 15-minute consultation"). Alt-tekst på alle bilder. Skip-link på topp. Lighthouse a11y 91. | 1 H1 per side, logisk H2/H3. Aria-current="page" på aktiv nav-lenke. Outline-color sea #0d4b43 for fokus. Skip-link på topp. Lighthouse mobil 89. | likt |
| Mikrointeraksjoner | Lenis smooth-scroll, hero-image dot-pagination, ScrollReveal-komponent. Booking-progress med tre fylte segmenter på step 3. Liten kjennetegns-prikk + nummer på "Next available". | Marquee-strip ("Spectrum is the operating word...") som horisontal bevegelse. .btn:hover translateY(-1px). Nav-link underline scaleX-animasjon. Body radial-gradient + støy som gir taktil følelse. | website2 |

## Konkrete forbedringer, website1

1. **Problem**: Hero på desktop ble fanget med tom plass mellom hero og portfolio-seksjonen i full-page-screenshot (lazy-loaded bilder rendres ikke før de er i viewport).
   **Fil**: `website1/components/homepage/PortfolioTeaser.tsx`, `RetailTeaser.tsx`, `MethodBlock.tsx`.
   **Fiks**: Legg `priority` på første bilde i hver lazy-section, eller bytt `loading="lazy"` til `eager` for above-the-second-fold-bilder. Den faktiske brukeropplevelsen er fin (vi scroller), men case-study-screenshots blir uhensiktsmessige om de viser tomme felter.
   **Prioritet**: høy (case-study-vinkel).

2. **Problem**: LCP-warning på hero `/images/hero-alt-1.jpg`. Next anbefaler `loading="eager"` eller `priority` for above-the-fold.
   **Fil**: `website1/components/homepage/Hero.tsx`.
   **Fiks**: Legg `priority` på `<Image>` for `hero-primary.jpg`. Også preload hero-alt-1 og hero-alt-2 om karusellen rullerer automatisk.
   **Prioritet**: middels.

3. **Problem**: Bookingstep 2 (Stylist) viser bokstavavatarer (V, N, A, M, I) i sirkler i stedet for stylist-foto. Filer `team-ade.jpg`, `team-ines.jpg`, `team-mira.jpg`, `team-nia.jpg` finnes i `public/images/`.
   **Fil**: `website1/components/booking/...` (BookingShell.tsx eller stylist-velgeren).
   **Fiks**: Bytt initial-bokstav i sirkel til `<Image>` med team-foto. Beholder rounded-full og 64px diameter.
   **Prioritet**: høy (visuell uplift uten tekstendring).

4. **Problem**: Headline "Two minutes from here to chair." på booking er pen, men forsvinner på step 3+ (scrolles bort) selv om vi fortsatt er i samme flow. Heading lyder også litt cute for hovedtittel på et utility-skjema.
   **Fil**: `website1/app/booking/page.tsx`.
   **Fiks**: Behold headline kompakt øverst (44px i stedet for 96px) og pin progress-bar til toppen som sticky element.
   **Prioritet**: lav.

5. **Problem**: Hero-seksjonen viser "Next available: Thursday 16:30" som en flat tekst med liten prikk. Dette er en av sidens viktigste CTA-er, fortjener egen visuell vekt.
   **Fil**: `website1/components/homepage/Hero.tsx`.
   **Fiks**: Pakk inn i en pill-form bg-cream-deep, padding 12px 16px, monospace, med Tabular-tall, og legg til en grønn 8px-dot. Bruk allerede definerte `--color-bookgreen` (#1f4d3f).
   **Prioritet**: middels.

6. **Problem**: Floating "N"-knapp nede til venstre (Next.js dev tools) er synlig på alle screenshots og kommer til å vises i case-study.
   **Fil**: Next.js dev-toolbar, ikke en kodefil.
   **Fiks**: Sett `NEXT_PUBLIC_DISABLE_DEVTOOLS=1` eller bygg prod (`npm run build && npm run start`) før screenshots tas.
   **Prioritet**: høy (case-study-direkte).

7. **Problem**: Footer bruker tre kolonner (Visit/Hours/Contact/Pages) der "Pages" har 9 lenker stablet vertikalt, mens "Hours" har egen tabell. Vertikalt rytme bryter, "Pages"-spalten blir lang og dominerer.
   **Fil**: `website1/components/chrome/Footer.tsx`.
   **Fiks**: Del "Pages" i to spalter (Services-relatert venstre, About-relatert høyre), eller flytt til 2-rad nederst over copyright-linjen.
   **Prioritet**: lav.

8. **Problem**: Cuts-and-services-headline "What it is. What it costs." på desktop er stor (~140px), men venstre-justert med null line-height-pust. Den 2. linjen blir glemt fordi den deler underline-baseline.
   **Fil**: `website1/components/services/...` eller `app/cuts-and-services/page.tsx`.
   **Fiks**: Øk gap mellom linjene fra `--leading-display: 0.95` til 0.92 her, eller introduser en 24px margin-top på linje 2 og en tynn 1px line over linje 2 i `--color-line`.
   **Prioritet**: lav.

9. **Problem**: Knappen "First time? Free 15-minute consultation" på hero har spinkel border og ser mindre viktig ut enn primær Book-knapp. Men dette er et avgjørende microconversion for en ny krøllklient.
   **Fil**: `website1/components/homepage/Hero.tsx`.
   **Fiks**: Behold secondary-styling, men oppjuster border til 1.5px `--color-ink`, padding match med primær Book-knapp (50px høyde), og legg til en liten ikon-prefiks (et timeglass eller en sirkel med "15").
   **Prioritet**: middels.

## Konkrete forbedringer, website2

1. **Problem**: Hero-headline "Oslo's first salon built around the curl spectrum." wrappes på 5 linjer på desktop pga `max-width` som er for snever, sannsynligvis ~520px container. Det blir "vegg av serif" effekt som overdøver bildet.
   **Fil**: `website2/app/page.tsx` (Hero-blokk).
   **Fiks**: Øk hero-container fra antatt `max-w-xl` til `max-w-3xl` (768px), reduser font-size fra antatt 96px til 80px, og tillat 3-linjers wrap i stedet for 5.
   **Prioritet**: høy.

2. **Problem**: Marquee-stripen ("Spectrum is the operating word...") starter midt i ordet "is" i venstre kant på fullside-screenshot (translate3d posisjonering klippes). Animasjonsstart-snapshot fanger den i en uheldig stilling.
   **Fil**: `website2/app/globals.css` (.marquee).
   **Fiks**: Sett `padding-left: 4rem` på marquee-strippen, eller la animasjonen starte fra `translate3d(0, 0, 0)` med duplisert innhold som "klampe" til høyre. Alternativt: gi marquee-en en kort fade-in-mask på 5% i hver kant med `mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)`.
   **Prioritet**: høy.

3. **Problem**: Body har en støy-overlay (`body::before` med SVG turbulence, opacity 0.16, multiply blend). På fotografier gjør det huden grumsete og bildene mister kontrast. Effekten er ment "papir", men på en frisørsalong-prototype gir det inntrykk av lavoppløst skann.
   **Fil**: `website2/app/globals.css` linje 44-53.
   **Fiks**: Reduser opacity fra 0.16 til 0.06, eller bytt mix-blend fra `multiply` til `overlay`. Best: maskér bort overlay fra `<img>`-elementer med `body::before { mask: ... }` eller pakk inn i en wrapper med `isolation: isolate`.
   **Prioritet**: høy.

4. **Problem**: Alle pages bruker identisk hero-template (split: serif headline venstre, ett bilde høyre, eyebrow over). Cuts, Team, Portfolio, Method, Shop, Journal, Visit, About har alle samme layout. Det blir monotont å scrolle mellom dem.
   **Fil**: `website2/components/pages.tsx` (PageHero eller liknende).
   **Fiks**: Varier hero per side: Portfolio kunne ha full-bredde galleri-strip øverst i stedet for split. Shop kunne ha produkt-still-life full-width. Visit kunne ha kart-snippet over headline. Behold delt design-grammatikk (eyebrow + serif), men varier visuell rytme.
   **Prioritet**: middels.

5. **Problem**: Team-siden har bare 3 stylister (Vanessa, Iman, Jonas), mens site1 har 5 (Vanessa, Nia, Adé, Mira, Inés) og refererer til typer-spesialisering. Færre = mindre dekning av "every curl pattern, one place"-løftet.
   **Fil**: `website2/app/the-team/page.tsx` eller team-data.
   **Fiks**: Legg til 2 stylister til, bruk site1-data som referanse (Adé for Sculpt Cut, Mira for locs).
   **Prioritet**: middels.

6. **Problem**: Booking step 1 service-cards bruker rectangular flat layout med veldig liten visuell distinksjon mellom CORE-services og add-ons (Color, Deep Treatment, Children's cut). First Visit Bundle har clay/terracotta-bakgrunn som er fin, men The Jackson Cut og The Sculpt Cut ser like ut som de mindre.
   **Fil**: `website2/components/booking-flow.tsx`.
   **Fiks**: Behold terracotta-bakgrunn på First Visit Bundle, men gi The Jackson Cut og The Sculpt Cut tykkere border (2px `--ink`) for å markere CORE. Eller lag en 3-rads grid: Featured (1 stor), Core (2 medium), Other (4 small).
   **Prioritet**: middels.

7. **Problem**: Bookingsteg-indikatoren (01 SERVICE / 02 STYLIST / 03 TIME / 04 CURL INTAKE / 05 CONFIRM) bruker boks-stil med border, men ikke fylte progress-segmenter. Det er vanskelig å se status uten labels. Site1 har en mer leselig fyllt-bar.
   **Fil**: `website2/components/booking-flow.tsx`.
   **Fiks**: Legg til en `bg: var(--clay)` på de fullførte steg-boksene, og en thin progress-bar under (height 2px) som fylles 1/5 -> 5/5.
   **Prioritet**: lav.

8. **Problem**: Testimonials på hjem heter "Verified prototype client" og sitatene mangler navn ("No one asked if my hair was too much."). Det leser som placeholder for et ekte sitat. Site1 har full navn + område ("Amara O., Type 4a / Tøyen, 2 weeks ago") + 5 stjerner + Google-attribusjon.
   **Fil**: `website2/app/page.tsx` (testimonials-blokk).
   **Fiks**: Erstatt "Verified prototype client" med navn + curl-type + nabolag. Legg til stjerne-rating (5/5) og Google-eller-Trustpilot-merke. Sitatene er gode, men signaturen må holde.
   **Prioritet**: høy.

9. **Problem**: J&C-logo-monogrammet (#a84d2a clay-firkant 50x50px med hvit "J&C") konkurrerer visuelt med "Jackson & Coil"-ordmark ved siden av. Dobbel branding gjør at headeren føles redundant.
   **Fil**: `website2/components/chrome/Header.tsx` (eller hva den heter).
   **Fiks**: Velg én. Enten monogram (skjul ordmark) eller ordmark (skjul monogram). Site1 har bare "Jackson & Coil"-tekst i Fraunces og det er roligere.
   **Prioritet**: lav.

10. **Problem**: Fullside-screenshot på home avslører store hvite seksjoner mellom marquee og testimonials (samme lazy-load-mønster som site1, men her ser det enda mer fragmentert ut fordi bookingkort, founder-blokk, method-blokk og portfolio-grid alle har lazy-bilder).
    **Fil**: Flere komponenter i `website2/components/`.
    **Fiks**: Som site1: legg `priority` eller `loading="eager"` på første bilde i hver above-the-second-fold-seksjon.
    **Prioritet**: høy (case-study-relevant).

## Hva kan flyttes mellom dem

1. **Returning-client-sidebar fra website2 til website1**.
   Website2 har en "Daniel, book the same again" / "Rebook same cut" sidebar med live summary av valgt service/stylist/tid. Det er en kraftig UX-detalj som website1 mangler. Bytt website1s "Resuming where you left off / Start over"-banner til en venstre-sidebar med samme summary-funksjonalitet.

2. **Bokstav-til-foto-bytte fra website2 til website1 (booking step 2)**.
   Website2 har stylist-bilder i bookingflowen. Website1 har bokstav-avatarer (V, N, A, M, I). Bildefilene `team-*.jpg` finnes i `website1/public/images/`. Bytt dem inn med `<Image>` 64x64px rounded-full.

3. **Fyllt progress-bar fra website1 til website2 (booking)**.
   Website1 har tre tydelig fylte grønne segmenter (bookgreen #1f4d3f) som indikerer hvilke steg som er ferdige. Website2 har en mer abstrakt boks-rad uten fyll. Flytt website1s segmenterte bar over.

4. **Real client signature fra website1 til website2 (testimonials)**.
   Website1 har Amara O. / Daniel B. / Sigrid M. med navn, curl-type, nabolag, dato og 5-stjerne-rating. Website2 har "Verified prototype client" uten signatur. Adopter website1s metadata-stack.

## Hva sluttbruker bør prioritere for case-study-screenshots

1. **Slå av Next.js dev-knappen (den lille "N"-sirkelen nede til venstre) før alle screenshots tas**. Begge nettsider viser den i dev-mode. Kjør `npm run build && npm run start` for begge, eller sett `NEXT_PUBLIC_DEV_INDICATOR=false` i `next.config.ts`. Dette er den mest synlige og minst arbeidskrevende rensingen. Prioritet 1.

2. **Eager-load above-the-fold-bilder på begge nettsider**. Begge har LCP-warnings og fullside-screenshots avslører hvite seksjoner der lazy-bilder ikke har lastet. Legg `priority` på første `<Image>` i hver homepage-seksjon. 30-minutter jobb, gjør hele homepagen leselig som ett bilde. Prioritet 2.

3. **Fix marquee venstre-kant-klipp på website2**. Den horisontale stripen på home starter midt i ordet "is" i screenshot. Legg til `mask-image: linear-gradient(90deg, transparent 0%, black 5%, black 95%, transparent 100%)` på `.marquee`. 5-minutter jobb, fjerner et iøyenfallende bug. Prioritet 3.

4. **Erstatt website1 bookings bokstav-avatarer med stylist-foto**. Filer finnes allerede i `public/images/`. Bytt initial-bokstav-i-sirkel til `<Image src={stylist.image} ...>`. Booking step 2 går fra placeholder-aktig til portfolio-grade på en commit. Prioritet 4.

5. **Senk støy-overlay-opacity på website2 fra 0.16 til 0.06, eller fjern den fra `<img>`-elementer**. Effekten skader fotografi-kontrasten på hud og hår, som er hovedinnholdet. Én linje CSS, stor visuell forskjell. Prioritet 5.
