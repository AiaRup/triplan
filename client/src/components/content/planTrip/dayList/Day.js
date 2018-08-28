import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Place from '../placeList/place/Place';
import PickDate from './PickDate';
import TheEvent from '../EventList/TheEvent';


const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  min-height: 190px;
  height: auto;
  min-width:150px;
  width: auto;
  
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
          
          {this.props.daysArray[this.props.index].places.map((item, index)=>{
            if(item.type==='event') {
   
            return (<TheEvent key={item.id} eventIndex={index} dayIndex={this.props.index} eventName={item.name} eventItem={item} verifier="eventOfEvents" dayVerifier="eventsInDay"/>)

            }else if (item.type==='place'){
              return(<Place key={item.id} placeIndex={index} dayIndex={this.props.index} thePlace={item} verifier="placeOfDay"/>)}
          }
        )}

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