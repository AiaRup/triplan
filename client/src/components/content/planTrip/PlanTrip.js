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
@observer
class PlanTrip extends Component {



  onDragEnd = result => {
    const daysArray = this.props.daysArray;
    const placesArray = this.props.placesArray;
    const { destination, source } = result;
    
    //if drag stop in the middle - do nothing
    if (!destination) {
        return;
    }

    //if drag dropped in the same place - do nothing
    if (
        source.droppableId === destination.droppableId && 
        source.index === destination.index
    ) {
        return;
    }

    //convert day ID to index
    const daySourceIndex = daysArray.findIndex(p=> p.id === source.droppableId);
    const dayDestinationIndex = daysArray.findIndex(p=> p.id === destination.droppableId);
    
    //if drag is in the same container - only reorder the item inside the div
    if (source.droppableId === destination.droppableId) {

        //if the drag is in the PLACE CONTAINER ONLY
        if(source.droppableId === "placesContainer" && destination.droppableId === "placesContainer"){

            //get the place item
            const placeInPlaces = placesArray[source.index]
            
            //cut & paste item(place)
            placesArray.splice(source.index, 1);
            placesArray.splice(destination.index, 0, placeInPlaces);

        //If the drag is in the day container to itself
        }else if(source.droppableId !== "placesContainer" && source.droppableId === destination.droppableId ){
            
            //get the place item
            const placeInDay = daysArray[daySourceIndex].places[source.index];
            
            //cut & paste item(place)
            daysArray[daySourceIndex].places.splice(source.index, 1);
            daysArray[daySourceIndex].places.splice(destination.index, 0, placeInDay);
            }

    //if the drag is between the day containers
    }else if((source.droppableId !== "placesContainer")&& (destination.droppableId !== "placesContainer" ) && (source.droppableId !== destination.droppableId) ) {

        //get the place item
        const dayDraggedPlace = daysArray[daySourceIndex].places[source.index];

        //cut & paste item(place) between the days
        daysArray[daySourceIndex].places.splice(source.index, 1)
        daysArray[dayDestinationIndex].places.splice(destination.index, 0, dayDraggedPlace)

    //if the drag is from places to days
    }else if(source.droppableId === "placesContainer" && destination.droppableId !== "placesContainer")  {
        
        //get place item
        const placePlacesToDay = placesArray[source.index];

        //cut & paste
        placesArray.splice(source.index, 1);
        daysArray[dayDestinationIndex].places.splice(destination.index, 0, placePlacesToDay)

    //if the drag is from days to places
    }else if(source.droppableId !== "placesContainer" && destination.droppableId === "placesContainer"){

        //get place item
        const placeItem = daysArray[daySourceIndex].places[source.index];
        
        //cut & paste
        daysArray[daySourceIndex].places.splice(source.index, 1);
        placesArray.splice(destination.index, 0, placeItem);
    }

}
     
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