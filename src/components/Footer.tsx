import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { links, View } from '../utils/constants'
import { MobileContext } from '../utils/contexts'
import { StyleSheet, theme } from '../utils/style'

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingInline: '15em',
    margin: '15px auto',
    fontSize: '10pt',
    color: theme.softBlack,
    width: '100%',
    maxWidth: 900
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

interface Props {
  view: View
}
export default function Footer({ view }: Props) {
  const { mobile } = useContext(MobileContext)
  const linkStyle = mobile ? mobileStyles.link : styles.link
  const replace = view.startsWith('TOL')
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
      <Link to="about" style={linkStyle} replace={replace}>
        About
      </Link>
      <Link to="/" style={linkStyle} replace={replace}>
        Home
      </Link>
      <Link to="license" style={linkStyle} replace={replace}>
        License
      </Link>
      <Link to="privacy" style={linkStyle} replace={replace}>
        Privacy & Cookies
      </Link>
    </div>
  )
}
