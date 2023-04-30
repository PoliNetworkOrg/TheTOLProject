import { useContext, useEffect, useMemo, useState } from 'react'
import { unstable_useBlocker as useBlocker, Navigate } from 'react-router-dom'
import { useTimer } from 'react-timer-hook'
import {
  DSATimeModifier,
  getNextSection,
  sectionInfo,
  View
} from '../../utils/constants'
import { TestContext } from '../../utils/contexts'
import { Section, QuestionsData } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import { statePair } from '../../utils/types'
import { Answer, AnswersData, TimeRecord } from '../App'
import AnswerForm from './AnswerForm'
import BottomControls from './BottomControls'
import QuestionHeader from './QuestionHeader'
import QuestionView from './QuestionView'
import RecapBar from './RecapBar'
import SectionRecap from './SectionRecap'
import TopControls from './TopControls'

const styles = StyleSheet.create({
  testing: { display: 'flex', flexDirection: 'column' }
})

interface QuestionsFormProps {
  answersState: statePair<AnswersData>
  questions: QuestionsData
  sectionState: statePair<Section>
  timeRecordState: statePair<TimeRecord>
  viewState: statePair<View>
}
export default function QuestionsForm(props: QuestionsFormProps) {
  const { isDsa } = useContext(TestContext)
  const minutesCoeff = isDsa ? DSATimeModifier : 1
  const [qIndex, originalSetQIndex] = useState(0),
    tmpFlaggedState = useState(false),
    tmpAnswerState = useState<Answer['letter']>(),
    alertDisplayedState = useState(false)

  const [currentSection, setSection] = props.sectionState,
    [view, setView] = props.viewState,
    [answers, setAnswers] = props.answersState,
    [timeRecord, setTimeRecord] = props.timeRecordState

  const sectionQuestions = props.questions[props.sectionState[0]],
    currentQuestion = sectionQuestions[qIndex],
    currentAnswer = answers[currentSection][qIndex],
    shouldShowAlert =
      !alertDisplayedState[0] &&
      (tmpAnswerState[0] != currentAnswer?.letter ||
        tmpFlaggedState[0] != (currentAnswer?.flagged || false))

  useEffect(() => {
    // called when the qIndex is updated (the user changes question)
    // sets the scroll of the recap bar container to keep the selected question in view
    const recapBarElement = document.getElementById('recap-bar-container')
    if (!recapBarElement) return

    // this width works ok considering margins, widths, and paddings of the elements
    const width = recapBarElement.clientWidth - 40
    // 25 is the min width of a question cell, 2px margin to see the cell before
    const maxScroll = qIndex * 25 - 2
    const minScroll = maxScroll - width

    // the scrollLeft musth be kept between the two values
    if (recapBarElement.scrollLeft < minScroll)
      recapBarElement.scrollLeft = minScroll
    if (recapBarElement.scrollLeft > maxScroll)
      recapBarElement.scrollLeft = maxScroll
  }, [qIndex])

  const showAlert = () => {
    alert(
      `Se prima non premi "Conferma e vai alla successiva" la risposta non verrà salvata.`
    )
    alertDisplayedState[1](true)
  }

  const closeSection = () => {
    if (shouldShowAlert) return showAlert()
    // else it's already reset by setQIndex

    setView('TOL-secRecap')
    setQIndex(0)
    tmpAnswerState[1](undefined)
    tmpFlaggedState[1](false)

    const nextAnswers = answers
    nextAnswers[currentSection] = nextAnswers[currentSection].map((a) => ({
      ...a,
      flagged: false
    }))
    setAnswers(nextAnswers)

    const nextTR = timeRecord
    nextTR[currentSection] =
      sectionInfo[currentSection].minutes * minutesCoeff * 60 -
      ((timer.hours * 60 + timer.minutes) * 60 + timer.seconds)
    setTimeRecord(nextTR)

    timer.restart(new Date(), false)
  }

  const setQIndex = (
    index: React.SetStateAction<number>,
    ignoreAlert = false
  ) => {
    if (shouldShowAlert && !ignoreAlert) {
      showAlert()
    } else {
      const next = answers[currentSection][index as number]

      tmpFlaggedState[1](next?.flagged || false)
      tmpAnswerState[1](next?.letter || undefined)
      alertDisplayedState[1](false)

      originalSetQIndex(index)
    }
  }

  const shiftQIndex = (offset: number, ignoreAlert = false) => {
    const next =
      (qIndex + offset + sectionQuestions.length) % sectionQuestions.length || 0
    return setQIndex(next, ignoreAlert)
  }

  const timer = useTimer({
    expiryTimestamp: getTimerExpDate(
      sectionInfo[currentSection].minutes * minutesCoeff
    ),
    onExpire: () => {
      timer.seconds = 0
      closeSection()
    }
  })

  const currentQuestionIndexState: statePair<number> = [qIndex, setQIndex]

  const getViewElement = () => {
    if (view == 'TOL-testing')
      return (
        <div style={styles.testing}>
          <QuestionHeader
            currentAnswer={currentAnswer}
            questionIndex={qIndex}
            shiftQuestionIndex={shiftQIndex}
            sectionQuestions={sectionQuestions}
          />
          <QuestionView question={currentQuestion} />
          <AnswerForm
            currentAnswer={currentAnswer}
            currentQuestion={currentQuestion}
            tmpAnswerState={tmpAnswerState}
          />
          <BottomControls
            currentQuestion={currentQuestion}
            tmpAnswerState={tmpAnswerState}
            tmpFlaggedState={tmpFlaggedState}
            updateAnswer={(a) => {
              const next = answers
              next[currentSection][qIndex] = a
              setAnswers(next)
              shiftQIndex(1, true)
            }}
          />
        </div>
      )
    else if (view == 'TOL-secRecap')
      return (
        <SectionRecap
          goToNextSection={() => {
            const nextSection = getNextSection(currentSection)
            if (nextSection) {
              setSection(nextSection)
              timer.restart(
                getTimerExpDate(sectionInfo[nextSection].minutes * minutesCoeff)
              )
              setView('TOL-testing')
            } else {
              setView('TOL-end')
            }
          }}
          section={currentSection}
          secondsUsed={timeRecord[currentSection] || 0}
          sectionAnswers={answers[currentSection]}
          sectionQuestions={props.questions[currentSection]}
          minutes={sectionInfo[currentSection].minutes * minutesCoeff}
        />
      )
    else if (view === 'TOL-end') return <Navigate to="/results" replace />
    else return <Navigate to="/" replace />
  }

  const isBlocked = useMemo(
    () => ['TOL-testing', 'TOL-secRecap'].includes(view),
    [view]
  )
  const blocker = useBlocker(isBlocked)

  const exit_warn =
    'Sei sicuro di voler abbandonare il test? I progressi non verranno salvati.'
  const handleExitTest = () => {
    const confirmExit = confirm(exit_warn)
    if (confirmExit) {
      // user confirmed to exit the test
      // set onbeforeunload to null, otherwise the prompt is shown twice
      window.onbeforeunload = null
      location.reload()
    }
  }

  useEffect(() => {
    // set reload protection on first render
    window.onbeforeunload = () => exit_warn

    if (blocker.state === 'blocked' && !isBlocked) {
      const confirmExit = confirm(exit_warn)
      if (confirmExit) {
        // user confirmed to leave the page
        // set onbeforeunload to null, otherwise the prompt is shown twice
        window.onbeforeunload = null
        props.viewState[1]('INFO-start')
        blocker.proceed?.()
      }
    }
  }, [blocker, isBlocked, props.viewState])

  return props.questions ? (
    <div>
      <TopControls
        active={view == 'TOL-testing'}
        answers={answers}
        closeSection={closeSection}
        onExitTest={handleExitTest}
        currentSection={currentSection}
        questions={props.questions}
        timer={timer}
      />
      <RecapBar
        active={view == 'TOL-testing'}
        currentQuestionIndexState={currentQuestionIndexState}
        sectionAnswers={answers[currentSection]}
        sectionQuestions={sectionQuestions}
      />
      {getViewElement()}
    </div>
  ) : (
    <span>Loading...</span>
  )
}

function getTimerExpDate(minutes: number) {
  const res = new Date()
  res.setSeconds(res.getSeconds() + minutes * 60)
  return res
}
