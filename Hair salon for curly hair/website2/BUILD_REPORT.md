# Jackson & Coil Website2 Build Report

## Status

Prototype built in `/website2/` as an independent Next.js 15 vision. `/website1/` was not inspected or modified.

## Pages Built

- `/`
- `/cuts-and-services`
- `/the-team`
- `/portfolio`
- `/the-method`
- `/shop`
- `/journal`
- `/visit`
- `/booking`
- `/about`

## Design Direction

- Editorial Scandinavian restraint with warm documentary photography as the expressive layer.
- Fraunces display + IBM Plex Sans body + JetBrains Mono utility, avoiding Geist, Playfair Display, and Pragmatica Extended.
- Paper cream ground, warm off-black ink, one owned terracotta clay, deep blue-green only for booking/success states.
- Square buttons, hairline grids, large serif headlines, dual-direction testimonial marquee, restrained Framer Motion reveals, Lenis smooth scroll.
- Type 4-first hero with Amara and Daniel visible above the fold, including Daniel's fade-and-coils cut as a first-class service signal.

## Tech And Libraries

- Next.js `15.5.18` App Router
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis
- next-intl provider with same-URL client language toggle
- Phosphor icons

## Images

Codex built-in image generation succeeded. Final assets are in `public/images/`:

- `hero-amara-chair.jpg`
- `hero-daniel-fade-coils.jpg`
- `founder-vanessa-working.jpg`
- `team-stylist-portrait.jpg`
- `portfolio-type4-after.jpg`
- `portfolio-type3a-after.jpg`
- `portfolio-sculpt-cut.jpg`
- `method-dry-cut-detail.jpg`
- `shop-curl-shelf.jpg`
- `visit-salon-interior.jpg`

## Booking Prototype

- Custom in-brand multi-step booking UI, no third-party widget or redirect.
- Steps: service, stylist, time, curl intake, confirm.
- Andre Walker 2A-4C curl-type selector included.
- Porosity, last chemical service, desired outcome, and "what are you scared of" fields included.
- Returning-client rebook path included for Daniel's Sculpt Cut.
- Mock state only. No persistence, auth, payments, calendar backend, SMS, or email integration yet.

## Bilingual Support

- English and Norwegian content available from day one.
- Single-click same-URL toggle, persisted in local storage.
- Booking flow has native Norwegian interaction labels and localized slot labels.

## Verification

- `npm run lint` passed.
- `npm run build` passed.
- Production route check passed for all 10 required routes with HTTP 200.
- Playwright production console check: 0 errors, 0 warnings.
- Playwright booking walkthrough passed end to end with curl-type intake.
- Playwright returning-client rebook passed.
- Norwegian booking copy check passed for core labels and localized slots.
- Lighthouse mobile performance on homepage: 89.

## Screenshots

- `.playwright-cli/website2-home-desktop-production.png`
- `.playwright-cli/website2-home-mobile-production.png`
- `.playwright-cli/website2-booking-mobile-production.png`
- `.playwright-cli/lighthouse-home-mobile.json`

## Known Issues And Next Work

- Images are Codex-generated prototype assets and need human art-direction review before any real launch.
- No CMS yet; journal, shop, team, services, and portfolio content are hardcoded TypeScript.
- No booking backend yet; calendar availability, SMS, email, reschedule, auth, deposits, and POS are mocked.
- `npm audit` reports 2 moderate vulnerabilities from scaffolded dependencies; not force-fixed because `npm audit fix --force` may introduce breaking changes.
- Norwegian copy is strong prototype copy but should still get a final native copywriter pass before launch.
