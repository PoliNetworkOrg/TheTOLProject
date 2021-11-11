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
import { createStyle, formatNumber, theme } from '../../utils/style'
import { AnswersData } from '../App'
import GeneralPurposeCollapsible from '../Util/GeneralPurposeCollapsible'

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

const collapsibleStyle = createStyle({
  margin: '2px',
  padding: '10px',
  textAlign: 'justify'
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
                  {formatNumber(correction.score, true)}
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
        Punteggio calcolato: {formatNumber(score, true)} /{' '}
        {formatNumber(testTotalScore, true)}
        <br />
        Punteggio arrotondato: {formatNumber(score)} /{' '}
        {formatNumber(testTotalScore)}
        <br />
        Esito:{' '}
        {testPassed
          ? `Superato${!tengPassed ? ' (OFA TENG)' : ''}`
          : `Non superato ${
              !tengPassed ? '(OFA TEST + OFA TENG)' : '(OFA TEST)'
            }`}
      </p>

      <GeneralPurposeCollapsible
        label="Come viene calcolato il punteggio"
        startOpen={false}
      >
        <p style={collapsibleStyle}>
          Il <b>punteggio massimo</b> conseguibile{' '}
          <b>è di {formatNumber(testTotalScore, true)}</b> e viene espresso fino
          alla seconda cifra decimale.
          <br />
          L'attribuzione di <b>OFA TEST</b> (Obblighi Formativi Aggiunti)
          avviene quando il punteggio test, arrotondato all'intero più vicino,{' '}
          <b>è minore di {formatNumber(testPassThreshold)}</b>.<br />
          L'attribuzione di <b>OFA TENG</b> avviene quando, considerando la sola
          sezione di {sectionInfo.ing.name}, il numero di risposte corrette{' '}
          <b>è inferiore a {formatNumber(tengPassThreshold)}</b>.
          <br />
          <br />
          Il <b>punteggio</b> della prova viene calcolato attribuendo:
          <ul>
            <li>
              {formatNumber(correctionWeight.correct)} punto ad ogni risposta
              esatta
            </li>
            <li>
              {formatNumber(correctionWeight.wrong)} punti ad ogni risposta
              errata
            </li>
            <li>
              {formatNumber(correctionWeight.notGiven)} punti per ogni risposta
              non data
            </li>
          </ul>
          e assegnando
          <ul>
            {Object.entries(sectionInfo).map(([, info], index) => (
              <li key={index}>
                {info.name}: peso{' '}
                {typeof info.coeff == 'number'
                  ? formatNumber(info.coeff)
                  : info.coeff.toFraction()}{' '}
                ad ogni quesito di {info.name}
              </li>
            ))}
          </ul>
          Il <b>punteggio</b> complessivo viene arrotondato all'intero più
          vicino (es: il punteggio 59,49 viene arrotondato a 59, il punteggio
          59,50 a 60)
        </p>
      </GeneralPurposeCollapsible>
    </div>
  )
}
