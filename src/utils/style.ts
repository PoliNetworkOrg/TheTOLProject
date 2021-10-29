import * as CSS from 'csstype'

export type cssLike = CSS.Properties

export const theme = {
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
  fontFamily: 'verdana',
  color: theme.softBlack
}

export function createStyle(...styles: CSS.Properties[]) {
  return {
    ...baseStyle,
    ...styles.reduce((acc, curr) => ({ ...acc, ...curr }), {})
  }
}
