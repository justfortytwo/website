<script setup lang="ts">
import { illustrations } from '~/data/illustrations'
import { trustSections, enforces, doesNotEnforce } from '~/data/trust'

usePageSeo('trust')
const nums = trustSections.map((_, i) => String(i + 1).padStart(2, '0'))
const lastNum = String(trustSections.length + 1).padStart(2, '0')
</script>
<template>
  <div>
    <PageHero
      eyebrow="trust"
      title="Local-first, with the boundaries stated."
      lede="What fortytwo enforces, what it leaves to the runtime, and what still leaves your machine. This is a description of behaviour, not a promise of safety." />

    <section v-for="(s, i) in trustSections" :id="s.id" :key="s.id" class="sec">
      <div class="wrap">
        <SectionLabel :num="nums[i]" :title="s.heading.toLowerCase()" />
        <div class="intro">
          <h2>{{ s.heading }}</h2>
          <p>{{ s.lead }}</p>
        </div>
        <TrustBlock :claims="s.claims" />
      </div>
    </section>

    <section id="limits" class="sec">
      <div class="wrap">
        <SectionLabel :num="lastNum" title="enforces and does not" />
        <div class="split split--compact">
          <div class="intro">
            <h2>What fortytwo <em>enforces, and what it doesn’t.</em></h2>
          </div>
          <ArchiveFigure v-bind="illustrations.trust" />
        </div>
        <div class="two-col">
          <div>
            <h3>fortytwo enforces</h3>
            <ul><li v-for="e in enforces" :key="e">{{ e }}</li></ul>
          </div>
          <div>
            <h3>fortytwo leaves to others</h3>
            <ul><li v-for="e in doesNotEnforce" :key="e">{{ e }}</li></ul>
          </div>
        </div>
        <p class="more"><NuxtLink class="ghost" to="/">Back to the overview <span class="ar">→</span></NuxtLink></p>
      </div>
    </section>
  </div>
</template>
