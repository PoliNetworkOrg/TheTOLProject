import React from 'react'
import { answerLetter, category, QuestionsData } from '../../utils/database'
import { createStyle, theme } from '../../utils/style'
import { statePair } from '../../utils/types'
import { AnswersData } from '../App'

const defaultBorder = 'thin solid #606060'

const barStyle = createStyle({
  display: 'flex',
  fontSize: '9.5pt',
  textDecoration: 'none',
  color: theme.primary
})

interface RecapBarProps {
  sectionAnswers: AnswersData[category]
  currentQuestionIndexState: statePair<number>
  sectionQuestions: QuestionsData[category]
}
export default function RecapBar(props: RecapBarProps) {
  return (
    <a style={barStyle} href="#">
      {props.sectionQuestions.map((q, i) => {
        const answer = props.sectionAnswers.find(
          (a) => a.id == q.id && (q.sub ? q.sub == a.sub : true)
        )
        return (
          <AnswerCell
            key={i}
            index={i + ''}
            letter={answer?.letter}
            flagged={answer?.flagged || false}
            onClick={() => {
              props.currentQuestionIndexState[1](i)
            }}
            selected={props.currentQuestionIndexState[0] == i}
          />
        )
      })}
    </a>
  )
}

const cellContainerStyle = createStyle({
  display: 'flex',
  flexShrink: 1,
  flexDirection: 'column',
  alignContent: 'baseline',
  textAlign: 'center',
  width: '4em'
})

const cellSubStyle = createStyle({
  flex: 1,
  padding: '0.3em',
  boxShadow:
    '1px 0 0 0 #606060, 0 1px 0 0 #606060, 1px 1px 0 0 #606060, /* corner */ 1px 0 0 0 #606060 inset, 0 1px 0 0 #606060 inset'
})

const selectedCell = createStyle({
  outline: `5px solid ${theme.primary}`,
  marginInline: '4px',
  color: 'black'
})

interface AnswerCellProps {
  index: string
  letter: answerLetter | undefined
  flagged: boolean
  onClick: () => void
  selected: boolean
}
function AnswerCell(props: AnswerCellProps) {
  return (
    <div
      style={{
        ...cellContainerStyle,
        backgroundColor: theme.lightBackground,
        ...(props.selected ? selectedCell : {})
      }}
      onClick={props.onClick}
    >
      <div
        style={{
          ...cellSubStyle,
          borderBottom: defaultBorder,
          ...(props.selected ? { fontWeight: 'bold' } : {})
        }}
      >
        <span>{props.index}</span>
      </div>
      <div
        style={{
          ...cellSubStyle,
          backgroundColor: props.flagged ? 'yellow' : 'white'
        }}
      >
        <span>
          {props.letter || 'jjj'}
          {props.flagged && '?'}
        </span>
      </div>
    </div>
  )
}
