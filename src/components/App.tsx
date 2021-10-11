import React from 'react'
import Header from './Header'
import Separator from './Separator'

export default function App() {
  return (
    <div>
      <Header />
      <Separator text="abc" />
      <p>App start</p>
      <p>App end</p>
      <Separator />
    </div>
  )
}
