export interface Milestone { id: 'M1'|'M2'; label: string; state: 'done'|'wip'; title: string; body: string }
export const milestones: Milestone[] = [
  { id:'M1', label:'the spine', state:'done', title:'The spine is walking.',
    body:'Memory MCP, journal & registry, Telegram bridge, Claude Code cockpit, subagents & skills, PreToolUse gate, approval flow, durable jobs, restart-resilient operation.' },
  { id:'M2', label:'trust hardening', state:'wip', title:'Hardening the trust layer.',
    body:'Prompt-injection defense, source-authority classification, content-is-not-authority rules, tamper-evident audit, payload-bound approvals, typed memory governance, review/export/prune.' },
]
