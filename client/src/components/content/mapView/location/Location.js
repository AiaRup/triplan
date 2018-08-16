import React, { Component } from 'react'
import Autocomplete from 'react-google-autocomplete'


export default class Location extends Component {

  state = {
    isSelect: false
  }

  location = { lat: '', lng: '' };

  handleSelect = (place) => {
    console.log(place);
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();
    this.myLocation = { lat: lat, lng: lng };
    this.isSelect = true;
    console.log(this.myLocation);
  }


  handleClick = () => {
    console.log('search...');
    console.log('address: ', this.location);

    this.setState({ isSelect: false });
  }

  render() {
    return (
      <div>
        <Autocomplete
          style={{ width: '40%' }}
          onPlaceSelected={this.handleSelect}
          types={['address']}
        />
        <button disabled={!this.state.isSelect} onClick={this.handleClick}>Search</button>
      </div>
    )
  }
}
