import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { RibbonContainer, RightCornerRibbon } from 'react-ribbons'
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
import QPreview from './pages/QPreview'

import { MobileContext } from '../utils/contexts'

export type view = 'INFO-start' | 'TOL-testing' | 'TOL-secRecap' | 'INFO-end'

export interface Answer {
  id: string
  sub?: string
  letter: answerLetter | undefined
  flagged: boolean
}

export type AnswersData = Record<section, Answer[]>

export type TimeRecord = Partial<Record<section, number>>

const styles = StyleSheet.create({
  app: { paddingInline: '8px' },
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
  const [mobile, setMobile] = useState<boolean>(false)

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

    setMobile(window.innerWidth < 768)
    window.addEventListener('resize', () => {
      setMobile(window.innerWidth < 768)
    })
  }, [])

  const location = useLocation()

  useEffect(() => {
    const testPaths = ['/', '/test', '/results']
    const testingURL = testPaths.includes(location.pathname)
    if (!testingURL || view === 'INFO-start') {
      // in other pages or on the start of the test, the listener shouldn't be set
      window.onbeforeunload = null
    } else if (view.startsWith('TOL')) {
      // set the listener only if view is during a test, at the recap it is set in ExtendedCorrection.tsx
      window.onbeforeunload = () => {
        return 'Sicuro di voler uscire? Il test è ancora in corso'
      }
    }
  }, [view, location])

  return (
    <MobileContext.Provider value={{ mobile }}>
      <RibbonContainer>
        {window &&
          new URL(window.location.href).hostname ==
            'polinetworkorg.github.io' && (
            <RightCornerRibbon backgroundColor="#cc0000" color="white">
              DEV
            </RightCornerRibbon>
          )}
        <div style={styles.app}>
          <Header viewState={[view, setView]} />
          <Separator />
          <div style={styles.routeContainer}>
            <Routes>
              <Route
                path="/"
                element={
                  // Don't ever think about moving this to an external component.
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
              >
                <Route path="/test" element={<div />} />
                <Route path="/results" element={<div />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/license" element={<License />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/dbpreview" element={<DBPreview db={database} />} />
              <Route path="/qpreview" element={<QPreview />} />
            </Routes>
          </div>
          <Separator />
          {!view.startsWith('TOL') && view != 'INFO-end' && (
            <Footer view={view} />
          )}
        </div>
      </RibbonContainer>
    </MobileContext.Provider>
  )
}
