import { useEffect, useMemo, useState } from 'react'
import { DATABASE_REF } from '../../utils/constants'
import {
  DatabaseStore,
  Question as IQuestion,
  Section,
  sheetDict
} from '../../utils/database'
import { baseStyle } from '../../utils/style'
import Question from '../Util/Question'
import Select from '../Util/Select'

interface Props {
  dbs?: DatabaseStore
}
export default function QPreview(props: Props) {
  const [isCustom, setIsCustom] = useState(true)

  return (
    <div style={baseStyle}>
      <Select
        label="Question type"
        entries={[
          { value: 'custom', label: 'Custom' },
          { value: 'database', label: 'Database' }
        ]}
        defaultValue="custom"
        onChange={(v) => setIsCustom(v === 'custom')}
      />
      {isCustom ? <CustomQ /> : <DatabaseQ {...props} />}
    </div>
  )
}

const sections = Object.entries(sheetDict).map(([key, value]) => ({
  label: key,
  value
}))
const createID = (q: IQuestion) => q.id + (q.sub ? ' - ' + q.sub : '')

function DatabaseQ({ dbs }: Props) {
  if (!dbs) return <div style={baseStyle}>Loading...</div>
  const [dbRef, setDbRef] = useState<DATABASE_REF>(DATABASE_REF.STABLE)
  const db = useMemo(() => dbs[dbRef], [dbRef])

  const [section, setSection] = useState<Section>(sections[0].value)

  const ids = useMemo(
    () => db[section].filter((q) => q.id).map((q) => createID(q)),
    [db, section]
  )
  const [id, setID] = useState(ids[0])

  const question = useMemo(
    () =>
      db[section].find((q) => {
        const [i, s] = id.split(' - ')
        return q.id == i && (s ? q.sub == s : true)
      }),
    [id, section, db]
  )

  useEffect(() => {
    if (!ids.includes(id)) setID(ids[0])
  }, [ids])

  return (
    <div>
      <Select
        label="Database"
        entries={[
          { value: DATABASE_REF.STABLE, label: 'Production' },
          { value: DATABASE_REF.MAIN, label: 'Development' }
        ]}
        defaultValue={dbRef}
        onChange={(v) => setDbRef(v as DATABASE_REF)}
      />

      <Select
        label="Section"
        entries={sections}
        value={section}
        onChange={(v) => {
          setSection(v as Section)
        }}
      />

      <Select
        label="ID"
        entries={ids.map((id) => ({ label: id, value: id }))}
        value={id}
        onChange={setID}
      />

      {question ? (
        <QuestionRender q={question} dbRef={dbRef} />
      ) : (
        <p>Question not found</p>
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
      <QuestionRender q={{ text, answers: { a, b, c, d, e } } as IQuestion} />
    </div>
  )
}

interface QuestionRenderProps {
  q: IQuestion
  dbRef?: DATABASE_REF
}
function QuestionRender({ q, dbRef }: QuestionRenderProps) {
  return <Question q={q} isDebug showAttachments dbRef={dbRef} />
}
