import { describe, it, expect } from 'vitest'
import { site } from '../app/data/site'
import { components } from '../app/data/components'
import { principles } from '../app/data/principles'
import { milestones } from '../app/data/status'

describe('site', () => {
  it('has english lang, motto, nav, footer', () => {
    expect(site.lang).toBe('en')
    expect(site.motto.join(' ')).toMatch(/Stay calm/i)
    expect(site.nav.length).toBeGreaterThanOrEqual(3)
    expect(site.org).toBe('justfortytwo')
  })
})

describe('components data', () => {
  it('lists the seven public (role) names in canonical order', () => {
    expect(components.map((c) => c.name)).toEqual([
      'gate', 'memory', 'salience', 'telegram', 'persona', 'installer', 'marketplace',
    ])
  })
  it('uses neutral public names only — no HHGTTG codenames leak into marketing', () => {
    const blob = JSON.stringify(components).toLowerCase()
    for (const lore of ['vogon', 'babelfish', 'magrathea', 'subetha', 'deepthought']) {
      expect(blob, `lore codename "${lore}" must not appear`).not.toContain(lore)
    }
  })
  it('every component has name, pkg, and a description', () => {
    for (const c of components) {
      expect(c.name).toBeTruthy()
      expect(c.pkg).toBeTruthy()
      expect(c.description.length).toBeGreaterThan(10)
    }
  })
})

describe('principles data', () => {
  it('has 6 principles with title + body', () => {
    expect(principles).toHaveLength(6)
    for (const p of principles) {
      expect(p.title).toBeTruthy()
      expect(p.body.length).toBeGreaterThan(15)
    }
  })
})

describe('status data', () => {
  it('has M1 done and M2 in progress', () => {
    const byId = Object.fromEntries(milestones.map((m) => [m.id, m]))
    expect(byId.M1.state).toBe('done')
    expect(byId.M2.state).toBe('wip')
  })
})
