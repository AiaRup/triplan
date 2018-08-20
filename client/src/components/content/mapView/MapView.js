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
    console.log(address);
    this.setState({ address: address });
  }

  updatePlacesNear = (places) => {
    console.log('places', places);
    this.setState({ places: places });
  }

  render() {
    console.log('in render map view', this.state.places);

    return (
      <div id="map-container">
        <Location updateAddress={this.updateAddress} />
        <Map address={this.state.address} places={this.state.places} />
        <Preferences updatePlacesNear={this.updatePlacesNear}/>
      </div>
    );
  }
}
