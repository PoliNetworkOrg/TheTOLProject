import { useContext } from 'react'
import { Link } from 'react-router-dom'
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
    fontSize: '11pt',
    alignItems: 'center'
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
    <div
      className="do-not-print"
      style={mobile ? mobileStyles.container : styles.container}
    >
      <a
        href={links.githubSource}
        style={linkStyle}
        target="_blank"
        rel="noreferrer noopener"
      >
        Source
      </a>
      <Link to="about" style={linkStyle}>
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
      >
        Home
      </Link>
      <Link to="license" style={linkStyle}>
        License
      </Link>
      <Link to="privacy" style={linkStyle}>
        Privacy & Cookies
      </Link>
    </div>
  )
}
