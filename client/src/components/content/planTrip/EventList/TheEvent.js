import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Collapse } from 'react-collapse';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: ${props=> (props.isDragging ? 'lightgreen' : 'white')};
  max-width: ${props=> (props.isDragging ? '150px' : 'auto')};
  transition: max-width 0.2 ease;
  color: pink;
  font-size: 18px;
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

  constructor() {
    super();
    this.state =  {toggledCollapse: false};
  }

  collapseToggle = () => {
    this.setState(prevState => ({
      toggledCollapse: !prevState.toggledCollapse
    }));
  };

  regularOrTempEvent = (toggleCollapse) => {
    if(this.props.verifier==="eventOfEvents"){
      return (
      <Draggable draggableId={this.props.eventItem.id} index={this.props.eventIndex}>
        {(provided, snapshot) => (

          <Container
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          >
            <h5 onClick={()=>this.collapseToggle(toggleCollapse)}>&raquo;</h5>
        
            <button onClick={()=>this.props.deleteEvent(this.props.eventIndex, this.props.dayVerifier, this.props.dayIndex)}>x</button>
            <div>
              <h6>{this.props.eventName}</h6>
              <Collapse isOpened={this.state.toggledCollapse}>
                <p>Time: {this.props.eventItem.time}</p>
                <p>Address: {this.props.eventItem.address}</p>
              </Collapse>
            </div>
          </Container>
        )}
      </Draggable>
        
      );

    }else if(this.props.verifier==="eventOfTempEvent") {
      return(
      <React.Fragment>
      <Wrapper>
          
        <h6>{this.props.tempEventName}</h6>
        <h5 onClick={()=>this.collapseToggle(toggleCollapse)}>&raquo;</h5>

        <Collapse isOpened={this.state.toggledCollapse}>
          <p>Address: {this.props.tempEventAddress}</p>
          <p>Time: {this.props.tempEventTime}</p>
          <button onClick={()=>this.props.addTempEvent(this.props.tempEventIndex)}>Add Event</button>
        </Collapse>
        
      </Wrapper>
    </React.Fragment>
  );
      
    }

  }
  render() {
    const toggleCollapse = false;

    return this.regularOrTempEvent(toggleCollapse)
 
  }
}

export default TheEvent;