<script setup lang="ts">
import { access as a } from '~/data/access'
</script>
<template>
  <figure class="ap">
    <div class="you"><Icon :name="a.you.icon" class="ic" aria-hidden="true" /><span class="mono">{{ a.you.name.toUpperCase() }}</span></div>
    <div class="vl" aria-hidden="true"></div>

    <div class="band">
      <div class="band-h mono">CHANNELS · <span>the doors</span></div>

      <div class="grp">
        <h3 class="gl mono">{{ a.live.label }}</h3>
        <ul class="live">
          <li v-for="p in a.live.points" :key="p.name" class="tile">
            <Icon :name="p.icon" class="ic big" aria-hidden="true" />
            <span class="tn">{{ p.name }}</span>
            <span class="td">{{ p.body }}</span>
          </li>
        </ul>
      </div>

      <div class="grp later">
        <h3 class="gl mono">{{ a.later.label }} <span class="badge">{{ a.later.badge }}</span></h3>
        <ul class="soon">
          <li v-for="p in a.later.points" :key="p.name" class="chip"><Icon :name="p.icon" class="ic" aria-hidden="true" /><span>{{ p.name }}</span></li>
          <li class="chip plus"><Icon name="lucide:plus" class="ic" aria-hidden="true" /><span>{{ a.later.yours }}</span></li>
        </ul>
        <p class="gn">{{ a.later.note }}</p>
      </div>
    </div>

    <div class="vl" aria-hidden="true"></div>
    <div class="core">
      <span class="cn">{{ a.shared.name }}</span>
      <ul><li v-for="i in a.shared.items" :key="i" class="mono">{{ i }}</li></ul>
    </div>
    <div class="vl" aria-hidden="true"></div>
    <div class="box mono">{{ a.adapter }}</div>
    <div class="vl" aria-hidden="true"></div>
    <div class="box mono">{{ a.agent }}</div>
    <figcaption>{{ a.note }}</figcaption>
  </figure>
</template>
<style scoped>
.ap{border:1px solid var(--rule);padding:30px 24px 22px;display:flex;flex-direction:column;align-items:center;background:var(--paper)}
.you{display:flex;flex-direction:column;align-items:center;gap:6px;font-size:11px;letter-spacing:3px;color:var(--ink-2)}
.you .ic{font-size:30px}
.ic{display:inline-block;width:1em;height:1em;flex:none}
.vl{width:1px;height:24px;background:var(--ink-2)}
.band{width:min(820px,100%);border:1px solid var(--ink);background:var(--paper-2);padding:16px 22px 22px}
.band-h{font-size:11px;letter-spacing:2.5px;color:var(--ink);padding-bottom:12px;border-bottom:1px solid var(--rule)}
.band-h span{color:var(--mute);letter-spacing:1px;text-transform:lowercase}
.grp{margin-top:18px}
.gl{font-weight:400;font-size:10.5px;letter-spacing:2px;text-transform:uppercase;color:var(--mute);margin-bottom:10px;display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.live{list-style:none;display:grid;grid-template-columns:1fr 1fr;gap:14px}
.tile{background:var(--paper);border:1px solid var(--ink);padding:16px 18px;display:grid;grid-template-columns:auto 1fr;grid-template-rows:auto auto;column-gap:14px;align-items:center}
.tile .big{font-size:34px;grid-row:1 / 3;color:var(--ink)}
.tn{font-family:var(--font-serif);font-weight:500;font-size:22px;letter-spacing:-.3px;line-height:1.1}
.td{font-size:14px;color:var(--ink-2);line-height:1.35}
.later{padding-top:16px;border-top:1px dashed var(--mute)}
.badge{color:var(--bronze-3);border:1px solid var(--bronze-3);padding:1px 7px;letter-spacing:1.2px}
.soon{list-style:none;display:flex;flex-wrap:wrap;gap:10px}
.chip{display:inline-flex;align-items:center;gap:8px;border:1px dashed var(--mute);color:var(--mute);padding:8px 13px;font-family:var(--font-mono);font-size:12.5px}
.chip .ic{font-size:18px}
.chip.plus{color:var(--bronze-3);border-color:var(--bronze-3)}
.gn{font-size:14px;color:var(--ink-2);margin-top:12px;max-width:62ch}
.core{border:1.5px solid var(--bronze-3);padding:14px 22px;text-align:center;min-width:min(360px,100%);background:var(--paper)}
.cn{font-family:var(--font-serif);font-weight:500;font-size:26px;color:var(--bronze-3);letter-spacing:-.4px}
.core ul{list-style:none;display:flex;gap:8px 16px;justify-content:center;flex-wrap:wrap;margin-top:4px}
.core li{font-size:12px;color:var(--ink-2)}
.box{border:1px solid var(--ink-2);padding:7px 20px;font-size:12.5px;letter-spacing:.5px;background:var(--paper)}
figcaption{margin-top:24px;padding-top:12px;border-top:1px solid var(--rule);font-size:14.5px;color:var(--ink-2);max-width:62ch;text-align:left;align-self:stretch}
@media (max-width:640px){.live{grid-template-columns:1fr}.band{padding:14px 14px 18px}}
</style>
