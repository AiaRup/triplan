import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import './Navbar.css';
import { observer, inject } from 'mobx-react';
import axios from 'axios';


@inject(allStores => ({
  toggleLoginRegister: allStores.store.toggleLoginRegister,
  showLogin: allStores.store.showLogin,
  user_id: allStores.store.user_id
}))
@observer
export default withAuth(
  class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuthentication();
      this.handleClick= this.handleClick.bind(this);

    }

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
        console.log('auth', authenticated);
      }
    }

    logout = async() => {
      let loginRedirect = this.login;
      //if session is active
      this.props.auth.logout('/')
        .then((out) => {
          console.log('session is deleted');
          localStorage.removeItem('oktaID');
          this.checkAuthentication();
        })
        .catch((error) => {
          //if session is inactive
          loginRedirect();
          console.log('session is inactive');
        });
    }

    login = async() => {
      this.props.toggleLoginRegister();
      this.props.auth.login('/');
    }
    componentDidUpdate() {
      this.checkAuthentication();
    }

    getUserName = () => {
      if (this.state.authenticated === null) return null;
      const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
      if (idToken !== null && typeof idToken === 'object') {
        if (Object.keys(idToken).length) {
          return idToken.idToken.claims.name;
        }
        return '';
      }
    }



    handleClick = (event) => {
      event.preventDefault();
      console.log(this.props);
      let trip_id = this.props.user_id.trim();
        // debugger;
      axios.get(`api/users/users_trips/${trip_id}`)
       .then (response=>{     
           let plans = response.data;
           console.log("got response!");
           console.log(response);
          //  debugger;
          this.setState({user_plans: plans});
       })
       .catch(error => {
          console.log('Error fetching and parsing data', error);
      });
    }

    render() {
      const buttonText = this.props.showLogin ? 'Register' : 'Login';
      return (
        <nav className="navbar navbar-expand-md navbar-light bg-light mb-3">
          <span className="navbar-brand"><Link className="navbar-brand" to="/">Triplan</Link></span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navForCollapseMenu"
            aria-controls="navForCollapseMenu"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navForCollapseMenu">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ml-3">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/MyTrips" onClick={this.handleClick}> My Trips </Link>
              </li>
            </ul>
            { this.state.authenticated ? (
              <ul className="auth-nav nav navbar-nav navbar-right">
                <li className="disabled mr-3">{this.getUserName()}</li>
                <li className="nav-item"><button className="btn btn-sm btn-outline-secondary my-2 my-sm-0" type="button" onClick={this.logout}>Log Out</button></li>
              </ul>
            ) : (
              <ul className="auth-nav nav navbar-nav navbar-right">
                <li className="nav-item mr-3"><button className="btn btn-sm btn-outline-secondary my-2 my-sm-0" type="button" onClick={this.login}>{buttonText}</button></li>
              </ul>
            )
            }
          </div>
        </nav >
      );
    }
  }
);


