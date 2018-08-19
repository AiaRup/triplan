import React, { Component } from 'react';
import { observable, action, computed, observe } from 'mobx';
import { observer } from 'mobx-react';


@observer
class TripStore extends Component {

  @observable daysArray = [ 'day1', 'day2', 'day3' ];
  @observable eventsArray = [ 'event1', 'event2', 'event3' ];
  @observable placesArray = [ 'place1', 'place2', 'place3' ];
  @observable mainAddress = { lat: '', lng: '' };

  @action updateAddress = (address) => {
    this.mainAddress = address;
  }

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
    this.daysArray.push('day');
  }


}


const store = new TripStore();
export default store;