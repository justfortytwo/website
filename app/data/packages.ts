export type PackageGroupId = 'core' | 'optional' | 'bootstrap'

export interface Pkg {
  /** Public name (also the unscoped package segment). */
  name: string
  /** npm package, or the GitHub source for the marketplace. */
  pkg: string
  group: PackageGroupId
  /** Sourced from the package's own README. */
  description: string
}

export interface PackageGroup { id: PackageGroupId; label: string; blurb: string }

export const packageGroups: PackageGroup[] = [
  { id: 'core', label: 'Core continuity', blurb: 'What makes the agent a persistent assistant.' },
  { id: 'optional', label: 'Optional policy and enrichment', blurb: 'Useful, never required for the assistant to run.' },
  { id: 'bootstrap', label: 'Bootstrap and distribution', blurb: 'How it gets installed and kept current.' },
]

export const packages: Pkg[] = [
  { name: 'memory', pkg: '@justfortytwo/memory', group: 'core',
    description: 'Semantic-memory MCP server on SQLite and sqlite-vec. Semantic, keyword and structured recall, with provenance. Embeddings from a local Ollama model.' },
  { name: 'runner', pkg: '@justfortytwo/runner', group: 'core',
    description: 'The runtime adapter for Claude Code: one-shot jobs and persistent sessions over stream-json. Owns process lifecycle and transport, nothing about the agent itself.' },
  { name: 'scheduler', pkg: '@justfortytwo/scheduler', group: 'core',
    description: 'Durable job daemon. Claims due jobs from the memory database and starts an agent turn only behind a cheap “is there work?” check.' },
  { name: 'persona', pkg: '@justfortytwo/persona', group: 'core',
    description: 'Identity and context templates the installer renders into your project, plus Oneiros, a bounded daily maintenance pass over your profile.' },
  { name: 'telegram', pkg: '@justfortytwo/telegram', group: 'core',
    description: 'The Telegram channel adapter: a bridge that maps authorized chats to live sessions, with one-time-code pairing. It does not authorize tool calls.' },
  { name: 'gate', pkg: '@justfortytwo/gate', group: 'optional',
    description: 'A fail-closed PreToolUse policy hook: allow, defer or deny by capability tier. Optional, configured as a Claude Code plugin or hook.' },
  { name: 'salience', pkg: '@justfortytwo/salience', group: 'optional',
    description: 'Provider-agnostic extraction of atomic, scored candidate memories from a turn, so memory keeps only what is worth keeping.' },
  { name: 'installer', pkg: '@justfortytwo/installer', group: 'bootstrap',
    description: 'The lifecycle CLI (create-fortytwo and fortytwo): init, start, status, stop, pair, doctor, update, rollback, forget, unbind.' },
  { name: 'marketplace', pkg: 'justfortytwo/marketplace', group: 'bootstrap',
    description: 'The Claude Code plugin marketplace: gate, memory and an umbrella plugin with onboarding and self-update skills.' },
]
