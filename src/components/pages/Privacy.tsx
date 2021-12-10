import React from 'react'
import { links } from '../../utils/constants'
import { StyleSheet } from '../../utils/style'

const styles = StyleSheet.create({
  p: { paddingBlock: '15px' },
  centered: {
    textAlign: 'center',
    display: 'block'
  }
})

export default function Privacy() {
  return (
    <p style={styles.p}>
      Questo sito utilizza un tracker non invasivo per tener traccia della sua
      performance, nel rispetto delle norme GDPR. Il sito non salva nessun
      cookie permanente: ogni dato trasmesso è in forma anonima e non
      riconducibile all'utente. Per maggiori informazioni, visita la pagina{' '}
      <a
        href={links.privacyPanelbear}
        target="_blank"
        rel="noreferrer noopener"
      >
        "Cookie Free Website Analytics" di PanelBear
      </a>
      .
      <br />
      <br />
      <span style={styles.centered}>---</span>
      <br />
      This website uses a non-invasive tracker to keep track of its performance,
      complying with GDPR. The website does not store any permanent cookie:
      transmitted data is anonymized and not traceable to the user. For more
      info, check out{' '}
      <a
        href={links.privacyPanelbear}
        target="_blank"
        rel="noreferrer noopener"
      >
        PanelBear's "Cookie Free Website Analytics"
      </a>{' '}
      web page.
    </p>
  )
}
