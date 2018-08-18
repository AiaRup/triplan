import React, { Component } from 'react'
import { observable, action, computed, observe} from 'mobx';
import { observer } from 'mobx-react';


@observer
class TripStore extends Component {

  @observable daysArray = [{name:'day1', id:'dayId1', places:[{name:'place4', id:'placeId4'}, {name:'place5', id:'placeId5'}]}, {name:'day2', id:'dayId2', places:[{name:'place6', id:'placeId6'}, {name:'place7', id:'placeId7'}]}, {name:'day3', id:'dayId3', places:[]}];

  @observable eventsArray = [{name:'event1', id:'eventId1'}, {name:'event2', id:'eventId2'}, {name:'event3', id:'eventId3'}];

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

  @action deletePlaceInDay = (dayIndex, placeIndex) => {
    this.daysArray[dayIndex].places.splice(placeIndex, 1)
  }

  @action addDay = () => {
    this.daysArray.push('day')
  }
  

}
 

const store = new TripStore();
export default store;