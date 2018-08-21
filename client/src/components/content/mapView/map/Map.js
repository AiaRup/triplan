import React, { Component } from 'react';
import './Map.css';
import axios from 'axios';
import _ from 'lodash';
import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { compose, withProps, withState, lifecycle, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
// import 'map-icons/dist/fonts';
// import 'map-icons/dist/css/map-icons.css';
// import 'map-icons/dist/js/map-icons.js';
const google = window.google;

const MyMapComponent = compose(
  withState({ zoom: 12 }),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    isMarkerShown: true,
    zoom: 14,
    places: this.props.places, // ????
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({

        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const place = refs.searchBox.getPlaces();
          console.log('place');
          console.log(place);
          let lat = place[0].geometry.location.lat();
          let lng = place[0].geometry.location.lng();
          this.myLocation = { lat: lat, lng: lng };
          this.nameLocation = place[0].formatted_address;
          console.log(this.myLocation);
          this.props.updateAddress(this.myLocation);
          this.setState({ zoom: 13 });
        },

        onMarkerClick: () => {
          console.log('marker clicked!');
          console.log(this.props.zoom);
          console.log(this.state.zoom);

        },
        isArrayEqual: (array1, array2) => {
          let result = _(array1).differenceWith(array2, _.isEqual).isEmpty();
          console.log('equal', result);
          return result;
        },

        addMarkers: () => {
          console.log('in add markers', this.state.places);

          this.state.places.forEach((element) => {
            let type = element.type;
            const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=${type}&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY`;

            axios(url)
              .then((response) => {
                console.log('res', response.data.results);
                const markerArray = [];
                // add markers on the map
                response.data.results.forEach((location) => {
                  const objLatLng = location.geometry.location;
                  let marker = {
                    position:
                      { lat: objLatLng.lat, lng: objLatLng.lng }
                  }
                  markerArray.push(marker);
                });

                console.log(markerArray);
                this.setState({ markers: markerArray });

              });
          })
            .catch(function (error) {
              console.log(error);
            });
        },
      })
    }, // end componentWillMount
    componentDidUpdate(prevProps) {
      if (!this.isArrayEqual(this.props.places, prevProps.places)) {
        console.log('in compare');
        this.setState({ places: this.props.places }, () => this.addMarkers());
        // this.setState({ places: this.props.places });
      }
    }
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  console.log('in map props- address:', props.address)

  return <div>
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search Address"
        className="autocomplete"
      />
    </StandaloneSearchBox>
    <GoogleMap
      // defaultZoom={10}
      // zoom={10}
      zoom={props.zoom}
      center={{ lat: props.address.lat, lng: props.address.lng }}
      // defaultCenter={{ lat: -34.397, lng: 150.644 }}
      defaultCenter={{ lat: props.address.lat, lng: props.address.lng }}
      // defaultCenter={{ lat: this.myLocation.lat, lng: this.myLocation.lng }}
      defaultOptions={{
        mapTypeControl: false,
        rotateControl: false,
        fullscreenControl: false,
        scrollwheel: false
      }}
    >
      {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />} */}
      {props.isMarkerShown && <Marker position={{ lat: props.address.lat, lng: props.address.lng }} onClick={props.onMarkerClick} />}
      {/* {props.isMarkerShown && <Marker position={{ lat: this.myLocation.lat, lng: this.myLocation.lng }} onClick={props.onMarkerClick} />} */}
      {this.state.markerArray.map(marker => <Marker position={{ lat: marker.position.lat, lng: marker.position.lng }} />)}
    </GoogleMap>
  </div>

})


export default MyMapComponent


// export default class Map extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       zoom: 12,
//       maptype: 'roadmap',
//       place_formatted: '',
//       place_id: '',
//       place_location: '',
//       // places: []
//       places: props.places
//     };
//     this.address = props.address;
//     this.map = {};
//     // this.places = props.places;
//   }

// componentDidMount = () => {
//   // this.setState({ places: this.props.places });
//   this.map = new window.google.maps.Map(document.getElementById('map'), {
//     center: { lat: -33.8688, lng: 151.2195 },
//     zoom: 12,
//     mapTypeId: 'roadmap',
//     mapTypeControl: false,
//     scrollwheel: false
//   });

//   let marker = new window.google.maps.Marker({
//     map: this.map,
//     position: { lat: -33.8688, lng: 151.2195 },
//   });
// }

// componentDidUpdate(prevProps) {
//   if (!this.isArrayEqual(this.props.places, prevProps.places)) {
//     console.log('in compare');
//     this.setState({ places: this.props.places }, () => this.addMarkers());
//   }
// }

// isArrayEqual = (array1, array2) => {
//   let result = _(array1).differenceWith(array2, _.isEqual).isEmpty();
//   console.log('equal', result);
//   return result;
// };


// addMarkers = () => {
//   console.log('in add markers', this.state.places);

//   this.state.places.forEach((element) => {
//     let type = element.type;
//     const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=${type}&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY`;

//     axios(url)
//       .then((response) => {
//         console.log('res', response.data.results);
//         // add markers on the map
//         response.data.results.forEach((location) => {
//           const objLatLng = location.geometry.location;
//           let marker = new window.google.maps.Marker({
//             map: this.map,
//             animation: google.maps.Animation.DROP,
//             position: { lat: objLatLng.lat, lng: objLatLng.lng },
//           });
//         });
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   });
// }

// setMapOnAll(map) {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(map);
//   }
// }

// clearMarkers = () => {
//   setMapOnAll(null);
// }

// render() {
//   return (
//     <div id='appMap'>
//       <div id='map'></div>
//     </div>
//   );
// }
// }

