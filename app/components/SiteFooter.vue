<script setup lang="ts">
import { site } from '~/data/site'
</script>
<template>
  <footer>
    <div class="wrap row">
      <span>{{ site.footer.copyright }}</span>
      <div class="f-links">
        <NuxtLink v-for="l in site.footer.links" :key="l.href" :to="l.href">{{ l.label }}</NuxtLink>
      </div>
      <span>{{ site.footer.disclaimer }}</span>
    </div>
  </footer>
</template>
<style scoped>
footer{border-top:1px solid var(--rule);padding:26px 0;font-family:var(--font-mono);font-size:12px;color:var(--mute)}
.row{display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap}
.f-links{display:flex;gap:18px}
.f-links a:hover{color:var(--bronze-3)}
</style>
