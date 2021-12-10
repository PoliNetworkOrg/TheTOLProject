import React from 'react'
import { links, members } from '../../utils/constants'
import { StyleSheet, theme } from '../../utils/style'
import telegramLogo from '../../static/telegram_logo.svg'

const styles = StyleSheet.create({
  p: {
    margin: '20px',
    textAlign: 'justify'
  },
  centered: {
    textAlign: 'center'
  },
  link: {
    display: 'flex',
    color: theme.primary,
    gap: '5px',
    alignItems: 'center'
  },
  liDiv: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    flexDirection: 'row'
  },
  telegramLink: {
    display: 'flex'
  },
  telegramLogo: {
    height: '17.5px'
  }
})

export default function About() {
  return (
    <>
      <p style={styles.p}>
        Per poter essere ammessi alla scuola di Ingegneria del Politecnico di
        Milano (PoliMi), le aspiranti matricole devono superare il test di
        ammissione (TOL).
        <br />
        Tra le risorse che il PoliMi offre gratuitamente per prepararsi abbiamo:
        il Politest, una raccolta di esercizi commentati e risolti, la DOL, una
        demo online con un numero ridotto di domande, e due test di
        autovalutazione completi (pdf con domande, xls con risposte esatte).
        <br />
        <br />
        Non avevamo dunque una simulazione TOL completa e basata sul web, ovvero
        nello stesso ambiente in cui le future matricole sosterranno il test di
        ammissione.
        <br />
        Ci siamo posti l'obiettivo di creare una simulazione TOL completa e
        gratuita, al fine di fornire alle aspiranti matricole un ambiente
        familiare dove esercitarsi, molto simile a quello che incontreranno al
        test di ammissione.
        <br />
        Il progetto è completamente gestito dagli studenti, dallo sviluppo
        dell'applicazione web alla creazione delle domande TOL.
      </p>
      <p style={styles.centered}>---</p>
      <p style={styles.p}>
        In order to be admitted to the Engineering school of the Politecnico di
        Milano (PoliMi), the aspiring freshmen must pass the admission test
        (TOL).
        <br />
        Among the resources that PoliMi offers for free to prepare, you can
        find: the Politest, a collection of commented and solved exercises, the
        DOL, an online demo with a limited number of questions, and two complete
        self-assessment tests (pdf with questions, xls with exact answers).
        <br />
        <br />
        Thus, we did not have a complete, web-based TOL simulation, that is, in
        the same environment in which the future freshmen will take the
        admission test.
        <br />
        We have set ourself the goal of creating a complete and free TOL
        simulation, in order to provide aspiring freshmen with a familiar
        environment in which to practice, very similar to the one they will
        encounter at the admission test.
        <br />
        The project is fully managed by students, from developing the web
        application to creating the TOL questions.
      </p>
      <p style={styles.p}>
        <br />
        <b>Team del progetto (Project team)</b>
        <br />
        <ul>
          {members
            .filter((m) => !m.ah)
            .sort((a, b) =>
              a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
            )
            .map((m, i) => (
              <li key={i}>
                <div style={styles.liDiv}>
                  {m.name}{' '}
                  <a
                    href={`https://t.me/${m.tg}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={styles.telegramLink}
                  >
                    <img src={telegramLogo} style={styles.telegramLogo}></img>
                  </a>
                </div>
              </li>
            ))}
        </ul>
        Ad hoc:
        <ul>
          {members
            .filter((m) => !!m.ah)
            .sort((a, b) =>
              a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
            )
            .map((m, i) => (
              <li key={i}>
                <div style={styles.liDiv}>
                  {m.name}{' '}
                  <a
                    href={`https://t.me/${m.tg}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={styles.telegramLink}
                  >
                    <img src={telegramLogo} style={styles.telegramLogo}></img>
                  </a>
                </div>
              </li>
            ))}
        </ul>
        <br />
        <b>Gruppi di supporto (Support groups)</b>
        <ul>
          <li>
            <div style={styles.liDiv}>
              Segnalazioni e informazioni sul progetto (Project feedback &
              info):{' '}
              <a
                href={links.telegramTheTOLProject}
                target="_blank"
                rel="noreferrer noopener"
                style={styles.link}
              >
                The TOL Project{' '}
                <span style={styles.telegramLink}>
                  <img src={telegramLogo} style={styles.telegramLogo}></img>
                </span>
              </a>
            </div>
          </li>
          <li>
            <div style={styles.liDiv}>
              Quesiti TOL e loro risoluzione (TOL questions and their
              resolution):{' '}
              <a
                href={links.telegramPreparazioneTOL}
                target="_blank"
                rel="noreferrer noopener"
                style={styles.link}
              >
                Gruppo preparazione TOL{' '}
                <span style={styles.telegramLink}>
                  <img src={telegramLogo} style={styles.telegramLogo}></img>
                </span>
              </a>
            </div>
          </li>
        </ul>
      </p>
    </>
  )
}
