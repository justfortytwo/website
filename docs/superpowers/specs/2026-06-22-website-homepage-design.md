# Spec — forty-two.it homepage (v0.1)

- **Date:** 2026-06-22
- **Status:** Design approved; spec pending review
- **Repo:** `git@github.com:justfortytwo/website.git` (Nuxt 4 SSG, bun, Cloudflare Pages)
- **Living docs:** [`docs/design-system.md`](../../design-system.md) · [`docs/ux-ui-principles.md`](../../ux-ui-principles.md) · mockup [`docs/design/homepage-v1.html`](../../design/homepage-v1.html)

## Context

`fortytwo` is a local-first personal-assistant spine around Claude
Code, being open-sourced as composable pieces under the `justfortytwo` org. The
umbrella is **fortytwo**; components are named for the role they play: **gate**,
**memory**, **salience**, **telegram**, **persona**, **installer**, and
**marketplace**. Copy is sourced from the org profile README and component READMEs.

This site is the **English, SEO/GEO-oriented marketing + orientation surface**.
Homepage first; other sections follow.

## Non-goals (this cycle)

- Other pages (Components, Principles, Docs index) — scaffold nav only.
- Non-English locales.
- Blog, search, analytics dashboards.
- i18n routing machinery.

## Design decisions (locked in brainstorm)

| # | Decision | Chosen | Rejected |
|---|---|---|---|
| D1 | Visual direction | **A · GUIDE** — warm paper, bronze reserved for the 42 | dark "Midnight", split "Eclipse" |
| D2 | Type system | **B · GUIDE** — IBM Plex Mono (chrome/42/system) + Newsreader (headlines/body) | all-mono, mono+grotesk |
| D3 | Homepage shape | **Field Manual** (synthesized after rejecting 3 IA wireframes as uninspiring) — hero wow + component centerpiece + scannable | long-form-only, hub-only |
| D4 | The "42" | CSS-rendered **monument** (stacked-solid-layer extrusion, no shadow/glow) | raster PNG in hero |
| D5 | Motion | **None** | reveals, transitions, parallax |
| D6 | Styling | **Hand-written CSS + design tokens** (CSS vars) | Tailwind/utility framework |
| D7 | Fonts | **Self-hosted via Fontsource** | Google Fonts CDN |
| D8 | References absorbed | Hermes (asymmetric hero, big serif, wordmark closer) + OpenClaw (terminal install, mono chrome) | copying either |

## Homepage information architecture

1. **Top bar** — bronze-square `fortytwo` wordmark; nav: Components · Principles · Docs · GitHub ↗; hairline rule.
2. **Hero** *(asymmetric)* — left: `// 01 — the answer`, headline *"The answer is fortytwo."*, italic *"The hard part is knowing the right question."*, lede, terminal CTA (`$ npm create fortytwo`) + ghost *"Read the brief →"*. Right: the **42 monument** on a blueprint field with mono annotations.
3. **Quick start** `// 02` — terminal block (`npm create fortytwo` → `init`/`doctor`; plugin marketplace path) + "Two surfaces, one operator" note.
4. **The decomposition** `// 03` — *"Seven parts. One spine."* → 7 codename cards (gate…salience) in a hairline grid, closed by the dark `fortytwo` umbrella bar.
5. **Principles** `// 04` — *"Conservative by design."* → 3×2 grid (local-first, BYO agent, conservative autonomy, propose-only learning, prompt-injection boundaries, auditable evolution).
6. **Status** `// 05` — M1 done / M2 in progress, two columns, status pills.
7. **Motto** — `STAY CALM` stamp + *"Ask the right question. Never cross the gate silently."* + giant gradient `42`.
8. **Footer** — © 2026 justfortytwo · MIT; links; "Not affiliated with Anthropic."

## Tech stack

- **Nuxt 4** in SSG mode (`nuxi generate` → static output).
- **bun** as package manager + script runner (no npm/pnpm).
- **Cloudflare Pages** as the deploy target (static assets; no server functions this cycle).
- **Styling:** hand-written CSS, tokens as `:root` CSS custom properties (per design-system.md §2). No Tailwind.
- **Fonts:** `@fontsource` packages for IBM Plex Mono + Newsreader (self-hosted, no external requests).
- **Content:** homepage content as typed data/markdown so the same primitives reuse on future pages.

## SEO / GEO

- Semantic landmark HTML; one `<h1>`; ordered heading outline.
- Per-page `<title>`, meta description, canonical; OG + Twitter cards.
- JSON-LD: `Organization` (justfortytwo) + `SoftwareApplication` (fortytwo).
- `/llms.txt` describing the project for generative engines; inverted-pyramid copy (answer first).
- `sitemap.xml` + `robots.txt` via Nuxt SSG; clean lowercase URLs.
- `lang="en"`; English-only.

## Assets

- Favicon + OG/social cards generated from the canonical `fortytwo.png` mark.
- The hero 42 is CSS (D4); no heavy hero image (keeps LCP text-bound).

## Accessibility

- WCAG AA contrast; visible focus; skip link; status conveyed by dot + word, never color alone; trivially satisfies `prefers-reduced-motion` (no motion).

## Acceptance criteria

1. `bun run dev` serves the homepage matching `docs/design/homepage-v1.html` in the locked system (paper/bronze/Plex Mono+Newsreader), responsive to mobile.
2. `bun run generate` produces a fully static build; no runtime server required.
3. Deploys clean to Cloudflare Pages (static).
4. Lighthouse: Performance / Accessibility / SEO all green; LCP text-bound.
5. No motion, no shadow, no glow anywhere (automated grep-style check on CSS: no `text-shadow`/`box-shadow`/`blur`/animation utilities on chrome).
6. Valid HTML; one `<h1>`; JSON-LD validates; sitemap + robots present.
7. `docs/design-system.md` + `docs/ux-ui-principles.md` committed and reflected in the build.

## Risks / open

- Newsreader's optical-size axis needs `font-variation-settings` tuning across the scale (build-time detail).
- The 42 monument must be rebuilt in production CSS to match the mockup's stacked-extrusion exactly (no fallback to shadow).
- Cloudflare Pages build image must support bun (it does; pin a version).
