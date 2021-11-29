import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useTimer } from 'react-timer-hook'
import { PanelBear } from '../..'
import { getNextSection, sectionInfo } from '../../utils/constants'
import { section, QuestionsData } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import { statePair } from '../../utils/types'
import { Answer, AnswersData, TimeRecord, view } from '../App'
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
  sectionState: statePair<section>
  timeRecordState: statePair<TimeRecord>
  viewState: statePair<view>
}
export default function QuestionsForm(props: QuestionsFormProps) {
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

  const showAlert = () => {
    alert(
      `Se prima non premi "Conferma e vai alla successiva" la risposta non verrà salvata.`
    )
    alertDisplayedState[1](true)
  }

  const closeSection = () => {
    if (shouldShowAlert) return showAlert()
    // else it's already reset by setQIndex

    PanelBear.track(`EndSection:${currentSection.toUpperCase()}`)

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
      sectionInfo[currentSection].minutes * 60 -
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
    expiryTimestamp: getTimerExpDate(sectionInfo[currentSection].minutes),
    onExpire: () => {
      PanelBear.track(`TimerExpired:${currentSection.toUpperCase()}`)
      timer.seconds = 0
      closeSection()
    }
  })

  const currentQuestionIndexState: statePair<number> = [qIndex, setQIndex]
  if (!props.questions) return <span>Loading...</span>

  const getViewElement = () => {
    const navigate = useNavigate()

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
              timer.restart(getTimerExpDate(sectionInfo[nextSection].minutes))
              setView('TOL-testing')
            } else {
              setView('INFO-end')
              navigate('/results')
              PanelBear.track('ViewResults')
            }
          }}
          section={currentSection}
          secondsUsed={timeRecord[currentSection] || 0}
          sectionAnswers={answers[currentSection]}
          sectionQuestions={props.questions[currentSection]}
        />
      )
    else return <div />
  }

  return (
    <div>
      <TopControls
        active={view == 'TOL-testing'}
        answers={answers}
        closeSection={() => {
          PanelBear.track(`EarlyEndSection:${currentSection.toUpperCase()}`)
          closeSection()
        }}
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
  )
}

function getTimerExpDate(minutes: number) {
  const res = new Date()
  res.setSeconds(res.getSeconds() + minutes * 60)
  return res
}
