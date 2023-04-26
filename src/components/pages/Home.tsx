import { useContext } from 'react'
import Collapsible from 'react-collapsible'
import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'
import { View } from '../../utils/constants'
import { TestContext } from '../../utils/contexts'
import { StyleSheet } from '../../utils/style'
import { statePair } from '../../utils/types'
import Button from '../Util/Button'
import Wrapper from '../Util/Wrapper'

const styles = StyleSheet.create({
  centered: {
    display: 'block'
  },
  buttonDiv: {
    margin: '16px',
    display: 'flex',
    fontSize: 14,
    gap: 6
  },
  dsaInfo: {
    maxWidth: '755px'
  }
})

interface InfoStartProps {
  viewState: statePair<View>
}
export default function Home({ viewState }: InfoStartProps) {
  const { isDsa, toggleDsa } = useContext(TestContext)
  const { t, i18n } = useTranslation()
  const [, setView] = viewState

  const navigate = useNavigate()
  const handleStartTest = () => {
    setView('TOL-testing')
    navigate('/test')
  }

  return (
    <Wrapper>
      <p>
        <span style={styles.centered}>
          <b>DISCLAIMER</b>
        </span>
        <br />
        {t('home.disclaimer')}
      </p>
      <i>{t('home.languageInfo')}</i>
      <div style={styles.buttonDiv}>
        <Button
          style={{ fontSize: 14 }}
          label={t('home.startBtn')}
          onClick={handleStartTest}
        />
        <label htmlFor="dsa_toggle" style={{ userSelect: 'none' }}>
          <input
            id="dsa_toggle"
            type="checkbox"
            checked={isDsa}
            onChange={toggleDsa}
          />
          {t('home.dsaBtn')}
        </label>
      </div>
      <Collapsible trigger={<></>} open={isDsa} transitionTime={150}>
        <p style={styles.dsaInfo}>
          <Trans i18n={i18n}>home.dsaInfo</Trans>
        </p>
      </Collapsible>
    </Wrapper>
  )
}
