import React from 'react'
import { StyleSheet } from '../../utils/style'
import GeneralPurposeCollapsible from './GeneralPurposeCollapsible'

const styles = StyleSheet.create({
  p: {
    margin: '2px',
    padding: '10px',
    textAlign: 'justify'
  },
  innerP: { padding: '1px', margin: 0 }
})

interface CollapsibleTextProps {
  label: string
  longText: string
  startOpen?: boolean
}
export default function CollapsibleText(props: CollapsibleTextProps) {
  return (
    <GeneralPurposeCollapsible label={props.label} startOpen={props.startOpen}>
      <div style={styles.p}>
        {props.longText
          .trim()
          .split('\n')
          .map((t, i) => (
            <p style={styles.innerP} key={i}>
              {t}
            </p>
          ))}
      </div>
    </GeneralPurposeCollapsible>
  )
}
