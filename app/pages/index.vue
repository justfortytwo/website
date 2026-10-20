<script setup lang="ts">
import { site } from '~/data/site'
import { pages } from '~/data/pages'
import { boundary } from '~/data/boundary'
import { alwaysOnClaim } from '~/data/alwayson'
import { sessionNote } from '~/data/concepts'

usePageSeo('home')
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'fortytwo',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux',
      description: pages.home.description,
      url: `${site.url}/`,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@type': 'Person', name: site.author },
      license: 'https://opensource.org/license/mit',
    }),
  }, {
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'justfortytwo',
      url: site.github,
    }),
  }],
})

const installCmd = 'npx @justfortytwo/installer init'
const copied = ref(false)
function copyInstall() {
  navigator.clipboard?.writeText(installCmd)
    .then(() => { copied.value = true; setTimeout(() => (copied.value = false), 1600) })
    .catch(() => { /* clipboard unavailable (non-secure context) — no-op */ })
}
</script>
<template>
  <div>
    <!-- 01 HERO -->
    <section class="sec first hero">
      <div class="wrap hero-grid">
        <div>
          <SectionLabel num="01" :title="site.hero.label" />
          <h1>{{ site.hero.headline }}</h1>
          <p class="statement">{{ site.hero.statement }}</p>
          <p class="lede">{{ site.hero.body }}</p>
          <div class="cta-row">
            <button type="button" class="term" @click="copyInstall" :title="copied ? 'Copied' : 'Click to copy'"><span class="pr mono">$</span><span class="inst mono">{{ installCmd }}</span><span class="c mono" aria-live="polite">{{ copied ? 'copied' : 'copy' }}</span></button>
            <a class="ghost primary" href="#quickstart">Get started <span class="ar">→</span></a>
            <a class="ghost" :href="site.github">GitHub <span class="ar">↗</span></a>
          </div>
          <p class="runtime-note mono">{{ site.runtime.note }} <NuxtLink class="inline" to="/runtimes">Runtime support</NuxtLink></p>
        </div>
        <TheMonument />
      </div>
    </section>

    <!-- 02 BOUNDARY -->
    <section id="boundary" class="sec">
      <div class="wrap">
        <SectionLabel num="02" title="the boundary" />
        <div class="intro">
          <h2>{{ boundary.heading }} <em>{{ boundary.headingEm }}</em></h2>
          <p>{{ boundary.intro }}</p>
        </div>
        <BoundaryContrast />
        <p class="pull">{{ boundary.principle }}</p>
        <p class="aside">{{ boundary.ecosystem }}</p>
      </div>
    </section>

    <!-- 03 WHAT IT ADDS -->
    <section id="adds" class="sec">
      <div class="wrap">
        <SectionLabel num="03" title="what it adds" />
        <div class="intro">
          <h2>Five things <em>a session doesn’t keep.</em></h2>
          <p>A coding session ends and takes its context with it. fortytwo supplies continuity across sessions: who the assistant is, what it remembers, when it acts and how you reach it.</p>
        </div>
        <ConceptGrid />
        <div class="pair">
          <ArchiveFigure src="/img/memory-card-catalogue.jpg" :width="1920" :height="1624"
            alt="Open drawer in a wooden library card catalogue, with index cards inside and labelled drawers around it"
            caption="Library card catalogue." />
          <ArchiveFigure src="/img/time-pocket-watch.jpg" :width="1280" :height="1690"
            alt="Coloured engraving titled Mechanism of a Watch, showing the parts of a pocket watch"
            caption="Mechanism of a watch. Engraving, early 19th century." />
        </div>
        <div class="callout">
          <p>{{ sessionNote.lead }}</p>
          <p>{{ sessionNote.body }}</p>
        </div>
      </div>
    </section>

    <!-- 04 SESSION -> PRESENCE -->
    <section id="presence" class="sec">
      <div class="wrap">
        <SectionLabel num="04" title="session to presence" />
        <div class="intro">
          <h2>From a session <em>to a presence.</em></h2>
          <p>A coding agent usually feels like something you launch. Put fortytwo on a machine that stays online and Claude Code can stay reachable.</p>
        </div>
        <div class="split">
          <div>
            <div class="callout first-callout">
              <p>{{ alwaysOnClaim.headline }}</p>
              <p>{{ alwaysOnClaim.body }}</p>
            </div>
            <p class="more"><NuxtLink class="ghost" to="/always-on">Run it 24/7 <span class="ar">→</span></NuxtLink></p>
          </div>
          <ArchiveFigure src="/img/channels-switchboard.jpg" :width="1920" :height="1527"
            alt="Five switchboard operators seated at a telephone exchange, photographed in 1958"
            caption="Switchboard operators, 1958." />
        </div>
      </div>
    </section>

    <!-- 05 ARCHITECTURE -->
    <section id="architecture" class="sec">
      <div class="wrap">
        <SectionLabel num="05" title="architecture" />
        <div class="intro">
          <h2>You, fortytwo, <em>Claude Code.</em></h2>
          <p>You own the machine. fortytwo owns continuity and lifecycle. Claude Code owns reasoning and capabilities.</p>
        </div>
        <StackPlate compact />
        <p class="more"><NuxtLink class="ghost" to="/how-it-works">Explore how it works <span class="ar">→</span></NuxtLink></p>
      </div>
    </section>

    <!-- 06 EXPLORE -->
    <section id="explore" class="sec">
      <div class="wrap">
        <SectionLabel num="06" title="go deeper" />
        <div class="intro">
          <h2>Four short pages, <em>no maze.</em></h2>
          <p>This site explains the product. Installation, configuration and reference live in the <a class="inline" :href="site.docs">docs</a>.</p>
        </div>
        <ExploreLinks />
      </div>
    </section>

    <!-- 07 QUICK START -->
    <section id="quickstart" class="sec">
      <div class="wrap">
        <SectionLabel num="07" title="quick start" />
        <div class="qs-grid">
          <TerminalBlock tag="three commands">
            <div class="s"># in a new, empty directory</div>
            <div><span class="pr">$</span> <span class="k">npx @justfortytwo/installer init</span></div>
            <div><span class="pr">$</span> <span class="k">fortytwo start</span>   <span class="s"># foreground · Ctrl+C stops it</span></div>
            <div><span class="pr">$</span> <span class="k">fortytwo pair</span>    <span class="s"># second terminal · prints a one-time code</span></div>
          </TerminalBlock>
          <div class="qs-note">
            <h2 class="h2">Open Telegram. <em>Say hello.</em></h2>
            <p>Send the one-time code to your bot and you are talking to the assistant. Until a chat is paired, the bot ignores everyone.</p>
            <p class="meta mono">Needs Claude Code and Node ≥ 20. Full prerequisites are in the docs.</p>
          </div>
          <ArchiveFigure class="qs-fig" src="/img/telegram-telegraphists.jpg" :width="1080" :height="1230"
            alt="Engraving of three telegraph operators at their desks sending and receiving messages"
            caption="Telegraph operators. Engraving, 19th century." />
        </div>
      </div>
    </section>

    <!-- FINAL CTA -->
    <section class="sec final-cta">
      <div class="wrap">
        <p class="cta-h">Give your agent <em>continuity.</em></p>
        <div class="cta-row">
          <a class="ghost primary" :href="site.docs">Get started <span class="ar">→</span></a>
          <a class="ghost" :href="site.github">GitHub <span class="ar">↗</span></a>
        </div>
      </div>
    </section>

    <!-- MOTTO -->
    <section class="sec motto">
      <div class="wrap">
        <span class="stamp mono">STAY&nbsp;CALM</span>
        <p class="motto-h">The answer is 42.<br><em>The hard part is knowing the right question.</em></p>
        <div class="wordmark" aria-hidden="true">42</div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.hero{padding:74px 0 96px}
.hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center}
.hero h1{font-family:var(--font-serif);font-weight:500;font-size:clamp(40px,5.6vw,66px);line-height:1.02;letter-spacing:-1.6px;margin:6px 0 16px;max-width:15ch}
.statement{font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,2.6vw,30px);line-height:1.2;color:var(--bronze-3);margin-bottom:22px;max-width:26ch}
.lede{font-size:21px;line-height:1.5;color:var(--ink);max-width:36ch;margin-bottom:30px}
.term{background:var(--ink);color:#e9e4d8;padding:13px 16px;border-radius:3px;display:flex;align-items:center;gap:10px;border:0;font:inherit;cursor:pointer;text-align:left}
.hero .term{flex:1 1 100%}
.term .c{margin-left:auto}
.term .pr{color:var(--bronze-1)} .term .inst{color:#fff;font-size:14px} .term .c{color:#9aa0a8}
.term:hover .c{color:var(--bronze-1)}
.runtime-note{margin-top:20px;font-size:14px;letter-spacing:.3px;color:var(--ink-2)}
.qs-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:start}
.qs-note p{font-size:17px;color:var(--ink-2);max-width:46ch;margin-bottom:12px}
.qs-note .meta{margin-top:14px;font-size:14px;color:var(--mute)}
.cta-h{font-family:var(--font-serif);font-weight:500;font-size:clamp(32px,4.2vw,46px);line-height:1.06;letter-spacing:-1px;margin-bottom:22px}
.cta-h em{font-style:italic;color:var(--bronze-3)}
.final-cta{padding:72px 0}
.motto{text-align:center;padding:120px 0 70px}
.motto .stamp{display:inline-block;font-size:13px;letter-spacing:3px;color:var(--bronze-3);border:1px solid var(--bronze-3);padding:6px 14px;margin-bottom:34px}
.motto-h{font-family:var(--font-serif);font-weight:400;font-size:clamp(24px,2.6vw,36px);line-height:1.2;letter-spacing:-.5px;max-width:30ch;margin:0 auto}
.split{margin-bottom:0}
.first-callout{margin-top:0}
.qs-fig{grid-column:2;max-width:420px}
.motto-h em{font-style:italic;color:var(--ink-2)}
.wordmark{font-family:var(--font-serif);font-weight:600;font-size:clamp(120px,18vw,200px);line-height:.8;letter-spacing:-10px;
  background:linear-gradient(158deg,var(--bronze-1) 0%,var(--bronze-2) 50%,var(--bronze-3) 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;margin:54px 0 10px}
@media (max-width:860px){
  .hero-grid,.qs-grid{grid-template-columns:1fr}
  .qs-fig{grid-column:1}
  .term .inst{font-size:14px}
}
</style>
