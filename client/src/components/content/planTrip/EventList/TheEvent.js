import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Wrapper = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: auto;
  min-height: 40px;
  width: auto;
`;

@inject(allStores => ({
  deleteEvent: allStores.store.deleteEvent,
  addTempEvent: allStores.store.addTempEvent
}))

@observer
class TheEvent extends Component {

  regularOrTempEvent = () => {
    if(this.props.verifier==="eventOfEvents"){
      return (
        <React.Fragment>
          <Container>
          <button onClick={()=>this.props.deleteEvent(this.props.theEventIndex)}>X</button>
          {this.props.theEventName}
          </Container>
        </React.Fragment>
      );

    }else if(this.props.verifier==="eventOfTempEvent") {
      return(
      <React.Fragment>
      <Wrapper>
          
        <h5>Event: {this.props.tempEventName}</h5>
        <p>Address: {this.props.tempEventAddress}</p>
        <p>Time: {this.props.tempEventTime}</p>
        <button onClick={()=>this.props.addTempEvent(this.props.tempEventIndex)}>Add Event</button>
      </Wrapper>
    </React.Fragment>
  );
      
    }

  }
  render() {
    return this.regularOrTempEvent()
 
  }
}

export default TheEvent;