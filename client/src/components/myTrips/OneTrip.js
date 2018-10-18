import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import DayMapView from './DayMapView';
import PrintIcon from '@material-ui/icons/PrintRounded';
import EmailIcon from '@material-ui/icons/EmailRounded';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, Input, InputLabel } from '@material-ui/core';
import pink from '@material-ui/core/colors/pink';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import classnames from 'classnames';
import Notification, { notify } from 'react-notify-toast';
import Day from './Day';
import './oneTrip.css';
import InputWithIcon from './notes/InputWithIcon';
import axios from 'axios';

@inject('store')
@observer
export default class OneTrip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      notes: this.props.plan.notes,
      open: false,
      email: ''
    };
  }

  printTrip = () => {
    window.print();
  };

  //!! for email
    handleClickOpen = () => {
      this.setState({ open: true });
    };

    handleClose = () => {
      this.setState({ open: false });
    };

    enterEmail = (e) => {
      this.setState({ email: e.target.value });
    }

    sendEmail = (e) => {
      // ask server to send the trip by mail
      axios.post(`/api/email/send/${this.state.email}`, {
        name: this.props.plan.name,
        city: this.props.plan.city,
        days: this.props.plan.days,
        notes: this.props.plan.notes,
      })
        .then((response) => {
          if (response.data === 'email sent') {
            let myColor = { background: '#f50057', text: '#FFFFFF' };
            notify.show('Your Trip was sent successfully', 'custom', 3000, myColor);
          }
        })
        .catch((error) => {
          console.log(error);
        });
      // close dialog
      this.handleClose();
    };

  handleNotesChange = (noteType, action, i, text) => {
    const notes = this.props.plan.notes;
    if (action === 'delete') {
      notes[noteType].splice(i, 1);
    }
    else if (action === 'add') {
      notes[noteType].push(text);
    } else if (action === 'update') {
      notes[noteType][i] = text;
    }

    // update notes on server
    axios.post(`/api/users/users/${this.props.store.user_id}/${this.props.plan._id}/notes`, { notes })
      .then((response) => {
        console.log('res notes from server', response);
        const newPlanFromServer = response.data.filter((plan) => plan._id === this.props.plan._id);
        console.log('newplanfromserver', newPlanFromServer);

        // const planToUpdate = response.filter((plan) => plan._id === this.props.plan._id);
        this.setState({ notes: newPlanFromServer[0].notes }, () => this.props.store.updatePlanInStore(newPlanFromServer[0]));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { name, days, city } = this.props.plan;
    const { email, notes } = this.state;
    let sortDays = days.slice().sort((a, b) => {
      a = a.date.split('/').reverse().join('');
      b = b.date.split('/').reverse().join('');
      return a > b ? 1 : a < b ? -1 : 0;
    });

    return (
      <div className="container-trip">
        <Notification options={{ zIndex: 400, bottom: '350px' }} />
        <div className="trip-header">
          {/* <h1> Name Trip: {name}</h1> */}

          <h1 className="line-on-sides">{name[0].toUpperCase() + name.slice(1)}</h1>

          <div className="icons-user-actions">
            <span onClick={window.print} className='print-email-btn'><PrintIcon/></span>
            <span onClick={this.handleClickOpen} className='print-email-btn'><EmailIcon/></span>
          </div>

        </div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Send Trip By Email</DialogTitle>
          <ValidatorForm
            ref="form"
            onSubmit={this.sendEmail}
            onError={errors => console.log(errors)}
          >
            <DialogContent>
              <div style={{ marginBottom: '1rem' }}>
                <DialogContentText>
                To send you your trip, please enter your email address below.
                </DialogContentText>
              </div>
              <TextValidator
                label="Email Address"
                onChange={this.enterEmail}
                name="email"
                value={email}
                validators={[ 'required', 'isEmail' ]}
                errorMessages={[ 'This field is required', 'Email is not valid' ]}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">Cancel
              </Button>
              <Button color="secondary" type="submit">
              Send Email
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>

        <Nav tabs>
          <NavItem className="tab-in-one-trip">
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              TIMELINE
            </NavLink>
          </NavItem>
          <NavItem className="tab-in-one-trip">
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              MAPS
            </NavLink>
          </NavItem>
          <NavItem className="tab-in-one-trip">
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              NOTES
            </NavLink>
          </NavItem>
          <NavItem className="days-of-trip" disabled>
            <NavLink>
              {days.length === 1 ? <span>1 Day in {city}</span> : <span>{days.length} Days in {city}</span>}
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div className="timeline">
                  {sortDays.map((day, i) =>
                    <Day day={day} index={i} key={i} />
                  )}
                </div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            {sortDays.map((day, i) =>
              <DayMapView day={day} index={i} key={i} city={city} />
            )}
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col md="12" lg="4">
                <InputWithIcon icon="Satisfied" inputLabel="What Did You Enjoy?" notes={notes.good} noteType="good" handleNotesChange={this.handleNotesChange} color='#EBC2C0' />
              </Col>
              <Col md="12" lg="4">
                <InputWithIcon icon="NotSatisfied" inputLabel="What Went Wrong?" notes={notes.bad} noteType="bad" handleNotesChange={this.handleNotesChange} color='#EBD7C0' />
              </Col>
              <Col md="12" lg="4">
                <InputWithIcon icon="NoteIcon" inputLabel="Other Thoughts?" notes={notes.neutral} noteType="neutral" handleNotesChange={this.handleNotesChange} color='#9E9E9E' />
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

