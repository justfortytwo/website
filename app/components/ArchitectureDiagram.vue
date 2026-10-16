<script setup lang="ts">
import { architecture as a } from '~/data/architecture'
</script>
<template>
  <figure class="arch">
    <div class="layer top">
      <div class="lh"><span class="name">{{ a.top.label }}</span><span class="cap">{{ a.top.caption }}</span></div>
      <ul class="chips"><li v-for="i in a.top.items" :key="i">{{ i }}</li></ul>
    </div>
    <div class="arrow" aria-hidden="true">▾</div>
    <div class="layer mid">
      <div class="lh"><span class="name">{{ a.adapter.label }}</span><span class="cap">{{ a.adapter.caption }}</span></div>
    </div>
    <div class="arrow" aria-hidden="true">▾</div>
    <div class="layer rt">
      <div class="lh"><span class="name">{{ a.runtime.label }}</span><span class="cap">{{ a.runtime.caption }}</span></div>
      <div class="owned">
        <div v-for="o in a.owned" :key="o.label" class="o">
          <span class="name sm">{{ o.label }}</span><span class="cap">{{ o.caption }}</span>
        </div>
      </div>
    </div>
    <figcaption>
      <ul class="notes"><li v-for="n in a.notes" :key="n">{{ n }}</li></ul>
    </figcaption>
  </figure>
</template>
<style scoped>
.arch{border:1px solid var(--rule);background:var(--paper);padding:26px}
.layer{border:1px solid var(--rule);padding:20px 22px;background:var(--paper)}
.layer.top{background:var(--ink);border-color:var(--ink);color:#e9e4d8}
.layer.rt{background:var(--paper-2)}
.lh{display:flex;align-items:baseline;justify-content:space-between;gap:14px;flex-wrap:wrap}
.name{font-family:var(--font-serif);font-weight:500;font-size:26px;letter-spacing:-.4px}
.name.sm{font-size:20px}
.cap{font-family:var(--font-mono);font-size:11px;letter-spacing:1px;color:var(--mute)}
.top .cap{color:#9a937f}
.chips{list-style:none;display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
.chips li{font-family:var(--font-mono);font-size:12px;letter-spacing:.5px;padding:5px 11px;border:1px solid #4a4334;color:var(--bronze-1)}
.arrow{text-align:center;font-family:var(--font-mono);color:var(--bronze-3);line-height:1.8}
.owned{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:16px}
.o{border:1px solid var(--rule);background:var(--paper);padding:14px 16px;display:flex;flex-direction:column;gap:2px}
.notes{list-style:none;margin-top:22px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.notes li{font-size:14px;color:var(--ink-2);line-height:1.45;border-top:1px solid var(--rule);padding-top:10px}
@media (max-width:760px){.owned,.notes{grid-template-columns:1fr}}
</style>
