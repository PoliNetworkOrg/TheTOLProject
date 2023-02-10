import Fraction from 'fraction.js'
import fromEntries from 'fromentries'
import {
  correctionWeight,
  getSectionName,
  sectionInfo,
  tengPassThreshold,
  testPassThreshold,
  testTotalScore
} from '../../utils/constants'
import { Question, QuestionsData, section } from '../../utils/database'
import { formatNumber, StyleSheet, theme } from '../../utils/style'
import { AnswersData } from '../App'
import Button from '../Util/Button'
import ExtendedCorrection from './ExtendedCorrection/ExtendedCorrection'

const styles = StyleSheet.create({
  div: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: '11pt'
  },
  tableDiv: {
    alignSelf: 'center',
    width: '100%',
    overflow: 'auto',
    display: 'flex'
  },
  table: { borderSpacing: 0, margin: 'auto' },
  tableCell: {
    padding: '5px',
    paddingInline: '10px',
    textAlign: 'center',
    border: `thin solid ${theme.lightBorder}`,
    borderSpacing: '0px',
    fontSize: '9.5pt'
  },
  get tableHeader() {
    return StyleSheet.compose(this.tableCell, {
      fontWeight: 'bold',
      backgroundColor: theme.lightBackground,
      textAlign: 'left'
    })
  },
  centeredText: {
    textAlign: 'center'
  },
  p: {
    padding: '10px',
    textAlign: 'justify'
  },
  resultTable: { display: 'flex', flexDirection: 'column' },
  h3: {
    marginBottom: 0,
    paddingInline: '10px'
  },
  restartDiv: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  restartTitle: {
    textAlign: 'center',
    maxWidth: 500
  },
  restartButton: {
    margin: '12px',
    marginBottom: '32px'
  }
})

interface InfoEndProps {
  answers: AnswersData
  questions: QuestionsData
}
export default function InfoEnd(props: InfoEndProps) {
  const { answers, questions } = props

  const correctionGrid = fromEntries(
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

  const roundedScore = parseInt(score.round(0).toString(0))
  const testPassed = roundedScore >= testPassThreshold,
    tengPassed = correctionGrid.ing?.correct >= tengPassThreshold

  const resultTable = () => (
    <div style={styles.resultTable}>
      <p style={styles.centeredText}>
        <br />
        TOL{' '}
        {testPassed
          ? `superato${!tengPassed ? ' (OFA TENG)' : ''}`
          : `non superato: OFA TEST${!tengPassed ? ' + OFA TENG' : ''}`}
        <br />
        Punteggio: {formatNumber(score)} / {formatNumber(testTotalScore)} (
        {formatNumber(score, true)})
      </p>
      <br />

      <div style={styles.tableDiv}>
        <table style={styles.table}>
          <tr>
            <td></td>
            <td style={styles.tableHeader}>Punteggio sezione</td>
            <td style={styles.tableHeader}>N° quesiti</td>
            <td style={styles.tableHeader}>Esatti</td>
            <td style={styles.tableHeader}>Errati</td>
            <td style={styles.tableHeader}>Senza risposta</td>
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
                <td style={styles.tableHeader}>{getSectionName(section)}</td>
                <td style={styles.tableCell}>
                  {formatNumber(correction.score, true)}
                </td>
                <td style={styles.tableCell}>{correction.total}</td>
                <td style={styles.tableCell}>{correction.correct}</td>
                <td style={styles.tableCell}>{correction.wrong}</td>
                <td style={styles.tableCell}>{correction.notGiven}</td>
              </tr>
            ))}
        </table>
      </div>
      <br />
    </div>
  )

  return (
    <div style={styles.div}>
      <div className="do-not-print">{resultTable()}</div>

      <ExtendedCorrection
        answers={props.answers}
        questions={props.questions}
        resultTable={resultTable()}
      />

      <div className="do-not-print">
        <h3 style={styles.h3}>Come viene calcolato il punteggio</h3>
        <p style={styles.p}>
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
                peso{' '}
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
        <div style={styles.restartDiv}>
          <h3 style={styles.restartTitle}>
            Ricordati di salvare i tuoi risultati prima di iniziare un nuovo
            test, o andranno persi!
          </h3>
          <Button
            label="Inizia un nuovo test"
            style={styles.restartButton}
            onClick={() => {
              window.location.reload()
            }}
          />
        </div>
      </div>
    </div>
  )
}
