import React from 'react'
import { Document, Page, View, Text } from '@react-pdf/renderer'
import FileHeader from './FileHeader'
import { Question, QuestionsData, section } from '../../../utils/database'
import { AnswersData } from '../../App'
import RenderedText from '../../Util/RenderedText'

interface ExtendedCorrectionProps {
  answers: AnswersData
  questions: QuestionsData
}
export default function ExtendedCorrection(props: ExtendedCorrectionProps) {
  return (
    <Document>
      <Page size="A4" wrap>
        <View fixed>
          <FileHeader />
        </View>
        {/* Map every section into a "break" view made by "unwrappable" questions with answers */}
        {(Object.entries(props.questions) as [section, Question[]][]).map(
          ([section, values], index) => (
            <View break={!!index} key={section}>
              <Text>{section}</Text>
              {values.map((question, index) => (
                <View key={question.id}>
                  <Text>
                    <RenderedText
                      text={`
                    ${index + 1}) [${question.id}
                    ${question.sub ? '-' + question.sub : ''}] ${question.text}
                    `.trim()}
                    />
                  </Text>
                  <Text>
                    {props.answers[section].find(
                      (a) => a?.id == question.id && a?.sub == question.sub
                    )?.letter == question.correct
                      ? 'GIUSTA'
                      : 'SBAGLIATA'}
                  </Text>
                </View>
              ))}
            </View>
          )
        )}
      </Page>
    </Document>
  )
}
