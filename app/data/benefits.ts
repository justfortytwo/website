/** What a first-time visitor should leave with. One row each; every row is backed by a package doc. */
export interface Benefit { id: string; title: string; before?: string; after: string }

export const benefits: Benefit[] = [
  { id: 'phone', title: 'Reach it from your phone',
    before: 'Close the laptop and the agent is gone.',
    after: 'Text it from the train. One persistent session per chat; only paired chats get a reply.' },
  { id: 'memory', title: 'It remembers you',
    before: 'Every session starts from zero.',
    after: 'Facts persist across sessions and channels. A correction supersedes the old fact; history is kept.' },
  { id: 'transcript', title: 'Every conversation, searchable',
    before: '“What did we decide on Tuesday?”',
    after: 'transcript_search finds it, by keyword or meaning, from any session.' },
  { id: 'work', title: 'Work while you are away',
    before: 'Nothing happens until you ask.',
    after: 'Scheduled jobs push results to Telegram. A cheap check runs first: no work, no model call.' },
  { id: 'local', title: 'One command, your machine',
    after: 'State lives in a SQLite file in your project. update and rollback keep it current.' },
]

export const benefitsNote = 'Claude Code still does the work. fortytwo adds what a session forgets.'
