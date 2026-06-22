# forty-two.it

The website for **fortytwo** — a local-first personal-assistant spine for the
agents and tools you already use. The umbrella is fortytwo; the components carry
Hitchhiker's-Guide codenames: **vogon** (gate), **guide** (memory),
**babelfish** (telegram), **ford** (persona), **magrathea** (cli),
**subetha** (marketplace), **deepthought** (cognition).

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
> Cloudflare Pages the same command writes `dist/`. `wrangler.toml` points Pages
> at `dist` and overrides the dashboard "Build output directory" setting.

**CLI (one-off / manual, from a local build):**

```bash
bun run generate
wrangler pages deploy .output/public --project-name=justfortytwo-website
```

`wrangler.toml` pins `pages_build_output_dir = "dist"` and
`compatibility_date = "2025-07-15"` (kept in sync with `nuxt.config.ts`).

### CI (GitHub Actions)

`.github/workflows/deploy.yml` builds and deploys on every push to `main`:
`bun install --frozen-lockfile` → `bun run verify` →
`cloudflare/wrangler-action@v3` `pages deploy`. To enable it, add these
repository secrets:

- `CLOUDFLARE_API_TOKEN` — a token with the *Cloudflare Pages* Edit permission
- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account ID

Until both secrets are set, the workflow will fail at the deploy step (the
build/verify steps still run).

## Docs

- [Design system](docs/design-system.md) — color, type, the "42" monument, components
- [UX/UI principles](docs/ux-ui-principles.md) — behavior, voice, accessibility
- [Homepage spec](docs/superpowers/specs/2026-06-22-website-homepage-design.md) — scope + decisions
- [Homepage mockup](docs/design/homepage-v1.html) — approved v1 concept (open in a browser)

## Status

Homepage in design (v1 approved). Other sections to follow.

© 2026 justfortytwo · MIT. Not affiliated with Anthropic.
