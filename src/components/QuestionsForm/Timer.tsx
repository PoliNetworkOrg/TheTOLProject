import React from 'react'
import { TimerResult } from 'react-timer-hook'
import { StyleSheet, theme } from '../../utils/style'
import { FiClock } from 'react-icons/fi'

const alertThreshold = 60

const styles = StyleSheet.create({
  container: {
    color: theme.timerGreen,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '5px'
  },
  numbers: {
    display: 'flex',
    fontWeight: 'bold',
    color: 'inherit',
    border: '2px solid',
    borderRadius: '4px',
    height: '1.75em',
    fontSize: '1.25em',
    alignItems: 'center',
    paddingInline: '10px'
  },
  expiring: {
    color: theme.timerRed
  },
  icon: {
    color: 'inherit',
    height: '2.5em',
    width: 'auto'
  },
  p: {
    display: 'flex',
    fontSize: '0.75em',
    maxWidth: '12em',
    textAlign: 'left',
    wordWrap: 'normal'
  }
})

interface TimerProps {
  timer: TimerResult
}
export default function Timer(props: TimerProps) {
  const { timer } = props

  return (
    <div
      style={StyleSheet.compose(
        styles.container,
        (timer.hours * 60 + timer.minutes) * 60 + timer.seconds <
          alertThreshold && styles.expiring
      )}
    >
      <FiClock style={styles.icon} />
      <div style={styles.numbers}>
        {timer.hours.toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}
        :
        {timer.minutes.toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}
        :{timer.seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
      </div>
      <p style={styles.p}>
        Tempo rimanente
        <br /> per la sezione corrente
      </p>
    </div>
  )
}
