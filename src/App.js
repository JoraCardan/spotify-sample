import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import Page from './components/Page';
import User from './components/User';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/user/:id" component={User} />
          <Route path="/" component={Page} />
        </Switch>
      </div>
    );
  }
}

export default App;
