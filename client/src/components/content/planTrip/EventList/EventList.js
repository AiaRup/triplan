import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import TheEvent from './TheEvent';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: auto;
  min-height: 200px;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

@inject(allStores => ({
  eventsArray: allStores.store.eventsArray}))
@observer
class EventList extends Component {
  render() {
    return (
 
      <Container>
        <h5>Events</h5>
       
            {this.props.eventsArray.map((theEvent, theEventIndex) => <TheEvent key={theEvent.id} theEventIndex={theEventIndex} theEventName={theEvent.name}/>)}
          
      </Container>
    );
  }
}

export default EventList;