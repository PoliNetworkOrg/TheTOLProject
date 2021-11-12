import React from 'react'
import { getImageURL, Question } from '../../utils/database'
import { createStyle } from '../../utils/style'
import CollapsibleText from '../Util/CollapsibleText'
import GeneralPurposeCollapsible from '../Util/GeneralPurposeCollapsible'
import RenderedText from '../Util/RenderedText'

const containerStyle = createStyle({
  marginBlock: 0,
  display: 'flex',
  flexDirection: 'column'
})

const collapsibleContentStyle = createStyle({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px'
})

const attachmentStyle = createStyle({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px'
})

const imageStyle = createStyle({
  maxHeight: '500px',
  width: 'fit-content'
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
          label="mostra/nascondi brano"
          longText={question.track}
        />
      ) : (
        <span />
      )}
      <RenderedText text={question.text}></RenderedText>

      {question.attachments?.length && (
        <GeneralPurposeCollapsible
          label="mostra/nascondi allegati"
          contentStyle={collapsibleContentStyle}
        >
          {question.attachments.map((fileName, index) => (
            <span key={index + 1} style={attachmentStyle}>
              <p style={containerStyle}>Allegato {index + 1}:</p>
              <img src={getImageURL(fileName)} style={imageStyle} />
            </span>
          ))}
        </GeneralPurposeCollapsible>
      )}
    </div>
  )
}
