# Spec — forty-two.it homepage (v2: continuity narrative)

- **Date:** 2026-06-22
- **Status:** v2 implemented. v1 (decomposition-first, gate-centred) is superseded; its design decisions D1–D8 still hold.
- **Repo:** `git@github.com:justfortytwo/website.git` (Nuxt 4 SSG, bun, Cloudflare Pages)
- **Living docs:** [`docs/design-system.md`](../../design-system.md) · [`docs/ux-ui-principles.md`](../../ux-ui-principles.md) · mockup [`docs/design/homepage-v1.html`](../../design/homepage-v1.html)

## Context

`fortytwo` adds continuity and personal-assistant infrastructure (memory,
identity, session continuity, time, channels) around an existing coding agent.
It does **not** reimplement what the runtime owns: reasoning, planning, tools,
MCP, plugins, skills, browser/computer use, model choice, or native permissions.
Claude Code is the first supported runtime, not the product boundary. The
runtime owns tool permissions; Gate is an optional policy hook; channels such as
Telegram carry messages and identity and never grant approvals.

Copy is sourced from the sibling package READMEs (see `source` on each item in
`app/data/status.ts`). This site is the **English, SEO/GEO-oriented marketing +
orientation surface**.

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

## Homepage information architecture (v2)

Visitor questions, in order: why, what it adds, what stays with the agent, what
it feels like, how it fits, what works, how to start.

1. **Top bar** — wordmark; nav: Boundary · Architecture · Status · Quick start · GitHub ↗.
2. **Hero `// 01`** — h1 *"Your coding agent is already powerful."*, bronze italic *"fortytwo makes it personal, persistent, and always there."*, body, copyable `npx @justfortytwo/installer init`, runtime note *"Claude Code is the first supported runtime. More can follow."*. Right: the 42 monument.
3. **The boundary `// 02`** — *"Don't reinvent the agent."* Two-column contrast (the agent already knows how to / fortytwo makes it possible to), the *inherit improvements, not compete* line, and the ecosystem aside. (`BoundaryContrast`, `data/boundary.ts`)
4. **What it adds `// 03`** — Memory, Identity, Continuity, Time, Channels, Your ecosystem; 3×2 hairline grid with the implementing packages as a quiet mono hint. (`ConceptGrid`, `data/concepts.ts`)
5. **In use `// 04`** — four beats: phone, a day later, while away, over weeks. (`SceneList`, `data/scenes.ts`)
6. **Architecture `// 05`** — fortytwo → runtime adapter → agent runtime (Claude Code today) → native tools / MCP·plugins·skills; optional Gate and salience called out as off the normal path; then *Under the hood*: packages grouped core / optional / bootstrap. (`ArchitectureDiagram`, `PackageGroups`)
7. **Principles `// 06`** — six, led by *"Use the agent you already trust."* (`PrincipleGrid`)
8. **What works today `// 07`** — shipped / optional / known-edge rows, each verified against a sibling README. (`StatusList`, `data/status.ts`)
9. **Quick start `// 08`** — `init` → `start` → `pair`, then `/login <code>` in Telegram: *"Open Telegram. Say hello."*
10. **Motto** — `STAY CALM` + *"The answer is 42. The hard part is knowing the right question."* + gradient `42`.
11. **Footer** — © 2026 · MIT; links; "Not affiliated with Anthropic."

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
