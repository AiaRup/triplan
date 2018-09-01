import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import TheEvent from '../planTrip/EventList/TheEvent';
import EventPickDate from './EventPickDate';
import './datePickerCss.css';
import { Collapse } from 'react-collapse';
import './eventTemp.css';


const apiKey = '2H98vvmL8G3zZvx7';

@inject(allStores => ({
  tempEventArray: allStores.store.tempEventArray,
  tempEventCalander: allStores.store.tempEventCalander,
  getEvents: allStores.store.getEvents,
  testEventsArray: allStores.store.testEventsArray

}))
@observer
class TempEventList extends Component {
  constructor() {
    super();
    this.state = { toggledCollapse: false };

  }

  getEvents = () => {
    const USER_TOKEN = '9bgBCdDfmWp8NxrBqoNZ808YqGIf6m';
    const URL = 'https://api.predicthq.com/v1/events/??relevance=rank,start_around,location_around&category=concerts&location_around.origin=40.782409,-73.971885&&location_around.offset=5km&country=US&active.tz=America/Los_Angeles&sort=rank';
    const AuthStr = 'Bearer ' + USER_TOKEN;


    axios.get(URL, { 'headers': { 'Authorization': AuthStr }})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // console.log(res);
    //     this.props.testEventsArray.push(res);
    //     console.log(`testEventsArray: ${JSON.stringify(this.props.testEventsArray)}`);
    //     console.log(`start date: ${JSON.stringify(this.props.tempEventCalander[0])}`, `end date: ${this.props.tempEventCalander[1]}`);

  };

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
              tempEventAddress={theTempEvent.address} tempEventIndex={tempEventIndex} tempEventName={theTempEvent.name} tempEventTime={theTempEvent.time} />)}
        </div>
      </React.Fragment>
    );
  }
}

export default TempEventList;