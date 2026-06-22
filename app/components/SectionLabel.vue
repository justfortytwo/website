<script setup lang="ts">
defineProps<{ num: string; title: string }>()
</script>
<template>
  <div class="section-label">
    <span class="num">// {{ num }}</span><span>{{ title }}</span>
  </div>
</template>
