import React, { Component } from 'react'
import Map from './map/Map';
import Location from './location/Location';

export default class MapView extends Component {
  render() {
    return (
      <div>
        <Location />
        <Map />
      </div>
    )
  }
}

