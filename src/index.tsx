import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import * as PanelBear from '@panelbear/panelbear-js'
export * as PanelBear from '@panelbear/panelbear-js'

import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

import App from './components/App'

PanelBear.load('5FyulkL10oK')

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <HashRouter>
        <App />
      </HashRouter>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
