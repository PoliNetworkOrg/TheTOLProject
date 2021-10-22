import React from 'react'
// @ts-expect-error Waiting for DefinitelyTyped PR to be merged: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/56687
import Latex from 'react-latex'

interface RenderedTextProps {
  text: string
}
export default function RenderedText({ text }: RenderedTextProps) {
  return <Latex>{text}</Latex>
}
