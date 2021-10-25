import React from 'react'
import { Question } from '../../utils/database'
import { createStyle } from '../../utils/style'
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
