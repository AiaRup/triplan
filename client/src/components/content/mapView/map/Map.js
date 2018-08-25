import React, { Component } from 'react';
import './Map.css';
import axios from 'axios';
import _ from 'lodash';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { compose, withProps, withState, lifecycle, withHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import 'map-icons/dist/fonts';
// import 'map-icons/dist/css/map-icons.css';
// import 'map-icons/dist/js/map-icons.js';
// const google = window.google;

const MyMapComponent = compose(
  withState({ zoom: 12 }),
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
    isMarkerShown: true,
    zoom: 14,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const place = refs.searchBox.getPlaces();
          let lat = place[0].geometry.location.lat();
          let lng = place[0].geometry.location.lng();
          this.nameLocation = place[0].formatted_address;
          this.props.updateAddress({ lat: lat, lng: lng });
          this.setState({ zoom: 13 });
        },
        onMarkerClick: () => {
          console.log('marker clicked!');
          console.log(this.props.zoom);
          console.log(this.state.zoom);
        }
      });
    }, // end componentWillMount

  }),
  withScriptjs,
  withGoogleMap
)((props) => {

  return <div>
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}>
      <input
        type="text"
        placeholder="Search Address"
        className="autocomplete" />
    </StandaloneSearchBox>
    <GoogleMap
    
      zoom={props.zoom}
      center={{ lat: props.address.lat, lng: props.address.lng }}
      defaultCenter={{ lat: props.address.lat, lng: props.address.lng }}
      defaultOptions={{
        mapTypeControl: false,
        rotateControl: false,
        fullscreenControl: false,
        scrollwheel: false
      }}>
      {props.isMarkerShown && <Marker position={{ lat: props.address.lat, lng: props.address.lng }} onClick={props.onMarkerClick} />}
      {props.isMarkerShown && props.markers.map((marker, index) => <Marker key={index} position={{ lat: marker.position.lat, lng: marker.position.lng }} onClick={props.onMarkerClick} />)}
    </GoogleMap>
  </div>;
});

class MyFancyComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      places: props.places,
      markers: []
    };
  }

  addMarkers = () => {
    const markerArray = [];
    const promises = [];
    this.state.places.forEach((element) => {
      let type = element.type;

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.address.lat},${this.props.address.lng}&radius=1500&type=${type}&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY`;

      let promise = axios(url)
        .then((response) => {
          console.log('res', response.data.results);
          // add markers on the map
          response.data.results.forEach((location) => {
            const objLatLng = location.geometry.location;
            let marker = {
              position:
                { lat: objLatLng.lat, lng: objLatLng.lng }
            };
            markerArray.push(marker);
          });
          console.log('markers array', markerArray);
        })
        .catch(function (error) {
          console.log(error);
        });

      promises.push(promise);
    });
    Promise.all(promises).then(() => { this.setState({ markers: markerArray }) });


  }

  isArrayEqual = (array1, array2) => {
    let result = _(array1).differenceWith(array2, _.isEqual).isEmpty();
    console.log('equal', result);
    return result;
  }

  componentDidUpdate(prevProps) {
    if (!this.isArrayEqual(this.props.places, prevProps.places)) {
      this.setState({ places: this.props.places }, () => this.addMarkers());
    }
  }

  render() {
    return (
      <MyMapComponent
        onMarkerClick={this.handleMarkerClick}
        markers={this.state.markers}
        address={this.props.address}
        updateAddress={this.props.updateAddress}
      />
    );
  }
}

export default MyFancyComponent;

