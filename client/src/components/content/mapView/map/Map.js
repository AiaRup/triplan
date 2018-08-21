import React, { Component } from 'react';
import './Map.css';
import axios from 'axios';
import _ from 'lodash';
// import 'map-icons/dist/fonts';
// import 'map-icons/dist/css/map-icons.css';
// import 'map-icons/dist/js/map-icons.js';

const google = window.google;

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 12,
      maptype: 'roadmap',
      place_formatted: '',
      place_id: '',
      place_location: '',
      // places: []
      places: props.places
    };
    this.address = props.address;
    this.map = {};
    // this.places = props.places;
  }

  componentDidMount = () => {
    // this.setState({ places: this.props.places });
    this.map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 12,
      mapTypeId: 'roadmap',
      mapTypeControl: false,
      scrollwheel: false
    });

    let marker = new window.google.maps.Marker({
      map: this.map,
      position: { lat: -33.8688, lng: 151.2195 },
    });
  }

  componentDidUpdate(prevProps) {
    if (!this.isArrayEqual(this.props.places, prevProps.places)) {
      console.log('in compare');
      this.setState({ places: this.props.places }, () => this.addMarkers());
    }
  }

  isArrayEqual = (array1, array2) => {
    let result = _(array1).differenceWith(array2, _.isEqual).isEmpty();
    console.log('equal', result);
    return result;
  };


  addMarkers = () => {
    console.log('in add markers', this.state.places);

    this.state.places.forEach((element) => {
      let type = element.type;
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=${type}&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY`;

      axios(url)
        .then((response) => {
          console.log('res', response.data.results);
          // add markers on the map
          response.data.results.forEach((location) => {
            const objLatLng = location.geometry.location;
            let marker = new window.google.maps.Marker({
              map: this.map,
              animation: google.maps.Animation.DROP,
              position: { lat: objLatLng.lat, lng: objLatLng.lng },
            });
          });
          // var marker = new Marker({
          //   map: map,
          //   position: new google.maps.LatLng(-27.46577, 153.02303),
          //   icon: {
          //     path: MAP_PIN,
          //     fillColor: '#00CCBB',
          //     fillOpacity: 1,
          //     strokeColor: '',
          //     strokeWeight: 0
          //   },
          //   map_icon_label: '<span class="map-icon map-icon-point-of-interest"></span>'
          // });

        })
        .catch(function (error) {
          console.log(error);
        });
    });
  }

  // setMapOnAll(map) {
  //   for (var i = 0; i < markers.length; i++) {
  //     markers[i].setMap(map);
  //   }
  // }

  // clearMarkers = () => {
  //   setMapOnAll(null);
  // }

  render() {
    return (
      <div id='appMap'>
        <div id='map'></div>
      </div>
    );
  }
}

