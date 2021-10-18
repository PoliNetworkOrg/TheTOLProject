import * as CSS from 'csstype'

const baseStyle: CSS.Properties = {
  fontFamily: 'verdana'
}

export function createStyle(style: CSS.Properties) {
  return { ...baseStyle, ...style }
}

export const theme = {
  primary: '#069'
}
