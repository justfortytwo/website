import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const out = '.output/public'
const html = readFileSync(join(out, 'index.html'), 'utf8')
const llms = readFileSync(join(out, 'llms.txt'), 'utf8')
const fails = []
const assert = (cond, msg) => { if (!cond) fails.push(msg) }

// visible text only (no scripts/styles/tags), entities decoded enough for matching
const text = html
  .replace(/<script[\s\S]*?<\/script>/g, ' ')
  .replace(/<style[\s\S]*?<\/style>/g, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;|&#160;/g, ' ')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&#x27;|&#39;/g, '\'')
  .replace(/\s+/g, ' ')

// structure
assert(/<html[^>]*lang="en"/.test(html), 'html lang=en missing')
assert((html.match(/<h1[\s>]/g) || []).length === 1, 'not exactly one <h1>')
assert(/<h1[^>]*>\s*Your coding agent is already powerful\./.test(html), 'h1 does not carry the new positioning')
assert(/<main[\s>]/.test(html), '<main> landmark missing')
assert(/href="#main"/.test(html), 'skip link missing')
const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map(m => Number(m[1]))
levels.forEach((l, i) => { if (i > 0 && l - levels[i - 1] > 1) fails.push(`heading level skips from h${levels[i - 1]} to h${l}`) })
const labels = ['01', '02', '03', '04', '05', '06', '07', '08']
for (const n of labels) assert(text.includes(`// ${n}`), `section label // ${n} missing`)
for (const id of ['boundary', 'architecture', 'principles', 'status', 'quickstart']) assert(html.includes(`id="${id}"`), `section #${id} missing`)

// product positioning
assert(text.includes('fortytwo makes it personal, persistent, and always there.'), 'product statement missing')
assert(text.includes('Claude Code is the first supported runtime. More can follow.'), 'current-runtime note missing')
assert(/Don.t reinvent the agent/.test(text), 'boundary heading missing')
assert(/inherit improvements from the underlying agent, not compete with them/.test(text), 'inherit-not-compete line missing')
for (const c of ['Memory', 'Identity', 'Continuity', 'Time', 'Channels']) assert(new RegExp(`>\\s*${c}\\s*<`).test(html), `concept "${c}" missing`)
assert(/runtime adapter/.test(text) && /Claude Code today/.test(text), 'architecture diagram missing adapter/runtime layers')
assert(/npx @justfortytwo\/installer init/.test(text) && /fortytwo start/.test(text) && /fortytwo pair/.test(text), 'quick start commands missing')
assert(/The answer is 42/.test(text) && /right question/i.test(text), '42 motto missing')
for (const p of ['gate', 'memory', 'salience', 'telegram', 'persona', 'installer', 'marketplace', 'runner', 'scheduler']) assert(text.includes(p), `package ${p} missing`)

// false / retired claims, in the page and in llms.txt
const retired = [
  [/every tool call/i, 'claims a gate on every tool call'],
  [/never cross the gate/i, 'old gate motto'],
  [/approval card/i, 'Telegram approval cards'],
  [/seven (packages|parts)/i, 'seven-package claim'],
  [/a safety gate/i, 'safety-gate framing'],
  [/a layer for claude code/i, 'Claude-Code-only positioning'],
  [/revolution|unlock the power|seamless|autonomous super/i, 'hype language'],
]
for (const [re, what] of retired) {
  assert(!re.test(text), `page contains retired claim: ${what}`)
  assert(!re.test(llms), `llms.txt contains retired claim: ${what}`)
}

// seo
assert(/<title>[^<]+<\/title>/.test(html), '<title> missing')
assert(/name="description"/.test(html), 'meta description missing')
assert(/property="og:image"/.test(html), 'og:image missing')
assert(/property="og:title"/.test(html), 'og:title missing')
assert(/name="twitter:card"/.test(html), 'twitter:card missing')
assert(/rel="canonical"/.test(html), 'canonical missing')
const ld = [...html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)]
assert(ld.length >= 1, 'JSON-LD missing')
for (const m of ld) { try { JSON.parse(m[1]) } catch { fails.push('JSON-LD block is not valid JSON') } }
assert(/\/sitemap\.xml/.test(readFileSync(join(out, 'robots.txt'), 'utf8')), 'robots.txt missing sitemap ref')
assert(/continuity/i.test(llms) && /first supported runtime/i.test(llms), 'llms.txt missing new positioning')

// no-motion / no-shadow / no-glow guard across compiled CSS (+ no new font family)
const css = readdirSync(join(out, '_nuxt')).filter(f => f.endsWith('.css')).map(f => readFileSync(join(out, '_nuxt', f), 'utf8')).join('\n')
for (const bad of ['text-shadow', 'box-shadow', '@keyframes', 'animation:', 'transition:', 'filter:blur', 'filter: blur', 'drop-shadow', 'backdrop-filter']) {
  assert(!css.includes(bad), `forbidden CSS "${bad}" present (violates no-motion/no-shadow/no-glow)`)
}
assert(/:focus-visible/.test(css), 'no :focus-visible styles in compiled CSS')
const families = new Set([...css.matchAll(/@font-face\{[^}]*font-family:"?([^";}]+)/g)].map(m => m[1]))
for (const f of families) assert(/IBM Plex Mono|Newsreader/.test(f), `unexpected font family "${f}"`)

if (fails.length) { console.error('❌ CHECKS FAILED:\n - ' + fails.join('\n - ')); process.exit(1) }
console.log('✅ all checks passed')
