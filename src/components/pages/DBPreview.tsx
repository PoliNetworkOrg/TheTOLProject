import { sectionInfo } from '../../utils/constants'
import { section, Database, Question as IQuestion } from '../../utils/database'
import { baseStyle, StyleSheet } from '../../utils/style'
import GeneralPurposeCollapsible from '../Util/GeneralPurposeCollapsible'
import Question from '../Util/Question'

const styles = StyleSheet.create({
  ul: {
    margin: 10,
    paddingLeft: 16
  }
})

interface DBPreviewProps {
  db?: Database
}

export default function DBPreview({ db }: DBPreviewProps) {
  return db ? (
    <div>
      {(
        Object.entries(db).filter(([key]) => key != 'meta') as [
          section,
          IQuestion[]
        ][]
      ).map(([key, questions]) => (
        <div key={key} style={baseStyle}>
          <GeneralPurposeCollapsible
            label={sectionInfo[key].name}
            startOpen={false}
          >
            <ul style={styles.ul}>
              {questions
                .filter((q) => q.text || key == 'com')
                .map((q) => (
                  <li key={key + q.id + (q.sub || '')}>
                    <Question q={q} isDebug={true} showAttachments />
                  </li>
                ))}
            </ul>
          </GeneralPurposeCollapsible>
        </div>
      ))}
    </div>
  ) : (
    <div style={baseStyle}>Loading...</div>
  )
}
