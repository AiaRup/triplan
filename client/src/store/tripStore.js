import { observable, action } from 'mobx';
import moment from 'moment';



class TripStore {

  @observable user_id = ''
  @observable cityName = 'London'
  @observable tripName = 'Name Your Trip'
  @observable address = { lat: 51.507351, lng: -0.127758 };
  @observable numOfDays = 0;
  @observable numOfPlaces = 0;
  @observable numOfEvents = 0;
  @observable eventCategory = [];
  @observable loading = false;

  @observable isOpenPrefernces = false;

  @action openPrefernces = (click) => {
    this.isOpenPrefernces = click || !this.isOpenPrefernces;
  }


  @action addNotes = (note, index) => {
    // console.log('note ', note, 'index ', index);
    this.oneTrip.days[index].notes.push(note);
    // this.oneTrip.days[index].notes = note;
    console.log(`oneTrip.days[${index}].notes, ${note} `);
  }

  @action updateNotes = (data, indexD, indexN) => {
    this.oneTrip.days[indexD].notes[indexN].push(data);
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
    {
      startDate: new Date(),
      endDate: new Date()
    };


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

  toggleLoading = (showState) => {
    this.loading = showState;
  }

  // add attraction to places array
  @action addPlace = (place) => {
    this.numOfPlaces++;
    place.iternalId = 'places_id' + this.numOfPlaces;

    console.log('place for id', place)
    this.placesArray.push(place);
  }

  @action addTempEvent = (theEvent) => {
    //getting the event object and trying to add internal id into it
    //!! CHANGES BY FUCKING REFERENCE!!
    this.theNewEvent = theEvent
    this.numOfEvents++;
    console.log('this.theNewEvent', this.theNewEvent)
    this.theNewEvent.iternalId = 'event_id' + this.numOfEvents;
    this.eventsArray.push(this.theNewEvent);
    // console.log('eventsArray', this.eventsArray);

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
  // @action resetNumDays = (name) => {
  //   this.numOfDays = 0;
  //   console.log('num days reset', this.numOfDays);
  // }

  // update category event when user changes the category
  @action updateEventCategory = (category) => {
    this.eventCategory = category;
    console.log('category in store', this.eventCategory);
  }

  @action restStoreTrip = () => {
    window.location.reload();
  }

  //Functionality in DAY
  @action addDay = () => {
    this.numOfDays++;
    this.daysArray.push({ date: moment(`/Date(${Date.parse(new Date())})/`).format('DD/MM/YYYY'), places: [], id: 'day_' + this.numOfDays });
    console.log('this.numOfdays', this.numOfDays)
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

  //Move from EVENT from TempEvent To EVENTS DIV

  // @action addTempEvent = (event) => {

  //   this.eventsArray.push(event);
  //   console.log('eventsArray', this.eventsArray);

  // }

  // empty temp events
  @action emptyTempEvents = () => {
    this.tempEventArray = [];
  }

  // add temp events to api div events
  @action addTempEvents = (event) => {

    this.tempEventArray.push(event);
  }
}


const store = new TripStore();

window.store = store;
export default store;