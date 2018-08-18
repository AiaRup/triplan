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
        <ul>
            {this.props.eventsArray.map((theEvent, index) => <li key={index}><TheEvent index={index} theEvent={theEvent}/></li>)}
          </ul>
      </Container>
    );
  }
}

export default EventList;