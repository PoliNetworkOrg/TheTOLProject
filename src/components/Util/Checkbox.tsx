import React, { useState } from 'react'
import { StyleSheet } from '../../utils/style'

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  textLabel: {
    display: 'inline-block',
    margin: 0
  }
})

interface CheckboxProps {
  default?: boolean
  disabled?: boolean
  label?: string
  labelPosition?: 'right' | 'left'
  onChange: (checked: boolean) => void
}

export default function Checkbox(props: CheckboxProps) {
  const [checked, setChecked] = useState(!!props.default)

  if (props.labelPosition && !['right', 'left'].includes(props.labelPosition))
    throw `labelPosition should either be 'right' or 'left' ('${props.labelPosition}' recevied).`

  return (
    <label style={styles.container}>
      <input
        type="checkbox"
        checked={checked}
        disabled={!!props.disabled}
        onChange={() => {
          setChecked(!checked)
          props.onChange(!checked)
        }}
      ></input>
      <p style={styles.textLabel}>{props.label}</p>
    </label>
  )
}
