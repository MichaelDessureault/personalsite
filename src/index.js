import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRoutes from './config/router/routes'
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux'
import { configureStore } from './store'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
