import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react'; 
import DayList from './dayList/DayList';
import styled from 'styled-components';
import PlaceList from './placeList/PlaceList';
import EventList from './EventList/EventList';

const Container = styled.div `
  margin: 8px;
  border-radius: 2px;
  
`;

const Wrapper = styled.div `
margin: 8px;
border-radius: 2px;
display: flex;
flex-direction: row;
`;


@inject(allStores => ({
    placesArray: allStores.store.placesArray,
    daysArray: allStores.store.daysArray
}))
  
class PlanTrip extends Component {

  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
        return;
    }

    if (
        destination.droppableId === source.droppableId && 
        destination.index === source.index
    ) {
        return;
    }
     
  
     //dragging inside the Place Container
     if(source.droppableId === "placesContainer"){
     const idToIndexPlaces = this.props.placesArray.findIndex(p=>p.id===draggableId)
     const dragger = this.props.placesArray[idToIndexPlaces]
     
     this.props.placesArray.splice(source.index, 1);
     this.props.placesArray.splice(destination.index, 0, dragger);
     console.log(source)
     console.log(destination)
     }else {

     //dragging inside the day contianer
     

     //!!WHY RETURNS UNDIFNED AND NULL??
 
     const dayIdtoindex = this.props.daysArray.findIndex(p=> p.id === source.droppableId)
     console.log('source.droppableId '+dayIdtoindex)

     const idToIndexPlace = this.props.daysArray[dayIdtoindex].places.findIndex(p=> p.id===draggableId)
        console.log('draggableIdIndex '+ idToIndexPlace)
        console.log('draggableId '+draggableId)

        source.index=idToIndexPlace
        console.log(source)
        console.log(destination)
     const draggedPlace = this.props.daysArray[dayIdtoindex].places[idToIndexPlace]

    this.props.daysArray.splice(source.index, 1);
    this.props.daysArray.splice(destination.index, 0, draggedPlace);
     }



  };
    render() {
        return (
            <React.Fragment>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Container>

                        <Wrapper>
                            <PlaceList/>
                            <EventList/>
                        </Wrapper>

                        <DayList/>

                    </Container>
                </DragDropContext>
            </React.Fragment>
        );
    }
}

export default PlanTrip;