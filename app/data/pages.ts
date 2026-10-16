/** One entry per route. Drives nav, per-page SEO, canonicals, JSON-LD and the sitemap check. */
export type PageKey = 'home' | 'how-it-works' | 'always-on' | 'runtimes' | 'trust'

export interface PageMeta {
  key: PageKey
  path: string
  /** Short label for nav and breadcrumbs. */
  label: string
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  /** One line used on the home page explore list and the next-page links. */
  teaser: string
}

export const pages: Record<PageKey, PageMeta> = {
  home: {
    key: 'home', path: '/', label: 'Home',
    title: 'fortytwo — continuity for the coding agent you already trust',
    description: 'fortytwo adds memory, identity, continuity, scheduling and channels around an existing coding agent, without reimplementing its tools, permissions or integrations. Claude Code is the first supported runtime.',
    ogTitle: 'fortytwo — your coding agent, made personal and persistent',
    ogDescription: 'Memory, identity, continuity, time and channels around the agent runtime you already trust. Local-first, open source.',
    teaser: 'Overview.',
  },
  'how-it-works': {
    key: 'how-it-works', path: '/how-it-works', label: 'How it works',
    title: 'How fortytwo works — an exploded view of the stack',
    description: 'fortytwo surrounds an existing agent runtime with identity, memory, time, channels and lifecycle. Tools, MCP, plugins and permissions stay with the runtime. See who owns each layer.',
    ogTitle: 'How fortytwo works — continuity around the runtime',
    ogDescription: 'An exploded view of the stack: what fortytwo adds, what the runtime keeps, and where each layer runs.',
    teaser: 'The stack, layer by layer, and who owns each one.',
  },
  'always-on': {
    key: 'always-on', path: '/always-on', label: 'Always on',
    title: 'Run fortytwo always on — laptop, VPS or homelab',
    description: 'Put fortytwo on a machine that stays online and the assistant stays reachable: channels, scheduler, memory and identity are available 24/7, while the model runs only when there is work.',
    ogTitle: 'Give your coding agent somewhere to stay',
    ogDescription: 'From a session to a presence. fortytwo keeps identity, memory, time and channels available on a laptop, a VPS or a homelab. The model runs only when there is work.',
    teaser: 'From a session to a presence: laptop, VPS or homelab.',
  },
  runtimes: {
    key: 'runtimes', path: '/runtimes', label: 'Runtimes',
    title: 'Runtimes — Claude Code today, not the boundary',
    description: 'fortytwo wraps a coding-agent runtime through a thin adapter. Claude Code is the only supported runtime today. Tools, MCP, plugins and skills stay runtime-owned.',
    ogTitle: 'Runtimes — Claude Code is the first, not the boundary',
    ogDescription: 'What a runtime owns, what fortytwo asks of it, and what is supported today.',
    teaser: 'Claude Code today. What the adapter asks of a runtime.',
  },
  trust: {
    key: 'trust', path: '/trust', label: 'Trust',
    title: 'Trust model — what fortytwo enforces and what it does not',
    description: 'Local-first storage, channel pairing, native runtime permissions, optional Gate, and content that is never authority. A plain statement of what fortytwo enforces and what it leaves to the runtime.',
    ogTitle: 'Trust model — stated boundaries',
    ogDescription: 'Where data lives, who can talk to the assistant, who authorizes actions, and what fortytwo deliberately does not enforce.',
    teaser: 'Local-first, pairing, runtime permissions, optional Gate.',
  },
}

export const pageOrder: PageKey[] = ['how-it-works', 'always-on', 'runtimes', 'trust']
