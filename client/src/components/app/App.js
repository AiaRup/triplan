import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Content from '../content/Content';
import MyTrips from '../myTrips/MyTrips';
import Login from '../login/Login';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/MakeTriplan" render={() => <Content />} />
            <Route exact path="/MyTrips" render={() => <MyTrips />} />
            <Route exact path="/Login" render={() => <Login />} />
            <Redirect from="/" to="/MakeTriplan" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
