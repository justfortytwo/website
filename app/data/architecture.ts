/** Optional parts that sit beside the stack. */
export const architecture = {
  optional: {
    label: 'optional, where configured',
    items: [
      { name: 'gate', body: 'An optional policy hook for tool execution. Not in the normal path unless you enable it.' },
      { name: 'salience', body: 'Optional enrichment that helps memory keep what is worth keeping.' },
    ],
  },
}
