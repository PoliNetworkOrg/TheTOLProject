import React from 'react'
import { TimerResult } from 'react-timer-hook'
import { createStyle, theme } from '../../utils/style'

const alertThreshold = 60

const divStyle = createStyle({
  display: 'flex',
  fontWeight: 'bold',
  color: theme.timerGreen,
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

interface TimerProps {
  timer: TimerResult
  expired: boolean
}
export default function Timer(props: TimerProps) {
  const { timer } = props

  return (
    <div
      style={{
        ...divStyle,
        ...(timer.minutes * 60 + timer.seconds < alertThreshold &&
        !(timer.minutes + timer.seconds == 0 && !props.expired)
          ? expiring
          : {})
      }}
    >
      {timer.minutes.toLocaleString(undefined, { minimumIntegerDigits: 2 })}:
      {timer.seconds.toLocaleString(undefined, { minimumIntegerDigits: 2 })}
    </div>
  )
}
