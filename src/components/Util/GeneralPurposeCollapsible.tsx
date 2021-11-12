import React, { ReactNode, useState } from 'react'
import Collapsible from 'react-collapsible'
import { createStyle, cssLike, theme } from '../../utils/style'
import Button from './Button'

const outerDivStyle = createStyle({
  margin: '10px'
})

const collapsibleStyle = createStyle({
  background: theme.lightBackground,
  margin: '5px'
})

interface GeneralPurposeCollapsibleProps {
  label: string
  children: ReactNode
  startOpen?: boolean
  contentStyle?: cssLike
  outerDivStyle?: cssLike
  onOpen?: () => void
  onClose?: () => void
}
export default function GeneralPurposeCollapsible(
  props: GeneralPurposeCollapsibleProps
) {
  const [isOpen, setOpen] = useState(props.startOpen ?? true)

  return (
    <div style={createStyle(outerDivStyle, props.outerDivStyle)}>
      <Collapsible
        trigger={
          <Button label={props.label} onClick={() => setOpen(!isOpen)} />
        }
        open={isOpen}
        onOpen={props.onOpen}
        onClose={props.onClose}
        easing="ease-in-out"
      >
        <div style={createStyle(collapsibleStyle, props.contentStyle)}>
          {props.children}
        </div>
      </Collapsible>
    </div>
  )
}
