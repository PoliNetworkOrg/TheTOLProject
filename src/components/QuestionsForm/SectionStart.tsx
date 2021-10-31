import React from 'react'
import { sectionInfo } from '../../utils/constants'
import { section } from '../../utils/database'
import { createStyle } from '../../utils/style'
import Button from '../Util/Button'

const baseStyle = createStyle({
  display: 'flex',
  paddingTop: '10px',
  paddingBottom: '20px',
  alignItems: 'center',
  flexDirection: 'column'
})

interface SectionStartProps {
  section: section
  startSection: () => void
}
export default function SectionStart(props: SectionStartProps) {
  const info = sectionInfo[props.section]

  return (
    <div style={baseStyle}>
      <p>
        Stai per iniziare: {info.name}
        <br />-{' '}
        {props.section == 'com'
          ? `${info.sample} bran${info.sample > 1 ? 'i' : 'o'}, `
          : ''}
        {info.sample} domande
        <br />- {info.minutes} minuti
        <br />- Peso sezione:{' '}
        {typeof info.coeff == 'number' ? info.coeff : info.coeff.toFraction()}
      </p>
      <Button label="Inzia sezione" onClick={props.startSection} />
    </div>
  )
}
