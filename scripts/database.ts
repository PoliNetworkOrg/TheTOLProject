import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet
} from 'google-spreadsheet'
import { sheetDict, Database, QuestionsData } from '../src/utils/database'

dotenv.config()

interface QuestionSheet extends GoogleSpreadsheetWorksheet {
  title: keyof typeof sheetDict
}

generateJSON().catch(console.error)

async function generateJSON() {
  const sheets = await getParsedSheets(),
    db: Database = {
      meta: {
        version: process.env.npm_package_version || '???',
        lastUpdate: new Date().toISOString()
      },
      ...sheets
    }

  fs.writeFileSync(
    path.join(__dirname, '..', 'temp/database.json'),
    JSON.stringify(db, null, 2)
  )
}

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
    sheetTitles = Object.keys(sheetDict)

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

    res[sheetDict[sheet.title]] = rows.map((r) => ({
      id: r.ID,
      sub: r.sub,
      track: r.brano,
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
        .filter((e) => !!e)
        .map((s) => s.replace(/\d+: /g, '')),
      validated: (r.validato as string | undefined)?.toLowerCase() == 'sì'
    }))

    res['com'] = res['com']?.map((q, _, arr) => {
      if (!q.track) {
        const sameTrack = arr.filter((e) => e.id == q.id && e.track)

        if (sameTrack.length > 1)
          throw new Error(
            `Issue with COM question: there are ${sameTrack.length} complete questions with ID ${q.id}.`
          )

        return {
          ...q,
          track: (sameTrack[0] || q).track
        }
      } else return q
    })
  }

  return res as QuestionsData
}
