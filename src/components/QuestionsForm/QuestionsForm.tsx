import React, { useState } from 'react'
import { category, QuestionsData } from '../../utils/database'
import { statePair } from '../../utils/types'
import { Answer, AnswersData, view } from '../App'
import AnswerForm from './AnswerForm'
import BottomControls from './BottomControls'
import QuestionHeader from './QuestionHeader'
import QuestionView from './QuestionView'
import RecapBar from './RecapBar'
import TopControls from './TopControls'

interface QuestionsFormProps {
  questions: QuestionsData
  viewState: statePair<view>
  sectionState: statePair<category>
  answersState: statePair<AnswersData>
}
export default function QuestionsForm(props: QuestionsFormProps) {
  const [qIndex, originalSetQIndex] = useState(0),
    [currentSection, setSection] = props.sectionState,
    tmpFlaggedState = useState(false),
    tmpAnswerState = useState<Answer['letter']>()

  const setQIndex = (index: React.SetStateAction<number>) => {
    const curr = props.answersState[0][currentSection][index as number]
    tmpFlaggedState[1](curr?.flagged || false)
    tmpAnswerState[1](curr?.letter || undefined)
    return originalSetQIndex(index)
  }
  const currentQuestionIndexState: statePair<number> = [qIndex, setQIndex]

  const shiftQIndex = (offset: number) => {
    const next =
      (qIndex + offset + sectionQuestions.length) % sectionQuestions.length
    return setQIndex(next)
  }

  if (!props.questions) return <span>Loading...</span>

  const sectionQuestions = props.questions[props.sectionState[0]],
    currentQuestion = sectionQuestions[qIndex],
    currentAnswer = props.answersState[0][currentSection][qIndex]

  return (
    <div>
      <TopControls
        sectionState={[
          currentSection,
          (...args) => {
            setQIndex(0)
            setSection(...args)
          }
        ]}
        viewState={props.viewState}
        questions={props.questions}
        answers={props.answersState[0]}
      />
      <RecapBar
        currentQuestionIndexState={currentQuestionIndexState}
        sectionAnswers={props.answersState[0][props.sectionState[0]]}
        sectionQuestions={sectionQuestions}
      />
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
        tmpFlaggedState={tmpFlaggedState}
        updateAnswer={(a) => {
          const next = props.answersState[0]
          next[currentSection][qIndex] = a
          props.answersState[1](next)
          shiftQIndex(1)
        }}
      />
      <BottomControls />
    </div>
  )
}
