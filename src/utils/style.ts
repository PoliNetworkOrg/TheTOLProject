import * as CSS from 'csstype'

export type cssLike = CSS.Properties

export const theme = {
  primary: '#069',
  lightBackground: '#F3F3EE',
  questionYellow: 'yellow',
  questionGreen: '#00D700',
  softBlack: '#333'
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
