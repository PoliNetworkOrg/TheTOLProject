import React from 'react'
import { QuestionsData } from '../../utils/database'
import { createStyle } from '../../utils/style'
import { statePair } from '../../utils/types'
import { Answer } from '../App'

const containerStyle = createStyle({
  display: 'flex',
  justifyContent: 'space-between'
})

const leftContainer = createStyle({
  display: 'flex'
})

const pStyle = createStyle({
  flexGrow: 1,
  flexShrink: 1,
  textAlign: 'center',
  fontSize: '11pt',
  minWidth: '4em',
  padding: '7.5px'
})

interface QuestionHeaderProps {
  questionIndexState: statePair<number>
  questions: QuestionsData
  currentAnswer: Answer
}
export default function QuestionHeader(props: QuestionHeaderProps) {
  const [qIndex, setQIndex] = props.questionIndexState

  return (
    <div style={containerStyle}>
      <div style={leftContainer}>
        <p style={{ ...pStyle, fontWeight: 'bold' }}>Domanda {qIndex + 1}</p>
        <p style={pStyle}>
          {(props.currentAnswer?.letter?.toUpperCase() || '') +
            (props.currentAnswer?.flagged ? '?' : '') || ' '}
        </p>
        <p style={pStyle}>
          Risposta {props.currentAnswer?.letter ? '' : 'non '}data
        </p>
      </div>
    </div>
  )
}
