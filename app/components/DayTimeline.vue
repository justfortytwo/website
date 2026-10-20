<script setup lang="ts">
import { day, dayNote } from '~/data/alwayson'
</script>
<template>
  <div>
    <ol class="tl">
      <li v-for="b in day" :key="b.time">
        <div class="t mono"><span class="h">{{ b.time }}</span><span v-if="b.zone" class="z">{{ b.zone }}</span></div>
        <div class="b">
          <p class="ev">{{ b.event }}</p>
          <p class="res"><span class="ar mono" aria-hidden="true">→</span>{{ b.result }}</p>
        </div>
      </li>
    </ol>
    <p class="note mono">{{ dayNote }}</p>
  </div>
</template>
<style scoped>
.tl{list-style:none;border-left:1px solid var(--ink-2);margin-left:6px}
.tl li{display:grid;grid-template-columns:120px 1fr;gap:20px;padding:0 0 34px 24px;position:relative}
.tl li::before{content:"";position:absolute;left:-4px;top:9px;width:7px;height:7px;background:var(--paper);border:1px solid var(--ink-2)}
.tl li:last-child{padding-bottom:6px}
.tl li:last-child::before{border-color:var(--bronze-3);background:var(--bronze-3)}
.t{font-size:22px;letter-spacing:-.5px;line-height:1.5}
.z{font-size:13px;letter-spacing:1.5px;color:var(--mute);margin-left:8px}
.ev{font-family:var(--font-serif);font-size:21px;line-height:1.3;letter-spacing:-.2px}
.res{font-size:16.5px;color:var(--ink-2);margin-top:4px;max-width:62ch}
.ar{color:var(--bronze-3);margin-right:8px}
.note{font-size:13px;color:var(--mute);margin-top:24px}
@media (max-width:680px){.tl li{grid-template-columns:1fr;gap:4px}}
</style>
