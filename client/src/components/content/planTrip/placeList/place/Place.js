import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: ${props=> (props.isDragging ? 'lightgreen' : 'white')};
  max-width: ${props=> (props.isDragging ? '100px' : 'auto')};
  transition: max-width 0.2 ease;
`;

@inject(allStores => ({
  deletePlace: allStores.store.deletePlace,
  deletePlaceInDay: allStores.store.deletePlaceInDay}))
class Place extends Component {

  
  checkForDiv = () => {
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
          <button onClick={()=>this.props.deletePlace(this.props.index)}>X</button>
            {this.props.thePlace.name}
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
            <button onClick={()=>this.props.deletePlaceInDay(this.props.dayIndex, this.props.placeIndex)}>X</button>
              {this.props.place.name}
          </Container>
      )}
      </Draggable>
    );
    }
  
}

  render() {
    
    return (
      this.checkForDiv()
    );
    
  }
}

export default Place;