<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; lede: string }>()
</script>
<template>
  <section class="page-hero">
    <div class="wrap">
      <div class="section-label"><span class="num">//</span>{{ eyebrow }}</div>
      <h1>{{ title }}</h1>
      <p class="lede">{{ lede }}</p>
      <slot />
    </div>
  </section>
</template>
<style scoped>
.page-hero{padding:74px 0 80px}
h1{font-family:var(--font-serif);font-weight:500;font-size:clamp(38px,5.2vw,62px);line-height:1.04;letter-spacing:-1.5px;max-width:20ch;margin:6px 0 20px}
.lede{font-size:19px;line-height:1.55;color:var(--ink-2);max-width:56ch}
@media (max-width:860px){.page-hero{padding:48px 0 52px}}
</style>
