<script setup lang="ts">
import { responsibilities } from '~/data/stack'
</script>
<template>
  <div class="map">
    <section v-for="r in responsibilities" :key="r.label" class="cell" :class="r.owner">
      <h3>{{ r.label }}</h3>
      <p class="blurb">{{ r.blurb }}</p>
      <ul><li v-for="i in r.items" :key="i" class="mono">{{ i }}</li></ul>
    </section>
  </div>
</template>
<style scoped>
.map{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--rule);border-left:1px solid var(--rule)}
.cell{padding:24px 22px 28px;border-right:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.cell.fortytwo{background:var(--paper-2);border-top:2px solid var(--bronze-3);margin-top:-1px}
h3{font-family:var(--font-mono);font-weight:400;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--mute)}
.fortytwo h3{color:var(--bronze-3)}
.blurb{font-family:var(--font-serif);font-size:19px;line-height:1.25;letter-spacing:-.2px;margin:8px 0 14px}
ul{list-style:none}
li{font-size:12.5px;color:var(--ink-2);padding:6px 0;border-top:1px solid var(--rule)}
@media (max-width:980px){.map{grid-template-columns:1fr 1fr}}
@media (max-width:560px){.map{grid-template-columns:1fr}}
</style>
