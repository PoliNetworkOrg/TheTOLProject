/* eslint-disable react/prop-types */
import { createRef, forwardRef, ReactNode, useEffect } from 'react'
import ReactToPrint from 'react-to-print'
import { Question, QuestionsData, section } from '../../../utils/database'
import { AnswersData } from '../../App'
import { links, sectionInfo } from '../../../utils/constants'
import { StyleSheet, theme } from '../../../utils/style'
import RenderedText from '../../Util/RenderedText'
import Button from '../../Util/Button'
import './ExtendedCorrection.css'
import DocumentHeader from './DocumentHeader'
import firefoxImg1 from '../../../static/firefox_1.png'
import firefoxImg2 from '../../../static/firefox_2.png'
import firefoxImg3 from '../../../static/firefox_3.png'

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

interface ExtendedCorrectionProps {
  answers: AnswersData
  questions: QuestionsData
  resultTable: ReactNode
}

export default function ExtendedCorrection(props: ExtendedCorrectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = createRef<HTMLDivElement>()
  const printSupported = 'print' in window

  const getTitle = () =>
    `The TOL Project ${new Date()
      .toLocaleString()
      .replace(/\/|:/g, '-')
      .replace(/,/g, '')}`

  useEffect(() => {
    if (!printSupported) {
      document.title = getTitle()
    }
  }, [])

  return (
    <div style={styles.collapsible}>
      {printSupported ? (
        <div style={styles.printButton} className="do-not-print">
          <ReactToPrint
            documentTitle={getTitle()}
            content={() => ref.current}
            trigger={() => <Button label="Salva risultati della simulazione" />}
            onAfterPrint={() => {
              // remove the onbeforeunload listener since results are saved
              window.onbeforeunload = null
            }}
          />
        </div>
      ) : (
        <FirefoxInstructions />
      )}
      <PrintDocument
        ref={ref}
        resultTable={props.resultTable}
        questions={props.questions}
        answers={props.answers}
      />
    </div>
  )
}

const PrintDocument = forwardRef<HTMLDivElement, ExtendedCorrectionProps>(
  (props, ref) => {
    const { resultTable, questions, answers } = props
    return (
      <div className="print-only" ref={ref} style={styles.doc}>
        <div>
          <div>
            <DocumentHeader />
            <p style={styles.centered}>
              Simulazione del {new Date().toLocaleString()}
            </p>
            {resultTable}
          </div>
          <br />
          Hai delle domande sui quesiti e la loro risoluzione? Falle sul{' '}
          <a
            href={links.telegramPreparazioneTOL}
            target="_blank"
            rel="noreferrer noopener"
            style={styles.link}
          >
            Gruppo preparazione TOL
          </a>{' '}
          di PoliNetwork!
          <br />
          <br />
          <br />
          <span>
            Nelle pagine successive troverai, suddivisi per sezione, i quesiti
            che ti sono stati proposti con il relativo esito.
          </span>
        </div>
        {(Object.entries(questions) as [section, Question[]][])
          .sort((a, b) => sectionInfo[a[0]].order - sectionInfo[b[0]].order)
          .map(([section, values]) => (
            <>
              <div className="page-break" />
              <div key={section}>
                <div>
                  <b>{sectionInfo[section].name}</b>
                  <ol>
                    {values.map((question) => {
                      const letter = answers[section].find(
                          (a) => a?.id == question.id && a?.sub == question.sub
                        )?.letter,
                        result = letter
                          ? letter == question.correct
                            ? 'Esatta'
                            : 'Errata'
                          : 'Senza risposta'

                      return (
                        <div key={question.id + (question.sub || 0)}>
                          <li style={styles.li}>
                            <RenderedText
                              text={`
                            ${question.text} 
                            `.trim()}
                            />
                            &emsp;
                            <u style={styles.nowrap}>{result}</u>{' '}
                            <ul style={styles.ul}>
                              {result == 'Errata' && letter && (
                                <li>
                                  <RenderedText
                                    text={`R. data: ${question.answers[letter]}`}
                                  />
                                </li>
                              )}
                              {result != 'Esatta' && (
                                <li>
                                  <RenderedText
                                    text={`R. esatta: ${
                                      question.answers[question.correct]
                                    }`}
                                  />
                                </li>
                              )}
                            </ul>
                          </li>
                        </div>
                      )
                    })}
                  </ol>
                </div>
              </div>
            </>
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
