import React, { Component } from 'react';
import './Map.css';
import axios from 'axios';
import GoogleMap from '../googleMap/GoogleMap';
import { observer, inject } from 'mobx-react';
import Notification, { notify } from 'react-notify-toast';
import { Popover, PopoverHeader } from 'reactstrap';

@inject('store')
@observer
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: props.places,
      markers: [],
      fadeIn: false
    };
    this.finishMarker = 0;
  }

  toggleFade = () => {
    this.setState({
      fadeIn: !this.state.fadeIn
    });
  }


  addMarkers = () => {

    // for the clear button
    if (this.state.places.length === 0) {
      this.setState({ markers: [] });
      return;
    }

    // toggle loading
    this.props.store.toggleLoading(true);

    this.finishMarker = 0;
    const markerArray = [];

    this.state.places.forEach((element) => {
      let type = element.type;

      axios(`/api/users/googlePlaces/${type}/${this.props.store.address.lat}/${this.props.store.address.lng}`).then((response) => {
        const promises = [];

        response.data.results.forEach((location) => {
          promises.push(axios(`/api/users/placeSearch/${location.place_id}`));
        });

        //  create all the markers after result arrives from second api request
        Promise.all(promises).then((values) => {

          values.forEach((att) => {
            const attraction = att.data.result;
            const { lat, lng } = attraction.geometry.location;

            let marker = {
              name: attraction.name,
              id: attraction.place_id,
              icon: element.icon,
              rating: attraction.rating,
              website: attraction.website,
              address: attraction.formatted_address,
              category: type,
              position:
                { lat: lat, lng: lng },
            };
            if (attraction.opening_hours !== undefined) {
              marker.openNow = attraction.opening_hours.open_now;
              marker.openHours = attraction.opening_hours.weekday_text;
            }
            if (attraction.international_phone_number !== undefined) {
              marker.phone = attraction.international_phone_number;
            }
            if (attraction.photos !== undefined) {
              marker.photo = attraction.photos[0].photo_reference;
            }
            if (attraction.price_level !== undefined) {
              switch (attraction.price_level) {
              case 0:
                marker.price = 'Free';
                break;
              case 1:
                marker.price = 'Inexpensive';
                break;
              case 2:
                marker.price = 'Moderate';
                break;
              case 3:
                marker.price = 'Expensive';
                break;
              case 4:
                marker.price = 'Very Expensive';
                break;
              default: break;
              }
            }
            markerArray.push(marker);
          });
          this.finishMarker++;
          this.checkFinishMarkers(markerArray);

        });
      })
        .catch((error) => {
          console.log(error);
        });
    });

  }

  componentDidUpdate(prevProps) {
    if (!(JSON.stringify(this.props.places) === JSON.stringify(prevProps.places))) {
      this.setState({ places: this.props.places }, () => this.addMarkers());
    }
  }

  checkFinishMarkers(markerArray) {
    if (this.finishMarker === this.state.places.length) {
      // off loading
      this.props.store.toggleLoading(false);
      // render the markers result on map
      this.setState({ markers: markerArray });

      if (markerArray.length === 0) {
        let myColor = { background: '#f50057', text: '#FFFFFF' };
        notify.show('No Attraction Found!', 'custom', 3000, myColor);
        return;
      }

      // close prefernces after found attraction and the markers are show on map
      setTimeout(() => {
        this.props.store.togglePrefernces();
      }, 500);

    }
  }

  addPlace = (place) => {
    let exist = false;
    let places = this.props.store.placesArray;
    for (var i = 0; i < places.length && !exist; i++) {
      if (places[i].id === place.id) {
        let myColor = { background: '#f50057', text: '#FFFFFF' };
        notify.show('You Already Chose This Place!', 'custom', 3000, myColor);
        exist = true;
        return;
      }
    }
    // add the place to temp places div only if it doesnt already exist
    this.props.store.addPlace(place);

    this.toggleFade(); // become true

    setTimeout(() => {
      this.toggleFade(); // become false
    }, 2500);
  }

  render() {
    return (
      <React.Fragment>
        <div id="Tooltip1"></div>
        <Popover placement="left" isOpen={this.state.fadeIn} target="Tooltip1" toggle={this.toggleFade}>
          <PopoverHeader>Attraction Added to Plan Board!</PopoverHeader>
        </Popover>
        <Notification options={{ zIndex: 400, top: '150px' }} />
        <GoogleMap
          togglePrefernces={this.props.store.togglePrefernces}
          markers={this.state.markers}
          address={this.props.store.address}
          updateAddress={this.props.updateAddress}
          addPlace={this.addPlace}
          saveCity={this.props.store.saveCity}
          emptyEvents={this.props.store.emptyTempEvents}
          animate={this.props.store.animate}
        />
      </React.Fragment>
    );
  }
}

export default Map;

