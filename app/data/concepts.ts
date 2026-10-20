export interface Concept {
  id: 'identity' | 'memory' | 'continuity' | 'time' | 'channels'
  title: string
  body: string
}

export const concepts: Concept[] = [
  { id: 'identity', title: 'Identity',
    body: 'Who the assistant is and who it serves: a name, a voice and owner context, kept in plain files you can read and edit.' },
  { id: 'memory', title: 'Memory',
    body: 'What it can remember durably, kept on your machine. Memories carry provenance and are found by meaning or by keyword.' },
  { id: 'continuity', title: 'Continuity',
    body: 'A conversation can resume after a process restart instead of starting over. Recovery is best effort.' },
  { id: 'time', title: 'Time',
    body: 'Work that becomes due later. The assistant can have something to do, not only something to answer.' },
  { id: 'channels', title: 'Channels',
    body: 'How you reach it. Telegram is the first channel adapter: it uses a bot for transport, and the bot is not the assistant.' },
]

/** Shown beside the concepts: what is shared across channels and what is not. */
export const sessionNote = {
  lead: 'Channels share identity and durable memory.',
  body: 'Each live conversation still has its own session context.',
}
