# PORTFOLIO-CONTEXT.md

> Denne fila ligger i rot-mappa til **krøll-prosjektet**, en nettside for hårsalonger med fokus på krøllete hår. Prosjektet skal bli en case study på [deqa.no](https://deqa.no), Deqa Gesod sin personlige utvikler-portfolio.
>
> Fila lever sammen med `omdeqa.md` (biografisk fakta om Deqa) og `.portfolio-notes.md` (rå notater fra utviklingen). De tre utfyller hverandre, de duplikerer ikke.

---

## Hva dette prosjektet er, sett utenfra

En nettside for hårsalonger spesialisert på krøllete hår. Bygget i hovedsak ved hjelp av **Claude Code og Codex**, altså agentic AI-verktøy. Det er ikke tilfeldig: prosjektet er Deqas demonstrasjon overfor rekrutterere på at hun behersker agent-baserte utviklingsverktøy og kan styre dem til faktisk leverbar kode.

Det betyr to ting når du jobber i dette repoet:

1. **Hjelp med selve koden** som vanlig (nettsiden skal funke).
2. **Fang opp tekst-råstoff** underveis, slik at case studyen blir lett å skrive senere. Spesielt: hva ble bestemt om agent-workflowen, hvilke prompts virket, hvilke som ikke gjorde det, hvor Claude Code/Codex tok feil og måtte korrigeres. Det er hovedhistorien i case studyen.

Hovedmålet med deqa.no er å lande Deqas første utviklerjobb etter ferdig bachelor (USN, juni 2025). Denne case studyen er spesifikt rettet mot rekrutterere som vurderer hvor moden hun er på AI-assistert utvikling.

---

## Hvilke filer henger sammen

- **`omdeqa.md`** (ligger i krøll-roten): biografisk fakta, utdanning, jobberfaring, kontaktinfo. Bruk denne som kilde til alt som handler om Deqa selv. Ikke gjenta innholdet her, og ikke motsi det.
- **`PORTFOLIO-CONTEXT.md`** (denne fila): hva prosjektet er, hvordan tekst skal skrives, hvordan råstoff samles, hvordan deqa.no er bygget, og selve case study-prompten.
- **`.portfolio-notes.md`** (lager du i krøll-roten): rå notater som bygges opp under utvikling. Mater inn i prompten når case studyen skal skrives. Legg den i `.gitignore` hvis repoet er offentlig.

Hvis `omdeqa.md` mangler, spør Deqa om å lime den inn før du skriver tekst som referer til henne personlig.

---

## deqa.no: hva du må vite for kommandoer som "push til dev og oppdater deqa.no"

Selv om dette repoet er krøll-prosjektet, vil Deqa av og til be deg gjøre noe i deqa.no-repoet direkte (typisk legge til case studyen når den er ferdig). Her er pekerne du trenger.

### Repo og branches

- **Lokal sti**: `/Users/deqagesod/Documents/deqa.no/`
- **App-koden**: `deqa-portfolio/` (Next.js App Router-prosjekt inni repoet)
- **Planleggingsdokumenter**: `portfolio-plan/` (strategi, sidestruktur, wireframes, designsystem, teknisk stack, implementeringsplan)
- **Default branch**: `main`
- **Arbeidsbranch**: `dev`
- **Workflow**: jobb på `dev`, push til `origin/dev`, merge til `main` når noe skal ut. Cloudflare Pages deployer fra `main`.

### Stack på deqa.no

- Next.js (App Router), TypeScript, Tailwind CSS v4
- next-intl med `/no` og `/en` routing
- MDX-innhold i `deqa-portfolio/content/projects/<slug>/{no,en}.mdx`
- Cloudflare Pages via OpenNext (`@opennextjs/cloudflare`)
- Resend for kontaktskjema, Plausible for analytics
- Framer Motion for animasjon

### Kommandoer i `deqa-portfolio/`

- `npm run dev`: utviklerserver på localhost:3000
- `npm run lint`: ESLint (kjøres alltid før push, hard regel)
- `npm run build`: produksjonsbygg
- `npm run preview`: lokal preview av Cloudflare-bygget
- `npm run deploy`: deploy via OpenNext (kjøres normalt automatisk fra `main`)

### Når Deqa sier "legg til case studyen på deqa.no"

1. Lag mappen `deqa-portfolio/content/projects/<slug>/` (eks. `kroll/`).
2. Legg inn `no.mdx` og `en.mdx`. Følg strukturen fra `deqa-portfolio/content/projects/sulaiman/` som mal.
3. Frontmatter må matche andre prosjekter (sjekk en eksisterende mdx-fil før du gjetter).
4. Bilder lagres under `deqa-portfolio/public/projects/<slug>/`.
5. Kjør `npm run lint` i `deqa-portfolio/`.
6. Commit på `dev`, push, merge til `main` når Deqa har godkjent.

### Harde regler i deqa.no-repoet

- **Aldri `Co-Authored-By:` i commit-meldinger**. Det er en `commit-msg`-hook som stripper det, men ikke prøv. Commits skal fremstå som Deqas egne.
- **Lint før push**. CI feiler på errors. Pre-push hook er ekstra-vakt.
- **Ikke endre designsystem-tokens** direkte i kode. Oppdater `portfolio-plan/05-designsystem.md` først.
- **Ikke installer pakker** uten å spørre. Stack er låst i `portfolio-plan/06-teknisk-stack.md`.
- **Ingen tankestrek (—)** i kode, kommentarer, commit-meldinger eller prosa.
- **Norsk er primærspråk**. Engelsk lages bare når Deqa ber om det.
- **`deqa-portfolio/AGENTS.md`**: Next.js-versjonen som brukes (16.x med Tailwind v4) har breaking changes. Les `node_modules/next/dist/docs/` ved tvil heller enn å stole på tidligere kunnskap om Next.js.

### Designsystem-snarvei

- Spacing-skala: 4, 8, 16, 24, 32, 48, 64, 96, 128 px. Ingen vilkårlige verdier.
- Aksentfarge: terrakotta `#C2410C` eller saffron `#D97706`.
- Full spec: `portfolio-plan/05-designsystem.md`.

---

## Aktiv oppgave under utvikling: samle råstoff til case study

Vedlikehold `.portfolio-notes.md` i krøll-roten mens dere jobber. Strukturen mapper direkte mot input-feltene i case study-prompten under, så det er minimalt friksjon når teksten skal skrives.

```markdown
# Råstoff til case study: krøll

## Fakta
- TYPE:               Webapp (nettside for hårsalonger, krøll-fokus)
- ÅR + KURS/RAMME:    <2026, soloprosjekt / portfolio-demo>
- TEAM:               <solo, men assistert av Claude Code og Codex>
- MIN ROLLE:          <hva jeg konkret styrte: produkt, prompts, beslutninger>
- STACK:              <språk, rammeverk, db, hosting>
- AI-VERKTØY:         Claude Code, Codex, evt. andre
- LIVE URL:           <https://... eller "ingen">
- GITHUB:             <https://github.com/... eller "ingen">

## Problemet jeg løste (rå stikkord)
Hvem hadde smerten. Hva var den faktisk. Hvorfor er krøll-segmentet underservet i salongbransjen.

## Hva ble bygget
Hva nettsiden faktisk gjør. Konkret. Booking? Galleri? Stylist-profiler? Pris og produktinfo? FAQ for krøll-pleie?

## Min del versus AI-verktøy
Hva styrte jeg, hva genererte agentene, hva måtte jeg korrigere. Vær ærlig. Dette er hovedpoenget i case studyen.

## Beslutninger jeg tok
For hver: valget, alternativet, kort hvorfor.
Eksempel: "Brukte Claude Code som hovedagent og Codex til parallelle eksperimenter med bildebehandling, fordi Codex har raskere iterasjon på bilde-prompts."

## Agent-workflow: hva funket
Hvilke prompts ga gode resultater. Hvilke subagent-mønstre. Når lønte parallellisering seg.

## Agent-workflow: hva feilet
Når tok agentene feil retning. Hvor måtte du gripe inn manuelt. Hva hadde du ikke turt å overlate til dem.

## Kjente svakheter (teknisk)
Konkret. "Booking-validering kjøres bare på klient, ikke på server."

## Hva funket (teknisk)
Konkret. Hva er du faktisk fornøyd med.

## Sitater fra Deqa underveis
Ordrett. Spesielt utsagn om hvorfor du valgte agent-baserte verktøy, hva som overrasket, hva som frustrerte.

## Visuelt råstoff
Stier til screenshots, demo-URL, eventuelle skjermopptak av agent-sesjoner.
```

**Når oppdaterer du fila:**
- Når en feature er ferdig.
- Når et teknisk valg blir tatt.
- Når et agent-mønster funker (eller feiler).
- Når noe var vanskelig: skriv det ned med en gang.
- Når Deqa sier noe interessant: ordrett.

Hold notatene rå. Ikke skriv ferdig portfolio-prosa her. Case study-prompten lengst nede tar råstoffet og lager teksten.

---

## Hva som gjelder under utvikling (kode, commits, kommentarer)

Disse reglene gjelder all tekst du produserer i krøll-repoet, ikke bare case studyen:

- **Ingen tankestrek (—)** noe sted. Bruk komma, vanlig bindestrek med mellomrom, eller omskriv.
- **Ingen AI-aktige kommentarer i koden.** Skriv som Deqa selv kunne skrevet, kort og direkte.
- **Ingen `Co-Authored-By:`-trailer** i commit-meldinger. Commits skal fremstå som Deqas egne.
- **Norsk er primærspråk** for innhold. Engelsk lages bare hvis Deqa ber om det.
- **Ikke commit innholdsendringer uten eksplisitt godkjenning** ("bruk versjon 2", ikke bare "hørtes bra ut").
- **Hvis Deqa mangler retning på kort tekst** (hero, knappetekst, salong-pitch), still 3 til 5 skarpe spørsmål eller gi 2 til 3 alternativer. Aldri gjett på blanke ark.

For all biografisk/personlig fakta om Deqa: les `omdeqa.md`. Ikke gjett.

---

# Case study-prompt (bruk når selve teksten skal skrives)

> Når råstoffet i `.portfolio-notes.md` er fyldig nok, bruk prompten under for å produsere case study-posten som limes inn på `deqa.no/no/prosjekter/<slug>`. Følg den til punkt og prikke. Den overstyrer alle andre stilråd ved konflikt.

## Mål
Lag en porteføljepost på norsk for deqa.no. Stemmen og strukturen skal matche Sulaiman Bil Service-posten på samme nettsted. Sluttproduktet er fire markdown-seksjoner (Problem, Løsning, Beslutninger jeg tok, Hva jeg lærte) som limes inn i prosjekt-siden, pluss et sett med screenshots lagret i en mappe jeg kan finne igjen.

**Tilleggsvinkel for dette prosjektet**: agent-workflowen er en del av historien. Det er greit, og forventet, at minst én av beslutningene og minst ett av læringspunktene handler om hvordan Claude Code og Codex ble brukt, hvor de funket, og hvor du måtte ta over.

## Hvem skriver
Førsteperson. Deqa. Holdning: jordnær, observerer hva som funket og hva som ikke gjorde det. Selger ikke seg selv. Ikke "AI gjorde alt", ikke "jeg gjorde alt selv". Vis hvor grensen gikk.

## Målgruppe
HR-folk og rekrutterere som ikke nødvendigvis koder, men som vurderer å ansette deg. Skal vise at du behersker AI-assistert utvikling uten å virke oppblåst eller AI-generert. Lett å skumlese.

## Stemme: forbudte fraser, ord og mønstre

Bruk INGEN av disse. De er klassiske AI-portefølje-tics.

Forbudte fraser:
"et lærerikt prosjekt", "reisen lærte meg", "jeg er stolt av å ha", "i dette prosjektet fikk jeg muligheten til", "ved hjelp av X klarte vi å", "dette ga meg en dypere forståelse av", "som student har jeg erfart", "et solid grunnlag", "krevende, men gøy", "min reise i koden", "å være en del av et team", "jeg lærte mye om", "samarbeid er viktig", "kommunikasjon er nøkkelen", "agile var nytt for meg", "jeg ser nå at", "ser tilbake på dette med", "tok det til neste nivå", "fremtiden for AI", "AI er kommet for å bli".

Forbudte ord (tomme skryteadjektiv):
robust, skalerbar, moderne, innovativ, sømløs, kraftig, elegant, intuitiv, brukervennlig, effektiv (uten tall), spennende, banebrytende.

Forbudte mønstre:
- Tankestrek (—). Bruk komma eller punktum.
- Trippel-konstruksjon ("designe, utvikle og levere").
- Bullets der alle starter med samme verb-form. Bryt opp.
- "First, ... Then, ... Finally, ..." struktur.
- Setninger som starter med "I dette prosjektet" eller "Gjennom dette arbeidet".
- Setninger som ender på "for fremtiden" eller "videre i karrieren".
- Meta-introduksjoner ("I denne delen vil jeg...").
- Oppløftende sluttsetninger.
- "AI" som magisk substantiv ("AI hjalp meg bygge..."). Skriv heller hva agenten faktisk gjorde: "Claude Code genererte første utkast av booking-skjemaet, jeg flyttet valideringen til server."

Hvis "jeg lærte mye om X" frister: stryk og skriv én konkret ting du nå vet som du ikke visste før.

## Stemme: hva som er menneskelig
- Korte setninger. Sett punktum tidlig.
- Konkrete fakta erstatter generelle adjektiv. Ikke "stort prosjekt", men "solo, tre uker, Claude Code som hovedagent, Codex til bilde-prompts".
- Selvkritikk uten unnskyldning: "Claude Code la inn et email-felt jeg ikke hadde bedt om. Jeg så det ikke før etter andre runde med review." Ferdig. Ingen meta-refleksjon.
- Aktiv form: "Jeg flyttet konfigen til env-variabler" slår "konfigen ble flyttet".
- Snakkesyntaks er lov: "Ja, Tailwind v4 er nytt. Nei, jeg har ikke ryddet alt enda."
- Lov å innrømme at noe er stygt eller midlertidig. Lov å si "dette er ikke noe jeg er stolt av, men det funker".

## Ikke dikt opp tekniske valg
Hvis du ikke vet hva som ble valgt, ikke gjett. Hvis LOKAL STI er gitt: start med å lese koden (Read, Glob, Grep) før du skriver. Bruk faktiske kodebeviser. Hvis prosjektet ikke ligger lokalt og kontekst-feltene er tomme, spør Deqa.

## ──────────── FYLL UT DETTE FØR DU SENDER ────────────

PROSJEKT:                krøll
TYPE:                    Webapp (nettside for hårsalonger med krøll-fokus)
ÅR + KURS/RAMME:         <2026, soloprosjekt / portfolio-demo>
TEAM:                    <solo, assistert av Claude Code og Codex>
MIN ROLLE:               <produkt, agent-orkestrering, kvalitetskontroll, kodefikser>
STACK:                   <språk, rammeverk, db, hosting>
AI-VERKTØY:              Claude Code, Codex, evt. flere
LOKAL STI:               <sti til krøll-mappen>
LIVE URL:                <https://... eller "ingen">
GITHUB:                  <https://github.com/... eller "ingen">

KUNDENS / OPPGAVENS PROBLEM (2-4 setninger, konkret):
<hvem hadde smerten, hvorfor mangler krøll-segmentet en god salong-nettside>

HVA BLE BYGGET (2-4 setninger):
<hva siden faktisk gjør: booking, galleri, stylist-profiler, krøll-FAQ, produkter, annet>

MIN DEL VERSUS AI-VERKTØY:
<hvilke deler ble drevet av Claude Code, hvilke av Codex, hva styrte du selv, hvor måtte du gripe inn>

3-5 KONKRETE BESLUTNINGER JEG TOK:
<for hver: valget, alternativet, kort hvorfor. Minst én bør handle om agent-workflow>

KJENTE SVAKHETER (råstoff til "Hva jeg lærte"):
<konkret. Inkluder gjerne et punkt om hvor agentene tok feil og hva det betyr for hvordan du jobber med dem>

HVA FUNKET:
<konkret. Inkluder gjerne et punkt om hvor agent-workflowen sparte deg reell tid eller fikk frem løsninger du ikke ville sett selv>

## ───────────────────────────────────────────────────────

## Struktur for output

Lever fire markdown-seksjoner i denne rekkefølgen.

### Problem
1-3 setninger. Konkret. Hvem hadde smerten og hva var den.

### Løsning
2-4 setninger. Hva ble bygget. Si tydelig hva som ble drevet av agentene og hva du styrte. Bruk inline-kode for tekniske termer (`Next.js App Router`, `Resend`, `Cloudflare Pages`). Første gang en teknisk term dukker opp, forklar kort i parentes for HR-leseren. Eksempel: "`agent-orkestrering` (å koordinere flere AI-verktøy slik at de jobber mot samme mål uten å overlappe)". Etter første nevnelse, dropp parentesen.

### Beslutninger jeg tok
3-5 punkter. Hvert punkt: fet ledesetning med valget, deretter 1-3 setninger med alternativet og hvorfor valget falt. Bare beslutninger du selv tok. Minst én bør handle om agent-workflow (når brukes Claude Code versus Codex, hvor mye autonomi de fikk, hvilke prompts ble standardisert).

### Hva jeg lærte
Ærlig refleksjon basert på svakhetene over. To til tre konkrete poenger. Et om arkitektur eller struktur. Et om agent-workflow (når stoler man på dem, når må man overprøve). Ikke avslutt med en oppløftende setning. "Det er ikke noe jeg er stolt av, men det funker" er en gyldig avslutning.

Lengde-mål: 4-8 linjer per seksjon.

Hvis et felt mangler fakta, skriv `[TRENGER MER FAKTA: <hva>]` heller enn å fylle på.

## Screenshots og visuals

Krøll-prosjektet er en webapp, så standard webapp-strategi gjelder:

- Bruk Playwright via MCP. Viewport 1440x900.
- Ta hero-side, booking-flyt, galleri eller stylist-profiler, og 1-2 andre nøkkelvisninger.
- Fyll inn realistiske norske test-data (salong-navn, stylist-navn, behandlings-tider) FØR du tar bildet. Ingen "test test asdf" i screenshots.
- Filnavn: beskrivende, kebab-case (`kroll-hero.png`, `kroll-booking.png`, `kroll-stylist-detail.png`).
- Lagre bildene i `kroll-screenshots/` i krøll-roten, så Deqa finner dem.
- Når de skal opp på deqa.no: kopier til `deqa-portfolio/public/projects/kroll/` og referer med `![alt-tekst](/projects/kroll/<fil>.png)` i mdx.

**Bonus for dette prosjektet**: hvis du har skjermopptak eller transkripsjon av en agent-sesjon som demonstrerer workflowen, lagre den også. Den trenger ikke ende på siden, men kan bli en "behind the scenes"-del hvis Deqa vil.

Markdown-syntaks generelt: `![beskrivende alt-tekst](./mappe/filnavn.png)`. Plasser bilder mellom seksjoner der de støtter teksten, ikke som en stripe på slutten.

## Sjekk før du leverer
Gå gjennom outputten din én gang og fjern alt som matcher forbudte fraser, ord og mønstre. Sjekk spesielt:
- Tankestreker (—). Bytt til komma eller punktum.
- Trippel-konstruksjoner.
- "Jeg lærte mye om X".
- Oppløftende sluttsetninger.
- Tomme skryteadjektiv uten tall bak.
- "AI" som magisk substantiv. Skriv heller hva agenten faktisk gjorde.

Skriv om før du svarer hvis du finner noe.

---

**Sist oppdatert:** mai 2026. Hvis stemme, workflow eller case study-prompten endrer seg på deqa.no, oppdater fila først der og kopier ut hit etterpå.
