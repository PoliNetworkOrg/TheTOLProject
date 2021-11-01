import React from 'react'
import { createStyle } from '../../utils/style'
import Button from '../Util/Button'

const divStyle = createStyle({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px'
})

interface InfoStartProps {
  startTest: () => void
}
export default function InfoStart(props: InfoStartProps) {
  return (
    <div style={divStyle}>
      <p>
        Questa è una serie di informazioni veramente interessanti sulla demo,
        che prima o poi mi metterò a scrivere
      </p>
      <div>
        <Button label="Inizia il test" onClick={props.startTest} />
      </div>
    </div>
  )
}
