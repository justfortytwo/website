export interface TrustClaim { title: string; body: string }

export const trustSections: { id: string; heading: string; lead: string; claims: TrustClaim[] }[] = [
  { id: 'local', heading: 'Where data lives', lead: 'fortytwo keeps its own state on your machine and runs no hosted backend for it. That does not make everything local.',
    claims: [
      { title: 'Memory and conversations are a local database', body: 'They live in your project, and by default embeddings are computed locally too. A remote embedder, if you configure one, receives the text it embeds.' },
      { title: 'Every message is kept', body: 'The transcript keeps every conversation, with no expiry and no function to delete a message. Treat the database and its backups as sensitive.' },
      { title: 'Identity is plain files', body: 'Persona and owner context render into files you can read, edit and version.' },
      { title: 'Your model provider still sees context', body: 'The runtime sends whatever context it sends to its model provider, as it always does. fortytwo does not change that.' },
      { title: 'Telegram carries your messages', body: 'Messages travel through Telegram, as with any Telegram bot.' },
      { title: 'Integrations keep their own boundaries', body: 'MCP servers, plugins and other integrations are governed by the runtime and by their own providers.' },
    ] },
  { id: 'who', heading: 'Who can talk to it', lead: 'A channel is a door with a lock. The lock is pairing.',
    claims: [
      { title: 'Locked down until paired', body: 'Until a chat is paired, the bot ignores everyone. fortytwo pair issues a one-time code; the chat redeems it with /login.' },
      { title: 'Telegram is transport, not authorization', body: 'Telegram carries messages and identity. It never grants tool approvals, and the bot is not a separate assistant.' },
    ] },
  { id: 'actions', heading: 'Who authorizes actions', lead: 'The runtime does. fortytwo does not stand between the agent and its tools.',
    claims: [
      { title: 'Native permissions are authoritative', body: 'Claude Code owns the effective tool permissions. fortytwo does not replace or override them.' },
      { title: 'Gate is optional', body: 'Gate is a policy hook you can add for extra control. It is not in the normal Telegram → Claude Code → tool path unless you enable it.' },
    ] },
  { id: 'content', heading: 'Content is not authority', lead: 'Words in a message, a memory or a web page are inputs to the model. They are not permissions.',
    claims: [
      { title: 'Permissions live outside the conversation', body: 'What the agent may do is set in the runtime and, optionally, in Gate. Nothing a message says changes that.' },
      { title: 'Daily maintenance is bounded', body: 'The daily pass is tool-free and can only add notes to your profile. The model’s judgment is not treated as a security guarantee.' },
    ] },
]

export const enforces = [
  'Which chats may talk to the assistant (pairing and bindings).',
  'Where its own state is stored: a local database and plain files in your project.',
  'What the daily maintenance pass may write to your profile.',
  'Gate’s policy, if you enable it.',
]
export const doesNotEnforce = [
  'Tool permissions. The runtime owns them.',
  'What your model provider does with prompts, and where a remote embedder runs if you configure one.',
  'What Telegram, MCP servers and other integrations do with what they receive.',
  'Isolation of the agent from your host. That is the runtime’s permissions and your machine’s boundary.',
  'Delivery guarantees. Session recovery is best effort; fortytwo is not a durable message queue.',
]
