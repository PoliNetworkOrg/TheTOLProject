import React from 'react'
import { baseStyle } from '../../utils/style'

export default function Privacy() {
  return (
    <p style={baseStyle}>
      Questo sito utilizza un tracker non invasivo per tener traccia della sua
      performance, nel rispetto delle norme GDPR. Il sito non salva nessun
      cookie permanente: ogni dato trasmesso è in forma anonima e non
      riconducibile all'utente. Per maggiori informazioni, visita la pagina{' '}
      <a
        href="https://panelbear.com/cookie-free-analytics/"
        target="_blank"
        rel="noreferrer noopener"
      >
        "Cookie Free Website Analytics" di PanelBear
      </a>
      .
      <br />
      <br />
      This website uses a non-invasive tracker to keep track of its performance,
      complying with GDPR. The website does not store any permanent cookie:
      transmitted data is anonymized and not traceable to the user. For more
      info, check out{' '}
      <a
        href="https://panelbear.com/cookie-free-analytics/"
        target="_blank"
        rel="noreferrer noopener"
      >
        PanelBear's "Cookie Free Website Analytics"
      </a>{' '}
      web page.
    </p>
  )
}
