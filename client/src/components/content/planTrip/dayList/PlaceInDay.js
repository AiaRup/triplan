import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { inject } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  background-color: white;
`;

@inject(allStores => ({
  deletePlaceInDay: allStores.store.deletePlaceInDay}))
class PlaceInDay extends Component {
  render() {
    return (
      <Draggable draggableId={this.props.place.id}>
      {provided => (
          <Container
          innerRef={provided.innerRef}
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

export default PlaceInDay;