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
    });

    let marker = new window.google.maps.Marker({
      map: map,
      position: { lat: -33.8688, lng: 151.2195 },
    });

    //   // bring the selected place in view on the map
    //   map.fitBounds(place.geometry.viewport);
    //   map.setCenter(location);

    //   marker.setPlace({
    //     placeId: place.place_id,
    //     location: location,
    //   });
    // });
  }

  render() {
    console.log('in render map');
    console.log(this.props.address);
    const address = this.props.address;
    return (
      <div id='appMap'>
        <div id='map' />
      </div>
    );
  }
}
