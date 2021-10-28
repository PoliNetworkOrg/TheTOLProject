import React from 'react'
import { sectionInfo } from '../../utils/constants'
import { QuestionsData, section } from '../../utils/database'
import { createStyle } from '../../utils/style'
import { AnswersData } from '../App'
import Button from '../Util/Button'

const baseStyle = createStyle({
  display: 'flex',
  paddingTop: '10px',
  paddingBottom: '20px',
  alignItems: 'center',
  flexDirection: 'column'
})

interface SectionRecapProps {
  goToNextSection: () => void
  section: section
  sectionAnswers: AnswersData[section]
  sectionQuestions: QuestionsData[section]
  secondsUsed: number
}
export default function SectionRecap(props: SectionRecapProps) {
  const info = sectionInfo[props.section]

  return (
    <div style={baseStyle}>
      <p>
        Sezione conclusa: {info.name}
        <br />-{' '}
        {props.sectionAnswers.reduce(
          (acc, curr) => (curr.letter ? acc + 1 : acc),
          0
        )}{' '}
        / {props.sectionQuestions.length} risposte date
        <br />- Tempo utilizzato:{' '}
        {Math.floor(props.secondsUsed / 60).toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}
        :
        {(props.secondsUsed % 60).toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}{' '}
        / {info.minutes}:00 (
        {Math.floor(
          (info.minutes * 60 - props.secondsUsed) / 60
        ).toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}
        :
        {((info.minutes * 60 - props.secondsUsed) % 60).toLocaleString(
          undefined,
          {
            minimumIntegerDigits: 2
          }
        )}{' '}
        rimanenti)
      </p>
      <Button label="Prossima sezione" onClick={props.goToNextSection} />
    </div>
  )
}
