<script setup lang="ts">
import { stack, owners, type Owner, type StackItem } from '~/data/stack'
import { project, rect, points, round, alongX } from '~/utils/iso'
import { site } from '~/data/site'

const props = defineProps<{ compact?: boolean }>()

// Plane geometry (plane units). W along x, D along y; S is the vertical pitch between layers.
const W = 330, D = 130
const S = props.compact ? 100 : 118
const CX = 430, Y0 = 24
const BRACKET_X = 800
const T = 22 // slab thickness of the fortytwo layer
const RAIL = 14 // how far the bronze rails stand off the plane corners
const VB_H = Math.ceil(Y0 + (stack.length - 1) * S + project(W, D)[1] + 20)

const origin = (i: number) => ({ x: CX, y: Y0 + i * S })
const corner = (i: number, x: number, y: number) => project(x, y, 0, origin(i))

const layers = stack.map((l, i) => {
  // Items run along the plane's x axis, wrapped into short lines (depth steps are shallow, so few lines).
  const lines: StackItem[][] = []
  let used = 0
  if (!props.compact) for (const it of l.items) {
    if (!lines.length || used + it.label.length > 30) { lines.push([]); used = 0 }
    lines[lines.length - 1].push(it); used += it.label.length + 3
  }
  const rows = lines.map((items, k) => ({ items, at: alongX(corner(i, 36, 34 + k * 38)) }))
  const dn = (pt: [number, number]): [number, number] => [pt[0], pt[1] + T]
  const slab = l.emphasis ? {
    faceL: points([corner(i, 0, D), corner(i, W, D), dn(corner(i, W, D)), dn(corner(i, 0, D))]),
    faceR: points([corner(i, W, 0), corner(i, W, D), dn(corner(i, W, D)), dn(corner(i, W, 0))]),
    mark: alongX(corner(i, W - 82, D - 14)),
  } : null
  return { ...l, i, slab, plane: points(rect(0, 0, W, D, 0, origin(i))), left: corner(i, 0, D), right: corner(i, W, 0), rows }
})

// Corner guide lines between consecutive planes (exploded-view construction lines).
const guides = [[0, 0], [W, 0], [W, D], [0, D]].flatMap(([x, y]) =>
  layers.slice(0, -1).map(l => [corner(l.i, x, y), corner(l.i + 1, x, y)]))

// Axis connectors: bottom edge of one plane to top edge of the next, on the shared centre axis.
const AX = project((W - D) / 2, 0, 0, origin(0))[0]
const slope = 0.3 / 0.94
const topY = (i: number) => origin(i).y + slope * (AX - CX)
const botY = (i: number) => origin(i).y + project(0, D)[1] + slope * (AX - (CX + project(0, D)[0]))
const links = layers.slice(0, -1).map(l => ({
  i: l.i, label: l.emphasis ? "" : l.relation, ours: l.i < 3, y1: round(botY(l.i) + (l.emphasis ? T : 0)), y2: round(topY(l.i + 1)),
  // beside the slab the right-hand gap is eaten by its thickness, so that label sits on the left of the axis
  text: l.emphasis
    ? alongX([AX - 84, (botY(l.i) - slope * 84 + T + topY(l.i + 1) - slope * 84) / 2 + 3.5])
    : alongX([AX + 10, (botY(l.i) + topY(l.i + 1)) / 2 + 3.5]),
}))

// Ownership brackets over consecutive layers with the same owner.
const groups = layers.reduce<{ owner: Owner; from: number; to: number }[]>((acc, l) => {
  const last = acc[acc.length - 1]
  if (last && last.owner === l.owner) last.to = l.i
  else acc.push({ owner: l.owner, from: l.i, to: l.i })
  return acc
}, []).map(g => {
  const y1 = layers[g.from].right[1] - 10
  const y2 = layers[g.to].right[1] + 10
  return { ...g, y1, y2, mid: (y1 + y2) / 2, members: layers.slice(g.from, g.to + 1) }
})

// Bronze rails: fortytwo's lifecycle reaching down both sides of the runtime, clipped to each plane and footed on the machine.
const rails = (['left', 'right'] as const).map(side => {
  const x = side === 'left' ? layers[0].left[0] - RAIL : layers[0].right[0] + RAIL
  const stubs = layers.map(l => ({ id: l.id, x2: l[side][0], y: l[side][1], clip: l.owner === 'runtime' }))
  return { side, x, y1: layers[0][side][1], y2: layers[5][side][1], stubs }
})

// The home-page plate reads as You / fortytwo / Claude Code: the three actors, named plainly.
const actorNames: Record<Owner, string> = { fortytwo: site.name, runtime: site.runtime.current, you: 'You' }

const titleId = useId()
const descId = useId()
const desc = stack.map(l => `${l.name}: ${l.items.map(i => i.label).join(', ')}`).join('. ')
</script>

<template>
  <figure class="plate" :class="{ compact }">
    <svg class="iso" :viewBox="`0 0 1000 ${VB_H}`" role="img" :aria-labelledby="`${titleId} ${descId}`" focusable="false">
      <title :id="titleId">Exploded view of the fortytwo stack</title>
      <desc :id="descId">Six layers from top to bottom. {{ desc }}. fortytwo owns channels, itself and the runtime adapter; the runtime owns the agent and its capabilities; you own the machine.</desc>

      <g class="guides">
        <line v-for="(g, n) in guides" :key="n" :x1="g[0][0]" :y1="g[0][1]" :x2="g[1][0]" :y2="g[1][1]" />
      </g>

      <!-- painted bottom-up so upper planes sit in front -->
      <g v-for="l in [...layers].reverse()" :key="l.id" :class="['layer', l.owner, { em: l.emphasis }]">
        <template v-if="l.slab">
          <polygon class="face fl" :points="l.slab.faceL" />
          <polygon class="face fr" :points="l.slab.faceR" />
        </template>
        <polygon class="plane" :points="l.plane" />
        <text v-if="l.slab" :transform="l.slab.mark" class="mark">42</text>
        <text v-for="(r, n) in l.rows" :key="n" :transform="r.at" class="row">
          <template v-for="(it, m) in r.items" :key="it.label"><tspan v-if="m" class="sep"> · </tspan><tspan>{{ it.label }}</tspan></template>
        </text>
      </g>

      <g class="axis">
        <template v-for="k in links" :key="k.i">
          <line :class="{ ours: k.ours }" :x1="AX" :y1="k.y1" :x2="AX" :y2="k.y2" />
          <circle :class="{ ours: k.ours }" :cx="AX" :cy="k.y1" r="2.6" />
          <circle :class="{ ours: k.ours }" :cx="AX" :cy="k.y2" r="2.6" />
          <text v-if="!compact && k.label" :transform="k.text" class="rel">{{ k.label }}</text>
        </template>
      </g>

      <g class="rails">
        <g v-for="r in rails" :key="r.side">
          <line class="rail" :x1="r.x" :y1="r.y1" :x2="r.x" :y2="r.y2" />
          <template v-for="st in r.stubs" :key="st.id">
            <line class="stub" :x1="r.x" :y1="st.y" :x2="st.x2" :y2="st.y" />
            <rect v-if="st.clip" class="clip" :x="r.x - 4" :y="st.y - 5" width="8" height="10" />
          </template>
        </g>
      </g>

      <g v-for="l in layers" :key="`n-${l.id}`" :class="['label', l.owner, { em: l.emphasis }]">
        <line class="leader" x1="262" :y1="l.left[1]" :x2="l.left[0] - RAIL - 5" :y2="l.left[1]" />
        <circle :cx="l.left[0] - RAIL" :cy="l.left[1]" r="2.4" />
        <text class="name" x="268" :y="l.left[1] + 4" text-anchor="end">{{ l.name.toUpperCase() }}</text>
        <template v-if="!compact">
          <text v-for="(c, n) in l.caption" :key="c" class="cap" x="268" :y="l.left[1] + 21 + n * 15" text-anchor="end">{{ c }}</text>
        </template>
      </g>

      <g v-for="g in groups" :key="g.from" :class="['bracket', g.owner]">
        <line v-for="m in g.members" :key="m.id" class="tie" :x1="m.right[0] + RAIL + 6" :y1="m.right[1]" :x2="BRACKET_X" :y2="m.right[1]" />
        <path class="bar" :d="`M${BRACKET_X - 6},${g.y1} H${BRACKET_X} V${g.y2} H${BRACKET_X - 6}`" />
        <text class="owner" :x="BRACKET_X + 14" :y="g.mid - (compact ? -9 : 4)">{{ compact ? actorNames[g.owner] : owners[g.owner].label.toUpperCase() }}</text>
        <text v-if="!compact" class="note" :x="BRACKET_X + 14" :y="g.mid + 13">{{ owners[g.owner].note }}</text>
      </g>
    </svg>

    <!-- narrow viewports: the same layers as a clean vertical stack -->
    <ol class="flat">
      <li v-for="l in layers" :key="l.id" :class="[l.owner, { em: l.emphasis }]">
        <div class="head"><span class="n">{{ l.name }}</span><span class="o">{{ owners[l.owner].label }}</span></div>
        <div v-if="l.caption.length" class="c">{{ l.caption.join(' ') }}</div>
        <ul v-if="!compact" class="its"><li v-for="it in l.items" :key="it.label">{{ it.label }}</li></ul>
        <div v-if="l.relation" class="link" aria-hidden="true">↕ {{ l.relation }}</div>
      </li>
    </ol>

    <figcaption class="mono"><span>Plate 01 · exploded view · not to scale</span><span class="key"><i class="sw"></i> added by fortytwo · <i class="sw ink"></i> owned by the runtime or you</span></figcaption>
  </figure>
</template>

<style scoped>
.plate{border:1px solid var(--rule);background:var(--paper);padding:22px 22px 14px}
.iso{display:block;width:100%;height:auto}
.plate.compact .iso{max-width:900px;margin:0 auto}
figcaption{display:flex;justify-content:space-between;gap:8px 24px;flex-wrap:wrap;margin-top:10px;padding-top:10px;border-top:1px solid var(--rule);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mute)}

/* svg */
.guides line{stroke:var(--grid);stroke-width:1;stroke-dasharray:2 5}
.plane{fill:var(--paper);stroke:var(--ink);stroke-width:1.1;stroke-linejoin:round}
.layer.runtime .plane{fill:var(--paper-2)}
.layer.you .plane{stroke:var(--mute)}
.layer.em .plane{stroke:var(--bronze-3);stroke-width:1.8}
.row{font-family:var(--font-mono);font-size:13.5px;fill:var(--ink)}
.row .sep{fill:var(--mute)}
.axis line{stroke:var(--ink);stroke-width:1}
.axis circle{fill:var(--ink)}
.axis line.ours{stroke:var(--bronze-3);stroke-width:2}
.axis circle.ours{fill:var(--bronze-3)}
.face.fl{fill:var(--bronze-3);stroke:var(--bronze-deep);stroke-width:1}
.face.fr{fill:var(--bronze-2);stroke:var(--bronze-deep);stroke-width:1}
.layer.em .plane{fill:var(--paper-2)}
.mark{font-family:var(--font-serif);font-weight:600;font-size:38px;letter-spacing:-2px;fill:var(--bronze-2);stroke:var(--bronze-3);stroke-width:.6}
.rail{stroke:var(--bronze-3);stroke-width:3;stroke-linecap:square}
.stub{stroke:var(--bronze-3);stroke-width:1.5}
.clip{fill:var(--bronze-3)}
.rel{font-family:var(--font-mono);font-size:12px;letter-spacing:.5px;fill:var(--mute)}
.label .leader{stroke:var(--ink-2);stroke-width:1}
.label circle{fill:var(--ink-2)}
.label .name{font-family:var(--font-mono);font-size:13.5px;letter-spacing:1.2px;fill:var(--ink)}
.label .cap{font-family:var(--font-mono);font-size:12.5px;fill:var(--mute)}
.plate.compact .label .name{fill:var(--mute)}
.label.em .name,.plate.compact .label.em .name{fill:var(--bronze-3)}
.label.em .leader{stroke:var(--bronze-3)}
.label.em circle{fill:var(--bronze-3)}
.bracket .tie{stroke:var(--rule);stroke-width:1;stroke-dasharray:2 4}
.bracket .bar{fill:none;stroke:var(--ink-2);stroke-width:1}
.bracket .owner{font-family:var(--font-mono);font-size:13.5px;letter-spacing:1.4px;fill:var(--ink)}
.bracket .note{font-family:var(--font-mono);font-size:12.5px;fill:var(--mute)}
.plate.compact .bracket .owner{font-family:var(--font-serif);font-weight:500;font-size:34px;letter-spacing:-.5px}
.bracket.fortytwo .bar{stroke:var(--bronze-3);stroke-width:1.6}
.bracket.fortytwo .owner{fill:var(--bronze-3)}
.bracket.you .bar{stroke:var(--mute)}

figcaption .key{text-transform:none;letter-spacing:.5px}
.sw{display:inline-block;width:14px;height:3px;background:var(--bronze-3);vertical-align:middle;margin:0 2px 0 0}
.sw.ink{background:var(--ink);margin-left:6px}

/* flat list: only on narrow screens */
.flat{display:none;list-style:none}
@media (max-width:980px){
  .iso{display:none}
  .flat{display:block}
  .plate{padding:18px 16px 12px}
  .flat > li{border:1px solid var(--rule);padding:14px 16px;background:var(--paper);position:relative}
  .flat > li + li{margin-top:24px}
  .flat > li.runtime{background:var(--paper-2)}
  .flat{border-left:4px solid var(--bronze-3);padding-left:14px}
  .flat > li.runtime,.flat > li.you{margin-left:0}
  .flat > li.em{border-color:var(--bronze-3);border-width:1.5px}
  .head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;flex-wrap:wrap}
  .n{font-family:var(--font-serif);font-weight:500;font-size:22px;letter-spacing:-.3px}
  .em .n{color:var(--bronze-3)}
  .o{font-family:var(--font-mono);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mute)}
  .fortytwo .o{color:var(--bronze-3)}
  .c{font-family:var(--font-mono);font-size:12.5px;color:var(--mute);margin-top:2px}
  .its{list-style:none;display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
  .its li{font-family:var(--font-mono);font-size:12px;padding:3px 9px;border:1px solid var(--rule)}
  .link{position:absolute;left:16px;bottom:-22px;font-family:var(--font-mono);font-size:12px;color:var(--mute);line-height:20px}
  .flat > li:last-child .link{display:none}
}
</style>
