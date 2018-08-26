import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { inject } from 'mobx-react';
import styled from 'styled-components';
import { Collapse } from 'react-collapse';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: ${props=> (props.isDragging ? 'lightgreen' : 'white')};
  max-width: ${props=> (props.isDragging ? '100px' : 'auto')};
  transition: max-width 0.2 ease;
  color: blue;
`;

@inject(allStores => ({
  deletePlace: allStores.store.deletePlace,
  deletePlaceInDay: allStores.store.deletePlaceInDay}))
class Place extends Component {
  constructor() {
    super();
    this.state =  {toggledCollapse: false};
  };

  collapseToggle = () => {
    this.setState(prevState => ({
      toggledCollapse: !prevState.toggledCollapse
    }));
  };
  
  checkForDiv = (toggleCollapse) => {
    if(this.props.verifier==="placeOfPlace"){
      return (
    <Draggable draggableId={this.props.thePlace.id} index={this.props.index}>
    {(provided, snapshot) => (
        <Container
        innerRef={provided.innerRef}
        isDragging={snapshot.isDragging}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        >
          <h5 onClick={()=>this.collapseToggle(toggleCollapse)}>&raquo;</h5>
          <button onClick={()=>this.props.deletePlace(this.props.index)}>X</button>
            {this.props.thePlace.name}
            <Collapse isOpened={this.state.toggledCollapse}>
            checking
            </Collapse>
        </Container>
    )}

    </Draggable>
    
  );
} else if(this.props.verifier==="placeOfDay"){
  
    return (
      <Draggable draggableId={this.props.place.id} index={this.props.placeIndex}>
      {(provided, snapshot) => (
          <Container
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          >
            <h5 onClick={()=>this.collapseToggle(toggleCollapse)}>&raquo;</h5>
            <button onClick={()=>this.props.deletePlaceInDay(this.props.dayIndex, this.props.placeIndex)}>X</button>
              {this.props.place.name}
              <Collapse isOpened={this.state.toggledCollapse}>
              checking
            </Collapse>
          </Container>
      )}
      </Draggable>
    );
    }
  
}

  render() {
    const toggleCollapse = false;

    return (
      this.checkForDiv(toggleCollapse)
    );
    
  }
}

export default Place;