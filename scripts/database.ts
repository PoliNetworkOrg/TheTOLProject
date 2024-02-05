/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import fromEntries from 'fromentries'
import { google } from 'googleapis'
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet
} from 'google-spreadsheet'
import { sheetDict, Database, QuestionsData, Question } from '../src/utils/database'

dotenv.config()

interface QuestionSheet extends GoogleSpreadsheetWorksheet {
  title: keyof typeof sheetDict
}

async function generateJSON() {
  const rootPath = path.join(__dirname, '..', 'temp'),
    dbPath = path.join(rootPath, 'database.json'),
    imgFolderPath = path.join(rootPath, 'img')

  const drive = new DriveClient()

  let sheets = await getParsedSheets()

  sheets = fromEntries(
    // @ts-expect-error Trust me, it's the right type
    await Promise.all(
      Object.entries(sheets).map(async ([section, questions]) => [
        section,
        await Promise.all(
          questions.map(async ({ attachments, ...q }) => ({
            ...q,
            attachments:
              attachments && attachments.length
                ? await Promise.all(
                    attachments.map((a) => drive.downloadFile(a, imgFolderPath))
                  )
                : undefined
          }))
        )
      ])
    )
  ) as QuestionsData

  const db: Database = {
    meta: {
      version: process.env.npm_package_version || '???'
    },
    ...sheets
  }

  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
}

// #region Sheets
/** Reads the spreadsheet and checks the existing sheets. */
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

/** Reads the spreadsheet and parses the data into a database-like format. */
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
      'immaginiQuesito',
    ]

    const rows = await sheet.getRows()

    if (
      rows.some((r) => requiredHeaders.some((h) => !Object.keys(r).includes(h)))
    )
      throw new Error(
        `Invalid database structure: check structure of the ${sheet.title} sheet.`
      )

    res[sheetDict[sheet.title]] = rows.map((r) => {
      const row: Question = {
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
        correct: r.rispostaCorretta?.toLowerCase(),
        attachments:
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          DriveClient.matchFileIds(r.immaginiQuesito || '') || undefined,
        validated: (r.validato as string | undefined)?.toLowerCase() == 'sì'
      }
      return row
    })

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
// #endregion

// #region Drive
/** Utility class containign everything that's Drive-related. */
class DriveClient {
  /** JWT client that handles the authentication with the Google API. */
  auth
  /** Google API's Drive client. */
  drive

  constructor() {
    const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env
    const SCOPES = [
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/drive.metadata.readonly'
    ]

    this.auth = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: GOOGLE_PRIVATE_KEY,
      scopes: SCOPES
    })

    this.drive = google.drive({ version: 'v3', auth: this.auth })

    return this
  }

  /** Matches ALL file ids from Google Drive URLs in the given string. */
  static matchFileIds(string: string) {
    return string.match(/[-\w]{25,}(?!.*[-\w]{25,})/g) || []
  }

  /**
   * Gets a file from the API.
   * @param fileId The ID of the file, which can be found by parsing the Google Drive URL using {@link DriveClient.matchFileIds}.
   * @returns The file's {@link fs.WriteStream} and its extension.
   */
  async getFile(fileId: string): Promise<[fs.WriteStream, string | undefined]> {
    const stream = (
      await this.drive.files.get(
        {
          fileId,
          alt: 'media'
        },
        { responseType: 'stream' }
      )
    ).data as fs.WriteStream
    const extension = (
      await this.drive.files.get({ fileId, fields: 'fullFileExtension' })
    ).data.fullFileExtension

    return [stream, extension]
  }

  /**
   * Gets a file from the API and writes its contents.
   * @param fileId The ID of the file, which can be found by parsing the Google Drive URL using {@link DriveClient.matchFileIds}.
   * @returns The resulting file name
   */
  async downloadFile(fileId: string, folderPath: string): Promise<string> {
    const [stream, extension] = await this.getFile(fileId),
      fileName = `${fileId}.${extension}`,
      dest = fs.createWriteStream(path.join(folderPath, fileName))

    return new Promise((res, rej) => {
      stream.on('error', rej)
      stream.on('end', () => res(fileName))
      stream.pipe(dest)
    })
  }
}
// #endregion

generateJSON().catch(console.error)
