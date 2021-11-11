import React from 'react'
import { Question } from '../../utils/database'
import { createStyle, theme } from '../../utils/style'
import { Answer } from '../App'
import { FcLeft, FcRight } from 'react-icons/fc'
import Button from '../Util/Button'

const containerStyle = createStyle({
  display: 'flex',
  justifyContent: 'space-between'
})

const leftContainer = createStyle({
  display: 'flex'
})

const rightContainer = createStyle({
  display: 'flex',
  padding: '1em',
  gap: '5px'
})

const pStyle = createStyle({
  flexGrow: 1,
  flexShrink: 1,
  textAlign: 'left',
  fontSize: '11pt',
  minWidth: '4em',
  padding: '7.5px'
})

const questionStyle = createStyle(pStyle, {
  fontWeight: 'bold',
  width: '11em'
})

const iconStyle = createStyle({
  height: '17,5px',
  width: '17,5px'
})

interface QuestionHeaderProps {
  currentAnswer: Answer
  questionIndex: number
  sectionQuestions: Question[]
  shiftQuestionIndex: (offset: number) => void
}
export default function QuestionHeader(props: QuestionHeaderProps) {
  return (
    <div style={containerStyle}>
      <div style={leftContainer}>
        <p style={questionStyle}>Domanda {props.questionIndex + 1}</p>
        <p
          style={{
            ...pStyle,
            backgroundColor: props.currentAnswer?.flagged
              ? theme.questionYellow
              : props.currentAnswer?.letter
              ? theme.questionGreen
              : 'inherit'
          }}
        >
          {(props.currentAnswer?.letter?.toUpperCase() || '') +
            (props.currentAnswer?.flagged ? '?' : '') || ' '}
        </p>
        <p style={pStyle}>
          Risposta {props.currentAnswer?.letter ? '' : 'non '}data
        </p>
      </div>
      <div style={rightContainer}>
        <Button
          label="precedente"
          onClick={() => props.shiftQuestionIndex(-1)}
          leftIcon={() => <FcLeft style={iconStyle} />}
        />
        <Button
          label="successiva"
          onClick={() => props.shiftQuestionIndex(1)}
          rightIcon={() => <FcRight style={iconStyle} />}
        />
      </div>
    </div>
  )
}
