import { AnswerLetter, Section, QuestionsData } from '../../utils/database'
import { StyleSheet, theme } from '../../utils/style'
import { statePair } from '../../utils/types'
import { AnswersData } from '../App'

const styles = StyleSheet.create({
  bordered: {
    borderBottom: 'thin solid #606060'
  },
  barContainer: {
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'auto hidden',
    padding: '5px 2.5px 5px 0'
  },
  bar: {
    display: 'flex',
    fontSize: '9.5pt',
    textDecoration: 'none',
    color: theme.primary
  },
  cellContainer: {
    display: 'flex',
    flex: '1 0 25px',
    flexDirection: 'column',
    alignContent: 'baseline',
    textAlign: 'center',
    maxWidth: '4em',
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
  sectionAnswers: AnswersData[Section]
  sectionQuestions: QuestionsData[Section]
}
export default function RecapBar(props: RecapBarProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] =
    props.currentQuestionIndexState

  return (
    <div style={styles.barContainer} id="recap-bar-container">
      <div
        style={{
          ...styles.bar,
          minWidth: props.sectionQuestions.length * 25 + 10,
          cursor: props.active ? 'pointer' : 'default'
        }}
      >
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
                if (props.active) setCurrentQuestionIndex(i)
              }}
              selected={props.active && currentQuestionIndex == i}
            />
          )
        })}
      </div>
    </div>
  )
}

interface AnswerCellProps {
  index: number
  letter: AnswerLetter | undefined
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
