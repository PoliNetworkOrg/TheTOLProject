import { Question as IQuestion } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
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

interface Props {
  q: IQuestion
  isDebug?: boolean
  choice?: string
  isTest?: boolean
}

export default function Question({
  q,
  isDebug = false,
  choice = '',
  isTest = false
}: Props) {
  const id = q.sub ? `[${q.id}-${q.sub}] ` : `[${q.id}] `
  let result = 'Senza risposta'
  if (choice.length === 1) {
    result = choice === q.correct ? 'Corretta' : 'Errata'
  }

  return (
    <div style={styles.question}>
      <p style={{ margin: 4 }}>
        {isDebug && <span>{id}</span>}
        <RenderedText text={q.text} />
        {isTest && <span style={styles.result}>{result}</span>}
      </p>

      {isDebug && <p>Valid: {String(q.validated)}</p>}
      {Object.entries(q.answers).map(([letter, text]) => {
        const isCorrect = q.correct === letter
        const visibility = isCorrect ? 'visible' : 'hidden'
        return (
          <p
            key={letter}
            style={{
              ...styles.option,
              fontWeight: letter === choice ? 'bold' : 'normal'
            }}
          >
            <span style={{ visibility }}>→</span>
            <span>{letter.toUpperCase()}. </span>
            <RenderedText text={text} />
          </p>
        )
      })}
    </div>
  )
}
