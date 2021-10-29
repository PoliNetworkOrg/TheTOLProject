import React from 'react'
import Button from '../Util/Button'

interface InfoStartProps {
  startTest: () => void
}
export default function InfoStart(props: InfoStartProps) {
  return (
    <div>
      <p>
        Questa è una serie di informazioni veramente interessanti sulla demo,
        che prima o poi mi metterò a scrivere
      </p>
      <Button label="Inizia il test" onClick={props.startTest} />
    </div>
  )
}
