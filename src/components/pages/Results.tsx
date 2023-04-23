import Fraction from 'fraction.js'
import fromEntries from 'fromentries'
import {
  correctionWeight,
  getSectionName,
  sectionInfo,
  tengPassThreshold,
  testPassThreshold,
  testTotalScore,
  View
} from '../../utils/constants'
import { Question, QuestionsData, Section } from '../../utils/database'
import { formatNumber, StyleSheet, theme } from '../../utils/style'
import { AnswersData } from '../App'
import Button from '../Util/Button'
import ExtendedCorrection from '../ExtendCorrection/ExtendedCorrection'
import {
  unstable_useBlocker as useBlocker,
  useNavigate
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { statePair } from '../../utils/types'
import { Trans, useTranslation } from 'react-i18next'

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

interface ResultsProps {
  answers: AnswersData
  questions: QuestionsData
  viewState: statePair<View>
}
export default function Results(props: ResultsProps) {
  const [isResultSaved, setIsResultSaved] = useState(false)
  const blocker = useBlocker(!isResultSaved)
  const { t, i18n } = useTranslation()

  const navigate = useNavigate()
  const handleNewTest = () => {
    navigate('/', { replace: true })
  }

  const exit_warn = t('results.exitWarn')
  useEffect(() => {
    // set reload protection on first render
    window.onbeforeunload = () => exit_warn

    if (blocker.state === 'blocked' && !isResultSaved) {
      const confirmExit = confirm(exit_warn)
      if (confirmExit) {
        // user confirmed to leave the page
        // set onbeforeunload to null, otherwise the prompt is shown twice
        window.onbeforeunload = null
        props.viewState[1]('INFO-start')
        blocker.proceed?.()
      }
    }
  }, [blocker, blocker.location])

  const { answers, questions } = props

  const correctionGrid = fromEntries(
    (Object.entries(questions) as [Section, Question[]][]).map(
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
    Object.entries(correctionGrid) as [Section, typeof correctionGrid[string]][]
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
          ? `${t('results.testPassed')} ${!tengPassed ? ' (OFA TENG)' : ''}`
          : `${t('results.testFailed')}: OFA TEST${
              !tengPassed ? ' + OFA TENG' : ''
            }`}
        <br />
        {t('results.testPoints')}: {formatNumber(score)} /{' '}
        {formatNumber(testTotalScore)} ({formatNumber(score, true)})
      </p>
      <br />

      <div style={styles.tableDiv}>
        <table style={styles.table}>
          <tr>
            <td></td>
            <td style={styles.tableHeader}>{t('results.tableHeader1')}</td>
            <td style={styles.tableHeader}>{t('results.tableHeader2')}</td>
            <td style={styles.tableHeader}>{t('results.tableHeader3')}</td>
            <td style={styles.tableHeader}>{t('results.tableHeader4')}</td>
            <td style={styles.tableHeader}>{t('results.tableHeader5')}</td>
          </tr>
          {(
            Object.entries(correctionGrid) as [
              Section,
              typeof correctionGrid[Section]
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
        onSave={() => setIsResultSaved(true)}
      />

      <div className="do-not-print">
        <h3 style={styles.h3}>{t('results.pointsCalcTitle')}</h3>
        <p style={styles.p}>
          <Trans
            i18n={i18n}
            values={{
              v1: formatNumber(testTotalScore, true),
              v2: formatNumber(testPassThreshold),
              v3: sectionInfo.ing.name,
              v4: formatNumber(tengPassThreshold)
            }}
          >
            results.pointsCalcBody1
          </Trans>
          <Trans i18n={i18n}>{t('results.pointsCalcUl1')}</Trans>
          <ul>
            <li>
              <Trans
                i18n={i18n}
                values={{ v: formatNumber(correctionWeight.correct) }}
                count={correctionWeight.correct === 1 ? 1 : 2}
              >
                results.pointsCalcItem1
              </Trans>
            </li>
            <li>
              <Trans
                i18n={i18n}
                values={{ v: formatNumber(correctionWeight.wrong) }}
                count={correctionWeight.wrong === 1 ? 1 : 2}
              >
                results.pointsCalcItem2
              </Trans>
            </li>
            <li>
              <Trans
                i18n={i18n}
                values={{ v: formatNumber(correctionWeight.notGiven) }}
                count={correctionWeight.notGiven === 1 ? 1 : 2}
              >
                results.pointsCalcItem3
              </Trans>
            </li>
          </ul>
          {t('results.pointsCalcUl2')}
          <ul>
            {Object.entries(sectionInfo).map(([, info], index) => (
              <li key={index}>
                {typeof info.coeff == 'number'
                  ? formatNumber(info.coeff)
                  : info.coeff.toFraction()}
                <Trans
                  i18n={i18n}
                  values={{
                    sec: info.name
                  }}
                >
                  results.pointsCalcItem4
                </Trans>
              </li>
            ))}
          </ul>
          <Trans i18n={i18n}>results.pointsCalcBody2</Trans>
        </p>
        <div style={styles.restartDiv}>
          <h3 style={styles.restartTitle}>{t('results.saveReminder')}</h3>
          <Button
            label={t('results.homeBtn')}
            style={styles.restartButton}
            onClick={handleNewTest}
          />
        </div>
      </div>
    </div>
  )
}
