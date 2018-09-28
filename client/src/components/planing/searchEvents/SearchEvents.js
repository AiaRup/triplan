import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import { Paper, Grid, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TheEvent from '../planTrip/EventList/TheEvent';
import EventPickDate from './SearchEventsForm';
import './searchEventsForm.css';
import moment from 'moment';
import Notification, { notify } from 'react-notify-toast';

import FindIcon from '@material-ui/icons/Search';
import { Loading } from '../Loading';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

@inject(allStores => ({
  tempEventArray: allStores.store.tempEventArray,
  tempEventCalander: allStores.store.tempEventCalander,
  testEventsArray: allStores.store.testEventsArray,
  eventCategory: allStores.store.eventCategory,
  address: allStores.store.address,
  emptyTempEvents: allStores.store.emptyTempEvents,
  addTempEvents: allStores.store.addTempEvents,
}))
@observer
class SearchEvents extends Component {
  constructor() {
    super();
    this.state = {
      toggledCollapse: false,
      showSnackBar: false,
      tempEventIternalId: 0,
      loading: false,
      eventDetails: []
    };
  }

  // get events from the api
  getEvents = () => {
    const { startDate, endDate } = this.props.tempEventCalander;

    let start = moment(`/Date(${Date.parse(startDate)})/`).format('dddd, MMMM Do YYYY, h:mm a');
    let end = moment(`/Date(${Date.parse(endDate)})/`).format('dddd, MMMM Do YYYY, h:mm a');

    if (start === end) {
      let myColor = { background: '#20313b', text: '#FFFFFF' };
      notify.show('You need to choose a different start and end date', 'custom', 3500, myColor);
      return;
    }

    if (this.props.eventCategory.length === 0) {
      let myColor = { background: '#20313b', text: '#FFFFFF' };
      notify.show('Please choose an event category', 'custom', 3500, myColor);
      return;
    }

    // variables to send to the api
    const USER_TOKEN = '9bgBCdDfmWp8NxrBqoNZ808YqGIf6m';
    const AuthStr = 'Bearer ' + USER_TOKEN;
    let categories = '';
    const { lat, lng } = this.props.address;

    // get selected categories
    if (this.props.eventCategory.length) {
      let tempArr = this.props.eventCategory.map((category) => category.value);
      categories = tempArr.toString();
    }

    const URL = `https://api.predicthq.com/v1/events/??relevance=rank,start_around&category=${categories}&within=10km@${lat},${lng}&start.gte=${startDate}&start.lte=${endDate}`;

    // show loading events
    this.setState({ loading: true });

    // get events from the api
    axios.get(URL, { 'headers': { 'Authorization': AuthStr }})
      .then((response) => {
        // hide loading events
        this.setState({ loading: false });
        // empty event details
        this.setState({ eventDetails: [] });

        if (response.data.results.length === 0) {
          // empty old events on page
          this.props.emptyTempEvents();

          // show toast with 'no event found'
          let myColor = { background: '#20313b', text: '#FFFFFF' };
          notify.show('No Events Found!', 'custom', 3500, myColor);
          return;
        }

        // empty old events
        this.props.emptyTempEvents();

        // go through events results
        response.data.results.forEach((eventResult) => {
          // create new event object
          let event = {};
          // ask for event address from google api
          axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${eventResult.location[1]},${eventResult.location[0]}&language=en&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0`).then((addressResult) => {

            event.type = 'event';
            event.position = { lat: eventResult.location[1], lng: eventResult.location[0] };
            event.name = eventResult.title;
            event.id = eventResult.id;
            event.category = eventResult.category;

            event.start = moment.utc(eventResult.start).format('DD/MM/YYYY, HH:mm');
            if (eventResult.start !== eventResult.end) {
              event.end = moment.utc(eventResult.end).format('DD/MM/YYYY, HH:mm ');
            }

            if (eventResult.duration !== 0) {
              event.duration = this.convertDuration(eventResult.duration);
            }

            if (addressResult.data.results.length !== 0) {
              event.address = addressResult.data.results[0].formatted_address;
            }

            if (eventResult.description) {
              event.description = eventResult.description;
            }
            // add event to trip store
            this.props.addTempEvents(event);
          })
            .catch((error) => {
              console.log(Error.error);
            });
        });
      })
      .catch((error) => {
        console.log(Error.error);
      });
  }

  // diaplay nice duration of event on the page
  convertDuration(seconds) {
    let days = Math.floor(seconds / (3600 * 24));
    seconds -= days * 3600 * 24;
    let hrs = Math.floor(seconds / 3600);
    seconds -= hrs * 3600;
    let mnts = Math.floor(seconds / 60);
    seconds -= mnts * 60;
    if (days === 0) {
      if (hrs === 0) {
        return `${mnts} Minutes.`;
      }
      else if (mnts === 0) {
        return `${hrs} Hrs.`;
      }
      return `${hrs} Hrs, ${mnts} Minutes`;
    }
    else {
      if (hrs === 0) {
        return `${days} days.`;
      }
      return `${days} days, ${hrs} Hrs, ${mnts} Minutes`;
    }
  }

  showEventDetails = (eventID) => {
    const event = this.props.tempEventArray.filter(event => event.id === eventID);
    this.setState({ eventDetails: event });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Notification options={{ zIndex: 400, top: '250px' }} />

        <div className='temp-event-container'>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={12} md={4}>
              <Paper>
                <div className='headline-find-events'>
                  <h5>Find Events Nearby</h5>
                  <div className='date-pick'>
                    <EventPickDate />
                    <Button variant="fab" color="secondary" mini aria-label="Find" onClick={this.getEvents} className={classes.button}>
                      <FindIcon />
                    </Button>

                    <Loading loading={this.state.loading}/>
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper>
                <div className='headline-find-events'>
                  <h5>Events List</h5>
                  <div className="listEvents">
                    {this.props.tempEventArray.map((theTempEvent, tempEventIndex) =>
                      <TheEvent key={theTempEvent.id}
                        verifier="eventOfTempEvent"
                        tempEventIndex={tempEventIndex}
                        tempEventName={theTempEvent.name}
                        tempEvent={theTempEvent}
                        showEventDetails={this.showEventDetails} />)}
                  </div>
                </div>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper>
                <div className='headline-find-events'>
                  <h5>Event Details</h5>
                  <div className="event-details">
                    {this.state.eventDetails.map((theEvent, tempEventIndex) =>
                      <TheEvent key={theEvent.id}
                        verifier="eventDetails"
                        tempEventIndex={tempEventIndex}
                        tempEventName={theEvent.name}
                        tempEvent={theEvent}
                        animate={this.props.animate}
                      />)}
                  </div>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SearchEvents);