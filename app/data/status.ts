export type StatusState = 'shipped' | 'optional' | 'edge'

export interface StatusItem {
  state: StatusState
  title: string
  body: string
}

export const status: StatusItem[] = [
  { state: 'shipped', title: 'Telegram channel',
    body: 'One live session per paired chat, picked back up after a restart. The only channel adapter that ships today.' },
  { state: 'shipped', title: 'Durable memory',
    body: 'Facts recalled by meaning or keyword. Corrections supersede the old fact; history is kept.' },
  { state: 'shipped', title: 'Searchable transcript',
    body: 'Every conversation kept and searchable, from any session.' },
  { state: 'shipped', title: 'Scheduling',
    body: 'Jobs that become due later. The model runs only when there is work.' },
  { state: 'shipped', title: 'Identity and lifecycle',
    body: 'Persona in plain files, and a CLI to set up, run, update and roll back.' },
  { state: 'optional', title: 'Gate',
    body: 'An optional policy hook for tool execution. Runtime permissions apply either way.' },
  { state: 'edge', title: 'Known limits',
    body: 'Session recovery is best effort; fortytwo is not a durable message queue. The transcript keeps everything, with no function to delete a message.' },
]

export const statusLabels: Record<StatusState, string> = {
  shipped: 'WORKS TODAY',
  optional: 'OPTIONAL',
  edge: 'KNOWN EDGE',
}
