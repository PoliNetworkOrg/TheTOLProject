import { createRef, forwardRef, ReactNode, useMemo } from 'react'
import ReactToPrint from 'react-to-print'
import {
  Question as IQuestion,
  QuestionsData,
  Section
} from '../../utils/database'
import { AnswersData } from '../App'
import { links, sectionInfo } from '../../utils/constants'
import { StyleSheet, theme } from '../../utils/style'
import Button from '../Util/Button'
import './ExtendedCorrection.css'
import DocumentHeader from './DocumentHeader'
import firefoxImg1 from '../../static/firefox_1.png'
import firefoxImg2 from '../../static/firefox_2.png'
import firefoxImg3 from '../../static/firefox_3.png'
import Question from '../Util/Question'
import { Trans, useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  collapsible: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    gap: '10px'
  },
  doc: {},
  printButton: {
    display: 'inline-flex',
    alignItems: 'center',
    flexDirection: 'column',
    alignSelf: 'center',
    gap: '5px'
  },
  link: {
    color: theme.primary
  },
  centered: {
    textAlign: 'center'
  },
  li: {
    margin: '10px'
  },
  ul: {
    listStyleType: 'none'
  },
  ol: {
    paddingLeft: 20
  },
  img: {
    marginTop: 5,
    marginBottom: 10,
    maxWidth: 320,
    width: '100%',
    height: 'auto',
    objectFit: 'cover'
  },
  nowrap: { whiteSpace: 'nowrap' }
})

// using 'other' as fallback because
// other browsers may no longer support the api
type Browser = 'FirefoxAndroid' | 'other'

interface ExtendedCorrectionProps {
  answers: AnswersData
  questions: QuestionsData
  resultTable: ReactNode
  onSave: () => void
}

export default function ExtendedCorrection(props: ExtendedCorrectionProps) {
  const ref = createRef<HTMLDivElement>()
  // save date to variable to keep the date
  // when the test was taken
  const resultsDate = new Date()
  const printSupported: boolean = 'print' in window

  let browser: Browser = 'other'
  const userAgent = navigator.userAgent
  if (userAgent.includes('Firefox') && userAgent.includes('Android')) {
    browser = 'FirefoxAndroid'
  }

  const getTitle = (): string =>
    `The TOL Project ${resultsDate
      .toLocaleString()
      .replace(/\/|:/g, '-')
      .replace(/,/g, '')}`

  if (!printSupported) {
    document.title = getTitle()
  }

  const { t } = useTranslation()

  return (
    <div style={styles.collapsible}>
      {printSupported ? (
        <div style={styles.printButton} className="do-not-print">
          <ReactToPrint
            documentTitle={getTitle()}
            content={() => ref.current}
            trigger={() => <Button label={t('results.saveBtn')} />}
            onAfterPrint={props.onSave}
          />
        </div>
      ) : (
        <>
          {browser === 'FirefoxAndroid' && <FirefoxInstructions />}
          {browser === 'other' && <FallbackInstructions />}
        </>
      )}
      <PrintDocument ref={ref} {...props} />
    </div>
  )
}

const docStyles = StyleSheet.create({
  firstPage: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  },
  li: {
    marginBottom: 10
  }
})

const PrintDocument = forwardRef<HTMLDivElement, ExtendedCorrectionProps>(
  (props: ExtendedCorrectionProps, ref) => {
    const { resultTable, questions, answers } = props
    const { t, i18n } = useTranslation()

    const resultsDate = new Date()
    const date = useMemo(
      () => ({
        date: resultsDate.toLocaleDateString(i18n.language),
        time: resultsDate.toLocaleTimeString(i18n.language, {
          timeStyle: 'short'
        })
      }),
      [i18n.language]
    )

    return (
      <div className="print-only" ref={ref} style={styles.doc}>
        <div style={docStyles.firstPage}>
          <DocumentHeader />
          <p style={styles.centered}>
            <Trans i18n={i18n} values={{ date: date.date, time: date.time }}>
              results.pdfTitle
            </Trans>
          </p>
          {resultTable}
          <p>
            {t('results.pdfInfo1')}
            <a
              href={links.telegramPreparazioneTOL}
              target="_blank"
              rel="noreferrer noopener"
              style={styles.link}
            >
              {t('results.tgGroup')}
            </a>
            !
          </p>
          <p>{t('results.pdfInfo2')}</p>
        </div>
        {(Object.entries(questions) as [Section, IQuestion[]][])
          .sort((a, b) => sectionInfo[a[0]].order - sectionInfo[b[0]].order)
          .map(([section, values]) => (
            <div key={section}>
              <b>{sectionInfo[section].name}</b>
              <ol>
                {values.map((q) => {
                  const letter = answers[section].find(
                    (a) => a?.id == q.id && a?.sub == q.sub
                  )?.letter
                  return (
                    <li key={q.id + (q.sub || '')} style={docStyles.li}>
                      <Question q={q} choice={letter} isTest />
                    </li>
                  )
                })}
              </ol>
            </div>
          ))}
      </div>
    )
  }
)
PrintDocument.displayName = 'Document'

function FirefoxInstructions() {
  return (
    <div className="do-not-print">
      <h3>Salva i tuoi risultati</h3>
      <p>Il tuo browser (Firefox Android) non supporta la stampa automatica.</p>
      <p>Per salvare i risultati segui questi passaggi: </p>
      <ol style={styles.ol}>
        <li>Apri il menu di Firefox</li>
        <img src={firefoxImg1} style={styles.img} />

        <li>Premi il tasto per condividere</li>
        <img src={firefoxImg2} style={styles.img} />

        <li>Nel menu che si apre, premi su "Salva come PDF"</li>
        <img src={firefoxImg3} style={styles.img} />
      </ol>
    </div>
  )
}

function FallbackInstructions() {
  return (
    <div className="do-not-print">
      <h3>Salva i tuoi risultati</h3>
      <p>
        Per il tuo browser non è supportata la stampa automatica del PDF con i
        risultati.
      </p>
      <p>
        Puoi provare ad utilizzare la funzione "Sala come PDF" del tuo browser
        che potrebbe essere nel menu di condivisione oppure nel menu principale
        del browser.
      </p>
      <p>
        Ti invitiamo a segnalare il tuo browser{' '}
        <a href="https://github.com/PoliNetworkOrg/TheTOLProject/issues/35">
          qui
        </a>{' '}
        in modo da poter risolvere il problema{' '}
      </p>
    </div>
  )
}
