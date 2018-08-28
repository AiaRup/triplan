import React, { Component } from 'react';
import './Map.css';
import axios from 'axios';
// import _ from 'lodash';
import GoogleMap from '../googleMap/GoogleMap';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: props.places,
      markers: []
    };
    this.images = [];
  }

  addMarkers = () => {
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
            const placeID = location.place_id;
            console.log('response location', response);

            return axios(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&fields=name,rating,international_phone_number,formatted_address,price_level,website,permanently_closed,opening_hours&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY`).then((res) => {
              console.log('place res', res.data.result);
              const attraction = res.data.result;
              let marker = {
                showInfoWindow: false,
                name: attraction.name,
                id: location.id,
                icon: element.icon,
                rating: attraction.rating,
                website: attraction.website,
                address: attraction.formatted_address,
                price: attraction.price_level,
                position:
                  { lat: objLatLng.lat, lng: objLatLng.lng },
              };

              if (attraction.opening_hours !== undefined) {
                marker.openNow = attraction.opening_hours.open_now;
                marker.openHours = attraction.opening_hours.weekday_text;
              }

              if (attraction.international_phone_number !== undefined) {
                marker.phone = attraction.international_phone_number;
              }
              if (location.photos !== undefined) {
                marker.photo = location.photos[0].photo_reference;
              }
              markerArray.push(marker);
            });
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      promises.push(promise);
    });
    Promise.all(promises).then(() => {
      console.log('merkersarray', markerArray);
      this.setState({ markers: markerArray });
    });

  }

  componentDidUpdate(prevProps) {
    console.log('in did update- this.props.places ', this.props.places);
    console.log((JSON.stringify(this.props.places) === JSON.stringify(prevProps.places)));

    if (!(JSON.stringify(this.props.places) === JSON.stringify(prevProps.places))) {
      console.log('in if');
      this.setState({ places: this.props.places }, () => this.addMarkers());
    }
  }

  addPlace = (place) => {
    console.log('in add place -Map ', place);
    this.props.store.addPlace(place);
  }

  render() {
    return (
      <GoogleMap
        markers={this.state.markers}
        address={this.props.address}
        updateAddress={this.props.updateAddress}
        images={this.images}
        addPlace={this.addPlace}
      />
    );
  }
}

export default Map;

