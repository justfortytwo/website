/** The exploded stack, top to bottom. One source for the isometric plate and its mobile list. */
export type Owner = 'fortytwo' | 'runtime' | 'you'

export interface StackItem { label: string; /** Not shipped yet: drawn muted. */ future?: boolean }

export interface StackLayer {
  id: string
  name: string
  /** Short lines under the name. */
  caption: string[]
  items: StackItem[]
  owner: Owner
  /** The one layer drawn in bronze. */
  emphasis?: boolean
  /** What flows to the next layer down. */
  relation?: string
}

export const stack: StackLayer[] = [
  { id: 'channels', name: 'Channels', owner: 'fortytwo', relation: 'messages · identity',
    caption: ['where you reach it'],
    items: [{ label: 'Telegram' }, { label: 'future adapters', future: true }] },
  { id: 'fortytwo', name: 'fortytwo', owner: 'fortytwo', emphasis: true, relation: 'turns · context',
    caption: ['continuity', 'infrastructure'],
    items: [{ label: 'identity' }, { label: 'memory' }, { label: 'time' }, { label: 'continuity' }, { label: 'lifecycle' }] },
  { id: 'adapter', name: 'Runtime adapter', owner: 'fortytwo', relation: 'sessions · streams',
    caption: ['process and session', 'lifecycle'],
    items: [{ label: 'start · resume · stream' }] },
  { id: 'agent', name: 'Coding agent / harness', owner: 'runtime', relation: 'uses natively',
    caption: ['reasoning and planning'],
    items: [{ label: 'Claude Code today' }, { label: 'more runtimes later', future: true }] },
  { id: 'capabilities', name: 'Agent capabilities', owner: 'runtime', relation: 'runs on',
    caption: ['what the agent can do'],
    items: [{ label: 'MCP' }, { label: 'plugins' }, { label: 'skills' }, { label: 'native tools' }, { label: 'permissions' }] },
  { id: 'machine', name: 'Machine', owner: 'you',
    caption: ['where it lives'],
    items: [{ label: 'laptop' }, { label: 'VPS' }, { label: 'homelab' }] },
]

export const owners: Record<Owner, { label: string; note: string }> = {
  fortytwo: { label: 'fortytwo', note: 'continuity infrastructure' },
  runtime: { label: 'the runtime', note: 'tools · MCP · permissions' },
  you: { label: 'you', note: 'the host and its boundary' },
}

export const stackNotes = [
  'fortytwo is not inserted between the agent and its capabilities. It surrounds the runtime.',
  'fortytwo memory reaches the agent as an MCP server, the same way any other server does.',
  'Gate and salience are optional and sit outside this path unless you wire them in.',
]

/** The four responsibilities, before any package name appears. */
export interface Responsibility { label: string; blurb: string; items: string[]; owner: Owner }
export const responsibilities: Responsibility[] = [
  { label: 'Personal assistant layer', owner: 'fortytwo', blurb: 'What a session does not keep.',
    items: ['identity', 'memory', 'time', 'continuity', 'channels'] },
  { label: 'Runtime', owner: 'runtime', blurb: 'The agent that does the work.',
    items: ['coding agent / harness', 'reasoning and planning', 'effective permissions'] },
  { label: 'Capabilities', owner: 'runtime', blurb: 'Whatever the runtime can reach.',
    items: ['native tools', 'MCP servers', 'plugins', 'skills'] },
  { label: 'Infrastructure', owner: 'you', blurb: 'Wherever you choose to run it.',
    items: ['laptop', 'VPS', 'homelab', 'container or service manager'] },
]
