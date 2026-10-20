<script setup lang="ts">
import { presence as p } from '~/data/alwayson'
</script>
<template>
  <div class="pc">
    <section class="col" aria-labelledby="pc-s">
      <div class="tag">{{ p.session.tag }}</div>
      <h3 id="pc-s">{{ p.session.heading }}</h3>
      <ol class="flow">
        <li v-for="s in p.session.steps" :key="s">{{ s }}</li>
        <li class="end">{{ p.session.end }}</li>
      </ol>
    </section>
    <section class="col ours" aria-labelledby="pc-p">
      <div class="tag">{{ p.presence.tag }}</div>
      <h3 id="pc-p">{{ p.presence.heading }}</h3>
      <div class="lead">{{ p.presence.lead }}</div>
      <ul class="tree">
        <li v-for="x in p.presence.points" :key="x">{{ x }}</li>
      </ul>
    </section>
  </div>
</template>
<style scoped>
.pc{display:grid;grid-template-columns:1fr 1fr;border:1px solid var(--rule)}
.col{padding:28px 30px 32px}
.col.ours{background:var(--paper-2);border-left:1px solid var(--rule)}
.tag{font-family:var(--font-mono);font-size:13px;letter-spacing:2px;text-transform:uppercase;color:var(--mute)}
.ours .tag{color:var(--bronze-3)}
h3{font-family:var(--font-serif);font-weight:500;font-size:24px;letter-spacing:-.4px;margin:6px 0 20px;line-height:1.15}
.flow{list-style:none}
.flow li{font-family:var(--font-mono);font-size:13px;color:var(--ink-2);padding:6px 0 6px 22px;position:relative}
.flow li + li::before{content:"↓";position:absolute;left:0;top:-9px;color:var(--mute)}
.flow li.end{color:var(--mute)}
.lead{font-family:var(--font-mono);font-size:13px;color:var(--bronze-3);padding-left:22px;margin-bottom:4px;position:relative}
.lead::before{content:"↓";position:absolute;left:0;top:-22px;color:var(--mute)}
.tree{list-style:none;margin-left:6px;border-left:1px solid var(--bronze-3)}
.tree li{font-family:var(--font-mono);font-size:13px;color:var(--ink);padding:6px 0 6px 20px;position:relative}
.tree li::before{content:"";position:absolute;left:0;top:50%;width:12px;height:1px;background:var(--bronze-3)}
@media (max-width:860px){.pc{grid-template-columns:1fr}.col.ours{border-left:none;border-top:1px solid var(--rule)}}
</style>
