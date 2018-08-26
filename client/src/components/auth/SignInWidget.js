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
      logo: '//logo.clearbit.com/okta.com',
      features: {
        registration: true
      },
      registration: {
        click: function () {
          window.location.href = 'http://localhost:3000/Register';
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





// class SignInWidget extends Component {
//   componentDidMount() {
//     const el = ReactDOM.findDOMNode(this);
//     this.widget = new OktaSignIn({
//       baseUrl: this.props.baseUrl,
//       // clientId: '0oag14it4dIY0eRL00h7',
//       // redirectUri: 'https://dev-497398.oktapreview.com/oauth2/v1/authorize/callback',
//       redirectUri: 'http://localhost:3000/',
//       // redirectUri: 'http://localhost:3000/Login',
//       // redirectUri: 'http://localhost:3000/implicit/callback',
//       logo: '//logo.clearbit.com/okta.com',
//       features: {
//         registration: true
//       },
//       registration: {
//         click: function () {
//           window.location.href = 'http://localhost:3000/Register';
//         }
//       },
//       // authParams: {
//       //   display: 'page',
//       //   responseType: 'id_token',
//       //   responseMode: 'fragment',
//       // },
//       // idpDisplay: 'PRIMARY',
//       // idps: [
//       //   { type: 'FACEBOOK', id: '0oag1o3mtqXQK4lrw0h7' }
//       // ],
//       // i18n: {
//       //   en: {
//       //     'errors.E0000004': 'Invalid Credentials- Password Entered is incorrect or You are not registered to this app',
//       //   }
//       // }
//     });

//     // // The user has just landed on our login form, and has not yet authenticated
//     // // with a Social Auth IDP.
//     // if (!el.token.hasTokensInUrl()) {
//     //   this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
//     // }

//     // // The user has redirected back after authenticating and has their access or
//     // // ID Token in the URL.
//     // else {
//     //   el.token.parseTokensFromUrl(
//     //     function success(res) {
//     //       // Add the token to tokenManager to automatically renew the token when needed
//     //       el.tokenManager.add('id_token', res[0]);
//     //       el.tokenManager.add('access_token', res[1]);
//     //       console.log('idToken');

//     //     },
//     //     function error(err) {
//     //       console.log('handle error', err);
//     //     }
//     //   );
//     // }
//     this.widget.renderEl({ el }, this.props.onSuccess, this.props.onError);
//   }



//   componentWillUnmount() {
//     this.widget.remove();
//   }

//   render() {
//     return <div />;
//   }
// }

// export default SignInWidget;