import React, { Component } from 'react';
import PlanTrip from './planTrip/PlanTrip';
import SearchActivity from './searchActivity/SearchActivity';
import _ from 'lodash';
import TempEventList from './searchEvents/SearchEvents';
import { observer, inject } from 'mobx-react';
import './home.css';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = {
  root: {
    flexGrow: 1,
  },
};

@inject(allStores => ({
  restStoreTrip: allStores.store.restStoreTrip,
  tripName : allStores.store.tripName,
  saveTripName : allStores.store.saveTripName }))
   @observer
class Home extends Component {
  state = {
    value: 0,
    address: { lat: 51.507351, lng: -0.127758 },
  };

  geoSettings = {
    enableHighAccuracy: false,
    maximumAge        : 30000,
    timeout           : 20000
  };

  handleChange = (event, value) => {
    this.setState({ value });
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

 resetTrip = () => {
   console.log('inRest');
   this.props.restStoreTrip();
 }


 componentDidMount = () => {
   if (!('geolocation' in navigator)) {
     alert('No geolocation available!');
   }
   this.handlePermission();
 }

 render() {
   const { classes } = this.props;

   return (
     <React.Fragment>


       <div className="intro">
         <img src="/images/new-logo.png" alt=""/>
         <h1 className="home-page-headline">Plan Your Perfect Trip</h1>
         <div className="home-page-instructions">
           <p>Search Your Trip Location<i className="right"></i></p>
           <p>Choose Attractions To Visit<i className="right"></i></p>
           <p>Search Events To Add To Your Trip</p>
         </div>

       </div>
       <button className="btn btn-sm btn-secondary mt-4 ml-3 reset-trip" onClick={this.resetTrip}>Reset Trip</button>


       <Paper className={classes.root}>
         <Tabs
           value={this.state.value}
           onChange={this.handleChange}
           indicatorColor="primary"
           textColor="primary"
           centered >
           <Tab label="Find Attractions" />
           <Tab label="Find Events" />
           <Tab label="Plan Your Trip" />
         </Tabs>
       </Paper>

       <div className="container-fluid">

         <div className='map-event-container'>
           <div className='map-view-container'>
             <SearchActivity address={_.clone(this.state.address)}/>
           </div>
           <TempEventList/>
         </div>
       </div>

       <div className='plan-trip-container'>
         <div className="home-page-instructions">
           <p>Name Your Trip<i className="right"></i></p>
           <p>Add Days To Your Trip<i className="right"></i></p>
           <p>Drag & Drop To The Right Day</p>
         </div>

         <PlanTrip />
       </div>
     </React.Fragment>
   );
 }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);

