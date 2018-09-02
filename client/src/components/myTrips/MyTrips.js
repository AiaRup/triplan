import React, { Component } from 'react';
import './MyTrips.css';
import CardList from './CardList';
import SearchTrip from './SearchTrip';
import { observer, inject } from 'mobx-react';
import axios from 'axios';

@inject('store')
@observer
class MyTrips extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user_plans: [],
      filter_plans: []
    }
  }

  // user_plans = [{ name: 'barcelona 2018' }, { name: 'paris 2017' }, { name: 'vienna 2016' },
  // { name: 'singapour 2015' }, { name: 'seoul 2014' }];

  componentDidMount = () => {
    let u_id = this.props.store.user_id;
    console.log('user id: ' + u_id);
    axios.get(`api/users/users_trips/${u_id}`)
      .then(response => {
        console.log(response);

        // let plans = response.data;
        let plans = response;

        this.props.store.savePlans(plans);

        console.log("got response! ");
        this.setState((state, props) => {
          return { user_plans: plans, filter_plans: plans }
        });

      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }


  searchTrips = (query) => {
    // console.log("Our App knows the query: " + query)
    let trips = this.state.user_plans.filter((trip) => {
      // return trip.includes(query)
      return trip.name.includes(query)
      // || trip.body.includes(query)
    });
    console.log(trips);
    this.setState({ filter_plans: trips });

  }

  render() {

    return (
      <div className="all">
        <SearchTrip searchTrips={this.searchTrips} />
        <CardList plans={this.state.filter_plans} />
        {/* <OneTrip trip={this.props.store.oneTrip} /> */}
        {/* <OneTrip /> */}
      </div>
    );
  }

}


export default MyTrips;