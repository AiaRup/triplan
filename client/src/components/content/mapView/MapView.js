import React, { Component } from 'react';
import Map from './map/Map';
import Location from './location/Location';
import Preferences from './preferences/Preferences';

export default class MapView extends Component {
  state = {
    address: {
      lat: '', lng: ''
    },
    places: {}
  }

  updateAddress = (address) => {
    this.setState({ address: address });
  }

  updatePlacesNear = (places) => {
    this.setState({ places: places });
  }

  render() {
    console.log('places in mapview', this.state.places);

    return (
      <div id="map-container">
        <Location updateAddress={this.updateAddress} />
        <Map address={this.state.address} places={this.state.places} />
        <Preferences updatePlacesNear={this.updatePlacesNear}/>
      </div>
    );
  }
}
