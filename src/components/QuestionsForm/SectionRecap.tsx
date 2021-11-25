import React from 'react'
import { sectionInfo } from '../../utils/constants'
import { QuestionsData, section } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import { AnswersData } from '../App'
import Button from '../Util/Button'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: '10px',
    paddingBottom: '20px',
    alignItems: 'center',
    flexDirection: 'column'
  }
})

interface SectionRecapProps {
  goToNextSection: () => void
  section: section
  sectionAnswers: AnswersData[section]
  sectionQuestions: QuestionsData[section]
  secondsUsed: number
}
export default function SectionRecap(props: SectionRecapProps) {
  const info = sectionInfo[props.section]

  return (
    <div style={styles.container}>
      <p>
        Tempo utilizzato:{' '}
        {Math.floor((props.secondsUsed / 60) % 60).toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}
        :
        {Math.floor(props.secondsUsed / 60).toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}
        :
        {(props.secondsUsed % 60).toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}{' '}
        / {Math.floor(info.minutes / 60)}:{info.minutes % 60}:00 (
        {Math.floor(
          (info.minutes * 60 - props.secondsUsed) / 60 / 60
        ).toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}
        :
        {Math.floor(
          ((info.minutes * 60 - props.secondsUsed) / 60) % 60
        ).toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}
        :
        {((info.minutes * 60 - props.secondsUsed) % 60).toLocaleString(
          undefined,
          {
            minimumIntegerDigits: 2
          }
        )}{' '}
        rimanente)
      </p>
      <Button
        label={
          info.order ==
          Math.max(...Object.values(sectionInfo).map((i) => i.order))
            ? 'Vedi esito del test'
            : 'Prossima sezione'
        }
        onClick={props.goToNextSection}
      />
    </div>
  )
}
