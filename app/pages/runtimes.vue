<script setup lang="ts">
import { site } from '~/data/site'
import { runtimeOwns, adapterNeeds, providerNote, noDuplication } from '~/data/runtimes'

usePageSeo('runtimes')
</script>
<template>
  <div>
    <PageHero
      eyebrow="runtimes"
      title="Claude Code is the first runtime, not the boundary."
      lede="fortytwo wraps a coding-agent runtime through a thin adapter. It makes no attempt to be the agent." />

    <section id="support" class="sec">
      <div class="wrap">
        <SectionLabel num="01" title="supported today" />
        <div class="intro">
          <h2>One runtime, <em>said plainly.</em></h2>
          <p>{{ site.runtime.note }} No other runtime is supported today, and nothing here should read as if it were.</p>
        </div>
        <RuntimeTable />
        <p class="aside more">{{ providerNote }}</p>
      </div>
    </section>

    <section id="owned" class="sec">
      <div class="wrap">
        <SectionLabel num="02" title="runtime-owned" />
        <div class="intro">
          <h2>What stays <em>with the runtime.</em></h2>
          <p>Tools, MCP servers, plugins and skills belong to the runtime’s ecosystem. When the agent gets better at them, the assistant does too.</p>
        </div>
        <ul class="plain-list">
          <li v-for="o in runtimeOwns" :key="o">{{ o }}</li>
        </ul>
        <p class="aside more">{{ noDuplication }}</p>
      </div>
    </section>

    <section id="adapter" class="sec">
      <div class="wrap">
        <SectionLabel num="03" title="the adapter seam" />
        <div class="intro">
          <h2>What the adapter <em>asks of a runtime.</em></h2>
          <p>The adapter owns process and session lifecycle and stream transport, nothing about the agent itself. These are the Claude Code features it relies on today.</p>
        </div>
        <dl class="needs">
          <div v-for="n in adapterNeeds" :key="n.need"><dt>{{ n.need }}</dt><dd>{{ n.today }}</dd></div>
        </dl>
      </div>
    </section>

    <section id="status" class="sec">
      <div class="wrap">
        <SectionLabel num="04" title="what works today" />
        <div class="intro">
          <h2>Working, and <em>where it stops.</em></h2>
          <p>Each line below was checked against the package’s own README.</p>
        </div>
        <StatusList />
        <p class="more"><NuxtLink class="ghost" to="/trust">Next: the trust model <span class="ar">→</span></NuxtLink></p>
      </div>
    </section>
  </div>
</template>
<style scoped>
.needs{border-top:1px solid var(--rule)}
.needs > div{display:grid;grid-template-columns:minmax(200px,.8fr) 2fr;gap:24px;padding:18px 0;border-bottom:1px solid var(--rule)}
dt{font-family:var(--font-serif);font-weight:500;font-size:21px;letter-spacing:-.2px}
dd{font-size:15.5px;color:var(--ink-2)}
@media (max-width:760px){.needs > div{grid-template-columns:1fr;gap:4px}}
</style>
