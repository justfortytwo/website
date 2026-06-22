<script setup lang="ts">
defineProps<{ tag?: string }>()
</script>
<template>
  <div class="term-block">
    <div v-if="tag" class="head"><span class="d"></span><span class="d"></span><span class="d"></span>{{ tag }}</div>
    <slot />
  </div>
</template>
<style scoped>
.term-block{font-family:var(--font-mono);background:var(--ink);color:#cdc7b8;
  border-radius:5px;padding:20px 22px;font-size:13px;line-height:1.9}
.head{display:flex;align-items:center;gap:7px;color:#6f6a5b;font-size:10.5px;
  letter-spacing:1.5px;text-transform:uppercase;margin-bottom:14px;padding-bottom:12px;
  border-bottom:1px solid #2a251a}
.head .d{width:9px;height:9px;border-radius:50%;border:1px solid #4a4334}
:deep(.pr){color:var(--bronze-1)}
:deep(.c){color:#7c8691}
:deep(.k){color:#e9e4d8}
:deep(.s){color:#5d6770}
</style>
