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
    justifyContent: 'space-between',
    gap: 10
  },
  innerDiv: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '15px',
    fontSize: '11pt'
  },
  btnDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1
  },
  exitBtn: {
    background: '#d81f11',
    border: '2px solid #d81e11',
    fontSize: '9.5pt',
    color: 'white',
    borderRadius: 2,
    cursor: 'pointer',
    fontFamily: ' Arial'
  }
})

const mobileStyles = StyleSheet.create({
  outerDiv: StyleSheet.compose(styles.outerDiv, {
    flexDirection: 'column',
    marginBottom: '1em'
  }),
  innerDiv: StyleSheet.compose(styles.innerDiv, {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  })
})

interface TopControlsProps {
  active: boolean
  answers: AnswersData
  closeSection: () => void
  onExitTest: () => void
  currentSection: Section
  timer: TimerResult
  questions: QuestionsData
}

export default function TopControls(props: TopControlsProps) {
  const { mobile } = useContext(MobileContext)
  const { timer, active } = props

  return mobile ? (
    <div style={mobileStyles.outerDiv}>
      <div style={mobileStyles.innerDiv}>
        <SectionInfo {...props} />
        <Timer timer={timer} />
      </div>

      {active && (
        <div style={mobileStyles.innerDiv}>
          <Button label="Chiudi sezione" onClick={props.closeSection} />
          <button style={styles.exitBtn} onClick={props.onExitTest}>
            Abbandona il test
          </button>
        </div>
      )}
    </div>
  ) : (
    <div style={styles.outerDiv}>
      <SectionInfo {...props} />
      {active && (
        <div style={styles.btnDiv}>
          <Button label="Chiudi sezione" onClick={props.closeSection} />
          <button style={styles.exitBtn} onClick={props.onExitTest}>
            Abbandona il test
          </button>
        </div>
      )}
      <Timer timer={timer} />
    </div>
  )
}

function SectionInfo(props: TopControlsProps) {
  const { currentSection, answers, questions, active } = props
  const { mobile } = useContext(MobileContext)
  return (
    <p>
      Sezione: <b>{getSectionName(currentSection)}</b> <br />
      Risposte: {
        answers[currentSection].filter((a) => !!a.letter).length
      } / {questions[currentSection].length}
      {mobile && <br />}
      {active &&
        ` (${props.answers[currentSection].reduce(
          (acc, curr) => acc + (curr.flagged ? 1 : 0),
          0
        )} da rivedere)`}
    </p>
  )
}
