<script setup lang="ts">
import { components } from '~/data/components'
const spans = ['sp4','sp4','sp4','sp6','sp6','sp6','sp6']
const noRight = [2,4,6]
</script>
<template>
  <div class="chart">
    <div v-for="(c,i) in components" :key="c.codename" class="node" :class="[spans[i], { noright: noRight.includes(i) }]">
      <div class="cn">// 0{{ i+1 }}</div>
      <div class="name">{{ c.codename }}</div>
      <div class="role">{{ c.role }}</div>
      <div class="desc">{{ c.description }} <span v-if="c.state==='design'" class="design">— in design</span></div>
      <div class="mark">{{ c.state==='design' ? '·' : '▸' }}</div>
    </div>
    <div class="umbrella">
      <span class="u-l">// umbrella</span>
      <span class="u-n">fortytwo</span>
      <span class="u-r">the spine · v0 · MIT</span>
    </div>
  </div>
</template>
<style scoped>
.chart{position:relative;display:grid;grid-template-columns:repeat(12,1fr);border:1px solid var(--rule);background:var(--paper-2)}
.node{position:relative;padding:26px 24px;border-right:1px solid var(--rule);border-bottom:1px solid var(--rule);background:var(--paper)}
.node.noright{border-right:none}
.node:hover{background:var(--paper-2)}
.cn{font-family:var(--font-mono);font-size:10px;color:var(--mute);letter-spacing:1.5px}
.name{font-family:var(--font-serif);font-weight:500;font-size:28px;letter-spacing:-.5px;margin:4px 0 2px}
.role{font-family:var(--font-mono);font-size:11px;color:var(--bronze-3);letter-spacing:.5px;text-transform:uppercase;margin-bottom:12px}
.desc{font-size:14px;color:var(--ink-2);line-height:1.45}
.design{color:var(--mute)}
.mark{position:absolute;top:18px;right:18px;font-family:var(--font-mono);font-size:11px;color:var(--rule)}
.sp4{grid-column:span 4} .sp6{grid-column:span 6}
.umbrella{grid-column:span 12;padding:22px 24px;display:flex;align-items:center;justify-content:space-between;
  background:var(--ink);color:#e9e4d8}
.u-l{font-family:var(--font-mono);font-size:11px;letter-spacing:1.5px;color:#8a8470}
.u-n{font-family:var(--font-serif);font-size:30px;font-weight:500}
.u-r{font-family:var(--font-mono);font-size:11px;color:#9a937f;letter-spacing:1px}
</style>
