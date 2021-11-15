import * as CSS from 'csstype'
import Fraction from 'fraction.js'

export type cssLike = CSS.Properties

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

const baseStyle: CSS.Properties = {
  fontFamily: 'Verdana, Roboto',
  color: theme.softBlack
}

export function createStyle(...styles: (CSS.Properties | undefined)[]) {
  return {
    ...baseStyle,
    ...styles.filter((f) => f).reduce((acc, curr) => ({ ...acc, ...curr }), {})
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
