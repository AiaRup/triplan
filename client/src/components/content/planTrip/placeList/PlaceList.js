import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Place from './place/Place';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: auto;
  min-height: 200px;
  width: 50%;
`;

const PlaceListUL = styled.div`
padding: 8px;
min-height: 200px;
height: auto;
background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
transition: background-color 0.2s ease;

`;

@inject(allStores => ({
  placesArray: allStores.store.placesArray }))


  @observer class DragNdrop extends Component {

  render() {

    return (
      <PlaceListUL
        innerRef={this.props.provided.innerRef}
        isDraggingOver={this.props.snapshot.isDraggingOver}
        {...this.props.provided.droppableProps}
      >
        {this.props.placesArray.map((place, index) => <Place key={place.id} index={index} thePlace={place} verifier="placeOfPlace"/>)}


        {this.props.provided.placeholder}
      </PlaceListUL>

    );}
}


@observer
class PlaceList extends Component {

  render() {

    return (
      <React.Fragment>
        <Container>
          <h5>Places</h5>
          <Droppable droppableId="placesContainer">
            {(provided, snapshot) => (
              <DragNdrop provided={provided} snapshot={snapshot}/>
            )}
          </Droppable>
        </Container>
      </React.Fragment>
    );
  }
}

export default PlaceList;