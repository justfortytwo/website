<script setup lang="ts">
import { scenes } from '~/data/scenes'
</script>
<template>
  <ol class="scenes">
    <li v-for="s in scenes" :key="s.when">
      <div class="when">{{ s.when }}</div>
      <div>
        <h3>{{ s.title }}</h3>
        <p>{{ s.body }}</p>
      </div>
    </li>
  </ol>
</template>
<style scoped>
.scenes{list-style:none;border-top:1px solid var(--rule)}
li{display:grid;grid-template-columns:200px 1fr;gap:28px;padding:26px 0;border-bottom:1px solid var(--rule)}
.when{font-family:var(--font-mono);font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--bronze-3);padding-top:6px}
h3{font-family:var(--font-serif);font-weight:500;font-size:26px;letter-spacing:-.4px;margin-bottom:6px}
p{font-size:16px;color:var(--ink-2);max-width:60ch}
@media (max-width:700px){li{grid-template-columns:1fr;gap:6px}}
</style>
