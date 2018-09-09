import React, { Component } from 'react';
import './Map.css';
import axios from 'axios';
import GoogleMap from '../googleMap/GoogleMap';
import { observer, inject } from 'mobx-react';
import Notification, { notify } from 'react-notify-toast';

@inject('store')
@observer
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: props.places,
      markers: [],
    };
    this.finishMarker = 0;
  }

  addMarkers = () => {

    // for the clear button
    if (this.state.places.length === 0) {
      this.setState({ markers: [] });
      return;
    }

    // toggle loading
    this.props.store.toggleLoading(true);

    // let myColor = { background: '#0E1717', text: "#FFFFFF" };
    // notify.show("Loading...", "custom", 5000, myColor);

    this.finishMarker = 0;
    const markerArray = [];

    this.state.places.forEach((element) => {
      let type = element.type;

      axios(`/api/users/googlePlaces/${type}/${this.props.address.lat}/${this.props.address.lng}`).then((response) => {
        console.log('res in axios first fetch', response);

        console.log('response', response);

        const promises = [];

        response.data.results.forEach((location) => {
          promises.push(axios(`/api/users/placeSearch/${location.place_id}`));
        });

        //  create all the markers after result arrives from second api request
        Promise.all(promises).then((values) => {
          console.log('values in promises all', values);

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
  // addMarkers = () => {
  //   if (this.state.places.length === 0) {
  //     this.setState({ markers: [] });
  //     return;
  //   }

  //   this.finishMarker = 0;
  //   const markerArray = [];

  //   this.state.places.forEach((element) => {
  //     let type = element.type;

  //     axios(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.address.lat},${this.props.address.lng}&radius=2000&type=${type}&language=en&key=AIzaSyAewucBzhp4DIePd6P0JHbpkQ4JtPzCShE`)
  //       .then((response) => {
  //         const promises = [];

  //         // get more info on the placee found by the first request
  //         response.data.results.forEach((location) => {
  //           promises.push(axios(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${location.place_id}&fields=name,rating,international_phone_number,formatted_address,price_level,website,permanently_closed,place_id,photo,geometry,opening_hours&language=en&key=AIzaSyAewucBzhp4DIePd6P0JHbpkQ4JtPzCShE`));
  //         });

  //         // create all the markers after result arrives from second api request
  //         Promise.all(promises).then((values) => {
  //           console.log('values', values);

  //           values.forEach((att) => {
  //             const attraction = att.data.result;
  //             const { lat, lng } = attraction.geometry.location;

  //             let marker = {
  //               name: attraction.name,
  //               id: attraction.place_id,
  //               icon: element.icon,
  //               rating: attraction.rating,
  //               website: attraction.website,
  //               address: attraction.formatted_address,
  //               category: type,
  //               position:
  //                 { lat: lat, lng: lng },
  //             };
  //             if (attraction.opening_hours !== undefined) {
  //               marker.openNow = attraction.opening_hours.open_now;
  //               marker.openHours = attraction.opening_hours.weekday_text;
  //             }
  //             if (attraction.international_phone_number !== undefined) {
  //               marker.phone = attraction.international_phone_number;
  //             }
  //             if (attraction.photos !== undefined) {
  //               marker.photo = attraction.photos[0].photo_reference;
  //             }
  //             if (attraction.price_level !== undefined) {
  //               switch (attraction.price_level) {
  //               case 0:
  //                 marker.price = 'Free';
  //                 break;
  //               case 1:
  //                 marker.price = 'Inexpensive';
  //                 break;
  //               case 2:
  //                 marker.price = 'Moderate';
  //                 break;
  //               case 3:
  //                 marker.price = 'Expensive';
  //                 break;
  //               case 4:
  //                 marker.price = 'Very Expensive';
  //                 break;
  //               default: break;
  //               }
  //             }
  //             markerArray.push(marker);
  //           });
  //           this.finishMarker++;
  //           this.checkFinishMarkers(markerArray);
  //         });
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });
  // }

  componentDidUpdate(prevProps) {
    if (!(JSON.stringify(this.props.places) === JSON.stringify(prevProps.places))) {
      this.setState({ places: this.props.places }, () => this.addMarkers());
    }
  }

  checkFinishMarkers(markerArray) {
    if (this.finishMarker === this.state.places.length) {
      if (markerArray.length === 0) {
        let myColor = { background: '#e22866', text: '#FFFFFF' };
        notify.show('No attraction found!', 'custom', 5000, myColor);
        // toggle loading
        // this.props.store.toggleLoading(false);
      }
      // toggle loading
      this.props.store.toggleLoading(false);
      this.setState({ markers: markerArray });
    }
  }

  addPlace = (place) => {
    let exist = false;
    let places = this.props.store.placesArray;
    for (var i = 0; i < places.length && !exist; i++) {
      if (places[i].id === place.id) {
        let myColor = { background: '#e22866', text: '#FFFFFF' };
        notify.show('You Already Choose This Place', 'custom', 5000, myColor);
        // alert('You already have this activity place');
        exist = true;
        return;
      }
    }
    // add the place to temp places div only if it doesnt already exist
    this.props.store.addPlace(place);
  }

  render() {
    return (
      <React.Fragment>
        <Notification options={{ zIndex: 200, top: '50px' }} />
        <GoogleMap
          togglePrefernces={this.props.store.togglePrefernces}
          markers={this.state.markers}
          // address={this.props.address}
          updateAddress={this.props.updateAddress}
          addPlace={this.addPlace}
          saveCity={this.props.store.saveCity}
          emptyEvents={this.props.store.emptyTempEvents}
        />
      </React.Fragment>
    );
  }
}

export default Map;

