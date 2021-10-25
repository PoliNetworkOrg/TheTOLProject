import React, { useState } from 'react'
import { category, QuestionsData } from '../../utils/database'
import { statePair } from '../../utils/types'
import { AnswersData, view } from '../App'
import AnswerForm from './AnswerForm'
import BottomControls from './BottomControls'
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
  const currentQuestionIndexState = useState(0),
    [currentSection, setSection] = props.sectionState

  return (
    <div hidden={!props.questions}>
      <TopControls
        sectionState={[
          currentSection,
          (...args) => {
            currentQuestionIndexState[1](0)
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
        sectionQuestions={props.questions[props.sectionState[0]]}
      />
      <QuestionView />
      <AnswerForm />
      <BottomControls />
    </div>
  )
}
