import React, { Component } from 'react';
import { observable, action } from 'mobx';
import axios from 'axios';


class TripStore extends Component {

  @observable user_id = ''
  @observable cityName= 'London'
  @observable tripName= 'Name Your Trip'
  @observable address = { lat: 51.507351, lng: -0.127758 };
  @observable numOfDays = 0;
  @observable eventCategory = [];


  @action addNotes = (note, index) => {
    console.log('note ', note, 'index ', index);
    // this.oneTrip.days[index].notes.push(note);
    this.oneTrip.days[index].notes = note;
    console.log(`oneTrip.days[${index}].notes, ${note} `);
  }

  @action updateNotes = (data, index) => {
    this.oneTrip.days[index].notes = data;
  }


  @action savePlans = (plans) => {
    this.plansArray = plans;
  }

  @observable plansArray = [];

  @observable daysArray = [];
  @observable placesArray = [];
  @observable eventsArray = [];
  @observable tempEventArray = [];
  @observable testEventsArray = [];

  @observable tempEventCalander =
      { startDate: new Date(),
        endDate: new Date() };


  @observable showLogin = true;

  /*********** ACTIONS ***********/

  // save the user Id recieved from mongo
  @action configUser = (userID) => {
    this.user_id = userID;
    console.log('id in store', this.user_id);
  }

  // change display of login form and register form
  @action toggleLoginRegister = () => {
    this.showLogin = !this.showLogin;
  }

  // add attraction to places array
  @action addPlace = (place) => {
    this.placesArray.push(place);
  }

  // update address when user serch a place on map
  @action saveAddress = (address) => {
    this.address = address;
    console.log('address in store', this.address);
  }

  // update city when user serch a place on map
  @action saveCity = (city) => {
    this.cityName = city;
    console.log('city in store', this.cityName);
  }
  // update trip name when user changes the name
  @action saveTripName = (name) => {
    this.tripName = name;
    console.log('name in store', this.tripName);
  }

  // update number of days in trip
  @action resetNumDays = (name) => {
    this.numOfDays = 0;
    console.log('num days reset', this.numOfDays);
  }

  // update category event when user changes the category
  @action updateEventCategory = (category) => {
    this.eventCategory = category;
    console.log('category in store', this.eventCategory);
  }

  //Functionality in DAY
  @action addDay = () => {
    this.numOfDays++;
    this.daysArray.push({ date: new Date(), places: [], id: this.numOfDays });
  }

  @action deleteDay = (index) => {
    this.daysArray.splice(index, 1);
  }

  @action chooseDate = (dayIndex, date) => {
    console.log('date day store', date);
    console.log('index day', dayIndex);

    this.daysArray[dayIndex].date = date;
  }

  @action deletePlaceInDay = (dayIndex, placeIndex) => {
    this.daysArray[dayIndex].places.splice(placeIndex, 1);
  }

  //Functionality in PLACES
  @action deletePlace = (index) => {
    this.placesArray.splice(index, 1);
  }

  //Functionality in EVENTS
  @action deleteEvent = (index, verifier, dayIndex) => {
    if (verifier === 'eventsInDay') {
      this.daysArray[dayIndex].places.splice(index, 1);
    } else {
      this.eventsArray.splice(index, 1);
    }
  }

  @action EventStartDate = (startDate) => {
    console.log('startDate', startDate);
    this.tempEventCalander.startDate = startDate;
    console.log(JSON.stringify(this.tempEventCalander.startDate));
  }

  @action EventEndDate = (endDate) => {
    console.log('endDate', endDate);
    this.tempEventCalander.endDate = endDate;
    console.log(JSON.stringify(this.tempEventCalander.endDate));
  }

  // @action getEvents = () => {
  //   console.log('get events function')
  // }

  //Move from EVENT from TempEvent To EVENTS DIV
  @action addTempEvent = (event) => {
    // let checker = 0;
    // const chosenEvent = this.tempEventArray[tempEventIndex];

    // this.eventsArray.forEach(event => {
    //   if (this.tempEventArray[tempEventIndex].id === event.id) {
    //     checker = 1;
    //     alert('You already have this event');
    //   }
    // });
    // if (checker === 0) {
    //   this.eventsArray.push(chosenEvent);
    // } else {
    //   checker = 0;
    // }

    // const chosenEvent = this.tempEventArray[tempEventIndex];

    this.eventsArray.push(event);
    console.log('eventsArray', this.eventsArray);

  }
}


const store = new TripStore();

window.store = store;
export default store;