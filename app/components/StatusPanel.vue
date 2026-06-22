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
