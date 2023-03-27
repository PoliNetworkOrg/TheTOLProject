import { StyleSheet } from '../../utils/style'

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '10px auto',
    marginBlock: '16px',
    maxWidth: 900,
    textAlign: 'center'
  },
  h2: {
    fontSize: '16pt'
  }
})

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
}

export default function Wrapper({ children, style, title, ...props }: Props) {
  return (
    <div style={{ ...styles.wrapper, ...style }} {...props}>
      {title && <h2 style={styles.h2}>{title}</h2>}
      {children}
    </div>
  )
}
