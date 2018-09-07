import React, { Component } from 'react';
import axios from 'axios';
import './MyTrips.css';
import CardList from './CardList';
import SearchTrip from './SearchTrip';
import { observer, inject } from 'mobx-react';
// import Notes from './Notes';

@inject('store')
@observer
class MyTrips extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_plans: [],
      filter_plans: []
    };
  }

  componentDidMount = () => {
    let u_id = this.props.store.user_id;
    console.log('user id: ' + u_id);
    axios.get(`api/users/users_trips/${u_id}`)
      .then(response => {
        console.log(response);
        let plans = response.data;
        this.props.store.savePlans(plans);
        console.log('got response! ');
        this.setState({ user_plans: plans, filter_plans: plans });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  searchTrips = (query) => {
    let trips = this.state.user_plans.filter((trip) => {
      return trip.name.toLowerCase().includes(query.toLowerCase());
    });
    this.setState({ filter_plans: trips });
  }

  render() {
    return (
      <div className="all">
        <SearchTrip searchTrips={this.searchTrips} />
        <CardList plans={this.state.filter_plans} />
      </div>
    );
  }

}


export default MyTrips;

