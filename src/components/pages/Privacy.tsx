import { AnchorHTMLAttributes } from 'react'
import { links } from '../../utils/constants'
import { StyleSheet } from '../../utils/style'
import Wrapper from '../Util/Wrapper'

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center',
    display: 'block'
  }
})

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
  return (
    <Wrapper title="Privacy & Cookies">
      <p>
        Questo sito utilizza un tracker non invasivo per tener traccia della sua
        performance, nel rispetto delle norme GDPR. Il sito non salva nessun
        cookie permanente: ogni dato trasmesso è in forma anonima e non
        riconducibile all'utente. Per maggiori informazioni, visita la pagina{' '}
        <Link
          href={links.privacyPanelbear}
          title={`"Cookie Free Website Analytics" di PanelBear`}
        />
        .
        <br />
        <br />
        Utilizza il <Link
          title="local storage"
          href={links.localStorageMDN}
        />{' '}
        per salvare preferenze e impostazioni utente, utente, come la modalità
        del test (Regolare o DSA). Queste impostazioni non vengono mai inviate
        ad alcun server, ma vengono gestite localmente dal browser. Inoltre,
        queste vengono eliminate 6 mesi dopo l'ultima modifica.
        <br />
        <br />
        <span style={styles.centered}>---</span>
        <br />
        This website uses a non-invasive tracker to keep track of its
        performance, complying with GDPR. The website does not store any
        permanent cookie: transmitted data is anonymized and not traceable to
        the user. For more info, check out{' '}
        <Link
          href={links.privacyPanelbear}
          title={`PanelBear's "Cookie Free Website Analytics"`}
        />{' '}
        web page.
        <br />
        <br />
        It uses the browser{' '}
        <Link title="local storage" href={links.localStorageMDN} /> to save user
        preferences, for example the test mode (regular or DSA). These settings
        are never sent to any server, instead they are handled locally by the
        browser. Moreover, preferences are deleted after 6 months from the last
        change.
      </p>
    </Wrapper>
  )
}
