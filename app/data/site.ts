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
    note: 'Claude Code is the first supported runtime. More can follow.',
  },
  hero: {
    label: 'fortytwo',
    headline: 'Your coding agent is already powerful.',
    statement: 'fortytwo makes it personal, persistent, and always there.',
    body: 'fortytwo adds memory, identity, continuity, time and channels around the agent runtime you already trust — without replacing its tools, permissions or integrations.',
  },
  docs: 'https://github.com/justfortytwo/docs',
  nav: [
    { label: 'How it works', href: '/how-it-works' },
    { label: 'Always on', href: '/always-on' },
    { label: 'Runtimes', href: '/runtimes' },
    { label: 'Trust', href: '/trust' },
    { label: 'Docs ↗', href: 'https://github.com/justfortytwo/docs' },
    { label: 'GitHub ↗', href: 'https://github.com/justfortytwo' },
  ] satisfies NavItem[],
  footer: {
    copyright: '© 2026 Enrico Deleo · MIT',
    disclaimer: 'Not affiliated with Anthropic.',
    links: [
      { label: 'How it works', href: '/how-it-works' },
      { label: 'Always on', href: '/always-on' },
      { label: 'Runtimes', href: '/runtimes' },
      { label: 'Trust', href: '/trust' },
      { label: 'Docs ↗', href: 'https://github.com/justfortytwo/docs' },
      { label: 'GitHub ↗', href: 'https://github.com/justfortytwo' },
      { label: 'Marketplace ↗', href: 'https://github.com/justfortytwo/marketplace' },
    ] satisfies NavItem[],
  },
}
