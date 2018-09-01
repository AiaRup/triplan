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
      address: props.address,
      places: []
    };
  }

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.address !== this.props.address) {
  //     this.setState({ address: this.props.address });
  //   }
  // }

  updateAddress = (address) => {
    this.setState({
      address: address,
      places: []
    });
    this.props.store.saveAddress(address);
  }

  updatePlacesNear = (places) => {
    console.log(places);
    this.setState({ places: places });
  }

  render() {
    return (
      <div id="map-container">
        <Map address={this.state.address}
          places={_.clone(this.state.places)}
          updateAddress={this.updateAddress} />
        <Preferences updatePlacesNear={this.updatePlacesNear} />
      </div>
    );
  }
}

