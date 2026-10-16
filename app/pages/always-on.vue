<script setup lang="ts">
import { alwaysOnClaim, mentalModel, mentalModelClose } from '~/data/alwayson'

usePageSeo('always-on')
</script>
<template>
  <div>
    <PageHero
      eyebrow="give it somewhere to live"
      title="Your agent already works. Now give it somewhere to stay."
      lede="A coding agent normally feels like something you launch. On a machine that stays online, fortytwo keeps identity, memory, time and channels available, so the same kind of agent can behave like a persistent personal assistant." />

    <section id="presence" class="sec">
      <div class="wrap">
        <SectionLabel num="01" title="session to presence" />
        <div class="intro">
          <h2>From a session <em>to a presence.</em></h2>
          <p>The agent is the same. What changes is whether anything around it stays up when you walk away.</p>
        </div>
        <PresenceContrast />
      </div>
    </section>

    <section id="what-247-means" class="sec">
      <div class="wrap">
        <SectionLabel num="02" title="what 24/7 means" />
        <div class="intro">
          <h2>{{ alwaysOnClaim.headline }}</h2>
          <p>{{ alwaysOnClaim.body }}</p>
          <p>The model doesn’t need to run all day. The assistant needs to still be there when you come back.</p>
        </div>
        <AvailabilitySplit />
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
        <div class="callout model">
          <p>{{ mentalModel.join(' ') }}</p>
          <p>{{ mentalModelClose }}</p>
        </div>
      </div>
    </section>

    <section id="day" class="sec">
      <div class="wrap">
        <SectionLabel num="04" title="a day in the life" />
        <div class="intro">
          <h2>What “still there” <em>looks like.</em></h2>
        </div>
        <DayTimeline />
      </div>
    </section>

    <section id="service" class="sec">
      <div class="wrap">
        <SectionLabel num="05" title="as a service" />
        <div class="qs-grid">
          <TerminalBlock tag="systemd · excerpt">
            <div class="s"># the project init was run in</div>
            <div><span class="k">[Service]</span></div>
            <div><span class="k">WorkingDirectory=/path/to/project</span></div>
            <div><span class="k">ExecStart=/usr/bin/env npx fortytwo start</span></div>
            <div><span class="k">Restart=on-failure</span></div>
          </TerminalBlock>
          <div class="note">
            <h2 class="h2">Let your <em>supervisor</em> supervise.</h2>
            <p><span class="mono">fortytwo start</span> runs in the foreground on purpose. It stops its services on SIGTERM, and exits non-zero if one dies, so a restart policy kicks in. The same command works as a docker compose service.</p>
            <p class="meta mono">The host needs the runtime installed and signed in as it normally would, and a Telegram bot token if you use the channel.</p>
            <p class="more"><NuxtLink class="ghost" to="/trust">Next: the trust model <span class="ar">→</span></NuxtLink></p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.callout.model p:first-child{font-size:clamp(24px,3vw,34px)}
.qs-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:start}
.note p{font-size:15.5px;color:var(--ink-2);max-width:46ch;margin-bottom:12px}
.note .meta{font-size:13px;color:var(--mute)}
@media (max-width:860px){.qs-grid{grid-template-columns:1fr}}
</style>
