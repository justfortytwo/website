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
.row{display:flex;align-items:center;justify-content:space-between;height:62px}
.brand{font-family:var(--font-mono);font-weight:600;letter-spacing:-.5px;font-size:17px;display:flex;align-items:center;gap:9px}
.brand .dot{width:9px;height:9px;background:linear-gradient(150deg,var(--bronze-1),var(--bronze-3))}
.links{display:flex;gap:26px;font-family:var(--font-mono);font-size:12.5px;color:var(--ink-2)}
.links a:hover{color:var(--bronze-3)}
</style>
