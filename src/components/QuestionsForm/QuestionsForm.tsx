import React from 'react'
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
  return (
    <div hidden={!props.questions}>
      <TopControls
        sectionState={props.sectionState}
        viewState={props.viewState}
        questions={props.questions}
        answers={props.answersState[0]}
      />
      <RecapBar />
      <QuestionView />
      <AnswerForm />
      <BottomControls />
    </div>
  )
}
