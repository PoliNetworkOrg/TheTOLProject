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
import firefoxImg2En from '../../static/firefox_2_en.png'
import firefoxImg3En from '../../static/firefox_3_en.png'
import Question from '../Util/Question'
import { Trans, useTranslation } from 'react-i18next'

const IMG_WIDTH = 320
const styles = StyleSheet.create({
  collapsible: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    gap: '10px'
  },
  printDoc: {
    maxWidth: '210mm',
    margin: '0 auto'
  },
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
  ul: {
    listStyleType: 'none'
  },
  ol: {
    paddingLeft: 20,
    maxWidth: IMG_WIDTH,
    margin: '0 auto',
    textAlign: 'left',
    gap: 10
  },
  img: {
    marginTop: 5,
    marginBottom: 10,
    maxWidth: IMG_WIDTH,
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
            trigger={() => <Button label={t('results.btn.save')} />}
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
      <div className="print-only" ref={ref} style={styles.printDoc}>
        <div style={docStyles.firstPage}>
          <DocumentHeader />
          <p style={styles.centered}>
            <Trans i18n={i18n} values={{ date: date.date, time: date.time }}>
              results.pdf.title
            </Trans>
          </p>
          {resultTable}
          <p>
            <Trans
              i18n={i18n}
              components={{
                tg: (
                  <a
                    href={links.telegramPreparazioneTOL}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={styles.link}
                  />
                )
              }}
            >
              results.pdf.info.1
            </Trans>
          </p>
          <p>{t('results.pdf.info.2')}</p>
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
  const { t, i18n } = useTranslation()
  return (
    <div className="do-not-print">
      <h3>{t('results.save.title')}</h3>
      <p>{t('results.save.firefox.body.1')}</p>
      <p>{t('results.save.firefox.body.2')}</p>
      <ol style={styles.ol}>
        <li>{t('results.save.firefox.li.1')}</li>
        <img src={firefoxImg1} style={styles.img} />

        <li>{t('results.save.firefox.li.2')}</li>
        <img
          src={i18n.language.startsWith('en') ? firefoxImg2En : firefoxImg2}
          style={styles.img}
        />

        <li>{t('results.save.firefox.li.3')}</li>
        <img
          src={i18n.language.startsWith('en') ? firefoxImg3En : firefoxImg3}
          style={styles.img}
        />
      </ol>
    </div>
  )
}

function FallbackInstructions() {
  const { t, i18n } = useTranslation()
  return (
    <div className="do-not-print">
      <h3>{t('results.save.title')}</h3>
      <p>{t('results.save.fallback.1')}</p>
      <p>{t('results.save.fallback.2')}</p>
      <p>
        <Trans
          i18n={i18n}
          components={{
            issue: (
              <a
                href="https://github.com/PoliNetworkOrg/TheTOLProject/issues/35"
                rel="noreferrer noopener"
                target="_blank"
              />
            )
          }}
        >
          results.save.fallback.3
        </Trans>
      </p>
    </div>
  )
}
