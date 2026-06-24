export interface Milestone { id: 'M1'|'M2'; label: string; state: 'done'|'wip'; title: string; body: string }
export const milestones: Milestone[] = [
  { id:'M1', label:'the spine · shipped', state:'done', title:'The spine is walking — and shipped.',
    body:'Memory MCP, Telegram bridge, PreToolUse gate, approval flow, persona scaffolding. Now decomposed into seven packages, published to npm and installable with create-fortytwo; the init / doctor / update / rollback lifecycle is wired, CI green on every repo.' },
  { id:'M2', label:'trust hardening', state:'wip', title:'Hardening the trust layer.',
    body:'Prompt-injection defense, source-authority classification, content-is-not-authority rules, tamper-evident audit, payload-bound approvals, typed memory governance, review/export/prune.' },
]
