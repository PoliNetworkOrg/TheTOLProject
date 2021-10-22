import React from 'react'
import { categoryDict, getNextSection } from '../../utils/constants'
import { category, QuestionsData } from '../../utils/database'
import { createStyle } from '../../utils/style'
import { statePair } from '../../utils/types'
import { AnswersData, view } from '../App'
import Button from '../Util/Button'

const outerDiv = createStyle({
  display: 'flex',
  justifyContent: 'space-between'
})

const innerDiv = createStyle({
  display: 'flex',
  alignItems: 'baseline',
  flexDirection: 'row',
  gap: '15px',
  fontSize: '11pt'
})

interface TopControlsProps {
  sectionState: statePair<category>
  viewState: statePair<view>
  questions: QuestionsData
  answers: AnswersData
}

export default function TopControls(props: TopControlsProps) {
  const [currentSection, setSection] = props.sectionState

  return (
    <div style={outerDiv}>
      <div style={innerDiv}>
        <div>
          <p>
            Sezione: {categoryDict[currentSection]} <br />
            Riposte: {props.answers[currentSection].length} /{' '}
            {props.questions[currentSection].length} (
            {props.answers[currentSection].reduce(
              (acc, curr) => acc + (curr.flagged ? 1 : 0),
              0
            )}{' '}
            da rivedere)
          </p>
        </div>
        <Button
          label="Chiudi sezione"
          onClick={() => {
            const next = getNextSection(currentSection)
            if (next) setSection(next)
            else props.viewState[1]('TOL-end')
          }}
        />
      </div>
      <p>Placeholder: timer</p>
    </div>
  )
}
