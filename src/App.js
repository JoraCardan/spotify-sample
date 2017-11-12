import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import './App.css';
import Page from './components/Page';
import User from './components/User';
import PageAuth from './components/PageAuth'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/user/:id" component={User} />
          <Route path="/logged_in" component={Page} />
          <Route path="/" component={PageAuth} />
        </Switch>
      </div>
    );
  }
}

export default App;
