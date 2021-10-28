import React from 'react'
import Latex from 'react-latex'

interface RenderedTextProps {
  text: string
}
export default function RenderedText({ text }: RenderedTextProps) {
  return <Latex>{text}</Latex>
}
