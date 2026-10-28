import { describe, it, expect } from 'vitest'
import { site } from '../app/data/site'
import { benefits, benefitsNote } from '../app/data/benefits'
import { architecture } from '../app/data/architecture'
import { status, statusLabels } from '../app/data/status'
import { pages, pageOrder } from '../app/data/pages'
import { stack, owners, stackNotes } from '../app/data/stack'
import { presence, alwaysOnClaim, availability, deployContexts, day, dayNote } from '../app/data/alwayson'
import { access } from '../app/data/access'
import { trustSections, enforces, doesNotEnforce } from '../app/data/trust'
import { project, rect, points, ISO } from '../app/utils/iso'

/** Every user-facing string the site can render from typed data. */
const allContent = JSON.stringify({ site, pages, benefits, benefitsNote, architecture, status, stack, owners, stackNotes, presence, alwaysOnClaim, availability, deployContexts, day, dayNote, access, trustSections, enforces, doesNotEnforce }).toLowerCase()

describe('site', () => {
  it('has english lang, org, nav and footer', () => {
    expect(site.lang).toBe('en')
    expect(site.org).toBe('justfortytwo')
    expect(site.nav.length).toBeGreaterThanOrEqual(4)
    expect(site.footer.links.length).toBeGreaterThan(0)
  })
  it('keeps the 42 identity in the motto', () => {
    const motto = site.motto.join(' ')
    expect(motto).toMatch(/Stay calm/i)
    expect(motto).toMatch(/The answer is 42/)
    expect(motto).toMatch(/right question/i)
  })
  it('says plainly that Claude Code is the only supported runtime today', () => {
    expect(site.runtime.current).toBe('Claude Code')
    expect(site.runtime.note).toBe('Claude Code is the only supported runtime today.')
    expect(pages.home.description).toMatch(/only supported runtime today/)
  })
  it('leads the hero with the agent, then the product statement', () => {
    expect(site.hero.headline).toBe('Your coding agent is already powerful.')
    expect(site.hero.statement).toBe('Reach it from Telegram. Let it remember you. Search every past conversation. Give it work for later.')
  })
})

describe('pages', () => {
  it('has one entry per route with matching key and a unique path', () => {
    const list = Object.values(pages)
    for (const [k, p] of Object.entries(pages)) expect(p.key).toBe(k)
    expect(new Set(list.map((p) => p.path)).size).toBe(list.length)
    expect(pages.home.path).toBe('/')
  })
  it('keeps titles and descriptions within search-snippet limits and unique', () => {
    const list = Object.values(pages)
    for (const p of list) {
      expect(p.title.length).toBeLessThanOrEqual(70)
      expect(p.description.length).toBeGreaterThan(60)
      expect(p.description.length).toBeLessThanOrEqual(220)
    }
    expect(new Set(list.map((p) => p.title)).size).toBe(list.length)
    expect(new Set(list.map((p) => p.description)).size).toBe(list.length)
  })
  it('nav points at the product pages, then docs and github', () => {
    const hrefs = site.nav.map((n) => n.href)
    for (const k of pageOrder) expect(hrefs).toContain(pages[k].path)
    expect(Object.keys(pages)).toEqual(['home', 'how-it-works', 'always-on', 'trust'])
    expect(site.nav.map((n) => n.label)).toEqual(['How it works', 'Run it 24/7', 'Trust', 'Docs ↗', 'GitHub ↗'])
    expect(hrefs.some((h) => h.includes('/docs'))).toBe(true)
    expect(hrefs).toContain(site.github)
    expect(site.nav.map((n) => n.label.toLowerCase())).not.toContain('components')
  })
})

describe('benefits', () => {
  it('lists the five outcomes a visitor should leave with, in order', () => {
    expect(benefits.map((b) => b.id)).toEqual(['phone', 'memory', 'transcript', 'work', 'local'])
    for (const b of benefits) expect(b.after.length).toBeGreaterThan(40)
  })
  it('makes the searchable transcript a headline benefit', () => {
    const t = benefits.find((b) => b.id === 'transcript')!
    expect(t.title).toBe('Every conversation, searchable')
    expect(t.after).toMatch(/transcript_search/)
  })
  it('does not oversell local state', () => {
    expect(JSON.stringify(benefits)).not.toMatch(/data stays|never leaves/i)
  })
  it('keeps the capabilities with the runtime', () => {
    expect(benefitsNote).toBe('Claude Code still does the work. fortytwo adds what a session forgets.')
  })
})

describe('architecture', () => {
  it('presents gate and salience as optional', () => {
    expect(architecture.optional.label).toMatch(/optional/)
    expect(architecture.optional.items.map((i) => i.name)).toEqual(['gate', 'salience'])
  })
  it('says channels do not approve', () => {
    expect(stackNotes.join(' ')).toMatch(/do not grant approvals/)
  })
})

describe('stack', () => {
  it('orders the layers channels, fortytwo, adapter, agent, capabilities, machine', () => {
    expect(stack.map((l) => l.id)).toEqual(['channels', 'fortytwo', 'adapter', 'agent', 'capabilities', 'machine'])
  })
  it('gives each layer an owner and keeps owners contiguous', () => {
    expect(stack.map((l) => l.owner)).toEqual(['fortytwo', 'fortytwo', 'fortytwo', 'runtime', 'runtime', 'you'])
    expect(Object.keys(owners).sort()).toEqual(['fortytwo', 'runtime', 'you'])
  })
  it('keeps tools, MCP, plugins, skills and permissions on the runtime side', () => {
    const caps = stack.find((l) => l.id === 'capabilities')!
    expect(caps.owner).toBe('runtime')
    expect(caps.items.map((i) => i.label)).toEqual(expect.arrayContaining(['MCP', 'plugins', 'skills', 'native tools', 'permissions']))
  })
  it('names Claude Code and Telegram as the only runtime and channel', () => {
    const agent = stack.find((l) => l.id === 'agent')!
    expect(agent.items.map((i) => i.label)).toEqual(['Claude Code'])
    expect(stack.find((l) => l.id === 'channels')!.items.map((i) => i.label)).toEqual(['Telegram'])
  })
  it('gives fortytwo exactly one emphasised layer', () => {
    expect(stack.filter((l) => l.emphasis).map((l) => l.id)).toEqual(['fortytwo'])
  })
  it('says fortytwo is not between the agent and its capabilities', () => {
    expect(stackNotes.join(' ')).toMatch(/not inserted between the agent and its capabilities/)
  })
  it('keeps package names off the plate itself', () => {
    const text = JSON.stringify({ stack, owners }).toLowerCase()
    for (const pkg of ['runner', 'scheduler', 'salience', 'persona', 'installer', 'marketplace']) expect(text).not.toContain(pkg)
  })
})

describe('iso projection', () => {
  it('maps the origin to the offset and is linear in x and y', () => {
    expect(project(0, 0, 0, { x: 10, y: 20 })).toEqual([10, 20])
    expect(project(100, 0)).toEqual([100 * ISO.ax, 100 * ISO.ay])
    expect(project(0, 100)).toEqual([-100 * ISO.ax, 100 * ISO.ay])
  })
  it('lifts with z', () => {
    expect(project(0, 0, 40)[1]).toBe(-40)
  })
  it('draws a rectangle as four corners and serialises them', () => {
    const r = rect(0, 0, 10, 10)
    expect(r).toHaveLength(4)
    expect(points(r).split(' ')).toHaveLength(4)
  })
})

describe('always on', () => {
  it('contrasts a session with a presence', () => {
    expect(presence.session.tag).toBe('A session')
    expect(presence.presence.tag).toBe('A presence')
    expect(presence.presence.points.join(' ')).toMatch(/scheduler keeps time/)
  })
  it('states that 24/7 is about infrastructure, not the model', () => {
    expect(alwaysOnClaim.headline).toMatch(/does not mean the model is running 24\/7/)
    expect(alwaysOnClaim.body).toMatch(/infrastructure is available/)
    expect(availability.runs.items.map((i) => i.name)).toEqual(['Agent turn', 'Oneiros pass'])
  })
  it('covers laptop, vps and homelab without requiring a vps', () => {
    expect(deployContexts.map((d) => d.id)).toEqual(['laptop', 'vps', 'homelab'])
    expect(JSON.stringify(deployContexts)).toMatch(/Not required/)
  })
  it('links the homelab card to the docs guide on the docs site', () => {
    expect(deployContexts.find((d) => d.id === 'homelab')!.link!.href).toBe(`${site.docs}/homelab.html`)
  })
  it('keeps the day timeline in order, and lets the terminal search the Telegram chat', () => {
    expect(day.map((d) => d.time)).toEqual(['08:32', '11:00', '14:20'])
    expect(day.at(-1)!.result).toMatch(/search that conversation in the transcript/)
  })
  it('does not claim a terminal shares the telegram session', () => {
    expect(JSON.stringify(day)).toMatch(/different session from your Telegram chat/)
    expect(access.note).toMatch(/own session context/)
  })
  it('shows Telegram and Terminal as live and does not list any other channel', () => {
    expect(access.live.points.map((p) => p.name)).toEqual(['Telegram', 'Terminal'])
    expect(access.live.note).toBe('Other channel adapters can follow. Telegram is the only one that ships today.')
    expect(JSON.stringify(access)).not.toMatch(/slack|discord|whatsapp|signal|matrix|email/i)
  })
})

describe('trust', () => {
  it('carries no provenance metadata on claims', () => {
    for (const s of trustSections) for (const c of s.claims) expect(Object.keys(c).sort()).toEqual(['body', 'title'])
  })
  it('does not oversell local', () => {
    const all = JSON.stringify(trustSections)
    expect(all).toMatch(/runs no hosted backend/)
    expect(all).toMatch(/model provider still sees context/)
    expect(all).toMatch(/Telegram carries your messages/)
    expect(all).toMatch(/Integrations keep their own boundaries/)
  })
  it('covers locality, pairing, native permissions, optional gate and content-is-not-authority', () => {
    expect(trustSections.map((s) => s.id)).toEqual(['local', 'who', 'actions', 'content'])
    const all = JSON.stringify(trustSections)
    expect(all).toMatch(/one-time code/)
    expect(all).toMatch(/Native permissions are authoritative/)
    expect(all).toMatch(/Gate is optional/)
    expect(all).toMatch(/not in the normal Telegram → Claude Code → tool path unless you enable it/)
    expect(all).toMatch(/not permissions/)
    expect(all).toMatch(/never grants tool approvals/)
  })
  it('states what is enforced and what is left to others', () => {
    expect(enforces.length).toBeGreaterThan(2)
    expect(doesNotEnforce.join(' ')).toMatch(/Tool permissions\. The runtime owns them/)
  })
})

describe('codenames', () => {
  it('uses public names only — no HHGTTG codenames', () => {
    for (const lore of ['vogon', 'babelfish', 'magrathea', 'subetha', 'deepthought']) {
      expect(allContent, `codename "${lore}" must not appear`).not.toContain(lore)
    }
  })
})

describe('status', () => {
  it('carries no provenance metadata', () => {
    for (const s of status) expect(Object.keys(s).sort(), s.title).toEqual(['body', 'state', 'title'])
  })
  it('covers the verified current themes', () => {
    const titles = status.map((s) => s.title).join('|')
    for (const t of [/Telegram/, /memory/i, /transcript/i, /Scheduling/, /Identity/, /Gate/]) expect(titles).toMatch(t)
  })
  it('states the session-recovery limit without a replay claim', () => {
    const edge = status.filter((s) => s.state === 'edge').map((s) => s.body).join(' ')
    expect(edge).toMatch(/best effort/)
    expect(edge).toMatch(/not a durable message queue/)
    expect(edge).toMatch(/no function to delete/)
    expect(allContent).not.toMatch(/input replay/)
  })
  it('marks gate optional and is honest about limits', () => {
    expect(status.find((s) => s.title === 'Gate')?.state).toBe('optional')
    expect(status.some((s) => s.state === 'edge')).toBe(true)
  })
  it('labels every state', () => {
    for (const s of status) expect(statusLabels[s.state]).toBeTruthy()
  })
})

describe('retired claims', () => {
  const banned: [string, RegExp][] = [
    ['mandatory gate routing', /every tool call/],
    ['gate as universal authority', /never cross the gate/],
    ['telegram approval cards', /approval card/],
    ['telegram as approver', /approve[sd]? (it )?(from|in|via) telegram/],
    ['seven-package claim', /seven (packages|parts)/],
    ['old milestone shape', /trust hardening/],
    ['safety-gate framing', /a safety gate/],
    ['claude-code-only boundary', /a layer for claude code|claude code only|only works with claude code/],
    ['hype', /revolution|autonomous super|unlock the power|seamless/],
    ['companion framing', /ai companion|digital employee|autonomous workforce|digital twin/],
    ['continuous model execution', /always[- ]running model|model runs (24\/7|continuously|all day)|never sleeps|always thinking|constantly (running|thinking)/],
    ['hosted service', /fortytwo cloud|hosted fortytwo|managed hosting/],
    ['unsupported runtimes as supported', /codex|gemini cli|openai|cursor|aider|opencode/],
    ['kubernetes in the core story', /kubernetes|helm chart/],
    ['visible source metadata', /\bsource: /],
    ['roadmap language for runtimes', /first supported runtime|more can follow|more runtimes|future adapters/],
    ['unsupported channel names', /slack|discord|whatsapp|matrix/],
    ['one shared live context', /same (live )?(context window|conversation)|one universal|shared context window/],
  ]
  for (const [name, re] of banned) {
    it(`does not contain: ${name}`, () => expect(allContent).not.toMatch(re))
  }
})
