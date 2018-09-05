import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import './Navbar.css';
export default withAuth(
  class Navbar extends Component {
    constructor(props) {
      super(props);
      this.state = { authenticated: null };
      this.checkAuthentication();
      this.currentUserName = '';
    }

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    }

    async logout() {
      let loginRedirect = this.login;
      // Redirect to '/' after logout
      //if session is active
      this.props.auth.logout('/')
        .then(function (out) {
          console.log('session is deleted');
        })
        .catch(function (error) {
          //if session is inactive
          loginRedirect();
        });
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    navOnLogin = () => {
      if (this.state.authenticated === null) return null;
      const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
      if (idToken !== null && typeof idToken === 'object') {
        if (Object.keys(idToken).length) {
          this.currentUserName = idToken.idToken.claims.name;
        }
      }
      const authNav = this.state.authenticated ? (
        <ul className="auth-nav nav navbar-nav navbar-right">
          <li className="nav-link mr-3">{this.currentUserName}</li>
          <li className="nav-item"><button className="btn btn-sm btn-secondary my-2 my-sm-0" type="button" onClick={() => this.props.auth.logout()}>Log Out</button></li>
        </ul>
      ) : (
        <ul className="auth-nav nav navbar-nav navbar-right">
          <li className="nav-item mr-3 disabled loginNavLi"><Link to="/Login"><button className="btn btn-sm btn-outline-secondary my-2 my-sm-0" type="button" onClick={() => this.props.auth.login()}>Log In / Register</button></Link></li>
        </ul>
      );
      return authNav;
    }



    // handleClick = (event) => {
    //   event.preventDefault();
    //   console.log(this.props);
    //   let trip_id = this.props.user_id.trim();
    //   axios.get(`api/users/users_trips/${trip_id}`)
    //    .then (response=>{
    //        let plans = response.data;
    //        console.log("got response!");
    //        console.log(response);
    //       this.setState({user_plans: plans});
    //    })
    //    .catch(error => {
    //       console.log('Error fetching and parsing data', error);
    //   });
    // }

    render() {
      const navbarRight = this.navOnLogin();
      return (
        // bg-light mb-3
        <nav className="navbar navbar-expand-md navbar-light bg-light">
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
                <Link className="nav-link" to="/MyTrips">My Trips</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/About">About</Link>
              </li>
            </ul>
            {navbarRight ? navbarRight : ''}
          </div>
        </nav >
      );
    }
  }
);


