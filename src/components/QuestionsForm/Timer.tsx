import React from 'react'
import { TimerResult } from 'react-timer-hook'
import { createStyle, theme } from '../../utils/style'
import { FiClock } from 'react-icons/fi'

const alertThreshold = 60

const containerStyle = createStyle({
  color: theme.timerGreen,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px'
})

const numbersStyle = createStyle({
  display: 'flex',
  fontWeight: 'bold',
  color: 'inherit',
  border: '2px solid',
  borderRadius: '4px',
  height: '1.75em',
  fontSize: '1.25em',
  alignItems: 'center',
  paddingInline: '10px'
})

const expiring = createStyle({
  color: theme.timerRed
})

const iconStyle = createStyle({
  color: 'inherit',
  height: '2.5em',
  width: 'auto'
})

const pStyle = createStyle({
  display: 'flex',
  fontSize: '0.75em',
  maxWidth: '12em',
  textAlign: 'left',
  wordWrap: 'normal'
})

interface TimerProps {
  timer: TimerResult
  expired: boolean
}
export default function Timer(props: TimerProps) {
  const { timer } = props

  return (
    <div
      style={{
        ...containerStyle,
        ...((timer.hours * 60 + timer.minutes) * 60 + timer.seconds <
          alertThreshold &&
        !(timer.hours + timer.minutes + timer.seconds == 0 && !props.expired)
          ? expiring
          : {})
      }}
    >
      <FiClock style={iconStyle} />
      <div style={numbersStyle}>
        {timer.hours.toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}
        :
        {timer.minutes.toLocaleString(undefined, {
          minimumIntegerDigits: 2
        })}
        :{timer.seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
      </div>
      <p style={pStyle}>
        Tempo rimanente
        <br /> per la sezione corrente
      </p>
    </div>
  )
}
