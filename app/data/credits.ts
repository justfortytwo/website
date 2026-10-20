// Credits for the archival pictures under public/img. Keep in sync with the files in use.
export interface PictureCredit {
  title: string
  creator?: string
  source: string
  licence: string
  licenceUrl: string
}

export const pictureCredits: PictureCredit[] = [
  { title: 'Schlagwortkatalog', creator: 'Dr. Marcus Gossler', source: 'https://commons.wikimedia.org/wiki/File:Schlagwortkatalog.jpg', licence: 'CC BY-SA 3.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0/' },
  { title: 'Clocks: mechanism of a pocket watch', source: 'https://commons.wikimedia.org/w/index.php?curid=36563465', licence: 'CC BY 4.0', licenceUrl: 'https://creativecommons.org/licenses/by/4.0/' },
  { title: 'Switchboard operators, 1958', creator: 'Seattle Municipal Archives', source: 'https://commons.wikimedia.org/w/index.php?curid=158664815', licence: 'CC BY 2.0', licenceUrl: 'https://creativecommons.org/licenses/by/2.0/' },
  { title: 'Telegraphists in the Beginning', creator: 'Rikazuki', source: 'https://commons.wikimedia.org/wiki/File:Telegraphists_in_the_Beginning_(2nd_ed).jpg', licence: 'CC BY-SA 3.0', licenceUrl: 'https://creativecommons.org/licenses/by-sa/3.0' },
  { title: 'Architecture: a lock and key with gothic ornament', source: 'https://commons.wikimedia.org/wiki/File:Architecture;_a_lock_and_key_with_gothic_ornament._Wood_engr_Wellcome_V0024301.jpg', licence: 'CC BY 4.0', licenceUrl: 'https://creativecommons.org/licenses/by/4.0' },
  { title: 'Lantern Slide - Tangyes Ltd, Governor', source: 'https://commons.wikimedia.org/wiki/File:Lantern_Slide_-_Tangyes_Ltd,_Governor,_circa_1910.jpg', licence: 'public domain', licenceUrl: 'https://creativecommons.org/publicdomain/mark/1.0/' },
]
