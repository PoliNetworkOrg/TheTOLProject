import React, { useEffect, useState } from 'react'
import {
  answerLetter,
  category,
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

const sampleSize: Record<category, number> = {
  ing: 30,
  mat: 25,
  com: 1, // We're counting IDs, so it'll be only one (worth 5 questions)
  fis: 5
}

export type view = 'dbPreview' | 'TOL-startSec' | 'TOL-end'

interface Answer {
  id: number
  sub?: number
  letter: answerLetter | '?'
  flagged: boolean
}

export type AnswersData = Record<category, Answer[]>

export default function App() {
  const [database, loadDatabase] = useState<Database>()
  const [questions, selectQuestions] = useState<QuestionsData>()
  const [view, selectView] = useState<view>('dbPreview')
  const sectionState = useState<category>('ing')
  const answersState = useState<AnswersData>({
    ing: [],
    mat: [],
    com: [],
    fis: []
  })
  const [loadingError, showError] = useState<[string, Error] | []>([])

  useEffect(() => {
    if (!database)
      readDatabase()
        .then((db) => {
          loadDatabase(db)
          selectQuestions(selectRandomQuestions(db, sampleSize))
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
      {/* <p>App start</p> */}

      {view == 'dbPreview' && database ? (
        <DBPreview db={database} />
      ) : questions ? (
        <QuestionsForm
          questions={questions as QuestionsData}
          viewState={[view, selectView]}
          sectionState={sectionState}
          answersState={answersState}
        />
      ) : undefined}
      {/* <p>App end</p> */}
      <Separator text="Placeholder bottom separator text" />
    </div>
  )
}
