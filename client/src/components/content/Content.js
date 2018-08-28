import React, { Component } from 'react';
import PlanTrip from './planTrip/PlanTrip';
import EventTemo from './tempEvents/TempEventList';
import MapView from './mapView/MapView';
import styled from 'styled-components';
import _ from 'lodash';
import TempEventList from './tempEvents/TempEventList';





const Container = styled.div`
  display: flex;
  flex: wrap;
  flex flow: row;
  justify-content: space-around;
`;

const PlanTripContainer = styled.div`
  display: flex;
  height: 80vh;
  width: 100%;
  border: 1px solid lightgrey;
  background-color: green;
`;

const MapViewContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  height: 80vh;
  width: 95%;
  background-color: red;
  border: 1px solid lightgrey;
`;

class Content extends Component {
  state = {
    address: { lat: 51.507351, lng: -0.127758 },
  }

  geoSettings = {
    enableHighAccuracy: false,
    maximumAge        : 30000,
    timeout           : 20000
  };

positionDenied = () => {
  this.setState({ address: { lat: 51.507351, lng:-0.127758 }});
};

 revealPosition = (position) => {
   this.setState({ address: { lat: position.coords.latitude, lng: position.coords.longitude }});
 };

  // Start everything off
 handlePermission = () => {
   navigator.permissions.query({ name:'geolocation' }).then((result) => {
     if (result.state === 'granted') {
       console.log('Permission to get user location: ' + result.state);
       navigator.geolocation.getCurrentPosition(this.revealPosition, this.positionDenied, this.geoSettings);
     } else if (result.state === 'prompt') {
       console.log('Permission to get user location:: ' + result.state);
       navigator.geolocation.getCurrentPosition(this.revealPosition, this.positionDenied, this.geoSettings);
     } else if (result.state === 'denied') {
       console.log('Permission to get user location:: ' + result.state);
     }
     result.onchange = () => {
       console.log('Permission to get user location:: ' + result.state);
     };
   });
 }


 componentDidMount = () => {
   if (!('geolocation' in navigator)) {
     alert('No geolocation available!');
   }
   this.handlePermission();

  //  const userId = localStorage.getItem('oktaID');
  //  if (userId !== null) {
  //    // get user id from mongo
  //    axios.get(`/api/users/users/${userId}`)
  //      .then((response) => {
  //        // set user id on store
  //        this.props.configUser(response.data[0]._id);
  //      });
  //  }
 }

 render() {
   return (
     <React.Fragment>
       <Container>
         <MapViewContainer>
           <MapView address={_.clone(this.state.address)}/>
         </MapViewContainer>
         <TempEventList/>
        
       </Container>
       <PlanTripContainer>
           <PlanTrip />
         </PlanTripContainer>
     </React.Fragment>
   );
 }
}

export default Content;