import React, { Component } from 'react';
import { observable, action } from 'mobx';


class TripStore extends Component {

  @observable user_id = ''
  @observable cityName= 'London'
  @observable tripName= 'Name Your Trip'
  @observable address = {};
  @observable numOfDays = 0;


  // @observable oneTrip = {
  //   id: 'id1', // will get from the server
  //   name: 'madrid 2018',
  //   days:
  //     [
  //       {
  //         date: '22/08/2018', places:
  //           [ { position: { lat: 32.067270, lng: 34.779642 }, name: 'place1', type: 'hotel' },
  //             { position: { lat: 32.096587, lng: 34.776057 }, name: 'place2', type: 'resturant' } ]
  //       },
  //       {
  //         date: '23/08/2018', places:
  //           [ { position: { lat: 32.800028, lng: 35.526261 }, name: 'place11', type: 'cafe' },
  //             { position: { lat: 32.799917, lng: 35.526974 }, name: 'place22', type: 'resturant' },
  //             { position: { lat: 32.798096, lng: 35.527000 }, name: 'place33', type: 'hotel' } ]
  //       }
  //     ]
  // }

  @observable daysArray = [];

  @observable placesArray = [];

  @observable eventsArray = [ { name: 'Basball', address: 'Levin 4 Street', time: '14:15', id: 'eventId4', type: 'event' }, { name: 'Game Arena', address: 'Corner Street', time: '12:40', id: 'eventId5', type: 'event' } ];

  @observable tempEventArray = [ { name: 'Led Zepplin', address: 'City Center', time: '17:30', id: 'eventId1', type: 'event', date: '' }, { name: 'Madonna', address: 'New York Stadium', time: '20:30', id: 'eventId2', type: 'event' }, { name: 'Jay-Z', address: 'Beat-Pop Club', time: '22:00', id: 'eventId3', type: 'event' } ];

  @observable testEventsArray = [];

  @observable tempEventCalander =
      { startDate: new Date(),
        endDate: new Date() };

  @observable showLogin = true;

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

  // update trip name when user changes the name
  @action resetNumDays = (name) => {
    this.numOfDays = 0;
    console.log('num days reset', this.numOfDays);
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
    console.log('startday', startDate);
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
  @action addTempEvent = (tempEventIndex) => {
    let checker = 0;
    const chosenEvent = this.tempEventArray[tempEventIndex];

    this.eventsArray.forEach(event => {
      if (this.tempEventArray[tempEventIndex].id === event.id) {
        checker = 1;
        alert('You already have this event');
      }
    });
    if (checker === 0) {
      this.eventsArray.push(chosenEvent);
    } else {
      checker = 0;
    }
  }


}


const store = new TripStore();
export default store;