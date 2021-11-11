import React from 'react'
import { getImageURL, Question } from '../../utils/database'
import { createStyle } from '../../utils/style'
import CollapsibleText from '../Util/CollapsibleText'
import GeneralPurposeCollapsible from '../Util/GeneralPurposeCollapsible'
import RenderedText from '../Util/RenderedText'

const containerStyle = createStyle({
  marginBottom: '15px',
  display: 'flex'
})

const imageStyle = createStyle({
  maxHeight: '500px'
})

const questionStyle = createStyle({
  paddingInline: '7.5px'
})
interface QuestionViewProps {
  question: Question
}

export default function QuestionView({ question }: QuestionViewProps) {
  if (!question)
    return <span style={containerStyle}>No question to display ¯\_(ツ)_/¯</span>

  return (
    <div style={containerStyle}>
      {question.track ? (
        <CollapsibleText
          label="mostra/nascondi traccia"
          longText={question.track}
        />
      ) : (
        <span />
      )}
      <div style={questionStyle}>
        <RenderedText text={question.text}></RenderedText>
      </div>

      {question.attachments?.length && (
        <GeneralPurposeCollapsible label="mostra/nascondi allegati">
          {question.attachments.map((fileName, index) => (
            <span key={index + 1}>
              <p style={containerStyle}>Allegato {index + 1}:</p>
              <img src={getImageURL(fileName)} style={imageStyle} />
            </span>
          ))}
        </GeneralPurposeCollapsible>
      )}
    </div>
  )
}
