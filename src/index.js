import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import configureStore from './store';
import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';

import './index.css';

const socket = io();
const store = configureStore({ socket });

const appJsx = (
  <Provider store={store}>
    <App />
  </Provider>
);
render(appJsx, document.getElementById('root'));
// registerServiceWorker();
