import React, { ReactNode, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Question, QuestionsData, section } from '../../../utils/database'
import { AnswersData } from '../../App'
import { sectionInfo } from '../../../utils/constants'
import { createStyle, theme } from '../../../utils/style'
import RenderedText from '../../Util/RenderedText'
import GeneralPurposeCollapsible from '../../Util/GeneralPurposeCollapsible'
import Button from '../../Util/Button'
import './ExtendedCorrection.css'
import DocumentHeader from './DocumentHeader'

const collapsibleStyle = createStyle({
  display: 'flex',
  flexDirection: 'column',
  padding: '15px',
  gap: '10px'
})

const docStyle = createStyle()

const printButton = createStyle({
  display: 'flex',
  justifyContent: 'center'
})

const linkStyle = createStyle({
  color: theme.primary
})

const centeredStyle = createStyle({
  textAlign: 'center'
})

const liStyle = createStyle({
  margin: '10px'
})

interface ExtendedCorrectionProps {
  answers: AnswersData
  questions: QuestionsData
  resultTable: ReactNode
}

export default function ExtendedCorrection(props: ExtendedCorrectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(),
    date = new Date()

  return (
    <GeneralPurposeCollapsible label="Correzione estesa" startOpen={false}>
      <div style={collapsibleStyle}>
        <ReactToPrint
          documentTitle={`TheTOLProject ${date
            .toLocaleString()
            .replace(/\/|:/g, '-')
            .replace(/,/g, '')}`}
          content={() => ref.current}
          trigger={() => (
            <div style={printButton}>
              <Button label="Stampa/salva correzione" />
            </div>
          )}
        />
        <div ref={ref} style={docStyle}>
          <div>
            <div className="print-only">
              <DocumentHeader />
              <p style={centeredStyle}>
                Simulazione del {date.toLocaleString()}
              </p>
              {props.resultTable}
            </div>
            <br />
            Hai delle domande sui quesiti e la loro risoluzione? Falle sul{' '}
            <a
              href="https://t.me/joinchat/_zugEikozmcyMzA0"
              target="_blank"
              rel="noreferrer noopener"
              style={linkStyle}
            >
              Gruppo preparazione TOL di PoliNetwork
            </a>
            !
            <br />
            Per fare riferimento alla domanda scrivi, assieme al testo, anche
            l'ID (il numero che trovi fra [] dopo il testo).
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
                      {values.map((question) => (
                        <div key={question.id + (question.sub || 0)}>
                          <li style={liStyle}>
                            <RenderedText
                              text={`
                            ${question.text} 
                            `.trim()}
                            />
                            &emsp;
                            <u style={{ whiteSpace: 'nowrap' }}>
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
                            </u>{' '}
                            [{question.id}
                            {question.sub ? '-' + question.sub : ''}]
                          </li>
                        </div>
                      ))}
                    </ol>
                  </div>
                </div>
              </>
            ))}
        </div>
      </div>
    </GeneralPurposeCollapsible>
  )
}
