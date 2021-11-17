import Fraction from 'fraction.js'
import React from 'react'

export const theme = {
  boxShadow:
    '1px 0 0 0 #606060, 0 1px 0 0 #606060, 1px 1px 0 0 #606060, /* corner */ 1px 0 0 0 #606060 inset, 0 1px 0 0 #606060 inset',
  lightBackground: '#F3F3EE',
  lightBorder: '#D5DFE4',
  primary: '#069',
  questionYellow: 'yellow',
  questionGreen: '#00D700',
  softBlack: '#333',
  timerGreen: '#009527',
  timerRed: 'red'
}

export const baseStyle: React.CSSProperties = {
  fontFamily: 'Verdana, Roboto',
  color: theme.softBlack
}

export function createStyle(...styles: (React.CSSProperties | undefined)[]) {
  return {
    ...baseStyle,
    ...styles.filter((f) => f).reduce((acc, curr) => ({ ...acc, ...curr }), {})
  }
}

type CSSProperties = {
  [key: string]: React.CSSProperties
}

/** Basic implementation of the StyleSheet class present in React Native */
export class StyleSheet {
  static create<Styles extends CSSProperties>(styles: Styles): Styles {
    return Object.fromEntries(
      Object.entries(styles).map(([key, value]) => [
        key,
        { ...baseStyle, ...value }
      ])
    ) as Styles
  }

  static compose(...styles: React.CSSProperties[]) {
    return styles.reduce((acc, curr) => ({ ...acc, ...curr }), {})
  }

  static extend<T1 extends React.CSSProperties, T2 extends React.CSSProperties>(
    style1: T1,
    style2: T2
  ) {
    return {
      ...style1,
      ...style2
    }
  }
}

export function formatNumber(num: number | Fraction, addDecimals = false) {
  return (
    typeof num == 'number'
      ? num
      : parseFloat(num.round(addDecimals ? 2 : 0).toString())
  )
    .toLocaleString('it-IT', {
      minimumFractionDigits: addDecimals ? 2 : 0,
      maximumFractionDigits: 2
    })
    .replace(/\./g, ',')
}
