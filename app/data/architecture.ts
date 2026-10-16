/** Optional parts and ownership notes that sit beside the stack plate. */
export const architecture = {
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
