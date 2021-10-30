import { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from 'App';
import { registerSW } from 'virtual:pwa-register';

import './index.css';

registerSW();

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.querySelector('#root'),
);
