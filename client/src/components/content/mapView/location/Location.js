import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import './location.css';



// export default class Location extends Component {

//   state = {
//     isSelect: false
//   }

//   location = { lat: '', lng: '' };
//   nameLocation = '';

//   handleSelect = (place) => {
//     console.log(place);
//     let lat = place.geometry.location.lat();
//     let lng = place.geometry.location.lng();
//     this.myLocation = { lat: lat, lng: lng };
//     this.nameLocation = place.formatted_address;
//     this.isSelect = true;
//     console.log(this.myLocation);
//     this.setState({ isSelect: true });
//     this.props.updateAddress(this.myLocation);
//   }

//   handleClick = () => {
//     console.log('search...');
//     console.log('in location -address: ', this.location);
//     this.setState({ isSelect: false });
//   }

//   render() {
//     return (
//       <div>
//         <Autocomplete
//           style={{ width: '100%' }}
//           onPlaceSelected={this.handleSelect}
//           types={['address']}
//         // types={['ageocode']}
//         />
//         <p>Address: {this.nameLocation}</p>
//         {/* <button
//           // disabled={!this.state.isSelect}
//           onClick={this.handleClick}>Search</button> */}
//       </div>
//     );
//   }
// }


import { StandaloneSearchBox } from "react-google-maps/lib/components/places/StandaloneSearchBox";
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs } from "react-google-maps"

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
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

        },
      })
    },
  }),
  withScriptjs
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="הזן מיקום"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>

  </div>
);

export default PlacesWithStandaloneSearchBox;