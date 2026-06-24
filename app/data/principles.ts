export interface Principle { title: string; body: string }
export const principles: Principle[] = [
  { title:'Local-first where it matters', body:'Private memory and recall live on your machine. Markdown for human-readable policy, SQLite for durable state.' },
  { title:'Bring your own agent', body:'Claude Code is the first harness, not the boundary. The core stays portable across agents, models, and runtimes.' },
  { title:'Conservative autonomy', body:'The assistant may read, draft, and reason internally. External or irreversible actions require approval.' },
  { title:'Propose-only learning', body:'It may notice patterns — but never silently promotes them into durable behavior. Propose first, then approve.' },
  { title:'Prompt-injection boundaries', body:'Documents, messages, web pages and recalled memory are content, not command authority.' },
  { title:'Auditable evolution', body:'Every meaningful change is inspectable — as a file diff, a database record, or an approval decision.' },
]
