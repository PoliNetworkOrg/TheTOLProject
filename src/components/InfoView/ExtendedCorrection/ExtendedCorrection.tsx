import React, { ReactNode, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Question, QuestionsData, section } from '../../../utils/database'
import { AnswersData } from '../../App'
import { sectionInfo } from '../../../utils/constants'
import { StyleSheet } from '../../../utils/style'
import RenderedText from '../../Util/RenderedText'
import GeneralPurposeCollapsible from '../../Util/GeneralPurposeCollapsible'
import Button from '../../Util/Button'
import './ExtendedCorrection.css'

const styles = StyleSheet.create({
  collapsible: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    gap: '10px'
  },
  doc: {},
  printButton: {
    display: 'flex',
    justifyContent: 'center'
  }
})

interface ExtendedCorrectionProps {
  answers: AnswersData
  questions: QuestionsData
  resultTable: ReactNode
}

export default function ExtendedCorrection(props: ExtendedCorrectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>()

  return (
    <GeneralPurposeCollapsible label="Correzione estesa" startOpen={false}>
      <div style={styles.collapsible}>
        <ReactToPrint
          documentTitle={`TheTOLProject ${new Date().toLocaleString()}`}
          content={() => ref.current}
          trigger={() => (
            <div style={styles.printButton}>
              <Button label="Stampa/salva correzione" />
            </div>
          )}
        />
        <div ref={ref} style={styles.doc}>
          <div>
            {(Object.entries(props.questions) as [section, Question[]][])
              .sort((a, b) => sectionInfo[a[0]].order - sectionInfo[b[0]].order)
              .map(([section, values]) => (
                <div key={section}>
                  <div className="page-break" />
                  <div>
                    <b>{sectionInfo[section].name}</b>
                    <ol>
                      {values.map((question) => (
                        <div key={question.id + (question.sub || 0)}>
                          <li>
                            <RenderedText
                              text={`
                            ${question.text} [${question.id}${
                                question.sub ? '-' + question.sub : ''
                              }]
                            `.trim()}
                            />{' '}
                            <u>
                              {(() => {
                                const letter = props.answers[section].find(
                                  (a) =>
                                    a?.id == question.id &&
                                    a?.sub == question.sub
                                )?.letter

                                return letter
                                  ? letter == question.correct
                                    ? 'Esatta'
                                    : 'Errata'
                                  : 'Senza risposta'
                              })()}
                            </u>
                          </li>
                        </div>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}{' '}
            <div className="page-break" />
            <div>
              {props.resultTable}
              <br />
              Hai delle domande sui quesiti e la loro risoluzione? Falle sul{' '}
              <a
                href="https://t.me/joinchat/_zugEikozmcyMzA0"
                target="_blank"
                rel="noreferrer noopener"
              >
                Gruppo preparazione TOL di PoliNetwork
              </a>
              !
              <br />
              Per fare riferimento alla domanda manda, assieme al testo, anche
              l'ID (il numero che trovi fra [] dopo il testo).
            </div>
          </div>
        </div>
      </div>
    </GeneralPurposeCollapsible>
  )
}
