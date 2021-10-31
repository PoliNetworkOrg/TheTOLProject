import React, { ReactNode, useState } from 'react'
import Collapsible from 'react-collapsible'
import { createStyle, theme } from '../../utils/style'
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
}
export default function GeneralPurposeCollapsible(
  props: GeneralPurposeCollapsibleProps
) {
  const [isOpen, setOpen] = useState(props.startOpen ?? true)

  return (
    <div style={outerDivStyle}>
      <Collapsible
        trigger={
          <Button label={props.label} onClick={() => setOpen(!isOpen)} />
        }
        open={isOpen}
        easing="ease-in-out"
      >
        <div style={collapsibleStyle}>{props.children}</div>
      </Collapsible>
    </div>
  )
}
