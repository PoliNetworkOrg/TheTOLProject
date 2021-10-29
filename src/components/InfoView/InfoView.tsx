import React from 'react'
import { QuestionsData } from '../../utils/database'
import { statePair } from '../../utils/types'
import { AnswersData, view } from '../App'
import InfoEnd from './InfoEnd'
import InfoStart from './InfoStart'

interface InfoViewProps {
  answers: AnswersData
  questions: QuestionsData
  viewState: statePair<view>
}
export default function InfoView(props: InfoViewProps) {
  const view = props.viewState[0]

  return view == 'INFO-start' ? (
    <InfoStart
      startTest={() => {
        props.viewState[1]('TOL-startSec')
      }}
    />
  ) : view == 'INFO-end' ? (
    <InfoEnd answers={props.answers} questions={props.questions} />
  ) : (
    <div />
  )
}
