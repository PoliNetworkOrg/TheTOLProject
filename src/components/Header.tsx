import React from 'react'
import { createStyle } from '../utils/style'
import { statePair } from '../utils/types'
import { view } from './App'
import Button from './Util/Button'

const divStyle = createStyle({
  height: '70px',
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between'
})

const textStyle = createStyle({
  fontSize: '18pt',
  display: 'inline-block'
})

interface HeaderProps {
  viewState: statePair<view>
}

export default function Header({ viewState }: HeaderProps) {
  return (
    <div style={divStyle}>
      <h1 style={textStyle}>
        PoliNetwork banner placeholder - The TOL Project
      </h1>
      <Button
        label="Toggle demo view"
        onClick={() => {
          const [currentView, selectView] = viewState
          if (currentView == 'dbPreview') selectView('TOL-inizioTol')
          else selectView('dbPreview')
        }}
      />
    </div>
  )
}
