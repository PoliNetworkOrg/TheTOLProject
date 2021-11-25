import React from 'react'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import { StyleSheet, theme } from '../utils/style'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingInline: '15em',
    margin: '15px',
    fontSize: '10pt',
    color: theme.softBlack
  },
  link: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    color: 'inherit',
    textDecoration: 'none'
  }
})

export default function Footer() {
  return (
    <div style={styles.container}>
      <a
        href={links.githubSource}
        style={styles.link}
        target="_blank"
        rel="noreferrer noopener"
      >
        Source
      </a>
      <Link to="about" style={styles.link}>
        About
      </Link>
      <Link to="/" style={styles.link}>
        Home
      </Link>
      <Link to="license" style={styles.link}>
        License
      </Link>
      <Link to="privacy" style={styles.link}>
        Privacy & cookies
      </Link>
    </div>
  )
}
