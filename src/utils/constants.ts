import { Section } from './database'
import Fraction from 'fraction.js'

export const links = {
  githubLicense:
    'https://github.com/PoliNetworkOrg/TheTOLProject/blob/main/LICENSE',
  githubSource: 'https://github.com/PoliNetworkOrg/TheTOLProject/',
  polinetwork: 'https://polinetwork.org',
  polinetworkLogoSvg:
    'https://raw.githubusercontent.com/PoliNetworkOrg/Logo/1bf5ca6d64658d33d0159c0f526b57a6a31b9fc6/Logo.svg',
  telegramPreparazioneTOL: 'https://t.me/joinchat/_zugEikozmcyMzA0',
  telegramTheTOLProject: 'https://t.me/+amLdTd-EoHw1MWRk',
  localStorageMDN:
    'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'
}

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

export const sectionInfo: Record<Section, sectionInfoElement> = {
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
    minutes: 65,
    coeff: 2.6
  },
  com: {
    name: 'Comprensione verbale',
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

export const DSATimeModifier = 1.3

export const testTotalScore = 100
/** Minimum score to pass the test */
export const standardTestPassThreshold = 30
/** Minimun score to pass the test on the fourth year of high school */
export const earlyTestPassThreshold = 75
/** Minimum number of correct questions to pass the test */
export const tengPassThreshold = 24
/** How to weight answer when calculating the section score */
export const correctionWeight = {
  correct: 1,
  wrong: -0.25,
  notGiven: 0
}

export function getSectionName(key: Section) {
  return sectionInfo[key].name
}

export function getNextSection(currentSection: Section): Section | undefined {
  const sortedInfo = Object.entries(sectionInfo).sort(
    (a, b) => a[1].order - b[1].order
  ) as [Section, sectionInfoElement][]
  const i = sortedInfo.findIndex((e) => e[0] == currentSection)
  return (sortedInfo[i + 1] || [])[0]
}

export const MemberRole = {
  ProjectLeader: 'PROJECT_LEADER',
  Author: 'AUTHOR',
  Dev: 'DEVELOPER',
  AdHoc: 'AD_HOC'
} as const

export type MemberRoleKeys = (typeof MemberRole)[keyof typeof MemberRole]

interface Member {
  name: string
  tg: string
  roles: MemberRoleKeys[]
  prefix?: string
}

export const members: Member[] = [
  {
    name: 'Gabriele Zanini',
    tg: 'zagbc',
    roles: [MemberRole.ProjectLeader]
  },
  {
    name: 'Federico Grandi',
    tg: 'federico_grandi',
    roles: [MemberRole.Author, MemberRole.Dev]
  },
  {
    name: 'Ilaria Corcelli',
    tg: 'iilaria01',
    roles: [MemberRole.Author]
  },
  {
    name: 'Matteo Salicandro',
    tg: 'Mattysal',
    roles: [MemberRole.Author]
  },
  {
    name: 'Nicolas Facchin',
    tg: 'Noka_la_Foka',
    roles: [MemberRole.Author]
  },
  {
    name: 'Elia Maggioni',
    tg: 'maggelia',
    roles: [MemberRole.AdHoc]
  },
  {
    name: 'Diego Aldarese',
    tg: 'diegoaldarese',
    roles: [MemberRole.AdHoc]
  },
  {
    name: 'Tommaso Morganti',
    tg: 'toto04_1',
    roles: [MemberRole.Dev]
  },
  {
    name: 'Giovanni Menicucci',
    tg: 'giova1211',
    roles: [MemberRole.Author]
  },
  {
    name: 'Nadia Scappini',
    tg: 'nscapp',
    prefix: 'Prof.ssa',
    roles: [MemberRole.Author]
  },
  {
    name: '@spyarect',
    tg: 'spyarect',
    roles: [MemberRole.AdHoc]
  },
  {
    name: 'Clelia Di Leo',
    tg: 'cloelia',
    prefix: 'Prof.ssa',
    roles: [MemberRole.Author]
  },
  {
    name: 'Raif Muhammad',
    tg: 'Raif9',
    roles: [MemberRole.AdHoc]
  },
  {
    name: 'Lorenzo Corallo',
    tg: 'lorenzocorallo',
    roles: [MemberRole.Dev]
  }
]

export const STORAGE = {
  DSA: 'tol_is_dsa',
  LANG: 'tol_i18n_lng',
  LAST_CHANGE: 'tol_last_change'
} as const

export enum DATABASE_REF {
  STABLE = 'stable',
  MAIN = 'main'
}

export type View = 'INFO-start' | 'TOL-testing' | 'TOL-secRecap' | 'TOL-end'
