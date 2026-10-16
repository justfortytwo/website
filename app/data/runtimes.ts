export const runtimeTable = [
  { name: 'Claude Code', state: 'supported' as const, body: 'The reference runtime. The adapter starts one-shot jobs and persistent streaming sessions, and resumes them by session ID.' },
  { name: 'Other coding agents', state: 'none' as const, body: 'Not supported. The adapter is kept thin so another could be written; none ships today.' },
]

export const runtimeOwns = [
  'reasoning, planning and subagents',
  'native tools and their effective permissions',
  'MCP servers',
  'plugins and skills',
  'browser and computer use',
  'model and provider choice',
]

export const adapterNeeds = [
  { need: 'A headless, streaming mode', today: 'Claude Code stream-json sessions, plus one-shot runs.' },
  { need: 'Resumable sessions', today: 'Resume by session ID after a restart. IDs are recovery hints, not a transaction log.' },
  { need: 'MCP servers', today: 'Memory is wired in through the project’s .mcp.json.' },
  { need: 'Project context files', today: 'Identity is rendered into CLAUDE.md and context files.' },
]

export const providerNote = 'The adapter forwards environment and arguments to Claude Code, so a Claude Code you have pointed at a compatible provider keeps working. fortytwo makes no model decisions.'
export const noDuplication = 'fortytwo does not rebuild integrations just because an assistant would find them useful. If the runtime’s ecosystem has an MCP server or plugin for it, that is where it belongs.'
