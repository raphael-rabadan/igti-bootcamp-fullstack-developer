import React from 'react'
import ReactDOM from 'react-dom'

/**
 * Importação do Materialize CSS
 */
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

import './index.css'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
