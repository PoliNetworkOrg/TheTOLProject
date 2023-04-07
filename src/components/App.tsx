import { useEffect, useState } from 'react'
import {
  Route,
  useLocation,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
  Navigate
} from 'react-router-dom'
import { RibbonContainer, RightCornerRibbon } from 'react-ribbons'
import {
  AnswerLetter,
  Section,
  QuestionsData,
  readDatabase,
  selectRandomQuestions,
  DatabaseStore
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

import { MobileContext, TestProvider } from '../utils/contexts'
import { LocalStorage } from '../utils/storage'
import { DATABASE_REF } from '../utils/constants'
import { statePair } from '../utils/types'

export type view = 'INFO-start' | 'TOL-testing' | 'TOL-secRecap' | 'INFO-end'

export interface Answer {
  id: string
  sub?: string
  letter: AnswerLetter | undefined
  flagged: boolean
}

export type AnswersData = Record<Section, Answer[]>

export type TimeRecord = Partial<Record<Section, number>>

const styles = StyleSheet.create({
  app: { paddingInline: '8px' },
  routeContainer: { paddingInline: '7.5px' }
})

export default function App() {
  const [dbs, setDbs] = useState<DatabaseStore>()
  const [questions, setQuestions] = useState<QuestionsData>()
  const [view, setView] = useState<view>('INFO-start')
  const sectionState = useState<Section>('ing')
  const answersState = useState<AnswersData>({
    ing: [],
    mat: [],
    com: [],
    fis: []
  })
  const timeRecordState = useState<TimeRecord>({})
  const [loadingError, showError] = useState<[string, Error] | []>([])
  const [mobile, setMobile] = useState<boolean>(false)

  async function loadDatabases() {
    try {
      const stable = await readDatabase(DATABASE_REF.STABLE)
      const main = await readDatabase(DATABASE_REF.MAIN)
      setDbs({
        [DATABASE_REF.STABLE]: stable,
        [DATABASE_REF.MAIN]: main
      })
      setQuestions(selectRandomQuestions(stable))
    } catch (e) {
      showError([
        'There has been an issue while fetching the database data. Please retry later.',
        e as Error
      ])
    }
  }

  useEffect(() => {
    LocalStorage.checkLastChange() // privacy check
    loadDatabases()

    setMobile(window.innerWidth < 768)
    window.addEventListener('resize', () => {
      setMobile(window.innerWidth < 768)
    })
  }, [])

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout viewState={[view, setView]} />}>
        <Route
          index
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
              ) : (
                <></>
              )}
            </div>
          }
        />
        <Route
          path="/test"
          element={
            questions && view.startsWith('TOL') ? (
              <QuestionsForm
                answersState={answersState}
                questions={questions as QuestionsData}
                sectionState={sectionState}
                timeRecordState={timeRecordState}
                viewState={[view, setView]}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="/results" element={<div />} />
        <Route path="/about" element={<About />} />
        <Route path="/license" element={<License />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/dbpreview" element={<DBPreview dbs={dbs} />} />
        <Route path="/qpreview" element={<QPreview dbs={dbs} />} />
      </Route>
    )
  )
  return (
    <MobileContext.Provider value={{ mobile }}>
      <TestProvider>
        <RibbonContainer>
          {window &&
            new URL(window.location.href).hostname ==
              'polinetworkorg.github.io' && (
              <RightCornerRibbon backgroundColor="#cc0000" color="white">
                DEV
              </RightCornerRibbon>
            )}
          <RouterProvider router={router} />
        </RibbonContainer>
      </TestProvider>
    </MobileContext.Provider>
  )
}

interface LayoutProps {
  viewState: statePair<view>
}
function Layout({ viewState }: LayoutProps) {
  const [view] = viewState
  const location = useLocation()
  const testPaths = ['/', '/test', '/results']

  useEffect(() => {
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
  }, [location])

  return (
    <div style={styles.app}>
      <Header viewState={viewState} />
      <Separator />
      <div style={styles.routeContainer}>
        <Outlet />
      </div>
      <Separator />
      {!view.startsWith('TOL') && view != 'INFO-end' && <Footer view={view} />}
    </div>
  )
}
