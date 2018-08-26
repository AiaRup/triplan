import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
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


const EventListUL = styled.div`
padding: 8px;
min-height: 200px;
height: auto;
background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
transition: background-color 0.2s ease;
`;

@inject(allStores => ({
  eventsArray: allStores.store.eventsArray
}))

@observer class DroppableEvent extends Component {

  render() {
    return (
      <EventListUL 
      innerRef={this.props.provided.innerRef}
      isDraggingOver={this.props.snapshot.isDraggingOver}
      {...this.props.provided.droppableProps} 
      >
        {this.props.eventsArray.map((eventItem, eventItemIndex) => (
        <TheEvent key={eventItem.id} eventIndex={eventItemIndex} eventName={eventItem.name} eventItem={eventItem} verifier="eventOfEvents" dror="eventsInEvents"/>))}
        
        {this.props.provided.placeholder}
      </EventListUL>
    )};
};



@inject(allStores => ({
  eventsArray: allStores.store.eventsArray
}))
@observer
class EventList extends Component {

  render() {
    return (
      <Container>
        <h5>Events</h5>
          <Droppable droppableId="eventsContainer">
            {(provided, snapshot) => (
                <DroppableEvent provided={provided} snapshot={snapshot}/>
            )}
            
          </Droppable>
      </Container>
    );
  }
}

export default EventList;