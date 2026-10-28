<script setup lang="ts">
import { illustrations } from '~/data/illustrations'
import { site } from '~/data/site'
import { pages } from '~/data/pages'
import { benefitsNote } from '~/data/benefits'

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
          <div class="cta-row">
            <button type="button" class="term" @click="copyInstall" :title="copied ? 'Copied' : 'Click to copy'"><span class="pr mono">$</span><span class="inst mono">{{ installCmd }}</span><span class="c mono" aria-live="polite">{{ copied ? 'copied' : 'copy' }}</span></button>
            <a class="ghost primary" href="#quickstart">Get started <span class="ar">→</span></a>
            <a class="ghost" :href="site.github">GitHub <span class="ar">↗</span></a>
          </div>
          <p class="runtime-note mono">{{ site.runtime.note }}</p>
        </div>
        <TheMonument />
      </div>
    </section>

    <!-- 02 WHAT YOU GET -->
    <section id="benefits" class="sec">
      <div class="wrap">
        <SectionLabel num="02" title="what you get" />
        <div class="intro">
          <h2>What changes <em>once it is installed.</em></h2>
        </div>
        <BenefitList />
        <p class="pull">{{ benefitsNote }}</p>
      </div>
    </section>

    <!-- 03 A DAY WITH IT -->
    <section id="day" class="sec">
      <div class="wrap">
        <SectionLabel num="03" title="a day with it" />
        <div class="intro">
          <h2>A day <em>with it.</em></h2>
        </div>
        <DayTimeline />
      </div>
    </section>

    <!-- 04 STATUS -->
    <section id="status" class="sec">
      <div class="wrap">
        <SectionLabel num="04" title="what works today" />
        <div class="intro">
          <h2>Working, and <em>where it stops.</em></h2>
        </div>
        <StatusList />
        <p class="more"><NuxtLink class="ghost" to="/trust">How trust works <span class="ar">→</span></NuxtLink></p>
      </div>
    </section>

    <!-- 05 QUICK START -->
    <section id="quickstart" class="sec">
      <div class="wrap">
        <SectionLabel num="05" title="quick start" />
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
            <p class="meta mono">Needs Claude Code, Node ≥ 20, an Ollama endpoint for embeddings and a Telegram bot token. Details are in the <a class="inline" :href="site.docs">docs</a>.</p>
          </div>
          <ArchiveFigure v-bind="illustrations.telegram" class="qs-fig" />
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
.statement{font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,2.6vw,30px);line-height:1.2;color:var(--bronze-3);margin-bottom:28px;max-width:32ch}
.term{background:var(--ink);color:#e9e4d8;padding:13px 16px;border-radius:3px;display:flex;align-items:center;gap:10px;border:0;font:inherit;cursor:pointer;text-align:left}
.hero .term{flex:1 1 100%}
.term .c{margin-left:auto}
.term .pr{color:var(--bronze-1)} .term .inst{color:#fff;font-size:14px} .term .c{color:#9aa0a8}
.term:hover .c{color:var(--bronze-1)}
.runtime-note{margin-top:20px;font-size:14px;letter-spacing:.3px;color:var(--ink-2)}
.qs-grid{display:grid;grid-template-columns:minmax(0,1fr) 300px;grid-template-areas:"commands illustration" "note illustration";column-gap:64px;row-gap:28px;align-items:start}
.qs-grid > :first-child{grid-area:commands}
.qs-note{grid-area:note}
.qs-note p{font-size:17px;color:var(--ink-2);max-width:46ch;margin-bottom:12px}
.qs-note .meta{margin-top:14px;font-size:14px;color:var(--mute)}
.motto{text-align:center;padding:120px 0 70px}
.motto .stamp{display:inline-block;font-size:13px;letter-spacing:3px;color:var(--bronze-3);border:1px solid var(--bronze-3);padding:6px 14px;margin-bottom:34px}
.motto-h{font-family:var(--font-serif);font-weight:400;font-size:clamp(24px,2.6vw,36px);line-height:1.2;letter-spacing:-.5px;max-width:30ch;margin:0 auto}
.qs-fig{grid-area:illustration;align-self:center;max-width:240px}
.qs-fig :deep(img){max-height:300px}
.motto-h em{font-style:italic;color:var(--ink-2)}
.wordmark{font-family:var(--font-serif);font-weight:600;font-size:clamp(120px,18vw,200px);line-height:.8;letter-spacing:-10px;
  background:linear-gradient(158deg,var(--bronze-1) 0%,var(--bronze-2) 50%,var(--bronze-3) 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;margin:54px 0 10px}
@media (max-width:860px){
  .hero-grid{grid-template-columns:1fr}
  .qs-grid{grid-template-columns:1fr;grid-template-areas:"commands" "note" "illustration";gap:28px}
  .qs-fig{max-width:180px}
  .qs-fig :deep(img){max-height:220px}
  .term .inst{font-size:14px}
}
</style>
