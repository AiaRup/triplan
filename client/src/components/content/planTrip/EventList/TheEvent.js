import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Collapse } from 'react-collapse';
import './events.css';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: ${props=> (props.isDragging ? 'lightgreen' : 'white')};
  max-width: ${props=> (props.isDragging ? '150px' : 'auto')};
  transition: max-width 0.2 ease;
  font-size: 18px;
`;

@inject(allStores => ({
  deleteEvent: allStores.store.deleteEvent,
  addTempEvent: allStores.store.addTempEvent
}))

@observer
class TheEvent extends Component {

  constructor() {
    super();
    this.state = { toggledCollapse: false };
  }

  collapseToggle = () => {
    this.setState(prevState => ({
      toggledCollapse: !prevState.toggledCollapse
    }));
  };

  regularOrTempEvent = (toggleCollapse) => {
    if (this.props.verifier==='eventOfEvents'){
      return (
        <Draggable draggableId={this.props.eventItem.id} index={this.props.eventIndex}>
          {(provided, snapshot) => (

            <Container
              innerRef={provided.innerRef}
              isDragging={snapshot.isDragging}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="single-event-header-section">

              <button className="btn btn-color btn-sm" onClick={()=>this.props.deleteEvent(this.props.eventIndex, this.props.dayVerifier, this.props.dayIndex)}>x</button>

                <h6 className="event-headline">{this.props.eventName}</h6>

                <div className="place-arrow" onClick={()=>this.collapseToggle(toggleCollapse)}>&raquo;</div>
              </div>

              <Collapse isOpened={this.state.toggledCollapse}>
                <ul>
                  {Object.keys(this.props.eventItem).map((prop, index)=> {
                    if (prop !== 'type' && prop !== 'name' && prop !== 'id' && prop !== 'position') {
                      return <li key={index}>{prop}: {this.props.eventItem[prop]}</li>;
                    }
                    return null;
                  })}
                </ul>
              </Collapse>

            </Container>
          )}
        </Draggable>
      );

    } else if (this.props.verifier==='eventOfTempEvent') {
      return (
        <div className="events-list-container">
          <div className="single-event-header-section">
            <h6 className="event-headline">{this.props.tempEventName}</h6>
            <div className="place-arrow" onClick={()=>this.collapseToggle(toggleCollapse)}>&raquo;</div>
          </div>

          <Collapse isOpened={this.state.toggledCollapse}>
            <ul>
              {Object.keys(this.props.tempEvent).map((prop, index)=> {
                if (prop !== 'type' && prop !== 'name' && prop !== 'id' && prop !== 'position') {
                  return <li key={index}>{prop}: {this.props.tempEvent[prop]}</li>;
                }
                return null;
              })}
            </ul>
          </Collapse>
          <button className="btn btn-primary btn-sm" onClick={()=>this.props.addTempEvent(this.props.tempEvent)}>Add</button>

        </div>
      );

    }

  }
  render() {
    const toggleCollapse = false;

    return this.regularOrTempEvent(toggleCollapse);

  }
}

export default TheEvent;