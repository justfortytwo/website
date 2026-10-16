import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const out = '.output/public'
const ORIGIN = 'https://forty-two.it'
const routes = ['/', '/how-it-works', '/always-on', '/runtimes', '/trust']
const fails = []
const assert = (cond, msg) => { if (!cond) fails.push(msg) }

// --- helpers ---------------------------------------------------------------
const fileFor = (route) => [join(out, route, 'index.html'), join(out, `${route}.html`)].find(existsSync)
const visible = (html) => html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&#x27;|&#39;/g, '\'')
  .replace(/\s+/g, ' ')

// --- every intended route is prerendered ------------------------------------
const pages = {}
for (const r of routes) {
  const f = fileFor(r)
  assert(f, `route ${r} was not prerendered`)
  if (f) pages[r] = { html: readFileSync(f, 'utf8') }
}
for (const p of Object.values(pages)) p.text = visible(p.html)
const llms = readFileSync(join(out, 'llms.txt'), 'utf8')
const robots = readFileSync(join(out, 'robots.txt'), 'utf8')
const sitemapFile = ['sitemap.xml', 'sitemap_index.xml'].map(f => join(out, f)).find(existsSync)
assert(sitemapFile, 'sitemap.xml missing')
const sitemap = sitemapFile ? readFileSync(sitemapFile, 'utf8') : ''

// --- structure, per page -----------------------------------------------------
const titles = new Set()
for (const [route, { html, text }] of Object.entries(pages)) {
  const at = (m) => `${route}: ${m}`
  assert(/<html[^>]*lang="en"/.test(html), at('html lang=en missing'))
  assert((html.match(/<h1[\s>]/g) || []).length === 1, at('not exactly one <h1>'))
  assert(/<main[\s>]/.test(html), at('<main> landmark missing'))
  assert(/href="#main"/.test(html), at('skip link missing'))
  const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map(m => Number(m[1]))
  levels.forEach((l, i) => { if (i > 0 && l - levels[i - 1] > 1) fails.push(at(`heading level skips from h${levels[i - 1]} to h${l}`)) })

  // section labels run // 01 .. // NN with no gaps
  const nums = [...html.matchAll(/class="section-label"[^>]*><span class="num">\/\/ (\d{2})</g)].map(m => Number(m[1]))
  assert(nums.length >= 3, at('too few section labels'))
  nums.forEach((n, i) => { if (n !== i + 1) fails.push(at(`section labels are not sequential (saw ${nums.join(', ')})`)) })

  // seo
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1]
  assert(title, at('<title> missing'))
  assert(!titles.has(title), at('duplicate <title>'))
  titles.add(title)
  assert(/name="description" content="[^"]{60,}"/.test(html), at('meta description missing or too short'))
  assert(/property="og:image"/.test(html), at('og:image missing'))
  assert(/property="og:title"/.test(html), at('og:title missing'))
  assert(/name="twitter:card"/.test(html), at('twitter:card missing'))
  const canon = html.match(/rel="canonical"[^>]*href="([^"]+)"/)?.[1] ?? html.match(/href="([^"]+)"[^>]*rel="canonical"/)?.[1]
  assert(canon === (route === '/' ? `${ORIGIN}/` : `${ORIGIN}${route}`), at(`canonical is ${canon}`))
  const ld = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
  assert(ld.length >= 1, at('JSON-LD missing'))
  for (const m of ld) { try { JSON.parse(m[1]) } catch { fails.push(at('JSON-LD block is not valid JSON')) } }

  // sitemap
  const loc = route === '/' ? `${ORIGIN}/` : `${ORIGIN}${route}`
  assert(sitemap.includes(`<loc>${loc}</loc>`) || (route === '/' && sitemap.includes(`<loc>${ORIGIN}</loc>`)), at('missing from sitemap'))
  assert(llms.includes(`${ORIGIN}${route === '/' ? '/' : route}`), at('missing from llms.txt'))

  // internal links resolve to a prerendered route
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)(?:#[^"]*)?"/g)) {
    const href = m[1].replace(/\/$/, '') || '/'
    if (/\.(svg|png|ico|txt|xml)$/.test(href)) continue
    assert(routes.includes(href), at(`links to ${m[1]}, which is not a prerendered route`))
  }
  // header nav carries the product IA
  for (const r of routes.slice(1)) assert(html.includes(`href="${r}"`), at(`nav link ${r} missing`))
}
assert(/\/sitemap\.xml|sitemap_index\.xml/.test(robots), 'robots.txt missing sitemap ref')

// --- per-page product invariants ----------------------------------------------
const home = pages['/'], how = pages['/how-it-works'], on = pages['/always-on'], rt = pages['/runtimes'], tr = pages['/trust']
if (home) {
  assert(/<h1[^>]*>\s*Your coding agent is already powerful\./.test(home.html), '/: h1 does not carry the positioning')
  assert(home.text.includes('fortytwo makes it personal, persistent, and always there.'), '/: product statement missing')
  assert(home.text.includes('Claude Code is the first supported runtime. More can follow.'), '/: current-runtime note missing')
  assert(/Don.t reinvent the agent/.test(home.text), '/: boundary heading missing')
  for (const c of ['Memory', 'Identity', 'Continuity', 'Time', 'Channels']) assert(new RegExp(`>\\s*${c}\\s*<`).test(home.html), `/: concept "${c}" missing`)
  assert(/npx @justfortytwo\/installer init/.test(home.text) && /fortytwo start/.test(home.text) && /fortytwo pair/.test(home.text), '/: quick start commands missing')
  assert(/The answer is 42/.test(home.text) && /right question/i.test(home.text), '/: 42 motto missing')
  assert(/<svg[^>]*class="[^"]*iso/.test(home.html), '/: compact stack plate missing')
  assert(/From a session/.test(home.text) && /to a presence/.test(home.text), '/: session-to-presence section missing')
  // the homepage leads out, it does not repeat the deep pages
  for (const r of routes.slice(1)) assert((home.html.match(new RegExp(`href="${r}"`, 'g')) || []).length >= 2, `/: does not lead to ${r}`)
  assert(!/>\s*gate\s*</.test(home.html) && !/@justfortytwo\/scheduler/.test(home.text), '/: package decomposition is still on the homepage')
}
if (how) {
  assert(/<svg[^>]*class="[^"]*iso[^"]*"[^>]*role="img"/.test(how.html), '/how-it-works: stack plate svg (role=img) missing')
  assert(/<title[^>]*>Exploded view of the fortytwo stack<\/title>/.test(how.html), '/how-it-works: svg title missing')
  assert((how.html.match(/<polygon[^>]*class="plane"/g) || []).length === 6, '/how-it-works: plate does not draw six planes')
  assert(/class="flat"/.test(how.html) && (how.html.match(/<ol class="flat"[\s\S]*?<\/ol>/)?.[0].match(/<li[ >]/g) || []).length >= 6, '/how-it-works: narrow-viewport layer list missing')
  for (const l of ['CHANNELS', 'FORTYTWO', 'RUNTIME ADAPTER', 'CODING AGENT / HARNESS', 'AGENT CAPABILITIES', 'MACHINE']) assert(how.html.includes(l), `/how-it-works: layer ${l} missing`)
  assert(/not inserted between the agent and its capabilities/.test(how.text), '/how-it-works: surround-not-intercept statement missing')
  assert(/Personal assistant layer/.test(how.text) && /Infrastructure/.test(how.text), '/how-it-works: responsibilities missing')
  // responsibilities must be explained before package names appear
  const iResp = how.text.indexOf('Personal assistant layer'), iPkg = how.text.indexOf('@justfortytwo/scheduler')
  assert(iResp > -1 && iPkg > iResp, '/how-it-works: package names appear before the responsibility model')
  assert(/Not shipped/.test(how.text) && /No other adapter ships today/.test(how.text), '/how-it-works: future channels must be marked not shipped')
  assert((how.html.match(/<svg[^>]*class="[^"]*iconify/g) || []).length >= 6, '/how-it-works: channel logos are not inlined as SVG')
  assert(!/api\.iconify|api\.simplesvg|api\.unisvg/.test(how.html), '/how-it-works: icons fetched from a remote API')
  assert(/Channels are doors/.test(how.text) && /Live sessions are per chat/.test(how.text), '/how-it-works: access-points diagram/claim missing')
}
if (on) {
  assert(/Your agent already works\. Now give it somewhere to stay\./.test(on.text), '/always-on: headline missing')
  assert(/does not mean the model is running 24\/7/.test(on.text), '/always-on: 24/7 clarification missing')
  assert(/infrastructure is available 24\/7/.test(on.text), '/always-on: infrastructure-availability line missing')
  for (const w of ['Laptop', 'VPS', 'Homelab']) assert(on.text.includes(w), `/always-on: ${w} missing`)
  assert(/Not required/.test(on.text), '/always-on: does not say a VPS is not required')
  for (const t of ['08:32', '11:00', '14:20', '03:17']) assert(on.text.includes(t), `/always-on: timeline ${t} missing`)
  assert(/Oneiros/.test(on.text) && /03:17\s*UTC/.test(on.text), '/always-on: Oneiros must be the UTC 03:17 beat')
  assert(/From a session/.test(on.text), '/always-on: session-to-presence missing')
}
if (rt) {
  assert(/not the boundary/.test(rt.text), '/runtimes: not-the-boundary framing missing')
  assert((rt.text.match(/(?<!NOT )SUPPORTED/g) || []).length === 1, '/runtimes: exactly one runtime should be marked SUPPORTED')
  assert(/NOT SUPPORTED/.test(rt.text), '/runtimes: unsupported runtimes not stated')
}
if (tr) {
  for (const k of [/one-time code/, /Native permissions are authoritative/, /Gate is optional/, /not on the mandatory path/, /Content is not authority/, /pre-release/]) assert(k.test(tr.text), `/trust: ${k} missing`)
}

// --- stale / false / unsupported claims, in every page and in llms.txt ---------------
// The one sentence that mentions "running 24/7" is the negation itself; remove it before scanning.
const scrub = (t) => t.replace(/does not mean the model is running 24\/7/g, '').replace(/does not mean the model runs continuously/g, '')
const retired = [
  [/every tool call/i, 'gate on every tool call'],
  [/never cross the gate/i, 'old gate motto'],
  [/approval card/i, 'Telegram approval cards'],
  [/approve[sd]? (it )?(from|in|via) telegram/i, 'Telegram as approver'],
  [/gate (is|sits|runs) (mandatory|required|on every)/i, 'gate as mandatory routing'],
  [/seven (packages|parts)/i, 'seven-package claim'],
  [/a safety gate/i, 'safety-gate framing'],
  [/a layer for claude code|claude code only|only works with claude code|claude code is the permanent/i, 'Claude Code as the permanent boundary'],
  [/revolution|unlock the power|seamless|autonomous super/i, 'hype language'],
  [/ai companion|digital employee|autonomous workforce|digital twin/i, 'anthropomorphic / workforce framing'],
  [/always[- ]running model|model runs (24\/7|continuously|all day)|(model|agent) is (always|constantly|continuously) (running|thinking|on)|never sleeps|always thinking/i, 'implies continuous model execution'],
  [/\b24\/7\b[^.]{0,40}\b(inference|tokens?|model)\b/i, '24/7 tied to inference or tokens'],
  [/fortytwo cloud|hosted fortytwo|managed hosting|sign up for fortytwo/i, 'hosted service'],
  [/kubernetes|helm chart|k8s/i, 'Kubernetes in the story'],
  [/codex|gemini cli|openai|cursor|aider|opencode|copilot cli/i, 'unsupported runtime named'],
  [/vps (is )?(required|needed|mandatory)|requires a vps|you need a vps/i, 'VPS presented as required'],
]
for (const [route, { text }] of Object.entries(pages)) {
  for (const [re, what] of retired) assert(!re.test(scrub(text)), `${route} contains stale/false claim: ${what}`)
}
for (const [re, what] of retired) assert(!re.test(scrub(llms)), `llms.txt contains stale/false claim: ${what}`)
assert(/continuity/i.test(llms) && /first supported runtime/i.test(llms), 'llms.txt missing positioning')
assert(/does not mean the model runs continuously/.test(llms), 'llms.txt missing the 24/7 clarification')

// --- no-motion / no-shadow / no-glow, compiled CSS and SVG ---------------------------------
const css = readdirSync(join(out, '_nuxt')).filter(f => f.endsWith('.css')).map(f => readFileSync(join(out, '_nuxt', f), 'utf8')).join('\n')
for (const bad of ['text-shadow', 'box-shadow', '@keyframes', 'animation:', 'animation-name', 'transition:', 'transition-', 'filter:blur', 'filter: blur', 'drop-shadow', 'backdrop-filter', 'will-change']) {
  assert(!css.includes(bad), `forbidden CSS "${bad}" present (violates no-motion/no-shadow/no-glow)`)
}
for (const [route, { html }] of Object.entries(pages)) {
  assert(!/<animate|<set[ >]|<animateTransform|<animateMotion|<filter[ >]|feDropShadow|feGaussianBlur/.test(html), `${route}: SVG animation or filter present`)
}
assert(/:focus-visible/.test(css), 'no :focus-visible styles in compiled CSS')
const families = new Set([...css.matchAll(/@font-face\{[^}]*font-family:"?([^";}]+)/g)].map(m => m[1]))
for (const f of families) assert(/IBM Plex Mono|Newsreader/.test(f), `unexpected font family "${f}"`)

if (fails.length) { console.error('❌ CHECKS FAILED:\n - ' + fails.join('\n - ')); process.exit(1) }
console.log(`✅ all checks passed (${routes.length} routes)`)
