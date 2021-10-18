import React from 'react'
import { QuestionsData } from '../../utils/database'
import AnswerForm from './AnswerForm'
import BottomControls from './BottomControls'
import QuestionView from './QuestionView'
import RecapBar from './RecapBar'
import TopControls from './TopControls'

interface QuestionsFormProps {
  questions?: QuestionsData
}
export default function QuestionsForm(props: QuestionsFormProps) {
  return (
    <div hidden={!props.questions}>
      <code>
        {props.questions &&
          Object.entries(props.questions)
            .map(([key, value]) => `${key}: ${value.length}`)
            .join('\n')}
      </code>
      <TopControls />
      <RecapBar />
      <QuestionView />
      <AnswerForm />
      <BottomControls />
    </div>
  )
}
