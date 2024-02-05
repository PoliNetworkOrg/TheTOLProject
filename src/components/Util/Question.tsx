import { DATABASE_REF } from '../../utils/constants'
import { Question as IQuestion } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import QuestionAttachments from './QuestionAttachments'
import RenderedText from './RenderedText'
import { FaAnchor } from 'react-icons/fa'

const styles = StyleSheet.create({
  question: {
    padding: 1
  },
  option: {
    display: 'flex',
    gap: 8,
    margin: '4px 0'
  },
  result: {
    textDecoration: 'underline',
    paddingTop: 4,
    display: 'block'
  },
  icon: {
    width: '10px',
    height: '10px'
  },
  tagsContainer: {
    borderTop: '1px solid #b1b1b1',
    borderBottom: '1px solid #b1b1b1',
    borderColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    marginTop: 16,
    padding: '12px 0',
    gap: 8
  },
  tags: {
    margin: 0,
    fontStyle: 'italic'
  }
})

const TickSign = () => <>&#10003;</>
const CrossSign = () => <>&#10005;</>

interface Props {
  q: IQuestion
  isDebug?: boolean
  choice?: string
  isTest?: boolean
  showAttachments?: boolean
  dbRef?: DATABASE_REF
}

const TEST_TAGS = ['combinazioni e coefficienti binomiali', 'permutazioni']

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
            <span style={{ visibility, ...styles.icon }}>
              {isCorrect ? <TickSign /> : <CrossSign />}
            </span>
            <span>{letter.toUpperCase()}. </span>
            <RenderedText text={text} />
          </p>
        )
      })}

      <div style={styles.tagsContainer}>
        <FaAnchor />
        <p style={styles.tags}>{concatTags(TEST_TAGS)}</p>
      </div>
    </div>
  )
}

function concatTags(tagsArr: string[]): string {
  return tagsArr
    .map((tag, i) => {
      const isFirstTag = i === 0
      const isLastTag = i === tagsArr.length - 1
      if (isFirstTag) return `${tag[0].toUpperCase()}${tag.slice(1)}; `
      if (isLastTag) return `${tag}.`
      return `${tag}; `
    })
    .join('')
}
