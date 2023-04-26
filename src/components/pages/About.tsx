import { links, members } from '../../utils/constants'
import { StyleSheet, theme } from '../../utils/style'
import telegramLogo from '../../static/telegram_logo.svg'
import Wrapper from '../Util/Wrapper'
import { Trans, useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { MobileContext } from '../../utils/contexts'

const styles = StyleSheet.create({
  p: {
    textAlign: 'justify',
    width: '100%'
  },
  grid: {
    margin: '10px 0',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  col: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '100%',
    gap: 10,
    textAlign: 'left'
  },
  link: {
    display: 'inline-flex',
    color: theme.primary,
    gap: '5px',
    alignItems: 'center'
  },
  list: {
    paddingInlineStart: 30
  },
  liP: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 0,
    marginBottom: 10
  },
  telegramLink: {
    display: 'inline-flex',
    alignSelf: 'center'
  },
  telegramLogo: {
    height: '17.5px'
  }
})

export default function About() {
  const { i18n } = useTranslation()
  const { mobile } = useContext(MobileContext)

  return (
    <Wrapper title="About">
      <p style={styles.p}>
        <Trans i18n={i18n}>about.main</Trans>
      </p>
      <div style={{ ...styles.grid, flexDirection: mobile ? 'column' : 'row' }}>
        <div style={styles.col}>
          <ProjectTeam />
        </div>
        <div style={styles.col}>
          <AdHoc />
          <TgGroups />
        </div>
      </div>
    </Wrapper>
  )
}

function TgLogo() {
  return (
    <span style={styles.telegramLink}>
      <img src={telegramLogo} style={styles.telegramLogo} />
    </span>
  )
}

function ProjectTeam() {
  const { t } = useTranslation()
  const team = members
    .filter((m) => !m.ah)
    .sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1))

  return (
    <div>
      <b>{t('about.projectTeam')}</b>
      <ul style={styles.list}>
        {team.map((m, i) => (
          <li key={i}>
            <p style={styles.liP}>
              {(m.prefix || '') + ' ' + m.name}{' '}
              <a
                href={`https://t.me/${m.tg}`}
                target="_blank"
                rel="noreferrer noopener"
                style={styles.telegramLink}
              >
                <TgLogo />
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function AdHoc() {
  const ah = members
    .filter((m) => !!m.ah)
    .sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1))

  return (
    <div>
      <span>Ad hoc</span>
      <ul style={styles.list}>
        {ah.map((m, i) => (
          <li key={i}>
            <p style={styles.liP}>
              {m.name}{' '}
              <a
                href={`https://t.me/${m.tg}`}
                target="_blank"
                rel="noreferrer noopener"
                style={styles.telegramLink}
              >
                <TgLogo />
              </a>
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function TgGroups() {
  const { t, i18n } = useTranslation()
  const components = {
    tgProject: (
      <a
        href={links.telegramTheTOLProject}
        target="_blank"
        rel="noreferrer noopener"
        style={styles.link}
      />
    ),
    tgHelp: (
      <a
        href={links.telegramPreparazioneTOL}
        target="_blank"
        rel="noreferrer noopener"
        style={styles.link}
      />
    ),
    tgLogo: <TgLogo />
  }
  return (
    <div>
      <b>{t('about.supportGroups.head')}</b>
      <ul style={styles.list}>
        <li style={{ marginBottom: 10 }}>
          <Trans i18n={i18n} components={components}>
            about.supportGroups.1
          </Trans>
        </li>
        <li>
          <Trans i18n={i18n} components={components}>
            about.supportGroups.2
          </Trans>
        </li>
      </ul>
    </div>
  )
}
