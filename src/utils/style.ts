import * as CSS from 'csstype'

export type cssLike = CSS.Properties

const baseStyle: CSS.Properties = {
  fontFamily: 'verdana'
}

export function createStyle(...styles: CSS.Properties[]) {
  return {
    ...baseStyle,
    ...styles.reduce((acc, curr) => ({ ...acc, ...curr }), {})
  }
}

export const theme = {
  primary: '#069',
  lightBackground: '#F3F3EE'
}
