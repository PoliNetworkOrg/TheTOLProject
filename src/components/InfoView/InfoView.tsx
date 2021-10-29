import React from 'react'
import { QuestionsData } from '../../utils/database'
import { statePair } from '../../utils/types'
import { AnswersData, view } from '../App'
import InfoEnd from './InfoEnd'

interface InfoViewProps {
  answers: AnswersData
  questions: QuestionsData
  viewState: statePair<view>
}
export default function InfoView(props: InfoViewProps) {
  const view = props.viewState[0]

  return view == 'INFO-start' ? (
    <div />
  ) : view == 'INFO-end' ? (
    <InfoEnd answers={props.answers} questions={props.questions} />
  ) : (
    <div />
  )
}
