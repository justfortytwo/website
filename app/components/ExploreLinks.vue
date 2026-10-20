<script setup lang="ts">
import { pages, pageOrder, type PageKey } from '~/data/pages'
const props = defineProps<{ keys?: PageKey[] }>()
const list = (props.keys ?? pageOrder).map(k => pages[k])
const cta: Record<string, string> = { 'how-it-works': 'Explore how it works', 'always-on': 'Run it 24/7', runtimes: 'Runtime support', trust: 'Trust' }
</script>
<template>
  <nav class="ex" aria-label="Explore">
    <NuxtLink v-for="(p, i) in list" :key="p.key" :to="p.path" class="row">
      <span class="n mono" aria-hidden="true">0{{ i + 1 }}</span>
      <span class="t">{{ cta[p.key] ?? p.label }}</span>
      <span class="d">{{ p.teaser }}</span>
      <span class="ar" aria-hidden="true">→</span>
    </NuxtLink>
  </nav>
</template>
<style scoped>
.ex{border-top:1px solid var(--rule)}
.row{display:grid;grid-template-columns:40px minmax(220px,1fr) 2fr 28px;gap:24px;align-items:baseline;padding:22px 12px;border-bottom:1px solid var(--rule)}
.n{font-size:13px;letter-spacing:1.5px;color:var(--mute)}
.t{font-family:var(--font-serif);font-weight:500;font-size:28px;letter-spacing:-.5px;border-bottom:1px solid transparent;justify-self:start}
.ar{color:var(--bronze-3);font-family:var(--font-mono);font-size:20px;text-align:right}
.d{font-size:17px;color:var(--ink-2)}
.row:hover{background:var(--paper-2);border-bottom-color:var(--bronze-3)}
.row:hover .t{color:var(--bronze-3);border-bottom-color:var(--bronze-3)}
.row:hover .n{color:var(--bronze-3)}
@media (max-width:760px){.row{grid-template-columns:32px 1fr 24px;gap:2px 12px}.d{grid-column:2 / 3}.ar{grid-row:1;grid-column:3}}
</style>
