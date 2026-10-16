export interface Principle { title: string; body: string }
export const principles: Principle[] = [
  { title: 'Use the agent you already trust.', body: 'fortytwo adds continuity around it instead of rebuilding its capabilities. When the agent gets better, so does the assistant.' },
  { title: 'The runtime is a seam, not the product.', body: 'Claude Code is the first supported runtime. The adapter boundary is where more can follow, and nothing is promised before it ships.' },
  { title: 'Local-first where it matters.', body: 'Memory lives in SQLite on your machine, embeddings come from a local model, and secrets and persona files stay out of version control.' },
  { title: 'Content is not command authority.', body: 'Documents, messages, web pages and recalled memory are material to reason about. They are never instructions to obey.' },
  { title: 'Inspectable, durable state.', body: 'Plain markdown for identity and rules, a local database for memory, and history that is superseded rather than erased.' },
  { title: 'Yours to own and reverse.', body: 'Forget memories on demand, unbind a chat, roll back an update. The owner holds the controls, and the assistant does not.' },
]
