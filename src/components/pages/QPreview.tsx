import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { DATABASE_REF } from '../../utils/constants'
import { MobileContext } from '../../utils/contexts'
import {
  Database,
  DatabaseStore,
  Question as IQuestion,
  Section,
  sheetDict
} from '../../utils/database'
import { baseStyle } from '../../utils/style'
import CollapsibleText from '../Util/CollapsibleText'
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

function DatabaseQ({ dbs }: Props) {
  const [dbRef, setDbRef] = useState<DATABASE_REF>(DATABASE_REF.STABLE)
  const db = useMemo(() => dbs?.[dbRef], [dbRef, dbs])

  const [section, setSection] = useState<Section>(sections[0].value)

  const ids = useMemo(() => {
    const list: string[] = []
    db?.[section]
      .filter((q) => q.id)
      .map((q) => {
        if (!list.includes(q.id)) list.push(q.id)
      })
    return list
  }, [db, section])

  const [id, setID] = useState(ids[0])

  useEffect(() => {
    if (!ids.includes(id)) setID(ids[0])
  }, [id, ids])

  if (!dbs || !db) return <div style={baseStyle}>Loading...</div>
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
      <QuestionRender id={id} section={section} db={db} dbRef={dbRef} />
    </div>
  )
}

interface QuestionRenderProps {
  id: string
  section: Section
  db: Database
  dbRef?: DATABASE_REF
}
function QuestionRender({ id, section, db, dbRef }: QuestionRenderProps) {
  const { mobile } = useContext(MobileContext)
  const gridTemplate = useMemo(
    () => (mobile ? '1fr min-content / 100%' : '1fr / 50% 50%'),
    [mobile]
  )

  const questions = useMemo(
    () =>
      db[section].filter((q) => {
        return q.id == id
      }),
    [id, section, db]
  )

  return questions.length !== 0 ? (
    <div
      style={{
        display: 'grid',
        gridTemplate
      }}
    >
      <div style={{ order: mobile ? 2 : 1 }}>
        {questions.map((q, idx) => (
          <>
            <Question
              q={q}
              isDebug
              showAttachments
              dbRef={dbRef}
              key={`${section}-${q.id}-${q.sub || 0}`}
            />
            {idx < questions.length - 1 && <hr />}
          </>
        ))}
      </div>
      <div style={{ order: mobile ? 1 : 2 }}>
        {questions[0].track && (
          <CollapsibleText
            label="mostra/nascondi brano"
            longText={questions[0].track}
          />
        )}
      </div>
    </div>
  ) : (
    <p>Question not found</p>
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
  const changeHelper =
    (stateSetter: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLTextAreaElement>) =>
      stateSetter(e.target.value)

  return (
    <div>
      <label>
        Testo:
        <br />
        <textarea value={text} onChange={changeHelper(setText)}></textarea>
        <textarea onChange={(e) => e} />
      </label>
      <br />

      <label>
        A:
        <br />
        <textarea value={a} onChange={changeHelper(setA)}></textarea>
      </label>
      <br />

      <label>
        B:
        <br />
        <textarea value={b} onChange={changeHelper(setB)}></textarea>
      </label>
      <br />

      <label>
        C:
        <br />
        <textarea value={c} onChange={changeHelper(setC)}></textarea>
      </label>
      <br />

      <label>
        D:
        <br />
        <textarea value={d} onChange={changeHelper(setD)}></textarea>
      </label>
      <br />

      <label>
        E:
        <br />
        <textarea value={e} onChange={changeHelper(setE)}></textarea>
      </label>
      <br />
      <br />
      <Question q={{ text, answers: { a, b, c, d, e } } as IQuestion} isDebug />
    </div>
  )
}
