/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Route, Switch } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';

export default () => (
  <App>
    <Switch>
      <Route component={HomePage} />
    </Switch>
  </App>
);
