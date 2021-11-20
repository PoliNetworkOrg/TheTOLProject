import React, { useState } from 'react'
import { createStyle, theme } from '../utils/style'
import { statePair } from '../utils/types'
import Modal from './Util/Modal'

const containerStyle = createStyle({
  display: 'flex',
  justifyContent: 'center',
  margin: '15px',
  gap: '50px',
  fontSize: '10pt',
  color: theme.softBlack
})

const linkStyle = createStyle({
  color: 'inherit',
  textDecoration: 'none'
})

const textStyle = createStyle()

export default function Footer() {
  const aboutModalState = useState(false),
    licenseModalState = useState(false),
    privacyModalState = useState(false)

  return (
    <div style={containerStyle}>
      <a
        href="https://github.com/PoliNetworkOrg/TheTOLProject/"
        style={linkStyle}
        target="_blank"
        rel="noreferrer noopener"
      >
        Source
      </a>
      <a href="#" style={linkStyle} onClick={() => aboutModalState[1](true)}>
        About
      </a>
      <a href="#" style={linkStyle} onClick={() => licenseModalState[1](true)}>
        License
      </a>
      <a href="#" style={linkStyle} onClick={() => privacyModalState[1](true)}>
        Privacy
      </a>
      {About(aboutModalState)}
      {License(licenseModalState)}
      {Privacy(privacyModalState)}
    </div>
  )
}

function About(state: statePair<boolean>) {
  return (
    <Modal openState={state}>
      <p style={textStyle}>This a paragraph about the project.</p>
    </Modal>
  )
}

function License(state: statePair<boolean>) {
  return (
    <Modal openState={state}>
      <div style={textStyle}>
        <a
          rel="license noreferrer noopener"
          href="http://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
        >
          <img
            alt="Creative Commons License"
            style={{
              borderWidth: 0,
              marginLeft: 'auto',
              marginRight: 'auto',
              display: 'block'
            }}
            src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
          />
        </a>
        <br />
        <span
          {...{ 'xmlns:dct': 'http://purl.org/dc/terms/' }}
          property="dct:title"
        >
          TheTOLProject
        </span>{' '}
        by{' '}
        <a
          {...{ 'xmlns:cc': 'http://creativecommons.org/ns#' }}
          href="https://polinetwork.github.io/it/projects/"
          property="cc:attributionName"
          rel="cc:attributionURL noreferrer noopener"
          target="_blank"
        >
          PoliNetwork
        </a>{' '}
        is licensed under a{' '}
        <a
          rel="license noreferrer noopener"
          href="http://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
        >
          Creative Commons Attribution-ShareAlike 4.0 International License
        </a>
        .<br />
        <br />
        Permissions beyond the scope of this license may be available at{' '}
        <a
          {...{ 'xmlns:cc': 'http://creativecommons.org/ns#' }}
          href="https://github.com/PoliNetworkOrg/TheTOLProject/blob/main/LICENSE"
          rel="cc:morePermissions noreferrer noopener"
          target="_blank"
        >
          https://github.com/PoliNetworkOrg/TheTOLProject/blob/main/LICENSE
        </a>
      </div>
    </Modal>
  )
}

function Privacy(state: statePair<boolean>) {
  return (
    <Modal openState={state}>
      <p style={textStyle}>
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
        This website uses a non-invasive tracker to keep track of its
        performance, complying with GDPR. The website does not store any
        permanent cookie: transmitted data is anonymized and not traceable to
        the user. For more info, check out{' '}
        <a
          href="https://panelbear.com/cookie-free-analytics/"
          target="_blank"
          rel="noreferrer noopener"
        >
          PanelBear's "Cookie Free Website Analytics"
        </a>{' '}
        web page.
      </p>
    </Modal>
  )
}
