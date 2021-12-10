import React from 'react'
import { links } from '../../utils/constants'
import { StyleSheet } from '../../utils/style'

const styles = StyleSheet.create({
  div: {
    paddingBlock: '15px'
  },
  centered: {
    textAlign: 'center'
  },
  licenseImg: {
    borderWidth: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  }
})

export function License() {
  return (
    <div style={styles.div}>
      <a
        rel="license noreferrer noopener"
        href="http://creativecommons.org/licenses/by-sa/4.0/"
        target="_blank"
      >
        <img
          alt="Creative Commons License"
          style={styles.licenseImg}
          src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
        />
      </a>
      <p>
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
        è rilasciato sotto una licenza{' '}
        <a
          rel="license noreferrer noopener"
          href="http://creativecommons.org/licenses/by-sa/4.0/"
          target="_blank"
        >
          Creative Commons Attribution-ShareAlike 4.0 International License
        </a>
        . Permessi che vanno oltre l'ambito di questa licenza posso essere
        disponibili{' '}
        <a
          {...{ 'xmlns:cc': 'http://creativecommons.org/ns#' }}
          href={links.githubLicense}
          rel="cc:morePermissions noreferrer noopener"
          target="_blank"
        >
          qui
        </a>
        .
      </p>
      <p style={styles.centered}>---</p>
      <p>
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
        . Permissions beyond the scope of this license may be available{' '}
        <a
          {...{ 'xmlns:cc': 'http://creativecommons.org/ns#' }}
          href={links.githubLicense}
          rel="cc:morePermissions noreferrer noopener"
          target="_blank"
        >
          here
        </a>
        .
      </p>
    </div>
  )
}
