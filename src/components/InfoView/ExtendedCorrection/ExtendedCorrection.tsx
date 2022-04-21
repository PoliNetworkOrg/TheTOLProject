import React, { ReactNode, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Question, QuestionsData, section } from '../../../utils/database'
import { AnswersData } from '../../App'
import { links, sectionInfo } from '../../../utils/constants'
import { StyleSheet, theme } from '../../../utils/style'
import RenderedText from '../../Util/RenderedText'
import Button from '../../Util/Button'
import './ExtendedCorrection.css'
import DocumentHeader from './DocumentHeader'

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
  nowrap: { whiteSpace: 'nowrap' }
})

interface ExtendedCorrectionProps {
  answers: AnswersData
  questions: QuestionsData
  resultTable: ReactNode
  visible?: boolean
}

export default function ExtendedCorrection(props: ExtendedCorrectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(),
    date = new Date()

  return (
    <div style={styles.collapsible}>
      <div style={styles.printButton}>
        <ReactToPrint
          documentTitle={`The TOL Project ${date
            .toLocaleString()
            .replace(/\/|:/g, '-')
            .replace(/,/g, '')}`}
          content={() => ref.current}
          trigger={() => <Button label="Salva risultati della simulazione" />}
        />
      </div>
      <div
        {...(props.visible ? {} : { className: 'print-only' })}
        ref={ref}
        style={styles.doc}
      >
        <div>
          <div className="print-only">
            <DocumentHeader />
            <p style={styles.centered}>
              Simulazione del {date.toLocaleString()}
            </p>
            {props.resultTable}
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
          <span className="print-only">
            Nelle pagine successive troverai, suddivisi per sezione, i quesiti
            che ti sono stati proposti con il relativo esito.
          </span>
        </div>
        {(Object.entries(props.questions) as [section, Question[]][])
          .sort((a, b) => sectionInfo[a[0]].order - sectionInfo[b[0]].order)
          .map(([section, values]) => (
            <>
              <div className="page-break" />
              <div key={section}>
                <div>
                  <b>{sectionInfo[section].name}</b>
                  <ol>
                    {values.map((question) => {
                      const letter = props.answers[section].find(
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
    </div>
  )
}
