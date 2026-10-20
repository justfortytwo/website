<script setup lang="ts">
import { pages, pageOrder, type PageKey } from '~/data/pages'
const props = defineProps<{ keys?: PageKey[] }>()
const list = (props.keys ?? pageOrder).map(k => pages[k])
const cta: Record<string, string> = { 'how-it-works': 'Explore how it works', 'always-on': 'Run it 24/7', runtimes: 'Runtime support', trust: 'Trust' }
</script>
<template>
  <nav class="ex" aria-label="Explore">
    <NuxtLink v-for="p in list" :key="p.key" :to="p.path" class="row">
      <span class="t">{{ cta[p.key] ?? p.label }} <span class="ar" aria-hidden="true">→</span></span>
      <span class="d">{{ p.teaser }}</span>
    </NuxtLink>
  </nav>
</template>
<style scoped>
.ex{border-top:1px solid var(--rule)}
.row{display:grid;grid-template-columns:minmax(220px,1fr) 2fr;gap:24px;align-items:baseline;padding:22px 4px;border-bottom:1px solid var(--rule)}
.t{font-family:var(--font-serif);font-weight:500;font-size:28px;letter-spacing:-.5px}
.ar{color:var(--bronze-3);font-family:var(--font-mono)}
.d{font-size:15.5px;color:var(--ink-2)}
.row:hover .t{color:var(--bronze-3)}
@media (max-width:760px){.row{grid-template-columns:1fr;gap:4px}}
</style>
