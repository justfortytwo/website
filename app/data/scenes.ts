export interface Scene { when: string; title: string; body: string }

/** What using it feels like. Each beat is backed by shipped behaviour (see status.ts sources). */
export const scenes: Scene[] = [
  { when: 'On your phone', title: 'You message it like a person.',
    body: 'Pair a Telegram chat once. After that, the chat is a live line to your agent. You can send another message while it is still working.' },
  { when: 'A day later', title: 'It is still the same assistant.',
    body: 'The bridge restarted, the machine slept. The next message resumes the conversation, and memory brings back what you told it.' },
  { when: 'While you are away', title: 'It has things to do.',
    body: 'A scheduled job wakes the agent, only when there is work to do, and can push the result to you.' },
  { when: 'Over weeks', title: 'It learns who you are, in the open.',
    body: 'Memory accumulates with provenance. A daily maintenance pass can propose narrow additions to your profile, validated against evidence. Everything stays in files and a local database you can inspect.' },
]
