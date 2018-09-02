import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

import Navbar from '../navbar/Navbar';
import Content from '../content/Content';
import Login from '../auth/Login';
import MyTrips from '../myTrips/MyTrips';
import OneTrip from '../myTrips/OneTrip';

function onAuthRequired({ history }) {
  history.push('/Login');
}

@inject(allStores => ({
  configUser: allStores.store.configUser,
  plans: allStores.store.plansArray
}))
@observer
class App extends Component {



  // componentDidMount = () => {
  //   const userId = localStorage.getItem('oktaID');
  //   if (userId !== null) {
  //     // get user id from mongo
  //     axios.get(`/api/users/users/${userId}`)
  //       .then((response) => {
  //         // set user id on store
  //         if (response.data.length !== 0) {
  //           this.props.configUser(response.data[0]._id);
  //         }
  //       });
  //   }
  // }


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
            <div className="container-fluid">
              <Switch>
                <SecureRoute exact path="/Home" render={() => <Content />} />
                <SecureRoute exact path="/MyTrips" render={() => <MyTrips />} />

                {this.props.plans.map(
                  (plan, index) =>
                    <SecureRoute exact path={`/MyTrips/${plan.name}`} render={() => <OneTrip plan={plan} key={index} />} />
                )}

                <Route
                  path="/Login"
                  render={() => (<Login baseUrl="https://dev-497398.oktapreview.com" />)} />
                <Route path="/implicit/callback" component={ImplicitCallback} />
                <Redirect from="/" to="/Home" />
              </Switch>
            </div>
          </div>
        </Security>

      </Router >
    );
  }
}

export default App;

