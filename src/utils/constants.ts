import { category } from './database'

export const categoryDict: Record<category, string> = {
  ing: 'Inglese',
  mat: 'Matematica',
  com: 'Comprensione',
  fis: 'Fisica'
}

const sectionOrder: category[] = ['ing', 'mat', 'com', 'fis']
export function getNextSection(currentSection: category) {
  const i = sectionOrder.findIndex((e) => e == currentSection)
  return sectionOrder[i + 1]
}
