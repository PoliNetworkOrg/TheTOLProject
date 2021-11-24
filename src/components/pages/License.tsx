import React from 'react'
import { createStyle } from '../../utils/style'

const divStyle = createStyle({
  paddingBlock: '15px'
})

export function License() {
  return (
    <div style={divStyle}>
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
  )
}
