<script setup lang="ts">
import type { TrustClaim } from '~/data/trust'
defineProps<{ claims: TrustClaim[] }>()
</script>
<template>
  <dl class="tb">
    <div v-for="c in claims" :key="c.title" class="c">
      <dt>{{ c.title }}</dt>
      <dd>{{ c.body }}</dd>
    </div>
  </dl>
</template>
<style scoped>
.tb{border-top:1px solid var(--rule)}
.c{display:grid;grid-template-columns:minmax(200px,.8fr) 2fr;gap:24px;padding:20px 0;border-bottom:1px solid var(--rule)}
dt{font-family:var(--font-serif);font-weight:500;font-size:21px;letter-spacing:-.2px;line-height:1.25}
dd{font-size:15.5px;color:var(--ink-2);line-height:1.5}
@media (max-width:760px){.c{grid-template-columns:1fr;gap:6px}}
</style>
