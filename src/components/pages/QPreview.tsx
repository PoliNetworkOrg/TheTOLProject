import React, { useEffect, useState } from 'react'
import {
  Database,
  Question,
  readDatabase,
  section,
  sheetDict
} from '../../utils/database'
import { baseStyle } from '../../utils/style'
import RenderedText from '../Util/RenderedText'
import Select from '../Util/Select'

export default function QPreview() {
  const [questionType, setQuestionType] = useState('custom')

  return (
    <div style={baseStyle}>
      <Select
        label="Question type"
        entries={[
          { value: 'custom', label: 'Custom' },
          { value: 'database', label: 'Database' }
        ]}
        defaultValue={questionType}
        onChange={setQuestionType}
      />
      {questionType == 'custom' ? <CustomQ /> : <DatabaseQ />}
    </div>
  )
}

function DatabaseQ() {
  const [dbRef, setDbRef] = useState('main')
  const [dbs, setDbs] = useState({} as Record<string, Database | Error>)
  const [section, setSection] = useState('')
  const [id, setID] = useState('')

  useEffect(() => {
    if (!dbs[dbRef] && !(dbs.dbRef instanceof Error)) {
      readDatabase(dbRef)
        .then((db) => {
          setDbs({ ...dbs, [dbRef]: db })
        })
        .catch((e) => {
          setDbs({ ...dbs, [dbRef]: e })
        })
    }
  }, [dbRef])

  return (
    <div>
      <Select
        label="Database"
        entries={[
          { value: 'stable', label: 'Production' },
          { value: 'main', label: 'Development' }
        ]}
        defaultValue={dbRef}
        onChange={setDbRef}
      />
      <Select
        label="Section"
        entries={[
          ...Object.entries(sheetDict).map(([key, value]) => ({
            label: key,
            value
          })),
          ...(section ? [] : [{ label: '', value: '' }])
        ]}
        defaultValue={''}
        onChange={(v) => {
          setSection(v)
          setID('')
        }}
        disabled={!dbs[dbRef] || dbs[dbRef] instanceof Error}
      />
      <Select
        label="ID"
        entries={[
          ...(dbs[dbRef] && !(dbs[dbRef] instanceof Error) && section
            ? (dbs[dbRef] as Database)[section as section]
                .filter((q) => q.id)
                .map((q) => ({
                  label: q.id + (q.sub ? ' - ' + q.sub : ''),
                  value: q.id + (q.sub ? ' - ' + q.sub : '')
                }))
            : []),
          ...[{ label: '', value: '' }]
        ]}
        defaultValue={''}
        onChange={setID}
        disabled={!dbs[dbRef] || dbs[dbRef] instanceof Error || !section}
      />

      {!dbs[dbRef] ? (
        'Loading database...'
      ) : dbs[dbRef] instanceof Error ? (
        'Error while loading database:\n' + dbs[dbRef]
      ) : section && id ? (
        QuestionRender({
          q: (dbs[dbRef] as Database)[section as section].find((q) => {
            const [i, s] = id.split(' - ')
            return q.id == i && (s ? q.sub == s : true)
          })
        })
      ) : (
        <div />
      )}
    </div>
  )
}

function CustomQ() {
  const [text, setText] = useState('')
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [c, setC] = useState('')
  const [d, setD] = useState('')
  const [e, setE] = useState('')

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const t = (f: (..._: any[]) => any) => (e: any) => f(e.target.value)

  return (
    <div>
      <label>
        Testo:
        <br />
        <textarea value={text} onChange={t(setText)}></textarea>
      </label>
      <br />

      <label>
        A:
        <br />
        <textarea value={a} onChange={t(setA)}></textarea>
      </label>
      <br />

      <label>
        B:
        <br />
        <textarea value={b} onChange={t(setB)}></textarea>
      </label>
      <br />

      <label>
        C:
        <br />
        <textarea value={c} onChange={t(setC)}></textarea>
      </label>
      <br />

      <label>
        D:
        <br />
        <textarea value={d} onChange={t(setD)}></textarea>
      </label>
      <br />

      <label>
        E:
        <br />
        <textarea value={e} onChange={t(setE)}></textarea>
      </label>
      <br />
      <br />
      <QuestionRender q={{ text, answers: { a, b, c, d, e } } as Question} />
    </div>
  )
}

interface QuestionRenderProps {
  q?: Question
}
function QuestionRender(props: QuestionRenderProps) {
  const { q } = props

  return q ? (
    <div>
      <RenderedText text={q.text || q.sub || ''} />
      <br />
      <p>Valid: {q.validated + ''}</p>
      {Object.entries(q.answers).map(([letter, text]) => (
        <p key={letter}>
          <span
            style={{
              visibility: letter == q.correct ? 'visible' : 'hidden'
            }}
          >
            →{' '}
          </span>
          <RenderedText text={text} />
        </p>
      ))}
    </div>
  ) : (
    <div />
  )
}
