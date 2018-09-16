import React, { Component } from 'react';
import Map from './map/Map';
import Preferences from './preferences/Preferences';
import _ from 'lodash';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
export default class MapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // address: props.store.address,
      places: []
    };
  }

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.address !== this.props.store.address) {
  //     // this.setState({ address: this.props.store.address });
  //     this.props.store.saveAddress(this.props.store.address);
  //   }
  // }

  updateAddress = (address) => {
    this.setState({
      places: []
    });
    // update the current address in store
    this.props.store.saveAddress(address);
  }

  updatePlacesNear = (places) => {
    console.log(places);
    this.setState({ places: places });
  }

  render() {
    return (
      <div id="map-container">
        <Map
          places={_.clone(this.state.places)}
          updateAddress={this.updateAddress} />
        <Preferences updatePlacesNear={this.updatePlacesNear} />
      </div>
    );
  }
}

