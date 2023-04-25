import { StyleSheet } from '../../utils/style'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  center?: boolean
}

export default function Wrapper({
  children,
  center = true,
  style,
  title,
  ...props
}: Props) {
  const styles = StyleSheet.create({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: center ? 'center' : 'flex-start',
      margin: '10px auto',
      marginBlock: '16px',
      maxWidth: 900,
      textAlign: center ? 'center' : 'initial',
      ...style
    },
    h2: {
      fontSize: '16pt'
    }
  })
  return (
    <div style={styles.wrapper} {...props}>
      {title && <h2 style={styles.h2}>{title}</h2>}
      {children}
    </div>
  )
}
