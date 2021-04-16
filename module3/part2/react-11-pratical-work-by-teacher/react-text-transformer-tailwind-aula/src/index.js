import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/**
 * Este arquivo pode ser considerado o CSS
 * Global do App.
 */
import './index.css';

/**
 * <React.StrictMode> é utilizado na fase
 * de "Desenvolvimento" gerando mais mensagens
 * de erro para apoiar o Desenvolvedor. Por isso
 * é comum ocorrerem renderizações "a mais".
 * Ele é retirado automaticamente em produção.
 */
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
