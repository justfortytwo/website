<script setup lang="ts">
import { availability as a } from '~/data/alwayson'
const lanes = [a.stays, a.runs]
</script>
<template>
  <div>
    <div class="split">
      <section v-for="(l, i) in lanes" :key="l.heading" class="lane" :class="{ runs: i === 1 }">
        <h3>{{ l.heading }}</h3>
        <p class="note mono">{{ l.note }}</p>
        <dl>
          <div v-for="it in l.items" :key="it.name" class="it"><dt>{{ it.name }}</dt><dd>{{ it.body }}</dd></div>
        </dl>
      </section>
    </div>
    <p class="foot mono">{{ a.footnote }}</p>
  </div>
</template>
<style scoped>
.split{display:grid;grid-template-columns:1.25fr 1fr;border:1px solid var(--rule)}
.lane{padding:26px 28px 28px}
.lane.runs{border-left:1px solid var(--rule);background:var(--paper-2)}
h3{font-family:var(--font-serif);font-weight:500;font-size:26px;letter-spacing:-.4px}
.note{font-size:13px;letter-spacing:.4px;color:var(--bronze-3);margin:4px 0 16px}
.it{padding:11px 0;border-top:1px solid var(--rule)}
dt{font-family:var(--font-mono);font-size:13px;letter-spacing:.3px}
dd{font-size:15px;color:var(--ink-2);line-height:1.45;margin-top:2px}
.foot{font-size:13px;color:var(--mute);margin-top:14px;max-width:80ch}
@media (max-width:860px){.split{grid-template-columns:1fr}.lane.runs{border-left:none;border-top:1px solid var(--rule)}}
</style>
