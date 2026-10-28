<script setup lang="ts">
import { benefits } from '~/data/benefits'
</script>
<template>
  <ol class="benefits">
    <li v-for="b in benefits" :key="b.id">
      <h3>{{ b.title }}</h3>
      <div>
        <p v-if="b.before" class="before mono">{{ b.before }}</p>
        <p class="after"><span v-if="b.before" class="ar mono" aria-hidden="true">→</span>{{ b.after }}</p>
      </div>
    </li>
  </ol>
</template>
<style scoped>
.benefits{list-style:none;border-top:1px solid var(--rule)}
li{display:grid;grid-template-columns:280px 1fr;gap:24px;padding:20px 0;border-bottom:1px solid var(--rule);align-items:start}
h3{font-family:var(--font-serif);font-weight:500;font-size:24px;letter-spacing:-.3px;line-height:1.2}
.before{font-size:14px;color:var(--mute);margin-bottom:4px}
.after{font-size:17px;color:var(--ink-2);max-width:62ch;line-height:1.5}
.ar{color:var(--bronze-3);margin-right:8px}
@media (max-width:700px){li{grid-template-columns:1fr;gap:8px}}
</style>
