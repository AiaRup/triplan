import React, { Component } from 'react';
import Autocomplete from 'react-google-autocomplete';
import './location.css';

export default class Location extends Component {

  state = {
    isSelect: false
  }

  location = { lat: '', lng: '' };

  handleSelect = (place) => {
    console.log(place);
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();
    this.myLocation = { lat: lat, lng: lng };
    this.isSelect = true;
    console.log(this.myLocation);
    this.setState({ isSelect: true });
    this.props.updateAddress(this.myLocation);
  }

  handleClick = () => {
    console.log('search...');
    console.log('address: ', this.location);
    this.setState({ isSelect: false });
  }

  render() {
    return (
      <div>
        <Autocomplete
          style={{ width: '100%' }}
          onPlaceSelected={this.handleSelect}
          types={['address']}
        />
        {/* <button
          // disabled={!this.state.isSelect}
          onClick={this.handleClick}>Search</button> */}
      </div>
    );
  }
}


// import React from 'react';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';

// export default class LocationSearchInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { address: '' };
//   }

//   handleChange = address => {
//     this.setState({ address });
//   };

//   handleSelect = address => {
//     geocodeByAddress(address)
//       .then(results => getLatLng(results[0]))
//       .then(latLng => console.log('Success', latLng))
//       .catch(error => console.error('Error', error));
//   };

//   render() {
//     return (
//       <PlacesAutocomplete
//         value={this.state.address}
//         onChange={this.handleChange}
//         onSelect={this.handleSelect}
//       >
//         {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//           <div>
//             <input
//               {...getInputProps({
//                 placeholder: 'Search Places ...',
//                 className: 'location-search-input',
//               })}
//             />
//             <div className="autocomplete-dropdown-container">
//               {loading && <div>Loading...</div>}
//               {suggestions.map(suggestion => {
//                 const className = suggestion.active
//                   ? 'suggestion-item--active'
//                   : 'suggestion-item';
//                 // inline style for demonstration purpose
//                 const style = suggestion.active
//                   ? { backgroundColor: '#fafafa', cursor: 'pointer' }
//                   : { backgroundColor: '#ffffff', cursor: 'pointer' };
//                 return (
//                   <div
//                     {...getSuggestionItemProps(suggestion, {
//                       className,
//                       style,
//                     })}
//                   >
//                     <span>{suggestion.description}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}
//       </PlacesAutocomplete>
//     );
//   }
// }


// import AddressAutocomplete from 'react-address-autocomplete';





// import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

// export class MapContainer extends Component {

//   render() {
//     return (
//       <div>
//         <Map google={this.props.google} zoom={14}>

//           <Marker onClick={this.onMarkerClick}
//             name={'Current location'} />

//           <InfoWindow onClose={this.onInfoWindowClose}>
//             <div>
//               {/* <h1>{this.state.selectedPlace.name}</h1> */}
//             </div>
//           </InfoWindow>
//         </Map>


//         <Autocomplete
//           style={{ width: '40%' }}
//           onPlaceSelected={this.handleSelect}
//           types={['address']}
//         />
//         <button
//           // disabled={!this.state.isSelect}
//           onClick={this.handleClick}>Search</button>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyA4bp4I5F8bUKEyvXOoFX3EyzNK_ZjtMOA'
// })(MapContainer)





// export default class Location extends Component {
//   constructor() {
//     super();
//     this.state = {
//       zoom: 13,
//       maptype: 'roadmap',
//       place_formatted: '',
//       place_id: '',
//       place_location: '',
//     };
//   }

//   componentDidMount() {
//     let map = new window.google.maps.Map(document.getElementById('map'), {
//       center: { lat: -33.8688, lng: 151.2195 },
//       zoom: 13,
//       mapTypeId: 'roadmap',
//     });

//     map.addListener('zoom_changed', () => {
//       this.setState({
//         zoom: map.getZoom(),
//       });
//     });

//     map.addListener('maptypeid_changed', () => {
//       this.setState({
//         maptype: map.getMapTypeId(),
//       });
//     });

//     let marker = new window.google.maps.Marker({
//       map: map,
//       position: { lat: -33.8688, lng: 151.2195 },
//     });

//     // initialize the autocomplete functionality using the #pac-input input box
//     let inputNode = document.getElementById('pac-input');
//     map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(inputNode);
//     let autoComplete = new window.google.maps.places.Autocomplete(inputNode);

//     autoComplete.addListener('place_changed', () => {
//       let place = autoComplete.getPlace();
//       let location = place.geometry.location;

//       this.setState({
//         place_formatted: place.formatted_address,
//         place_id: place.place_id,
//         place_location: location.toString(),
//       });

//       // bring the selected place in view on the map
//       map.fitBounds(place.geometry.viewport);
//       map.setCenter(location);

//       marker.setPlace({
//         placeId: place.place_id,
//         location: location,
//       });
//     });
//   }

//   render() {
//     return (
//       <div id='app' >
//         <div id="state" />
//         <div id='pac-container'>
//           <input id='pac-input' type='text' placeholder='Enter a location' />
//         </div>
//         <div id='map' />
//       </div>
//     );
//   }
// };