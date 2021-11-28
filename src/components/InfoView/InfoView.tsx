import React from 'react'
import { Navigate, useLocation } from 'react-router'
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
  const view = props.viewState[0],
    location = useLocation()

  if (location.pathname.endsWith('results') && view != 'INFO-end') {
    props.viewState[1]('INFO-start')
    return <Navigate to="/" />
  }

  return view == 'INFO-start' ? (
    <InfoStart
      startTest={() => {
        props.viewState[1]('TOL-testing')
      }}
    />
  ) : view == 'INFO-end' ? (
    <InfoEnd answers={props.answers} questions={props.questions} />
  ) : (
    <div />
  )
}
