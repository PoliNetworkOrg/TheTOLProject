import React from 'react'
import { category, Database, Question } from '../utils/database'

import RenderedText from './QuestionsForm/RenderedText'

interface DBPreviewProps {
  db: Database
}

export default function DBPreview({ db }: DBPreviewProps) {
  return (
    <div>
      {(
        Object.entries(db).filter(([key]) => key != 'meta') as [
          category,
          Question[]
        ][]
      ).map(([key, questions]) => (
        <div key={key}>
          <h3>Category: {key}</h3>
          <ul>
            {questions
              .filter((q) => q.text || key == 'com')
              .map((q) => (
                <div key={key + q.id}>
                  <RenderedText text={q.text} />
                  <br />
                  <p>Valid: {q.validated + ''}</p>
                  <br />
                  <RenderedText text={q.answers.a} />
                  <br />
                  <RenderedText text={q.answers.b} />
                  <br />
                  <RenderedText text={q.answers.c} />
                  <br />
                  <RenderedText text={q.answers.d} />
                  <br />
                  <RenderedText text={q.answers.e} />
                  <br />
                  <br />
                  <br />
                </div>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
