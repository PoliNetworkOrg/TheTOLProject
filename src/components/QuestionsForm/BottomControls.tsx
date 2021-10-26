import React from 'react'
import { createStyle } from '../../utils/style'
import { FaCheck } from 'react-icons/fa'
import Button from '../Util/Button'
import { statePair } from '../../utils/types'
import { Answer } from '../App'
import { Question } from '../../utils/database'

const controlsDiv = createStyle({
  display: 'flex',
  flex: 1,
  justifyContent: 'flex-end',
  fontSize: '9.5pt',
  verticalAlign: 'middle',
  gap: '10px',
  paddingBlock: '10px'
})

const labelStyle = createStyle({ display: 'flex', alignItems: 'center' })

interface BottomControlsProps {
  currentQuestion: Question
  tmpAnswerState: statePair<Answer['letter']>
  tmpFlaggedState: statePair<boolean>
  updateAnswer: (updatedAnswer: Answer) => void
}
export default function BottomControls(props: BottomControlsProps) {
  const [flagged, setFlagged] = props.tmpFlaggedState

  return (
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
            letter: props.tmpAnswerState[0],
            flagged
          })
        }}
      />
    </div>
  )
}
