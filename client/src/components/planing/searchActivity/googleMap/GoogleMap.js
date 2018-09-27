/* eslint-disable no-undef */
import React from 'react';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Collapse } from 'react-collapse';
import Notification, { notify } from 'react-notify-toast';
import _ from 'lodash';
import AddIcon from '@material-ui/icons/Add';
import { Button } from '@material-ui/core';
import drawStarts from '../../../utils/drawStarts';

// const google=window.google;

const MapComponent = compose(
  withStateHandlers(() =>
    ({
      isOpen: false,
      infoIndex: null,
      isOpenHover: false,
      infoIndexHover: null,
      toggleCollapse: false,
      indexCollapse: null
    }),
    {
      showInfo: ({ isOpen, infoIndex }) => (index) => ({
        isOpen: infoIndex !== index || !isOpen,
        infoIndex: index
      }),
      onHoverBox: ({ isOpenHover, infoIndexHover }) => (index) => ({
        isOpenHover: infoIndexHover !== index || !isOpenHover,
        infoIndexHover: index
      }),
      collapseToggle: ({ toggleCollapse, indexCollapse }) => (index) => ({
        toggleCollapse: indexCollapse !== index || !toggleCollapse,
        indexCollapse: index
      })
    },
  ),
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=en&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        bounds: null,
        center: { lat: this.props.address.lat, lng: this.props.address.lng },
        marker: { lat: this.props.address.lat, lng: this.props.address.lng },

        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onMapMounted: ref => {
          refs.map = ref;
        },
        onPlacesChanged: () => {
          const place = refs.searchBox.getPlaces();

          if (place.length === 0) {
            let myColor = { background: '#e22866', text: '#FFFFFF' };
            notify.show('Address not found', 'custom', 5000, myColor);
            return;
          }

          // empty temp events array
          this.props.emptyEvents();

          //show the prefernces after search a new place in searchBox
          this.props.togglePrefernces(true);

          if (place[0].geometry) {
            this.props.saveCity(place[0].vicinity);

            const lat = place[0].geometry.location.lat();
            const lng = place[0].geometry.location.lng();

            let bounds = new google.maps.LatLngBounds();
            if (place[0].geometry.viewport) {
              bounds.union(place[0].geometry.viewport);
            } else {
              bounds.extend(place[0].geometry.location);
            }

            const nextCenter = _.get([{ position: { lat: lat, lng: lng } }], '0.position', this.state.center);
            this.setState({
              bounds: bounds,
              center: nextCenter,
              marker: place[0].geometry.location,
            });
            //update to the current address
            this.props.updateAddress({ lat: lat, lng: lng });
          }
          else {
            let myColor = { background: '#e22866', text: '#FFFFFF' };
            notify.show('Could not display this address', 'custom', 5000, myColor);
            // check how to clear the input value !
          }
        },
        addPlace: (marker) => {
          const newActivity = { type: 'place' };
          for (let prop in marker) {
            if (marker.hasOwnProperty(prop)) {
              if (prop === 'name' || prop === 'address' || prop === 'phone' || prop === 'category' || prop === 'price' || prop === 'id' || prop === 'position' || prop === 'rating' || prop === 'photo') {
                newActivity[prop] = marker[prop];
              }
            }
          }

          this.props.addPlace(newActivity);
          //close the infoWindow after click add place
          this.props.showInfo(this.props.infoIndex);
        },
      });
    }, // end componentWillMount
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return <div  >
    <Notification options={{ zIndex: 400, top: '150px' }} />

    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={14}
      // center={props.center}
      center={props.address}
      defaultOptions={{ mapTypeControl: false, rotateControl: false, scrollwheel: false }}>

      <SearchBox
        ref={props.onSearchBoxMounted}
        // bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_CENTER}
        onPlacesChanged={props.onPlacesChanged} >
        <input
          type="text"
          placeholder="Search Address"
          className="autocomplete" />
      </SearchBox>

      {/* <Marker position={props.marker} /> */}
      <Marker position={props.address} />

      {props.markers.map((marker) =>
        <Marker key={marker.id}
          position={{ lat: marker.position.lat, lng: marker.position.lng }}
          icon={{ url: require(`../../../../images/marker-icons/${marker.icon}`) }}
          onClick={() => props.showInfo(marker.id)}
          onMouseOver={() => props.onHoverBox(marker.id)}
          onMouseOut={() => props.onHoverBox(marker.id)} >

          {(props.isOpen && props.infoIndex === marker.id) &&
            <InfoWindow onCloseClick={props.showInfo}>
              <React.Fragment>
                <div className="info-window">
                  <div className='info-content'>
                    <p className='info-header'>{marker.name}</p>
                    <p>{marker.address}</p>
                    <p>{marker.phone}</p>
                    {marker.price && <p>Price level: {marker.price}</p>}
                    {marker.rating &&
                      <div className="rating-Info"> <p>Rating: {marker.rating}</p> {drawStarts(marker.rating)}</div>}
                    <p>{marker.openNow ? 'Open Now!' : 'Close Now!'}</p>
                    {marker.openHours &&
                      <Collapse isOpened={(props.toggleCollapse && props.indexCollapse === marker.id)}>
                        {marker.openHours.map((day, index) => <p key={index}>{day}</p>)}
                      </Collapse>}
                    {marker.openHours &&
                      <p onClick={() => props.collapseToggle(marker.id)}>Opening Hours &raquo;</p>}
                    {marker.website && <a href={marker.website} target="_blank">Website</a>}
                  </div>
                  <div>
                    {/* {marker.photo && <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=130&maxheight=130&photoreference=${marker.photo}&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0`} alt='' />} */}
                  </div>
                </div>
                <div className='add-attraction'>
                  <Button variant="fab" color="secondary" mini aria-label="Add" onClick={() => props.addPlace(marker)}>
                    <AddIcon />
                  </Button>
                </div>
              </React.Fragment>
            </InfoWindow>}

          {(props.isOpenHover && props.infoIndexHover === marker.id) &&
            <InfoBox
              options={{ closeBoxURL: '', enableEventPropagation: true }} >
              <div className='info-box'>
                <p className='info-header'><b>{marker.name}</b></p>
                <p>{marker.address}</p>
                <p>{marker.phone}</p>
              </div>
            </InfoBox>}
        </Marker>)
      }
    </GoogleMap>
  </div>;
});

export default MapComponent;

