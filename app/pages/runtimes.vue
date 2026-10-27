<script setup lang="ts">
import { illustrations } from '~/data/illustrations'
import { site } from '~/data/site'
import { runtimeBoundary, providerNote, noDuplication } from '~/data/runtimes'

usePageSeo('runtimes')
</script>
<template>
  <div>
    <PageHero
      eyebrow="runtime support"
      title="Claude Code is the only supported runtime today."
      lede="fortytwo adds continuity around a coding-agent runtime. It makes no attempt to be the agent." />

    <section id="support" class="sec">
      <div class="wrap">
        <SectionLabel num="01" title="supported today" />
        <div class="split">
          <div class="intro">
            <h2>One runtime, <em>said plainly.</em></h2>
            <p>{{ site.runtime.note }} Nothing else is supported, and nothing here should read as if it were.</p>
          </div>
          <ArchiveFigure v-bind="illustrations.runtime" />
        </div>
        <RuntimeTable />
        <p class="aside more">{{ providerNote }}</p>
      </div>
    </section>

    <section id="boundary" class="sec">
      <div class="wrap">
        <SectionLabel num="02" title="the boundary" />
        <div class="intro">
          <h2>Who owns <em>what.</em></h2>
          <p>The runtime keeps getting better on its own. fortytwo keeps the assistant going around it.</p>
        </div>
        <BoundaryContrast v-bind="runtimeBoundary" />
        <p class="aside more">{{ noDuplication }}</p>
      </div>
    </section>

    <section id="status" class="sec">
      <div class="wrap">
        <SectionLabel num="03" title="what works today" />
        <div class="intro">
          <h2>Working, and <em>where it stops.</em></h2>
          <p>fortytwo is pre-release software. This is what ships now.</p>
        </div>
        <StatusList />
        <p class="more"><NuxtLink class="ghost" to="/trust">Next: the trust model <span class="ar">→</span></NuxtLink></p>
      </div>
    </section>
  </div>
</template>
