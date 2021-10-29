import React, { useState } from 'react'
import { useTimer } from 'react-timer-hook'
import { getNextSection, sectionInfo } from '../../utils/constants'
import { section, QuestionsData } from '../../utils/database'
import { statePair } from '../../utils/types'
import { Answer, AnswersData, TimeRecord, view } from '../App'
import AnswerForm from './AnswerForm'
import BottomControls from './BottomControls'
import QuestionHeader from './QuestionHeader'
import QuestionView from './QuestionView'
import RecapBar from './RecapBar'
import SectionRecap from './SectionRecap'
import SectionStart from './SectionStart'
import TopControls from './TopControls'

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
    tmpTimerExpiredState = useState(false)

  const [currentSection, setSection] = props.sectionState,
    [view, setView] = props.viewState,
    [answers, setAnswers] = props.answersState,
    [timeRecord, setTimeRecord] = props.timeRecordState

  const closeSection = () => {
    setView('TOL-secRecap')
    setQIndex(0)

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

  const setQIndex = (index: React.SetStateAction<number>) => {
    const curr = answers[currentSection][index as number]
    tmpFlaggedState[1](curr?.flagged || false)
    tmpAnswerState[1](curr?.letter || undefined)
    return originalSetQIndex(index)
  }

  const shiftQIndex = (offset: number) => {
    const next =
      (qIndex + offset + sectionQuestions.length) % sectionQuestions.length || 0
    return setQIndex(next)
  }

  const timer = useTimer({
    expiryTimestamp: getTimerExpDate(sectionInfo[currentSection].minutes),
    autoStart: false,
    onExpire: () => {
      closeSection()
      tmpTimerExpiredState[1](true)
    }
  })

  const currentQuestionIndexState: statePair<number> = [qIndex, setQIndex]
  if (!props.questions) return <span>Loading...</span>

  const sectionQuestions = props.questions[props.sectionState[0]],
    currentQuestion = sectionQuestions[qIndex],
    currentAnswer = answers[currentSection][qIndex]

  const getViewElement = () => {
    if (view == 'TOL-startSec')
      return (
        <SectionStart
          section={currentSection}
          startSection={() => {
            setView('TOL-testing')
            timer.start()
          }}
        />
      )
    else if (view == 'TOL-testing')
      return (
        <div>
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
              shiftQIndex(1)
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
                getTimerExpDate(sectionInfo[nextSection].minutes),
                false
              )
              tmpTimerExpiredState[1](false)
              setView('TOL-startSec')
            } else {
              setView('INFO-end')
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
        closeSection={closeSection}
        currentSection={currentSection}
        questions={props.questions}
        timer={timer}
        timerExpired={tmpTimerExpiredState[0]}
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
