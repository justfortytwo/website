<script setup lang="ts">
import { architecture } from '~/data/architecture'
import { stackNotes } from '~/data/stack'

usePageSeo('how-it-works')
</script>
<template>
  <div>
    <PageHero
      eyebrow="how it works"
      title="Continuity around the runtime, not a layer in front of it."
      lede="fortytwo does not sit between the agent and each of its capabilities. It surrounds the runtime with what a personal assistant needs and a coding session does not keep." />

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

    <section id="responsibilities" class="sec">
      <div class="wrap">
        <SectionLabel num="02" title="responsibilities" />
        <div class="intro">
          <h2>Four jobs, <em>kept apart.</em></h2>
          <p>Understand the system by what each part is responsible for. Package names come last.</p>
        </div>
        <ResponsibilityMap />
        <ul class="notes">
          <li v-for="n in architecture.notes" :key="n">{{ n }}</li>
        </ul>
      </div>
    </section>

    <section id="access" class="sec">
      <div class="wrap">
        <SectionLabel num="03" title="access points" />
        <div class="intro">
          <h2>Channels are doors, <em>not separate assistants.</em></h2>
          <p>Telegram is not a bot with its own brain. It is one way of reaching the assistant that already lives in your project. A terminal is another.</p>
        </div>
        <AccessPoints />
      </div>
    </section>

    <section id="optional" class="sec">
      <div class="wrap">
        <SectionLabel num="04" title="optional parts" />
        <div class="intro">
          <h2>Off the normal path, <em>on purpose.</em></h2>
          <p>Some pieces are useful but not required for the assistant to run.</p>
        </div>
        <dl class="opt">
          <div v-for="o in architecture.optional.items" :key="o.name"><dt class="mono">{{ o.name }}</dt><dd>{{ o.body }}</dd></div>
        </dl>
      </div>
    </section>

    <section id="principles" class="sec">
      <div class="wrap">
        <SectionLabel num="05" title="principles" />
        <div class="intro">
          <h2>Restraint, <em>on purpose.</em></h2>
          <p>The most useful thing fortytwo can do is stay out of the agent’s way.</p>
        </div>
        <PrincipleGrid />
      </div>
    </section>

    <section id="packages" class="sec">
      <div class="wrap">
        <SectionLabel num="06" title="under the hood" />
        <div class="intro">
          <h2>Packages, <em>after the model.</em></h2>
          <p>Packages matter for installing and contributing. They are not the product. Grouped by what they are for. Each package’s README is the source of truth.</p>
        </div>
        <PackageGroups />
        <p class="more"><NuxtLink class="ghost" to="/always-on">Next: run it 24/7 <span class="ar">→</span></NuxtLink></p>
      </div>
    </section>
  </div>
</template>
<style scoped>
.notes{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:26px}
.notes li{font-size:14.5px;color:var(--ink-2);line-height:1.45;border-top:1px solid var(--rule);padding-top:10px}
.opt{max-width:62ch;border-top:1px solid var(--rule)}
.opt > div{padding:16px 0;border-bottom:1px solid var(--rule)}
dt{font-size:13px;letter-spacing:.5px;color:var(--bronze-3)}
dd{font-size:15.5px;color:var(--ink-2);margin-top:2px}
@media (max-width:860px){.notes{grid-template-columns:1fr}}
</style>
