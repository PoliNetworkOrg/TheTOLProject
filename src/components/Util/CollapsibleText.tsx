import React from 'react'
import { createStyle } from '../../utils/style'
import GeneralPurposeCollapsible from './GeneralPurposeCollapsible'

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
  return (
    <GeneralPurposeCollapsible label={props.label}>
      <p style={pStyle}>{props.longText}</p>
    </GeneralPurposeCollapsible>
  )
}
