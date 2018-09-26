import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Place from './place/Place';
import './places.css';


const PlaceListUL = styled.div`
padding: 8px;
height: auto;
min-height: 55vh;
background-color: ${props => (props.isDraggingOver ? '#f8a10070' : 'white')};
transition: background-color 0.2s ease;

`;

@inject(allStores => ({
  placesArray: allStores.store.placesArray }))


  @observer class DroppablePlaces extends Component {

  render() {
    return (
      <PlaceListUL
        innerRef={this.props.provided.innerRef}
        isDraggingOver={this.props.snapshot.isDraggingOver}
        {...this.props.provided.droppableProps}
      >
        {this.props.placesArray.map((place, index) => <Place key={place.iternalId} placeIndex={index} thePlace={place} verifier="placeOfPlace"/>)}

        {this.props.provided.placeholder}
      </PlaceListUL>
    );}
}


@observer
class PlaceList extends Component {

  render() {
    return (
      <div className='places-list-container'>
        <h5 className='place-container-headline'>Places</h5>
        <div className="place-overflow">
          <Droppable droppableId="placesContainer">
            {(provided, snapshot) => (
              <DroppablePlaces provided={provided} snapshot={snapshot}/>
            )}
          </Droppable>
        </div>
      </div>
    );}
}

export default PlaceList;