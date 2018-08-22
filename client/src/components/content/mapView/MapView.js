import React, { Component } from 'react';
import Map from './map/Map';
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
    this.setState({ address: address });
  }

  updatePlacesNear = (places) => {
    this.setState({ places: places });
  }

  render() {
    return (
      <div id="map-container">
        <Map address={this.state.address}
          places={_.clone(this.state.places)}
          updateAddress={this.updateAddress}/>
        <Preferences updatePlacesNear={this.updatePlacesNear} />
      </div>
    );
  }
}

