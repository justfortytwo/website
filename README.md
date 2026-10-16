# forty-two.it

The website for **fortytwo** — continuity and personal-assistant infrastructure
(memory, identity, time, channels) around the coding agent you already use. It
does not replace the agent runtime or reimplement its tools, permissions or
integrations. Claude Code is the first supported runtime.

> *The answer is 42. The hard part is knowing the right question.*

## Stack

Nuxt 4 (SSG) · bun · Cloudflare Pages · hand-written CSS + design tokens ·
self-hosted fonts (IBM Plex Mono + Newsreader).

## Develop / Build / Verify / Deploy

```bash
bun install        # install deps
bun run dev        # local dev server (http://localhost:3000)
bun run generate   # static SSG build -> .output/public
bun run verify     # generate + structural/SEO/no-motion checks
```

`bun run verify` runs `nuxi generate` then `scripts/checks.mjs`. Expect
`✅ all checks passed`. The static output lives in `.output/public`
(`index.html` + hashed assets, `sitemap.xml`, `robots.txt`, `llms.txt`).

### Cloudflare Pages

This site deploys as a static Nuxt SSG to Cloudflare Pages.

**Dashboard (recommended for first deploy):**
- Framework preset: **Nuxt** (or "None" — Nuxt is pre-built)
- Build command: `npm install -g bun && bun install && bun run generate`
- Build output directory: **`dist`** (Cloudflare sets `CF_PAGES=1`, so Nitro
  auto-selects the cloudflare-pages preset and writes `dist/` — not `.output/public`,
  which is what `nuxi generate` produces locally)
- Environment: `SKIP_DEPENDENCY_INSTALL=1`, `NODE_VERSION=20`

> **Output-dir note:** locally `bun run generate` writes `.output/public`; on
> Cloudflare Pages the same command writes `dist/`. Set **Build output directory
> = `dist`** in the Pages dashboard (it's intentionally not pinned in
> `wrangler.toml`, so the dashboard owns it).

**CLI (one-off / manual, from a local build):**

```bash
bun run generate
wrangler pages deploy .output/public --project-name=justfortytwo-website
```

`wrangler.toml` holds only `name` + `compatibility_date`; the build output
directory (`dist`) is configured in the Pages dashboard.

## Docs

- [Design system](docs/design-system.md) — color, type, the "42" monument, components
- [UX/UI principles](docs/ux-ui-principles.md) — behavior, voice, accessibility
- [Homepage spec](docs/superpowers/specs/2026-06-22-website-homepage-design.md) — v2 information architecture and decisions (v1 superseded)
- [Homepage mockup](docs/design/homepage-v1.html) — superseded v1 concept, kept for visual reference

## Status

Homepage v2 (continuity narrative) implemented. See the homepage spec for the information architecture.

© 2026 justfortytwo · MIT. Not affiliated with Anthropic.
