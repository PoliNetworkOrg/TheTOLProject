import React from 'react'
import { getSectionName } from '../../utils/constants'
import { section, QuestionsData } from '../../utils/database'
import { createStyle } from '../../utils/style'
import { AnswersData } from '../App'
import Button from '../Util/Button'

const outerDiv = createStyle({
  display: 'flex',
  justifyContent: 'space-between'
})

const innerDiv = createStyle({
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  gap: '15px',
  fontSize: '11pt'
})

interface TopControlsProps {
  active: boolean
  answers: AnswersData
  closeSection: () => void
  currentSection: section
  questions: QuestionsData
}

export default function TopControls(props: TopControlsProps) {
  const { currentSection } = props

  return (
    <div style={outerDiv}>
      <div style={innerDiv}>
        <div>
          <p>
            Sezione: <b>{getSectionName(currentSection)}</b> <br />
            Riposte: {props.answers[currentSection].length} /{' '}
            {props.questions[currentSection].length} (
            {props.answers[currentSection].reduce(
              (acc, curr) => acc + (curr.flagged ? 1 : 0),
              0
            )}{' '}
            da rivedere)
          </p>
        </div>
        {props.active && (
          <Button label="Chiudi sezione" onClick={props.closeSection} />
        )}
      </div>
      <p>Placeholder: timer</p>
    </div>
  )
}
