import React from 'react'
import { links, members } from '../../utils/constants'
import { StyleSheet, theme } from '../../utils/style'
import telegramLogo from '../../static/telegram_logo.svg'

const styles = StyleSheet.create({
  p: {
    margin: '20px',
    textAlign: 'justify'
  },
  link: {
    color: theme.primary
  },
  liDiv: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center'
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
    <p style={styles.p}>
      Per poter essere ammessi alla scuola di Ingegneria del Politecnico di
      Milano (PoliMi), le aspiranti matricole devono superare il test di
      ammissione (TOL). Tra le risorse che il PoliMi offre gratuitamente per
      prepararsi troviamo: il Politest, raccolta di esercizi commentati e
      risolti, la DOL, una demo online con un numero ridotto di domande, e due
      test di prova (pdf con domande, xls con risposte esatte).
      <br />
      Ad oggi, non esiste una simulazione completa TOL via web, ovvero nello
      stesso ambiente in cui le future matricole svolgeranno il test di
      ammissione.
      <br />
      <br />
      TheTOLProject si è posto l'obbiettivo di creare una simulazione del TOL
      completa e gratuita, al fine di fornire alle aspiranti matricole un
      ambiente famigliare per esercitarsi, del tutto simile a quello che
      incontreranno al test di ammissione.
      <br />
      Il progetto è completamente gestito da studenti, dallo sviluppo
      dell'applicazione alla compilazione dei quesiti.
      <br />
      <br />
      <b>Gruppi di supporto</b>
      <br />
      Domande sui quesiti e la loro risoluzione:{' '}
      <a
        href={links.telegramPreparazioneTOL}
        target="_blank"
        rel="noreferrer noopener"
        style={styles.link}
      >
        Gruppo preparazione TOL di PoliNetwork
      </a>
      <br />
      Segnalazioni e domande relative al progetto (non sulla risoluzione dei
      quesiti):{' '}
      <a
        href={links.telegramTheTOLProject}
        target="_blank"
        rel="noreferrer noopener"
        style={styles.link}
      >
        Gruppo TheTOLProject
      </a>
      <br />
      <br />
      <b>Membri del progetto</b>
      <br />
      <ul>
        {members.map((m, i) => (
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
    </p>
  )
}
