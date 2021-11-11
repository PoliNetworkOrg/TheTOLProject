import React from 'react'
import { Question } from '../../utils/database'
import { createStyle, theme } from '../../utils/style'
import { Answer } from '../App'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
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
  textAlign: 'left',
  fontSize: '11pt',
  minWidth: '4em',
  padding: '7.5px'
})

const questionStyle = createStyle(pStyle, {
  fontWeight: 'bold',
  width: '7.1em',
  paddingLeft: 0
})

const answerLetterStyle = createStyle(pStyle, {
  textAlign: 'center',
  marginInline: '5px',
  boxShadow: theme.boxShadow
})

const iconStyle = createStyle({
  height: '17.5px',
  width: '17.5px',
  color: theme.primary
})

const buttonStyle = createStyle({
  paddingBlock: 0
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
            ...answerLetterStyle,
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
          style={buttonStyle}
          leftIcon={() => <IoMdArrowRoundBack style={iconStyle} />}
        />
        <Button
          label="successiva"
          onClick={() => props.shiftQuestionIndex(1)}
          style={buttonStyle}
          rightIcon={() => <IoMdArrowRoundForward style={iconStyle} />}
        />
      </div>
    </div>
  )
}
