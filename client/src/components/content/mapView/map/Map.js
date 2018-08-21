import React, { Component } from 'react';
import './Map.css';
// import { observer, inject } from 'mobx-react';
// import axios from 'axios';
import _ from 'lodash';


// @inject('store')
// @observer
// export default class Map extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       zoom: 13,
//       maptype: 'roadmap',
//       place_formatted: '',
//       place_id: '',
//       place_location: '',
//       places: props.places
//     };
//     this.address = props.address;
//   }

//   componentDidMount = () => {
//     let map = new window.google.maps.Map(document.getElementById('map'), {
//       center: { lat: -33.8688, lng: 151.2195 },
//       zoom: 13,
//       mapTypeId: 'roadmap',
//       mapTypeControl: false
//     });

//     let marker = new window.google.maps.Marker({
//       map: map,
//       position: { lat: -33.8688, lng: 151.2195 },
//     });
//   }

//   // shouldComponentUpdate(nextProps) {
//   //   if (this.address !== nextProps.address) {
//   //     this.address = nextProps.address;
//   //     console.log('in should');
//   //     let map = new window.google.maps.Map(document.getElementById('map'), {
//   //       center: { lat: this.address.lat, lng: this.address.lng },
//   //       zoom: 17,
//   //       mapTypeId: 'roadmap',
//   //       mapTypeControl: false
//   //     });

//   //     let marker = new window.google.maps.Marker({
//   //       map: map,
//   //       position: { lat: this.address.lat, lng: this.address.lng },
//   //     });
//   //     return true;
//   //   }
//   //   return false;
//   // }

//   componentDidUpdate(prevProps) {
//     console.log('in update');
//     if (!this.isArrayEqual(this.props.places, prevProps.places)) {
//       console.log('in compare');

//       this.setState({ places: this.props.places }, () => this.addMarkers());

//       // let map = new window.google.maps.Map(document.getElementById('map'), {
//       //   center: { lat: -33.8688, lng: 151.2195 },
//       //   zoom: 17,
//       //   mapTypeId: 'roadmap',
//       //   mapTypeControl: false
//       // });


//     }

//     // this.places.forEach((place) => {



//   }

//   isArrayEqual = (array1, array2) => {
//     return _(array1).differenceWith(array2, _.isEqual).isEmpty();
//   };


//   addMarkers = () => {
//     console.log('in add markers', this.state.places);

//     this.state.places.forEach((element) => {
//       console.log(console.log(element.type));
//           //   axios.get('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=YOUR_API_KEY')
//     //     .then(function (response) {
//     //       console.log(response);
//     //     })
//     //     .catch(function (error) {
//     //       console.log(error);
//     //     });

//     //   let marker = new window.google.maps.Marker({
//     //     map: map,
//     //     position: { lat: this.address.lat, lng: this.address.lng },
//     //   });
//     // });
//     });
//   }

//   render() {
//     console.log('in render map');
//     console.log(this.props.places);
//     return (
//       <div id='appMap'>
//         <div id='map'></div>
//       </div>
//     );
//   }
// }

import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { compose, withProps, withState, lifecycle, withHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withState({ zoom: 12 }),
  // withState('zoom', 'onZoomChange', 15),
  // withHandlers(() => {
  //   const refs = {
  //     map: undefined,
  //   }

  //   return {
  //     onMapMounted: () => ref => {
  //       refs.map = ref
  //     },
  //     onZoomChanged: ({ onZoomChange }) => () => {
  //       onZoomChange(refs.map.getZoom())
  //     }
  //   }
  // }),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    isMarkerShown: true,
    zoom: 14,
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
      })
    }, // end componentWillMount

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
        placeholder="הזן מיקום"
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
    </GoogleMap>
  </div>

  // <GoogleMap
  //   defaultZoom={12}
  //   // Zoom={13}
  //   // defaultCenter={{ lat: -34.397, lng: 150.644 }}
  //   defaultCenter={{ lat: props.address.lat, lng: props.address.lng }}

  // >
  //   {/* {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />} */}
  //   {props.isMarkerShown && <Marker position={{ lat: props.address.lat, lng: props.address.lng }} onClick={props.onMarkerClick} />}
  // </GoogleMap>
}

)


export default MyMapComponent

