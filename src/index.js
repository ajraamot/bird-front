import 'babel-polyfill'; // to transpile ES features that babel cannot transpile
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import rootSaga from './sagas/rootSaga';
import './styles/styles.css'; // TODO: Update this for .less
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux'; // Provider attaches store to React container components
// so that the store will be accessible from the components

const store = configureStore();
// If I want to initialize the store to a state from local storage or from the server, I would pass it in as a parameter
// in the call to configureStore(), but I'm not doing that here, because in the reducer, I initialized store = []

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);

// should line 15 be:
// <Provider store={store} store={store} store={store}>
