import React from 'react'
import { getImageURL, Question } from '../../utils/database'
import { createStyle } from '../../utils/style'
import CollapsibleText from '../Util/CollapsibleText'
import GeneralPurposeCollapsible from '../Util/GeneralPurposeCollapsible'
import RenderedText from '../Util/RenderedText'

const textStyle = createStyle({
  marginBottom: '5px'
})

const imageStyle = createStyle({
  maxHeight: '500px'
})

interface QuestionViewProps {
  question: Question
}

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
      {question.attachments?.length && (
        <GeneralPurposeCollapsible label="mostra/nascondi allegati">
          {question.attachments.map((fileName, index) => (
            <span key={index + 1}>
              <p style={textStyle}>Allegato {index + 1}:</p>
              <img src={getImageURL(fileName)} style={imageStyle} />
            </span>
          ))}
        </GeneralPurposeCollapsible>
      )}
    </div>
  )
}
