import React, { useEffect, useState } from 'react'
import {
  answerLetter,
  section,
  Database,
  QuestionsData,
  readDatabase,
  selectRandomQuestions
} from '../utils/database'
import DBPreview from './DBPreview'
import ErrorView from './ErrorView'
import Header from './Header'
import QuestionsForm from './QuestionsForm/QuestionsForm'
import Separator from './Util/Separator'

export type view =
  | 'dbPreview'
  | 'TOL-startSec'
  | 'TOL-testing'
  | 'TOL-secRecap'
  | 'TOL-end'

export interface Answer {
  id: string
  sub?: string
  letter: answerLetter | undefined
  flagged: boolean
}

export type AnswersData = Record<section, Answer[]>

export type TimeRecord = Partial<Record<section, number>>

export default function App() {
  const [database, loadDatabase] = useState<Database>()
  const [questions, selectQuestions] = useState<QuestionsData>()
  const [view, selectView] = useState<view>('dbPreview')
  const sectionState = useState<section>('ing')
  const answersState = useState<AnswersData>({
    ing: [],
    mat: [],
    com: [],
    fis: []
  })
  const timeRecordState = useState<TimeRecord>({})
  const [loadingError, showError] = useState<[string, Error] | []>([])

  useEffect(() => {
    if (!database)
      readDatabase()
        .then((db) => {
          loadDatabase(db)
          selectQuestions(selectRandomQuestions(db))
        })
        .catch((e) => {
          showError([
            'There has been an issue while fetching the database data. Please retry later.',
            e
          ])
        })
  })

  return (
    <div>
      <Header viewState={[view, selectView]} />
      <Separator text="Placeholder top separator text" />
      <ErrorView
        hidden={!loadingError[0]}
        display={loadingError[0] || ''}
        internal={loadingError[1]}
      />
      {view == 'dbPreview' && database ? (
        <DBPreview db={database} />
      ) : questions ? (
        <QuestionsForm
          answersState={answersState}
          questions={questions as QuestionsData}
          sectionState={sectionState}
          timeRecordState={timeRecordState}
          viewState={[view, selectView]}
        />
      ) : undefined}
      <Separator text="Placeholder bottom separator text" />
    </div>
  )
}
