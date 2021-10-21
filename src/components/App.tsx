import React, { useEffect, useState } from 'react'
import {
  category,
  Database,
  QuestionsData,
  readDatabase,
  selectRandomQuestions
} from '../utils/database'
import ErrorView from './ErrorView'
import Header from './Header'
import QuestionsForm from './QuestionsForm/QuestionsForm'
import Separator from './Separator'

const sampleSize: Record<category, number> = {
  ing: 30,
  mat: 25,
  com: 1, // We're counting IDs, so it'll be only one (worth 5 questions)
  fis: 5
}

type view = 'dbPreview'

export default function App() {
  const [database, loadDatabase] = useState<Database>()
  const [questions, selectQuestions] = useState<QuestionsData>()
  const [view, selectView] = useState<view>('dbPreview')
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
      <Header />
      <Separator text="Placeholder top separator text" />
      <ErrorView
        hidden={!loadingError[0]}
        display={loadingError[0] || ''}
        internal={loadingError[1]}
      />
      {/* <p>App start</p> */}
      <QuestionsForm questions={questions} />
      {/* <p>App end</p> */}
      <Separator text="Placeholder bottom separator text" />
    </div>
  )
}
