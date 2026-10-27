<script setup lang="ts">
defineProps<{ src: string; alt: string; width: number; height: number }>()
</script>
<template>
  <figure>
    <img :src="src" :alt="alt" :width="width" :height="height" loading="lazy" decoding="async">
  </figure>
</template>
<style scoped>
figure{margin:0;width:100%;max-width:300px;justify-self:center}
img{display:block;width:100%;height:auto;max-height:260px;object-fit:contain;mix-blend-mode:darken}
@media (max-width:860px){
  figure{max-width:240px}
  img{max-height:200px}
}
</style>
