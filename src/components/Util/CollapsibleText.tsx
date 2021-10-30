import React, { useState } from 'react'
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

const pStyle = createStyle({
  margin: '2px',
  padding: '10px'
})

interface CollapsibleTextProps {
  label: string
  longText: string
  startOpen?: boolean
}
export default function CollapsibleText(props: CollapsibleTextProps) {
  const [isOpen, setOpen] = useState(props.startOpen ?? true)

  return (
    <div style={outerDivStyle}>
      <Collapsible
        trigger={
          <Button
            label="mostra/nascondi testo"
            onClick={() => setOpen(!isOpen)}
          />
        }
        open={isOpen}
        easing="ease-in-out"
      >
        <div style={collapsibleStyle}>
          <p style={pStyle}>{props.longText}</p>
        </div>
      </Collapsible>
    </div>
  )
}
