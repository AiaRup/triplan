import React from 'react';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { compose, withProps, withState, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MapComponent = compose(
  withState({ zoom: 15 }),
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
    zoom: 15,
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
          this.setState({ zoom: 15 });
        },
        onMarkerClick: () => {
          console.log('marker clicked!');
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
        className="autocomplete"/>
    </StandaloneSearchBox>
    <GoogleMap
      defaultZoom={10}
      zoom={props.zoom}
      center={{ lat: props.address.lat, lng: props.address.lng }}
      defaultCenter={{ lat: props.address.lat, lng: props.address.lng }}
      defaultOptions={{
        mapTypeControl: false,
        rotateControl: false,
        fullscreenControl: false,
        scrollwheel: false
      }}>

      <Marker
        position={{ lat: props.address.lat, lng: props.address.lng }}
        onClick={props.onMarkerClick}
        icon={{
          url: require('./../../../../markersIcons/home.png')
        }}
      />

      {props.markers.map((marker, index) => {
        return <Marker key={index}
          position={{ lat: marker.position.lat, lng: marker.position.lng }}
          onClick={props.onMarkerClick}
          icon={{
            url: require(`../../../../markersIcons/${marker.icon}`)
          }}/>;
      }
      )}
    </GoogleMap>
  </div>;
});

export default MapComponent;