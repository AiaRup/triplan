/* eslint-disable no-undef */
import React from 'react';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
// import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Collapse } from 'react-collapse';
import Notification, { notify } from 'react-notify-toast';

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
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=en&key=AIzaSyAewucBzhp4DIePd6P0JHbpkQ4JtPzCShE',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};
      this.setState({
        bounds: null,
        center: { lat: 51.507351, lng: -0.127758 },
        marker: { lat: 51.507351, lng: -0.127758 },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onMapMounted: ref => {
          refs.map = ref;
          // this.setState({ bounds: refs.map.getBounds() }); //maybe comment out
        },
        // onBoundsChanged: () => {
        //   this.setState({
        //     bounds: refs.map.getBounds(),
        //     center: refs.map.getCenter(),
        //   })
        // },
        onPlacesChanged: () => {
          const place = refs.searchBox.getPlaces();
          console.log(place);

          if (place.length === 0) {
            let myColor = { background: '#e22866', text: "#FFFFFF" };
            notify.show("Address not found", "custom", 5000, myColor);
            return;
          }

          // empty temp events array
          this.props.emptyEvents();

          this.props.saveCity(place[0].vicinity);

          //show the prefernces after search a new place in searchBox
          this.props.openPrefernces(true);

          const lat = place[0].geometry.location.lat();
          const lng = place[0].geometry.location.lng();
          let bounds = new google.maps.LatLngBounds();
          // const bounds = new google.maps.LatLngBounds();
          // const bounds = refs.map.getBounds();
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
          this.props.updateAddress({ lat: lat, lng: lng });
        },
        addPlace: (marker) => {
          const newActivity = { type: 'place' };
          for (let prop in marker) {
            if (marker.hasOwnProperty(prop)) {
              if (prop === 'name' || prop === 'address' || prop === 'phone' || prop === 'category' || prop === 'price' || prop === 'id' || prop === 'position') {
                newActivity[prop] = marker[prop];
              }
            }
          }
          //close the infoWindow after click add place
          this.props.showInfo(this.props.infoIndex);
          this.props.addPlace(newActivity);
        },
      });
    }, // end componentWillMount
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  return <div>
    <Notification options={{ zIndex: 200, top: '250px' }} />

    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={14}
      // onBoundsChanged={props.onBoundsChanged}
      center={props.center}
      defaultOptions={{ mapTypeControl: false, rotateControl: false, scrollwheel: false }}>

      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_CENTER}
        onPlacesChanged={props.onPlacesChanged} >
        <input
          type="text"
          placeholder="Search Address"
          className="autocomplete" />
      </SearchBox>

      <Marker position={props.marker} />

      {props.markers.map((marker) =>
        <Marker key={marker.id}
          position={{ lat: marker.position.lat, lng: marker.position.lng }}
          icon={{ url: require(`../../../../markersIcons/${marker.icon}`) }}
          onClick={() => props.showInfo(marker.id)}
          onMouseOver={() => props.onHoverBox(marker.id)}
          onMouseOut={() => props.onHoverBox(marker.id)} >

          {(props.isOpen && props.infoIndex === marker.id) &&
            <InfoWindow onCloseClick={props.showInfo}>
              <div className="info-window">
                <div className='info-content'>
                  <p className='info-header'>{marker.name}</p>
                  <p>{marker.address}</p>
                  <p>{marker.phone}</p>
                  {marker.price && <p>Price level: {marker.price}</p>}
                  {marker.rating && <p>Rating: {marker.rating}</p>}
                  <p>{marker.openNow ? 'Open Now!' : 'Close Now!'}</p>
                  {marker.openHours &&
                    <Collapse isOpened={(props.toggleCollapse && props.indexCollapse === marker.id)}>
                      {marker.openHours.map((day, index) => <p key={index}>{day}</p>)}
                    </Collapse>}
                  {marker.openHours &&
                    <p onClick={() => props.collapseToggle(marker.id)}>Opening Hours &raquo;</p>}
                  {marker.website && <a href={marker.website} target="_blank">Website</a>}
                  <br />
                  <button className='btn btn-secondary btn-sm' onClick={() => props.addPlace(marker)}>Add
                    <i className="fa fa-plus fa-fw" aria-hidden="true"></i>
                  </button>
                </div>
                <div>
                  {/* {marker.photo && <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=130&maxheight=130&photoreference=${marker.photo}&key=AIzaSyCl5mAkzOiDZ8dnZjdankkW92-MYxmjNw0`} alt='' />} */}
                </div>
              </div>
            </InfoWindow>}

          {(props.isOpenHover && props.infoIndexHover === marker.id) && <InfoBox
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

