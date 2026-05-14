# Handoff prompt for `/website2/` — copy everything below the line into a fresh Claude Code session

> Open a new Claude Code session pointed at `/Users/carlborg/Dev/Hair salon for curly hair/`, then paste the prompt below as the first message. The other agent will read the brand brief, research, and persona insights, then build a parallel Next.js prototype at `/website2/`. It is instructed not to look at `/website1/` so the two visions stay independent.

---

You are building a Next.js 15 website prototype for a curl-specialist hair salon called **Jackson & Coil** (working name), launching in Grünerløkka, Oslo. Founder: Vanessa Jackson.

This project is being built in parallel — another agent is building `/website1/`. You build `/website2/`. You will both share the same brand brief and research, but you should make your own design decisions on typography, color, animation, layout, and component design. The user wants to compare two design visions of the same brief. Do not look at `/website1/` — make your own choices.

## What you must do BEFORE writing any code

Read these files in this order. They are the foundation:

1. `/Users/carlborg/Dev/Hair salon for curly hair/BRAND.md` — the canonical brand brief. Personas, voice, the Photography Test, service menu, booking flow spec.
2. `/Users/carlborg/Dev/Hair salon for curly hair/research/README.md` — cross-salon synthesis: 15 patterns to steal, 10 anti-patterns, the single biggest opportunity, 15 build recommendations.
3. Skim each `research/<salon>/teardown.md` (5 of them: hair-rules-nyc, curl-bar-london, hare-and-bone-london, curl-up-amsterdam, capella-salon-la) for specific design moves you might want to riff on. Screenshots are in `research/<salon>/screenshots/`.

If you skip these reads, you will produce generic work. Do not skip.

## Constraints (non-negotiable)

- **Build at `/Users/carlborg/Dev/Hair salon for curly hair/website2/`**. Do not touch `/website1/`.
- **Tech stack: Next.js 15 App Router + TypeScript + Tailwind**. You may add Lenis, Framer Motion, GSAP, Three.js, or any other library.
- **Photography: use the `codex-imagegen` skill (via the Skill tool) to generate every image.** No stock photos. No placeholders. The Photography Test in BRAND.md §9 is the rule. Every hero, portfolio, founder, and team photo must pass it: Type 4 hair, dark skin, lit properly, joyful, in real-life context. Hero rotation must include at least one Black man with a fade-and-coils cut. No "wavy 2b girl with a flip."
- **Bilingual NO + EN from day one.** Single-click toggle, no `/no/` URL prefix. Booking flow Norwegian must read native — if you can't write good Norwegian, dispatch an agent that can.
- **Page architecture (BRAND §13)**: `/`, `/cuts-and-services`, `/the-team`, `/portfolio`, `/the-method`, `/shop`, `/journal`, `/visit`, `/booking`, `/about`. Adjust if you have a strong reason; document why.
- **Booking is the brand surface**. Multi-step custom UI on top of mock state (no real persistence needed for prototype). Includes a curl-type intake step (Andre Walker 2A–4C). Finishes in <2 min on phone for first-timer, <60s for rebook. Never embed a third-party widget — every world-class peer fails here.
- **No third-party booking widget redirects**. Never. This is the single biggest brand-killer in the competitive set.
- **The voice rules in BRAND §7 are absolute**. No "embrace your curls", no "queen", no "journey", no exclamation marks in headings, no "curl whisperer". Architectural language for men's services.

## Required latitude (your design choices)

You decide:
- Typography pairing (paid foundry licenses are fine — use webfont CDNs you trust). Avoid Geist (Hair Rules has it), Pragmatica Extended (Curl Bar), and Playfair Display (Curl Spa + every Wix template). BRAND.md §8 recommends GT Sectra + Söhne; if you take that, take it intentionally.
- Color execution. BRAND.md §8 gives a direction (terracotta-ochre primary, paper-cream ground, warm off-black ink, deep blue-green accent). You may diverge if you have a strong rationale. Honor "one owned color" discipline — no second brand color.
- Animation system. Lenis smooth scroll is the cheap "premium" win (Hair Rules reference). Framer Motion is the default for staggered reveals. Use what serves the brand; don't ship motion for motion's sake.
- Layout, composition, page architecture (within the BRAND §13 list), interaction details.
- CMS or hardcoded content. Hardcoded TypeScript is fastest for a prototype; Sanity/Payload is more realistic. Your call.

## How to actually execute (orchestration recipe)

You are expected to use parallel sub-agents extensively to keep the orchestrator's context window clean. Suggested structure:

**Phase 0 — Scaffold (sequential, you do this)**
- `npx create-next-app@latest website2 --ts --tailwind --app --no-src-dir --import-alias '@/*' --use-npm` (run from project root)
- Configure design tokens, typography, base layout, nav, footer
- Install Lenis + Framer Motion (or your chosen alternatives)
- Set up `next-intl` for NO/EN

**Phase 1 — Image generation (parallel, dispatch one agent for it)**
- Dispatch a sub-agent that uses the `codex-imagegen` skill to generate all hero, portfolio, team, founder, and journal images
- Save to `/website2/public/images/` with descriptive filenames
- Strict prompt discipline: every image must satisfy the Photography Test
- Run image gen in parallel with content-page builds — they don't block each other

**Phase 2 — Page builds (parallel, dispatch 4–6 agents)**
- Agent A: homepage (the do-or-die — see BRAND §13 critical pages)
- Agent B: `/cuts-and-services` + `/the-method` (educational pair)
- Agent C: `/the-team` + `/about` + `/visit`
- Agent D: `/portfolio` + `/shop` + `/journal`
- Agent E: `/booking` (most complex — custom multi-step flow with curl-type intake)
- Each agent gets the brand brief paths, the design tokens you've configured, and clear scope. Each writes its pages, takes a screenshot when done, returns a short report.

**Phase 3 — Review (parallel, dispatch 3 agents)**
- Visual review agent: uses `playwright-cli` skill to take screenshots of every page in desktop + mobile, compares against the BRAND.md Photography Test and voice rules, lists issues
- Functionality review agent: clicks every CTA, walks the booking flow end-to-end, fills the curl-type intake, tests the language toggle
- Accessibility / responsive review agent: checks mobile breakpoints, keyboard nav, ARIA, contrast

**Phase 4 — Iterate**
- Fix issues found in Phase 3
- Dispatch follow-up agents for any large fixes

**Phase 5 — Final report**
- A short report at `/website2/BUILD_REPORT.md` documenting: pages built, design decisions, libraries used, screenshots, known issues, what's mocked, what would need real backend.

## Quality bar

The website is the salon's most important brand asset. The reference standard is what BRAND.md and the cross-salon synthesis describe — not generic Next.js template energy. Specifically:
- Hero must pass the Amara Test, the Sigrid Test, and the Daniel Test (BRAND.md §9 + cross-persona truths)
- Booking flow must pass Sigrid's "22:30 on a phone with a kid asleep, under 2 minutes" test
- Typography must read intentional, not template
- Color must read disciplined, not Wix
- Photography must read editorial, not stock

## What good looks like

- All 10 pages live and routable
- Real Codex-generated images everywhere (not placeholders)
- Booking flow works end-to-end with curl-type intake step
- NO + EN toggle works
- Lighthouse mobile score 85+ on homepage
- A `BUILD_REPORT.md` summarizing what's done

## What you will NOT do

- Read or look at `/website1/`. Make your own choices.
- Hand off booking to a third-party widget. Period.
- Use stock photos or text placeholders.
- Use Playfair Display, Geist, or Pragmatica Extended.
- Add a "for wavy hair" tab — Sigrid said it feels like the kids' table.
- Use exclamation marks in headlines.
- Ask the user mid-build whether to proceed. The user said one-shot, go as far as possible. Make decisions and ship.

## Final note

When you are done — or when you've gone as far as you can in this session — write `/website2/BUILD_REPORT.md` with a clear status. The user is comparing two visions; your job is to put a strong, specific, opinionated one on the table.

Now read the four files listed above, then begin Phase 0.
