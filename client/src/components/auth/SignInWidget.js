import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';
import { observer, inject } from 'mobx-react';

@inject(allStores => ({
  toggleLoginRegister: allStores.store.toggleLoginRegister,
  showLogin: allStores.store.showLogin
}))
@observer
class SignInWidget extends Component {
  componentDidMount = () => {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      logo: '//logo.clearbit.com/okta.com',
      features: {
        registration: true
      },
      i18n: {
        en: {
          'errors.E0000004': 'Invalid Credentials- User not registered or Password is incorrect.'
        }
      },
      // authParams: {
      //   issuer: 'default',
      //   responseType: [ 'id_token', 'token' ],
      //   display: 'page'
      // },
      registration: {
        click: () => {
          this.props.toggleLoginRegister();
        }
      }
    });
    this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);

    // if (!this.widget.token.hasTokensInUrl()) {
    //   this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
    // } else {
    //   this.widget.token.parseTokensFromUrl(
    //     function success(res) {
    //       // Add the token to tokenManager to automatically renew the token when needed
    //       this.widget.tokenManager.add('id_token', res[0]);
    //       this.widget.tokenManager.add('access_token', res[1]);
    //     },
    //     function error(err) {
    //       console.log('handle error', err);
    //     }
    //   );
    // }
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
}

export default SignInWidget;

