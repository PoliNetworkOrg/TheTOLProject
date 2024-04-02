import {
  MemberRole,
  MemberRoleKeys,
  links,
  members
} from '../../utils/constants'
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
    textAlign: 'left',
    flex: 1
  },
  fullWidth: {
    width: '100%',
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
          <MembersByRole
            role={MemberRole.ProjectLeader}
            titleKey="about.roles.projectLeader"
          />
          <MembersByRole
            role={MemberRole.Author}
            titleKey="about.roles.author"
          />
        </div>
        <div style={styles.col}>
          <MembersByRole role={MemberRole.Dev} titleKey="about.roles.dev" />
          <MembersByRole role={MemberRole.AdHoc} titleKey="about.roles.adHoc" />
        </div>
      </div>
      <div style={styles.fullWidth}>
        <TgGroups />
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

interface MembersByRoleProps {
  role: MemberRoleKeys
  titleKey: string
}

function MembersByRole({ role, titleKey }: MembersByRoleProps) {
  const { t } = useTranslation()
  const filteredByRole = members
    .filter((m) => m.roles.includes(role))
    .sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1))

  return (
    <div>
      <b>{t(titleKey)}</b>
      <ul style={styles.list}>
        {filteredByRole.map((m, i) => (
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
