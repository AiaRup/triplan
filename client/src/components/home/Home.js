import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LocationSearchInput from './StandAloneSearch';
// import { default as LocationSearchInput } from './StandAloneSearch';
import './home.css';
import { observer, inject } from 'mobx-react';
import bgImage from '../../images/travelBG.jpg';
import Notification, { notify } from 'react-notify-toast';

const styles = {
  backgroundImage: `url(${bgImage})`

};
@inject('store')
@observer
class Home extends Component {

  geoSettings = {
    enableHighAccuracy: false,
    maximumAge: 30000,
    timeout: 60000 // for 1 minute the answer from user will be valid
  };

  positionDenied = () => {
    // if the user click cancel so the deafult address is London
    this.props.store.saveAddress({ lat: 51.507351, lng: -0.127758 });
    let myColor = { background: '#f50057', text: '#FFFFFF' };
    notify.show('You need to give permission to access your location in the browser.', 'custom', 3000, myColor);
    this.props.store.toggleGoToMap(false);
  };

  revealPosition = (position) => {
    const address = { lat: position.coords.latitude, lng: position.coords.longitude };
    console.log('address in reveal position: ', address);
    this.props.store.saveAddress(address);
    this.props.store.toggleGoToMap(true);
    //go to planing trip page with the user location on map
    this.props.history.push('/planing');
    // open prefernces
    this.props.store.togglePrefernces(true);
  };

  // Start everything off
  handlePermission = () => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        console.log('Permission to get user location: ' + result.state);
        navigator.geolocation.getCurrentPosition(this.revealPosition, this.positionDenied, this.geoSettings);
      } else if (result.state === 'prompt') {
        console.log('Permission to get user location:: ' + result.state);
        navigator.geolocation.getCurrentPosition(this.revealPosition, this.positionDenied, this.geoSettings);
      } else if (result.state === 'denied') {
        console.log('Permission to get user location:: ' + result.state);
        let myColor = { background: '#f50057', text: '#FFFFFF' };
        notify.show('Previously you refused to confirm location. Please give permission to access your location in the browser setting.', 'custom', 3000, myColor);
        this.props.store.toggleGoToMap(false);
      }
      result.onchange = () => {
        console.log('Permission to get user location:: ' + result.state);
      };
    });
  }

  routeToPlan = (e) => {
    if (this.props.store.goToMapOnUserClick) {
      e.preventDefault();
      this.props.history.push('/planing');
      this.props.store.togglePrefernces();
    }
  }

  goUserLocation = () => {
    console.log('ask geo location ');
    if (!('geolocation' in navigator)) {
      alert('No geolocation available!');
    }
    this.handlePermission();
  }

  componentDidMount = () => {
    this.props.store.toggleGoToMap(false);
  }

  render() {
    return (
      <div style={styles} className="bg-home">
        <Notification options={{ zIndex: 400, bottom: '450px' }} />
        <div className="home-search-container">
          <h1 className="headlineStyle">Where Would You Like to Travel?</h1>
          <div className="search-bar-wrapper">
            <LocationSearchInput saveCity={this.props.store.saveCity} toggleGoToMap={this.props.store.toggleGoToMap} saveAddress={this.props.store.saveAddress} emptyTempEvents={this.props.store.emptyTempEvents} />
            <button className="btnStylePlan" onClick={this.routeToPlan}>Plan Trip</button>
            <button className="btnStyle" onClick={this.goUserLocation}>Plan In My Location</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);



