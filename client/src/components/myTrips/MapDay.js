/* eslint-disable no-undef */

import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, } from 'react-google-maps';


const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=en&key=AIzaSyAewucBzhp4DIePd6P0JHbpkQ4JtPzCShE',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px', weight: '350px' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      console.log('in did mount-props :', this.props.routes);

      // const latO = this.props.points[0].location.lat;
      // const lngO = this.props.points[0].location.lng;
      // const latD = this.props.points[this.props.points.length - 1].location.lat;
      // const lngD = this.props.points[this.props.points.length - 1].location.lng;

      DirectionsService.route({
        // origin: new google.maps.LatLng(latO, lngO),
        // destination: new google.maps.LatLng(latD, lngD),
        // origin: new google.maps.LatLng(32.067270, 34.779642),
        // destination: new google.maps.LatLng(32.096587, 34.776057),
        origin: this.props.route.origin,
        destination: this.props.route.destination,
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        waypoints:
          this.props.route.waypoints
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });

    }
  })
)(props => {
  console.log('in render map');
  console.log('props directions', props.directions);

  return <GoogleMap
    defaultZoom={7}
    defaultCenter={new google.maps.LatLng(41.8507300, -87.6512600)} >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>;
}
);


export default MapWithADirectionsRenderer;