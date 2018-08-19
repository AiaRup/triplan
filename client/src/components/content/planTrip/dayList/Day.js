import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Place from '../placeList/place/Place';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  height: 190px;
  width:120px
`;

const PlaceListUL = styled.ul`
`;


@inject(allStores => ({
  deleteDay: allStores.store.deleteDay,
  daysArray: allStores.store.daysArray
}))


@observer class DragNdropPlaceInDay extends Component {

  render() {
    return (
        <PlaceListUL 
        innerRef={this.props.provided.innerRef}
        {...this.props.provided.droppableProps} 
      >
         {this.props.daysArray[this.props.index].places.map((place, index)=><Place key={place.id} placeIndex={index} dayIndex={this.props.index} place={place} verifier="placeOfDay"/>)}
        {this.props.provided.placeholder}
      </PlaceListUL>
      
      
    )}


    
  }
  @inject(allStores => ({
    deleteDay: allStores.store.deleteDay,
    daysArray: allStores.store.daysArray
  }))
@observer 
class Day extends Component {
  render() {

    return (
      <React.Fragment>
        <Container>
        <button onClick={()=>this.props.deleteDay(this.props.index)}>X</button>

          <h4>{this.props.day.name}</h4>
          <Droppable droppableId={this.props.day.id}>
          {provided => (
            <DragNdropPlaceInDay index={this.props.index} provided={provided}/>
          )}
          </Droppable>
        </Container>
      </React.Fragment>
    );
  }
}

export default Day;