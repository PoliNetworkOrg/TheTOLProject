import React, { useEffect, useState } from 'react'
import { getRandomQuestions, QuestionsData } from '../utils/database'
import ErrorView from './ErrorView'
import Header from './Header'
import QuestionsForm from './QuestionsForm/QuestionsForm'
import Separator from './Separator'

export default function App() {
  const [questions, loadQuestions] = useState<QuestionsData>()
  const [loadingError, showError] = useState<[string, Error] | []>([])

  useEffect(() => {
    if (questions)
      getRandomQuestions()
        .then(loadQuestions)
        .catch((e) => {
          showError([
            'There has been an issue while fetching the questions data. Please retry later.',
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
