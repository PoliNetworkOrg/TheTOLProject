import React, { useState } from 'react'
import { createStyle, theme } from '../utils/style'
import { statePair } from '../utils/types'
import Modal from './Util/Modal'

const containerStyle = createStyle({
  display: 'flex',
  justifyContent: 'center',
  margin: '15px',
  gap: '15px',
  fontSize: '10pt',
  color: theme.softBlack
})

const linkStyle = createStyle({
  color: 'inherit',
  textDecoration: 'none'
})

const textStyle = createStyle()

export default function Footer() {
  const aboutModalState = useState(false)
  const licenseModalState = useState(false)

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
      {About(aboutModalState)}
      {License(licenseModalState)}
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
