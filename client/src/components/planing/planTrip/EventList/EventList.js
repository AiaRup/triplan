import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import TheEvent from './TheEvent';

const EventListUL = styled.div`
padding: 8px;
height: auto;
min-height: 55vh;
background-color: ${props => (props.isDraggingOver ? '#f8a10070' : 'white')};
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
          // console.log('eventOfEvents', eventItem.iternalId);
          return <TheEvent key={eventItem.iternalId} eventIndex={eventItemIndex} eventName={eventItem.name} eventItem={eventItem}
          
          verifier="eventOfEvents" dror="eventsInEvents" />;
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
        <h5 className='event-container-headline'>Events</h5>
        <div className="eventList-overflow">
          <Droppable droppableId="eventsContainer"
          >
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