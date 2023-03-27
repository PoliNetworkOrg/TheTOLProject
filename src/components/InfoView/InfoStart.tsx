import { useContext } from 'react'
import Collapsible from 'react-collapsible'
import { TestContext } from '../../utils/contexts'
import { StyleSheet } from '../../utils/style'
import Button from '../Util/Button'
import Wrapper from '../Util/Wrapper'

const styles = StyleSheet.create({
  centered: {
    display: 'block'
  },
  buttonDiv: {
    margin: '16px',
    display: 'flex',
    fontSize: 14,
    gap: 6
  }
})

interface InfoStartProps {
  startTest: () => void
}
export default function InfoStart({ startTest }: InfoStartProps) {
  const { isDsa, toggleDsa } = useContext(TestContext)
  return (
    <Wrapper>
      <p>
        <span style={styles.centered}>
          <b>DISCLAIMER</b>
        </span>
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
        <Button
          style={{ fontSize: 14 }}
          label="Inizia il test"
          onClick={startTest}
        />
        <label htmlFor="dsa_toggle" style={{ userSelect: 'none' }}>
          <input
            id="dsa_toggle"
            type="checkbox"
            checked={isDsa}
            onChange={toggleDsa}
          />
          Studente con DSA
        </label>
      </div>
      <Collapsible trigger={<></>} open={isDsa} transitionTime={150}>
        <p>
          Gli studenti con Disturbi Specifici dell'Apprendimento (DSA) che
          affrontano il TOL, possono usufruire di un tempo supplementare pari al
          30%, previa segnalazione in fase di iscrizione al test. <br />È
          inoltre richiesta una certificazione attestante la diagnosi di DSA.{' '}
          <br />
          Selezionando "Studente con DSA" viene applicato il tempo bonus anche
          in questa simulazione.
        </p>
      </Collapsible>
    </Wrapper>
  )
}
