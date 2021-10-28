import React, { useState } from 'react'
import { useTimer } from 'react-timer-hook'
import { sectionInfo } from '../../utils/constants'
import { section, QuestionsData } from '../../utils/database'
import { statePair } from '../../utils/types'
import { Answer, AnswersData, view } from '../App'
import AnswerForm from './AnswerForm'
import BottomControls from './BottomControls'
import QuestionHeader from './QuestionHeader'
import QuestionView from './QuestionView'
import RecapBar from './RecapBar'
import SectionStart from './SectionStart'
import TopControls from './TopControls'

interface QuestionsFormProps {
  questions: QuestionsData
  viewState: statePair<view>
  sectionState: statePair<section>
  answersState: statePair<AnswersData>
}
export default function QuestionsForm(props: QuestionsFormProps) {
  const [qIndex, originalSetQIndex] = useState(0),
    tmpFlaggedState = useState(false),
    tmpAnswerState = useState<Answer['letter']>(),
    tmpTimerExpiredState = useState(false)

  const [currentSection, setSection] = props.sectionState,
    [view, setView] = props.viewState,
    [answers, setAnswers] = props.answersState

  const closeSection = () => {
    setView('TOL-secRecap')
    setQIndex(0)
    const nextAnswers = answers
    nextAnswers[currentSection] = nextAnswers[currentSection].map((a) => ({
      ...a,
      flagged: false
    }))
    setAnswers(nextAnswers)
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

  const tmpTime = new Date()
  tmpTime.setSeconds(
    tmpTime.getSeconds() + sectionInfo[currentSection].minutes * 60
  )
  const timer = useTimer({
    expiryTimestamp: tmpTime,
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
    else if (view == 'TOL-secRecap') return <div></div>
    else if (view == 'TOL-end') return <div />
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
