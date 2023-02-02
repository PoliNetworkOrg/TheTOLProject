import { sectionInfo } from '../../utils/constants'
import { section, Database, Question } from '../../utils/database'
import { baseStyle } from '../../utils/style'
import GeneralPurposeCollapsible from '../Util/GeneralPurposeCollapsible'

import RenderedText from '../Util/RenderedText'

interface DBPreviewProps {
  db?: Database
}

export default function DBPreview({ db }: DBPreviewProps) {
  return db ? (
    <div>
      {(
        Object.entries(db).filter(([key]) => key != 'meta') as [
          section,
          Question[]
        ][]
      ).map(([key, questions]) => (
        <div key={key} style={baseStyle}>
          <GeneralPurposeCollapsible
            label={sectionInfo[key].name}
            startOpen={false}
          >
            <ul>
              {questions
                .filter((q) => q.text || key == 'com')
                .map((q) => (
                  <li key={key + q.id + (q.sub || '')}>
                    [{q.id}
                    {q.sub ? '-' + q.sub : ''}] <RenderedText text={q.text} />
                    <br />
                    <p>Valid: {q.validated + ''}</p>
                    {Object.entries(q.answers).map(([letter, text]) => (
                      <p key={letter}>
                        <span
                          style={{
                            visibility:
                              letter == q.correct ? 'visible' : 'hidden'
                          }}
                        >
                          →{' '}
                        </span>
                        <RenderedText text={text} />
                      </p>
                    ))}
                    <br />
                    <br />
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
