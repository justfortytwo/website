<script setup lang="ts">
import { site } from '~/data/site'
useSeoMeta({
  title: 'fortytwo — a local-first personal-assistant spine',
  description: 'fortytwo wraps an existing agent with memory, a safety gate, channels, approvals, and audit — without replacing the agent you trust. The answer is 42.',
  ogTitle: 'fortytwo',
  ogDescription: 'A local-first personal-assistant spine for the agents you already use.',
  ogType: 'website',
  ogImage: '/og.png',
  twitterCard: 'summary_large_image',
})
useHead({
  link: [{ rel: 'canonical', href: 'https://forty-two.it/' }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'fortytwo',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cross-platform',
      description: 'A local-first personal-assistant spine for the agents and tools you already use.',
      url: 'https://forty-two.it/',
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
      url: 'https://github.com/justfortytwo',
    }),
  }],
})

const installCmd = 'npm i @justfortytwo/installer'
const copied = ref(false)
function copyInstall() {
  navigator.clipboard?.writeText(installCmd)
    .then(() => { copied.value = true; setTimeout(() => (copied.value = false), 1600) })
    .catch(() => { /* clipboard unavailable (non-secure context) — no-op */ })
}
</script>
<template>
  <div>
    <!-- HERO -->
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <div class="section-label"><span class="num">// 01</span><span>the answer</span></div>
          <h1>The answer is<br><span class="forty">forty<span class="two">two</span>.</span></h1>
          <p class="q">The hard part is knowing<br>the right question.</p>
          <p class="lede"><b>fortytwo</b> is a local-first personal-assistant spine for the agents and tools you already use. It wraps an existing harness with <b>memory, a safety gate, channels, approvals, and audit</b> — without replacing the agent you trust.</p>
          <div class="cta-row">
            <button type="button" class="term" @click="copyInstall" :title="copied ? 'Copied!' : 'Click to copy'"><span class="pr mono">$</span><span class="inst mono">{{ installCmd }}</span><span class="c mono">{{ copied ? 'copied ✓' : 'copy ⧉' }}</span></button>
            <NuxtLink class="ghost mono" to="https://github.com/justfortytwo">Read the brief <span class="ar">→</span></NuxtLink>
          </div>
        </div>
        <TheMonument />
      </div>
    </section>

    <!-- QUICK START -->
    <section>
      <div class="wrap">
        <div class="section-label"><span class="num">// 02</span><span>quick start</span></div>
        <div class="qs-grid">
          <TerminalBlock tag="install · create-fortytwo">
            <div class="s"># bring the spine to your machine</div>
            <div><span class="pr">$</span> <span class="k">npm i @justfortytwo/installer</span></div>
            <div><span class="pr">$</span> <span class="k">npx create-fortytwo</span> <span class="c">init</span>    <span class="s"># identity · persona · engine · provision</span></div>
            <div><span class="pr">$</span> <span class="k">npx fortytwo</span> <span class="c">doctor</span>         <span class="s"># contracts · migrations · embedder</span></div>
            <div class="s" style="margin-top:12px"># or, in claude code —</div>
            <div><span class="pr">&gt;</span> <span class="c">/plugin marketplace add</span> <span class="k">justfortytwo/marketplace</span></div>
            <div><span class="pr">&gt;</span> <span class="c">/plugin install</span> <span class="k">fortytwo@fortytwo</span></div>
          </TerminalBlock>
          <div class="qs-note">
            <h3>Two surfaces, one operator.</h3>
            <p>The <b>npm engine</b> ships the reusable machinery — memory, the gate, channel adapters — as <span class="mono">@justfortytwo/*</span> packages wired in as plugins. The <b>scaffolded persona</b> (<span class="mono">CLAUDE.md</span> + <span class="mono">context/*</span>) is per-user, personal, and gitignored. <span class="mono">create-fortytwo</span> / <span class="mono">fortytwo</span> is the single CLI over both — and <span class="mono">init</span> installs the engine for you.</p>
            <p class="meta mono">Node ≥ 18 · Ollama for the local embedder · SQLite + vectors, all on your machine.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- DECOMPOSITION -->
    <section id="components">
      <div class="wrap">
        <div class="section-label"><span class="num">// 03</span><span>the decomposition</span></div>
        <div class="decomp-intro">
          <h2>Seven parts. <em>One spine.</em></h2>
          <p>fortytwo is decomposed into independent, composable pieces — each named for the role it plays, each on npm. Bring your own agent; assemble the spine you need. The contract matters more than the adapter.</p>
        </div>
        <DecompChart />
      </div>
    </section>

    <!-- PRINCIPLES -->
    <section class="principle" id="principles">
      <div class="wrap">
        <div class="section-label"><span class="num">// 04</span><span>principles</span></div>
        <h2 class="prin-h">Conservative by design.</h2>
        <p class="prin-sub">Personal assistants get useful when they can remember, act, and improve. They get dangerous when that’s added without boundaries.</p>
        <PrincipleGrid />
      </div>
    </section>

    <!-- STATUS -->
    <section>
      <div class="wrap">
        <div class="section-label"><span class="num">// 05</span><span>status</span></div>
        <StatusPanel />
      </div>
    </section>

    <!-- MOTTO -->
    <section class="motto">
      <div class="wrap">
        <span class="stamp mono">STAY&nbsp;CALM</span>
        <h2>Ask the right question.<br><em>Never cross the gate silently.</em></h2>
        <div class="wordmark">42</div>
      </div>
    </section>
  </div>
</template>
<style scoped>
section{padding:96px 0;border-top:1px solid var(--rule)}
.hero{padding:74px 0 96px;border-top:none}
.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}
.hero h1{font-family:var(--font-serif);font-weight:500;font-size:clamp(48px,7vw,78px);line-height:.98;letter-spacing:-2px;margin:6px 0 14px}
.hero .two{color:var(--bronze-3)}
.q{font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,2.6vw,30px);line-height:1.2;color:var(--ink-2);margin-bottom:26px;max-width:24ch}
.lede{font-size:18px;line-height:1.55;color:var(--ink-2);max-width:46ch;margin-bottom:30px}
.lede b{color:var(--ink);font-weight:500}
.cta-row{display:flex;gap:14px;align-items:stretch;flex-wrap:wrap}
.term{background:var(--ink);color:#e9e4d8;padding:13px 16px;border-radius:3px;display:flex;align-items:center;gap:10px;border:0;font:inherit;cursor:pointer;text-align:left}
.term .c{cursor:pointer}
.term .pr{color:var(--bronze-1)} .term .inst{color:#fff} .term .c{color:#9aa0a8}
.ghost{font-size:13px;letter-spacing:.3px;padding:13px 4px;border-bottom:1px solid var(--ink)}
.ghost .ar{color:var(--bronze-3)}
.qs-grid{display:grid;grid-template-columns:1fr 1fr;gap:28px}
.qs-note h3{font-family:var(--font-serif);font-weight:500;font-size:24px;letter-spacing:-.3px;margin-bottom:12px}
.qs-note p{font-size:15.5px;color:var(--ink-2);max-width:42ch}
.qs-note .meta{margin-top:14px;font-size:13.5px;color:var(--mute)}
.decomp-intro{max-width:60ch;margin-bottom:46px}
.decomp-intro h2{font-family:var(--font-serif);font-weight:500;font-size:clamp(34px,4.4vw,46px);line-height:1.05;letter-spacing:-1px;margin-bottom:16px}
.decomp-intro h2 em{font-style:italic;color:var(--bronze-3)}
.decomp-intro p{font-size:17px;color:var(--ink-2)}
.prin-h{font-family:var(--font-serif);font-weight:500;font-size:clamp(34px,4.4vw,46px);letter-spacing:-1px;margin-bottom:6px}
.prin-sub{font-style:italic;color:var(--ink-2);margin-bottom:40px;font-size:19px}
.motto{text-align:center;border-top:none;padding:120px 0 70px}
.motto .stamp{display:inline-block;font-size:11px;letter-spacing:3px;color:var(--bronze-3);border:1px solid var(--bronze-3);padding:6px 14px;margin-bottom:34px}
.motto h2{font-family:var(--font-serif);font-weight:400;font-size:clamp(34px,5vw,54px);line-height:1.12;letter-spacing:-1px;max-width:18ch;margin:0 auto}
.motto h2 em{font-style:italic;color:var(--ink-2)}
.wordmark{font-family:var(--font-serif);font-weight:600;font-size:clamp(120px,18vw,200px);line-height:.8;letter-spacing:-10px;
  background:linear-gradient(158deg,var(--bronze-1) 0%,var(--bronze-2) 50%,var(--bronze-3) 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;margin:54px 0 10px}
@media (max-width:860px){
  .hero-grid,.qs-grid{grid-template-columns:1fr}
  :deep(.chart){grid-template-columns:1fr}
  :deep(.chart .node){grid-column:auto;border-right:none}
  .principle :deep(.prin-grid){grid-template-columns:1fr}
  :deep(.stat-grid){grid-template-columns:1fr}
  :deep(.stat.left){border-left:none;border-top:1px solid var(--rule)}
}
</style>
