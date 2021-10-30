import React from 'react'
import { Question } from '../../utils/database'
import { createStyle } from '../../utils/style'
import CollapsibleText from '../Util/CollapsibleText'
import RenderedText from '../Util/RenderedText'

interface QuestionViewProps {
  question: Question
}

const textStyle = createStyle()

export default function QuestionView({ question }: QuestionViewProps) {
  if (!question)
    return <span style={textStyle}>No question to display ¯\_(ツ)_/¯</span>

  return (
    <div style={textStyle}>
      {question.track ? (
        <CollapsibleText
          label="mostra/nascondi traccia"
          longText={question.track}
        />
      ) : (
        <span />
      )}
      <RenderedText text={question.text}></RenderedText>
      <br />
      <br />
      <span>
        {question.attachments?.length
          ? 'TODO ' + question.attachments.join(', ')
          : ''}
      </span>
    </div>
  )
}
