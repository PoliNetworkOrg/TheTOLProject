import React from 'react'
import {
  getSectionName,
  sectionInfo,
  tengPassThreshold,
  testPassThreshold,
  testTotalScore
} from '../../utils/constants'
import { Question, QuestionsData, section } from '../../utils/database'
import { createStyle, theme } from '../../utils/style'
import { AnswersData } from '../App'

const divStyle = createStyle({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  fontSize: '11pt'
})

const tableDivStyle = createStyle({ alignSelf: 'center' })

const tableStyle = createStyle({ borderSpacing: 0 })

const tableCell = createStyle({
  padding: '5px',
  paddingInline: '10px',
  textAlign: 'center',
  border: `thin solid ${theme.lightBorder}`,
  borderSpacing: '0px',
  fontSize: '9.5pt'
})

const tableHeader = createStyle(tableCell, {
  fontWeight: 'bold',
  backgroundColor: theme.lightBackground,
  textAlign: 'left'
})

interface InfoEndProps {
  answers: AnswersData
  questions: QuestionsData
}
export default function InfoEnd(props: InfoEndProps) {
  const { answers, questions } = props

  const correctionGrid = Object.fromEntries(
    (Object.entries(questions) as [section, Question[]][]).map(
      ([section, secQuestions]) => {
        let correct = 0,
          notGiven = 0,
          wrong = 0

        secQuestions.forEach((q) => {
          const answer = answers[section].find(
            (a) => a && a.id == q.id && a.sub == q.sub
          )

          if (!answer || !answer.letter) notGiven++
          else if (answer.letter == q.correct) correct++
          else wrong++
        })

        return [
          section,
          {
            total: secQuestions.length,
            correct,
            notGiven,
            wrong
          }
        ]
      }
    )
  )

  const score =
    Math.round(
      (
        Object.entries(correctionGrid) as [
          section,
          typeof correctionGrid[string]
        ][]
      )
        .map(([section, correction]) =>
          correction.total
            ? ((correction.correct - 0.25 * correction.wrong) /
                correction.total) *
              sectionInfo[section].score
            : 0
        )
        .reduce((acc, curr) => acc + curr, 0) * 100
    ) / 100
  const testPassed = score >= testPassThreshold,
    tengPassed = correctionGrid.ing?.correct >= tengPassThreshold

  return (
    <div style={divStyle}>
      <p>La simulazione è finita, questo è il punteggio: </p>
      <div style={tableDivStyle}>
        <table style={tableStyle}>
          <tr>
            <td></td>
            <td style={tableHeader}>N° quesiti</td>
            <td style={tableHeader}>Esatti</td>
            <td style={tableHeader}>Errati</td>
            <td style={tableHeader}>Senza risposta</td>
          </tr>
          {(
            Object.entries(correctionGrid) as [
              section,
              typeof correctionGrid[section]
            ][]
          )
            .sort((a, b) => sectionInfo[a[0]].order - sectionInfo[b[0]].order)
            .map(([section, correction]) => (
              <tr key={section}>
                <td style={tableHeader}>{getSectionName(section)}</td>
                <td style={tableCell}>{correction.total}</td>
                <td style={tableCell}>{correction.correct}</td>
                <td style={tableCell}>{correction.wrong}</td>
                <td style={tableCell}>{correction.notGiven}</td>
              </tr>
            ))}
        </table>
      </div>
      <p>
        Punteggio calcolato: {score.toFixed(2)} / {testTotalScore}
      </p>
      <p>
        Esito:{' '}
        {testPassed
          ? `Superato${!tengPassed ? ' (OFA TENG)' : ''}`
          : `Non superato ${
              !tengPassed ? '(OFA TEST + OFA TENG)' : '(OFA TEST)'
            }`}
      </p>
    </div>
  )
}
