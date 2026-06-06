# Jackson & Coil

Two parallel Next.js prototypes of a fictional hair salon that specialises in curly hair. The point of the project is not the salon. It is the workflow: I built almost all of this by driving AI agent coding tools (Claude Code and Codex) from a written spec through to finished, running code. This is a portfolio demo of that process.

Full case study: [deqa.no/no/prosjekter/kroll](https://deqa.no/no/prosjekter/kroll).

## What's in here

```
Hair salon for curly hair/
  website1/        Next.js 16, Fraunces + terracotta, the "luxe" version
  website2/        Next.js 15, documentary photo + paper grid, the "casual" version
  BRAND.md         Brand and tone of voice
  UIUX-ANALYSIS.md UI/UX review of both prototypes
  research/        Background notes and curly-salon research
  images/          Codex-generated and curated images
kroll-screenshots/
  desktop/         16 PNGs, 1440x900, full-page screenshots
  mobile/          16 PNGs, 375x812, full-page screenshots
  lighthouse/      8 mobile Lighthouse reports (JSON + HTML)
PORTFOLIO-CONTEXT-kroll.md   Style and workflow rules for the agents
```

Two prototypes, same fictional salon, deliberately different design directions and stacks. One leans formal and editorial, the other warmer and more casual.

## Stack

| Prototype | Next.js | React | Tailwind | Notable |
|---|---|---|---|---|
| website1 | 16.2 | 19.2 | v4 | Fraunces serif, cream + terracotta, Motion + Lenis |
| website2 | 15.5 | 19 | v4 | IBM Plex Sans, paper + clay + deep teal, Phosphor icons |

Both share: TypeScript, an EmailJS stub for booking confirmation, `.ics` download, and `sessionStorage` to keep booking state between pages.

## Run it locally

```bash
# Prototype 1 (port 3010)
cd "Hair salon for curly hair/website1"
npm install
PORT=3010 npm run dev

# Prototype 2 (port 3020)
cd "Hair salon for curly hair/website2"
npm install
PORT=3020 npm run dev
```

Each prototype has the same 10 routes: `/`, `/cuts-and-services`, `/the-method`, `/the-team`, `/portfolio`, `/shop`, `/journal`, `/visit`, `/booking`, `/about`.

## Lighthouse (mobile, dev mode)

A few representative pages:

| Page | website1 perf | website2 perf |
|---|---|---|
| `/` | 75 | 55 |
| `/shop` | 94 | 51 |
| `/booking` | 97 | 70 |
| `/portfolio` | 76 | 55 |

These numbers come from `npm run dev`, not a production build, so treat them as a lower bound on real performance. A prod build would score higher. Full reports are in `kroll-screenshots/lighthouse/`.

## The agent workflow

This is the part worth reading:

- **Claude Code** as the main agent for code, project structure, and dispatching subagents.
- **Codex** for image prompts via `image_gen` and for parallel experiments.
- **Playwright through MCP** to take the screenshots and run the Lighthouse measurements.
- 3 to 5 subagents running at once to build different pages in parallel.
- A list of banned words, phrases, and patterns locked into `PORTFOLIO-CONTEXT-kroll.md`, so the agents wrote plain copy instead of AI gloss.

I wrote the specs, the brand and tone rules, and the design directions, then reviewed and corrected the output. The agents did the bulk of the typing.

## Status and limits

Prototype stage. Be clear about what this is not:

- No real backend, no real salon, no payments.
- The EmailJS confirmation is a stub with a `mailto:` fallback.
- Booking state lives in `sessionStorage`, so it resets when the tab closes.
- 6 of 36 shop products use Codex-generated images. The rest use images from real brands (Pattern, Innersense, Boucléme, Aveda, and others).

If I took this further, the obvious next steps would be a real booking backend, proper image rights for the shop, and production builds with measured Core Web Vitals.

## License

Personal portfolio project. Not affiliated with any real salon.
