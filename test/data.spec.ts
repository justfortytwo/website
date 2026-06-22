import { describe, it, expect } from 'vitest'
import { site } from '../app/data/site'
import { components } from '../app/data/components'
import { principles } from '../app/data/principles'
import { milestones } from '../app/data/status'

describe('site', () => {
  it('has english lang, motto, nav, footer', () => {
    expect(site.lang).toBe('en')
    expect(site.motto.join(' ')).toMatch(/Don't Panic/i)
    expect(site.nav.length).toBeGreaterThanOrEqual(3)
    expect(site.org).toBe('justfortytwo')
  })
})

describe('components data', () => {
  it('has the 7 codenames in canonical order', () => {
    expect(components.map(c => c.codename)).toEqual([
      'vogon','guide','babelfish','ford','magrathea','subetha','deepthought'
    ])
  })
  it('maps codenames to the right functions', () => {
    const m = Object.fromEntries(components.map(c => [c.codename, c.role]))
    expect(m).toEqual({
      vogon:'gate', guide:'memory', babelfish:'telegram',
      ford:'persona', magrathea:'cli', subetha:'marketplace', deepthought:'cognition'
    })
  })
  it('marks deepthought as in-design', () => {
    const dt = components.find(c => c.codename === 'deepthought')!
    expect(dt.state).toBe('design')
  })
  it('every component has codename, role, description', () => {
    for (const c of components) {
      expect(c.codename).toBeTruthy()
      expect(c.role).toBeTruthy()
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
    const byId = Object.fromEntries(milestones.map(m => [m.id, m]))
    expect(byId.M1.state).toBe('done')
    expect(byId.M2.state).toBe('wip')
  })
})
