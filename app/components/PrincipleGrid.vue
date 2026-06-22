<script setup lang="ts">
import { principles } from '~/data/principles'
</script>
<template>
  <div class="prin-grid">
    <div v-for="(p,i) in principles" :key="p.title" class="p" :class="{ noright: (i+1)%3===0 }">
      <div class="pn">P · 0{{ i+1 }}</div>
      <h4>{{ p.title }}</h4>
      <p>{{ p.body }}</p>
    </div>
  </div>
</template>
<style scoped>
.prin-grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--rule)}
.p{padding:28px 26px 30px;border-bottom:1px solid var(--rule);border-right:1px solid var(--rule)}
.p.noright{border-right:none}
.pn{font-family:var(--font-mono);font-size:11px;color:var(--bronze-3);letter-spacing:1.5px;margin-bottom:10px}
.p h4{font-family:var(--font-serif);font-weight:500;font-size:21px;letter-spacing:-.3px;margin-bottom:8px}
.p p{font-size:14px;color:var(--ink-2);line-height:1.5}
</style>
