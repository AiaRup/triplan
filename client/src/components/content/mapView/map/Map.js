import React, { Component } from 'react';
import './Map.css';
// import { observer, inject } from 'mobx-react';
// import axios from 'axios';
import _ from 'lodash';


// @inject('store')
// @observer
export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 13,
      maptype: 'roadmap',
      place_formatted: '',
      place_id: '',
      place_location: '',
      places: props.places
    };
    this.address = props.address;
  }

  componentDidMount = () => {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: 'roadmap',
      mapTypeControl: false
    });

    let marker = new window.google.maps.Marker({
      map: map,
      position: { lat: -33.8688, lng: 151.2195 },
    });
  }

  // shouldComponentUpdate(nextProps) {
  //   if (this.address !== nextProps.address) {
  //     this.address = nextProps.address;
  //     console.log('in should');
  //     let map = new window.google.maps.Map(document.getElementById('map'), {
  //       center: { lat: this.address.lat, lng: this.address.lng },
  //       zoom: 17,
  //       mapTypeId: 'roadmap',
  //       mapTypeControl: false
  //     });

  //     let marker = new window.google.maps.Marker({
  //       map: map,
  //       position: { lat: this.address.lat, lng: this.address.lng },
  //     });
  //     return true;
  //   }
  //   return false;
  // }

  componentDidUpdate(prevProps) {
    console.log('in update');
    if (!this.isArrayEqual(this.props.places, prevProps.places)) {
      console.log('in compare');

      this.setState({ places: this.props.places }, () => this.addMarkers());

      // let map = new window.google.maps.Map(document.getElementById('map'), {
      //   center: { lat: -33.8688, lng: 151.2195 },
      //   zoom: 17,
      //   mapTypeId: 'roadmap',
      //   mapTypeControl: false
      // });


    }

    // this.places.forEach((place) => {



  }

  isArrayEqual = (array1, array2) => {
    return _(array1).differenceWith(array2, _.isEqual).isEmpty();
  };


  addMarkers = () => {
    console.log('in add markers', this.state.places);

    this.state.places.forEach((element) => {
      console.log(console.log(element.type));
          //   axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY')
    //     .then(function (response) {
    //       console.log(response);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });

    //   let marker = new window.google.maps.Marker({
    //     map: map,
    //     position: { lat: this.address.lat, lng: this.address.lng },
    //   });
    // });
    });
  }

  render() {
    console.log('in render map');
    console.log(this.props.places);
    return (
      <div id='appMap'>
        <div id='map'></div>
      </div>
    );
  }
}

