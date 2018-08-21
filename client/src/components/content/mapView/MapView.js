import React, { Component } from 'react';
import Map from './map/Map';
import Location from './location/Location';
import Preferences from './preferences/Preferences';
import _ from 'lodash';


export default class MapView extends Component {
  state = {
    address: {
      // lat: '', lng: ''
      lat: 32.05445699999999, lng: 34.770838000000026
    },
    places: []
  }

  updateAddress = (address) => {
    console.log('in update address ', address);
    this.setState({ address: address });
  }

  updatePlacesNear = (places) => {
    console.log('in update places ', places);
    this.setState({ places: places });
  }

  render() {
    console.log('in render map view');
    console.log('state- places: ', this.state.places);
    console.log('state- address: ', this.state.address);
    console.log('places in mapview', this.state.places);

    return (
      <div id="map-container">
        {/* <Location updateAddress={this.updateAddress} /> */}
        <Map address={this.state.address}
          places={_.clone(this.state.places)}
          updateAddress={this.updateAddress}
        />
        <Preferences updatePlacesNear={this.updatePlacesNear} />
      </div>
    )
  }
}

