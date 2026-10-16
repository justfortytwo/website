import { describe, it, expect } from 'vitest'
import { site } from '../app/data/site'
import { boundary } from '../app/data/boundary'
import { concepts } from '../app/data/concepts'
import { scenes } from '../app/data/scenes'
import { architecture } from '../app/data/architecture'
import { packages, packageGroups } from '../app/data/packages'
import { principles } from '../app/data/principles'
import { status, statusLabels } from '../app/data/status'

/** Every user-facing string the site can render from typed data. */
const allContent = JSON.stringify({ site, boundary, concepts, scenes, architecture, packages, packageGroups, principles, status }).toLowerCase()

describe('site', () => {
  it('has english lang, org, nav and footer', () => {
    expect(site.lang).toBe('en')
    expect(site.org).toBe('justfortytwo')
    expect(site.nav.length).toBeGreaterThanOrEqual(3)
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
    expect(site.seo.title).not.toMatch(/claude/i)
  })
  it('leads the hero with the agent, then the product statement', () => {
    expect(site.hero.headline).toBe('Your coding agent is already powerful.')
    expect(site.hero.statement).toMatch(/personal, persistent/)
  })
  it('keeps seo copy within search-snippet limits', () => {
    expect(site.seo.title.length).toBeLessThanOrEqual(70)
    expect(site.seo.description.length).toBeLessThanOrEqual(220)
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

describe('scenes', () => {
  it('has four beats with a title and body', () => {
    expect(scenes).toHaveLength(4)
    for (const s of scenes) { expect(s.when && s.title).toBeTruthy(); expect(s.body.length).toBeGreaterThan(40) }
  })
})

describe('architecture', () => {
  it('shows fortytwo around an adapter around the runtime', () => {
    expect(architecture.top.items).toEqual(['identity', 'memory', 'time', 'continuity', 'channels'])
    expect(architecture.adapter.label).toBe('runtime adapter')
    expect(architecture.runtime.caption).toBe('Claude Code today')
  })
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
  ]
  for (const [name, re] of banned) {
    it(`does not contain: ${name}`, () => expect(allContent).not.toMatch(re))
  }
})
