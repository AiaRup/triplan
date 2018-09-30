import React from 'react';
import './home.css';
import Notification, { notify } from 'react-notify-toast';

const { compose, withProps, lifecycle } = require('recompose');
const {
  withScriptjs,
} = require('react-google-maps');
const { StandaloneSearchBox } = require('react-google-maps/lib/components/places/StandaloneSearchBox');

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=en&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '400px' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          if (places.length === 0) {
            let myColor = { background: '#f50057', text: '#FFFFFF' };
            notify.show('Address not found', 'custom', 3000, myColor);
            return;
          }

          console.log('result', places);
          const lat = places[0].geometry.location.lat();
          const lng = places[0].geometry.location.lng();
          if ([0].address_components) {
            this.props.saveCity(places[0].address_components[0].short_name);
          } else {
            this.props.saveCity(places[0].name);
          }


          this.props.saveAddress({ lat: lat, lng: lng });
          this.props.emptyTempEvents();
          this.props.toggleGoToMap(true);
          this.setState({ places });
        },
      });
    },
  }),
  withScriptjs
)(props =>
  <React.Fragment>
    <Notification options={{ zIndex: 400, top: '250px' }} />
    <div data-standalone-searchbox="">
      <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Search City ..."
          style={{
            boxSizing: 'border-box',
            border: '1px solid transparent',
            width: '260px',
            height: '40px',
            padding: '8px 12px',
            borderRadius: '3px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
            fontSize: '14px',
            outline: 'none',
            textOverflow: 'ellipses',
            margin: '5px'
          }}
        />
      </StandaloneSearchBox>
    </div>
  </React.Fragment>
);

export default PlacesWithStandaloneSearchBox;