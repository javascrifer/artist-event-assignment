import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.scss';
import * as serviceWorker from './serviceWorker';

const Index = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(Index, document.getElementById('root'));
serviceWorker.unregister();
