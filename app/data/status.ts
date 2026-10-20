export type StatusState = 'shipped' | 'optional' | 'edge'

export interface StatusItem {
  state: StatusState
  title: string
  body: string
}

export const status: StatusItem[] = [
  { state: 'shipped', title: 'Persistent sessions',
    body: 'A long-lived Claude Code session per Telegram chat, picked back up after a restart.' },
  { state: 'shipped', title: 'Telegram channel',
    body: 'Locked down until a chat is paired with a one-time code. The only channel adapter that ships today.' },
  { state: 'shipped', title: 'Durable memory',
    body: 'Store and recall by meaning, keyword or filter. Corrections supersede history instead of erasing it.' },
  { state: 'shipped', title: 'Scheduling',
    body: 'Jobs that become due later. The model is invoked only when there is work.' },
  { state: 'shipped', title: 'Identity and lifecycle',
    body: 'Persona and owner context in plain files, and a CLI to set up, run, update and roll back an installation.' },
  { state: 'optional', title: 'Gate',
    body: 'An optional policy hook for tool execution. The runtime’s own permissions apply either way.' },
  { state: 'edge', title: 'Pre-release',
    body: 'Session recovery is best effort. fortytwo is not a durable message queue and does not promise exactly-once delivery.' },
]

export const statusLabels: Record<StatusState, string> = {
  shipped: 'WORKS TODAY',
  optional: 'OPTIONAL',
  edge: 'KNOWN EDGE',
}
