import { describe, it, expect } from 'vitest'
import { site } from '../app/data/site'
import { boundary } from '../app/data/boundary'
import { concepts } from '../app/data/concepts'
import { architecture } from '../app/data/architecture'
import { packages, packageGroups } from '../app/data/packages'
import { principles } from '../app/data/principles'
import { status, statusLabels } from '../app/data/status'
import { pages, pageOrder } from '../app/data/pages'
import { stack, owners, stackNotes, responsibilities } from '../app/data/stack'
import { presence, alwaysOnClaim, availability, deployContexts, deployNote, day, dayNote } from '../app/data/alwayson'
import { access } from '../app/data/access'
import { runtimeTable, runtimeOwns, adapterNeeds, providerNote, noDuplication } from '../app/data/runtimes'
import { trustSections, enforces, doesNotEnforce } from '../app/data/trust'
import { project, rect, points, ISO } from '../app/utils/iso'

/** Every user-facing string the site can render from typed data. */
const allContent = JSON.stringify({ site, pages, boundary, concepts, architecture, packages, packageGroups, principles, status, stack, owners, stackNotes, responsibilities, presence, alwaysOnClaim, availability, deployContexts, deployNote, day, dayNote, access, runtimeTable, runtimeOwns, adapterNeeds, providerNote, noDuplication, trustSections, enforces, doesNotEnforce }).toLowerCase()

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
  it('positions Claude Code as the first runtime, not the boundary', () => {
    expect(site.runtime.current).toBe('Claude Code')
    expect(site.runtime.note).toBe('Claude Code is the first supported runtime. More can follow.')
    expect(site.hero.body).not.toMatch(/claude/i)
    expect(pages.home.title).not.toMatch(/claude/i)
  })
  it('leads the hero with the agent, then the product statement', () => {
    expect(site.hero.headline).toBe('Your coding agent is already powerful.')
    expect(site.hero.statement).toMatch(/personal, persistent/)
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
  it('nav points at every inner page, then docs and github', () => {
    const hrefs = site.nav.map((n) => n.href)
    for (const k of pageOrder) expect(hrefs).toContain(pages[k].path)
    expect(hrefs.some((h) => h.includes('/docs'))).toBe(true)
    expect(hrefs).toContain(site.github)
    expect(site.nav.map((n) => n.label.toLowerCase())).not.toContain('components')
  })
})

describe('boundary', () => {
  it('splits agent-owned capabilities from fortytwo continuity', () => {
    expect(boundary.agentOwns).toEqual(expect.arrayContaining(['use tools', 'call MCP servers', 'ask for permission']))
    expect(boundary.fortytwoAdds).toEqual(expect.arrayContaining(['remember you', 'wake up later']))
    const overlap = boundary.agentOwns.filter((x) => boundary.fortytwoAdds.includes(x))
    expect(overlap).toEqual([])
  })
  it('states the inherit-not-compete principle', () => {
    expect(boundary.principle).toMatch(/inherit improvements/)
    expect(boundary.principle).toMatch(/not compete/)
  })
})

describe('concepts', () => {
  it('foregrounds the product concepts, in order', () => {
    expect(concepts.map((c) => c.id)).toEqual(['memory', 'identity', 'continuity', 'time', 'channels', 'ecosystem'])
  })
  it('only points at packages that exist', () => {
    const names = new Set(packages.map((p) => p.name))
    for (const c of concepts) for (const v of c.via) expect(names.has(v), `${c.id} -> ${v}`).toBe(true)
  })
  it('has real bodies', () => {
    for (const c of concepts) expect(c.body.length).toBeGreaterThan(40)
  })
})

describe('architecture', () => {
  it('presents gate and salience as optional', () => {
    expect(architecture.optional.label).toMatch(/optional/)
    expect(architecture.optional.items.map((i) => i.name)).toEqual(['gate', 'salience'])
  })
  it('says the runtime owns permissions and channels do not approve', () => {
    const notes = architecture.notes.join(' ')
    expect(notes).toMatch(/runtime owns its effective tool permissions/)
    expect(notes).toMatch(/do not grant approvals/)
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
  it('names Claude Code as today and marks later runtimes as future', () => {
    const agent = stack.find((l) => l.id === 'agent')!
    expect(agent.items[0].label).toBe('Claude Code today')
    expect(agent.items.filter((i) => i.future).map((i) => i.label)).toEqual(['more runtimes later'])
    expect(stack.find((l) => l.id === 'channels')!.items.find((i) => i.future)?.label).toBe('future adapters')
  })
  it('gives fortytwo exactly one emphasised layer', () => {
    expect(stack.filter((l) => l.emphasis).map((l) => l.id)).toEqual(['fortytwo'])
  })
  it('says fortytwo is not between the agent and its capabilities', () => {
    expect(stackNotes.join(' ')).toMatch(/not inserted between the agent and its capabilities/)
  })
  it('explains responsibilities without package names', () => {
    expect(responsibilities.map((r) => r.label)).toEqual(['Personal assistant layer', 'Runtime', 'Capabilities', 'Infrastructure'])
    const text = JSON.stringify(responsibilities).toLowerCase()
    for (const pkg of ['runner', 'scheduler', 'telegram', 'salience', 'persona', 'installer']) expect(text).not.toMatch(new RegExp(`\\b${pkg}\\b`))
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
  it('keeps the day timeline in order, with Oneiros in UTC as the only scheduled default', () => {
    expect(day.map((d) => d.time)).toEqual(['08:32', '11:00', '14:20', '03:17'])
    expect(day.at(-1)!.zone).toBe('UTC')
    expect(day.at(-1)!.event).toMatch(/Oneiros/)
    for (const d of day) expect(d.source).toMatch(/README/)
  })
  it('does not claim a terminal shares the telegram session', () => {
    expect(JSON.stringify(day)).toMatch(/different session from your Telegram chat/)
    expect(access.note).toMatch(/Live sessions are per chat/)
  })
  it('shows Telegram and Terminal as live and every other channel as not shipped', () => {
    expect(access.live.points.map((p) => p.name)).toEqual(['Telegram', 'Terminal'])
    expect(access.later.badge).toBe('Not shipped')
    expect(access.later.points.length).toBeGreaterThanOrEqual(4)
    expect(access.later.note).toMatch(/No other adapter ships today/)
    expect(access.later.note).toMatch(/not a roadmap/)
  })
})

describe('runtimes', () => {
  it('supports exactly one runtime today', () => {
    expect(runtimeTable.filter((r) => r.state === 'supported').map((r) => r.name)).toEqual(['Claude Code'])
    expect(runtimeTable.find((r) => r.state === 'none')!.body).toMatch(/none ships today/)
  })
  it('leaves tools, MCP, plugins and skills to the runtime', () => {
    expect(runtimeOwns).toEqual(expect.arrayContaining(['MCP servers', 'plugins and skills']))
    expect(noDuplication).toMatch(/does not rebuild integrations/)
  })
  it('lists what the adapter relies on', () => {
    expect(adapterNeeds.length).toBeGreaterThanOrEqual(3)
  })
})

describe('trust', () => {
  it('cites a source README for every claim', () => {
    for (const s of trustSections) for (const c of s.claims) expect(c.source).toMatch(/README\.md/)
  })
  it('covers locality, pairing, native permissions, optional gate and content-is-not-authority', () => {
    expect(trustSections.map((s) => s.id)).toEqual(['local', 'who', 'actions', 'content'])
    const all = JSON.stringify(trustSections)
    expect(all).toMatch(/one-time code/)
    expect(all).toMatch(/Native permissions are authoritative/)
    expect(all).toMatch(/Gate is optional/)
    expect(all).toMatch(/not on the mandatory path/)
    expect(all).toMatch(/not permissions/)
  })
  it('states what is enforced and what is left to others', () => {
    expect(enforces.length).toBeGreaterThan(2)
    expect(doesNotEnforce.join(' ')).toMatch(/Tool permissions\. The runtime owns them/)
  })
})

describe('packages', () => {
  it('lists the current packages by responsibility', () => {
    const by = (g: string) => packages.filter((p) => p.group === g).map((p) => p.name)
    expect(by('core')).toEqual(['memory', 'runner', 'scheduler', 'persona', 'telegram'])
    expect(by('optional')).toEqual(['gate', 'salience'])
    expect(by('bootstrap')).toEqual(['installer', 'marketplace'])
  })
  it('every group is declared and non-empty', () => {
    for (const g of packageGroups) expect(packages.some((p) => p.group === g.id)).toBe(true)
    for (const p of packages) expect(packageGroups.some((g) => g.id === p.group)).toBe(true)
  })
  it('has a package id and description for each', () => {
    for (const p of packages) {
      expect(p.pkg).toMatch(/^(@justfortytwo\/|justfortytwo\/)/)
      expect(p.description.length).toBeGreaterThan(10)
    }
  })
  it('uses public names only — no HHGTTG codenames', () => {
    for (const lore of ['vogon', 'babelfish', 'magrathea', 'subetha', 'deepthought']) {
      expect(allContent, `codename "${lore}" must not appear`).not.toContain(lore)
    }
  })
})

describe('principles', () => {
  it('leads with the restraint principle', () => {
    expect(principles[0].title).toBe('Use the agent you already trust.')
    expect(principles[0].body).toMatch(/instead of rebuilding its capabilities/)
  })
  it('keeps content-is-not-authority and local-first', () => {
    const titles = principles.map((p) => p.title).join('|')
    expect(titles).toMatch(/Content is not command authority/)
    expect(titles).toMatch(/Local-first/)
  })
  it('has title + body for each', () => {
    expect(principles).toHaveLength(6)
    for (const p of principles) { expect(p.title).toBeTruthy(); expect(p.body.length).toBeGreaterThan(15) }
  })
})

describe('status', () => {
  it('cites a source README for every claim', () => {
    for (const s of status) expect(s.source, s.title).toMatch(/README\.md/)
  })
  it('covers the verified current themes', () => {
    const titles = status.map((s) => s.title).join('|')
    for (const t of [/sessions/i, /Telegram/, /memory/i, /Scheduler/, /Persona/, /Lifecycle CLI/, /Gate/]) expect(titles).toMatch(t)
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
  ]
  for (const [name, re] of banned) {
    it(`does not contain: ${name}`, () => expect(allContent).not.toMatch(re))
  }
})
