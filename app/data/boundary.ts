/** The product boundary: what the agent runtime owns vs. what fortytwo adds. */
export const boundary = {
  heading: 'Don’t reinvent the agent.',
  intro: 'Coding agents already reason, plan and act. fortytwo does not compete with that. It supplies what a long-lived personal assistant needs and a coding session does not give you.',
  agentLabel: 'The agent already knows how to',
  agentOwns: [
    'think and reason',
    'plan',
    'use tools',
    'call MCP servers',
    'run plugins and skills',
    'browse and use a computer',
    'write code',
    'ask for permission',
    'perform actions',
  ],
  fortytwoLabel: 'fortytwo makes it possible to',
  fortytwoAdds: [
    'remember you',
    'stay the same assistant across sessions',
    'stay reachable through persistent channels',
    'wake up later',
    'carry durable context forward',
    'keep a personal identity and continuity',
  ],
  principle: 'fortytwo should inherit improvements from the underlying agent, not compete with them.',
  ecosystem: 'MCP servers, native integrations, plugins, skills and external workflow systems stay first-class parts of the agent’s own ecosystem. fortytwo does not rebuild them or sit in front of them.',
}
