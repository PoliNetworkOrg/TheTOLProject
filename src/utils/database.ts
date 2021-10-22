import axios from 'axios'
import _ from 'underscore'
import packageJson from '../../package.json'

export const categoryDict = {
  quesiti_ING: 'ing',
  quesiti_MAT: 'mat',
  quesiti_COM: 'com',
  quesiti_FIS: 'fis'
} as const
export type category = typeof categoryDict[keyof typeof categoryDict]

type answerLetter = 'a' | 'b' | 'c' | 'd' | 'e'

export interface Question {
  id: string
  text: string
  answers: Record<answerLetter, string>
  correct: answerLetter
  attachments: string[]
  validated: boolean
}

export type QuestionsData = Record<category, Question[]>

export interface Database extends QuestionsData {
  meta: {
    version: string
    lastUpdate: string
  }
}

export async function readDatabase() {
  const db = (
    await axios.get(
      'https://raw.githubusercontent.com/PoliNetworkOrg/TheTOLProject/data/database.json'
    )
  )?.data as Database

  if (db?.meta?.version != packageJson.version)
    throw new Error(
      `Database version doesn't match application.\nDatabase: ${db?.meta?.version}\nApp: ${packageJson.version}`
    )

  return db
}

export function selectRandomQuestions(
  db: Database,
  options: Record<category, number>
): QuestionsData {
  return Object.fromEntries(
    // Manipulate db entries
    (Object.entries(db) as [category /* or "meta" */, Question[]][])
      // Select only entries associated with a category <=> exclude "meta"
      .filter(([key]) =>
        (Object.values(categoryDict) as string[]).includes(key)
      )
      .map(([key, questions]) => {
        // Select only validated questions
        const validQuestions = questions.filter((q) => q.validated)

        // Get the question ids, remove duplicates, shuffle them, and select the appropriate number of questions.
        const resIds = _.shuffle(_.uniq(validQuestions.map((v) => v.id))).slice(
          0,
          options[key] as number
        )

        // Return only the questions with a selected ID
        return [key, validQuestions.filter((q) => resIds.includes(q.id))]
      })
  ) as QuestionsData
}
