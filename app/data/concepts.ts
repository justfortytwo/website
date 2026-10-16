export interface Concept {
  id: 'memory' | 'identity' | 'continuity' | 'time' | 'channels' | 'ecosystem'
  title: string
  body: string
  /** Packages that implement it today (public names). */
  via: string[]
}

export const concepts: Concept[] = [
  { id: 'memory', title: 'Memory', via: ['memory', 'salience'],
    body: 'Durable personal recall, kept on your machine. Memories carry provenance, can be corrected without erasing history, and are found by meaning or by keyword.' },
  { id: 'identity', title: 'Identity', via: ['persona'],
    body: 'A coherent assistant that belongs to the installation: a name, a voice, owner context and house rules, rendered into plain files you can read and edit.' },
  { id: 'continuity', title: 'Continuity', via: ['runner', 'telegram'],
    body: 'Sessions and channels are access points to the same assistant, not disposable chats. A conversation can resume after a restart.' },
  { id: 'time', title: 'Time', via: ['scheduler'],
    body: 'Durable scheduling and proactive work. The assistant can have something to do later, not only something to answer now.' },
  { id: 'channels', title: 'Channels', via: ['telegram'],
    body: 'Use it where you already are. Telegram is the first channel; the boundary is a channel adapter with its own pairing, not a Telegram bot.' },
  { id: 'ecosystem', title: 'Your ecosystem', via: [],
    body: 'MCP, plugins, skills and the runtime’s native permissions remain the agent’s. Whatever the agent learns to do, the assistant can do.' },
]
