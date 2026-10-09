# AGENTS.md

Guidance for AI coding agents working in this repo (`justfortytwo/website`).

## What this is

The marketing site for **fortytwo** (https://forty-two.it): a local-first
personal-assistant spine distributed as the `@justfortytwo/*` packages. Today it
is a single static homepage (`/`). Nuxt 4 in SSG mode, built with bun, deployed
to Cloudflare Pages. Hand-written CSS with design tokens, self-hosted fonts
(IBM Plex Mono + Newsreader via `@fontsource`). MIT.

## Layout

```
app/
  app.vue, layouts/default.vue   shell (SiteHeader / SiteFooter)
  pages/index.vue                the only page: SEO meta, JSON-LD, all sections
  components/                    TheMonument (the "42"), DecompChart, StatusPanel,
                                 StatusPill, PrincipleGrid, TerminalBlock, SectionLabel, ...
  data/                          content as typed TS: site.ts, components.ts,
                                 principles.ts, status.ts (milestones)
  assets/css/tokens.css, base.css  global CSS (registered in nuxt.config.ts)
public/                          favicon, og.png, llms.txt (served as-is)
scripts/checks.mjs               post-build structural/SEO/no-motion checks
test/data.spec.ts                vitest tests over app/data/*
docs/                            design-system.md, ux-ui-principles.md,
                                 homepage spec/plan, approved mockup (homepage-v1.html)
nuxt.config.ts, wrangler.toml, vitest.config.ts
```

## Commands (from package.json)

```bash
bun install          # also runs `nuxt prepare` (postinstall) -> generates .nuxt/ tsconfigs
bun run dev          # dev server, http://localhost:3000
bun run test         # vitest run (test/**/*.spec.ts, node env)
bun run generate     # static build -> .output/public
bun run checks       # node scripts/checks.mjs (requires a prior generate)
bun run verify       # generate + checks; expect "✅ all checks passed"
bun run build / preview
```

There is no lint or typecheck script and no CI workflow in this repo. Before
finishing a change, run `bun run test` and `bun run verify`.

## Architecture notes

- **Content lives in `app/data/*.ts`, markup in components.** Edit copy, nav,
  component list, principles, or milestone status in the data files rather than
  hardcoding strings in templates.
- `nuxt.config.ts` prerenders only `/` with `crawlLinks: false`. Nav links point
  at `/#anchors` or GitHub. If you add a page, add its route to
  `nitro.prerender.routes`.
- SEO lives in `pages/index.vue` (`useSeoMeta`, canonical link, two JSON-LD
  blocks). Sitemap and robots come from `@nuxtjs/sitemap` / `@nuxtjs/robots`
  (`site.url` in nuxt.config).
- `tsconfig.json` only references `.nuxt/` configs, so run `bun install` (or
  `nuxt prepare`) before relying on types.

## Hard constraints (enforced by tests/checks)

`scripts/checks.mjs` fails the build if the generated HTML/CSS:
- lacks `lang="en"`, exactly one `<h1>`, "The answer is", section labels
  `// 01`..`// 05`, all seven component names, or the "Ask the right question" motto;
- lacks `<title>`, meta description, `og:image`, JSON-LD, canonical, or a
  sitemap reference in `robots.txt`;
- contains any of `text-shadow`, `box-shadow`, `@keyframes`, `animation:`,
  `transition:`, `filter:blur` in compiled CSS. **No motion, no shadows.**

`test/data.spec.ts` requires:
- components in exact order: gate, memory, salience, telegram, persona,
  installer, marketplace, each with `name`, `pkg`, `description` (>10 chars);
- **no Hitchhiker's-Guide codenames** (vogon, babelfish, magrathea, subetha,
  deepthought) anywhere in components data. Public names only;
- 6 principles; milestone M1 `done`, M2 `wip`; `site.lang === 'en'`,
  `site.org === 'justfortytwo'`.

If you intentionally change any of these, update the test/check in the same change.

## Design conventions (see docs/design-system.md, docs/ux-ui-principles.md)

- Background is always paper; never a dark UI theme (the terminal block is the exception).
- Two type families only: Newsreader + IBM Plex Mono. No third family, no icon
  fonts, no emoji in chrome.
- Gradients only on the "42" monument/wordmark, flat metallic fills.
- Interactivity is signalled by instant color/border change, never movement.
- Use the CSS tokens in `tokens.css`; don't introduce a CSS framework.

## Gotchas

- Output dir differs by environment: locally `generate` writes `.output/public`;
  on Cloudflare Pages (`CF_PAGES=1`) Nitro writes `dist/`. The Pages dashboard
  owns the output dir; `wrangler.toml` intentionally only has `name` +
  `compatibility_date`. Don't pin it there.
- `checks.mjs` reads `.output/public`; run `generate` first.
- The README still lists the codenames; the site itself must not use them.
- `.wolf/`, `.codegraph/`, `.superpowers/` are gitignored local tooling.
- Site copy states Node >= 20 as the product requirement; keep it consistent if editing.

## Sibling repos (../ in the justfortytwo workspace)

Each is a separate git repo; don't modify them from here. The packages the site
describes: `gate`, `memory`, `salience`, `telegram`, `persona`, `installer`,
`marketplace`. Also present: `runner` (`@justfortytwo/runner`, Claude Code
lifecycle layer), `scheduler` (`@justfortytwo/scheduler`, durable jobs daemon),
and `docs` (cross-cutting design docs). When site copy describes a package,
the package's own README is the source of truth.

## fortytwo project context

This repository is part of **fortytwo**, a local-first personal-assistant spine built around existing agent runtimes and tool ecosystems.

The umbrella project is **fortytwo**. It is not intended to replace Claude Code, Codex, MCP servers, plugins, skills, or other agent runtimes. The project provides the durable personal-assistant infrastructure around them: memory, lifecycle, scheduling, channels, optional policy enforcement, and related supporting components.

Claude Code is currently the primary/reference runtime, but the architecture should avoid unnecessary coupling to a specific model provider. In particular, components should remain usable when Claude Code itself is configured against alternative compatible model providers.

The main bootstrap and lifecycle entry point is the **installer** repository (`justfortytwo/installer`).

### Canonical project locations

- Website: `forty-two.it`
- GitHub organization: `github.com/justfortytwo`
- Architecture/design documentation: `justfortytwo/docs`

### Repositories

The fortytwo project is intentionally split into small, focused repositories.

- **`justfortytwo/installer`**
  Main installer and lifecycle CLI (`create-fortytwo` / `fortytwo`). This is the primary bootstrap entry point for assembling a fortytwo installation.

- **`justfortytwo/runner`**
  Thin Claude Code process/session runtime. Owns process lifecycle and stream transport, including one-shot runs and persistent interactive sessions. It must not become an agent framework.

- **`justfortytwo/memory`**
  Durable semantic-memory MCP server backed by local storage and retrieval infrastructure.

- **`justfortytwo/scheduler`**
  Durable scheduling and proactive job execution. Owns *when* work should happen, not how the agent reasons about or performs that work.

- **`justfortytwo/telegram`**
  Telegram transport/channel adapter. Owns Telegram identity, pairing, message transport, attachment handling, and mapping chats to live agent sessions. It should delegate agent process lifecycle to `runner`.

- **`justfortytwo/persona`**
  Persona and context templates rendered by the installer into an individual fortytwo installation.

- **`justfortytwo/gate`**
  Optional external safety/policy enforcement layer for tool execution and approvals. Keep this separate from the agent runtime's own reasoning and permissions.

- **`justfortytwo/salience`**
  Optional model-driven salience extraction used to enrich durable memory.

- **`justfortytwo/marketplace`**
  Claude Code plugin marketplace and umbrella plugin used as a distribution surface for fortytwo components.

- **`justfortytwo/docs`**
  Cross-repository architecture, design, contracts, and project documentation.

- **`justfortytwo/website`**
  Public website for the project, served as `forty-two.it`.

- **`justfortytwo/.github`**
  GitHub organization metadata and shared organization-level project information.

### Cross-repository architecture

When changing one repository, treat the sibling repositories as parts of the same system.

The intended high-level ownership is:

```text
channels / scheduler
        |
        v
      runner
        |
        v
   agent runtime
  (Claude Code today)
        |
        +---- MCPs / plugins / skills / tools
        |
        +---- fortytwo memory

optional surrounding components:
- gate
- salience

bootstrap / distribution / documentation:
- installer
- persona
- marketplace
- docs
- website
```

A useful rule when deciding where code belongs:

> fortytwo should add continuity and infrastructure around an existing agent, not reimplement capabilities already owned by the agent runtime or its MCP/plugin ecosystem.

Examples:

- agent reasoning, planning, subagents, tools, MCP orchestration, and plugins belong to the agent runtime;
- Claude process/session lifecycle belongs to `runner`;
- durable memory belongs to `memory`;
- durable time and scheduled execution belong to `scheduler`;
- Telegram transport and Telegram identity belong to `telegram`;
- installation and lifecycle management belong to `installer`;
- browser automation should normally come from an existing MCP/plugin rather than a fortytwo-specific browser implementation.

Before introducing a new abstraction, check the relevant sibling repositories and the agent runtime's existing capabilities to avoid duplicating functionality elsewhere in the fortytwo stack.
