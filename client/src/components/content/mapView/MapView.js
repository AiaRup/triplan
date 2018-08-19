import React, { Component } from 'react';
import Map from './map/Map';
import Location from './location/Location';
import Preferences from './preferences/Preferences';

export default class MapView extends Component {
  state = {
    address: {
      lat: '', lng: ''
    }
  }

  updateAddress = (address) => {
    console.log(address);
    this.setState({ address: address });
  }

  render() {
    return (
      <div id="map-container">
        <Location updateAddress={this.updateAddress} />
        <Map address={this.state.address} />
        <Preferences />
      </div>
    );
  }
}
