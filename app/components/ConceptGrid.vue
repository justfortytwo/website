<script setup lang="ts">
import { concepts } from '~/data/concepts'
</script>
<template>
  <div class="grid">
    <article v-for="(c, i) in concepts" :key="c.id" class="cell" :class="{ noright: (i + 1) % 3 === 0 }">
      <div class="cn">// 0{{ i + 1 }}</div>
      <h3>{{ c.title }}</h3>
      <p>{{ c.body }}</p>
      <div v-if="c.via.length" class="via">via {{ c.via.join(' · ') }}</div>
    </article>
  </div>
</template>
<style scoped>
.grid{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--rule);border-left:1px solid var(--rule)}
.cell{padding:28px 26px 30px;border-right:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.cn{font-family:var(--font-mono);font-size:10px;color:var(--mute);letter-spacing:1.5px}
h3{font-family:var(--font-serif);font-weight:500;font-size:28px;letter-spacing:-.5px;margin:4px 0 10px}
p{font-size:15px;color:var(--ink-2);line-height:1.5}
.via{font-family:var(--font-mono);font-size:11px;color:var(--bronze-3);letter-spacing:.3px;margin-top:14px}
@media (max-width:980px){.grid{grid-template-columns:1fr 1fr}}
@media (max-width:620px){.grid{grid-template-columns:1fr}}
</style>
