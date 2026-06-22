export interface NavItem { label: string; href: string }
export const site = {
  name: 'fortytwo',
  org: 'justfortytwo',
  lang: 'en' as const,
  url: 'https://forty-two.it',
  github: 'https://github.com/justfortytwo',
  tagline: 'The hard part is knowing the right question.',
  motto: ["Don't Panic.", 'Ask the right question.', 'Never cross the gate silently.'],
  nav: [
    { label: 'Components', href: '/components' },
    { label: 'Principles', href: '/principles' },
    { label: 'Docs', href: '/docs' },
    { label: 'GitHub ↗', href: 'https://github.com/justfortytwo' },
  ] satisfies NavItem[],
  footer: {
    copyright: '© 2026 justfortytwo · MIT',
    disclaimer: 'Not affiliated with Anthropic.',
    links: [
      { label: 'GitHub ↗', href: 'https://github.com/justfortytwo' },
      { label: 'Docs', href: '/docs' },
      { label: 'Marketplace', href: 'https://github.com/justfortytwo/marketplace' },
      { label: 'Security', href: '/security' },
    ] satisfies NavItem[],
  },
}
