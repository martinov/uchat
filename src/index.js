import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
//import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import { setUserId, setUserName } from './actions/user';

const store = configureStore();
console.log(store.getState());

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(setUserId('123'));
store.dispatch(setUserName('Martin'));

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById('root'));
// registerServiceWorker();
