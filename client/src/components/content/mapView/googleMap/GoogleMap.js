/* eslint-disable no-undef */

import React from 'react';
// import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

const MapComponent = compose(
  withStateHandlers(() =>
    ({
      isOpen: false,
      infoIndex: null
    }),
  {
    showInfo: ({ isOpen, infoIndex }) => (index) => ({
      isOpen: infoIndex !== index || !isOpen,
      infoIndex: index
    })
  }
  ),
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
          this.props.updateAddress({ lat: lat, lng: lng });
        },
        addPlace: (marker) => {
          // console.log(marker);
          let id = marker.id;
          let name = marker.name;
          //! todo: check if the item not exist in the placesarray already
          this.props.addPlace({ name: name, id: id });
        },
      });
    }, // end componentWillMount
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return <div>
    {/* <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}>
      <input placeholder="Search Address" className="autocomplete" />
    </StandaloneSearchBox> */}

    <GoogleMap
      defaultZoom={14}
      zoom={14}
      center={{ lat: props.address.lat, lng: props.address.lng }}
      defaultCenter={{ lat: props.address.lat, lng: props.address.lng }}
      defaultOptions={{ mapTypeControl: false, rotateControl: false, scrollwheel: false }}>

      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged} >
        <input
          type="text"
          placeholder="Search Address"
          className="autocomplete" />
      </SearchBox>

      {/* <StandaloneSearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        onPlacesChanged={props.onPlacesChanged}>
        <input placeholder="Search Address" className="autocomplete" />
      </StandaloneSearchBox> */}

      {/* <Marker position={{ lat: props.address.lat, lng: props.address.lng }}
        defaultAnimation= {google.maps.Animation.DROP}
        label= 'You are here'
        icon={{
          // url: require('./../../../../markersIcons/home.png'),
          // Animation: google.maps.Animation.DROP,

          // path: google.maps.SymbolPath.CIRCLE,
          // scale: 8
        }}
      // onClick={props.onMarkerClick}
      /> */}

      <MarkerWithLabel
        position={{ lat: props.address.lat, lng: props.address.lng }}
        labelAnchor={new google.maps.Point(0, 0)}
        labelStyle={{ backgroundColor: 'yellow', fontSize: '10px', padding: '5px' }}
      >
        <div>You are here!</div>
      </MarkerWithLabel>

      {props.markers.map((marker) =>
        <Marker onClick={() => props.showInfo(marker.id)} key={marker.id} position={{ lat: marker.position.lat, lng: marker.position.lng }}
          icon={{
            url: require(`../../../../markersIcons/${marker.icon}`)
          }}
        >
          {(props.isOpen && props.infoIndex === marker.id) &&
              <InfoWindow onCloseClick={props.showInfo}>
                <div>
                  <p><b>{marker.name}</b></p>
                  <p>Rating: {marker.rating ? marker.rating : '---'}</p>
                  <p>{marker.openNow ? 'Open Now' : 'Close Now'}</p>
                  {/* todo: fix the website link , add the photo */}
                  <a href={marker.website} target="_blank">Website</a>
                  <button onClick={() => props.addPlace(marker)}>Add</button>
                </div>
              </InfoWindow>}
        </Marker>)
      }
    </GoogleMap>
  </div>;
});

export default MapComponent;
