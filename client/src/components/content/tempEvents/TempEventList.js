import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import axios from 'axios';
import styled from 'styled-components';
import TheEvent from '../planTrip/EventList/TheEvent';
import EventPickDate from './EventPickDate';
import './datePickerCss.css';
import {Collapse} from 'react-collapse';
 

const apiKey = '2H98vvmL8G3zZvx7';

const Container = styled.div`
  margin-left: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: auto;
  min-height: 200px;
  width: 25%;
`;

const Wrapper = styled.div`
display: flex;
`;


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
    this.state =  {toggledCollapse: false};

  }

  getEvents = () => {
    axios.get(`http://eventful.com/events?q=music`).then(res => {
      console.log(res)
      this.props.testEventsArray.push(res)
      console.log(`testEventsArray: ${JSON.stringify(this.props.testEventsArray)}`)
      console.log(`start date: ${JSON.stringify(this.props.tempEventCalander[0])}`, `end date: ${this.props.tempEventCalander[1]}`)
    })
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
        <Container>
          <div className='datesHead'>
            <h5 onClick={()=>this.collapseToggle(toggleCollapse)}>Find Events Nearby &raquo;</h5>
              <Collapse isOpened={this.state.toggledCollapse}>
                <Wrapper>
                  <EventPickDate/>
                  <button className='btn-temp-event-date' onClick={this.getEvents}>Events</button>
                </Wrapper>
              </Collapse>
          </div>
          {this.props.tempEventArray.map((theTempEvent, tempEventIndex) => 
          <TheEvent key={theTempEvent.id} 
          verifier="eventOfTempEvent"
          tempEventAddress={theTempEvent.address} tempEventIndex={tempEventIndex} tempEventName={theTempEvent.name} tempEventTime={theTempEvent.time} />)}
        </Container>
      </React.Fragment>
    );
  }
}
 
export default TempEventList;