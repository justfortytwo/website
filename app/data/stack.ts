/** The exploded stack, top to bottom. One source for the isometric plate and its mobile list. */
export type Owner = 'fortytwo' | 'runtime' | 'you'

export interface StackItem { label: string }

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
    items: [{ label: 'Telegram' }] },
  { id: 'fortytwo', name: 'fortytwo', owner: 'fortytwo', emphasis: true, relation: 'turns · context',
    caption: ['continuity', 'infrastructure'],
    items: [{ label: 'identity' }, { label: 'memory' }, { label: 'time' }, { label: 'continuity' }, { label: 'lifecycle' }] },
  { id: 'adapter', name: 'Runtime adapter', owner: 'fortytwo', relation: 'sessions · streams',
    caption: ['process and session', 'lifecycle'],
    items: [{ label: 'start · resume · stream' }] },
  { id: 'agent', name: 'Coding agent / harness', owner: 'runtime', relation: 'uses natively',
    caption: ['reasoning and planning'],
    items: [{ label: 'Claude Code' }] },
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
  'fortytwo memory and the transcript reach the agent as an MCP server, the same way any other server does.',
  'Claude Code is the only supported runtime today. fortytwo makes no model decisions: a Claude Code configured for a compatible provider keeps working as configured.',
]
