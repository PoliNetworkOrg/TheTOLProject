import React from 'react'
import { TimerResult } from 'react-timer-hook'
import { getSectionName } from '../../utils/constants'
import { section, QuestionsData } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import { AnswersData } from '../App'
import Button from '../Util/Button'
import Timer from './Timer'

const styles = StyleSheet.create({
  outerDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  innerDiv: {
    display: 'flex',
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: '15px',
    fontSize: '11pt'
  }
})

interface TopControlsProps {
  active: boolean
  answers: AnswersData
  closeSection: () => void
  currentSection: section
  timer: TimerResult
  questions: QuestionsData
}

export default function TopControls(props: TopControlsProps) {
  const { currentSection } = props

  return (
    <div style={styles.outerDiv}>
      <div style={styles.innerDiv}>
        <div>
          <p>
            Sezione: <b>{getSectionName(currentSection)}</b> <br />
            Riposte: {props.answers[currentSection].length} /{' '}
            {props.questions[currentSection].length}
            {props.active &&
              ` (${props.answers[currentSection].reduce(
                (acc, curr) => acc + (curr.flagged ? 1 : 0),
                0
              )} da rivedere)`}
          </p>
        </div>
        {props.active && (
          <Button label="Chiudi sezione" onClick={props.closeSection} />
        )}
      </div>
      <Timer timer={props.timer} />
    </div>
  )
}
