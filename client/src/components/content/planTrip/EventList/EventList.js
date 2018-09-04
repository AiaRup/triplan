import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import TheEvent from './TheEvent';

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
@observer
class DroppableEvent extends Component {

  render() {
    return (
      <EventListUL
        innerRef={this.props.provided.innerRef}
        isDraggingOver={this.props.snapshot.isDraggingOver}
        {...this.props.provided.droppableProps}
      >
        {this.props.eventsArray.map((eventItem, eventItemIndex) => {
          console.log('event in map', eventItem);
          return <TheEvent key={eventItem.id} eventIndex={eventItemIndex} eventName={eventItem.name} eventItem={eventItem} verifier="eventOfEvents" dror="eventsInEvents" />;
        })}


        {this.props.provided.placeholder}
      </EventListUL>
    );
  }
}



@inject(allStores => ({
  eventsArray: allStores.store.eventsArray
}))
@observer
class EventList extends Component {

  render() {
    return (
      <div className="event-list-container">
      <div className="event-container-headline">
        <h3>Events</h3>
        </div>
        <div className="eventList-background-div">
        <Droppable droppableId="eventsContainer" >
          {(provided, snapshot) => (
            <DroppableEvent provided={provided} snapshot={snapshot}/>
          )}

        </Droppable>
        </div>
      </div>
    );
  }
}

export default EventList;