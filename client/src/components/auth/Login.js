import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignInWidget from './SignInWidget';
import { withAuth } from '@okta/okta-react';
import axios from 'axios';
import { observer, inject } from 'mobx-react';

@inject(allStores => ({
  configUser: allStores.store.configUser,
}))
@observer
export default withAuth(
  class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authenticated: null
      };
      this.checkAuthentication();
    }

      checkAuthentication = async () => {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
          this.setState({ authenticated });
        }
      }

      componentDidUpdate() {
        this.checkAuthentication();
      }

      onSuccess = res => {
        const oktaID = res.user.id;
        if (res.status === 'SUCCESS') {
          // save to localstorage befor redirect
          localStorage.setItem('oktaID', oktaID);

          // get user data from DB
          // axios.get(`/api/users/users/${oktaID}`)
          //   .then((response) => {
          //     // set user id on store
          //     console.log('res from DB', response._id);

          //     this.props.configUser(oktaID);

          return this.props.auth.redirect({
            sessionToken: res.session.token
          });

          // })
          // .catch((error) => {
          //   console.log(error);
          // });

          // res.session.setCookieAndRedirect('http://localhost:3000/Home');

        }
      };

      onError = err => {
        console.log('error logging in', err);
      };

      render() {
        if (this.state.authenticated === null) return null;
        return this.state.authenticated ? (
          <Redirect to={{ pathname: '/' }} />
        ) : (
          <SignInWidget
            baseUrl={this.props.baseUrl}
            onSuccess={this.onSuccess}
            onError={this.onError}
          />
        );
      }
  }
);