import React from 'react'
import { StyleSheet } from '../../utils/style'
import Button from '../Util/Button'

const styles = StyleSheet.create({
  div: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px',
    marginBlock: '16px'
  },
  centered: {
    textAlign: 'center',
    display: 'block'
  },
  buttonDiv: {
    margin: '16px'
  }
})

interface InfoStartProps {
  startTest: () => void
}
export default function InfoStart(props: InfoStartProps) {
  return (
    <div style={styles.div}>
      <p>
        <span style={styles.centered}>DISCLAIMER</span>
        <br />
        "The TOL Project" (Progetto) non è in alcun modo collegato al
        Politecnico di Milano ma è gestito gratuitamente da studenti. Gli autori
        del Progetto non si assumono alcuna responsabilità, né garantiscono
        espressamente o implicitamente l'accuratezza o l'affidabilità dei
        contenuti di questo sito ai fini del superamento del test di ammissione
        del Politecnico di Milano.
        <br />
        <br />
        <span style={styles.centered}>---</span>
        <br />
        "The TOL Project" (Project) is in no way connected to Politecnico di
        Milano but is managed free of charge by students. The authors of the
        Project do not assume any responsibility, nor do they expressly or
        implicitly guarantee the accuracy or reliability of the contents of this
        site for the purpose of passing the admission test at Politecnico di
        Milano.
      </p>
      <div style={styles.buttonDiv}>
        <Button label="Inizia il test" onClick={props.startTest} />
      </div>
    </div>
  )
}
