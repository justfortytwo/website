<script setup lang="ts">
import type { StatusState } from '~/data/status'
defineProps<{ state: StatusState; label: string }>()
</script>
<template>
  <span class="pill" :class="state">
    <span class="dot"></span>{{ label }}
  </span>
</template>
