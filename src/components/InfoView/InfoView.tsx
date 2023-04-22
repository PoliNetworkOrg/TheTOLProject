import { Navigate, useLocation, useNavigate } from 'react-router'
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
  const [view, setView] = props.viewState,
    location = useLocation(),
    navigate = useNavigate()

  if (
    (location.pathname == '/test' && !view.startsWith('TOL')) ||
    (location.pathname == '/results' && view != 'INFO-end')
  ) {
    setView('INFO-start')
    return <Navigate to="/" replace />
  }

  return view == 'INFO-start' ? (
    <InfoStart
      startTest={() => {
        setView('TOL-testing')
        navigate('/test')
        // insert new tracker here
        // .track('TestStart')
      }}
    />
  ) : view == 'INFO-end' ? (
    <InfoEnd answers={props.answers} questions={props.questions} />
  ) : (
    <div />
  )
}
