import React from 'react'
import { answerLetter, section, QuestionsData } from '../../utils/database'
import { StyleSheet, theme } from '../../utils/style'
import { statePair } from '../../utils/types'
import { AnswersData } from '../App'

const styles = StyleSheet.create({
  bordered: {
    borderBottom: 'thin solid #606060'
  },
  bar: {
    display: 'flex',
    fontSize: '9.5pt',
    textDecoration: 'none',
    color: theme.primary
  },
  cellContainer: {
    display: 'flex',
    flexShrink: 1,
    flexDirection: 'column',
    alignContent: 'baseline',
    textAlign: 'center',
    width: '4em',
    backgroundColor: theme.lightBackground
  },
  cellSub: {
    padding: '0.3em',
    height: '1.2em',
    boxShadow: theme.boxShadow
  },
  selectedCell: {
    outline: `5px solid ${theme.primary}`,
    marginInline: '4px',
    color: 'black'
  },
  p: { margin: 'auto' }
})

interface RecapBarProps {
  active: boolean
  currentQuestionIndexState: statePair<number>
  sectionAnswers: AnswersData[section]
  sectionQuestions: QuestionsData[section]
}
export default function RecapBar(props: RecapBarProps) {
  return (
    <a style={styles.bar} {...(props.active ? { href: '#' } : {})}>
      {props.sectionQuestions.map((q, i) => {
        const answer = props.sectionAnswers.find(
          (a) => a && a.id == q.id && (q.sub ? q.sub == a.sub : true)
        )
        return (
          <AnswerCell
            key={i}
            index={i}
            letter={answer?.letter}
            flagged={answer?.flagged || false}
            onClick={() => {
              if (props.active) props.currentQuestionIndexState[1](i)
            }}
            selected={props.active && props.currentQuestionIndexState[0] == i}
          />
        )
      })}
    </a>
  )
}

interface AnswerCellProps {
  index: number
  letter: answerLetter | undefined
  flagged: boolean
  onClick: () => void
  selected: boolean
}
function AnswerCell(props: AnswerCellProps) {
  return (
    <div
      style={StyleSheet.compose(
        styles.cellContainer,
        props.selected && styles.selectedCell
      )}
      onClick={props.onClick}
    >
      <div
        style={StyleSheet.compose(
          styles.cellSub,
          styles.bordered,
          props.selected && { fontWeight: 'bold' }
        )}
      >
        <p style={styles.p}>{props.index + 1}</p>
      </div>
      <div
        style={StyleSheet.compose(styles.cellSub, {
          backgroundColor: props.flagged
            ? theme.questionYellow
            : props.letter
            ? theme.questionGreen
            : 'white'
        })}
      >
        <p style={styles.p}>
          {props.letter?.toUpperCase() || ' '}
          {props.flagged && '?'}
        </p>
      </div>
    </div>
  )
}
