import React, { Component } from 'react'
import { observable, action, computed, observe} from 'mobx';
import { observer } from 'mobx-react';


@observer
class TripStore extends Component {

  @observable daysArray = [{name:'day1', id:'dayId1'}, {name:'day2', id:'dayId2'}, {name:'day3', id:'dayId3'}];
  @observable eventsArray = ['event1', 'event2', 'event3'];
  @observable placesArray = [{name:'place1', id:'placeId1'}, {name:'place2', id:'placeId2'}, {name:'place3', id:'placeId3'}];

  @action deleteDay = (index) => {
    this.daysArray.splice(index, 1);
  }

  @action deleteEvent = (index) => {
    this.eventsArray.splice(index, 1);
  }

  @action deletePlace = (index) => {
    this.placesArray.splice(index, 1);
  }

  @action addDay = () => {
    this.daysArray.push('day')
  }
  

}
 

const store = new TripStore();
export default store;