<script setup lang="ts">
import { site } from '~/data/site'
import { boundary } from '~/data/boundary'

useSeoMeta({
  title: site.seo.title,
  description: site.seo.description,
  ogTitle: site.seo.ogTitle,
  ogDescription: site.seo.ogDescription,
  ogType: 'website',
  ogImage: '/og.png',
  twitterCard: 'summary_large_image',
  twitterTitle: site.seo.ogTitle,
  twitterDescription: site.seo.ogDescription,
  twitterImage: '/og.png',
})
useHead({
  link: [{ rel: 'canonical', href: `${site.url}/` }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'fortytwo',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux',
      description: site.seo.description,
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
    <section class="hero">
      <div class="wrap hero-grid">
        <div>
          <SectionLabel num="01" :title="site.hero.label" />
          <h1>{{ site.hero.headline }}</h1>
          <p class="statement">{{ site.hero.statement }}</p>
          <p class="lede">{{ site.hero.body }}</p>
          <div class="cta-row">
            <button type="button" class="term" @click="copyInstall" :title="copied ? 'Copied' : 'Click to copy'"><span class="pr mono">$</span><span class="inst mono">{{ installCmd }}</span><span class="c mono">{{ copied ? 'copied' : 'copy' }}</span></button>
            <NuxtLink class="ghost mono" to="#boundary">Where the line is <span class="ar">→</span></NuxtLink>
          </div>
          <p class="runtime-note mono">{{ site.runtime.note }}</p>
        </div>
        <TheMonument />
      </div>
    </section>

    <!-- 02 BOUNDARY -->
    <section id="boundary">
      <div class="wrap">
        <SectionLabel num="02" title="the boundary" />
        <div class="intro">
          <h2>{{ boundary.heading }}</h2>
          <p>{{ boundary.intro }}</p>
        </div>
        <BoundaryContrast />
        <p class="pull">{{ boundary.principle }}</p>
        <p class="aside">{{ boundary.ecosystem }}</p>
      </div>
    </section>

    <!-- 03 WHAT IT ADDS -->
    <section id="adds">
      <div class="wrap">
        <SectionLabel num="03" title="what it adds" />
        <div class="intro">
          <h2>Six things a session <em>does not keep.</em></h2>
          <p>A coding session ends. An assistant should not. These are the pieces that carry across.</p>
        </div>
        <ConceptGrid />
      </div>
    </section>

    <!-- 04 IN USE -->
    <section id="in-use">
      <div class="wrap">
        <SectionLabel num="04" title="in use" />
        <div class="intro">
          <h2>What it is like <em>to live with.</em></h2>
        </div>
        <SceneList />
      </div>
    </section>

    <!-- 05 ARCHITECTURE -->
    <section id="architecture">
      <div class="wrap">
        <SectionLabel num="05" title="architecture" />
        <div class="intro">
          <h2>Around the agent, <em>not in front of it.</em></h2>
          <p>fortytwo wraps the lifecycle of an existing runtime. {{ site.runtime.note }} Everything the agent can do natively, it still does natively.</p>
        </div>
        <ArchitectureDiagram />
        <div class="opt">
          <h3>Optional, where configured</h3>
          <p>Gate and salience are not on the normal path. Gate is a policy hook you can attach to the runtime. Salience helps memory decide what to keep.</p>
        </div>
        <h3 class="sub">Under the hood</h3>
        <p class="sub-p">Packages matter for installing and contributing. They are not the product. Grouped by what they are for:</p>
        <PackageGroups />
      </div>
    </section>

    <!-- 06 PRINCIPLES -->
    <section class="principle" id="principles">
      <div class="wrap">
        <SectionLabel num="06" title="principles" />
        <div class="intro">
          <h2>Restraint, <em>on purpose.</em></h2>
          <p>The most useful thing fortytwo can do is stay out of the agent’s way.</p>
        </div>
        <PrincipleGrid />
      </div>
    </section>

    <!-- 07 STATUS -->
    <section id="status">
      <div class="wrap">
        <SectionLabel num="07" title="what works today" />
        <div class="intro">
          <h2>Working, and <em>where it stops.</em></h2>
          <p>Each line below was checked against the package’s own README.</p>
        </div>
        <StatusList />
      </div>
    </section>

    <!-- 08 QUICK START -->
    <section id="quickstart">
      <div class="wrap">
        <SectionLabel num="08" title="quick start" />
        <div class="qs-grid">
          <TerminalBlock tag="three commands">
            <div class="s"># in a new, empty directory</div>
            <div><span class="pr">$</span> <span class="k">npx @justfortytwo/installer init</span></div>
            <div><span class="pr">$</span> <span class="k">fortytwo start</span>   <span class="s"># foreground · Ctrl+C stops it</span></div>
            <div><span class="pr">$</span> <span class="k">fortytwo pair</span>    <span class="s"># second terminal · prints a code</span></div>
            <div class="s" style="margin-top:12px"># then, in Telegram</div>
            <div><span class="pr">&gt;</span> <span class="c">/login</span> <span class="k">&lt;code&gt;</span></div>
            <div><span class="pr">&gt;</span> <span class="k">hello</span></div>
          </TerminalBlock>
          <div class="qs-note">
            <h2>Open Telegram. <em>Say hello.</em></h2>
            <p><span class="mono">init</span> installs the engine packages, captures who the assistant is and who it serves, wires memory, and renders the persona into plain files. <span class="mono">pair</span> issues a one-time code; until a chat redeems it, the bot ignores everyone.</p>
            <p class="meta mono">Needs Node ≥ 20 · Claude Code · Ollama for the local embedder · a Telegram bot token in <span class="mono">.env</span>.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MOTTO -->
    <section class="motto">
      <div class="wrap">
        <span class="stamp mono">STAY&nbsp;CALM</span>
        <p class="motto-h">The answer is 42.<br><em>The hard part is knowing the right question.</em></p>
        <div class="wordmark" aria-hidden="true">42</div>
      </div>
    </section>
  </div>
</template>
<style scoped>
section{padding:96px 0;border-top:1px solid var(--rule)}
.hero{padding:74px 0 96px;border-top:none}
.hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:48px;align-items:center}
.hero h1{font-family:var(--font-serif);font-weight:500;font-size:clamp(40px,5.6vw,66px);line-height:1.02;letter-spacing:-1.6px;margin:6px 0 16px;max-width:15ch}
.statement{font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,2.6vw,30px);line-height:1.2;color:var(--bronze-3);margin-bottom:22px;max-width:26ch}
.lede{font-size:18px;line-height:1.55;color:var(--ink-2);max-width:48ch;margin-bottom:30px}
.cta-row{display:flex;gap:14px;align-items:stretch;flex-wrap:wrap}
.term{background:var(--ink);color:#e9e4d8;padding:13px 16px;border-radius:3px;display:flex;align-items:center;gap:10px;border:0;font:inherit;cursor:pointer;text-align:left}
.term .pr{color:var(--bronze-1)} .term .inst{color:#fff;font-size:14px} .term .c{color:#9aa0a8}
.term:hover .c{color:var(--bronze-1)}
.ghost{font-size:13px;letter-spacing:.3px;padding:13px 4px;border-bottom:1px solid var(--ink)}
.ghost:hover{border-bottom-color:var(--bronze-3);color:var(--bronze-3)}
.ghost .ar{color:var(--bronze-3)}
.runtime-note{margin-top:20px;font-size:12px;letter-spacing:.4px;color:var(--mute)}
.intro{max-width:62ch;margin-bottom:42px}
.intro h2,.qs-note h2{font-family:var(--font-serif);font-weight:500;font-size:clamp(32px,4.2vw,46px);line-height:1.06;letter-spacing:-1px;margin-bottom:14px}
.intro h2 em,.qs-note h2 em{font-style:italic;color:var(--bronze-3)}
.intro p{font-size:17px;color:var(--ink-2)}
.pull{font-family:var(--font-serif);font-style:italic;font-size:clamp(22px,2.8vw,30px);line-height:1.25;letter-spacing:-.4px;max-width:34ch;margin:44px 0 14px}
.aside{font-size:15.5px;color:var(--ink-2);max-width:62ch}
.opt{margin-top:34px;max-width:62ch}
.opt h3,.sub{font-family:var(--font-mono);font-weight:400;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--bronze-3);margin-bottom:6px}
.opt p,.sub-p{font-size:15.5px;color:var(--ink-2)}
.sub{margin-top:64px}
.sub-p{margin-bottom:22px;max-width:62ch}
.qs-grid{display:grid;grid-template-columns:1fr 1fr;gap:36px;align-items:start}
.qs-note p{font-size:15.5px;color:var(--ink-2);max-width:46ch;margin-bottom:12px}
.qs-note .meta{margin-top:14px;font-size:13px;color:var(--mute)}
.motto{text-align:center;padding:120px 0 70px}
.motto .stamp{display:inline-block;font-size:11px;letter-spacing:3px;color:var(--bronze-3);border:1px solid var(--bronze-3);padding:6px 14px;margin-bottom:34px}
.motto-h{font-family:var(--font-serif);font-weight:400;font-size:clamp(32px,4.6vw,52px);line-height:1.14;letter-spacing:-1px;max-width:20ch;margin:0 auto}
.motto-h em{font-style:italic;color:var(--ink-2)}
.wordmark{font-family:var(--font-serif);font-weight:600;font-size:clamp(120px,18vw,200px);line-height:.8;letter-spacing:-10px;
  background:linear-gradient(158deg,var(--bronze-1) 0%,var(--bronze-2) 50%,var(--bronze-3) 100%);
  -webkit-background-clip:text;background-clip:text;color:transparent;margin:54px 0 10px}
@media (max-width:860px){
  .hero-grid,.qs-grid{grid-template-columns:1fr}
  .wrap{padding:0 22px}
  section{padding:72px 0}
  .term .inst{font-size:12.5px}
  .principle :deep(.prin-grid){grid-template-columns:1fr}
  .principle :deep(.p){border-right:none}
}
</style>
