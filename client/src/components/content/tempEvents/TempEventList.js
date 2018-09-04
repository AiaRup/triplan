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
  address: allStores.store.address,
  emptyTempEvents: allStores.store.emptyTempEvents,
  addTempEvents : allStores.store.addTempEvents,

}))
@observer
class TempEventList extends Component {
  constructor() {
    super();
    this.state = { toggledCollapse: false,
                    showSnackBar: false };

  }

  getEvents = () => {
    if (this.props.eventCategory.length === 0 ) {
      alert('choose an event category')
      return;
    }
    const USER_TOKEN = '9bgBCdDfmWp8NxrBqoNZ808YqGIf6m';
    const AuthStr = 'Bearer ' + USER_TOKEN;
    let categories ='';
    const { lat, lng } = this.props.address;
    console.log('adress in events', this.props.address);

    const { startDate, endDate } = this.props.tempEventCalander;

    // get selected categories
    if (this.props.eventCategory.length) {
      let tempArr = this.props.eventCategory.map((category) => category.value);
      categories = tempArr.toString();
      console.log('arr category', categories);
    }

    const URL = `https://api.predicthq.com/v1/events/??relevance=rank,start_around&category=${categories}&within=10km@${lat},${lng}&start.gte=${startDate}&start.lte=${endDate}`;
    // const URL = `https://api.predicthq.com/v1/events/??relevance=rank,start_around,location_around&category=${categories}&location_around.origin=${lat},${lng}&location_around.offset=10km&start.gte=${startDate}&start.lte=${endDate}`;

    console.log(URL);

    axios.get(URL, { 'headers': { 'Authorization': AuthStr }})
      .then((response) => {
<<<<<<< HEAD

        if (response.data.results.length === 0 ) {
          console.log('No Events Found!')
        }

=======
        // empty old events
        this.props.emptyTempEvents();
        // create new event object
>>>>>>> master
        let event = {};
        console.log(response);
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
          // this.props.tempEventArray.push(event);
          console.log('tempEvent', this.props.tempEventArray);

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
    let days = Math.floor(seconds / (3600*24));
    seconds -= days*3600*24;
    let hrs = Math.floor(seconds / 3600);
    seconds -= hrs*3600;
    let mnts = Math.floor(seconds / 60);
    seconds -= mnts*60;
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

  collapseToggle = () => {
    this.setState(prevState => ({
      toggledCollapse: !prevState.toggledCollapse
    }));
  };

  render() {

    const toggleCollapse = false;

    return (
      <React.Fragment>
        <div className = 'temp-event-container'>
          <div className='datesHead'>
            <h5 onClick={()=>this.collapseToggle(toggleCollapse)}>Find Events Nearby &raquo;</h5>
            <Collapse isOpened={this.state.toggledCollapse}>
              <div className = 'date-pick'>
                <EventPickDate/>
                <button className='btn btn-sm btn-outline-secondary btn-temp-event-date' onClick={this.getEvents}>Events</button>
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