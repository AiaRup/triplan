import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';
import TempEvent from './TempEvent';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: auto;
  min-height: 200px;
  width: 25%;
`;

@inject(allStores => ({
  tempEventArray: allStores.store.tempEventArray,
  addTempEvent: allStores.store.addTempEvent
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
          <TempEvent key={theTempEvent.id} tempEventAddress={theTempEvent.address} tempEventIndex={tempEventIndex} tempEventName={theTempEvent.name} tempEventTime={theTempEvent.time} addTempEvent={this.props.addTempEvent}/>)}
        </Container>
      </React.Fragment>
    );
  }
}
 
export default TempEventList;