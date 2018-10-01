import { observable, action } from 'mobx';
import moment from 'moment';
import uuidv1 from 'uuid/v1';

class TripStore {

  // @observable user_email = '';
  @observable user_id = '';

  //city name in the homepage
  @observable cityDestination = '';

  //city name in the map
  @observable cityName = 'London';

  @observable tripName = 'Name Your Trip';
  @observable address = { lat: 51.507351, lng: -0.127758 };
  @observable numOfDays = 0;
  @observable idForPlace = 0;
  @observable idForEvent = 0;
  @observable eventCategory = [];
  @observable loading = false;
  @observable isOpenPrefernces = false;
  @observable tripIdToEdit = '';
  @observable goToMapOnUserClick = true;


  @observable query = '';

  @observable filter_plans = [];
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
  @observable animate = false;

  /*********** ACTIONS ***********/
  // toggle preferences div on map
  @action togglePrefernces = (click) => {
    this.isOpenPrefernces = click || !this.isOpenPrefernces;
    // console.log('isOpenPrefernces ', this.isOpenPrefernces);
  }

  @action toggleAnimation = () => {
    this.animate = !this.animate;
    // console.log('isanimate ', this.animate);
  }

  // prevent user from going to the map on empty input or bad input on Homepage
  @action toggleGoToMap = (stateToggle) => {
    this.goToMapOnUserClick = stateToggle;
    // console.log('go to map ', this.goToMapOnUserClick);
  }

  // add note to trip array on store
  @action addNotes = (note, index) => {
    // console.log('note ', note, 'index ', index);
    this.oneTrip.days[index].notes.push(note);
    // this.oneTrip.days[index].notes = note;
    // console.log(`oneTrip.days[${index}].notes, ${note} `);
  }

  // update note on trip array on store
  @action updateNotes = (data, indexD, indexN) => {
    this.oneTrip.days[indexD].notes[indexN].push(data);
  }

  // saves the query when seraching a trip
  @action saveQuery = (q) => {
    this.query = q;
  }

  // saves the filterd trips after search trips
  @action saveFilterPlans = (plans) => {
    this.filter_plans = plans;
  }

  // saves the trips of the connected user
  @action savePlans = (plans) => {
    this.plansArray = plans;
    // this.filter_plans = plans;
  }

  @action updatePlanInStore = (planToUpdate) => {
    console.log('plan to update arrive to store', planToUpdate);

    this.plansArray.forEach((plan, i) => {
      if (plan._id === planToUpdate._id) {
        console.log('plan to update in plan array', this.plansArray[i]);
        this.plansArray[i] = planToUpdate;
      }
    });
  }

  // save trip Id when user is editing a trip
  @action saveTripId = (tripId) => {
    this.tripIdToEdit = tripId;
  }

  // save the user Id recieved from mongo
  @action configUser = (userID) => {
    this.user_id = userID;
    // console.log('id in store', this.user_id);
  }

  // change display of login form and register form
  @action toggleLoginRegister = () => {
    this.showLogin = !this.showLogin;
  }

  @action toggleLoading = (showState) => {
    this.loading = showState;
  }

  // add attraction to places array
  @action addPlace = place => {
    this.idForPlace++;
    place.iternalId = 'places_id' + this.idForPlace;
    this.placesArray.push(place);
  }

  @action addTempEvent = theEvent => {
    this.eventsArray.push(theEvent);
  }

  // update address when user serch a place on map
  @action saveAddress = (address) => {
    this.address = address;
    // console.log('address in store', this.address);
  }

  // update city when user serch a place on map
  @action saveCity = (city) => {
    this.cityName = city;
    // console.log('city in store', this.cityName);
  }
  // update trip name when user changes the name
  @action saveTripName = (name) => {
    this.tripName = name;
    // console.log('name in store', this.tripName);
  }

  // update number of days in trip
  // @action resetNumDays = (name) => {
  //   this.numOfDays = 0;
  //   console.log('num days reset', this.numOfDays);
  // }

  // update category event when user changes the category
  @action updateEventCategory = (category) => {
    this.eventCategory = category;
    // console.log('category in store', this.eventCategory);
  }

  @action restStoreTrip = () => {
    window.location.reload();
  }

  //Functionality in DAY
  @action addDay = () => {
    this.numOfDays++;
    this.daysArray.push({ date: moment(`/Date(${Date.parse(new Date())})/`).format('DD/MM/YYYY'), places: [], id: 'day_' + this.numOfDays });
    // console.log('this.numOfdays', this.numOfDays);
  }

  @action deleteDay = (index) => {
    this.daysArray.splice(index, 1);
  }

  @action updateDaysWhenEditTrip = (days) => {
    this.daysArray = days;
  }

  @action chooseDate = (dayIndex, date) => {
    // console.log('date day store', date);
    // console.log('index day', dayIndex);

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
    // console.log('startDate', startDate);
    this.tempEventCalander.startDate = startDate;
    // console.log(JSON.stringify(this.tempEventCalander.startDate));
  }

  @action EventEndDate = (endDate) => {
    // console.log('endDate', endDate);
    this.tempEventCalander.endDate = endDate;
    // console.log(JSON.stringify(this.tempEventCalander.endDate));
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
  @action addTempEvents = (events) => {
    this.tempEventArray.push(events);
  }

  @action emailTrip = () => {
    console.log('user email is', this.user_email);
    console.log('hi');
  }
}


const store = new TripStore();

window.store = store;
export default store;