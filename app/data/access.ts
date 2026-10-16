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
  },
  later: {
    label: 'Could come later',
    badge: 'Not shipped',
    /** Illustrative only. None of these adapters exist. */
    points: [
      { name: 'Slack', icon: 'simple-icons:slack' },
      { name: 'Discord', icon: 'simple-icons:discord' },
      { name: 'WhatsApp', icon: 'simple-icons:whatsapp' },
      { name: 'Signal', icon: 'simple-icons:signal' },
      { name: 'Matrix', icon: 'simple-icons:matrix' },
      { name: 'Email', icon: 'lucide:mail' },
    ],
    yours: 'Your adapter',
    note: 'The channel contract is adapter-shaped, so another channel is an adapter, not a new assistant. No other adapter ships today, and the logos above are examples, not a roadmap.',
  },
  shared: {
    name: 'fortytwo',
    items: ['identity', 'memory', 'continuity', 'time'],
  },
  adapter: 'runtime adapter',
  agent: 'agent',
  note: 'Every access point reaches the same identity files and the same durable memory. Live sessions are per chat: a terminal session is not your Telegram session.',
}
