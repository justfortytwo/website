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
figcaption{font-size:15px;line-height:1.45;color:var(--ink-2);margin-top:10px;max-width:46ch}
</style>
