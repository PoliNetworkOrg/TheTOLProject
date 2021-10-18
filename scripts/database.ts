import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet
} from 'google-spreadsheet'

dotenv.config()

const categoryDict = {
  quesiti_ING: 'ing',
  quesiti_MAT: 'mat',
  quesiti_COM: 'com',
  quesiti_FIS: 'fis'
} as const
type category = typeof categoryDict[keyof typeof categoryDict]

interface QuestionSheet extends GoogleSpreadsheetWorksheet {
  title: keyof typeof categoryDict
}

type answerLetter = 'a' | 'b' | 'c' | 'd' | 'e'

interface Question {
  id: string
  text: string
  answers: Record<answerLetter, string>
  correct: answerLetter
  attachments: string[]
}

type QuestionsData = Record<category, Question[]>

async function readSpreadsheet() {
  const {
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY,
    GOOGLE_DATABASE_SHEET_ID
  } = process.env

  if (!GOOGLE_SERVICE_ACCOUNT_EMAIL)
    throw new Error('Google service account email missing')
  if (!GOOGLE_PRIVATE_KEY) throw new Error('Google private key missing')
  if (!GOOGLE_DATABASE_SHEET_ID)
    throw new Error('Google database sheet id missing')

  const doc = new GoogleSpreadsheet(GOOGLE_DATABASE_SHEET_ID),
    sheetTitles = Object.keys(categoryDict)

  await doc.useServiceAccountAuth({
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: GOOGLE_PRIVATE_KEY
  })

  await doc.loadInfo()

  const questionSheets = Object.entries(doc.sheetsByTitle)
    .filter(([name]) => sheetTitles.includes(name))
    .map((e) => e[1])

  if (questionSheets.length < 4)
    throw new Error(
      `${
        4 - questionSheets.length
      } question sheet missing.\nCurrent sheets: ${questionSheets
        .map((s) => s.title)
        .join(', ')}`
    )

  return questionSheets as QuestionSheet[]
}

async function getParsedSheets() {
  const rawSheets = await readSpreadsheet(),
    res: Partial<QuestionsData> = {}

  for (const sheet of rawSheets) {
    const requiredHeaders = [
      'ID',
      'quesito',
      'rispostaA',
      'rispostaB',
      'rispostaC',
      'rispostaD',
      'rispostaE',
      'rispostaCorretta',
      'immaginiQuesito'
    ]

    const rows = await sheet.getRows()

    if (
      rows.some((r) => requiredHeaders.some((h) => !Object.keys(r).includes(h)))
    )
      throw new Error(
        `Invalid database structure: check structure of the ${sheet.title} sheet.`
      )

    res[categoryDict[sheet.title]] = rows
      .filter((r) => r.validato == 'Sì')
      .map((r) => ({
        id: r.ID,
        text: r.quesito,
        answers: {
          a: r.rispostaA,
          b: r.rispostaB,
          c: r.rispostaC,
          d: r.rispostaD,
          e: r.rispostaE
        },
        correct: r.rispostaCorretta,
        attachments: ((r.immaginiQuesito as string) || '')
          .split('\n')
          .map((s) => s.replace(/\d+: /g, ''))
      }))

    res['com']?.map((q) => {
      if (!q.text) {
        const sameText = (res['com'] || []).filter(
          (e) => e.id == q.id && e.text
        )

        if (sameText.length != 1)
          throw new Error(
            `Issue with COM question: there are ${sameText.length} complete questions with ID ${q.id}.`
          )

        return {
          ...q,
          text: sameText[0].text
        }
      } else return q
    })
  }

  return res as QuestionsData
}

async function generateJSON() {
  const db = await getParsedSheets()

  fs.writeFileSync(
    path.join(__dirname, '..', 'temp/database.json'),
    JSON.stringify(db, null, 2)
  )
}

generateJSON().catch(console.error)
