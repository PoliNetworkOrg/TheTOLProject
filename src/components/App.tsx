import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import {
  answerLetter,
  section,
  Database,
  QuestionsData,
  readDatabase,
  selectRandomQuestions
} from '../utils/database'
import { StyleSheet } from '../utils/style'
import DBPreview from './pages/DBPreview'
import ErrorView from './ErrorView'
import Footer from './Footer'
import Header from './Header'
import InfoView from './InfoView/InfoView'
import About from './pages/About'
import { License } from './pages/License'
import Privacy from './pages/Privacy'
import QuestionsForm from './QuestionsForm/QuestionsForm'
import Separator from './Util/Separator'

export type view =
  | 'INFO-start'
  | 'TOL-startSec'
  | 'TOL-testing'
  | 'TOL-secRecap'
  | 'INFO-end'

export interface Answer {
  id: string
  sub?: string
  letter: answerLetter | undefined
  flagged: boolean
}

export type AnswersData = Record<section, Answer[]>

export type TimeRecord = Partial<Record<section, number>>

const styles = StyleSheet.create({
  routeContainer: { paddingInline: '7.5px' }
})

export default function App() {
  const [database, loadDatabase] = useState<Database>()
  const [questions, setQuestions] = useState<QuestionsData>()
  const [view, setView] = useState<view>('INFO-start')
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
          setQuestions(selectRandomQuestions(db))
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
      <Header viewState={[view, setView]} />
      <Separator />
      <div style={styles.routeContainer}>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <ErrorView
                  hidden={!loadingError[0]}
                  display={loadingError[0] || ''}
                  internal={loadingError[1]}
                />
                {view.startsWith('TOL') && questions ? (
                  <QuestionsForm
                    answersState={answersState}
                    questions={questions as QuestionsData}
                    sectionState={sectionState}
                    timeRecordState={timeRecordState}
                    viewState={[view, setView]}
                  />
                ) : view.startsWith('INFO') && questions ? (
                  <InfoView
                    answers={answersState[0]}
                    questions={questions}
                    viewState={[view, setView]}
                  />
                ) : undefined}
              </div>
            }
          />
          <Route path="about" element={<About />} />
          <Route path="license" element={<License />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="dbpreview" element={<DBPreview db={database} />} />
        </Routes>
      </div>
      <Separator />
      {!view.startsWith('TOL') && <Footer />}
    </div>
  )
}
