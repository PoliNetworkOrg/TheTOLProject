import { useEffect, useState } from 'react'
import {
  Route,
  createHashRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
  Navigate,
  useLocation
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
import Home from './pages/Home'
import About from './pages/About'
import Results from './pages/Results'
import License from './pages/License'
import Privacy from './pages/Privacy'
import QuestionsForm from './QuestionsForm/QuestionsForm'
import Separator from './Util/Separator'
import QPreview from './pages/QPreview'
import { MobileContext, TestProvider } from '../utils/contexts'
import { LocalStorage } from '../utils/storage'
import { DATABASE_REF, View } from '../utils/constants'
import { statePair } from '../utils/types'

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
  const [view, setView] = useState<View>('INFO-start')
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

  const initialiseTest = () => {
    if (!dbs) return
    setQuestions(selectRandomQuestions(dbs.stable))
    sectionState[1]('ing')
    answersState[1]({
      ing: [],
      mat: [],
      com: [],
      fis: []
    })
    timeRecordState[1]({})
  }

  useEffect(() => {
    // every time view changes from 'TOL-*' to 'INFO-start'
    // a new test is generated
    if (view === 'INFO-start') {
      initialiseTest()
    }
  }, [dbs, view])

  const router = createHashRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout viewState={[view, setView]} />}>
        <Route
          index
          element={
            // Don't ever think about moving this to an external component.
            <>
              <ErrorView
                hidden={!loadingError[0]}
                display={loadingError[0] || ''}
                internal={loadingError[1]}
              />
              {questions && <Home viewState={[view, setView]} />}
            </>
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
        <Route
          path="/results"
          element={
            questions && view === 'TOL-end' ? (
              <Results
                answers={answersState[0]}
                questions={questions as QuestionsData}
                viewState={[view, setView]}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
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
  viewState: statePair<View>
}
function Layout({ viewState }: LayoutProps) {
  const [view, setView] = viewState

  const location = useLocation()
  useEffect(() => {
    // navigating with the footer menu doesn't change the view value.
    // here it checks the pathname and change the view if results/test page
    if (
      !['/results', '/test'].includes(location.pathname) &&
      view.startsWith('TOL')
    ) {
      setView('INFO-start')
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
      {!['TOL-secRecap', 'TOL-testing'].includes(view) && (
        <Footer view={view} />
      )}
    </div>
  )
}
