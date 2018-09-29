import React from 'react';
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from 'react-places-autocomplete';
import './home.css';
// import { observer, inject } from 'mobx-react';
import Notification, { notify } from 'react-notify-toast';


// @inject('store')
// @observer
// class LocationSearchInput extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { address: '' };
//   }

//   handleChange = address => {
//     this.setState({ address });
//   };

//   handleSelect = address => {
//     geocodeByAddress(address)
//       .then(results => {
//         console.log('result', results);
//         this.props.store.saveCity(results[0].address_components[0].short_name);
//         this.props.store.toggleGoToMap(true);
//         return getLatLng(results[0]);
//       }
//       )
//       .then(latLng => {
//         console.log('Success', latLng);
//         this.props.store.saveAddress(latLng);
//         this.props.store.emptyTempEvents();
//       })
//       .catch(error =>{
//         console.log('in error autocomplete');
//         console.error('Error', error);
//         this.props.store.toggleGoToMap(false);
//         let myColor = { background: '#f50057', text: '#FFFFFF' };
//         notify.show('Address Not Found', 'custom', 3000, myColor);
//       });
//     this.setState({ address });
//   };


//   render() {
//     return (
//       <React.Fragment>
//         <Notification options={{ zIndex: 400, top: '250px' }} />

//         <PlacesAutocomplete
//           value={this.state.address}
//           onChange={this.handleChange}
//           onSelect={this.handleSelect}
//         >

//           {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
//             <div>
//               <input
//                 {...getInputProps({
//                   placeholder: 'Search City ...',
//                   className: 'location-search-input',
//                   autoFocus: true
//                 })}

//               />
//               <div className="autocomplete-dropdown-container">
//                 {loading && <div>Loading...</div>}
//                 {suggestions.map(suggestion => {
//                   const className = suggestion.active
//                     ? 'suggestion-item--active'
//                     : 'suggestion-item';

//                   const style = suggestion.active
//                     ? { backgroundColor: '#f50057', cursor: 'pointer', margin: '2px', border: '1px solid lightgrey', borderRadius: '3px', padding: '3px', color: 'white', width: '253px' }
//                     : { backgroundColor: '#ffffff', cursor: 'pointer', margin: '2px', border: '1px solid lightgrey', borderRadius: '3px', padding: '3px', width: '253px' };
//                   return (
//                     <div
//                       {...getSuggestionItemProps(suggestion, {
//                         className,
//                         style,
//                       })}
//                     >
//                       <span>{suggestion.description}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           )}
//         </PlacesAutocomplete>
//       </React.Fragment>
//     );
//   }
// }


// export default LocationSearchInput;

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

          this.props.saveCity(places[0].address_components[0].short_name);
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
            width: '240px',
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