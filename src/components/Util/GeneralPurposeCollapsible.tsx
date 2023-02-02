import { ReactNode, useState } from 'react'
import Collapsible from 'react-collapsible'
import { StyleSheet, theme } from '../../utils/style'
import Button from './Button'

const styles = StyleSheet.create({
  outerDiv: {
    margin: '10px'
  },
  collapsible: {
    background: theme.lightBackground,
    margin: '5px'
  }
})

interface GeneralPurposeCollapsibleProps {
  label: string
  children: ReactNode
  startOpen?: boolean
  contentStyle?: React.CSSProperties
  outerDivStyle?: React.CSSProperties
  onOpen?: () => void
  onClose?: () => void
}
export default function GeneralPurposeCollapsible(
  props: GeneralPurposeCollapsibleProps
) {
  const [isOpen, setOpen] = useState(props.startOpen ?? true)

  return (
    <div style={StyleSheet.compose(styles.outerDiv, props.outerDivStyle)}>
      <Collapsible
        trigger={
          <Button label={props.label} onClick={() => setOpen(!isOpen)} />
        }
        open={isOpen}
        onOpen={props.onOpen}
        onClose={props.onClose}
        easing="ease-in-out"
      >
        <div style={StyleSheet.compose(styles.collapsible, props.contentStyle)}>
          {props.children}
        </div>
      </Collapsible>
    </div>
  )
}
