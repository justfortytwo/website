<script setup lang="ts">
import { site } from '~/data/site'
</script>
<template>
  <header class="top">
    <div class="wrap row">
      <NuxtLink to="/" class="brand"><span class="dot"></span>{{ site.name }}</NuxtLink>
      <nav class="links">
        <NuxtLink v-for="item in site.nav" :key="item.label" :to="item.href">{{ item.label }}</NuxtLink>
      </nav>
    </div>
  </header>
</template>
<style scoped>
.top{border-bottom:1px solid var(--rule)}
.row{display:flex;align-items:center;justify-content:space-between;min-height:62px;flex-wrap:wrap;gap:6px 24px;padding-top:6px;padding-bottom:6px}
.brand{font-family:var(--font-mono);font-weight:600;letter-spacing:-.5px;font-size:17px;display:flex;align-items:center;gap:9px}
.brand .dot{width:9px;height:9px;background:linear-gradient(150deg,var(--bronze-1),var(--bronze-3))}
.links{display:flex;flex-wrap:wrap;gap:6px 22px;font-family:var(--font-mono);font-size:12.5px;color:var(--ink-2)}
.links a:hover,.links a.router-link-exact-active{color:var(--bronze-3)}
.links a.router-link-exact-active{border-bottom:1px solid var(--bronze-3)}
</style>
