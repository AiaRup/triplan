import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Place from './place/Place';
import './places.css'


const PlaceListUL = styled.div`
padding: 8px;
min-height: 200px;
height: auto;
background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
transition: background-color 0.2s ease;

`;

@inject(allStores => ({
  placesArray: allStores.store.placesArray}))


  @observer class DroppablePlaces extends Component {

    render() {
      return (
        <PlaceListUL 
        innerRef={this.props.provided.innerRef}
        isDraggingOver={this.props.snapshot.isDraggingOver}
        {...this.props.provided.droppableProps} 
        >
          {this.props.placesArray.map((place, index) => <Place key={place.id} placeIndex={index} thePlace={place} verifier="placeOfPlace"/>)}

          {this.props.provided.placeholder}
        </PlaceListUL>  
      )};
    };


@observer
class PlaceList extends Component {
 
  render() {
    return (
        <div className="places-list-container">
        <div className="place-container-headline">
          <h3>Places</h3>
          </div>
          <div className="placeList-background-div">
          <Droppable droppableId="placesContainer">
           {(provided, snapshot) => (
             <DroppablePlaces provided={provided} snapshot={snapshot}/>
          )}
          </Droppable>
          </div>
        </div>
    )};
};

export default PlaceList;