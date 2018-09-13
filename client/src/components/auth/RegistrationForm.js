import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import axios from 'axios';
import './RegisterForm.css';
import { observer, inject } from 'mobx-react';


@inject(allStores => ({
  toggleLoginRegister: allStores.store.toggleLoginRegister,
  showLogin: allStores.store.showLogin,
  userEmail: allStores.store.user_email
}))
@observer
  export default withAuth(
    class RegistrationForm extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          firstName: '', lastName: '', email: '', password: '', sessionToken: null,
          emailValid: false, firstNameValid: false, lastNameValid: false, passwordValid: false,
          showErrorDiv: false
        };

        this.oktaAuth = new OktaAuth({ url: 'https://dev-497398.oktapreview.com' });
        this.checkAuthentication();
      }

      checkAuthentication = async () => {
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

      handleChangeInput = (e) => {
        this.setState({ [e.target.id]: e.target.value });
      }

      handleSubmit = (e) => {
        // e.preventDefault();
        this.setState({ showErrorDiv: false });
        axios.post('/api/users', this.state)
          .then(user => {
            this.oktaAuth
              .signIn({
                username: this.state.email,
                password: this.state.password
              })
              .then(res => {
                // save the user oktaID before redirect
                localStorage.setItem('oktaID', res.user.id);
                this.setState({
                  sessionToken: res.sessionToken
                });
              });
          })
          .catch(err => {
            console.log(err);
            this.setState({ showErrorDiv: true });
          });
          //!!check where the data goes to
          this.props.userEmail = this.state.email;
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
                <img src="//logo.clearbit.com/okta.com" className="auth-org-logo" alt="" />
              </div>
              <div className="auth-content">
                <div className="auth-content-inner">
                  <AvForm onValidSubmit={this.handleSubmit} onInvalidSubmit={this.handleInvalidSubmit} className="primary-auth-form o-form o-form-edit-mode">
                    {this.state.showErrorDiv && <div className="o-form-error-container o-form-has-errors" data-se="o-form-error-container">
                      <div className="okta-form-infobox-error infobox infobox-error" role="alert">
                        <span className="icon error-16"></span>
                        <p>Error, A user with this Email already exists.</p>
                      </div>
                    </div>}
                    <h2 className="okta-form-title o-form-head">Create Account</h2>
                    <div className="form-element">
                      <AvField
                        name="email"
                        label="Email:"
                        type="email"
                        id="email"
                        value={this.state.email}
                        onChange={this.handleChangeInput}
                        autoComplete="username email"
                        required
                        validate={{
                          required: { value: true, errorMessage: 'Please enter an email' }
                        }} />
                    </div>
                    <div className="form-element">
                      <AvField
                        name="firstName"
                        label="First Name:"
                        type="text"
                        id="firstName"
                        value={this.state.firstName}
                        onChange={this.handleChangeInput}
                        minLength="2"
                        required
                        validate={{
                          required: { value: true, errorMessage: 'Please enter your first name' },
                          minLength: { value: 2, errorMessage: 'Your first name must be at least 2 characters' },
                          pattern: { value: '^[A-Za-z]+$', errorMessage: 'Only letters are allowed in first name' }

                        }} />
                    </div>
                    <div className="form-element">
                      <AvField
                        name="lastName"
                        label="Last Name:"
                        type="text"
                        id="lastName"
                        minLength="2"
                        value={this.state.lastName}
                        onChange={this.handleChangeInput}
                        required
                        validate={{
                          required: { value: true, errorMessage: 'Please enter your last name' },
                          minLength: { value: 2, errorMessage: 'Your last name must be at least 2 characters' },
                          pattern: { value: '^[A-Za-z]+$', errorMessage: 'only letters are allowed in last name' }

                        }} />
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
                        onChange={this.handleChangeInput}
                        autoComplete="current-password"
                        required
                        validate={{
                          required: { value: true, errorMessage: 'Please enter a password' },
                          pattern: { value: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$', errorMessage: 'password must contain at least 8 characters, at least 1 number and both lower and uppercase letters' }
                        }} />
                    </div>
                    <div className="o-form-button-bar">
                      <input className="button button-primary" type="submit" value="Register" id="submit" data-type="save" />
                    </div>
                    <div className="signin-container">
                      <div className="content">
                        <span className="signin-label">Back to </span>
                        <span className="signin-link" onClick={this.props.toggleLoginRegister}>Sign in</span>
                      </div>
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

