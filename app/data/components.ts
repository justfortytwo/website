export interface Component {
  /** Public name (also the unscoped package segment). */
  name: string
  /** npm package, or the GitHub source for the marketplace. */
  pkg: string
  description: string
}
export const components: Component[] = [
  { name:'gate', pkg:'@justfortytwo/gate', description:'The PreToolUse safety gate. Every tool call passes through it — allow · defer · deny. Nothing crosses silently.' },
  { name:'memory', pkg:'@justfortytwo/memory', description:'Semantic memory over SQLite — full-text and vector recall. Remembers what you’d want remembered, with provenance.' },
  { name:'salience', pkg:'@justfortytwo/salience', description:'The model-driven salience engine. Decides what is worth remembering, so memory writes only what matters.' },
  { name:'telegram', pkg:'@justfortytwo/telegram', description:'The channel adapter. Talk to your assistant where you already are — mobile, approval cards, continuity.' },
  { name:'persona', pkg:'@justfortytwo/persona', description:'Identity & context — CLAUDE.md + context/*. Who the assistant is, and who it serves. Scaffolded, never shipped filled.' },
  { name:'installer', pkg:'@justfortytwo/installer', description:'The installer & lifecycle CLI (create-fortytwo / fortytwo). init · doctor · pair · forget · unbind. One operator over both surfaces.' },
  { name:'marketplace', pkg:'justfortytwo/marketplace', description:'The Claude Code plugin marketplace. Install any part à la carte, and keep it current.' },
]
