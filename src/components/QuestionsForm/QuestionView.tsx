import React from 'react'
import { Question } from '../../utils/database'
import { createStyle } from '../../utils/style'
import RenderedText from '../Util/RenderedText'

interface QuestionViewProps {
  question: Question
}

const textStyle = createStyle()

export default function QuestionView({ question }: QuestionViewProps) {
  return (
    <div style={textStyle}>
      <RenderedText text={question.text}></RenderedText>
    </div>
  )
}
