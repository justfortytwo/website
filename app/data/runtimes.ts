export const runtimeTable = [
  { name: 'Claude Code', state: 'supported' as const, body: 'The only supported runtime. fortytwo starts it for one-shot jobs and keeps persistent sessions with it.' },
  { name: 'Any other runtime', state: 'none' as const, body: 'Not supported.' },
]

/** The runtime/fortytwo split, in the runtime-support vocabulary. Same shape as `boundary`. */
export const runtimeBoundary = {
  agentLabel: 'The runtime owns',
  agentOwns: [
    'reasoning and the model',
    'tools and execution',
    'permissions',
    'MCP servers',
    'skills and plugins',
    'browser and computer use',
  ],
  fortytwoLabel: 'fortytwo owns',
  fortytwoAdds: [
    'identity',
    'durable memory',
    'time and scheduling',
    'session continuity',
    'channels',
    'lifecycle',
  ],
}

export const providerNote = 'fortytwo makes no model decisions. A Claude Code configured for a compatible provider keeps working as configured.'
export const noDuplication = 'If the runtime’s ecosystem already has an MCP server or plugin for something, that is where it belongs. fortytwo does not rebuild integrations because an assistant would find them useful.'
