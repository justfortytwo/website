/** The product boundary: what the agent runtime owns vs. what fortytwo adds. */
export const boundary = {
  heading: 'fortytwo adds continuity,',
  headingEm: 'not capabilities.',
  intro: 'Claude Code already reasons, plans and acts. fortytwo does not compete with that. It adds what a long-lived personal assistant needs and a coding session does not keep.',
  agentLabel: 'Claude Code already owns',
  agentOwns: [
    'reasoning and planning',
    'tools',
    'permissions',
    'MCP servers',
    'skills and plugins',
    'browser and computer use',
    'actions',
  ],
  fortytwoLabel: 'fortytwo adds',
  fortytwoAdds: [
    'identity',
    'memory',
    'continuity',
    'time',
    'channels',
  ],
  principle: 'When the runtime gets better, the assistant gets better.',
  ecosystem: 'Claude Code keeps its own ecosystem. MCP servers, plugins, skills and integrations stay where they are; fortytwo does not rebuild them or sit in front of them.',
}
