import { Trans, useTranslation } from 'react-i18next'
import { links } from '../../utils/constants'
import { StyleSheet } from '../../utils/style'
import Wrapper from '../Util/Wrapper'

const styles = StyleSheet.create({
  div: {
    paddingBlock: '15px'
  },
  centered: {
    textAlign: 'center',
    margin: 0
  },
  licenseImg: {
    borderWidth: 0,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block'
  }
})

export default function License() {
  const { i18n } = useTranslation()
  const components = {
    title: (
      <span
        {...{ 'xmlns:dct': 'https://purl.org/dc/terms/' }}
        property="dct:title"
      />
    ),
    network: (
      <a
        href="https://polinetwork.org/it/projects/"
        property="cc:attributionName"
        rel="cc:attributionURL noreferrer noopener"
        target="_blank"
      />
    ),
    cc4: (
      <a
        rel="license noreferrer noopener"
        href="https://creativecommons.org/licenses/by-sa/4.0/"
        target="_blank"
      />
    ),
    githubLicense: (
      <a
        {...{ 'xmlns:cc': 'https://creativecommons.org/ns#' }}
        href={links.githubLicense}
        rel="cc:morePermissions noreferrer noopener"
        target="_blank"
      />
    )
  }
  return (
    <Wrapper title="License">
      <p>
        <Trans i18n={i18n} components={components}>
          license.main
        </Trans>
      </p>
      <a
        rel="license noreferrer noopener"
        href="https://creativecommons.org/licenses/by-sa/4.0/"
        target="_blank"
        style={{ margin: 10 }}
      >
        <img
          alt="Creative Commons License"
          style={styles.licenseImg}
          src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png"
        />
      </a>
    </Wrapper>
  )
}
