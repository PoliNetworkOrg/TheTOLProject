import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { Question } from '../../utils/database'
import { createStyle } from '../../utils/style'
import { statePair } from '../../utils/types'
import { Answer } from '../App'
import Button from '../Util/Button'
import RenderedText from '../Util/RenderedText'

const baseText = createStyle({
  fontSize: '11pt'
})

const controlsDiv = createStyle({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  fontSize: '9.5pt',
  verticalAlign: 'middle',
  gap: '10px'
})

const labelStyle = createStyle({ display: 'flex', alignItems: 'center' })
interface AnswerFormProps {
  currentAnswer: Answer | undefined
  currentQuestion: Question
  tmpFlaggedState: statePair<boolean>
  tmpAnswerState: statePair<Answer['letter']>
  updateAnswer: (updatedAnswer: Answer) => void
}

export default function AnswerForm(props: AnswerFormProps) {
  const letterState = props.tmpAnswerState,
    [flagged, setFlagged] = props.tmpFlaggedState

  if (!props.currentQuestion) return <span>Loading...</span>

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
      <br />
      <div style={controlsDiv}>
        <label style={labelStyle}>
          <input
            type="checkbox"
            checked={flagged}
            onChange={() => {
              setFlagged(!flagged)
            }}
          />
          <span>Da rivedere</span>
        </label>
        <Button
          label="Conferma e vai alla successiva"
          leftIcon={() => <FaCheck />}
          onClick={() => {
            props.updateAnswer({
              id: props.currentQuestion.id,
              sub: props.currentQuestion.sub,
              letter: letterState[0],
              flagged
            })
          }}
        />
      </div>
    </div>
  )
}

interface RadioRowProps {
  letter: Answer['letter']
  letterState: statePair<Answer['letter']>
  text: string
}
function RadioRow(props: RadioRowProps) {
  const textStyle = createStyle({
    fontWeight: 'bold',
    textAlign: 'center',
    verticalAlign: 'middle',
    paddingInline: '10px'
  })
  const spanStyle = createStyle({
    width: '2em',
    float: 'left',
    display: 'inline-block'
  })

  return (
    <tr style={baseText}>
      <label>
        <td style={textStyle}>
          <span style={spanStyle}>{props.letter?.toUpperCase() || '?'} </span>
          <input
            type="radio"
            value={props.letter}
            checked={props.letter == props.letterState[0]}
            onChange={(event) => {
              // @ts-expect-error The value is correct
              props.letterState[1](event.target.value || undefined)
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
