<script setup lang="ts">
import { deployContexts, deployNote } from '~/data/alwayson'
</script>
<template>
  <div>
    <div class="row">
      <article v-for="d in deployContexts" :key="d.id" class="cell">
        <div class="tag mono">{{ d.tag }}</div>
        <h3>{{ d.name }}</h3>
        <p v-for="(l, i) in d.lines" :key="i">{{ l }}</p>
        <a v-if="d.link" class="more mono" :href="d.link.href">{{ d.link.label }}</a>
      </article>
    </div>
    <p class="note mono">{{ deployNote }}</p>
  </div>
</template>
<style scoped>
.row{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid var(--rule);border-left:1px solid var(--rule)}
.cell{padding:26px 26px 30px;border-right:1px solid var(--rule);border-bottom:1px solid var(--rule)}
.tag{font-size:13px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mute)}
h3{font-family:var(--font-serif);font-weight:500;font-size:30px;letter-spacing:-.5px;margin:4px 0 12px}
p{font-size:16.5px;color:var(--ink-2);line-height:1.5;margin-bottom:10px}
.more{display:inline-block;font-size:14px;color:var(--ink);text-decoration:underline;text-underline-offset:3px;margin-top:6px}
.note{font-size:13px;color:var(--mute);margin-top:14px;max-width:80ch}
@media (max-width:860px){.row{grid-template-columns:1fr}}
</style>
