import React from 'react'
import { Link } from 'react-router-dom'
import { createStyle, theme } from '../utils/style'

const containerStyle = createStyle({
  display: 'flex',
  justifyContent: 'space-between',
  paddingInline: '15em',
  margin: '15px',
  fontSize: '10pt',
  color: theme.softBlack
})

const linkStyle = createStyle({
  display: 'flex',
  flex: 1,
  justifyContent: 'center',
  color: 'inherit',
  textDecoration: 'none'
})

export default function Footer() {
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
      <Link to="about" style={linkStyle}>
        About
      </Link>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="license" style={linkStyle}>
        License
      </Link>
      <Link to="privacy" style={linkStyle}>
        Privacy & cookies
      </Link>
    </div>
  )
}
