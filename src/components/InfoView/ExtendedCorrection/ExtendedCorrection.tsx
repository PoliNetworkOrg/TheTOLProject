import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Question, QuestionsData, section } from '../../../utils/database'
import { AnswersData } from '../../App'
import { sectionInfo } from '../../../utils/constants'
import { createStyle } from '../../../utils/style'
import RenderedText from '../../Util/RenderedText'
import GeneralPurposeCollapsible from '../../Util/GeneralPurposeCollapsible'
import Button from '../../Util/Button'

const docStyle = createStyle()

interface ExtendedCorrectionProps {
  answers: AnswersData
  questions: QuestionsData
}

export default function ExtendedCorrection(props: ExtendedCorrectionProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>()

  return (
    <GeneralPurposeCollapsible label="Correzione estesa">
      <div style={docStyle}>
        <ReactToPrint
          content={() => ref.current}
          trigger={() => <Button label="Stampa/salva" />}
        />
        <div ref={ref}>
          {(Object.entries(props.questions) as [section, Question[]][])
            .sort((a, b) => sectionInfo[a[0]].order - sectionInfo[b[0]].order)
            .map(([section, values]) => (
              <div key={section}>
                <b>{sectionInfo[section].name}</b>
                <ol>
                  {values.map((question) => (
                    <div key={question.id}>
                      <li>
                        <RenderedText
                          text={`
                        ${question.text} [${question.id}${
                            question.sub ? '-' + question.sub : ''
                          }]
                        `.trim()}
                        />{' '}
                        {props.answers[section].find(
                          (a) => a?.id == question.id && a?.sub == question.sub
                        )?.letter == question.correct
                          ? 'GIUSTA'
                          : 'SBAGLIATA'}
                      </li>
                    </div>
                  ))}
                </ol>
              </div>
            ))}{' '}
        </div>
      </div>
    </GeneralPurposeCollapsible>
  )
}
