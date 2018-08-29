/* eslint-disable no-undef */
import React from 'react';
import { SearchBox } from 'react-google-maps/lib/components/places/SearchBox';
// import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { InfoBox } from 'react-google-maps/lib/components/addons/InfoBox';
import { compose, withProps, lifecycle, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import { Collapse } from 'react-collapse';


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

      <Marker position={{ lat: props.address.lat, lng: props.address.lng }} />

      {props.markers.map((marker) =>
        <Marker onClick={() => props.showInfo(marker.id)} key={marker.id}
          position={{ lat: marker.position.lat, lng: marker.position.lng }}
          icon={{
            url: require(`../../../../markersIcons/${marker.icon}`)
          }}
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
                    <p onClick={() => props.collapseToggle(marker.id)}>Opening Hours &raquo;</p>}
                  {marker.openHours &&
                    <Collapse isOpened={(props.toggleCollapse && props.indexCollapse === marker.id)}>
                      {marker.openHours.map((day, index) => <p key={index}>{day}</p>)}
                    </Collapse>}
                  {marker.website && <a href={marker.website} target="_blank">Website</a>}
                  <button className='btn btn-danger btn-sm' onClick={() => props.addPlace(marker)}>Add</button>
                </div>
                <div>
                  {marker.photo && <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=130&maxheight=130&photoreference=${marker.photo}&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY`} alt='' />}
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

