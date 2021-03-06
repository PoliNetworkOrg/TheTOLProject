import axios from 'axios'
import fromEntries from 'fromentries'
import _ from 'underscore'
import packageJson from '../../package.json'
import { sectionInfo } from './constants'

export const sheetDict = {
  quesiti_ING: 'ing',
  quesiti_MAT: 'mat',
  quesiti_COM: 'com',
  quesiti_FIS: 'fis'
} as const
export type section = typeof sheetDict[keyof typeof sheetDict]

export type answerLetter = 'a' | 'b' | 'c' | 'd' | 'e'

export interface Question {
  id: string
  text: string
  answers: Record<answerLetter, string>
  correct: answerLetter
  attachments: string[]
  validated: boolean

  // These are only present for COM questions
  sub?: string
  track?: string
}

export type QuestionsData = Record<section, Question[]>

export interface Database extends QuestionsData {
  meta: {
    version: string
  }
}

export async function readDatabase(ref = 'stable') {
  const db = (
    await axios.get(
      `https://raw.githubusercontent.com/PoliNetworkOrg/TheTOLProjectData/${ref}/database.json`
    )
  )?.data as Database

  if (db?.meta?.version != packageJson.version)
    throw new Error(
      `Database version doesn't match application.\nDatabase: ${db?.meta?.version}\nApp: ${packageJson.version}`
    )

  return db
}

export function selectRandomQuestions(db: Database): QuestionsData {
  return fromEntries(
    // Manipulate db entries
    (Object.entries(db) as [section /* or "meta" */, Question[]][])
      // Select only entries associated with a section <=> exclude "meta"
      .filter(([key]) => (Object.values(sheetDict) as string[]).includes(key))
      .map(([key, questions]) => {
        // Select only validated questions
        const validQuestions = questions.filter((q) => q.validated)

        // Get the question ids, remove duplicates, shuffle them, and select the appropriate number of questions.
        const resIds = _.shuffle(_.uniq(validQuestions.map((v) => v.id))).slice(
          0,
          sectionInfo[key].sample
        )

        // Return only the questions with a selected ID
        return [
          key,
          _.shuffle(validQuestions.filter((q) => resIds.includes(q.id)))
        ]
      })
  ) as QuestionsData
}

export function getImageURL(fileName: string, ref = 'stable') {
  return `https://raw.githubusercontent.com/PoliNetworkOrg/TheTOLProjectData/${ref}/img/${fileName}`
}
