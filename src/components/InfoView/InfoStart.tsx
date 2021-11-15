import React from 'react'
import { createStyle } from '../../utils/style'
import Button from '../Util/Button'

const divStyle = createStyle({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '10px'
})

const centered = createStyle({
  textAlign: 'center',
  display: 'block'
})

interface InfoStartProps {
  startTest: () => void
}
export default function InfoStart(props: InfoStartProps) {
  return (
    <div style={divStyle}>
      <p>Paragrafo sullo scopo del progetto etc. etc.</p>
      <p>
        <span style={centered}>DISCLAIMER</span>
        "The TOL Project" (Progetto) non è in alcun modo collegato al
        Politecnico di Milano ma è gestito gratuitamente da studenti. Gli autori
        del Progetto non si assumono alcuna responsabilità, né garantiscono
        espressamente o implicitamente l'accuratezza o l'affidabilità dei
        contenuti di questo sito ai fini del superamento del test di ammissione
        del Politecnico di Milano.
        <span style={centered}>---</span>
        "The TOL Project" (Project) is in no way connected to Politecnico di
        Milano but is managed free of charge by students. The authors of the
        Project do not assume any responsibility, nor do they expressly or
        implicitly guarantee the accuracy or reliability of the contents of this
        site for the purpose of passing the admission test at Politecnico di
        Milano.
      </p>
      <div>
        <Button label="Inizia il test" onClick={props.startTest} />
      </div>
    </div>
  )
}
