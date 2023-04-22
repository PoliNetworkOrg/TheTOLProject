import { useContext } from 'react'
import { TimerResult } from 'react-timer-hook'
import { getSectionName } from '../../utils/constants'
import { MobileContext } from '../../utils/contexts'
import { Section, QuestionsData } from '../../utils/database'
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
    alignItems: 'center',
    flexDirection: 'row',
    gap: '15px',
    fontSize: '11pt'
  },
  exitBtn: {
    background: '#d81e11',
    border: '2px solid #d81e11',
    fontSize: '9.5pt',
    color: 'white',
    borderRadius: 2,
    cursor: 'pointer'
  }
})

const mobileStyles = StyleSheet.create({
  outerDiv: StyleSheet.compose(styles.outerDiv, {
    flexDirection: 'column'
  }),
  innerDiv: StyleSheet.compose(styles.innerDiv, {
    width: '100%',
    justifyContent: 'space-between'
  })
})

interface TopControlsProps {
  active: boolean
  answers: AnswersData
  closeSection: () => void
  exitTest: () => void
  currentSection: Section
  timer: TimerResult
  questions: QuestionsData
}

export default function TopControls(props: TopControlsProps) {
  const { mobile } = useContext(MobileContext)
  const { currentSection } = props

  return (
    <div style={mobile ? mobileStyles.outerDiv : styles.outerDiv}>
      <div style={mobile ? mobileStyles.innerDiv : styles.innerDiv}>
        <div>
          <p>
            Sezione: <b>{getSectionName(currentSection)}</b> <br />
            Riposte:{' '}
            {
              props.answers[currentSection].filter((a) => !!a.letter).length
            } / {props.questions[currentSection].length}
            {mobile && <br />}
            {props.active &&
              ` (${props.answers[currentSection].reduce(
                (acc, curr) => acc + (curr.flagged ? 1 : 0),
                0
              )} da rivedere)`}
          </p>
        </div>
        {props.active && (
          <>
            <Button label="Chiudi sezione" onClick={props.closeSection} />
            <button style={styles.exitBtn} onClick={props.exitTest}>
              Abbandona il test
            </button>
          </>
        )}
      </div>
      <Timer timer={props.timer} />
    </div>
  )
}
