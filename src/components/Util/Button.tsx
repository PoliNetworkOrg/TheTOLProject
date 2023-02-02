import { StyleSheet } from '../../utils/style'

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    fontFamily: ' Arial',
    fontSize: '9.5pt',
    alignItems: 'center'
  },
  p: {
    display: 'inline-block',
    marginBlock: 0,
    margin: 0,
    fontFamily: 'Arial'
  },
  icon: {
    display: 'flex'
  },
  get leftIcon() {
    return StyleSheet.compose(this.icon, {
      float: 'left',
      marginRight: '2px'
    })
  },
  get rightIcon() {
    return StyleSheet.compose(this.icon, {
      float: 'right',
      marginRight: '2px'
    })
  }
})

interface ButtonProps {
  label: string
  onClick?: () => void
  style?: React.CSSProperties
  leftIcon?: () => JSX.Element
  rightIcon?: () => JSX.Element
}

export default function Button(props: ButtonProps) {
  return (
    <button
      style={StyleSheet.compose(styles.button, props.style || {})}
      onClick={props.onClick}
    >
      <span style={styles.leftIcon}>{props.leftIcon && props.leftIcon()}</span>
      <p style={styles.p}>{props.label}</p>
      <span style={styles.rightIcon}>
        {props.rightIcon && props.rightIcon()}
      </span>
    </button>
  )
}
