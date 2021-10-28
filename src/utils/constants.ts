import { section } from './database'

interface sectionInfoElement {
  /** The readable name of the section */
  name: string
  /** The order in which the section should be tested */
  order: number
  /** The number of questions that should be selected */
  sample: number
  /** The number of sub-questions that should be selected (only applies to 'com') */
  sub?: number
  /** The maximum number of minutes that the user can use to complete a section */
  minutes: number
  /** The maximum number of points the section can account for (test total is 100) */
  score: number
}

export const sectioninfo: Record<section, sectionInfoElement> = {
  ing: {
    name: 'Inglese',
    order: 1,
    sample: 30,
    minutes: 15,
    score: 10
  },
  mat: {
    name: 'Matematica',
    order: 2,
    sample: 25,
    minutes: 75,
    score: 65
  },
  com: {
    name: 'Comprensione',
    order: 3,
    sample: 1,
    sub: 5,
    minutes: 10,
    score: 15
  },
  fis: {
    name: 'Fisica',
    order: 4,
    sample: 5,
    minutes: 10,
    score: 10
  }
}

export function getSectionName(key: section) {
  return sectioninfo[key].name
}

export function getNextSection(currentSection: section): section {
  const sortedInfo = Object.entries(sectioninfo).sort(
    (a, b) => a[1].order - b[1].order
  ) as [section, sectionInfoElement][]
  const i = sortedInfo.findIndex((e) => e[0] == currentSection)
  return sortedInfo[i + 1][0]
}
