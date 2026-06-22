# fortytwo — UX / UI Principles

> How the site *behaves* and *reads*, not how it looks (that's the
> [design system](./design-system.md)). Status: **v0.1** — 2026-06-22.

The product's own engineering principles map directly to its UX. A site for a
*safety-first, conservative-autonomy* assistant must itself feel **honest,
restrained, and legible**. These principles are the test for every interaction
and every line of copy.

---

## 1. Honesty over theatre

- Show what the thing **is**, not what it aspires to be. Status pills say `M1 —
  DONE` / `M2 — IN PROGRESS`; `deepthought` is labelled `— in design`. No
  "coming soon" hype.
- The terminal blocks show **real** commands that really run. No fake output,
  no inflated claims. If a command is illustrative, it's still accurate.
- "Not affiliated with Anthropic." lives in the footer because it's true and
  matters.

## 2. Restraint as a feature

- The interface does the **least** that still communicates. One accent color.
  One fake-3D object. No motion. No decorative imagery.
- If removing an element doesn't lose information, remove it. Negative space is
  not emptiness; it is the design.
- "Personal assistants get dangerous when abilities are added without
  boundaries." The same is true of UI elements.

## 3. Conservative interaction

- **No motion, ever** (see design system §8). Feedback is an *instant* change
  of color or border — a state, not an animation.
- Every actionable thing has a clear, restful default state and an obvious
  active/hover/focus state. No hidden gestures, no hover-only discovery for
  anything essential.
- External/irreversible-feeling actions (a link that leaves the site, an
  install command the user will paste) are signalled honestly — install
  commands are shown *as commands*, not disguised as buttons.

## 4. Keyboard-first, accessible by construction

- Semantic HTML (`<header> <nav> <main> <section> <footer>`, real headings) —
  not just for SEO, but because it's the correct, accessible structure.
- Visible focus rings (the hairline/border language), logical tab order, skip
  link to content.
- Color contrast meets WCAG AA at minimum; bronze-3 on paper and ink on paper
  are the workhorses. Never rely on color alone (status pills pair dot + word).
- `prefers-reduced-motion` is satisfied trivially — there is no motion to reduce.
- `lang="en"`, real button/label text, alt text where images appear (rare).

## 5. Reading first

- The page is written, then designed. Lead with the idea, not the UI.
- Hierarchy: one thought per section; the headline states the claim, the body
  proves it, the mono label indexes it.
- Body measure ~62ch for prose, looser for ledes. Serif body is non-negotiable —
  it signals craft and reads at length.
- Scannable but not bullet-holed: the decomposition grid and principle grid are
  the only dense moments; everything else breathes.

## 6. The voice

- **Calm, dry, faintly arch.** The Hitchhiker's Guide wit, dialed to
  professionalism. "The answer is 42. The hard part is knowing the right
  question." — not "Supercharge your AI workflow."
- Precise nouns over marketing adjectives. "A local-first personal-assistant
  spine," not "a next-gen intelligent platform."
- English only (this is the English surface; other locales are future work).
- Technical terms stay technical (`PreToolUse`, `MCP`, `SQLite + vectors`) —
  the audience is developers; we don't condescend, and we don't pad.

## 7. Performance is UX

- Static (SSG), small, fast. Fonts self-hosted (no third-party requests),
  minimal JS, no client framework weight beyond what Nuxt needs to hydrate
  near-nothing.
- Fast first paint = trust. A sluggish site for a "local-first" tool is a
  contradiction.
- Target: green across Core Web Vitals; LCP dominated by text, not images.

## 8. Findable (SEO + GEO)

- Every page answers a specific question a person (or a model) might ask.
- Structure for both crawlers and generative engines: semantic HTML, descriptive
  `<title>`/meta, JSON-LD (`SoftwareApplication`, `Organization`), a `llms.txt`,
  clean URLs, sitemap + robots.
- Lead each section with the plain-language answer, then depth — the inverted
  pyramid, which serves skimmers, search, and LLM extraction alike.

## 9. Built to extend

- The homepage is the first surface; the system must make the *next* surface
  (Components, Principles, Docs) obvious to build. Section labels, grids, and
  terminal blocks are reusable, not one-offs.
- Content lives in structured data / markdown so future pages compose from the
  same primitives (e.g. a Components index reuses the decomposition card).

---

### One-line summary

> Don't Panic. Show the truth. Leave room. Never animate. Make it findable.
