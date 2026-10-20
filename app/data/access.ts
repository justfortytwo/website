/** Channels are access points to one assistant, not separate assistants. */
export interface AccessPoint { name: string; icon: string; body: string }

export const access = {
  you: { name: 'You', icon: 'lucide:user' },
  live: {
    label: 'Works today',
    points: [
      { name: 'Telegram', icon: 'simple-icons:telegram', body: 'One live session per authorized chat.' },
      { name: 'Terminal', icon: 'lucide:terminal', body: 'Claude Code opened in the same project.' },
    ] satisfies AccessPoint[],
    note: 'Other channel adapters can follow. Telegram is the only one that ships today.',
  },
  shared: {
    name: 'fortytwo',
    items: ['identity', 'memory', 'continuity', 'time'],
  },
  adapter: 'runtime adapter',
  agent: 'Claude Code',
  note: 'Channels share identity and durable memory. Each live conversation still has its own session context.',
}
