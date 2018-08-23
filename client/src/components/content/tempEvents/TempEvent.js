import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: auto;
  min-height: 40px;
  width: auto;
`;

class TempEvent extends Component {
  
  render() { 
    return (  
      <React.Fragment>
        <Container>
          
          <h5>Event: {this.props.tempEventName}</h5>
          <p>Address: {this.props.tempEventAddress}</p>
          <p>Time: {this.props.tempEventTime}</p>
          <button onClick={()=>this.props.addTempEvent(this.props.tempEventIndex)}>Add Event</button>
        </Container>
      </React.Fragment>
    );
  }
}
 
export default TempEvent;