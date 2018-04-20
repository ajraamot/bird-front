import React from 'react';
import { Route, IndexRoute } from 'react-router'; //IndexRoute is needed to reference where to go if root is hit
import App from './components/App';
import HomePage from './components/HomePage';
import AddBird from './components/AddBird';
import Game from './components/Game';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="add" component={AddBird} />
    <Route path="game" component={Game} />
  </Route>
);
