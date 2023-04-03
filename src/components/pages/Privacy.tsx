import { AnchorHTMLAttributes } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { links } from '../../utils/constants'
import Wrapper from '../Util/Wrapper'

function Link({
  title,
  children,
  href,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
      {title}
      {children}
    </a>
  )
}

export default function Privacy() {
  const { i18n } = useTranslation()
  const components = {
    trackerLink: (
      <Link
        href={links.privacyPanelbear}
        title={`"Cookie Free Website Analytics" di PanelBear`}
      />
    ),
    localStorage: <Link title="local storage" href={links.localStorageMDN} />
  }
  return (
    <Wrapper title="Privacy & Cookies">
      <p>
        <Trans
          i18n={i18n}
          components={{
            link: components.trackerLink
          }}
        >
          privacy.tracker
        </Trans>
      </p>
      <p>
        <Trans
          i18n={i18n}
          components={{
            link: components.localStorage
          }}
        >
          privacy.localStorage
        </Trans>
      </p>
    </Wrapper>
  )
}
