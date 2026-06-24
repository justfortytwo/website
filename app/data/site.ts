export interface NavItem { label: string; href: string }
export const site = {
  name: 'fortytwo',
  org: 'justfortytwo',
  lang: 'en' as const,
  url: 'https://forty-two.it',
  github: 'https://github.com/justfortytwo',
  author: 'Enrico Deleo',
  tagline: 'The hard part is knowing the right question.',
  motto: ['Stay calm.', 'Ask the right question.', 'Never cross the gate silently.'],
  nav: [
    { label: 'Components', href: '/#components' },
    { label: 'Principles', href: '/#principles' },
    { label: 'Docs ↗', href: 'https://github.com/justfortytwo' },
    { label: 'GitHub ↗', href: 'https://github.com/justfortytwo' },
  ] satisfies NavItem[],
  footer: {
    copyright: '© 2026 Enrico Deleo · MIT',
    disclaimer: 'Not affiliated with Anthropic.',
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/justfortytwo' },
      { label: 'Components', href: '/#components' },
      { label: 'Principles', href: '/#principles' },
      { label: 'Marketplace ↗', href: 'https://github.com/justfortytwo/marketplace' },
    ] satisfies NavItem[],
  },
}
