export interface Component {
  codename: string
  role: string
  description: string
  state?: 'live' | 'design'
}
export const components: Component[] = [
  { codename:'vogon', role:'gate', description:'The PreToolUse safety gate. Every tool call passes through it — allow · defer · deny. Nothing crosses silently.' },
  { codename:'guide', role:'memory', description:'Semantic memory over SQLite, full-text and vector recall. Remembers what you’d want remembered — with provenance.' },
  { codename:'babelfish', role:'telegram', description:'The channel adapter. Talk to your assistant where you already are — mobile interface, approval cards, continuity.' },
  { codename:'ford', role:'persona', description:'Identity & context — CLAUDE.md + context/*. Who the assistant is, and who it serves. Scaffolded, never shipped filled.' },
  { codename:'magrathea', role:'cli', description:'The installer & lifecycle. init · doctor · update · rollback · enrich · forget. One operator over both surfaces.' },
  { codename:'subetha', role:'marketplace', description:'The Claude Code plugin marketplace. Install any part, à la carte, and keep it current.' },
  { codename:'deepthought', role:'cognition', description:'The reasoning layer.', state:'design' },
]
