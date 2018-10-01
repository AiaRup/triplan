import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { observer, inject } from 'mobx-react';
import DayList from './dayList/DayList';
import PlaceList from '../../planing/planTrip/placeList/PlaceList';
import EventList from './EventList/EventList';
// import _ from 'lodash';
import './planTrip.css';
import axios from 'axios';
import Notification, { notify } from 'react-notify-toast';
import InlineEdit from 'react-inline-editing';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Redirect } from 'react-router-dom';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}
@inject(allStores => ({
  savePlans: allStores.store.savePlans,
  saveTripId: allStores.store.saveTripId,
  placesArray: allStores.store.placesArray,
  daysArray: allStores.store.daysArray,
  eventsArray: allStores.store.eventsArray,
  user_id: allStores.store.user_id,
  cityName: allStores.store.cityName,
  resetNumDays: allStores.store.resetNumDays,
  tripName: allStores.store.tripName,
  saveTripName: allStores.store.saveTripName
}))
@observer
class PlanTrip extends Component {
  state = {
    open: false,
    isSave: false,
    id: null,
    plan: []
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  saveTrip = (event) => {

    if (this.props.daysArray.length === 0) {
      // alert('Please add days to your plan')
      let myColor = { background: '#f50057', text: '#FFFFFF' };
      notify.show('Please add days to your plan', 'custom', 3000, myColor);
      return;
    }

    if (this.props.tripName === 'Name Your Trip' || this.props.tripName === '') {
      // alert('Please name your trip')
      let myColor = { background: '#f50057', text: '#FFFFFF' };
      notify.show('Please name your trip', 'custom', 3000, myColor);
      return;
    }

    // check if each day is not empty
    for (let i = 0; i < this.props.daysArray.length; i++) {
      if (this.props.daysArray[i].places.length === 0) {
        let myColor = { background: '#f50057', text: '#FFFFFF' };
        notify.show('There is an empty day in your trip', 'custom', 3000, myColor);
        return;
      }
    }

    this.handleClickOpen(); // open the dialog only after all the details are filled and ok
  };

  handleSave = () => {
    const tripUser = {
      plan: {
        name: this.props.tripName,
        days: this.props.daysArray,
        city: this.props.cityName
      },
      tempPlaces: this.props.placesArray,
      tempEvents: this.props.eventsArray,
      notes: {
        good: [],
        bad: [],
        neutral: []
      }
    };


    // console.log('trip to server', tripUser);

    axios.post(`/api/users/users/${this.props.user_id}/plantrip`, tripUser)
      .then(response => {
        // notify user
        // notify.show('Trip Saved successfully', 'success', 5000);

        // console.log('back to axios', response);
        const id = response.data.plans[response.data.plans.length - 1]._id;
        const plan = response.data.plans[response.data.plans.length - 1];

        this.props.saveTripId(id);
        this.props.savePlans(response.data.plans);

        this.setState({ isSave: true, plan: plan, id: id });

      })
      .catch(function (error) {
        console.log(error.response);
      });
  }

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

        //Dragging inside EVENTS CONTAINER
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
        <Notification options={{ zIndex: 400, top: '250px' }} />

        {
          this.state.isSave &&
          <Redirect to={`/MyTrips/${this.state.id}`} />
        }

        <DragDropContext onDragEnd={this.onDragEnd}>
          <div className='plan-trip-container'>

            <div className="name-trip-container">
              <i className="fa fa-pencil edit-trip-label" aria-hidden="true"></i>
              <InlineEdit inputClassName="inlineInput" labelClassName="inlineEdit" text={this.props.tripName} onFocusOut={(data) => {
                this.props.saveTripName(data);
              }} />

            </div>
            <div className="save-trip-wrapper">
              <button onClick={this.saveTrip} className="btn save-trip-btn">Save Trip</button>
            </div>
            <div className='place-event-containers'>
              <PlaceList />
              <DayList />
              <EventList />
            </div>

            {/* <DayList /> */}
          </div>
          {/* <button onClick={() => { if (window.confirm('Are you sure you want to save your trip?')) { this.saveTrip() } }} className="save-trip-btn">Save Trip</button> */}
          {/* <button onClick={this.saveTrip} className="btn save-trip-btn">Save Trip</button> */}

        </DragDropContext>

        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'Are you sure you want to save your trip?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Is your trip perfect now?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="secondary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}
export default PlanTrip;