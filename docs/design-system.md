# fortytwo — Design System

> The source of truth for the look and feel of justfortytwo.org.
> Status: **v0.1** — established 2026-06-22 from the approved homepage concept
> (`docs/design/homepage-v1.html`).

---

## 1. North star

**Minimal cyberpunk, read like the Guide.** A warm-paper canvas, near-black ink,
and a single bronze accent reserved for the answer. Everything is flat and
geometric — with one rare exception: the **"42"**, which is allowed to be a
fake-3D sculptural object, because *it is the answer*.

Three words to test any decision against: **calm, technical, deliberate.**

- **Calm** — generous space, restrained color, no noise. "Don't Panic."
- **Technical** — monospace chrome, blueprint precision, terminal honesty.
- **Deliberate** — every element earns its place; nothing decorative.

---

## 2. Color

Two surfaces of ink on paper, one accent, one rare secondary. Bronze is a
*privilege*, not a palette — use it only on the "42" and the things that are
*the answer* (the wordmark, a status dot that means "certain").

### Tokens

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#F3EFE6` | Page background (warm off-white) |
| `--paper-2` | `#ECE7DA` | Recessed surfaces, section bands, card fill on hover |
| `--ink` | `#15120C` | Primary text, wordmark, terminal bg |
| `--ink-2` | `#3A352B` | Secondary text, body emphasis |
| `--mute` | `#7A7466` | Tertiary text, labels, metadata |
| `--rule` | `#DCD5C5` | Hairlines, card borders, dividers |
| `--bronze-1` | `#E7C163` | Bronze highlight (top of gradient) |
| `--bronze-2` | `#C99A3F` | Bronze mid (the canonical mark tone) |
| `--bronze-3` | `#9A6F1E` | Bronze shadow / accent text / links |
| `--bronze-deep` | `#4D3A10` | Deepest extrusion layer of the 42 |
| `--navy` | `#16213E` | Rare secondary (from the mark) — reserved |

### Rules

- **Background is always paper.** Never invert to dark for UI. (The terminal
  block and the `fortytwo` umbrella bar are the *only* dark insets — they are
  "the machine speaking," not page chrome.)
- **Bronze appears only on:** the 42 monument, the wordmark, the `DON'T PANIC`
  stamp, "in progress" status, links on hover, and a `//` index numeral. Never
  on body text, never as a fill behind content.
- **No gradients anywhere except the 42** (and the wordmark, which *is* the 42).
- Gradients are flat metallic fills (`linear-gradient`), never soft, never glowing.

---

## 3. Type

Two families. **Newsreader** carries meaning (headlines, body); **IBM Plex Mono**
carries the machine (labels, terminals, the 42 system, metadata).

```
Newsreader        — editorial serif, slight literary warmth. The "Guide" voice.
IBM Plex Mono     — the terminal. System, provenance, precision.
```

### Pairing contract

| Role | Family | Weight / style | Notes |
|---|---|---|---|
| Display headline (hero) | Newsreader | 500 | 72–84px, tracking −2px |
| Section headline | Newsreader | 500 | 44–48px, tracking −1px |
| Italic accent / question | Newsreader | 400 italic | the "right question" voice |
| Body | Newsreader | 400 | 17px / 1.6 |
| Emphasis in body | Newsreader | 500 | rare |
| Section label `// 02 — …` | Plex Mono | 400 | 11px, +2px tracking, UPPERCASE, `--mute` + bronze numeral |
| Terminal / code | Plex Mono | 400 | 13px on `--ink` |
| Metadata, captions | Plex Mono | 400 | 10–11px, `--mute` |

- **No third family.** No display sans, no condensed, no novelty face.
- Body copy stays serif even at length — readability is proven (cf. Hermes),
  and it is the single biggest anti-slop signal.
- Numbers in running text use Newsreader; numbers as *data* (timestamps,
  versions, coordinates) use Plex Mono.

### Scale (fluid, clamp-based in the build)

`display 78 / h1 48 / h2 30 / lead 19 / body 17 / small 14 / mono-label 11`

---

## 4. Spacing, grid, rhythm

- **Measure:** body columns max ~62ch; lede ~46ch.
- **Container:** `max-width: 1160px`, `padding: 0 36px` (fluid down).
- **Section rhythm:** `96px` vertical between top-level sections; hairline
  `--rule` on top of each. The hero is the exception (no top border, looser).
- **Grid:** 12-column mental grid. Decomposition and principles use real CSS
  sub-grids with hairline gutters (borders, not gaps-with-shadows).
- **Negative space is the design.** When in doubt, leave it out.

---

## 5. The "42" monument *(the signature)*

The one fake-3D object on the site. It is built from **stacked solid layers**,
not from shadow or glow — a hard, geometric extrusion, like a machined answer
sitting on an engineering drawing.

### Anatomy

1. **Blueprint field** — a faint cool grid (`#C9D2DC` lines at `30px`, ~34%
   opacity) inside a 1px `#B9C2CD` frame, with a vertical + horizontal center
   crosshair. Technical, not decorative.
2. **The numeral** — Newsreader 600, ~300px, set as a metallic
   `linear-gradient(158deg, #F0D076 → bronze-1 → bronze-2 → bronze-3)` text fill.
3. **The extrusion** — 5 duplicate layers stacked beneath, each offset
   `+2px/+2px` and stepped darker (`#6E5213 → #5A4310 → #47340C → #352708 →
   #241A05`). Hard edges only.
4. **Mono annotations** — tiny `FIG. 042`, `ANSWER · ABSOLUTE`,
   `CERTAINTY 1.0`, `DEEP THOUGHT, 7.5M YR`, each preceded by a 14px tick rule.

### Hard rules

- **No `text-shadow`, no `box-shadow`, no `filter: blur`, no radial highlight.**
  Depth comes only from the stacked solid layers and the metallic gradient fill.
- The monument is rendered in **CSS** (scalable, crisp, themable) — the raster
  `fortytwo.png` mark is reserved for favicon / OG / social cards only.

---

## 6. Signature motifs

These repeat across the site to make it read as one system:

- **`// NN — title` section labels** — a Plex Mono index numeral in bronze, an
  em-rule, the section name in `--mute` UPPERCASE, trailing into a short
  hairline. The code-comment voice.
- **Terminal blocks** — `--ink` background, Plex Mono, a chrome header (three
  hollow dots + an uppercase tag like `install · magrathea`), `$`/`>` prompts
  in bronze-1, commands in paper, comments in `#5D6770`. The machine speaking.
- **Blueprint annotations** — tiny Plex Mono labels with tick rules, used
  wherever we treat something as a *figure* (the 42, diagrams).
- **The `DON'T PANIC` stamp** — a 1px bronze outline, Plex Mono, wide tracking.
  Used once, at the close.

---

## 7. Components

| Component | Spec |
|---|---|
| **Primary CTA** | terminal pill — `--ink` bg, Plex Mono 13, `$` bronze-1 prompt + paper command |
| **Ghost link** | underlined-on-hover text link with a bronze `→` |
| **Decomposition card** | paper cell, `// 0N` index, big serif name, bronze uppercase role, serif desc; hairline borders; `▸` mark top-right |
| **Umbrella bar** | full-width `--ink` strip closing the grid: `// umbrella` / `fortytwo` (gradient) / version+license |
| **Principle cell** | `P · 0N` bronze index, serif title, serif body; 3-up grid, hairline gutters |
| **Status pill** | hollow 1px outline + 7px dot; `.ok` green `#3F7D4E`, `.wip` bronze-3 |
| **Top nav** | bronze-square wordmark left; Plex Mono 12.5 links right; hairline under |
| **Footer** | Plex Mono 12, `--mute`; copyright / links / "Not affiliated with Anthropic." |

### Iconography

**None.** No icon font, no emoji in chrome, no stock illustration. Identity is
carried by type, the bronze square, the `42`, and the `▸`/`·`/`→` glyphs. If a
concept needs a picture, it becomes a **blueprint figure**, not an icon.

---

## 8. Motion policy: **none**

- No entrance animations, no scroll reveals, no hover transitions beyond an
  **instant** color/border change, no parallax, no auto-playing anything.
- Respect is trivially satisfied: there is no motion to reduce.
- Interactivity is signalled by **state change of color/border**, never by movement.
- Rationale: "Pure minimal cyberpunk." Motion would cheapen the deliberateness.

---

## 9. Hard don'ts

No glows · no drop/inner shadows · no soft gradients · no neon · no glassmorphism
· no stock photography · no emoji in UI · no third type family · no rounded
blob cards · no "trusted by" logo soup (unless real) · no dark page chrome · no
bronze on body text.

---

## 10. Open for the build

- Fluid type via `clamp()`; lock the fluid scale against the table in §3.
- Decide terminal-block theming for `<code>` inline vs block in prose.
- Favicon/OG set generated from `fortytwo.png` (dark-on-light, PNG + SVG).
