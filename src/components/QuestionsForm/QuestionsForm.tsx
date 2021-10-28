import React, { useState } from 'react'
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
    [currentSection, setSection] = props.sectionState,
    [view, setView] = props.viewState,
    [answers, setAnswers] = props.answersState,
    tmpFlaggedState = useState(false),
    tmpAnswerState = useState<Answer['letter']>()

  const setQIndex = (index: React.SetStateAction<number>) => {
    const curr = answers[currentSection][index as number]
    tmpFlaggedState[1](curr?.flagged || false)
    tmpAnswerState[1](curr?.letter || undefined)
    return originalSetQIndex(index)
  }
  const currentQuestionIndexState: statePair<number> = [qIndex, setQIndex]

  const shiftQIndex = (offset: number) => {
    const next =
      (qIndex + offset + sectionQuestions.length) % sectionQuestions.length || 0
    return setQIndex(next)
  }

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
        closeSection={() => {
          // const next = getNextSection(currentSection)
          // if (next) setSection(next)
          // else props.viewState[1]('TOL-end')
          setView('TOL-secRecap')
          setQIndex(0)
          const nextAnswers = answers
          nextAnswers[currentSection] = nextAnswers[currentSection].map(
            (a) => ({
              ...a,
              flagged: false
            })
          )
          setAnswers(nextAnswers)
        }}
        currentSection={currentSection}
        questions={props.questions}
        answers={answers}
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
