import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import TheEvent from '../planTrip/EventList/TheEvent';
import EventPickDate from './SearchEventsForm';
import './searchEventsForm.css';
import moment from 'moment';
import Notification, { notify } from 'react-notify-toast';
import { Loading } from '../Loading';

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
      loading: false
    };
  }

  // get events from the api
  getEvents = () => {
    const { startDate, endDate } = this.props.tempEventCalander;

    let start = moment(`/Date(${Date.parse(startDate)})/`).format('dddd, MMMM Do YYYY, h:mm a');
    let end = moment(`/Date(${Date.parse(endDate)})/`).format('dddd, MMMM Do YYYY, h:mm a');

    // if (startDate === endDate) {
    if (start === end) {
      let myColor = { background: '#20313b', text: '#FFFFFF' };
      notify.show('You need to choose a different start and end date', 'custom', 5000, myColor);
      return;
    }

    if (this.props.eventCategory.length === 0) {
      let myColor = { background: '#20313b', text: '#FFFFFF' };
      notify.show('Please choose an event category', 'custom', 5000, myColor);
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

        if (response.data.results.length === 0) {
          // empty old events on page
          this.props.emptyTempEvents();

          // show toast with 'no event found'
          let myColor = { background: '#20313b', text: '#FFFFFF' };
          notify.show('No Events Found!', 'custom', 5000, myColor);
          return;
        }

        // empty old events
        this.props.emptyTempEvents();
        // create new event object
        let event = {};

        response.data.results.forEach((eventResult) => {
          event.name = eventResult.title;
          event.id = eventResult.id;
          event.category = eventResult.category;

          event.start = moment(`/Date(${Date.parse(eventResult.start)})/`).format('dddd, MMMM Do YYYY, h:mm a');
          event.end = moment(`/Date(${Date.parse(eventResult.end)})/`).format('dddd, MMMM Do YYYY, h:mm a');
          event.type = 'event';
          event.position = { lat: eventResult.location[1], lng: eventResult.location[0] };

          if (eventResult.duration !== 0) {
            event.duration = this.convertDuration(eventResult.duration);
          }

          // add event to trip store
          this.props.addTempEvents(event);
        });
      })
      .catch((error) => {
        console.log(Error.error);
      });
  };

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
      return `${hrs} Hrs, ${mnts} Minutes`;
    }
    else {
      if (hrs === 0) {
        return `${days} days.`;
      }
      return `${days} days, ${hrs} Hrs, ${mnts} Minutes`;
    }
  }

  render() {
    return (
      <React.Fragment>
        <Notification options={{ zIndex: 200, top: '50px' }} />

        <div className='temp-event-container'>
          <div className='datesHead'>
            <h5>Find Events Nearby</h5>
            <div className='date-pick'>
              <EventPickDate />
              <button className='btn btn-sm btn-secondary btn-temp-event-date' onClick={this.getEvents}>Find</button>
              <Loading loading={this.state.loading}/>
            </div>
          </div>

          {this.props.tempEventArray.map((theTempEvent, tempEventIndex) =>
            <TheEvent key={theTempEvent.id}
              verifier="eventOfTempEvent"
              tempEventIndex={tempEventIndex}
              tempEventName={theTempEvent.name}
              tempEvent={theTempEvent} />)}
        </div>
      </React.Fragment>
    );
  }
}

export default SearchEvents;