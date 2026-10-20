<script setup lang="ts">
defineProps<{ src: string; alt: string; width: number; height: number; caption: string }>()
</script>
<template>
  <figure>
    <img :src="src" :alt="alt" :width="width" :height="height" loading="lazy" decoding="async">
    <figcaption>{{ caption }}</figcaption>
  </figure>
</template>
<style scoped>
figure{margin:0}
img{display:block;width:100%;height:auto;background:var(--paper-2)}
figcaption{font-family:var(--font-mono);font-size:12.5px;line-height:1.5;letter-spacing:.3px;color:var(--mute);margin-top:10px;padding-top:8px;border-top:1px solid var(--rule)}
</style>
