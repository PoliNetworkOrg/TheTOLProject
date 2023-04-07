import { DATABASE_REF } from '../../utils/constants'
import { getImageURL, Question } from '../../utils/database'
import { StyleSheet } from '../../utils/style'
import GeneralPurposeCollapsible from './GeneralPurposeCollapsible'

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

interface Props {
  q: Question
  dbRef: DATABASE_REF
}

export default function QuestionAttachments({ q, dbRef }: Props) {
  return (
    <>
      {q.attachments?.length && (
        <GeneralPurposeCollapsible
          label="mostra/nascondi immagini"
          startOpen={false}
        >
          {q.attachments.map((fileName, index) => (
            <span key={index + 1} style={styles.attachment}>
              <p style={styles.container}>Immagine {index + 1}:</p>
              <img src={getImageURL(fileName, dbRef)} style={styles.image} />
            </span>
          ))}
        </GeneralPurposeCollapsible>
      )}
    </>
  )
}
