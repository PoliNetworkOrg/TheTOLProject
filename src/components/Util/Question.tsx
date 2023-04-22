import { DATABASE_REF } from '../../utils/constants'
import { Question as IQuestion } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import QuestionAttachments from './QuestionAttachments'
import RenderedText from './RenderedText'

const styles = StyleSheet.create({
  question: {
    padding: 1
  },
  option: {
    display: 'flex',
    gap: 4,
    margin: 4
  },
  result: {
    textDecoration: 'underline',
    paddingTop: 4,
    display: 'block'
  }
})

const TickSign = () => <>&#10003;</>
const CrossSign = () => <>&#10007;</>

interface Props {
  q: IQuestion
  isDebug?: boolean
  choice?: string
  isTest?: boolean
  showAttachments?: boolean
  dbRef?: DATABASE_REF
}

export default function Question({
  q,
  isDebug = false,
  choice = '',
  isTest = false,
  showAttachments = false,
  dbRef = DATABASE_REF.STABLE
}: Props) {
  const id = q.id && (q.sub ? `[${q.id}-${q.sub}] ` : `[${q.id}] `)
  const valid = q.validated !== undefined && `Valid: ${String(q.validated)}`
  let result = 'Senza risposta'
  if (choice.length === 1) {
    result = choice === q.correct ? 'Corretta' : 'Errata'
  }

  return (
    <div style={styles.question}>
      <p style={{ margin: 4 }}>
        {isDebug && (
          <p>
            {id} {valid}
          </p>
        )}
        <RenderedText text={q.text} />
        {isTest && <span style={styles.result}>{result}</span>}
      </p>
      {showAttachments && <QuestionAttachments q={q} dbRef={dbRef} />}

      {Object.entries(q.answers).map(([letter, text]) => {
        const isCorrect = q.correct === letter
        const visibility = isCorrect || choice === letter ? 'visible' : 'hidden'
        return (
          <p key={letter} style={styles.option}>
            <span style={{ visibility }}>
              {isCorrect ? <TickSign /> : <CrossSign />}
            </span>
            <span>{letter.toUpperCase()}. </span>
            <RenderedText text={text} />
          </p>
        )
      })}
    </div>
  )
}
