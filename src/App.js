import React from 'react';
import { Switch, Route } from 'react-router';

import Page from './components/Page';
import User from './components/User';

const App = () => {
  return (
    <div className="container">
      <Switch>
        <Route path="/user/:id" component={User} />
        <Route path="/" component={Page} />
      </Switch>
    </div>
  );
}

export default App;
