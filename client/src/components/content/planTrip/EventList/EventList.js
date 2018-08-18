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
       
            {this.props.eventsArray.map((theEvent, index) => <TheEvent key={theEvent.id} index={index} theEvent={theEvent}/>)}
          
      </Container>
    );
  }
}

export default EventList;