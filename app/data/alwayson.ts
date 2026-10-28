/** Content for /always-on and the home teaser. Claims are checked against the sibling package READMEs. */

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
    ],
  },
}

export const alwaysOnClaim = {
  headline: '24/7 does not mean the model is running 24/7.',
  body: 'It means the assistant infrastructure is available 24/7. The model is invoked when there is a turn to take: a message from you, or a job that is due.',
}

export interface Lane { heading: string; note: string; items: { name: string; body: string }[] }

export const availability: { stays: Lane; runs: Lane } = {
  stays: {
    heading: 'Stays available',
    note: 'No model running. No tokens spent.',
    items: [
      { name: 'Channel bridge', body: 'Listens for your messages and keeps the chat-to-session mapping.' },
      { name: 'Scheduler', body: 'Keeps time, and claims jobs when they come due.' },
      { name: 'Memory', body: 'A local database the agent can query when it needs to.' },
      { name: 'Identity', body: 'Persona and owner context as plain files in your project.' },
      { name: 'Session state', body: 'Enough saved state to pick a chat back up after a restart.' },
    ],
  },
  runs: {
    heading: 'Runs when there is work',
    note: 'Inference happens per turn.',
    items: [
      { name: 'Agent turn', body: 'Started by a message from you, or by a job that is due.' },
      { name: 'Oneiros pass', body: 'Daily maintenance. A cheap check looks for new memory or transcript entries first; with none, nothing runs.' },
    ],
  },
}

export interface DeployContext { id: string; name: string; tag: string; lines: string[]; link?: { label: string; href: string } }

export const deployContexts: DeployContext[] = [
  { id: 'laptop', name: 'Laptop', tag: 'Try it, use it locally',
    lines: [
      'Best for trying fortytwo and everyday local use.',
      'Reachable only while the machine is awake and online.',
      'Nothing to operate: run it in a terminal.',
    ] },
  { id: 'vps', name: 'VPS', tag: 'Reachable around the clock',
    lines: [
      'A small always-on machine keeps channels, scheduler and state available remotely.',
      'Not required. Use one if you want the assistant reachable while your laptop is closed.',
    ] },
  { id: 'homelab', name: 'Homelab', tag: 'Same model, your hardware',
    lines: [
      'The same architecture on infrastructure you control.',
      'Sits next to services you already run.',
      'You own the machine and the operational boundary.',
    ],
    link: { label: 'Homelab guide ↗', href: 'https://docs.forty-two.it/homelab.html' } },
]

export interface DayBeat { time: string; zone?: string; event: string; result: string }

export const day: DayBeat[] = [
  { time: '08:32', event: 'You message the assistant from Telegram.',
    result: 'The chat’s session resumes, and the agent can recall what you told it from memory.' },
  { time: '11:00', event: 'A scheduled job becomes due.',
    result: 'The scheduler claims it, checks that there is work, and wakes the agent through the runner. The result can be pushed to you.' },
  { time: '14:20', event: 'You open Claude Code in the same project over SSH.',
    result: 'Same persona files and the same durable memory. It is a different session from your Telegram chat, but it can search that conversation in the transcript.' },
]

export const dayNote = 'An illustrative day. The times are examples.'
