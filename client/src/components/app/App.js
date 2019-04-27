import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

import Navbar from '../navbar/Navbar';
import Home from '../home/Home';
import Login from '../auth/Login';
import MyTrips from '../myTrips/MyTrips';
import OneTrip from '../myTrips/OneTrip';
import About from '../about/About';
import Planing from '../planing/Planing';

function onAuthRequired({ history }) {
  history.push('/Login');
}

@inject(allStores => ({
  tripIdSaved: allStores.store.tripIdToEdit,
  configUser: allStores.store.configUser,
  plans: allStores.store.plansArray,
  userInStore: allStores.store.user_id,
  savePlans: allStores.store.savePlans,
}))
@observer
class App extends Component {
  componentDidMount = () => {
    const userId = localStorage.getItem('oktaID');
    if (userId !== null) {
      // get user id from mongo
      axios.get(`/api/users/users/${userId}`).then(response => {
        // set user id on store
        if (response.data.length !== 0) {
          if (this.props.userInStore !== response.data[0]._id) {
            this.props.configUser(response.data[0]._id);
            // this.props.savePlans(response.data[0].plans);
          }
        }
      });
    }
  };

  render() {
    return (
      <Router>
        <Security
          // issuer="https://dev-497398.oktapreview.com/oauth2/default"
          // client_id="0oafxn6oaswdPH4HZ0h7"
          issuer="https://dev-789825.okta.com/oauth2/default"
          client_id="0oaiilq44ZrRJczry356"
          redirect_uri={window.location.origin + '/implicit/callback'}
          onAuthRequired={onAuthRequired}
        >
          <div className="App">
            <Navbar />
            {/* <div className="container-fluid"> */}
            <div className="wrapper-app">
              <Switch>
                <SecureRoute exact path="/Home" render={() => <Home />} />
                <SecureRoute exact path="/MyTrips" render={() => <MyTrips />} />

                {this.props.plans.map((plan, index) => (
                  <SecureRoute
                    exact
                    path={`/MyTrips/${plan._id}`}
                    key={index}
                    render={() => <OneTrip plan={plan} />}
                  />
                ))}

                <SecureRoute
                  exact
                  path={`/MyTrips/${this.props.tripIdSaved}`}
                  render={() => (
                    <OneTrip
                      plan={this.props.plans[this.props.plans.length - 1]}
                    />
                  )}
                />

                <SecureRoute exact path="/About" render={() => <About />} />
                <SecureRoute exact path="/Planing" render={() => <Planing />} />

                <Route
                  path="/Login"
                  render={() => (
                    <Login baseUrl="https://dev-789825.okta.com" />
                    // <Login baseUrl="https://dev-497398.oktapreview.com" />
                  )}
                />
                <Route path="/implicit/callback" component={ImplicitCallback} />
                <Redirect from="/" to="/Home" />
              </Switch>
            </div>
          </div>
        </Security>
      </Router>
    );
  }
}

export default App;
