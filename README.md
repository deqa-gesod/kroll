# Jackson & Coil

To parallelle Next.js-prototyper av en fiktiv krøll-spesialisert frisørsalong, bygget i hovedsak gjennom Claude Code og Codex. Prosjektet ble laget som porteføljedemo for å vise hvordan jeg styrer agent-baserte utviklingsverktøy fra spec til ferdig kode.

Full case study på [deqa.no/no/prosjekter/kroll](https://deqa.no/no/prosjekter/kroll).

## Hva ligger her

```
Hair salon for curly hair/
  website1/        Next.js 16, Fraunces + terracotta, "luxe"-versjonen
  website2/        Next.js 15, dokumentar-foto + paper-grid, "casual"-versjonen
  BRAND.md         Merkevare og tone-of-voice
  UIUX-ANALYSIS.md UI/UX-rapport over begge prototypene
  research/        Forarbeid og krøllsalong-research
  images/          Codex-genererte og kuraterte bilder
kroll-screenshots/
  desktop/         16 PNGs, 1440x900, full-page screenshots
  mobile/          16 PNGs, 375x812, full-page screenshots
  lighthouse/      8 mobile Lighthouse-rapporter (JSON + HTML)
PORTFOLIO-CONTEXT-kroll.md   Stil og workflow-regler for agentene
```

## Stack

| Prototype | Next.js | React | Tailwind | Spesielt |
|---|---|---|---|---|
| website1 | 16.2 | 19.2 | v4 | Fraunces serif, cream + terracotta, Motion + Lenis |
| website2 | 15.5 | 19 | v4 | IBM Plex Sans, paper + clay + deep teal, Phosphor icons |

Felles: TypeScript, EmailJS-stub for bekreftelse, `.ics`-nedlasting, sessionStorage-persistens for booking.

## Kjør lokalt

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

Begge har 10 ruter: `/`, `/cuts-and-services`, `/the-method`, `/the-team`, `/portfolio`, `/shop`, `/journal`, `/visit`, `/booking`, `/about`.

## Lighthouse mobil (dev-mode)

| Side | website1 perf | website2 perf |
|---|---|---|
| `/` | 75 | 55 |
| `/shop` | 94 | 51 |
| `/booking` | 97 | 70 |
| `/portfolio` | 76 | 55 |

Tallene er fra `npm run dev`, ikke prod-bygg. De skal leses som et nedre estimat på reell ytelse.

## Agent-workflow, kort

- **Claude Code** som hovedagent for kode, struktur og subagent-dispatch.
- **Codex** for bilde-prompts via `image_gen` og parallelle eksperimenter.
- **Playwright via MCP** for screenshots og Lighthouse-målinger.
- 3 til 5 subagenter parallelt for å bygge ulike sider samtidig.
- Forbudte ord, fraser og mønstre låst i `PORTFOLIO-CONTEXT-kroll.md`, så agentene unngår AI-glansprosa.

## Status

Prototype-stadie. Ingen ekte backend, ingen ekte salong, ingen payments. EmailJS-bekreftelse er en stub med `mailto:`-fallback. Booking-state lever i `sessionStorage`. Seks av 36 shop-produkter har Codex-bilder, resten har bilder fra ekte merker (Pattern, Innersense, Boucléme, Aveda m.fl.).

## Lisens

Personlig portefølje-prosjekt. Ikke offisielt tilknyttet noen ekte salong.
