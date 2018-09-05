import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import { Collapse } from 'react-collapse';
import '../places.css';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: ${props=> (props.isDragging ? 'lightgreen' : 'white')};
  transition: max-width 0.2 ease;
`;

@inject(allStores => ({
  deletePlace: allStores.store.deletePlace,
  deletePlaceInDay: allStores.store.deletePlaceInDay }))

class Place extends Component {
  constructor() {
    super();
    this.state = { toggledCollapse: false };
  }

  collapseToggle = () => {
    this.setState(prevState => ({
      toggledCollapse: !prevState.toggledCollapse
    }));
  };


  placeOrDayDelete = () => {
    if (this.props.verifier==='placeOfDay'){
      this.props.deletePlaceInDay(this.props.dayIndex, this.props.placeIndex);
    } else {
      this.props.deletePlace(this.props.placeIndex);
    }
  }

  render() {
    const toggleCollapse = false;

    return (
      <Draggable draggableId={this.props.thePlace.iternalId} index={this.props.placeIndex}>
        {(provided, snapshot) => (

          <Container
            innerRef={provided.innerRef}
            isDragging={snapshot.isDragging}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='single-place-header-section'>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.placeOrDayDelete}>x</button>
              <h6 className='place-headline'>{this.props.thePlace.name}</h6>
              <div className="place-arrow" onClick={()=>this.collapseToggle(toggleCollapse)}>&raquo;</div>
            </div>
            <Collapse isOpened={this.state.toggledCollapse}>
              <ul className="place-content-li">
                {Object.keys(this.props.thePlace).map((prop, index)=> {
                  if (prop !== 'id' && prop !== 'type' && prop !== 'position') {
                    return <li key={index}>{prop}: {this.props.thePlace[prop]}</li>;
                  }
                  return null;
                })}
              </ul>
            </Collapse>

          </Container>
        )}
      </Draggable>
    );
  }
}

export default Place;