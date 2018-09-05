import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Place from '../placeList/place/Place';
import PickDate from './PickDate';
import TheEvent from '../EventList/TheEvent';
import './day.css';


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
        className="droppable-size"
      >

        {this.props.daysArray[this.props.index].places.map((item, index)=>{
          if (item.type==='event') {

            return (<TheEvent key={item.iternalId} eventIndex={index} dayIndex={this.props.index} eventName={item.name} eventItem={item} verifier="eventOfEvents" dayVerifier="eventsInDay"/>)

            }else if (item.type==='place'){
              return(<Place key={item.iternalId} placeIndex={index} dayIndex={this.props.index} thePlace={item} verifier="placeOfDay"/>)}
          }
        )}

        {this.props.provided.placeholder}
      </PlaceListUL>
    );}


}
  @inject(allStores => ({
    deleteDay: allStores.store.deleteDay,
    daysArray: allStores.store.daysArray
  }))
@observer
class Day extends Component {
  render() {
    return (

      <div className="day-container">
        <button className="btn btn-secondary btn-sm" onClick={()=>this.props.deleteDay(this.props.index)}>X</button>

        <div className="pick-date">
          <PickDate dayIndex={this.props.index}/>
        </div>
        {/* <h4>{this.props.day.name}</h4> */}

        <Droppable droppableId={this.props.day.id} 
        >
          {(provided, snapshot)=> (
            <DragNdropPlaceInDay index={this.props.index} provided={provided} snapshot={snapshot}/>
          )}
        </Droppable>

      </div>
    );
  }
}

export default Day;