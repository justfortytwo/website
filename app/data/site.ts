export interface NavItem { label: string; href: string }

export const site = {
  name: 'fortytwo',
  org: 'justfortytwo',
  lang: 'en' as const,
  url: 'https://forty-two.it',
  github: 'https://github.com/justfortytwo',
  author: 'Enrico Deleo',
  tagline: 'The hard part is knowing the right question.',
  motto: ['Stay calm.', 'The answer is 42.', 'The hard part is knowing the right question.'],
  /** The one runtime fortytwo supports today. Not the conceptual boundary of the product. */
  runtime: {
    current: 'Claude Code',
    note: 'Claude Code is the only supported runtime today.',
  },
  hero: {
    label: 'fortytwo',
    headline: 'Your coding agent is already powerful.',
    statement: 'fortytwo makes it personal, persistent, and always there.',
    body: 'Persistent identity, memory, time and channels for Claude Code.',
  },
  /** The separate documentation site: installation, configuration, reference. */
  docs: 'https://docs.forty-two.it',
  nav: [
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Run it 24/7', href: '/always-on' },
    { label: 'Trust', href: '/trust' },
    { label: 'Docs ↗', href: 'https://docs.forty-two.it' },
    { label: 'GitHub ↗', href: 'https://github.com/justfortytwo' },
  ] satisfies NavItem[],
  footer: {
    copyright: '© 2026 Enrico Deleo · MIT',
    disclaimer: 'Not affiliated with Anthropic.',
    links: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Run it 24/7', href: '/always-on' },
      { label: 'Trust', href: '/trust' },
      { label: 'Runtime support', href: '/runtimes' },
      { label: 'Docs ↗', href: 'https://docs.forty-two.it' },
      { label: 'GitHub ↗', href: 'https://github.com/justfortytwo' },
      { label: 'Marketplace ↗', href: 'https://github.com/justfortytwo/marketplace' },
    ] satisfies NavItem[],
  },
}
