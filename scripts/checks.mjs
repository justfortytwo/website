import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const out = '.output/public'
const html = readFileSync(join(out, 'index.html'), 'utf8')
const fails = []
const assert = (cond, msg) => { if (!cond) fails.push(msg) }

// structure
assert(html.includes('<html') && /lang="en"/.test(html), 'html lang=en missing')
assert((html.match(/<h1[\s>]/g) || []).length === 1, 'not exactly one <h1>')
assert(/The answer is/.test(html), 'hero headline missing')
for (const s of ['// 01','// 02','// 03','// 04','// 05']) assert(html.includes(s), `section ${s} missing`)
for (const c of ['gate','memory','salience','telegram','persona','installer','marketplace']) assert(html.includes(c), `component ${c} missing`)
assert(/Ask the right question/i.test(html), 'motto missing')

// seo
assert(/<title>[^<]+<\/title>/.test(html), '<title> missing')
assert(/name="description"/.test(html), 'meta description missing')
assert(/property="og:image"/.test(html), 'og:image missing')
assert(/application\/ld\+json/.test(html), 'JSON-LD missing')
assert(/rel="canonical"/.test(html), 'canonical missing')
assert(/\/sitemap\.xml/.test(readFileSync(join(out, 'robots.txt'), 'utf8')), 'robots.txt missing sitemap ref')

// no-motion / no-shadow guard across compiled CSS
const css = readdirSync(join(out, '_nuxt')).filter(f => f.endsWith('.css')).map(f => readFileSync(join(out, '_nuxt', f), 'utf8')).join('\n')
for (const bad of ['text-shadow','box-shadow','@keyframes','animation:','transition:','filter:blur','filter: blur']) {
  assert(!css.includes(bad), `forbidden CSS "${bad}" present (violates no-motion/no-shadow)`)
}

if (fails.length) { console.error('❌ CHECKS FAILED:\n - ' + fails.join('\n - ')); process.exit(1) }
console.log('✅ all checks passed')
