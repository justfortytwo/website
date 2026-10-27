<script setup lang="ts">
import { illustrations } from '~/data/illustrations'
import { alwaysOnClaim } from '~/data/alwayson'
import { site } from '~/data/site'

usePageSeo('always-on')
</script>
<template>
  <div>
    <PageHero
      eyebrow="give it somewhere to live"
      title="Your agent already works. Now give it somewhere to stay."
      lede="On a machine that stays online, fortytwo keeps identity, memory, time and channels available, and Claude Code runs only when there is work." />

    <section id="what-247-means" class="sec">
      <div class="wrap">
        <SectionLabel num="01" title="what 24/7 means" />
        <div class="split">
          <div class="intro">
            <h2>{{ alwaysOnClaim.headline }}</h2>
            <p>{{ alwaysOnClaim.body }}</p>
          </div>
          <ArchiveFigure v-bind="illustrations.channels" />
        </div>
        <AvailabilitySplit />
      </div>
    </section>

    <section id="presence" class="sec">
      <div class="wrap">
        <SectionLabel num="02" title="session to presence" />
        <div class="intro">
          <h2>From a session <em>to a presence.</em></h2>
          <p>The agent is the same. What changes is whether anything around it stays up when you walk away.</p>
        </div>
        <PresenceContrast />
      </div>
    </section>

    <section id="where" class="sec">
      <div class="wrap">
        <SectionLabel num="03" title="where it lives" />
        <div class="intro">
          <h2>One architecture, <em>three places to put it.</em></h2>
          <p>These are not different products. They are different hosts for the same stack.</p>
        </div>
        <DeployContexts />
      </div>
    </section>

    <section id="day" class="sec">
      <div class="wrap">
        <SectionLabel num="04" title="a day in the life" />
        <div class="split split--compact">
          <div class="intro">
            <h2>What “still there” <em>looks like.</em></h2>
          </div>
          <ArchiveFigure v-bind="illustrations.time" />
        </div>
        <DayTimeline />
      </div>
    </section>

    <section id="service" class="sec">
      <div class="wrap">
        <SectionLabel num="05" title="as a service" />
        <div class="intro">
          <h2>Let your <em>supervisor</em> supervise.</h2>
          <p>fortytwo runs in the foreground on purpose. Your service manager or container runtime owns restarts and logs, and fortytwo exits non-zero if one of its services dies so a restart policy can do its job.</p>
        </div>
        <p class="more"><a class="ghost" :href="site.docs">Deployment guides in the docs <span class="ar">↗</span></a> <NuxtLink class="ghost" to="/trust">Next: the trust model <span class="ar">→</span></NuxtLink></p>
      </div>
    </section>
  </div>
</template>
<style scoped>
.more{display:flex;gap:28px;flex-wrap:wrap}
</style>
