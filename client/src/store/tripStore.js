import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';


@observer
class TripStore extends Component {

  @observable daysArray = [ { name:'day1', id:'dayId1', date: new Date(), places:[ { name:'place4', id:'placeId4', type:'place' }, { name:'place5', id:'placeId5', type:'place' } ]}, { name:'day2', id:'dayId2', places:[ { name:'place6', id:'placeId6', type:'place' },{ name:'play soccer', address: 'beersheva', time: '12:40',  id:'eventId9', type:'event' }, { name:'place7', id:'placeId7', type:'place' } ] }, { name:'day3', id:'dayId3', places:[{ name:'place8', id:'placeId8', type:'place'  }]} ];

  @observable placesArray = [ { name:'Egypt Museum', Category: "Museum", address: "Kingsman 21 street", duration: "2 hours" , price:" Free", openingHours: '10:00-20:00', contact: '183-430-9901', id:'placeId1', type: 'place'}, { name:'place2', id:'placeId2' , type: 'place'}, { name:'place3', id:'placeId3', type: 'place' } ];

  @observable eventsArray = [ { name:'Basball', address: 'Levin 4 Street', time: '14:15', id:'eventId4' , type:'event'}, { name:'Game Arena', address: 'Corner Street', time: '12:40',  id:'eventId5', type:'event' } ];

  @observable tempEventArray = [ {name:"Led Zepplin", address:"City Center", time:'17:30', id:'eventId1', type:'event', date: ''}, {name:'Madonna', address:'New York Stadium', time: '20:30', id:'eventId2', type:'event'}, {name:'Jay-Z', address:'Beat-Pop Club', time: '22:00', id:'eventId3', type:'event'} ];

  @observable testEventsArray = [];

  @observable tempEventCalander = [{startDate: new Date()}, {endDate: new Date()}];

  //Functionality in DAY
  @action addDay = () => {
    this.daysArray.push({ name:'day4', id:'dayId4', places:[{ name:'place9', id:'placeId9' }] });
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
    if(verifier==="eventsInDay") {
      this.daysArray[dayIndex].places.splice(index, 1)
    }else {
    this.eventsArray.splice(index, 1);
    }
    
  }

  @action EventStartDate = (startDate) => {
    this.tempEventCalander[0].startDate = startDate;
    console.log(JSON.stringify(this.tempEventCalander[0]))
  }

  @action EventEndDate = (endDate, lastDateIndex) => {
    this.tempEventCalander[lastDateIndex].endDate = endDate;
    console.log(JSON.stringify(this.tempEventCalander[lastDateIndex]))
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
      alert('You already have this event')
      }
    })
      if (checker===0) {
        this.eventsArray.push(chosenEvent);
      }else{
        checker = 0;
      } 
  }
}


const store = new TripStore();
export default store;