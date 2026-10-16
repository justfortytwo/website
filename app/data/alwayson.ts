/** Content for /always-on and the home teaser. Claims are checked against sibling READMEs (see `source`). */

export const presence = {
  session: {
    tag: 'A session',
    heading: 'A coding agent on a laptop',
    steps: ['open a terminal', 'start the agent', 'work', 'close the machine'],
    end: 'gone until next time',
  },
  presence: {
    tag: 'A presence',
    heading: 'fortytwo on a host that stays online',
    lead: 'fortytwo stays available',
    points: [
      'identity persists',
      'memory persists',
      'the scheduler keeps time',
      'channels stay reachable',
      'the agent runtime runs when there is work',
    ],
  },
}

export const alwaysOnClaim = {
  headline: '24/7 does not mean the model is running 24/7.',
  body: 'It means the assistant infrastructure is available 24/7. The model is invoked when there is a turn to take: a message from you, or a job that is due.',
}

export interface Lane { heading: string; note: string; items: { name: string; body: string }[] }

export const availability: { stays: Lane; runs: Lane; footnote: string } = {
  stays: {
    heading: 'Stays available',
    note: 'No model running. No tokens spent.',
    items: [
      { name: 'Channel bridge', body: 'Listens for your messages and keeps the chat-to-session mapping.' },
      { name: 'Scheduler', body: 'Keeps time, and claims jobs when they come due.' },
      { name: 'Memory', body: 'A local database the agent can query when it needs to.' },
      { name: 'Identity', body: 'Persona and owner context as plain files in your project.' },
      { name: 'Session state', body: 'Session IDs saved as recovery hints, so a restarted bridge can resume a chat.' },
    ],
  },
  runs: {
    heading: 'Runs when there is work',
    note: 'Inference happens per turn.',
    items: [
      { name: 'Agent turn', body: 'Started by a message from you, or by a job that is due.' },
      { name: 'Oneiros pass', body: 'Daily maintenance. A cheap check looks for new memory first; with none, nothing runs.' },
    ],
  },
  footnote: 'A live session process can stay resident between messages. It does no inference while idle. Crash recovery is best effort.',
}

export interface DeployContext { id: string; name: string; tag: string; lines: string[] }

export const deployContexts: DeployContext[] = [
  { id: 'laptop', name: 'Laptop', tag: 'Try it, use it locally',
    lines: [
      'Best for trying fortytwo and everyday local use.',
      'The assistant is available while the machine is awake and online.',
      'Nothing to operate: fortytwo start in a terminal.',
    ] },
  { id: 'vps', name: 'VPS', tag: 'Reachable around the clock',
    lines: [
      'A small always-on machine keeps channels, scheduler, state and lifecycle available remotely.',
      'Not required. Use one if you want the assistant reachable while your laptop is closed.',
      'The embedder can run elsewhere: point memory at a remote Ollama URL.',
    ] },
  { id: 'homelab', name: 'Homelab', tag: 'Same model, your hardware',
    lines: [
      'The same architecture on infrastructure you control.',
      'Sits next to services you already run. The embedder can be an Ollama in a sibling container or on another host.',
      'You own the machine and the operational boundary.',
    ] },
]

export const deployNote = 'The same architecture in all three. fortytwo start stays in the foreground on purpose, so systemd or docker compose owns restarts and logs.'

export const mentalModel = ['Your assistant.', 'Your runtime.', 'Your tools.', 'Your infrastructure.']
export const mentalModelClose = 'fortytwo supplies the continuity between them.'

export interface DayBeat { time: string; zone?: string; event: string; result: string; source: string }

export const day: DayBeat[] = [
  { time: '08:32', event: 'You message the assistant from Telegram.',
    result: 'The chat’s session resumes, and memory brings back what you told it.', source: 'telegram/README.md' },
  { time: '11:00', event: 'A scheduled job becomes due.',
    result: 'The scheduler claims it, checks that there is work, and wakes the agent through the runner. The result can be pushed to you.', source: 'scheduler/README.md' },
  { time: '14:20', event: 'You open Claude Code in the same project over SSH.',
    result: 'Same persona files and the same durable memory. It is a different session from your Telegram chat.', source: 'installer/README.md' },
  { time: '03:17', zone: 'UTC', event: 'Oneiros, the daily maintenance job, comes due.',
    result: 'If memory has new entries, a tool-free pass may add evidence-backed notes to three profile sections. Otherwise nothing runs.', source: 'persona/README.md, scheduler/README.md' },
]

export const dayNote = 'An illustrative day. Times are examples, except Oneiros, whose default schedule is 03:17 UTC.'

export const serviceExample = {
  tag: 'as a service',
  note: 'Run the foreground command under whatever already supervises your machine.',
}
