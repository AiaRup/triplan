import React, { Component } from 'react'
import Map from './map/Map';
import Location from './location/Location';

export default class MapView extends Component {
  state = {
    address: {
      lat: '', lng: ''
    }
  }

  // address = {
  //   lat: '', lng: ''
  // }
  updateAddress = (address) => {
    console.log(address);
    this.setState({ address: address });
    // this.address = address;
  }
  render() {
    return (
      <div>
        <Location updateAddress={this.updateAddress} />
        {/* <Map address={this.address} /> */}
        <Map address={this.state.address} />
      </div>
    )
  }
}

