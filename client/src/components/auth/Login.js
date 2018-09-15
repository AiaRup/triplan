import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import SignInWidget from './SignInWidget';
import { withAuth } from '@okta/okta-react';
import RegistrationForm from '../auth/RegistrationForm';
import { observer, inject } from 'mobx-react';


@inject(allStores => ({
  toggleLoginRegister: allStores.store.toggleLoginRegister,
  showLogin: allStores.store.showLogin
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
          // redirect to homepage
          return this.props.auth.redirect({
            sessionToken: res.session.token
          });
        }
      };

      onError = err => {
        console.log('error logging in', err);
        if (err.type === 'OAUTH_ERROR') {
          <Redirect to={{ pathname: '/' }} />;
        }
      };

      render() {
        if (this.state.authenticated === null) return null;
        return this.state.authenticated ? (
          <Redirect to={{ pathname: '/' }} />
        ) : (
          this.props.showLogin ?
            <SignInWidget
              baseUrl={this.props.baseUrl}
              onSuccess={this.onSuccess}
              onError={this.onError}
            /> :
            <RegistrationForm/>
        );
      }
  }
);