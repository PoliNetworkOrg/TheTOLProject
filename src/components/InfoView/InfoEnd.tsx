import Fraction from 'fraction.js'
import React from 'react'
import {
  correctionWeight,
  getSectionName,
  sectionInfo,
  tengPassThreshold,
  testPassThreshold,
  testTotalScore
} from '../../utils/constants'
import { Question, QuestionsData, section } from '../../utils/database'
import { createStyle, theme } from '../../utils/style'
import { AnswersData } from '../App'
import CollapsibleText from '../Util/CollapsibleText'
import ExtendedCorrection from './ExtendedCorrection/ExtendedCorrection'

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

const centeredTextStyle = createStyle({
  textAlign: 'center'
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

        const total = secQuestions.length,
          sample = sectionInfo[section].sample,
          sub = sectionInfo[section].sub || 1,
          weight = sectionInfo[section].coeff

        return [
          section,
          {
            total,
            correct,
            notGiven,
            wrong,
            weight,
            score: new Fraction(
              correctionWeight.correct * correct +
                correctionWeight.wrong * wrong +
                correctionWeight.notGiven * notGiven
            )
              .div(total)
              .mul(sample * sub)
          }
        ]
      }
    )
  )

  const score = (
    Object.entries(correctionGrid) as [section, typeof correctionGrid[string]][]
  )
    .map(([, correction]) => correction.score.mul(correction.weight))
    .reduce((acc, curr) => acc.add(curr), new Fraction(0))

  const testPassed = score.compare(testPassThreshold) >= 0,
    tengPassed = correctionGrid.ing?.correct >= tengPassThreshold

  return (
    <div style={divStyle}>
      <p>La simulazione è finita, questo è il risultato: </p>
      <div style={tableDivStyle}>
        <table style={tableStyle}>
          <tr>
            <td></td>
            <td style={tableHeader}>Punteggio sezione</td>
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
                <td style={tableCell}>
                  {correction.score.round(2).toString()}
                </td>
                <td style={tableCell}>{correction.total}</td>
                <td style={tableCell}>{correction.correct}</td>
                <td style={tableCell}>{correction.wrong}</td>
                <td style={tableCell}>{correction.notGiven}</td>
              </tr>
            ))}
        </table>
      </div>
      <p style={centeredTextStyle}>
        Punteggio calcolato: {score.round(2).toString()} / {testTotalScore}
        <br />
        Esito:{' '}
        {testPassed
          ? `Superato${!tengPassed ? ' (OFA TENG)' : ''}`
          : `Non superato ${
              !tengPassed ? '(OFA TEST + OFA TENG)' : '(OFA TEST)'
            }`}
      </p>
      <CollapsibleText
        label="Come viene calcolato il punteggio"
        startOpen={false}
        longText={`
      Per ogni sezione viene conteggiato ${
        correctionWeight.correct
      } per ogni risposta corretta, ${
          correctionWeight.wrong
        } per ogni risposta errata e ${
          correctionWeight.notGiven
        } per ogni risposta non data.
      Il punteggio complessivo della sezione viene poi pesato in base al numero di quesiti e al punteggio massimo ottenibile (rispetto all'intero test):
      ${Object.entries(sectionInfo)
        .map(
          ([, info]) =>
            `- ${info.name}: peso ${
              typeof info.coeff == 'number'
                ? info.coeff
                : info.coeff.toFraction()
            }`
        )
        .join('\n')}
      `}
      />

      <ExtendedCorrection answers={props.answers} questions={props.questions} />
    </div>
  )
}
