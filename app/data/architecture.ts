/** Layers of the architecture diagram, top to bottom. */
export const architecture = {
  top: {
    label: 'fortytwo',
    caption: 'continuity infrastructure',
    items: ['identity', 'memory', 'time', 'continuity', 'channels'],
  },
  adapter: { label: 'runtime adapter', caption: 'process and session lifecycle · today: runner' },
  runtime: { label: 'agent runtime', caption: 'Claude Code today' },
  owned: [
    { label: 'native tools', caption: 'permissions · capabilities' },
    { label: 'MCP · plugins · skills', caption: 'the agent’s ecosystem' },
  ],
  optional: {
    label: 'optional, where configured',
    items: [
      { name: 'gate', body: 'A policy hook on the runtime’s own hook points. Not on the normal path unless you wire it in.' },
      { name: 'salience', body: 'Model-driven extraction that enriches what memory stores.' },
    ],
  },
  notes: [
    'The runtime owns its effective tool permissions.',
    'Channels carry messages and identity. They do not grant approvals.',
    'fortytwo memory is an MCP server the runtime calls like any other.',
  ],
}
