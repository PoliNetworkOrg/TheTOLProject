import { useState } from 'react'
import { StyleSheet } from '../../utils/style'

const styles = StyleSheet.create({
  select: {
    display: 'flex',
    fontFamily: ' Arial',
    fontSize: '9.5pt',
    alignItems: 'center'
  }
})

interface SelectEntry {
  label: string
  value: string
}

interface ButtonProps {
  defaultValue?: string
  value?: string
  disabled?: boolean
  entries: SelectEntry[]
  label?: string
  onChange?: (newValue: string) => void
  style?: React.CSSProperties
}

export default function Select(props: ButtonProps) {
  const [localValue, setLocalValue] = useState(props.defaultValue)

  return (
    <label>
      {props.label || ''}
      <select
        value={props.value || localValue}
        onChange={(e) => {
          const newValue = e.target.value
          setLocalValue(newValue)
          props.onChange && props.onChange(newValue)
        }}
        style={styles.select}
        disabled={props.disabled}
      >
        {props.entries.map((entry) => (
          <option value={entry.value} key={entry.value}>
            {entry.label}
          </option>
        ))}
      </select>
    </label>
  )
}
