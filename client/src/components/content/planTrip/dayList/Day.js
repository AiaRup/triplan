import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Place from '../placeList/place/Place';
import PickDate from './PickDate';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  min-height: 190px;
  height: auto;
  width:130px;
  
`;

const PlaceListUL = styled.div`
  padding: 8px;
  min-height: 120px;
  height: auto;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  transition: background-color 0.2s ease;
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
        isDraggingOver={this.props.snapshot.isDraggingOver}
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
        <PickDate dayIndex={this.props.index}/>
        {/* {this.props.daysArray[this.props.index].date} */}
          <h4>{this.props.day.name}</h4>

          <Droppable droppableId={this.props.day.id}>
          {(provided, snapshot)=> (
            <DragNdropPlaceInDay index={this.props.index} provided={provided} snapshot={snapshot}/>
          )}
          </Droppable>

        </Container>
      </React.Fragment>
    );
  }
}

export default Day;