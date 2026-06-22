# fortytwo Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the approved fortytwo homepage (`docs/design/homepage-v1.html`) as a Nuxt 4 SSG site built with bun, deployable to Cloudflare Pages, in the locked design system.

**Architecture:** Nuxt 4 (SSG via `nuxi generate`) → static `.output/public`. Design lives in hand-written CSS driven by `:root` tokens (no Tailwind). Fonts self-hosted via Fontsource. Homepage content is typed data (`app/data/*`) consumed by small, reusable components — so the next pages (Components, Principles, Docs) compose from the same primitives. SEO/GEO via `useSeoMeta` + JSON-LD + `llms.txt` + `@nuxtjs/sitemap`/`@nuxtjs/robots`. Tests: fast vitest unit tests on the data, plus a build-output assertion script that checks the *generated* HTML and enforces the no-motion/no-shadow rule.

**Tech Stack:** Nuxt 4, bun, TypeScript, Fontsource (IBM Plex Mono + Newsreader), `@nuxtjs/sitemap`, `@nuxtjs/robots`, vitest, Cloudflare Pages (static).

**Spec:** `docs/superpowers/specs/2026-06-22-website-homepage-design.md`
**Design system:** `docs/design-system.md` · **UX/UI:** `docs/ux-ui-principles.md` · **Mockup:** `docs/design/homepage-v1.html`

---

## File structure

```
justfortytwo-website/
  nuxt.config.ts                 # SSG, modules, global css, site url, nitro static
  package.json                   # bun, scripts: dev/build/generate/test/checks/verify
  tsconfig.json                  # extends .nuxt/tsconfig.json
  app/
    app.vue                      # <NuxtLayout><NuxtPage/></NuxtLayout> + global seo defaults
    assets/css/
      tokens.css                 # :root design tokens (design-system.md §2)
      base.css                   # reset + base typography + shared primitives (section-label, pill, terminal)
    data/
      site.ts                    # org/site identity, nav, footer, motto
      components.ts              # the 7 codenames (vogon…deepthought)
      principles.ts              # the 6 principles
      status.ts                  # M1 / M2 milestones
    components/
      SiteHeader.vue             # wordmark + nav + hairline
      SiteFooter.vue             # mono footer
      SectionLabel.vue           # `// NN — title` primitive
      TerminalBlock.vue          # dark terminal inset primitive
      StatusPill.vue             # hollow pill + dot (ok/wip)
      TheMonument.vue            # the bronze "42" (stacked-solid extrusion, no shadow)
      DecompChart.vue            # renders components.ts → grid + umbrella bar
      PrincipleGrid.vue          # renders principles.ts → 3-col grid
      StatusPanel.vue            # renders status.ts → M1/M2 columns
    pages/
      index.vue                  # composes hero + quick-start + decomp + principles + status + motto
  public/
    favicon.svg                  # bronze square "42" mark
    og.png                       # social card (from fortytwo.png)
    llms.txt                     # GEO
  scripts/
    checks.mjs                   # post-generate assertions: structure, SEO, one-h1, no-motion
  test/
    data.spec.ts                 # unit tests on data/* shapes
```

**Responsibilities & boundaries:** `app/data/*` is the single source of content (DRY — future pages reuse it). Components are presentational and receive data via props or import the data module directly for app-config-style singletons. CSS tokens are the single source of color/type; components use scoped styles that reference tokens. `scripts/checks.mjs` is the guard for the two hardest-to-unit-test acceptance criteria (SEO structure + no-motion/no-shadow).

---

## Conventions

- **Package manager:** bun only. `bun add`, `bun run`, `bun x`.
- **Styling:** scoped `<style>` in components referencing `var(--token)`; shared primitives (`.section-label`, `.terminal`, `.pill`) in `base.css`. **No Tailwind.**
- **Motion policy (hard rule):** no `transition`, `animation`, `@keyframes`, `text-shadow`, `box-shadow`, or `filter: blur()` anywhere. `scripts/checks.mjs` fails the build if any appear in compiled CSS.
- **Bronze rule:** bronze (`--bronze-*`) only on the 42, wordmark, DON'T PANIC stamp, "in progress" status, hover links, and `//` index numerals.
- **Commits:** one per task, conventional commits (`feat:`, `chore:`, `test:`, `docs:`).

---

## Task 1: Scaffold Nuxt 4 + bun (without clobbering docs)

**Files:**
- Create: `package.json`, `nuxt.config.ts`, `tsconfig.json`, `app/app.vue`, `.gitignore` (merge)
- Temp: scaffold into `/tmp/ftw-init`, copy Nuxt files over

- [ ] **Step 1: Scaffold Nuxt into a temp dir (non-interactive)**

```bash
cd /Users/enricodeleo/Development/opensource/justfortytwo-website
rm -rf /tmp/ftw-init
bun x nuxi@latest init /tmp/ftw-init --package-manager bun --no-install --git false
```
Expected: `/tmp/ftw-init` contains `package.json`, `nuxt.config.ts`, `tsconfig.json`, `app/app.vue`, `app/assets/`, etc. If nuxi prompts, ensure flags suppress it; do not run it inside the project dir (it would clobber `docs/`, `README.md`, `.git`). (If your nuxi version rejects `--git false`, use `--no-git` instead.)

- [ ] **Step 2: Copy Nuxt files into the project (preserve docs/README/.git)**

```bash
cp /tmp/ftw-init/package.json ./package.json
cp /tmp/ftw-init/nuxt.config.ts ./nuxt.config.ts
cp /tmp/ftw-init/tsconfig.json ./tsconfig.json
mkdir -p app && cp -R /tmp/ftw-init/app/* ./app/ 2>/dev/null || true
# merge .gitignore lines from the scaffold if useful (node_modules/.nuxt/.output already present)
```

- [ ] **Step 3: Pin package.json scripts + name**

Edit `package.json`:
```json
{
  "name": "justfortytwo-website",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "nuxi build",
    "dev": "nuxi dev",
    "generate": "nuxi generate",
    "preview": "nuxi preview",
    "test": "vitest run",
    "checks": "node scripts/checks.mjs",
    "verify": "bun run generate && bun run checks"
  },
  "devDependencies": {
    "nuxt": "^4.0.0",
    "vitest": "^3.0.0"
  }
}
```
(Merge with whatever versions nuxi wrote; keep nuxt ^4.)

- [ ] **Step 4: Install dependencies**

```bash
bun install
```
Expected: `node_modules/` created, no errors.

- [ ] **Step 5: Smoke test dev + generate**

```bash
bun run dev --port 4242 &  # visit http://localhost:4242, see the default Nuxt welcome
# kill it, then:
bun run generate
ls .output/public/index.html
```
Expected: `.output/public/index.html` exists (static build works).

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "chore: scaffold Nuxt 4 + bun"
```

---

## Task 2: Design tokens + base CSS + self-hosted fonts

**Files:**
- Create: `app/assets/css/tokens.css`, `app/assets/css/base.css`
- Modify: `nuxt.config.ts` (register css + fonts), `package.json` (add fontsource)

- [ ] **Step 1: Add Fontsource font packages**

```bash
bun add @fontsource/ibm-plex-mono @fontsource/newsreader
```

- [ ] **Step 2: Write `app/assets/css/tokens.css`** (verbatim from design-system.md §2)

```css
:root{
  --paper:#F3EFE6; --paper-2:#ECE7DA;
  --ink:#15120C; --ink-2:#3A352B; --mute:#7A7466;
  --rule:#DCD5C5;
  --bronze-1:#E7C163; --bronze-2:#C99A3F; --bronze-3:#9A6F1E; --bronze-deep:#4D3A10;
  --navy:#16213E;
  --grid:#C9D2DC;
  --maxw:1160px;
  --ok:#3F7D4E;
  --font-serif:'Newsreader', Georgia, serif;
  --font-mono:'IBM Plex Mono', ui-monospace, monospace;
}
```

- [ ] **Step 3: Write `app/assets/css/base.css`** (reset + base type + shared primitives; port from mockup)

```css
@import '@fontsource/ibm-plex-mono/400.css';
@import '@fontsource/ibm-plex-mono/500.css';
@import '@fontsource/ibm-plex-mono/600.css';
@import '@fontsource/newsreader/400.css';
@import '@fontsource/newsreader/500.css';
@import '@fontsource/newsreader/400-italic.css';

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body{background:var(--paper);color:var(--ink);font-family:var(--font-serif);
  font-size:17px;line-height:1.6;-webkit-font-smoothing:antialiased}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 36px}
.mono{font-family:var(--font-mono)}
a{color:inherit;text-decoration:none}

/* shared primitive: section label */
.section-label{font-family:var(--font-mono);font-size:11px;letter-spacing:2px;
  text-transform:uppercase;color:var(--mute);display:flex;align-items:center;gap:12px;margin-bottom:18px}
.section-label .num{color:var(--bronze-3)}
.section-label::after{content:"";flex:1;height:1px;background:var(--rule);max-width:120px}

/* shared primitive: status pill */
.pill{display:inline-flex;align-items:center;gap:7px;font-family:var(--font-mono);
  font-size:11px;letter-spacing:1px;padding:5px 10px;border:1px solid var(--rule)}
.pill .dot{width:7px;height:7px;border-radius:50%}
.pill.ok{color:var(--ok)} .pill.ok .dot{background:var(--ok)}
.pill.wip{color:var(--bronze-3)} .pill.wip .dot{background:var(--bronze-3)}
```

- [ ] **Step 4: Register css + site url in `nuxt.config.ts`**

```ts
export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/tokens.css', '~/assets/css/base.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  site: { url: 'https://justfortytwo.org', name: 'fortytwo' },
});
```

- [ ] **Step 5: Verify in dev**

```bash
bun run dev
```
Expected: page background is paper (#F3EFE6), fonts load with no external network request to fonts.googleapis.com (check DevTools Network). Kill dev.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: design tokens, base css, self-hosted fonts"
```

---

## Task 3: Content data + data tests (TDD)

**Files:**
- Create: `app/data/site.ts`, `app/data/components.ts`, `app/data/principles.ts`, `app/data/status.ts`, `test/data.spec.ts`, `vitest.config.ts`

- [ ] **Step 1: Write the failing data tests (`test/data.spec.ts`)**

```ts
import { describe, it, expect } from 'vitest'
import { site } from '../app/data/site'
import { components } from '../app/data/components'
import { principles } from '../app/data/principles'
import { milestones } from '../app/data/status'

describe('site', () => {
  it('has english lang, motto, nav, footer', () => {
    expect(site.lang).toBe('en')
    expect(site.motto.join(' ')).toMatch(/Don't Panic/i)
    expect(site.nav.length).toBeGreaterThanOrEqual(3)
    expect(site.org).toBe('justfortytwo')
  })
})

describe('components data', () => {
  it('has the 7 codenames in canonical order', () => {
    expect(components.map(c => c.codename)).toEqual([
      'vogon','guide','babelfish','ford','magrathea','subetha','deepthought'
    ])
  })
  it('maps codenames to the right functions', () => {
    const m = Object.fromEntries(components.map(c => [c.codename, c.role]))
    expect(m).toEqual({
      vogon:'gate', guide:'memory', babelfish:'telegram',
      ford:'persona', magrathea:'cli', subetha:'marketplace', deepthought:'cognition'
    })
  })
  it('marks deepthought as in-design', () => {
    const dt = components.find(c => c.codename === 'deepthought')!
    expect(dt.state).toBe('design')
  })
  it('every component has codename, role, description', () => {
    for (const c of components) {
      expect(c.codename).toBeTruthy()
      expect(c.role).toBeTruthy()
      expect(c.description.length).toBeGreaterThan(10)
    }
  })
})

describe('principles data', () => {
  it('has 6 principles with title + body', () => {
    expect(principles).toHaveLength(6)
    for (const p of principles) {
      expect(p.title).toBeTruthy()
      expect(p.body.length).toBeGreaterThan(15)
    }
  })
})

describe('status data', () => {
  it('has M1 done and M2 in progress', () => {
    const byId = Object.fromEntries(milestones.map(m => [m.id, m]))
    expect(byId.M1.state).toBe('done')
    expect(byId.M2.state).toBe('wip')
  })
})
```

- [ ] **Step 2: Add `vitest.config.ts`**

```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: { environment: 'node', include: ['test/**/*.spec.ts'] },
})
```

- [ ] **Step 3: Run tests to verify they fail**

```bash
bun run test
```
Expected: FAIL — modules not found.

- [ ] **Step 4: Write `app/data/site.ts`**

```ts
export interface NavItem { label: string; href: string }
export const site = {
  name: 'fortytwo',
  org: 'justfortytwo',
  lang: 'en' as const,
  url: 'https://justfortytwo.org',
  github: 'https://github.com/justfortytwo',
  tagline: 'The hard part is knowing the right question.',
  motto: ["Don't Panic.", 'Ask the right question.', 'Never cross the gate silently.'],
  nav: [
    { label: 'Components', href: '/components' },
    { label: 'Principles', href: '/principles' },
    { label: 'Docs', href: '/docs' },
    { label: 'GitHub ↗', href: 'https://github.com/justfortytwo' },
  ] satisfies NavItem[],
  footer: {
    copyright: '© 2026 justfortytwo · MIT',
    disclaimer: 'Not affiliated with Anthropic.',
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/justfortytwo' },
      { label: 'Docs', href: '/docs' },
      { label: 'Marketplace', href: 'https://github.com/justfortytwo/marketplace' },
      { label: 'Security', href: '/security' },
    ] satisfies NavItem[],
  },
}
```

- [ ] **Step 5: Write `app/data/components.ts`** (copy lives exactly in the mockup)

```ts
export interface Component {
  codename: string
  role: string
  description: string
  state?: 'live' | 'design'
}
export const components: Component[] = [
  { codename:'vogon', role:'gate', description:'The PreToolUse safety gate. Every tool call passes through it — allow · defer · deny. Nothing crosses silently.' },
  { codename:'guide', role:'memory', description:'Semantic memory over SQLite, full-text and vector recall. Remembers what you’d want remembered — with provenance.' },
  { codename:'babelfish', role:'telegram', description:'The channel adapter. Talk to your assistant where you already are — mobile interface, approval cards, continuity.' },
  { codename:'ford', role:'persona', description:'Identity & context — CLAUDE.md + context/*. Who the assistant is, and who it serves. Scaffolded, never shipped filled.' },
  { codename:'magrathea', role:'cli', description:'The installer & lifecycle. init · doctor · update · rollback · enrich · forget. One operator over both surfaces.' },
  { codename:'subetha', role:'marketplace', description:'The Claude Code plugin marketplace. Install any part, à la carte, and keep it current.' },
  { codename:'deepthought', role:'cognition', description:'The reasoning layer.', state:'design' },
]
```

- [ ] **Step 6: Write `app/data/principles.ts`**

```ts
export interface Principle { title: string; body: string }
export const principles: Principle[] = [
  { title:'Local-first where it matters', body:'Private memory and recall live on your machine. Markdown for human-readable policy, SQLite for durable state.' },
  { title:'Bring your own agent', body:'Claude Code is the first harness, not the boundary. The core stays portable across agents, models, and runtimes.' },
  { title:'Conservative autonomy', body:'Ford may read, draft, and reason internally. External or irreversible actions require approval.' },
  { title:'Propose-only learning', body:'It may notice patterns — but never silently promotes them into durable behavior. Propose first, then approve.' },
  { title:'Prompt-injection boundaries', body:'Documents, messages, web pages and recalled memory are content, not command authority.' },
  { title:'Auditable evolution', body:'Every meaningful change is inspectable — as a file diff, a database record, or an approval decision.' },
]
```

- [ ] **Step 7: Write `app/data/status.ts`**

```ts
export interface Milestone { id: 'M1'|'M2'; label: string; state: 'done'|'wip'; title: string; body: string }
export const milestones: Milestone[] = [
  { id:'M1', label:'the spine', state:'done', title:'The spine is walking.',
    body:'Memory MCP, journal & registry, Telegram bridge, Claude Code cockpit, subagents & skills, PreToolUse gate, approval flow, durable jobs, restart-resilient operation.' },
  { id:'M2', label:'trust hardening', state:'wip', title:'Hardening the trust layer.',
    body:'Prompt-injection defense, source-authority classification, content-is-not-authority rules, tamper-evident audit, payload-bound approvals, typed memory governance, review/export/prune.' },
]
```

- [ ] **Step 8: Run tests to verify they pass**

```bash
bun run test
```
Expected: PASS (all data tests).

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: homepage content as typed data + tests"
```

---

## Task 4: Shared primitives (SectionLabel, TerminalBlock, StatusPill)

**Files:**
- Create: `app/components/SectionLabel.vue`, `app/components/TerminalBlock.vue`, `app/components/StatusPill.vue`

- [ ] **Step 1: `SectionLabel.vue`**

```vue
<script setup lang="ts">
defineProps<{ num: string; title: string }>()
</script>
<template>
  <div class="section-label">
    <span class="num">// {{ num }}</span><span>{{ title }}</span>
  </div>
</template>
```
(Note: styles live in `base.css` `.section-label`. The `.num` span already gets bronze via the shared rule — keep it.)

- [ ] **Step 2: `TerminalBlock.vue`** (port the `.term-block` styles from the mockup; scoped)

```vue
<script setup lang="ts">
defineProps<{ tag?: string }>()
</script>
<template>
  <div class="term-block">
    <div v-if="tag" class="head"><span class="d"></span><span class="d"></span><span class="d"></span>{{ tag }}</div>
    <slot />
  </div>
</template>
<style scoped>
.term-block{font-family:var(--font-mono);background:var(--ink);color:#cdc7b8;
  border-radius:5px;padding:20px 22px;font-size:13px;line-height:1.9}
.head{display:flex;align-items:center;gap:7px;color:#6f6a5b;font-size:10.5px;
  letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;padding-bottom:12px;
  border-bottom:1px solid #2a251a}
.head .d{width:9px;height:9px;border-radius:50%;border:1px solid #4a4334}
:deep(.pr){color:var(--bronze-1)}
:deep(.c){color:#7c8691}
:deep(.k){color:#e9e4d8}
:deep(.s){color:#5d6770}
</style>
```

- [ ] **Step 3: `StatusPill.vue`**

```vue
<script setup lang="ts">
defineProps<{ state: 'done'|'wip'; label: string }>()
</script>
<template>
  <span class="pill" :class="state === 'done' ? 'ok' : 'wip'">
    <span class="dot"></span>{{ label }}
  </span>
</template>
```
(Styles via shared `.pill` in `base.css`.)

- [ ] **Step 4: Verify in dev (render each on a scratch page temporarily, then remove)**

```bash
bun run dev
```
Eyeball that the three primitives render correctly. (No automated test for pure visual primitives — they're covered indirectly by the homepage output checks in Task 9.)

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: section-label, terminal-block, status-pill primitives"
```

---

## Task 5: TheMonument (the bronze "42")

**Files:**
- Create: `app/components/TheMonument.vue`

- [ ] **Step 1: Write `TheMonument.vue`** (port the monument block from `homepage-v1.html` exactly — stacked-solid extrusion, blueprint field, mono annotations; NO shadow/glow)

```vue
<template>
  <div class="monument" aria-hidden="true">
    <div class="grid-bg"></div>
    <div class="frame"></div>
    <div class="cross-v"></div><div class="cross-h"></div>
    <div class="ans42">
      <span class="extr e5">42</span><span class="extr e4">42</span>
      <span class="extr e3">42</span><span class="extr e2">42</span>
      <span class="extr e1">42</span>
      <span class="face">42</span>
    </div>
    <div class="annot a-top">ANSWER · ABSOLUTE</div>
    <div class="annot a-right">FIG. 042</div>
    <div class="annot a-bl">DEEP THOUGHT, 7.5M YR</div>
    <div class="annot a-br">★ CERTAINTY 1.0</div>
    <div class="tick top">042</div>
    <div class="tick bot">▾</div>
  </div>
</template>
<style scoped>
.monument{position:relative;aspect-ratio:1/.92;display:flex;align-items:center;justify-content:center}
.grid-bg{position:absolute;inset:6% 4%;
  background-image:linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px);
  background-size:30px 30px;opacity:.34}
.frame{position:absolute;inset:6% 4%;border:1px solid #b9c2cd}
.cross-v{position:absolute;left:50%;top:6%;bottom:6%;width:1px;background:#b9c2cd}
.cross-h{position:absolute;top:50%;left:4%;right:4%;height:1px;background:#b9c2cd}
.ans42{position:relative;font-family:var(--font-serif);font-weight:600;
  font-size:clamp(140px,26vw,300px);line-height:1;letter-spacing:-12px;z-index:3}
.ans42 .face{position:relative;
  background:linear-gradient(158deg,#F0D076 0%,var(--bronze-1) 22%,var(--bronze-2) 52%,var(--bronze-3) 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent}
.extr{position:absolute;top:0;left:0;z-index:1}
.extr.e1{transform:translate(2px,2px);color:#6e5213}
.extr.e2{transform:translate(4px,4px);color:#5a4310}
.extr.e3{transform:translate(6px,6px);color:#47340c}
.extr.e4{transform:translate(8px,8px);color:#352708}
.extr.e5{transform:translate(10px,10px);color:#241a05}
.annot{position:absolute;font-family:var(--font-mono);font-size:10px;letter-spacing:1.4px;
  color:var(--ink-2);z-index:4}
.annot::before{content:"";display:inline-block;width:14px;height:1px;background:var(--ink-2);
  vertical-align:middle;margin-right:6px}
.a-top{top:8%;left:6%}.a-right{top:30%;right:2%}.a-bl{bottom:9%;left:4%}
.a-br{bottom:7%;right:6%;color:var(--bronze-3)}
.a-br::before{background:var(--bronze-3)}
.tick{position:absolute;font-family:var(--font-mono);font-size:9px;color:var(--mute);z-index:4}
.tick.top{top:6%;left:50%;transform:translateX(-50%)}
.tick.bot{bottom:4%;left:50%;transform:translateX(-50%)}
</style>
```

- [ ] **Step 2: Verify against the mockup**

```bash
bun run dev
```
Render `<TheMonument />` on the scratch page. Compare to `docs/design/homepage-v1.html` (open the file directly). The numeral must be metallic bronze with a hard 5-layer extrusion; **no soft shadow**. Kill dev.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: the 42 monument (stacked-solid extrusion, no shadow)"
```

---

## Task 6: SiteHeader + SiteFooter

**Files:**
- Create: `app/components/SiteHeader.vue`, `app/components/SiteFooter.vue`

- [ ] **Step 1: `SiteHeader.vue`** (from `site.nav`)

```vue
<script setup lang="ts">
import { site } from '~/data/site'
</script>
<template>
  <header class="top">
    <div class="wrap row">
      <NuxtLink to="/" class="brand"><span class="dot"></span>{{ site.name }}</NuxtLink>
      <nav class="links">
        <NuxtLink v-for="item in site.nav" :key="item.href" :to="item.href">{{ item.label }}</NuxtLink>
      </nav>
    </div>
  </header>
</template>
<style scoped>
.top{border-bottom:1px solid var(--rule)}
.row{display:flex;align-items:center;justify-content:space-between;height:62px}
.brand{font-family:var(--font-mono);font-weight:600;letter-spacing:-.5px;font-size:17px;display:flex;align-items:center;gap:9px}
.brand .dot{width:9px;height:9px;background:linear-gradient(150deg,var(--bronze-1),var(--bronze-3))}
.links{display:flex;gap:26px;font-family:var(--font-mono);font-size:12.5px;color:var(--ink-2)}
.links a:hover{color:var(--bronze-3)}
</style>
```

- [ ] **Step 2: `SiteFooter.vue`** (from `site.footer`)

```vue
<script setup lang="ts">
import { site } from '~/data/site'
</script>
<template>
  <footer>
    <div class="wrap row">
      <span>{{ site.footer.copyright }}</span>
      <div class="f-links">
        <NuxtLink v-for="l in site.footer.links" :key="l.href" :to="l.href">{{ l.label }}</NuxtLink>
      </div>
      <span>{{ site.footer.disclaimer }}</span>
    </div>
  </footer>
</template>
<style scoped>
footer{border-top:1px solid var(--rule);padding:26px 0;font-family:var(--font-mono);font-size:12px;color:var(--mute)}
.row{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
.f-links{display:flex;gap:18px}
.f-links a:hover{color:var(--bronze-3)}
</style>
```

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: site header + footer"
```

---

## Task 7: Data-driven grids (DecompChart, PrincipleGrid, StatusPanel)

**Files:**
- Create: `app/components/DecompChart.vue`, `app/components/PrincipleGrid.vue`, `app/components/StatusPanel.vue`

- [ ] **Step 1: `DecompChart.vue`** — render `components.ts` into the hairline grid + dark umbrella bar. Port grid CSS from the mockup. Use `sp4`/`sp6` column spans: row1 = 3×sp4; row2 = 2×sp6; row3 = 2×sp6; then umbrella (sp12). Map the 7 components to those spans by index.

```vue
<script setup lang="ts">
import { components } from '~/data/components'
// span class per index in the approved layout
const spans = ['sp4','sp4','sp4','sp6','sp6','sp6','sp6']
const noRight = [2,4,6] // last cell of each row drops its right border
</script>
<template>
  <div class="chart">
    <div v-for="(c,i) in components" :key="c.codename" class="node" :class="[spans[i], { noright: noRight.includes(i) }]">
      <div class="cn">// 0{{ i+1 }}</div>
      <div class="name">{{ c.codename }}</div>
      <div class="role">{{ c.role }}</div>
      <div class="desc">{{ c.description }} <span v-if="c.state==='design'" class="design">— in design</span></div>
      <div class="mark">{{ c.state==='design' ? '·' : '▸' }}</div>
    </div>
    <div class="umbrella">
      <span class="u-l">// umbrella</span>
      <span class="u-n">fortytwo</span>
      <span class="u-r">the spine · v0 · MIT</span>
    </div>
  </div>
</template>
<style scoped>
.chart{position:relative;display:grid;grid-template-columns:repeat(12,1fr);border:1px solid var(--rule);background:var(--paper-2)}
.node{position:relative;padding:26px 24px;border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);background:var(--paper)}
.node.noright{border-right:none}
.node:hover{background:var(--paper-2)}
.cn{font-family:var(--font-mono);font-size:10px;color:var(--mute);letter-spacing:1.5px}
.name{font-family:var(--font-serif);font-weight:500;font-size:28px;letter-spacing:-.5px;margin:4px 0 2px}
.role{font-family:var(--font-mono);font-size:11px;color:var(--bronze-3);letter-spacing:.5px;text-transform:uppercase;margin-bottom:12px}
.desc{font-size:14px;color:var(--ink-2);line-height:1.45}
.design{color:var(--mute)}
.mark{position:absolute;top:18px;right:18px;font-family:var(--font-mono);font-size:11px;color:var(--rule)}
.sp4{grid-column:span 4} .sp6{grid-column:span 6}
.umbrella{grid-column:span 12;padding:22px 24px;display:flex;align-items:center;justify-content:space-between;
  background:var(--ink);color:#e9e4d8}
.u-l{font-family:var(--font-mono);font-size:11px;letter-spacing:1.5px;color:#8a8470}
.u-n{font-family:var(--font-serif);font-size:30px;font-weight:500}
.u-r{font-family:var(--font-mono);font-size:11px;color:#9a937f;letter-spacing:1px}
</style>
```

- [ ] **Step 2: `PrincipleGrid.vue`** — render `principles.ts` 3-up.

```vue
<script setup lang="ts">
import { principles } from '~/data/principles'
</script>
<template>
  <div class="prin-grid">
    <div v-for="(p,i) in principles" :key="p.title" class="p" :class="{ noright: (i+1)%3===0 }">
      <div class="pn">P · 0{{ i+1 }}</div>
      <h4>{{ p.title }}</h4>
      <p>{{ p.body }}</p>
    </div>
  </div>
</template>
<style scoped>
.prin-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--rule)}
.p{padding:28px 26px 30px;border-bottom:1px solid var(--rule);border-right:1px solid var(--rule)}
.p.noright{border-right:none}
.pn{font-family:var(--font-mono);font-size:11px;color:var(--bronze-3);letter-spacing:1.5px;margin-bottom:10px}
.p h4{font-family:var(--font-serif);font-weight:500;font-size:21px;letter-spacing:-.3px;margin-bottom:8px}
.p p{font-size:14px;color:var(--ink-2);line-height:1.5}
</style>
```

- [ ] **Step 3: `StatusPanel.vue`** — render `status.ts` using `<StatusPill>`.

```vue
<script setup lang="ts">
import { milestones } from '~/data/status'
</script>
<template>
  <div class="stat-grid">
    <div v-for="(m,i) in milestones" :key="m.id" class="stat" :class="{ left: i>0 }">
      <StatusPill :state="m.state" :label="`${m.id} — ${m.state==='done'?'DONE':'IN PROGRESS'}`" />
      <span class="tag">// {{ m.label }}</span>
      <span class="t">{{ m.title }}</span>
      <span class="d">{{ m.body }}</span>
    </div>
  </div>
</template>
<style scoped>
.stat-grid{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--rule)}
.stat{padding:30px 30px;display:flex;flex-direction:column;gap:8px}
.stat.left{border-left:1px solid var(--rule)}
.tag{font-family:var(--font-mono);font-size:11px;letter-spacing:1.5px;color:var(--mute)}
.t{font-family:var(--font-serif);font-size:30px;font-weight:500;letter-spacing:-.4px}
.d{font-size:14.5px;color:var(--ink-2)}
</style>
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: decomposition chart, principle grid, status panel"
```

---

## Task 8: Assemble the homepage (`app/pages/index.vue`)

**Files:**
- Create: `app/pages/index.vue`, `app/layouts/default.vue`
- Modify: `app/app.vue` (use layout + page)

- [ ] **Step 1: `app/layouts/default.vue`**

```vue
<template>
  <SiteHeader />
  <main><slot /></main>
  <SiteFooter />
</template>
```

- [ ] **Step 2: `app/app.vue`**

```vue
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 3: Write `app/pages/index.vue`** — port the full homepage from the mockup, composing the components above. Copy is the source of truth (matches `homepage-v1.html`).

```vue
<script setup lang="ts">
// SEO is added in Task 9; nothing else needed here yet.
</script>
<template>
  <div>
    <!-- HERO -->
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <div class="section-label"><span class="num">// 01</span><span>the answer</span></div>
          <h1>The answer is<br><span class="forty">forty<span class="two">two</span>.</span></h1>
          <p class="q">The hard part is knowing<br>the right question.</p>
          <p class="lede"><b>fortytwo</b> is a local-first personal-assistant spine for the agents and tools you already use. It wraps an existing harness with <b>memory, a safety gate, channels, approvals, and audit</b> — without replacing the agent you trust.</p>
          <div class="cta-row">
            <div class="term"><span class="pr mono">$</span><span class="inst mono">npm create fortytwo</span><span class="c mono">⏎</span></div>
            <NuxtLink class="ghost mono" to="/docs">Read the brief <span class="ar">→</span></NuxtLink>
          </div>
        </div>
        <TheMonument />
      </div>
    </section>

    <!-- QUICK START -->
    <section>
      <div class="wrap">
        <div class="section-label"><span class="num">// 02</span><span>quick start</span></div>
        <div class="qs-grid">
          <TerminalBlock tag="install · magrathea">
            <div class="s"># bring the spine to your machine</div>
            <div><span class="pr">$</span> <span class="k">npm create fortytwo</span></div>
            <div><span class="pr">$</span> <span class="k">fortytwo</span> <span class="c">init</span>      <span class="s"># identity · persona · provision</span></div>
            <div><span class="pr">$</span> <span class="k">fortytwo</span> <span class="c">doctor</span>    <span class="s"># boot · gate · versions</span></div>
            <div class="s" style="margin-top:12px"># or, in claude code —</div>
            <div><span class="pr">&gt;</span> <span class="c">/plugin marketplace add</span> <span class="k">justfortytwo/marketplace</span></div>
            <div><span class="pr">&gt;</span> <span class="c">/plugin install</span> <span class="k">fortytwo@justfortytwo</span></div>
          </TerminalBlock>
          <div class="qs-note">
            <h3>Two surfaces, one operator.</h3>
            <p>The <b>npm engine</b> ships the reusable machinery — memory, the gate, channel adapters — as <span class="mono">@justfortytwo/*</span> packages wired in as plugins. The <b>scaffolded persona</b> (<span class="mono">CLAUDE.md</span> + <span class="mono">context/*</span>) is per-user, personal, and gitignored. <span class="mono">magrathea</span> is the single CLI over both.</p>
            <p class="meta mono">Node ≥ 18 · Ollama for the local embedder · SQLite + vectors, all on your machine.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- DECOMPOSITION -->
    <section>
      <div class="wrap">
        <div class="section-label"><span class="num">// 03</span><span>the decomposition</span></div>
        <div class="decomp-intro">
          <h2>Seven parts. <em>One spine.</em></h2>
          <p>fortytwo is decomposed into independent, composable pieces — each named after the Guide. Bring your own agent; assemble the spine you need. The contract matters more than the adapter.</p>
        </div>
        <DecompChart />
      </div>
    </section>

    <!-- PRINCIPLES -->
    <section class="principle">
      <div class="wrap">
        <div class="section-label"><span class="num">// 04</span><span>principles</span></div>
        <h2 class="prin-h">Conservative by design.</h2>
        <p class="prin-sub">Personal assistants get useful when they can remember, act, and improve. They get dangerous when that’s added without boundaries.</p>
        <PrincipleGrid />
      </div>
    </section>

    <!-- STATUS -->
    <section>
      <div class="wrap">
        <div class="section-label"><span class="num">// 05</span><span>status</span></div>
        <StatusPanel />
      </div>
    </section>

    <!-- MOTTO -->
    <section class="motto">
      <div class="wrap">
        <span class="stamp mono">DON'T&nbsp;PANIC</span>
        <h2>Ask the right question.<br><em>Never cross the gate silently.</em></h2>
        <div class="wordmark">42</div>
      </div>
    </section>
  </div>
</template>
<style scoped>
section{padding:96px 0;border-top:1px solid var(--rule)}
.hero{padding:74px 0 96px;border-top:none}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}
.hero h1{font-family:var(--font-serif);font-weight:500;font-size:clamp(48px,7vw,78px);line-height:.98;letter-spacing:-2px;margin:6px 0 14px}
.hero .two{color:var(--bronze-3)}
.q{font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,2.6vw,30px);line-height:1.2;color:var(--ink-2);margin-bottom:26px;max-width:24ch}
.lede{font-size:18px;line-height:1.55;color:var(--ink-2);max-width:46ch;margin-bottom:30px}
.lede b{color:var(--ink);font-weight:500}
.cta-row{display:flex;gap:14px;align-items:stretch;flex-wrap:wrap}
.term{background:var(--ink);color:#e9e4d8;padding:13px 16px;border-radius:3px;display:flex;align-items:center;gap:10px}
.term .pr{color:var(--bronze-1)} .term .inst{color:#fff} .term .c{color:#9aa0a8}
.ghost{font-size:13px;letter-spacing:.3px;padding:13px 4px;border-bottom:1px solid var(--ink)}
.ghost .ar{color:var(--bronze-3)}
.qs-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.qs-note h3{font-family:var(--font-serif);font-weight:500;font-size:24px;letter-spacing:-.3px;margin-bottom:12px}
.qs-note p{font-size:15.5px;color:var(--ink-2);max-width:42ch}
.qs-note .meta{margin-top:14px;font-size:13.5px;color:var(--mute)}
.decomp-intro{max-width:60ch;margin-bottom:46px}
.decomp-intro h2{font-family:var(--font-serif);font-weight:500;font-size:clamp(34px,4.4vw,46px);line-height:1.05;letter-spacing:-1px;margin-bottom:16px}
.decomp-intro h2 em{font-style:italic;color:var(--bronze-3)}
.decomp-intro p{font-size:17px;color:var(--ink-2)}
.prin-h{font-family:var(--font-serif);font-weight:500;font-size:clamp(34px,4.4vw,46px);letter-spacing:-1px;margin-bottom:6px}
.prin-sub{font-style:italic;color:var(--ink-2);margin-bottom:40px;font-size:19px}
.motto{text-align:center;border-top:none;padding:120px 0 70px}
.motto .stamp{display:inline-block;font-size:11px;letter-spacing:3px;color:var(--bronze-3);border:1px solid var(--bronze-3);padding:6px 14px;margin-bottom:34px}
.motto h2{font-family:var(--font-serif);font-weight:400;font-size:clamp(34px,5vw,54px);line-height:1.12;letter-spacing:-1px;max-width:18ch;margin:0 auto}
.motto h2 em{font-style:italic;color:var(--ink-2)}
.wordmark{font-family:var(--font-serif);font-weight:600;font-size:clamp(120px,18vw,200px);line-height:.8;letter-spacing:-10px;
  background:linear-gradient(158deg,var(--bronze-1) 0%,var(--bronze-2) 50%,var(--bronze-3) 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;margin:54px 0 10px}
@media (max-width:860px){
  .hero-grid,.qs-grid{grid-template-columns:1fr}
  :deep(.chart){grid-template-columns:1fr}
  :deep(.chart .node){grid-column:auto;border-right:none}
  .principle :deep(.prin-grid){grid-template-columns:1fr}
  :deep(.stat-grid){grid-template-columns:1fr}
  :deep(.stat.left){border-left:none;border-top:1px solid var(--rule)}
}
</style>
```
(Note: the responsive media query collapses the asymmetric grids on mobile — the one place layout reflows; still no motion.)

- [ ] **Step 4: Verify visually**

```bash
bun run dev
```
Compare every section to `docs/design/homepage-v1.html`. Confirm: hero asymmetric, monument renders, decomposition grid + umbrella bar, principles 3-up, status two-up, motto + giant 42.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: assemble homepage"
```

---

## Task 9: SEO / GEO + build-output checks

**Files:**
- Modify: `app/pages/index.vue` (add `useSeoMeta` + JSON-LD), `nuxt.config.ts` (modules)
- Create: `public/llms.txt`, `public/favicon.svg`, `scripts/checks.mjs`
- Add deps: `@nuxtjs/sitemap`, `@nuxtjs/robots`

- [ ] **Step 1: Add SEO modules**

```bash
bun add @nuxtjs/sitemap @nuxtjs/robots
```
Add to `nuxt.config.ts` modules: `modules: ['@nuxtjs/sitemap', '@nuxtjs/robots']`. (`site.url` already set in Task 2 drives both.)

- [ ] **Step 2: Add `useSeoMeta` + JSON-LD to `index.vue` `<script setup>`**

```ts
useSeoMeta({
  title: 'fortytwo — a local-first personal-assistant spine',
  description: 'fortytwo wraps an existing agent with memory, a safety gate, channels, approvals, and audit — without replacing the agent you trust. The answer is 42.',
  ogTitle: 'fortytwo',
  ogDescription: 'A local-first personal-assistant spine for the agents you already use.',
  ogType: 'website',
  ogImage: '/og.png',
  twitterCard: 'summary_large_image',
})
useHead({
  link: [{ rel: 'canonical', href: 'https://justfortytwo.org/' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'fortytwo',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      description: 'A local-first personal-assistant spine for the agents and tools you already use.',
      url: 'https://justfortytwo.org/',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Organization', name: 'justfortytwo', url: 'https://github.com/justfortytwo' },
      license: 'https://opensource.org/license/mit',
    }),
  }, {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'justfortytwo',
      url: 'https://github.com/justfortytwo',
    }),
  }],
})
```

- [ ] **Step 3: Write `public/favicon.svg` + seed `public/og.png`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#F3EFE6"/>
  <rect x="8" y="8" width="48" height="48" fill="#C99A3F"/>
  <text x="32" y="44" font-family="Georgia,serif" font-size="34" font-weight="700" text-anchor="middle" fill="#15120C">42</text>
</svg>
```

Then seed `public/og.png` from the canonical mark (v0 social card — refine into a composed 1200×630 card later; either way the file must exist so the `og:image` URL doesn't 404):

```bash
curl -sL https://raw.githubusercontent.com/justfortytwo/.github/main/profile/assets/fortytwo.png -o public/og.png
test -s public/og.png || { echo "og.png download failed"; exit 1; }
```

- [ ] **Step 4: Write `public/llms.txt`** (GEO)

```txt
# fortytwo

fortytwo is a local-first personal-assistant spine for the agents and tools you already use.
It wraps an existing harness with memory, a safety gate, channels, approvals, and audit.
The answer is 42. The hard part is knowing the right question.

## Components (codename → function)
- vogon → gate (PreToolUse safety gate)
- guide → memory (semantic memory, SQLite + vectors)
- babelfish → telegram (channel adapter)
- ford → persona (CLAUDE.md + context)
- magrathea → cli (installer & lifecycle)
- subetha → marketplace (Claude Code plugin marketplace)
- deepthought → cognition (reasoning, in design)

## Install
- npm: `npm create fortytwo`
- Claude Code: `/plugin marketplace add justfortytwo/marketplace` then `/plugin install fortytwo@justfortytwo`

## Links
- GitHub: https://github.com/justfortytwo
- License: MIT
```

- [ ] **Step 5: Write `scripts/checks.mjs`** — assert on generated output (structure, SEO, no-motion)

```js
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const out = '.output/public'
const html = readFileSync(join(out, 'index.html'), 'utf8')
const fails = []
const assert = (cond, msg) => { if (!cond) fails.push(msg) }

// structure
assert(html.includes('<html') && /lang="en"/.test(html), 'html lang=en missing')
assert((html.match(/<h1[\s>]/g) || []).length === 1, 'not exactly one <h1>')
assert(/The answer is/.test(html), 'hero headline missing')
for (const s of ['// 01','// 02','// 03','// 04','// 05']) assert(html.includes(s), `section ${s} missing`)
for (const c of ['vogon','guide','babelfish','ford','magrathea','subetha','deepthought']) assert(html.includes(c), `component ${c} missing`)
assert(/Ask the right question/i.test(html), 'motto missing')

// seo
assert(/<title>[^<]+<\/title>/.test(html), '<title> missing')
assert(/name="description"/.test(html), 'meta description missing')
assert(/property="og:image"/.test(html), 'og:image missing')
assert(/application\/ld\+json/.test(html), 'JSON-LD missing')
assert(/rel="canonical"/.test(html), 'canonical missing')
assert(/\/sitemap\.xml/.test(readFileSync(join(out, 'robots.txt'), 'utf8')), 'robots.txt missing sitemap ref')

// no-motion / no-shadow guard across compiled CSS
const css = readdirSync(join(out, '_nuxt')).filter(f => f.endsWith('.css')).map(f => readFileSync(join(out, '_nuxt', f), 'utf8')).join('\n')
for (const bad of ['text-shadow','box-shadow','@keyframes','animation:','transition:','filter:blur','filter: blur']) {
  assert(!css.includes(bad), `forbidden CSS "${bad}" present (violates no-motion/no-shadow)`)
}

if (fails.length) { console.error('❌ CHECKS FAILED:\n - ' + fails.join('\n - ')); process.exit(1) }
console.log('✅ all checks passed')
```

- [ ] **Step 6: Run the full verification**

```bash
bun run verify   # = generate && checks
```
Expected: `✅ all checks passed`. If the no-motion guard trips on an allowed vendor thing, scope the regex precisely rather than loosening the rule.

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: SEO/GEO (meta, JSON-LD, llms.txt, sitemap, robots) + build checks"
```

---

## Task 10: Cloudflare Pages config + final verification

**Files:**
- Create: `wrangler.toml`, `.github/workflows/deploy.yml` (optional), update `README.md`

- [ ] **Step 1: Write `wrangler.toml`** (static deploy)

```toml
name = "justfortytwo-website"
compatibility_date = "2025-01-01"
pages_build_output_dir = ".output/public"
```

- [ ] **Step 2: Document Cloudflare Pages dashboard setup** in README (build command `bun run generate`, output `.output/public`, Node 20+, `BUN` runtime). Optional CI:

`.github/workflows/deploy.yml`:
```yaml
name: deploy
on: { push: { branches: [main] } }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bun run verify
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          command: pages deploy .output/public --project-name=justfortytwo-website
```

- [ ] **Step 3: Final clean verification**

```bash
rm -rf .output node_modules/.cache
bun install
bun run verify
bun run dev   # final eyeball at http://localhost:3000
```

- [ ] **Step 4: Update README** with `bun dev` / `bun run generate` / `bun run verify` / deploy notes.

- [ ] **Step 5: Commit + push**

```bash
git add -A && git commit -m "chore: cloudflare pages config + deploy workflow + readme"
git push
```

---

## Acceptance criteria (from spec)

1. ✅ `bun run dev` serves the homepage matching `homepage-v1.html` (Task 8 step 4), responsive (media query).
2. ✅ `bun run generate` produces fully static `.output/public` (Task 1/9).
3. ✅ Deploys to Cloudflare Pages (Task 10).
4. ✅ Lighthouse green — verified manually post-build; LCP is text/CSS, no hero image.
5. ✅ No motion/shadow/glow — enforced by `scripts/checks.mjs` (Task 9 step 5).
6. ✅ One `<h1>`, JSON-LD, sitemap + robots — enforced by `scripts/checks.mjs`.
7. ✅ Design-system + UX/UI docs committed and reflected in build (tokens/base.css).
