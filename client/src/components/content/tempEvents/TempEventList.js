import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import TheEvent from '../planTrip/EventList/TheEvent';
import EventPickDate from './EventPickDate';
import './datePickerCss.css';
import { Collapse } from 'react-collapse';
import moment from 'moment';
import './eventTemp.css';


// const apiKey = '2H98vvmL8G3zZvx7';

@inject(allStores => ({
  tempEventArray: allStores.store.tempEventArray,
  tempEventCalander: allStores.store.tempEventCalander,
  getEvents: allStores.store.getEvents,
  testEventsArray: allStores.store.testEventsArray,
  eventCategory: allStores.store.eventCategory,
  address: allStores.store.address

}))
@observer
class TempEventList extends Component {
  constructor() {
    super();
    this.state = { toggledCollapse: false };

  }

  getEvents = () => {
    const USER_TOKEN = '9bgBCdDfmWp8NxrBqoNZ808YqGIf6m';
    const AuthStr = 'Bearer ' + USER_TOKEN;
    let categories ='';
    const { lat, lng } = this.props.address;
    const { startDate, endDate } = this.props.tempEventCalander;

    // get selected categories
    if (this.props.eventCategory.length) {
      let tempArr = this.props.eventCategory.map((category) => category.value);
      categories = tempArr.toString();
      console.log('arr category', categories);
    }

    // const URL = 'https://api.predicthq.com/v1/events/??relevance=rank,start_around,location_around&category=concerts&location_around.origin=40.782409,-73.971885&&location_around.offset=5km&country=US&active.tz=America/Los_Angeles&sort=rank';
    const URL = `https://api.predicthq.com/v1/events/??relevance=rank,start_around,location_around&category=${categories}&location_around.origin=${lat},${lng}&location_around.offset=10km&start.gte=${startDate}&start.lte=${endDate}`;

    console.log(URL);

    axios.get(URL, { 'headers': { 'Authorization': AuthStr }})
      .then((response) => {
        let event = {};
        console.log(response);
        response.data.results.forEach((eventResult) => {
          event.name = eventResult.title;
          event.id = eventResult.id;
          event.category = eventResult.category;
          event.start = moment(`/Date(${Date.parse(eventResult.start)})/`).format('dddd, MMMM Do YYYY, h:mm a');
          event.end = moment(`/Date(${Date.parse(eventResult.end)})/`).format('dddd, MMMM Do YYYY, h:mm a');
          event.type = 'event';

          if (eventResult.description) {
            event.description = eventResult.description;
          }

          if (eventResult.duration) {
            event.duration = this.convertDuration(eventResult.duration);
          }
          this.props.tempEventArray.push(event);
        });
      })
      .catch((error) => {
        console.log(Error.error);
      });

    // console.log(res);
    //     this.props.testEventsArray.push(res);
    //     console.log(`testEventsArray: ${JSON.stringify(this.props.testEventsArray)}`);
    //     console.log(`start date: ${JSON.stringify(this.props.tempEventCalander[0])}`, `end date: ${this.props.tempEventCalander[1]}`);

  };

  convertDuration(seconds) {
    var days = Math.floor(seconds / (3600*24));
    seconds -= days*3600*24;
    var hrs = Math.floor(seconds / 3600);
    seconds -= hrs*3600;
    var mnts = Math.floor(seconds / 60);
    seconds -= mnts*60;
    return `${days} days, ${hrs} Hrs,${mnts} Minutes`;
  }

  collapseToggle = () => {
    this.setState(prevState => ({
      toggledCollapse: !prevState.toggledCollapse
    }));
  };

  render() {

    const toggleCollapse = false;

    return (
      <React.Fragment>
        <div className = 'list-container'>
          <div className='datesHead'>
            <h5 onClick={()=>this.collapseToggle(toggleCollapse)}>Find Events Nearby &raquo;</h5>
            <Collapse isOpened={this.state.toggledCollapse}>
              <div className = 'date-pick'>
                <EventPickDate/>
                <button className='btn-temp-event-date' onClick={this.getEvents}>Events</button>
              </div>
            </Collapse>
          </div>
          {this.props.tempEventArray.map((theTempEvent, tempEventIndex) =>
            <TheEvent key={theTempEvent.id}
              verifier="eventOfTempEvent"
              tempEventIndex={tempEventIndex}
              tempEventName ={theTempEvent.name}
              tempEvent={theTempEvent} />)}
        </div>
      </React.Fragment>
    );
  }
}

export default TempEventList;