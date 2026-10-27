<script setup lang="ts">
import { illustrations } from '~/data/illustrations'
import { architecture } from '~/data/architecture'
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
          <p>Read it top to bottom. fortytwo owns the top three. The runtime owns the agent and what it can do. You own the machine.</p>
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
            <p>Telegram is the first channel adapter. It uses a bot for transport; the bot is not the assistant. A terminal is another way in.</p>
          </div>
          <ArchiveFigure v-bind="illustrations.telegram" />
        </div>
        <AccessPoints />
      </div>
    </section>

    <section id="optional" class="sec">
      <div class="wrap">
        <SectionLabel num="03" title="optional parts" />
        <div class="intro">
          <h2>Off the normal path, <em>on purpose.</em></h2>
          <p>Some pieces are useful but not required for the assistant to run.</p>
        </div>
        <dl class="opt">
          <div v-for="o in architecture.optional.items" :key="o.name"><dt class="mono">{{ o.name }}</dt><dd>{{ o.body }}</dd></div>
        </dl>
      </div>
    </section>

    <section id="deeper" class="sec">
      <div class="wrap">
        <SectionLabel num="04" title="under the hood" />
        <div class="intro">
          <h2>Small packages, <em>documented elsewhere.</em></h2>
          <p>fortytwo ships as small packages, and what each one does is in the <a class="inline" :href="site.docs">docs</a> and the <a class="inline" :href="site.github">package repositories</a>.</p>
        </div>
        <p class="more"><NuxtLink class="ghost" to="/always-on">Next: run it 24/7 <span class="ar">→</span></NuxtLink></p>
      </div>
    </section>
  </div>
</template>
<style scoped>
.notes{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:26px}
.notes li{font-size:16.5px;color:var(--ink-2);line-height:1.45;border-top:1px solid var(--rule);padding-top:10px}
.opt{max-width:62ch;border-top:1px solid var(--rule)}
.opt > div{padding:16px 0;border-bottom:1px solid var(--rule)}
dt{font-size:13px;letter-spacing:.5px;color:var(--bronze-3)}
dd{font-size:16.5px;color:var(--ink-2);margin-top:2px}
@media (max-width:860px){.notes{grid-template-columns:1fr}}
</style>
