<script setup lang="ts">
defineProps<{ state: 'done'|'wip'; label: string }>()
</script>
<template>
  <span class="pill" :class="state === 'done' ? 'ok' : 'wip'">
    <span class="dot"></span>{{ label }}
  </span>
</template>
