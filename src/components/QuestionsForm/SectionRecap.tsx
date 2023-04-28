import { sectionInfo } from '../../utils/constants'
import { QuestionsData, Section } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import { AnswersData } from '../App'
import Button from '../Util/Button'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: '10px',
    paddingBottom: '20px',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center'
  }
})

interface SectionRecapProps {
  goToNextSection: () => void
  section: Section
  sectionAnswers: AnswersData[Section]
  sectionQuestions: QuestionsData[Section]
  secondsUsed: number
  minutes: number
}
export default function SectionRecap({
  minutes,
  secondsUsed,
  ...props
}: SectionRecapProps) {
  const order = sectionInfo[props.section].order
  const seconds = minutes * 60
  return (
    <div style={styles.container}>
      <p>
        {'Tempo utilizzato: '}
        <span>
          {displayTime((secondsUsed / 60) % 60)}:{displayTime(secondsUsed / 60)}
          :{displayTime(secondsUsed % 60)}
        </span>
        {' / '}
        <span>
          {displayTime(minutes / 60)}:{displayTime(minutes % 60)}:
          {displayTime(seconds % 60)}
        </span>
        {' ('}
        <span>
          {displayTime((seconds - secondsUsed) / 60 / 60)}:
          {displayTime(((seconds - secondsUsed) / 60) % 60)}:
          {displayTime((seconds - secondsUsed) % 60)} rimanente)
        </span>
      </p>
      <Button
        label={
          order == Math.max(...Object.values(sectionInfo).map((i) => i.order))
            ? 'Vedi esito del test'
            : 'Prossima sezione'
        }
        onClick={props.goToNextSection}
      />
    </div>
  )
}

function displayTime(time: number) {
  return Math.floor(time).toLocaleString(undefined, {
    minimumIntegerDigits: 2
  })
}
