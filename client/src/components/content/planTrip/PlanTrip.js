import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import DayList from './dayList/DayList';
import PlaceList from './placeList/PlaceList';
import EventList from './EventList/EventList';
import _ from 'lodash';
import './planTrip.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Notification, { notify } from 'react-notify-toast';
import InlineEdit from 'react-inline-editing';

@inject(allStores => ({
  placesArray: allStores.store.placesArray,
  daysArray: allStores.store.daysArray,
  eventsArray: allStores.store.eventsArray,
  user_id: allStores.store.user_id,
  cityName: allStores.store.cityName,
  resetNumDays: allStores.store.resetNumDays,
  tripName : allStores.store.tripName,
  saveTripName : allStores.store.saveTripName
}))
@observer
class PlanTrip extends Component {

  saveTrip = (event) => {

    if (this.props.daysArray.length === 0) {
      // alert('Please add days to your plan')
      let myColor = { background: '#20313b', text: '#FFFFFF' };
      notify.show('Please add days to your plan', 'custom', 5000, myColor);
      return;
    }

    if (this.props.tripName === 'Name Your Trip' || this.props.tripName === '') {
      // alert('Please name your trip')
      let myColor = { background: '#20313b', text: '#FFFFFF' };
      notify.show('Please name your trip', 'custom', 5000, myColor);
      return;
    }

    // check if each day is not empty
    for (let i = 0; i < this.props.daysArray.length; i++) {
      if (this.props.daysArray[i].places.length === 0) {
        let myColor = { background: '#20313b', text: '#FFFFFF' };
        notify.show('There is an empty day in your trip', 'custom', 5000, myColor);
        return;
      }
    }

    if (window.confirm('Are you sure you want to save your trip?')) {
      const tripUser = {
        plan: {
          name: this.props.tripName,
          days: this.props.daysArray,
          city: this.props.cityName
        },
        tempPlaces: this.props.placesArray,
        tempEvents: this.props.eventsArray
      };

      console.log('trip to server', tripUser);

      axios.post(`/api/users/users/${this.props.user_id}/plantrip`, tripUser)
        .then(response => {
          console.log('back to axios', response);
          // reset days to 0
          this.props.resetNumDays();
          // Link to trirps page
          // <Link to='MyTrips/'></Link>;
        })
        .catch(function (error) {
          console.log(error.response);
        });
    }
  };

  onDragEnd = result => {
    const daysArray = this.props.daysArray;
    const placesArray = this.props.placesArray;
    const eventsArray = this.props.eventsArray;
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

    //if drag dragging places to events and vise versa - do nothing
    if (
      source.droppableId === 'placesContainer' &&
      destination.droppableId === 'eventsContainer'
    ) {
      return;
    }

    if (
      source.droppableId === 'eventsContainer' &&
      destination.droppableId === 'placesContainer'
    ) {
      return;
    }

    //convert day ID to index
    const daySourceIndex = daysArray.findIndex(p => p.id === source.droppableId);
    const dayDestinationIndex = daysArray.findIndex(p => p.id === destination.droppableId);

    //if drag is in the same container - only reorder the item inside the div
    if (source.droppableId === destination.droppableId) {

      //if the drag is in the PLACE CONTAINER ONLY
      if (source.droppableId === 'placesContainer' && destination.droppableId === 'placesContainer') {

        //get the place item
        const placeInPlaces = placesArray[source.index];

        //cut & paste item(place)
        placesArray.splice(source.index, 1);
        placesArray.splice(destination.index, 0, placeInPlaces);
      }
      //If the drag is in the day container to itself
      if ((source.droppableId !== 'placesContainer' && source.droppableId !== 'eventsContainer') && source.droppableId === destination.droppableId) {

        //get the place item
        const placeInDay = daysArray[daySourceIndex].places[source.index];

        //cut & paste item(place)
        daysArray[daySourceIndex].places.splice(source.index, 1);
        daysArray[daySourceIndex].places.splice(destination.index, 0, placeInDay);

        //Dragging inseide EVENTS CONTAINER
      } else if (source.droppableId === 'eventsContainer' && destination.droppableId === 'eventsContainer') {

        const eventInEvents = eventsArray[source.index];

        eventsArray.splice(source.index, 1);
        eventsArray.splice(destination.index, 0, eventInEvents);
      }
    }
    //if the drag is between the day containers
    if ((source.droppableId !== 'placesContainer') && (destination.droppableId !== 'placesContainer') && (source.droppableId !== destination.droppableId) && (source.droppableId !== 'eventsContainer') && (destination.droppableId !== 'eventsContainer')) {


      //get the place item
      const dayDraggedPlace = daysArray[daySourceIndex].places[source.index];

      //cut & paste item(place) between the days
      daysArray[daySourceIndex].places.splice(source.index, 1);
      daysArray[dayDestinationIndex].places.splice(destination.index, 0, dayDraggedPlace);
    }
    //if the drag is from places to days
    if (source.droppableId === 'placesContainer' && destination.droppableId !== 'placesContainer') {

      //get place item
      const placePlacesToDay = placesArray[source.index];

      //cut & paste
      placesArray.splice(source.index, 1);
      daysArray[dayDestinationIndex].places.splice(destination.index, 0, placePlacesToDay);
    }
    //if the drag is from days to places
    if (source.droppableId !== 'placesContainer' && destination.droppableId === 'placesContainer' && daysArray[daySourceIndex].places[source.index].type !== 'event') {

      //get place item
      const placeItem = daysArray[daySourceIndex].places[source.index];

      //cut & paste
      daysArray[daySourceIndex].places.splice(source.index, 1);
      placesArray.splice(destination.index, 0, placeItem);
    }

    //if dragging from EVENTS to DAYS
    if (source.droppableId === 'eventsContainer' && destination.droppableId !== 'eventsContainer' && destination.droppableId === daysArray[dayDestinationIndex].id) {

      const eventItem = eventsArray[source.index];
      eventsArray.splice(source.index, 1);
      daysArray[dayDestinationIndex].places.splice(destination.index, 0, eventItem);
    }

    //if dragging from DAYS to EVENTS
    if (destination.droppableId === 'eventsContainer' && destination.droppableId !== 'placesContainer' && source.droppableId !== 'eventsContainer' && source.droppableId === daysArray[daySourceIndex].id) {

      const eventItemFromDay = daysArray[daySourceIndex].places[source.index];
      if (eventItemFromDay.type === 'event') {
        daysArray[daySourceIndex].places.splice(source.index, 1);
        eventsArray.splice(destination.index, 0, eventItemFromDay);
      } else {
        return;
      }

    }
  }

  render() {
    return (
      <React.Fragment>
        <Notification options={{ zIndex: 200, top: '250px' }} />

        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className='plan-trip-container'>
            <div className="name-trip-container">
              <i className="fa fa-pencil edit-trip-label" aria-hidden="true"></i>
              <InlineEdit inputClassName="inlineInput" labelClassName="inlineEdit" text={this.props.tripName} onFocusOut={(data) => {
                this.props.saveTripName(data);
              }} />
            </div>
            <div className='place-event-containers'>
              <PlaceList />
              <EventList />
              <DayList />

            </div>

            {/* <DayList /> */}
          </div>
          {/* <button onClick={() => { if (window.confirm('Are you sure you want to save your trip?')) { this.saveTrip() } }} className="save-trip-btn">Save Trip</button> */}
          <button onClick={this.saveTrip} className="btn btn-secondary save-trip-btn">Save Trip</button>

        </DragDropContext>
      </React.Fragment>
    );
  }
}

export default PlanTrip;