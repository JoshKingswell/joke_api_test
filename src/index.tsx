import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import store from './store/store';
import { Provider } from 'react-redux';
window.store = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
