import { useContext } from 'react'
import { Question } from '../../utils/database'
import { StyleSheet, theme } from '../../utils/style'
import { Answer } from '../App'
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io'
import Button from '../Util/Button'
import { MobileContext } from '../../utils/contexts'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  leftContainer: {
    display: 'flex'
  },
  rightContainer: {
    display: 'flex',
    padding: '1em',
    gap: '5px'
  },
  p: {
    textAlign: 'left',
    fontSize: '11pt',
    minWidth: '4em',
    padding: '7.5px'
  },
  get question() {
    return StyleSheet.compose(this.p, {
      fontWeight: 'bold',
      width: '7.1em',
      paddingLeft: 0
    })
  },
  get answerLetter() {
    return StyleSheet.compose(this.p, {
      textAlign: 'center',
      marginInline: '5px',
      boxShadow: theme.boxShadow
    })
  },
  icon: {
    height: '17.5px',
    width: '17.5px',
    color: theme.primary
  },
  button: {
    paddingBlock: 0
  }
})

const mobileStyles = StyleSheet.create({
  container: StyleSheet.compose(styles.container, {
    flexDirection: 'column-reverse'
  }),
  rightContainer: StyleSheet.compose(styles.rightContainer, {
    justifyContent: 'space-between'
  })
})

interface QuestionHeaderProps {
  currentAnswer: Answer
  questionIndex: number
  sectionQuestions: Question[]
  shiftQuestionIndex: (offset: number) => void
}
export default function QuestionHeader(props: QuestionHeaderProps) {
  const { mobile } = useContext(MobileContext)
  return (
    <div style={mobile ? mobileStyles.container : styles.container}>
      <div style={styles.leftContainer}>
        <p style={styles.question}>Domanda {props.questionIndex + 1}</p>
        <p
          style={StyleSheet.compose(styles.answerLetter, {
            backgroundColor: props.currentAnswer?.flagged
              ? theme.questionYellow
              : props.currentAnswer?.letter
              ? theme.questionGreen
              : 'inherit'
          })}
        >
          {(props.currentAnswer?.letter?.toUpperCase() || '') +
            (props.currentAnswer?.flagged ? '?' : '') || ' '}
        </p>
        <p style={styles.p}>
          Risposta {props.currentAnswer?.letter ? '' : 'non '}data
        </p>
      </div>
      <div style={mobile ? mobileStyles.rightContainer : styles.rightContainer}>
        <Button
          label="precedente"
          onClick={() => props.shiftQuestionIndex(-1)}
          style={styles.button}
          leftIcon={() => <IoMdArrowRoundBack style={styles.icon} />}
        />
        <Button
          label="successiva"
          onClick={() => props.shiftQuestionIndex(1)}
          style={styles.button}
          rightIcon={() => <IoMdArrowRoundForward style={styles.icon} />}
        />
      </div>
    </div>
  )
}
