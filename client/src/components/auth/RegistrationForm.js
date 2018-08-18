import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import './RegisterForm.css';


export default withAuth(
  class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        sessionToken: null,
        emailValid: false,
        firstNameValid: false,
        lastNameValid: false,
        passwordValid: false
      };

      this.oktaAuth = new OktaAuth({ url: 'https://dev-497398.oktapreview.com' });
      this.checkAuthentication();
    }

     checkAuthentication = async() => {
       const sessionToken = await this.props.auth.getIdToken();
       if (sessionToken) {
         this.setState({ sessionToken });
       }
     }

     componentDidUpdate() {
       this.checkAuthentication();
     }

     handleInvalidSubmit = (event, errors, values) => {
       this.setState({ error: true });
     }

    handleFirstNameChange = (e) => {
      this.setState({ firstName: e.target.value });
    }
    handleLastNameChange = (e) => {
      this.setState({ lastName: e.target.value });
    }
    handleEmailChange = (e) => {
      this.setState({ email: e.target.value });
    }
    handlePasswordChange = (e) => {
      this.setState({ password: e.target.value });
    }

    handleSubmit = (e) => {
      e.preventDefault();
      fetch('/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
        .then(user => {
          this.oktaAuth
            .signIn({
              username: this.state.email,
              password: this.state.password
            })
            .then(res =>
              this.setState({
                sessionToken: res.sessionToken
              })
            );
        })
        .catch(err => console.log);
    }

    render() {
      if (this.state.sessionToken) {
        this.props.auth.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return (
        <div id="widget-container1">
          <div id="okta-register" className="auth-container1 main-container">
            <div className="okta-register-header auth-header">
              <img src="//logo.clearbit.com/okta.com" className="auth-org-logo" alt=""/>
            </div>
            <div className="auth-content">
              <div className="auth-content-inner">
                <AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit} className="primary-auth-form o-form o-form-edit-mode">
                  <h2 className="okta-form-title o-form-head">Register</h2>
                  <div className="form-element">
                    <AvField
                      name="email"
                      label="Email:"
                      type="email"
                      id="email"
                      value={this.state.email}
                      onChange={this.handleEmailChange}
                      required
                      validate={{
                        required: { value: true, errorMessage: 'Please enter an email' }
                      }}/>
                  </div>
                  <div className="form-element">
                    <AvField
                      name="firstName"
                      label="First Name:"
                      type="text"
                      id="firstName"
                      value={this.state.firstName}
                      onChange={this.handleFirstNameChange}
                      minLength="2"
                      required
                      validate={{
                        required: { value: true, errorMessage: 'Please enter your first name' },
                        minLength: { value: 2, errorMessage: 'Your first name must be at least 2 characters' }
                      }}/>
                  </div>
                  <div className="form-element">
                    <AvField
                      name="lastName"
                      label="Last Name:"
                      type="text"
                      id="lastName"
                      minLength="2"
                      value={this.state.lastName}
                      onChange={this.handleLastNameChange}
                      required
                      validate={{
                        required: { value: true, errorMessage: 'Please enter your last name' },
                        minLength: { value: 2, errorMessage: 'Your last name must be at least 2 characters' }
                      }}/>
                  </div>
                  <div className="form-element">
                    <AvField
                      name="password"
                      label="Password:"
                      type="password"
                      id="password"
                      minLength="8"
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
                      value={this.state.password}
                      onChange={this.handlePasswordChange}
                      required
                      validate={{
                        required: { value: true, errorMessage: 'Please enter a password' },
                        pattern: { value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$', errorMessage: 'password must contain at least 8 characters, at least 1 number and both lower and uppercase letters' }
                      }}/>
                  </div>
                  <div className="o-form-button-bar">
                    <input className="button button-primary" type="submit" value="Register" id="submit" data-type="save"/>
                  </div>

                </AvForm>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
);





// handleValidSubmit(event, values) {
//   this.setState({email: values.email});
// }

// password must contain at least eight characters, at least one number and both lower and uppercase letters and special characters