import { Question } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import CollapsibleText from '../Util/CollapsibleText'
import QuestionAttachments from '../Util/QuestionAttachments'
import RenderedText from '../Util/RenderedText'

const styles = StyleSheet.create({
  container: {
    marginBlock: 0,
    display: 'flex',
    flexDirection: 'column'
  },
  collapsible: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  attachment: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '5px'
  },
  image: {
    maxHeight: '500px',
    maxWidth: '100%',
    objectFit: 'contain'
  }
})

interface QuestionViewProps {
  question: Question
}

export default function QuestionView({ question }: QuestionViewProps) {
  if (!question)
    return (
      <span style={styles.container}>No question to display ¯\_(ツ)_/¯</span>
    )

  return (
    <div style={{ marginBottom: question.attachments?.length ? 0 : '15px' }}>
      {question.track && (
        <CollapsibleText
          label="mostra/nascondi brano"
          longText={question.track}
        />
      )}
      <div style={styles.container}>
        <RenderedText text={question.text}></RenderedText>
        <QuestionAttachments q={question} dbRef="stable" />
      </div>
    </div>
  )
}
