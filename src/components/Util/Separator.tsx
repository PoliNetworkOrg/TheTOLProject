import React from 'react'
import { StyleSheet, theme } from '../../utils/style'

const styles = StyleSheet.create({
  div: {
    height: '15px',
    backgroundColor: theme.primary
  },
  text: {
    color: 'white',
    margin: 'auto .5em',
    fontSize: '9.5pt'
  }
})

interface SeparatorProps {
  text?: string
}
export default function Separator(props: SeparatorProps) {
  return (
    <div style={styles.div}>
      <p style={styles.text}>{props.text || ''}</p>
    </div>
  )
}
