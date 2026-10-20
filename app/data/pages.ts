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
    description: 'fortytwo gives Claude Code memory, identity, time and channels, so it can work as a persistent personal assistant. Claude Code is the only supported runtime today.',
    ogTitle: 'fortytwo — your coding agent, made personal and persistent',
    ogDescription: 'Memory, identity, time and channels for Claude Code. Reach it from Telegram, let it remember you, give it work for later. Local-first, open source.',
    teaser: 'Overview.',
  },
  'how-it-works': {
    key: 'how-it-works', path: '/how-it-works', label: 'How it works',
    title: 'How fortytwo works — who owns what',
    description: 'You own the machine, fortytwo owns continuity and lifecycle, Claude Code owns reasoning and capabilities. Tools, MCP, plugins and permissions stay with the runtime.',
    ogTitle: 'How fortytwo works — continuity around the runtime',
    ogDescription: 'The stack in one view: what fortytwo adds, what Claude Code keeps, and where each layer runs.',
    teaser: 'Who owns what: you, fortytwo and Claude Code.',
  },
  'always-on': {
    key: 'always-on', path: '/always-on', label: 'Run it 24/7',
    title: 'Run fortytwo 24/7 — laptop, VPS or homelab',
    description: 'Put fortytwo on a machine that stays online and the assistant stays reachable. Channels, scheduler and memory stay available; the model runs only when there is work.',
    ogTitle: 'Give your coding agent somewhere to stay',
    ogDescription: 'From a session to a presence. fortytwo keeps identity, memory, time and channels available on a laptop, a VPS or a homelab. The model runs only when there is work.',
    teaser: 'What 24/7 means, and where to run it.',
  },
  runtimes: {
    key: 'runtimes', path: '/runtimes', label: 'Runtime support',
    title: 'Runtime support — Claude Code is the only one today',
    description: 'Claude Code is the only supported runtime today. It owns reasoning, tools, permissions, MCP and skills; fortytwo adds identity, memory, time, channels and continuity.',
    ogTitle: 'Runtime support — Claude Code today',
    ogDescription: 'What the runtime owns, what fortytwo adds, and what is supported today.',
    teaser: 'Claude Code today, and where the boundary sits.',
  },
  trust: {
    key: 'trust', path: '/trust', label: 'Trust',
    title: 'Trust model — what fortytwo enforces and what it does not',
    description: 'Local-first state with no hosted backend, channel pairing, runtime-owned permissions and optional Gate. What fortytwo enforces, and what it leaves to the runtime and your providers.',
    ogTitle: 'Trust model — stated boundaries',
    ogDescription: 'Where data lives, who can talk to the assistant, who authorizes actions, and what fortytwo deliberately does not enforce.',
    teaser: 'Local-first state, pairing, runtime permissions, optional Gate.',
  },
}

export const pageOrder: PageKey[] = ['how-it-works', 'always-on', 'trust', 'runtimes']
