import React from 'react'
import { Question } from '../../utils/database'
import { createStyle } from '../../utils/style'
import { statePair } from '../../utils/types'
import { Answer } from '../App'
import RenderedText from '../Util/RenderedText'

const baseText = createStyle({
  fontSize: '11pt'
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
      <span style={baseText}>
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
