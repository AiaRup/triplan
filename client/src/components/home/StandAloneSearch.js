import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import './home.css';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => {
        console.log('result', results);
        this.props.store.saveCity(results[0].address_components[0].short_name);
        return getLatLng(results[0]);
      }
      )
      .then(latLng => {
        console.log('Success', latLng);
        this.props.store.saveAddress(latLng);
        this.props.store.emptyTempEvents();
        this.props.store.togglePrefernces();
      } )
      .catch(error => console.error('Error', error));
    this.setState({ address });

    // this.props.store.togglePrefernces();
    // this.props.store.saveCity;
    // this.props.store.emptyTempEvents();
    // this.props.store.address;
    // this.props.store.saveAddress(address);
  };


  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search City ...',
                className: 'location-search-input',
                autoFocus: true
              })}

            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';

                const style = suggestion.active
                  ? { backgroundColor: '#f50057', cursor: 'pointer', margin: '2px', border:'1px solid lightgrey', borderRadius: '3px', padding: '3px', color: 'white', width:'253px' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer', margin: '2px', border:'1px solid lightgrey', borderRadius: '3px', padding: '3px', width:'253px' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}


export default LocationSearchInput;