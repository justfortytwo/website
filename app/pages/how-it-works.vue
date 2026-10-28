<script setup lang="ts">
import { illustrations } from '~/data/illustrations'
import { access } from '~/data/access'
import { stackNotes } from '~/data/stack'
import { site } from '~/data/site'

usePageSeo('how-it-works')
</script>
<template>
  <div>
    <PageHero
      eyebrow="how it works"
      title="Continuity around the runtime, not a layer in front of it."
      lede="You own the machine. fortytwo owns continuity and lifecycle. Claude Code owns reasoning and capabilities." />

    <section id="stack" class="sec">
      <div class="wrap">
        <SectionLabel num="01" title="the stack" />
        <div class="intro">
          <h2>Six layers, <em>three owners.</em></h2>
        </div>
        <StackPlate />
        <ul class="notes">
          <li v-for="n in stackNotes" :key="n">{{ n }}</li>
        </ul>
      </div>
    </section>

    <section id="access" class="sec">
      <div class="wrap">
        <SectionLabel num="02" title="access points" />
        <div class="split">
          <div class="intro">
            <h2>Channels are doors, <em>not separate assistants.</em></h2>
            <p>{{ access.note }} {{ access.adapters }}</p>
          </div>
          <ArchiveFigure v-bind="illustrations.telegram" />
        </div>
        <p class="more"><NuxtLink class="ghost" to="/always-on">Next: run it 24/7 <span class="ar">→</span></NuxtLink> <a class="ghost" :href="site.docs">Package reference in the docs <span class="ar">↗</span></a></p>
      </div>
    </section>
  </div>
</template>
<style scoped>
.more{display:flex;gap:28px;flex-wrap:wrap}
.notes{list-style:none;display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:26px}
.notes li{font-size:16.5px;color:var(--ink-2);line-height:1.45;border-top:1px solid var(--rule);padding-top:10px}
@media (max-width:860px){.notes{grid-template-columns:1fr}}
</style>
