/* eslint-disable no-undef */
import React from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, } from 'react-google-maps';

const MapWithADirectionsRenderer = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=en&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0',
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
      DirectionsService.route({
        origin: this.props.route.origin,
        destination: this.props.route.destination,
        travelMode: google.maps.TravelMode.DRIVING,
        // optimizeWaypoints: true,
        waypoints:
          this.props.route.waypoints
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          // this.setState({ directions: false });
          // this.props.updateDirections(false);
          console.error(`error fetching directions ${result}`);
        }
      });

    }
  })
)(props => {
  console.log('in render map');
  // console.log('props directions', props.directions);
  const { lat, lng } = props.route.origin.location;
  const routelog = props.route;
  console.log('lat lng', lat, lng);
  console.log('route log', routelog);

  if (!props.directions) {
    return <p>No Route Can Be calculated for this day</p>;
  } else {
    return <GoogleMap
      defaultZoom={7}
      defaultOptions={{ mapTypeControl: false, rotateControl: false, scrollwheel: false }}
      defaultCenter={new google.maps.LatLng(lat, lng)} >
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>;
  }
}
);


export default MapWithADirectionsRenderer;