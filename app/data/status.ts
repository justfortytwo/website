export type StatusState = 'shipped' | 'optional' | 'edge'

export interface StatusItem {
  state: StatusState
  title: string
  body: string
  /** Sibling-repo README the claim was checked against. */
  source: string
}

export const status: StatusItem[] = [
  { state: 'shipped', title: 'Persistent agent sessions',
    body: 'A long-lived Claude Code session per chat, resumable by session ID, run through the runner.', source: 'runner/README.md' },
  { state: 'shipped', title: 'Telegram channel with continuity',
    body: 'Locked-down bot, one-time-code pairing, live sessions that resume after a restart.', source: 'telegram/README.md' },
  { state: 'shipped', title: 'Durable semantic memory',
    body: 'Store and recall by meaning, keyword or filter, with provenance and supersession.', source: 'memory/README.md' },
  { state: 'shipped', title: 'Scheduler and proactive jobs',
    body: 'A durable job queue and daemon that wakes the agent only when there is work.', source: 'scheduler/README.md' },
  { state: 'shipped', title: 'Persona and Oneiros',
    body: 'Identity scaffolding in plain files, and a daily tool-free pass that adds evidence-backed notes to three profile sections.', source: 'persona/README.md' },
  { state: 'shipped', title: 'Lifecycle CLI',
    body: 'init, start, status, stop, pair, doctor, update, rollback, forget and unbind.', source: 'installer/README.md' },
  { state: 'optional', title: 'Gate',
    body: 'An optional PreToolUse policy hook. Wire it in if you want one; the runtime’s own permissions apply either way.', source: 'gate/README.md' },
  { state: 'edge', title: 'One runtime, one channel',
    body: 'Claude Code is the only supported runtime and Telegram the only channel. The channel contract is adapter-shaped; no other adapter ships.', source: 'telegram/README.md' },
  { state: 'edge', title: '1.0 pre-release',
    body: 'Packages are pre-release. Crash recovery is best effort: no input replay, and recovery IDs are hints.', source: 'installer/README.md, telegram/README.md' },
]

export const statusLabels: Record<StatusState, string> = {
  shipped: 'WORKS TODAY',
  optional: 'OPTIONAL',
  edge: 'KNOWN EDGE',
}
