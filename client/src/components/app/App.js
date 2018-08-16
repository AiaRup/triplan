import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from '../navbar/Navbar';
import Content from '../content/Content';
import MyTrips from '../myTrips/MyTrips';
import Login from '../auth/Login';
import RegistrationForm from '../auth/RegistrationForm';


function onAuthRequired({ history }) {
  history.push('/Login');
}

class App extends Component {
  render() {
    return (
      <Router>
        <Security
          issuer="https://dev-497398.oktapreview.com/oauth2/default"
          client_id="0oafxn6oaswdPH4HZ0h7"
          redirect_uri={window.location.origin + '/implicit/callback'}
          onAuthRequired={onAuthRequired}>
          <div className="App">
            <Navbar />
            <div className="container">
              <Switch>
                <SecureRoute exact path="/MakeTriplan" render={() => <Content />} />
                <SecureRoute exact path="/MyTrips" render={() => <MyTrips />} />
                <Route path="/Register" component={RegistrationForm} />
                <Route
                  path="/Login"
                  render={() => (<Login baseUrl="https://dev-497398.oktapreview.com" />)} />
                <Route path="/implicit/callback" component={ImplicitCallback} />
                <Redirect from="/" to="/MakeTriplan" />
              </Switch>
            </div>
          </div>
        </Security>

      </Router >
    );
  }
}

export default App;
