import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { links } from '../utils/constants'
import { MobileContext } from '../utils/contexts'
import { StyleSheet, theme } from '../utils/style'
import { view } from './App'

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
    textAlign: 'center',
    color: 'inherit',
    fontSize: '11pt'
  }
})

const mobileStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16
  },
  link: StyleSheet.compose(styles.link, {
    margin: 2
  })
})

export default function Footer(props: { view: view }) {
  const { mobile } = useContext(MobileContext)
  const linkStyle = mobile ? mobileStyles.link : styles.link
  return (
    <div style={mobile ? mobileStyles.container : styles.container}>
      <a
        href={links.githubSource}
        style={linkStyle}
        target="_blank"
        rel="noreferrer noopener"
      >
        Source
      </a>
      <Link to="about" style={linkStyle} replace>
        About
      </Link>
      <Link
        to="/"
        style={linkStyle}
        onClick={(e) => {
          if (props.view === 'INFO-end') {
            // reload the page if we are in the recap, easier then resetting the state
            e.preventDefault()
            window.location.reload()
          }
        }}
        replace
      >
        Home
      </Link>
      <Link to="license" style={linkStyle} replace>
        License
      </Link>
      <Link to="privacy" style={linkStyle} replace>
        Privacy & cookies
      </Link>
    </div>
  )
}
