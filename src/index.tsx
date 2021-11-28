import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import * as PanelBear from '@panelbear/panelbear-js'
export * as PanelBear from '@panelbear/panelbear-js'

import App from './components/App'

PanelBear.load('5FyulkL10oK')

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
