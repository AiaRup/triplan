import React, { Component } from 'react';
import './Map.css';
import axios from 'axios';
import _ from 'lodash';
import GoogleMap from '../googleMap/GoogleMap';

// import 'map-icons/dist/fonts';
// import 'map-icons/dist/css/map-icons.css';
// import 'map-icons/dist/js/map-icons.js';
// const google = window.google;

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: props.places,
      markers: []
    };
  }

  addMarkers = () => {
    console.log('place '+ JSON.stringify(this.state.places))
    const markerArray = [];
    const promises = [];
    this.state.places.forEach((element) => {
      let type = element.type;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.address.lat},${this.props.address.lng}&radius=1500&type=${type}&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY`;


      let promise = axios(url)
        .then((response) => {
          // add markers on the map
          response.data.results.forEach((location) => {
            const objLatLng = location.geometry.location;

            let marker = {
              name: location.name,
              id: location.id,
              icon: location.icon,
              rating: location.rating,
              website: location.reference,
              position:
                { lat: objLatLng.lat, lng: objLatLng.lng }
            };

            if (location.opening_hours !== undefined) {
              marker.openNow = location.opening_hours.open_now;
            }
            if (location.photos !== undefined) {
              marker.photo = location.photos[0];
            }
            markerArray.push(marker);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {this.setState({ markers: markerArray });});
  }

  isArrayEqual= (array1, array2) => {
    return _(array1).differenceWith(array2, _.isEqual).isEmpty();
  }

  componentDidUpdate(prevProps) {
    if (!this.isArrayEqual(this.props.places, prevProps.places)) {
      this.setState({ places: this.props.places }, () => this.addMarkers());
    }
  }

  render() {
    return (
      <GoogleMap
        markers={this.state.markers}
        address={this.props.address}
        updateAddress={this.props.updateAddress}/>
    );
  }
}

export default Map;

