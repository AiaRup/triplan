import React, { Component } from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';


@observer
class TripStore extends Component {

  @observable daysArray = [ { name:'day1', id:'dayId1', date: new Date(), places:[ { name:'place4', id:'placeId4' }, { name:'place5', id:'placeId5' } ] }, { name:'day2', id:'dayId2', places:[ { name:'place6', id:'placeId6' }, { name:'place7', id:'placeId7' } ] }, { name:'day3', id:'dayId3', places:[{ name:'place8', id:'placeId8' }] } ];

  @observable placesArray = [ { name:'place1', id:'placeId1' }, { name:'place2', id:'placeId2' }, { name:'place3', id:'placeId3' } ];

  @observable eventsArray = [ { name:'Basball', address: 'Levin 4 Street', time: '14:15', id:'eventId4' }, { name:'Game Arena', address: 'Corner Street', time: '12:40',  id:'eventId5' } ];

  @observable tempEventArray = [ {name:"Led Zepplin", address:"City Center", time:'17:30', id:'eventId1'}, {name:'Madonna', address:'New York Stadium', time: '20:30', id:'eventId2'}, {name:'Jay-Z', address:'Beat-Pop Club', time: '22:00', id:'eventId3'} ];

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
  @action deleteEvent = (index) => {
    this.eventsArray.splice(index, 1);
  }

  //Move from EVENT from TempEvent To EVENTS DIV
  @action addTempEvent = (tempEventIndex) => {
    let checker = 0;
    const chosenEvent = this.tempEventArray[tempEventIndex];

    this.eventsArray.forEach(event => {
      if (this.tempEventArray[tempEventIndex].id === event.id) {
        checker = 1;
      // this.tempEventArray.splice(tempEventIndex, 1);
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