import { getImageURL, Question } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import CollapsibleText from '../Util/CollapsibleText'
import GeneralPurposeCollapsible from '../Util/GeneralPurposeCollapsible'
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

        {question.attachments?.length && (
          <GeneralPurposeCollapsible
            label="mostra/nascondi immagini"
            contentStyle={styles.collapsible}
          >
            {question.attachments.map((fileName, index) => (
              <span key={index + 1} style={styles.attachment}>
                <p style={styles.container}>Immagine {index + 1}:</p>
                <img src={getImageURL(fileName)} style={styles.image} />
              </span>
            ))}
          </GeneralPurposeCollapsible>
        )}
      </div>
    </div>
  )
}
