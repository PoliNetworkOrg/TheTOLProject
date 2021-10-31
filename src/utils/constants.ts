import { section } from './database'
import Fraction from 'fraction.js'

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
  /** The weight that this section's score has on the total score ({@link testTotalScore}) */
  coeff: number | Fraction
}

export const sectionInfo: Record<section, sectionInfoElement> = {
  ing: {
    name: 'Inglese',
    order: 1,
    sample: 30,
    minutes: 15,
    coeff: new Fraction('1/3')
  },
  mat: {
    name: 'Matematica',
    order: 2,
    sample: 25,
    minutes: 75,
    coeff: 2.6
  },
  com: {
    name: 'Comprensione',
    order: 3,
    sample: 1,
    sub: 5,
    minutes: 10,
    coeff: 3
  },
  fis: {
    name: 'Fisica',
    order: 4,
    sample: 5,
    minutes: 10,
    coeff: 2
  }
}

export const testTotalScore = 100
/** Minimum score to pass the test */
export const testPassThreshold = 60
/** Minimum number of correct questions to pass the test */
export const tengPassThreshold = 24

export function getSectionName(key: section) {
  return sectionInfo[key].name
}

export function getNextSection(currentSection: section): section | undefined {
  const sortedInfo = Object.entries(sectionInfo).sort(
    (a, b) => a[1].order - b[1].order
  ) as [section, sectionInfoElement][]
  const i = sortedInfo.findIndex((e) => e[0] == currentSection)
  return (sortedInfo[i + 1] || [])[0]
}
