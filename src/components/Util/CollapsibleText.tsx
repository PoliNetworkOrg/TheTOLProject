import React from 'react'
import { createStyle } from '../../utils/style'
import GeneralPurposeCollapsible from './GeneralPurposeCollapsible'

const pStyle = createStyle({
  margin: '2px',
  padding: '10px',
  textAlign: 'justify'
})

const innerPStyle = createStyle({ padding: 0, margin: 0 })

interface CollapsibleTextProps {
  label: string
  longText: string
  startOpen?: boolean
}
export default function CollapsibleText(props: CollapsibleTextProps) {
  return (
    <GeneralPurposeCollapsible label={props.label}>
      <div style={pStyle}>
        {props.longText
          .trim()
          .split('\n')
          .map((t, i) => (
            <p style={innerPStyle} key={i}>
              {t}
            </p>
          ))}
      </div>
    </GeneralPurposeCollapsible>
  )
}
