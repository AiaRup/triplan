import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import TheEvent from '../planTrip/EventList/TheEvent';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: auto;
  min-height: 200px;
  width: 25%;
`;

@inject(allStores => ({
  tempEventArray: allStores.store.tempEventArray
}))
@observer
class TempEventList extends Component {
  
  render() { 
    console.log(this.props.tempEventArray)
    return (  
      <React.Fragment>
        <Container>
          <h3>Event at 17/7/2018</h3>
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