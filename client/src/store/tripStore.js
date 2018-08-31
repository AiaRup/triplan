import React, { Component } from 'react';
import { observable, action } from 'mobx';
import axios from 'axios';


class TripStore extends Component {


  @observable userIdStore = '';

  @observable oneTrip = {
    id: 'id1', // will get from the server
    name: 'madrid 2018',
    days:
      [
        {
          date: '22/08/2018', places:
            [ { position: { lat: 32.067270, lng: 34.779642 }, name: 'place1', type: 'hotel' },
              { position: { lat: 32.096587, lng: 34.776057 }, name: 'place2', type: 'resturant' } ]
        },
        {
          date: '23/08/2018', places:
            [ { position: { lat: 32.800028, lng: 35.526261 }, name: 'place11', type: 'cafe' },
              { position: { lat: 32.799917, lng: 35.526974 }, name: 'place22', type: 'resturant' },
              { position: { lat: 32.798096, lng: 35.527000 }, name: 'place33', type: 'hotel' } ]
        }
      ]
  }

  @observable cityName = '';

  @observable tripName = '';

  @observable daysArray = [{ name: 'day1', id: 'dayId1', date: new Date(), places: [{ name: 'place4', id: 'placeId4', type: 'place' }, { name: 'place5', id: 'placeId5', type: 'place' }] }, { name: 'day2', id: 'dayId2', places: [{ name: 'place6', id: 'placeId6', type: 'place' }, { name: 'play soccer', address: 'beersheva', time: '12:40', id: 'eventId9', type: 'event' }, { name: 'place7', id: 'placeId7', type: 'place' }] }, { name: 'day3', id: 'dayId3', places: [{ name: 'place8', id: 'placeId8', type: 'place' }] }];

  @observable placesArray = [ { name: 'Egypt Museum', Category: 'Museum', address: 'Kingsman 21 street', duration: '2 hours', price: 'Free', openingHours: '10:00-20:00', contact: '183-430-9901', id: 'placeId1', type: 'place' },

    { name: 'Dutch Park', Category: 'Gardens', address: 'Tulip 3 street', duration: '1 hour', price: '10 Euro', openingHours: '08:00-17:00', contact: '13-210-0092', id: 'placeId2', type: 'place' },

    { name: 'Picasso Gallery', Category: 'Art/Gallery', address: 'Mona Lisa 90 street', duration: '01:30 hour', price: '10 Euro', openingHours: '08:00-17:00', contact: '122-90-1272', id: 'placeId3', type: 'place' } ];

  @observable eventsArray = [ { name: 'Basball', address: 'Levin 4 Street', time: '14:15', id: 'eventId4', type: 'event' }, { name: 'Game Arena', address: 'Corner Street', time: '12:40', id: 'eventId5', type: 'event' } ];

  @observable tempEventArray = [ { name: 'Led Zepplin', address: 'City Center', time: '17:30', id: 'eventId1', type: 'event', date: '' }, { name: 'Madonna', address: 'New York Stadium', time: '20:30', id: 'eventId2', type: 'event' }, { name: 'Jay-Z', address: 'Beat-Pop Club', time: '22:00', id: 'eventId3', type: 'event' } ];

  @observable testEventsArray = [];

  @observable tempEventCalander = [ { startDate: new Date() }, { endDate: new Date() } ];

  @observable showLogin = true;

  @action toggleLoginRegister = () => {
    this.showLogin = !this.showLogin;
    console.log('showLogin', this.showLogin);
  }

  @action addPlace = (place) => {
    this.placesArray.push(place);
    console.log('place', place);

  }

  //Functionality in DAY
  @action addDay = () => {
    this.daysArray.push({ name: 'day4', id: 'dayId4', places: [{ name: 'place9', id: 'placeId9' }] });
  }

  @action deleteDay = (index) => {
    this.daysArray.splice(index, 1);
  }

  @action chooseDate = (dayIndex, date) => {
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
    this.tempEventCalander[0].startDate = startDate;
    console.log(JSON.stringify(this.tempEventCalander[0]));
  }

  @action EventEndDate = (endDate, lastDateIndex) => {
    this.tempEventCalander[lastDateIndex].endDate = endDate;
    console.log(JSON.stringify(this.tempEventCalander[lastDateIndex]));
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

  @action configUser = (userID) => {
    this.user_id = userID;
    console.log('id in store', this.userIdStore);
    this.userIdStore = userID;
  };

}


const store = new TripStore();

window.store= store;
export default store;