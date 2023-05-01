import { Question } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import { statePair } from '../../utils/types'
import { Answer } from '../App'
import RenderedText from '../Util/RenderedText'

const styles = StyleSheet.create({
  baseText: {
    fontSize: '11pt'
  },
  label: {
    display: 'flex',
    marginBottom: '2px'
  },
  radioText: {
    display: 'flex',
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'middle',
    paddingInline: '10px',
    alignItems: 'flex-start'
  },
  radioSpan: {
    width: '2em',
    float: 'left',
    display: 'inline-block'
  }
})

interface AnswerFormProps {
  currentAnswer: Answer | undefined
  currentQuestion: Question
  tmpAnswerState: statePair<Answer['letter']>
}

export default function AnswerForm(props: AnswerFormProps) {
  const letterState = props.tmpAnswerState

  if (!props.currentQuestion)
    return (
      <span style={styles.baseText}>
        <br />
        No answers to display ¯\_(ツ)_/¯
      </span>
    )

  return (
    <div>
      <RadioRow
        letter="a"
        letterState={letterState}
        text={props.currentQuestion.answers.a}
      />
      <RadioRow
        letter="b"
        letterState={letterState}
        text={props.currentQuestion.answers.b}
      />
      <RadioRow
        letter="c"
        letterState={letterState}
        text={props.currentQuestion.answers.c}
      />
      <RadioRow
        letter="d"
        letterState={letterState}
        text={props.currentQuestion.answers.d}
      />
      <RadioRow
        letter="e"
        letterState={letterState}
        text={props.currentQuestion.answers.e}
      />
      <RadioRow letter={undefined} letterState={letterState} text="Non so" />
    </div>
  )
}

interface RadioRowProps {
  letter: Answer['letter']
  letterState: statePair<Answer['letter']>
  text: string
}
function RadioRow(props: RadioRowProps) {
  const [letter, setLetter] = props.letterState

  return (
    <tr style={styles.baseText}>
      <label style={styles.label}>
        <td style={styles.radioText}>
          <span style={styles.radioSpan}>
            {props.letter?.toUpperCase() || '?'}{' '}
          </span>
          <input
            type="radio"
            value={props.letter}
            checked={props.letter == letter}
            onChange={(event) => {
              // @ts-expect-error The value is correct
              setLetter(event.target.value || undefined)
            }}
          />
        </td>
        <td>
          <RenderedText text={props.text} />
        </td>
      </label>
    </tr>
  )
}
