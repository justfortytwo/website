export interface TrustClaim { title: string; body: string; source: string }

export const trustSections: { id: string; heading: string; lead: string; claims: TrustClaim[] }[] = [
  { id: 'local', heading: 'Where data lives', lead: 'Local-first means your project directory, not our servers. There are none.',
    claims: [
      { title: 'Memory is a local database', body: 'SQLite with sqlite-vec on your machine. Embeddings come from a local Ollama model by default.', source: 'memory/README.md, installer/README.md' },
      { title: 'Identity is plain files', body: 'Persona and owner context render into files you can read, edit and version.', source: 'persona/README.md' },
      { title: 'Your model provider still sees your prompts', body: 'The runtime you choose sends context to its provider, as it always does. fortytwo does not change that.', source: 'telegram/README.md' },
    ] },
  { id: 'who', heading: 'Who can talk to it', lead: 'A channel is a door with a lock. The lock is pairing.',
    claims: [
      { title: 'Locked down until paired', body: 'With no bindings and no bootstrap list, the bot ignores everyone. fortytwo pair issues a one-time code; a chat redeems it with /login.', source: 'telegram/README.md' },
      { title: 'Bindings are persisted', body: 'Each message is authorized against saved bindings. Authorization works even when memory is absent.', source: 'telegram/README.md' },
      { title: 'Telegram does not authorize tools', body: 'Channels carry messages and identity. They do not grant approvals.', source: 'telegram/README.md' },
    ] },
  { id: 'actions', heading: 'Who authorizes actions', lead: 'The runtime does. fortytwo does not stand between the agent and its tools.',
    claims: [
      { title: 'Native permissions are authoritative', body: 'Claude Code owns the effective tool permissions. fortytwo does not replace or override them.', source: 'runner/README.md, telegram/README.md' },
      { title: 'Gate is optional', body: 'A fail-closed PreToolUse hook that allows, defers or denies by capability tier. Wire it in if you want one. It is not on the mandatory path.', source: 'gate/README.md' },
      { title: 'No approval prompts in Telegram', body: 'Telegram offers no approval buttons. Conversational confirmation is not durable tool authorization.', source: 'telegram/README.md' },
    ] },
  { id: 'content', heading: 'Content is not authority', lead: 'Words in a message, a memory or a web page are inputs to the model. They are not permissions.',
    claims: [
      { title: 'Permissions live outside the conversation', body: 'What the agent may do is set in the runtime and, optionally, in Gate. Nothing a message says changes that.', source: 'telegram/README.md, gate/README.md' },
      { title: 'Oneiros has a deterministic boundary', body: 'Its tool-free pass can only add plain-text bullets to three profile sections, backed by evidence the owner stated. The model’s judgment is not treated as a security guarantee.', source: 'persona/README.md' },
    ] },
]

export const enforces = [
  'Which chats may talk to the assistant (pairing and bindings).',
  'Where memory and identity are stored (locally).',
  'What Oneiros may write to your profile.',
  'Gate’s policy, if you wire it in.',
]
export const doesNotEnforce = [
  'Tool permissions. The runtime owns them.',
  'What your model provider does with prompts.',
  'Isolation of the agent from your host. That is the runtime’s permissions and your machine’s boundary.',
  'Delivery guarantees. This is 1.0 pre-release; crash recovery is best effort.',
]
