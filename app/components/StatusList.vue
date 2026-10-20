<script setup lang="ts">
import { status, statusLabels } from '~/data/status'
</script>
<template>
  <ul class="status">
    <li v-for="s in status" :key="s.title" :class="s.state">
      <StatusPill :state="s.state" :label="statusLabels[s.state]" />
      <div>
        <h3>{{ s.title }}</h3>
        <p>{{ s.body }}</p>
      </div>
    </li>
  </ul>
</template>
<style scoped>
.status{list-style:none;border-top:1px solid var(--rule)}
li{display:grid;grid-template-columns:170px 1fr;gap:24px;padding:20px 0;border-bottom:1px solid var(--rule);align-items:start}
li > :first-child{justify-self:start}
h3{font-family:var(--font-serif);font-weight:500;font-size:22px;letter-spacing:-.3px;margin-bottom:2px}
p{font-size:16.5px;color:var(--ink-2);max-width:64ch}
@media (max-width:700px){li{grid-template-columns:1fr;gap:10px}}
</style>
