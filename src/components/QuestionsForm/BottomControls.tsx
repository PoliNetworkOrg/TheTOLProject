import React from 'react'
import { StyleSheet, theme } from '../../utils/style'
import { FaCheck } from 'react-icons/fa'
import Button from '../Util/Button'
import { statePair } from '../../utils/types'
import { Answer } from '../App'
import { Question } from '../../utils/database'

const styles = StyleSheet.create({
  controlsDiv: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    fontSize: '9.5pt',
    verticalAlign: 'middle',
    gap: '10px',
    paddingBlock: '10px'
  },
  label: { display: 'flex', alignItems: 'center' },
  icon: { color: theme.timerGreen }
})

interface BottomControlsProps {
  currentQuestion: Question
  tmpAnswerState: statePair<Answer['letter']>
  tmpFlaggedState: statePair<boolean>
  updateAnswer: (updatedAnswer: Answer) => void
}
export default function BottomControls(props: BottomControlsProps) {
  const [flagged, setFlagged] = props.tmpFlaggedState

  if (!props.currentQuestion) return <div style={styles.controlsDiv} />

  return (
    <div style={styles.controlsDiv}>
      <label style={styles.label}>
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
        leftIcon={() => <FaCheck style={styles.icon} />}
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
