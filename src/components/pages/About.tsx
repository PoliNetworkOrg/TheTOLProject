import { links, members } from '../../utils/constants'
import { StyleSheet, theme } from '../../utils/style'
import telegramLogo from '../../static/telegram_logo.svg'
import Wrapper from '../Util/Wrapper'
import { Trans, useTranslation } from 'react-i18next'

const styles = StyleSheet.create({
  p: {
    margin: '20px',
    textAlign: 'justify',
    width: '100%'
  },
  centered: {
    textAlign: 'center'
  },
  link: {
    display: 'flex',
    color: theme.primary,
    gap: '5px',
    alignItems: 'center'
  },
  liDiv: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    flexDirection: 'row'
  },
  telegramLink: {
    display: 'flex'
  },
  telegramLogo: {
    height: '17.5px'
  }
})

export default function About() {
  const { t, i18n } = useTranslation()
  return (
    <Wrapper title="About">
      <p style={styles.p}>
        <Trans i18n={i18n}>about.main</Trans>
      </p>
      <p style={styles.p}>
        <b>{t('about.projectTeam')}</b>
        <br />
        <ul>
          {members
            .filter((m) => !m.ah)
            .sort((a, b) =>
              a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
            )
            .map((m, i) => (
              <li key={i}>
                <div style={styles.liDiv}>
                  {(m.prefix || '') + ' ' + m.name}{' '}
                  <a
                    href={`https://t.me/${m.tg}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={styles.telegramLink}
                  >
                    <img src={telegramLogo} style={styles.telegramLogo}></img>
                  </a>
                </div>
              </li>
            ))}
        </ul>
        Ad hoc:
        <ul>
          {members
            .filter((m) => !!m.ah)
            .sort((a, b) =>
              a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1
            )
            .map((m, i) => (
              <li key={i}>
                <div style={styles.liDiv}>
                  {m.name}{' '}
                  <a
                    href={`https://t.me/${m.tg}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={styles.telegramLink}
                  >
                    <img src={telegramLogo} style={styles.telegramLogo}></img>
                  </a>
                </div>
              </li>
            ))}
        </ul>
        <br />
        <b>{t('about.supportGroups.head')}</b>
        <ul>
          <li>
            <div style={styles.liDiv}>
              {t('about.supportGroups.1')}
              <a
                href={links.telegramTheTOLProject}
                target="_blank"
                rel="noreferrer noopener"
                style={styles.link}
              >
                The TOL Project{' '}
                <span style={styles.telegramLink}>
                  <img src={telegramLogo} style={styles.telegramLogo}></img>
                </span>
              </a>
            </div>
          </li>
          <li>
            <div style={styles.liDiv}>
              {t('about.supportGroups.2')}
              <a
                href={links.telegramPreparazioneTOL}
                target="_blank"
                rel="noreferrer noopener"
                style={styles.link}
              >
                Gruppo preparazione TOL{' '}
                <span style={styles.telegramLink}>
                  <img src={telegramLogo} style={styles.telegramLogo}></img>
                </span>
              </a>
            </div>
          </li>
        </ul>
      </p>
    </Wrapper>
  )
}
