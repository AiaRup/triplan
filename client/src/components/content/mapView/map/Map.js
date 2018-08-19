import React, { Component } from 'react';
import './Map.css';


export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 13,
      maptype: 'roadmap',
      place_formatted: '',
      place_id: '',
      place_location: '',
    };
    this.address = props.address;
  }

  componentDidMount() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -33.8688, lng: 151.2195 },
      zoom: 13,
      mapTypeId: 'roadmap',
      mapTypeControl: false,
    });

    let marker = new window.google.maps.Marker({
      map: map,
      position: { lat: -33.8688, lng: 151.2195 },
    });
  }

  shouldComponentUpdate(nextProps) {
    if (this.address !== nextProps.address) {
      this.address = nextProps.address;
      console.log('in should');
      let map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: this.address.lat, lng: this.address.lng },
        zoom: 17,
        mapTypeId: 'roadmap',
        mapTypeControl: false
      });

      let marker = new window.google.maps.Marker({
        map: map,
        position: { lat: this.address.lat, lng: this.address.lng },
      });
      return true;
    }
    return false;
  }

  render() {
    console.log('in render map');
    console.log(this.props.address);
    return (
      <div id='appMap'>
        <div id='map' />
      </div>
    );
  }
}

