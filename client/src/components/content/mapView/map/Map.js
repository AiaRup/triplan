import React, { Component } from 'react';
import './Map.css';
import axios from 'axios';
import _ from 'lodash';
import GoogleMap from '../googleMap/GoogleMap';
import { observer, inject } from 'mobx-react';


@inject('store')
@observer
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: props.places,
      markers: []
    };
    this.images = [];
  }

  addMarkers = () => {
    const markerArray = [];
    const promises = [];
    this.state.places.forEach((element) => {
      let type = element.type;

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.address.lat},${this.props.address.lng}&radius=1500&type=${type}&language=en&key=AIzaSyDuKj7l762Y5ulcwj_EyANIvHx6rfffceY`;

      // https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=CpQCAgEAAFxg8o-eU7_uKn7Yqjana-HQIx1hr5BrT4zBaEko29ANsXtp9mrqN0yrKWhf-y2PUpHRLQb1GT-mtxNcXou8TwkXhi1Jbk-ReY7oulyuvKSQrw1lgJElggGlo0d6indiH1U-tDwquw4tU_UXoQ_sj8OBo8XBUuWjuuFShqmLMP-0W59Vr6CaXdLrF8M3wFR4dUUhSf5UC4QCLaOMVP92lyh0OdtF_m_9Dt7lz-Wniod9zDrHeDsz_by570K3jL1VuDKTl_U1cJ0mzz_zDHGfOUf7VU1kVIs1WnM9SGvnm8YZURLTtMLMWx8-doGUE56Af_VfKjGDYW361OOIj9GmkyCFtaoCmTMIr5kgyeUSnB-IEhDlzujVrV6O9Mt7N4DagR6RGhT3g1viYLS4kO5YindU6dm3GIof1Q&key=YOUR_API_KEY

      let promise = axios(url)
        .then((response) => {
          // add markers on the map
          response.data.results.forEach((location) => {
            const objLatLng = location.geometry.location;

            // console.log('details', location);

            let marker = {
              showInfoWindow: false,
              name: location.name,
              id: location.id,
              icon: element.icon,
              rating: location.rating,
              website: location.reference,
              position:
                { lat: objLatLng.lat, lng: objLatLng.lng },
            };

            if (location.opening_hours !== undefined) {
              marker.openNow = location.opening_hours.open_now;
            }
            if (location.photos !== undefined) {
              marker.photo = location.photos[0];
            }
            markerArray.push(marker);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      promises.push(promise);
    });
    Promise.all(promises).then(() => { this.setState({ markers: markerArray }); });
  }

  isArrayEqual = (array1, array2) => {
    return _(array1).differenceWith(array2, _.isEqual).isEmpty();
  }

  componentDidUpdate(prevProps) {
    if (!this.isArrayEqual(this.props.places, prevProps.places)) {
      this.setState({ places: this.props.places }, () => this.addMarkers());
    }
  }

  addPlace = (place) => {
    console.log('in add place -Map ', place);
    this.props.store.addPlace(place);

  }

  render() {
    return (
      <GoogleMap
        markers={this.state.markers}
        address={this.props.address}
        updateAddress={this.props.updateAddress}
        images={this.images}
        addPlace={this.addPlace}
      />
    );
  }
}

export default Map;

