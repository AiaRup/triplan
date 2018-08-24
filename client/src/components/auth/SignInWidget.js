import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import '@okta/okta-signin-widget/dist/css/okta-theme.css';

class SignInWidget extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    this.widget = new OktaSignIn({
      baseUrl: this.props.baseUrl,
      redirectUri: 'http://localhost:3000/Home',
      logo: '//logo.clearbit.com/okta.com',
      features: {
        registration: true
      },
      registration: {
        click: function () {
          window.location.href = 'http://localhost:3000/Register';
        }
      },
      i18n: {
        en: {
          'errors.E0000004': 'Invalid Credentials- Password Entered is incorrect or You are not registered to this app',

        }
      }
    });
    this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
  }

  componentWillUnmount() {
    this.widget.remove();
  }

  render() {
    return <div />;
  }
}

export default SignInWidget;